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
        {/* Table header and rows similar to the Home component */}
      </table>
    </div>
  );
}
