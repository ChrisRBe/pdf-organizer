# pdf_organizer\src\metadata.py
#
# PDF Metadata Manager
#
# Copyright (c) 2024 ChrisRBe
# All rights reserved.
import os
import pypdf
import sqlite3

from typing import Dict


class PDFMetadataManager:
    """
    A class used to store PDF metadata in an SQLite database.

    Attributes:
        conn (sqlite3.Connection): The connection to the SQLite database.
        cursor (sqlite3.Cursor): The cursor object to execute SQL queries.
    """

    def __init__(self, database: str = "pdf_metadata.sqlite3"):
        """
        Initializes the PDFMetadataManager object.

        Creates a connection to the SQLite database and creates a table to store PDF metadata if it doesn't exist.
        """
        self.database = database
        self.conn = sqlite3.connect(self.database)
        self.cursor = self.conn.cursor()
        self.cursor.execute("""
            CREATE TABLE IF NOT EXISTS pdf_metadata (
                id INTEGER PRIMARY KEY,
                title TEXT,
                author TEXT,
                creator TEXT,
                producer TEXT,
                created TEXT,
                modified TEXT,
                filename TEXT,
                filepath TEXT,
                filesize INTEGER,
                has_metadata INTEGER DEFAULT 0,
                has_file_problems INTEGER DEFAULT 0,
                to_delete INTEGER DEFAULT 0
            )
        """)

    @classmethod
    def read_metadata(cls, pdf_file: str, verbose: bool = False) -> dict:
        """
        Reads metadata from a PDF file.

        :param pdf_file: The path to the PDF file.
        :type pdf_file: str
        :param verbose: shows verbose output
        :type verbose: bool

        :return: A dictionary containing the PDF metadata.
        :rtype: dict
        """
        try:
            pdf = pypdf.PdfReader(pdf_file)
            metadata = pdf.metadata

            if metadata:
                try:
                    creation_date = metadata.creation_date
                except ValueError:
                    if verbose:
                        print(f"Creation date for {pdf_file} could not be extracted. Try raw value.")
                    creation_date = metadata.creation_date_raw
                try:
                    modification_date = metadata.modification_date
                except ValueError:
                    if verbose:
                        print(f"Modification date for {pdf_file} could not be extracted. Try raw value.")
                    modification_date = metadata.modification_date_raw
                return {
                    "title": metadata.title,
                    "author": metadata.author,
                    "creator": metadata.creator,
                    "producer": metadata.producer,
                    "created": creation_date,
                    "modified": modification_date,
                    "has_metadata": 1,
                    "has_file_problems": 0,
                }
            else:
                return {
                    "title": "",
                    "author": "",
                    "creator": "",
                    "producer": "",
                    "created": "",
                    "modified": "",
                    "has_metadata": 1,
                    "has_file_problems": 0,
                }
        except pypdf.errors.PdfStreamError:
            if verbose:
                print(f"Could not read metadata for {pdf_file}.")
            return {
                "title": "",
                "author": "",
                "creator": "",
                "producer": "",
                "created": "",
                "modified": "",
                "has_metadata": 0,
                "has_file_problems": 1,
            }

    def store_metadata(self, metadata: Dict[str, str], filename: str, filesize: int) -> None:
        """
        Stores metadata in the SQLite database.

        :param metadata: A dictionary containing the PDF metadata.
        :type metadata: Dict[str, str]
        :param filename: The filename of the PDF file.
        :type filename: str
        :param filesize: The size of the PDF file in bytes.
        :type filesize: int
        """
        self.cursor.execute(
            """
            INSERT INTO pdf_metadata (title, author, creator, producer, created, modified, filename, filepath, filesize, has_metadata, has_file_problems)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """,
            (
                metadata["title"] or "",
                metadata["author"] or "",
                metadata["creator"] or "",
                metadata["producer"] or "",
                metadata["created"] or "",
                metadata["modified"] or "",
                filename,
                os.path.abspath(filename),
                filesize,
                metadata["has_metadata"],
                metadata["has_file_problems"],
            ),
        )
        self.conn.commit()

    def read_pdf_metadata_from_directory(self, directory: str, verbose: bool = False) -> None:
        """
        Reads metadata from all PDF files in a directory tree and stores it in the SQLite database.

        :param directory: The path to the directory containing the PDF files.
        :type directory: str
        :param verbose: shows verbose output
        :type verbose: bool
        """
        for root, dirs, files in os.walk(directory):
            for file in files:
                if file.lower().endswith(".pdf"):
                    if verbose:
                        print(f"Processing {file}...")
                    pdf_file = os.path.join(root, file)
                    metadata = self.read_metadata(pdf_file, verbose)
                    filesize = os.path.getsize(pdf_file)
                    self.store_metadata(metadata, file, filesize)
        if verbose:
            print("Metadata stored in the SQLite database.")

    def __del__(self):
        """
        Closes the connection to the SQLite database when the object is deleted.
        """
        self.conn.close()
