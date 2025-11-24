// lib/news.ts
import { GoogleSpreadsheet } from 'google-spreadsheet';
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

/**
 * Noticias para el masonry.
 * Ajusta los nombres de columnas a tu hoja de noticias más adelante si quieres.
 * Por ahora, si algo falla, devuelve [] para no romper la app.
 */
export async function getNewsFromSheet(): Promise<any[]> {
  try {
    const doc = getSheetsAuth();
    await doc.loadInfo();

    // si tus noticias están en otra pestaña, cambia el índice
    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();

    const newsItems = rows.map((row: any, idx: number) => ({
      // AJUSTA ESTOS CAMPOS SI LUEGO LO NECESITAS
      id: idx,
      title:
        row['Título'] ??
        row['Titulo'] ??
        row['title'] ??
        `Noticia ${idx + 1}`,
      summary:
        row['Resumen'] ??
        row['Descripción'] ??
        row['description'] ??
        '',
      date: row['Fecha'] ?? '',
      category: row['Categoría'] ?? row['Categoria'] ?? '',
      imageUrl: row['Imagen'] ?? '',
      ctaLabel: row['Texto botón'] ?? row['CTA Label'] ?? '',
      ctaUrl: row['Enlace'] ?? row['URL'] ?? '',
    }));

    return newsItems;
  } catch (e) {
    console.error('Error en getNewsFromSheet:', e);
    return [];
  }
}

/**
 * Lee la primera hoja y devuelve la lista de nombres únicos
 * de la columna "Nombre completo".
 */
export async function getRegisteredReferrers(): Promise<string[]> {
  const doc = getSheetsAuth();
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  const rows = await sheet.getRows();

  const names = rows
    .map((row: any) => row['Nombre completo'] as string | undefined)
    .filter((name): name is string => !!name && name.trim().length > 0);

  const unique = Array.from(new Set(names));
  unique.sort((a, b) => a.localeCompare(b, 'es'));

  return unique;
}
