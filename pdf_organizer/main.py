# main py file to run the CLI for organizing PDF files
#
# Copyright (c) 2024 ChrisRBe

import typer
from typing import Optional

from pdf_organizer.src.organize import PDFOrganizer

app = typer.Typer()


@app.command()
def organize(
    input_directory: str,
    output_directory: str,
    verbose: Optional[bool] = typer.Option(False, "--verbose", "-v", help="Show verbose output")
):
    """
    Organize PDF files in a directory by creating subdirectories in the output directory based on the first
    word of the PDF filename.
    """
    # Call the organize_pdfs function from the previous code
    PDFOrganizer.organize_pdfs(input_directory, output_directory, verbose)
