// app/page.tsx
import { PdfMetadata } from '@/types';
import { openDB } from '@/lib/db';

async function getPdfMetadata() {
  const db = await openDB();
  const rows = await db.all<PdfMetadata[]>('SELECT * FROM pdf_metadata');
  await db.close();
  return rows;
}

export default async function Home() {
  const pdfMetadata = await getPdfMetadata();

  return (
    <div>
      <h1>PDF Metadata Manager</h1>
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
