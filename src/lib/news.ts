
// src/lib/news.ts
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

function getSheetsAuth() {
  if (
    !process.env.GOOGLE_SHEETS_CLIENT_EMAIL ||
    !process.env.GOOGLE_SHEETS_PRIVATE_KEY ||
    !process.env.GOOGLE_SHEET_ID
  ) {
    throw new Error(
      'Faltan variables de entorno de Google Sheets (GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY, GOOGLE_SHEET_ID)'
    );
  }

  const jwt = new JWT({
    email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    key: process.env.GOOGLE_SHEETS_PRIVATE_KEY.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, jwt);
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


/**
 * 🔹 Stub de noticias para DepthMasonry
 * Por ahora devuelve un array mapeado simple desde la hoja.
 * Si la hoja 0 no son las noticias reales, igual no rompe, solo mandará data genérica.
 */
export async function getNewsFromSheet(): Promise<NewsItem[]> {
    const doc = getSheetsAuth();
    await doc.loadInfo();

    const sheet = doc.sheetsByTitle['Noticias'];
    if (!sheet) {
        console.warn("ADVERTENCIA: No se encontró la hoja de cálculo 'Noticias'. Se devolverán datos de ejemplo.");
        return [];
    }
    const rows = await sheet.getRows();

    return rows.map((row: any, idx: number): NewsItem => ({
        id: idx,
        title: row.get('Título') || `Noticia de ejemplo ${idx + 1}`,
        excerpt: row.get('Resumen') || 'Este es un resumen de ejemplo para la noticia. Haz clic para leer más.',
        date: row.get('Fecha') || new Date().toLocaleDateString('es-CO'),
        category: row.get('Categoría') || 'General',
        imageUrl: row.get('URL de la Imagen') || `https://picsum.photos/seed/${idx + 1}/800/600`,
        link: row.get('Enlace') || '#',
        readingTime: parseInt(row.get('Tiempo de Lectura (min)')) || 5,
        aiHint: row.get('AI Hint') || 'article'
    }));
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
 * Lee la primera hoja y devuelve:
 * - referrers: lista de nombres únicos
 * - debug: info detallada para mostrar en el front
 */
export async function getRegisteredReferrers(): Promise<{
  referrers: string[];
  debug: ReferrersDebugInfo;
}> {
  const doc = getSheetsAuth();
  await doc.loadInfo();

  // Cambiado a sheetsByIndex[0] para más robustez.
  const sheet = doc.sheetsByIndex[0]; 
  if (!sheet) {
    throw new Error('No se encontró ninguna hoja en el documento de Google Sheets.');
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
