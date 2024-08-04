# main py file to run the CLI for organizing PDF files
#
# Copyright (c) 2024 ChrisRBe

import typer
from typing import Optional
from typing_extensions import Annotated

from pdf_organizer.src.organize import PDFOrganizer
from pdf_organizer.src.metadata import PDFMetadataManager

app = typer.Typer()


@app.command()
def organize(
    input_directory: Annotated[str, typer.Argument(help="The path to the directory containing the PDF files.")],
    output_directory: Annotated[
        str, typer.Argument(help="The path to the directory where the organized PDF files should be moved.")
    ],
    verbose: Optional[bool] = typer.Option(False, "--verbose", "-v", help="Show verbose output"),
):
    """
    Organize PDF files in a directory by creating subdirectories in the output directory based on the first
    word of the PDF filename.
    """
    PDFOrganizer.organize_pdfs(input_directory, output_directory, verbose)


@app.command()
def metadata(
    input_directory: Annotated[str, typer.Argument(help="The path to the directory containing the PDF files.")],
    verbose: Optional[bool] = typer.Option(False, "--verbose", "-v", help="Show verbose output"),
):
    """
    Reads metadata from all PDF files in a directory and stores it in the SQLite database.
    """
    PDFMetadataManager().read_pdf_metadata_from_directory(input_directory, verbose)
