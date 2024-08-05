// lib/db.ts
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// export
export async function openDB() {
  return open({
    filename: '../pdf_metadata.sqlite3',
    driver: sqlite3.Database,
  });
}
