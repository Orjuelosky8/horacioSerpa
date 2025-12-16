
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
  { id: 1, title: 'Bucaramanga necesita unidad', excerpt: 'Bucaramanga atraviesa un momento difícil. La anulación de la elección obliga a la ciudad a entrar en interinidad y a prepararse para nuevas elecciones. No...', date: '23 de Agosto, 2025', category: 'Opinión', imageUrl: '/News/ImagenHoracioVanguardia.jpg', link: 'https://www.vanguardia.com/opinion/columnistas/2025/08/23/bucaramanga-necesita-unidad/', readingTime: 3, aiHint: 'Unión en Bucaramanga' },
  { id: 2, title: 'La política después de Miguel', excerpt: 'Hacer política en Colombia hoy es caminar por un campo minado. No solo por las balas, sino por el odio, la mentira y la estigmatización que se han...', date: '16 de Agosto, 2025', category: 'Opinión', imageUrl: '/News/ImagenHoracioVanguardia.jpg', link: 'https://www.vanguardia.com/opinion/columnistas/2025/08/16/la-politica-despues-de-miguel/', readingTime: 3, aiHint: 'Que ha pasado con la politica después de Miguel' },
  { id: 3, title: 'La deuda centenaria con García Rovira', excerpt: 'El reciente especial publicado por Vanguardia volvió a poner sobre la mesa una verdad incómoda: la Vía Curos–Málaga sigue siendo la ruta de la muerte....', date: '09 de Agosto, 2025', category: 'Opinión', imageUrl: '/News/ImagenHoracioVanguardia.jpg', link: 'https://www.vanguardia.com/opinion/columnistas/2025/08/09/la-deuda-centenaria-con-garcia-rovira/', readingTime: 2, aiHint: 'Deuda con García Rovira' },
  { id: 4, title: 'Barrancabermeja no está sola', excerpt: 'Yo nací hace 43 años en Barrancabermeja. En una ciudad de obreros, comerciantes, pescadores y soñadores. Un puerto que nunca se detuvo, ni...', date: '02 de Agosto, 2025', category: 'Opinión', imageUrl: '/News/ImagenHoracioVanguardia.jpg', link: 'https://www.vanguardia.com/opinion/columnistas/2025/08/02/barrancabermeja-no-esta-sola/', readingTime: 3, aiHint: 'Estamos con Barrancabermeja' },
  { id: 5, title: 'El cuarto poder', excerpt: 'No hay poder más valioso para una democracia que una prensa libre, crítica e independiente. En Colombia, ha sido la prensa —no los gobiernos, ni...', date: '26 de Julio, 2025', category: 'Opinión', imageUrl: '/News/ImagenHoracioVanguardia.jpg', link: 'https://www.vanguardia.com/opinion/columnistas/horacio-jose-serpa/2025/07/26/el-cuarto-poder/', readingTime: 3, aiHint: 'Cuarto Poder' },
  { id: 6, title: 'La valla de David Luna', excerpt: 'En tiempos de polarización, insulto fácil y trincheras ideológicas, apareció una valla política que no impone un nombre, no muestra una cara ni busca...', date: '19 de Julio, 2025', category: 'Opinión', imageUrl: '/News/ImagenHoracioVanguardia.jpg', link: 'https://www.vanguardia.com/opinion/columnistas/2025/07/19/la-valla-de-david-luna/', readingTime: 3, aiHint: 'Vallas de David Luna.' },
];

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
    
    await sheet.loadHeaderRow();
    const headers = sheet.headerValues;
    const titleHeader = headers.find(h => h.toLowerCase().includes('título') || h.toLowerCase().includes('titulo'));
    const linkHeader = headers.find(h => h.toLowerCase().includes('link') || h.toLowerCase().includes('enlace'));
    const contentHeader = headers.find(h => h.toLowerCase().includes('contenido'));
    const dateHeader = headers.find(h => h.toLowerCase().includes('fecha'));
    const categoryHeader = headers.find(h => h.toLowerCase().includes('categoría') || h.toLowerCase().includes('categoria'));
    const aiHintHeader = headers.find(h => h.toLowerCase().includes('ai hint'));


    const sheetNews: NewsItem[] = rows.map((row: any, idx: number) => {
      const title = titleHeader ? row.get(titleHeader) : '';
      const link = linkHeader ? row.get(linkHeader) : '';
      
      if (!title || !link) return null;

      const content = contentHeader ? row.get(contentHeader) || '' : '';
      const words = content.split(/\s+/).filter(Boolean);
      const excerpt = words.length > 0 ? words.slice(0, 25).join(' ') + (words.length > 25 ? '...' : '') : '';
      const wordCount = words.length;
      const readingTime = Math.max(1, Math.ceil(wordCount / 200));
      
      return {
        id: idx,
        title,
        excerpt,
        date: dateHeader ? row.get(dateHeader) : new Date().toLocaleDateString('es-CO'),
        category: categoryHeader ? row.get(categoryHeader) : 'Opinión',
        imageUrl: '/News/ImagenHoracioVanguardia.jpg',
        link,
        readingTime,
        aiHint: aiHintHeader ? row.get(aiHintHeader) : 'article',
      };
    }).filter((item): item is NewsItem => item !== null);


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
  debug?: ReferrersDebugInfo;
}> {
  try {
    const formSheetId = process.env.GOOGLE_SHEET_ID;
    if (!formSheetId) {
      console.warn("ADVERTENCIA: La variable de entorno GOOGLE_SHEET_ID para el formulario no está definida. No se cargarán referentes.");
      return { referrers: [] };
    }

    const doc = getSheetsAuth(formSheetId);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];
    if (!sheet) {
      console.warn("ADVERTENCIA: No se encontró la primera hoja en el documento de Google Sheets para el formulario. No se cargarán referentes.");
      return { referrers: [] };
    }

    await sheet.loadHeaderRow();
    const headers = sheet.headerValues || [];
    const targetHeader = headers.find(h => h && h.toLowerCase().includes('nombres y apellidos completos'));

    if (!targetHeader) {
        console.warn("ADVERTENCIA: No se encontró la columna 'Nombres y apellidos completos' en la hoja de cálculo. No se cargarán referentes.");
        return { referrers: [] };
    }
    
    const rows = await sheet.getRows();
    const namesRaw = rows.map((row: any) => row.get(targetHeader) as string | undefined);
    
    const namesClean = namesRaw
      .map((n) => (n || '').toString().trim())
      .filter((n) => n.length > 0);

    const unique = Array.from(new Set(namesClean));
    unique.sort((a, b) => a.localeCompare(b, 'es'));

    return { referrers: unique };
  } catch (error) {
    console.error("ERROR al obtener la lista de referentes desde Google Sheets. Se devolverá una lista vacía.", error);
    return { referrers: [] };
  }
}
