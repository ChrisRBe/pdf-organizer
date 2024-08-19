// app/page.tsx
import DisplayData from '@/components/DisplayData';

export default function Home() {
    return (
      <DisplayData />
    )
  }
  // const [pdfMetadata, setPdfMetadata] = useState<PdfMetadata[]>([]);
  // const [sortColumn, setSortColumn] = useState('');

  // const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // async function fetchData() {
  //   try {
  //     const response = await fetch('/api/pdf-metadata');
  //     const data = await response.json();
  //     setPdfMetadata(data);
  //   } catch (error) {
  //     console.error('Error fetching PDF metadata:', error);
  //   }
  // }

  // ** Done **
  // useEffect(() => {
  //   useFetch().then(data => setPdfMetadata(data));
  // }, [pdfMetadata]);

  // const handleSort = (column: string) => {
  //   if (column === sortColumn) {
  //     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  //   } else {
  //     setSortColumn(column);
  //     setSortOrder('asc');
  //   }
  // };

  // const sortedMetadata = [...pdfMetadata].sort((a, b) => {
  //   const valueA = a[sortColumn as keyof PdfMetadata];
  //   const valueB = b[sortColumn as keyof PdfMetadata];

  //   if (typeof valueA === 'string' && typeof valueB === 'string') {
  //     return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
  //   }

  //   if (typeof valueA === 'number' && typeof valueB === 'number') {
  //     return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
  //   }

  //   return 0;
  // });
