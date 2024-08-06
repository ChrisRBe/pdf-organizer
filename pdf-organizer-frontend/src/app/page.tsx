// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { PdfMetadata } from '@/types';

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
      <table>
        <thead>
          <tr>
            <th onClick={() => handleSort('title')}>Title</th>
            <th onClick={() => handleSort('author')}>Author</th>
            <th onClick={() => handleSort('creator')}>Creator</th>
            <th onClick={() => handleSort('producer')}>Producer</th>
            <th onClick={() => handleSort('created')}>Created</th>
            <th onClick={() => handleSort('modified')}>Modified</th>
            <th onClick={() => handleSort('filename')}>Filename</th>
            <th onClick={() => handleSort('filesize')}>Filesize</th>
            <th onClick={() => handleSort('has_metadata')}>Has Metadata</th>
            <th onClick={() => handleSort('has_file_problems')}>Has File Problems</th>
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
