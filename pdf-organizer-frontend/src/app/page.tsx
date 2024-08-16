// app/page.tsx
"use client"

import { useState, useEffect } from 'react';
import { PdfMetadata } from '@/types/PDFMetaData';

export default function Home() {
  const [pdfMetadata, setPdfMetadata] = useState<PdfMetadata[]>([]);
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  async function fetchData() {
    try {
      const response = await fetch('/api/pdf-metadata');
      const data = await response.json();
      setPdfMetadata(data);
    } catch (error) {
      console.error('Error fetching PDF metadata:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSort = (column: string) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedMetadata = [...pdfMetadata].sort((a, b) => {
    const valueA = a[sortColumn as keyof PdfMetadata];
    const valueB = b[sortColumn as keyof PdfMetadata];

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
    }

    return 0;
  });

  return (
    <div>
      <h1>PDF Metadata Manager</h1>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='cursor-pointer' onClick={() => handleSort('title')}>Title</th>
            <th className='cursor-pointer' onClick={() => handleSort('author')}>Author</th>
            <th className='cursor-pointer' onClick={() => handleSort('creator')}>Creator</th>
            <th className='cursor-pointer' onClick={() => handleSort('producer')}>Producer</th>
            <th className='cursor-pointer' onClick={() => handleSort('created')}>Created</th>
            <th className='cursor-pointer' onClick={() => handleSort('modified')}>Modified</th>
            <th className='cursor-pointer' onClick={() => handleSort('filename')}>Filename</th>
            <th className='cursor-pointer' onClick={() => handleSort('filesize')}>Filesize</th>
            <th className='cursor-pointer' onClick={() => handleSort('has_metadata')}>Has Metadata</th>
            <th className='cursor-pointer' onClick={() => handleSort('has_file_problems')}>Has File Problems</th>
          </tr>
        </thead>
        <tbody>
          {sortedMetadata.map((metadata) => (
            <tr key={metadata.id}>
              <td>{metadata.title}</td>
              <td>{metadata.author}</td>
              <td>{metadata.creator}</td>
              <td>{metadata.producer}</td>
              <td>{metadata.created}</td>
              <td>{metadata.modified}</td>
              <td>{metadata.filename}</td>
              <td>{metadata.filesize}</td>
              <td>{metadata.has_metadata ? 'Yes' : 'No'}</td>
              <td>{metadata.has_file_problems ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
