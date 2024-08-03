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
    def organize_pdfs(cls, input_directory: str, output_directory: str) -> None:
        """
        Organize PDF files in a directory by creating subdirectories based on the first word of the PDF filename.

        Args:
            input_directory (str): The path to the directory containing the PDF files.
            output_directory (str): The path to the directory where the organized PDF files should be moved.
        """
        # Iterate through all files in the directory
        for filename in os.listdir(input_directory):
            # Check if the file is a PDF
            if filename.endswith(".pdf"):
                # Extract the first word from the filename
                first_word = filename.split('.')[0].split('-')[0].split('_')[0].split(' ')[0]

                # Create the subdirectory if it doesn't exist
                subdirectory = os.path.join(output_directory, first_word)
                if not os.path.exists(subdirectory):
                    os.makedirs(subdirectory)

                # Move the PDF file to the subdirectory
                src = os.path.join(input_directory, filename)
                dst = os.path.join(subdirectory, filename)
                shutil.copy(src, dst)
