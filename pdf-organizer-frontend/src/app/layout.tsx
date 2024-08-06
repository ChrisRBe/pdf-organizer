// app/layout.tsx
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>PDF Metadata Manager</title>
      </head>
      <body className='bg-stone-50'>{children}</body>
    </html>
  );
}
