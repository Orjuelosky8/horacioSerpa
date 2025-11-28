// src/lib/news.ts
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

function getSheetsAuth(sheetId: string) {
  if (
    !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
    !process.env.GOOGLE_SHEETS_PRIVATE_KEY
  ) {
    throw new Error(
      'Faltan variables de entorno de Google Sheets (GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY)'
    );
  }

  const jwt = new JWT({
    email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(sheetId, jwt);
  return doc;
}

export type NewsItem = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  imageUrl: string;
  link: string;
  readingTime: number;
  aiHint: string;
};

const placeholderNews: NewsItem[] = [
  {
    id: 1,
    title: 'Bucaramanga necesita unidad',
    excerpt:
      'Bucaramanga atraviesa un momento difícil. La anulación de la elección obliga a la ciudad a entrar en interinidad y a prepararse para nuevas elecciones. No...',
    date: '23 de Agosto, 2025',
    category: 'Opinión',
    imageUrl: '/News/ImagenHoracioVanguardia.jpg',
    link: 'https://www.vanguardia.com/opinion/columnistas/2025/08/23/bucaramanga-necesita-unidad/',
    readingTime: 3,
    aiHint: 'Unión en Bucaramanga',
  },
  {
    id: 2,
    title: 'La política después de Miguel',
    excerpt:
      'Hacer política en Colombia hoy es caminar por un campo minado. No solo por las balas, sino por el odio, la mentira y la estigmatización que se han...',
    date: '16 de Agosto, 2025',
    category: 'Opinión',
    imageUrl: '/News/ImagenHoracioVanguardia.jpg',
    link: 'https://www.vanguardia.com/opinion/columnistas/2025/08/16/la-politica-despues-de-miguel/',
    readingTime: 3,
    aiHint: 'Que ha pasado con la politica después de Miguel',
  },
  {
    id: 3,
    title: 'La deuda centenaria con García Rovira',
    excerpt:
      'El reciente especial publicado por Vanguardia volvió a poner sobre la mesa una verdad incómoda: la Vía Curos–Málaga sigue siendo la ruta de la muerte....',
    date: '09 de Agosto, 2025',
    category: 'Opinión',
    imageUrl: '/News/ImagenHoracioVanguardia.jpg',
    link: 'https://www.vanguardia.com/opinion/columnistas/2025/08/09/la-deuda-centenaria-con-garcia-rovira/',
    readingTime: 2,
    aiHint: 'Deuda con García Rovira',
  },
  {
    id: 4,
    title: 'Barrancabermeja no está sola',
    excerpt:
      'Yo nací hace 43 años en Barrancabermeja. En una ciudad de obreros, comerciantes, pescadores y soñadores. Un puerto que nunca se detuvo, ni...',
    date: '02 de Agosto, 2025',
    category: 'Opinión',
    imageUrl: '/News/ImagenHoracioVanguardia.jpg',
    link: 'https://www.vanguardia.com/opinion/columnistas/2025/08/02/barrancabermeja-no-esta-sola/',
    readingTime: 3,
    aiHint: 'Estamos con Barrancabermeja',
  },
  {
    id: 5,
    title: 'El cuarto poder',
    excerpt:
      'No hay poder más valioso para una democracia que una prensa libre, crítica e independiente. En Colombia, ha sido la prensa —no los gobiernos, ni...',
    date: '26 de Julio, 2025',
    category: 'Opinión',
    imageUrl: '/News/ImagenHoracioVanguardia.jpg',
    link: 'https://www.vanguardia.com/opinion/columnistas/horacio-jose-serpa/2025/07/26/el-cuarto-poder/',
    readingTime: 3,
    aiHint: 'Cuarto Poder',
  },
  {
    id: 6,
    title: 'La valla de David Luna',
    excerpt:
      'En tiempos de polarización, insulto fácil y trincheras ideológicas, apareció una valla política que no impone un nombre, no muestra una cara ni busca...',
    date: '19 de Julio, 2025',
    category: 'Opinión',
    imageUrl: '/News/ImagenHoracioVanguardia.jpg',
    link: 'https://www.vanguardia.com/opinion/columnistas/2025/07/19/la-valla-de-david-luna/',
    readingTime: 3,
    aiHint: 'Vallas de David Luna.',
  },
];

/**
 * Lee noticias desde Google Sheets.
 * ✅ O devuelve las del Sheet
 * ✅ O devuelve las de `placeholderNews`
 * ❌ Sin textos "de ejemplo".
 */
export async function getNewsFromSheet(): Promise<NewsItem[]> {
  const newsSheetId = process.env.GOOGLE_SHEET_ID_NEWS;
  if (!newsSheetId) {
    console.warn(
      "ADVERTENCIA: La variable de entorno 'GOOGLE_SHEET_ID_NEWS' no está definida. Se usarán las noticias de 'placeholderNews'."
    );
    return placeholderNews;
  }

  try {
    const doc = getSheetsAuth(newsSheetId);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      console.warn(
        "ADVERTENCIA: No se encontró la primera hoja en el documento. Se usarán las noticias de 'placeholderNews'."
      );
      return placeholderNews;
    }

    const rows = await sheet.getRows();
    if (rows.length === 0) {
      console.warn(
        "ADVERTENCIA: La hoja de cálculo de noticias está vacía. Se usarán las noticias de 'placeholderNews'."
      );
      return placeholderNews;
    }

    const sheetNews: NewsItem[] = [];

    rows.forEach((row: any, idx: number) => {
      const title = row.get('Título') || row.get('Titulo');
      const link = row.get('Link');

      // Si no hay título o link, se omite la fila (nada "de ejemplo")
      if (!title || !link) return;

      const content = row.get('Contenido') || '';
      const words = content.split(/\s+/).filter(Boolean);
      const excerpt =
        words.length > 0
          ? words.slice(0, 25).join(' ') + (words.length > 25 ? '...' : '')
          : '';

      const wordCount = words.length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));

      sheetNews.push({
        id: idx,
        title,
        excerpt, // puede quedar vacío si no hay contenido, pero no se inventa nada
        date: row.get('Fecha_Publicacion') || new Date().toLocaleDateString('es-CO'),
        category: row.get('Categoría') || 'Opinión',
        imageUrl: '/News/ImagenHoracioVanguardia.jpg',
        link,
        readingTime,
        aiHint: row.get('AI Hint') || 'article',
      });
    });

    // Si ninguna fila fue válida, caemos al arreglo fijo
    if (sheetNews.length === 0) {
      console.warn(
        "ADVERTENCIA: No se encontraron filas válidas en la hoja de noticias. Se usarán las noticias de 'placeholderNews'."
      );
      return placeholderNews;
    }

    return sheetNews;
  } catch (error) {
    console.error(
      "ERROR: No se pudieron obtener las noticias desde Google Sheets. Se usarán las noticias de 'placeholderNews'.",
      error
    );
    return placeholderNews;
  }
}

