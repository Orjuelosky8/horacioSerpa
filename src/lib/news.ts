
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
    title: "Bucaramanga necesita unidad",
    excerpt: "Bucaramanga atraviesa un momento difícil. La anulación de la elección obliga a la ciudad a entrar en interinidad y a prepararse para nuevas elecciones. No...",
    date: "23 de Agosto, 2025",
    category: "Opinión",
    imageUrl: "/News/ImagenHoracioVanguardia.jpg",
    link: "https://www.vanguardia.com/opinion/columnistas/2025/08/23/bucaramanga-necesita-unidad/",
    readingTime: 2,
    aiHint: "city politics"
  },
  {
    id: 2,
    title: "La política después de Miguel",
    excerpt: "Hacer política en Colombia hoy es caminar por un campo minado. No solo por las balas, sino por el odio, la mentira y la estigmatización...",
    date: "16 de Agosto, 2025",
    category: "Opinión",
    imageUrl: "/News/ImagenHoracioVanguardia.jpg",
    link: "https://www.vanguardia.com/opinion/columnistas/2025/08/16/la-politica-despues-de-miguel/",
    readingTime: 2,
    aiHint: "colombian politics"
  },
  {
    id: 3,
    title: "La deuda centenaria con García Rovira",
    excerpt: "El reciente especial publicado por Vanguardia volvió a poner sobre la mesa una verdad incómoda: la Vía Curos–Málaga sigue siendo la ruta de la muerte....",
    date: "09 de Agosto, 2025",
    category: "Opinión",
    imageUrl: "/News/ImagenHoracioVanguardia.jpg",
    link: "https://www.vanguardia.com/opinion/columnistas/2025/08/09/la-deuda-centenaria-con-garcia-rovira/",
    readingTime: 2,
    aiHint: "infrastructure development"
  },
  {
    id: 4,
    title: "Barrancabermeja no está sola",
    excerpt: "Yo nací hace 43 años en Barrancabermeja. En una ciudad de obreros, comerciantes, pescadores y soñadores. Un puerto que nunca se detuvo, ni...",
    date: "02 de Agosto, 2025",
    category: "Opinión",
    imageUrl: "/News/ImagenHoracioVanguardia.jpg",
    link: "https://www.vanguardia.com/opinion/columnistas/2025/08/02/barrancabermeja-no-esta-sola/",
    readingTime: 2,
    aiHint: "city pride"
  },
  {
    id: 5,
    title: "El cuarto poder",
    excerpt: "No hay poder más valioso para una democracia que una prensa libre, crítica e independiente. En Colombia, ha sido la prensa —no los gobiernos, ni...",
    date: "26 de Julio, 2025",
    category: "Opinión",
    imageUrl: "/News/ImagenHoracioVanguardia.jpg",
    link: "https://www.vanguardia.com/opinion/columnistas/horacio-jose-serpa/2025/07/26/el-cuarto-poder/",
    readingTime: 2,
    aiHint: "freedom press"
  },
  {
    id: 6,
    title: "La valla de David Luna",
    excerpt: "En tiempos de polarización, insulto fácil y trincheras ideológicas, apareció una valla política que no impone un nombre, no muestra una cara ni busca...",
    date: "19 de Julio, 2025",
    category: "Opinión",
    imageUrl: "/News/ImagenHoracioVanguardia.jpg",
    link: "https://www.vanguardia.com/opinion/columnistas/2025/07/19/la-valla-de-david-luna/",
    readingTime: 2,
    aiHint: "political unity"
  },
];


/**
 * 🔹 Lee noticias desde Google Sheets
 * Lee la primera hoja del documento. Si no la encuentra o hay un error, devuelve datos de ejemplo.
 */
export async function getNewsFromSheet(): Promise<NewsItem[]> {
    const newsSheetId = process.env.GOOGLE_SHEET_ID_NEWS;
    
    if (!newsSheetId) {
        console.warn("ADVERTENCIA: La variable de entorno 'GOOGLE_SHEET_ID_NEWS' no está definida. Se devolverán datos de ejemplo para las noticias.");
        return placeholderNews;
    }

    try {
      const doc = getSheetsAuth(newsSheetId);
      await doc.loadInfo();

      const sheet = doc.sheetsByIndex[0];
      if (!sheet) {
          console.warn("ADVERTENCIA: No se encontró la primera hoja de cálculo en el documento. Se devolverán datos de ejemplo.");
          return placeholderNews;
      }
      const rows = await sheet.getRows();

      if (rows.length === 0) {
        console.warn("ADVERTENCIA: La hoja de cálculo de noticias está vacía. Se devolverán datos de ejemplo.");
        return placeholderNews;
      }

      return rows.map((row: any, idx: number): NewsItem => {
          const content = row.get('Contenido') || '';
          const excerpt = content.split(' ').slice(0, 25).join(' ') + (content.split(' ').length > 25 ? '...' : '');

          const wordCount = content.split(/\s+/).length;
          const readingTime = Math.ceil(wordCount / 200); // Promedio de 200 palabras por minuto

          return {
            id: idx,
            title: row.get('Título') || `Noticia de ejemplo ${idx + 1}`,
            excerpt: excerpt || 'Este es un resumen de ejemplo para la noticia. Haz clic para leer más.',
            date: row.get('Fecha') || new Date().toLocaleDateString('es-CO'),
            category: row.get('Categoría') || 'General',
            imageUrl: '/News/ImagenHoracioVanguardia.jpg', // Imagen estática
            link: row.get('Enlace') , // Enlace dinámico desde el Sheet
            readingTime: readingTime || 1,
            aiHint: row.get('AI Hint') || 'article'
          };
      });
    } catch (error) {
      console.error("ERROR: No se pudieron obtener las noticias desde Google Sheets. Causa probable: El ID de la hoja es incorrecto, no se ha compartido con la cuenta de servicio, o las columnas no tienen los nombres esperados.", error);
      console.warn("Se devolverán datos de ejemplo debido al error anterior.");
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
  firstRowsSample: any[]; // primeras filas de _rawData
};

/**
 * Lee la primera hoja del documento de FORMULARIO y devuelve:
 * - referrers: lista de nombres únicos
 * - debug: info detallada para mostrar en el front
 */
export async function getRegisteredReferrers(): Promise<{
  referrers: string[];
  debug: ReferrersDebugInfo;
}> {
  const formSheetId = process.env.GOOGLE_SHEET_ID;
  if (!formSheetId) {
    throw new Error('La variable de entorno principal GOOGLE_SHEET_ID para el formulario no está definida.');
  }

  const doc = getSheetsAuth(formSheetId);
  await doc.loadInfo();
  
  const sheet = doc.sheetsByIndex[0];
  if (!sheet) {
    throw new Error('No se encontró ninguna hoja en el documento de Google Sheets para el formulario.');
  }

  await sheet.loadHeaderRow();
  const headers = sheet.headerValues || [];

  const rows = await sheet.getRows();

  // Buscar columna cuyo header empiece por "nombre completo"
  const targetIndex = headers.findIndex((h) =>
    h &&
    h.toString().toLowerCase().trim().startsWith('nombre completo')
  );

  // Tomamos primeras 5 filas crudas para debug
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
