// app/search/page.tsx
import { PdfMetadata } from '@/types';
import { openDB } from '@/lib/db';

async function searchPdfMetadata(query: string) {
  const db = await openDB();
  const rows = await db.all<PdfMetadata[]>(`
    SELECT * FROM pdf_metadata
    WHERE title LIKE ? OR author LIKE ? OR filename LIKE ?
  `, [`%${query}%`, `%${query}%`, `%${query}%`]);
  await db.close();
  return rows;
}

export default async function Search({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q || '';
  const pdfMetadata = await searchPdfMetadata(query);

  return (
    <div>
      <h1>Search Results</h1>
      <p>Showing results for: {query}</p>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Creator</th>
            <th>Producer</th>
            <th>Created</th>
            <th>Modified</th>
            <th>Filename</th>
            <th>Filesize</th>
            <th>Has Metadata</th>
            <th>Has File Problems</th>
          </tr>
        </thead>
        <tbody>
          {pdfMetadata.map((metadata) => (
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
