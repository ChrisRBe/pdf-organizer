# pdf_organizer\src\organize.py
#
# PDF Organizer
#
# Copyright (c) 2024 ChrisRBe
# All rights reserved.

import os
import shutil


class PDFOrganizer:
    @classmethod
    def organize_pdfs(cls, input_directory: str, output_directory: str, verbose: bool = False) -> None:
        """
        Organize PDF files in a directory by creating subdirectories based on the first word of the PDF filename.

        :param input_directory: The path to the directory containing the PDF files.
        :param output_directory: The path to the directory where the organized PDF files should be moved.
        :type verbose: bool
        :param verbose: shows verbose output
        """
        # Iterate through all files in the directory
        for filename in os.listdir(input_directory):
            if verbose:
                print(f"Processing {filename}...")
            # Check if the file is a PDF
            if filename.lower().endswith(".pdf"):
                if verbose:
                    print(f"Organizing {filename}...")

                # Extract the first word from the filename
                first_word = filename.split('.')[0].split('-')[0].split('_')[0].split(' ')[0]

                # Create the subdirectory if it doesn't exist
                subdirectory = os.path.join(output_directory, first_word)
                if not os.path.exists(subdirectory):
                    os.makedirs(subdirectory)

                # Move the PDF file to the subdirectory
                src = os.path.join(input_directory, filename)
                dst = os.path.join(subdirectory, filename)
                shutil.move(src, dst)

                if verbose:
                    print(f"Moved {filename} to {subdirectory}")

        if verbose:
            print("Finished organizing PDF files.")
