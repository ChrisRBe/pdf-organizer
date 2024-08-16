import { NextResponse } from 'next/server';
import { openDB } from '@/lib/db';
import { PdfMetadata } from '@/types/types';

export async function GET() {
  try {
    const db = await openDB();
    const rows = await db.all<PdfMetadata[]>('SELECT * FROM pdf_metadata');
    await db.close();
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching PDF metadata:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}