
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

const placeholderNews: NewsItem[] = [
  { id: 1, title: 'Gran Encuentro Ciudadano en Bogotá', excerpt: 'Miles de personas se reunieron para escuchar las propuestas de Horacio Serpa sobre seguridad y empleo en la capital.', date: 'Hace 2 días', category: 'Encuentros', imageUrl: 'https://picsum.photos/seed/news1/800/600', link: '#', readingTime: 4, aiHint: 'political rally crowd' },
  { id: 2, title: 'Debate Clave sobre el Futuro de la Educación', excerpt: 'Horacio Serpa participó en un debate nacional, presentando su visión para una educación superior gratuita y de calidad.', date: 'Hace 1 día', category: 'Debates', imageUrl: 'https://picsum.photos/seed/news2/800/600', link: '#', readingTime: 6, aiHint: 'political debate stage' },
  { id: 3, title: 'Nuevas Propuestas para el Medio Ambiente', excerpt: 'Se anunció un ambicioso plan para la transición energética y la protección de los páramos colombianos.', date: 'Hace 5 horas', category: 'Propuestas', imageUrl: 'https://picsum.photos/seed/news3/800/600', link: '#', readingTime: 5, aiHint: 'colombian mountains landscape' },
  { id: 4, title: 'Reunión Estratégica con Empresarios', excerpt: 'En un encuentro con el sector privado, se discutieron incentivos para la generación de empleo y la inversión.', date: 'Hace 3 días', category: 'Economía', imageUrl: 'https://picsum.photos/seed/news4/800/600', link: '#', readingTime: 3, aiHint: 'business meeting handshake' },
  { id: 5, title: 'Jóvenes se Suman a la Campaña "Ser Pa la Gente"', excerpt: 'El voluntariado juvenil crece, impulsado por las propuestas de cambio y oportunidades para las nuevas generaciones.', date: 'Hace 8 horas', category: 'Campaña', imageUrl: 'https://picsum.photos/seed/news5/800/600', link: '#', readingTime: 2, aiHint: 'young people volunteering' },
  { id: 6, title: 'Diálogo con Comunidades Indígenas en el Cauca', excerpt: 'Horacio Serpa se comprometió a garantizar la protección de los territorios y a promover el desarrollo con enfoque diferencial.', date: 'Hace 4 días', category: 'Derechos Humanos', imageUrl: 'https://picsum.photos/seed/news6/800/600', link: '#', readingTime: 5, aiHint: 'indigenous community' },
];


/**
 * 🔹 Lee noticias desde Google Sheets
 * Lee la hoja "Noticias". Si no la encuentra o hay un error, devuelve datos de ejemplo.
 */
export async function getNewsFromSheet(): Promise<NewsItem[]> {
    try {
      const doc = getSheetsAuth();
      await doc.loadInfo();

      const sheet = doc.sheetsByTitle['Noticias'];
      if (!sheet) {
          console.warn("ADVERTENCIA: No se encontró la hoja de cálculo 'Noticias'. Se devolverán datos de ejemplo.");
          return placeholderNews;
      }
      const rows = await sheet.getRows();

      if (rows.length === 0) {
        console.warn("ADVERTENCIA: La hoja de cálculo 'Noticias' está vacía. Se devolverán datos de ejemplo.");
        return placeholderNews;
      }

      return rows.map((row: any, idx: number): NewsItem => {
          const content = row.get('Contenido') || '';
          const excerpt = content.split(' ').slice(0, 25).join(' ') + (content.split(' ').length > 25 ? '...' : '');

          return {
            id: idx,
            title: row.get('Título') || `Noticia de ejemplo ${idx + 1}`,
            excerpt: excerpt || 'Este es un resumen de ejemplo para la noticia. Haz clic para leer más.',
            date: row.get('Fecha') || new Date().toLocaleDateString('es-CO'),
            category: row.get('Categoría') || 'General',
            imageUrl: row.get('URL de la Imagen') || `https://picsum.photos/seed/${idx + 1}/800/600`,
            link: row.get('Enlace') || '#',
            readingTime: parseInt(row.get('Tiempo de Lectura (min)')) || 5,
            aiHint: row.get('AI Hint') || 'article'
          };
      });
    } catch (error) {
      console.error("ERROR: No se pudieron obtener las noticias desde Google Sheets.", error);
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
