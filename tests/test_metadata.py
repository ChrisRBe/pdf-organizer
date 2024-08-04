import datetime
import os
import pytest
import tempfile

from inline_snapshot import snapshot
from pypdf import PdfWriter


from pdf_organizer.src.metadata import PDFMetadataManager


@pytest.fixture
def pdf_manager():
    temp_dir = tempfile.mkdtemp()
    test_database = os.path.join(temp_dir, "test.db")
    pdf_manager = PDFMetadataManager(test_database)

    yield pdf_manager


@pytest.fixture
def pdf_file_path():
    temp_dir = tempfile.mkdtemp()
    pdf_file_path = os.path.join(temp_dir, "test.pdf")

    writer = PdfWriter()
    writer.add_metadata(
        {
            "/Author": "Test Author",
            "/Title": "Test Title",
            "/Creator": "Test Creator",
            "/Producer": "Test Producer",
            "/CreationDate": "D:20220101000000Z",
            "/ModDate": "D:20220102000000Z",
        }
    )

    with open(pdf_file_path, "wb") as f:
        f.write(b"%PDF-1.7\n...")
        writer.write(f)
    yield pdf_file_path


def test_read_metadata(pdf_file_path, pdf_manager):
    metadata = pdf_manager.read_metadata(pdf_file_path)
    assert metadata == snapshot({
        "title": "Test Title",
        "author": "Test Author",
        "creator": "Test Creator",
        "producer": "Test Producer",
        "created": datetime.datetime(2022, 1, 1, 0, 0, tzinfo=datetime.timezone.utc),
        "modified": datetime.datetime(2022, 1, 2, 0, 0, tzinfo=datetime.timezone.utc),
        "has_metadata": 1,
        "has_file_problems": 0,
    })


def test_store_metadata(pdf_manager, pdf_file_path):
    metadata = {
        "title": "Test Title",
        "author": "Test Author",
        "creator": "Test Creator",
        "producer": "Test Producer",
        "created": "2022-01-01 00:00:00",
        "modified": "2022-01-02 00:00:00",
        "has_metadata": 1,
        "has_file_problems": 0,
    }
    pdf_manager.store_metadata(metadata, os.path.basename(pdf_file_path), 1000)
    pdf_manager.conn.commit()
    pdf_manager.cursor.execute("SELECT * FROM pdf_metadata")
    result = pdf_manager.cursor.fetchone()
    assert result == snapshot((
        1,
        "Test Title",
        "Test Author",
        "Test Creator",
        "Test Producer",
        "2022-01-01 00:00:00",
        "2022-01-02 00:00:00",
        "test.pdf",
        1000,
        1,
        0,
    ))


def test_read_pdf_metadata_from_directory(pdf_manager, pdf_file_path):
    pdf_manager.read_pdf_metadata_from_directory(os.path.dirname(pdf_file_path), verbose=True)
    pdf_manager.conn.commit()
    pdf_manager.cursor.execute("SELECT * FROM pdf_metadata")
    result = pdf_manager.cursor.fetchone()
    assert result == snapshot((
        1,
        "Test Title",
        "Test Author",
        "Test Creator",
        "Test Producer",
        "2022-01-01 00:00:00+00:00",
        "2022-01-02 00:00:00+00:00",
        "test.pdf",
        478,
        1,
        0,
    ))
