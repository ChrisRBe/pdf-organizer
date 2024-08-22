// app/layout.tsx
import Header from '../components/Header'
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>PDF Metadata Manager</title>
      </head>
      <body className='container mx-auto w-11/12 bg-zinc-300'>
        <Header />        
        {children}</body>
    </html>
  );
}