// 🔹 Tipo para mandar info de debug al front
export type ReferrersDebugInfo = {
  sheetTitle: string;
  rowCount: number;
  dataRowCount: number;
  headers: string[];
  targetIndex: number;
  firstRowsSample: any[];
};

export async function getRegisteredReferrers(): Promise<{
  referrers: string[];
  debug: ReferrersDebugInfo;
}> {
  const formSheetId = process.env.GOOGLE_SHEET_ID;
  if (!formSheetId) {
    throw new Error(
      'La variable de entorno principal GOOGLE_SHEET_ID para el formulario no está definida.'
    );
  }

  const doc = getSheetsAuth(formSheetId);
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];
  if (!sheet) {
    throw new Error(
      'No se encontró ninguna hoja en el documento de Google Sheets para el formulario.'
    );
  }

  await sheet.loadHeaderRow();
  const headers = sheet.headerValues || [];

  const rows = await sheet.getRows();

  const targetIndex = headers.findIndex(
    (h) =>
      h &&
      h.toString().toLowerCase().trim().startsWith('nombre completo')
  );

  const firstRowsSample = rows.slice(0, 5).map((row: any) => row._rawData);

  let referrers: string[] = [];

  if (targetIndex !== -1) {
    const namesRaw = rows.map(
      (row: any) => row._rawData?.[targetIndex] as string | undefined
    );

    const namesClean = namesRaw
      .map((n) => (n || '').toString().trim())
      .filter((n) => n.length > 0);

    const unique = Array.from(new Set(namesClean));
    unique.sort((a, b) => a.localeCompare(b, 'es'));

    referrers = unique;
  }

  const debug: ReferrersDebugInfo = {
    sheetTitle: sheet.title,
    rowCount: sheet.rowCount,
    dataRowCount: rows.length,
    headers: headers.map((h) => h?.toString() ?? ''),
    targetIndex,
    firstRowsSample,
  };

  return { referrers, debug };
}
