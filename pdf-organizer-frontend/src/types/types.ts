// types.ts
interface PdfMetadata {
  id: number;
  title: string;
  author: string;
  creator: string;
  producer: string;
  created: string;
  modified: string;
  filename: string;
  filesize: number;
  has_metadata: number;
  has_file_problems: number;
}

interface SortOrder {
  col: string;
  order?: "asc" | "desc";
}

export type { PdfMetadata, SortOrder }