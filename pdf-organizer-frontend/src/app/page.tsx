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
    <div className='container mx-auto p-2'>
      <div className='grid grid-cols-6 font-bold bg-stone-400 p-2'>
        <div>Title</div>
        <div>Author</div>
        <div>Filename</div>
        <div>Size</div>

        <div>Created</div>
        <div>Modified</div>
      </div>

      {pdfMetadata.map((metadata, index) => (
        <div className={`grid grid-cols-6 p-2 overflow:hidden ${index % 2 === 0 ? "bg-stone-50" : "bg-stone-200"}`} key={metadata.id}>
          <div>{metadata.title}</div>
          <div>{metadata.author}</div>
          <div>{metadata.filename}</div>
          <div>{metadata.filesize}</div>
          <div>{metadata.created}</div>
          <div>{metadata.modified}</div>
        </div>
      ))}
    </div>
  );
}
