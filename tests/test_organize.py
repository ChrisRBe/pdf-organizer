import os
import shutil
import tempfile

import pytest

from pdf_organizer.src.organize import PDFOrganizer


class TestPDFOrganizer:
    @pytest.fixture
    def temp_dir(self) -> str:
        """
        Create a temporary directory for testing.

        Returns:
            str: The path to the temporary directory.
        """
        temp_dir = tempfile.mkdtemp()
        yield temp_dir
        shutil.rmtree(temp_dir)

    @pytest.fixture
    def pdf_files(self, temp_dir: str) -> dict[str, list[str]]:
        """
        Create sample PDF files in the temporary directory for testing.

        Args:
            temp_dir (str): The path to the temporary directory.
        """
        pdf_files = [
            "example1.pdf",
            "example_2.pdf",
            "example-3.pdf",
            "example 4.pdf",
        ]

        pdfs = dict()

        for filename in pdf_files:
            with open(os.path.join(temp_dir, filename), "w") as f:
                f.write("Test PDF file")

            first_word = filename.split('.')[0].split('-')[0].split('_')[0].split(' ')[0]

            if first_word in pdfs:
                pdfs[first_word].append(filename)
            else:
                pdfs[first_word] = [filename]

        return pdfs

    def test_organize_pdfs(self, temp_dir: str, pdf_files: dict[str, list[str]]) -> None:
        """
        Test the `organize_pdfs` method.

        Args:
            temp_dir (str): The path to the temporary directory.
            pdf_files (dict[str, list[str]]): A fixture that creates sample PDF files in the temporary directory.
        """
        output_dir = os.path.join(temp_dir, "output")
        PDFOrganizer.organize_pdfs(temp_dir, output_dir)

        # Check that the output directory exists
        assert os.path.exists(output_dir)

        # Check that the PDF files have been organized into subdirectories
        for filename in os.listdir(output_dir):
            assert os.path.isdir(os.path.join(output_dir, filename))
            for pdf_file in pdf_files[filename]:
                print(os.path.join(output_dir, filename, pdf_file))
                assert os.path.exists(os.path.join(output_dir, filename, pdf_file))
            assert os.path.exists(os.path.join(output_dir, filename))

        # Clean up the temporary directory
        shutil.rmtree(output_dir)
