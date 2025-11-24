import Papa from 'papaparse';

export type NewsItem = {
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  aiHint?: string;
  date?: string;
  link?: string;
  readingTime?: number;
};

const SHEET_ID = "16C0Pa1Pjgrjne-jeZIxscFu34jqe2F217ZPanVwsYJs";

async function fetchSheetData(gid: string): Promise<any[]> {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;

    try {
        const response = await fetch(csvUrl, { next: { revalidate: 3600 } }); // Revalidate every hour
        if (!response.ok) {
          throw new Error(`Failed to fetch Google Sheet (gid: ${gid}): ${response.statusText}`);
        }
        const csvText = await response.text();
        
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                complete: (results) => {
                    resolve(results.data as any[]);
                },
                error: (error: any) => {
                    console.error("Error parsing CSV:", error);
                    reject(error);
                },
            });
        });
    } catch (error) {
        console.error(`Error fetching Google Sheet (gid: ${gid}):`, error);
        return [];
    }
}


export async function getNewsFromSheet(): Promise<NewsItem[]> {
    const newsData = await fetchSheetData("0");
    
    try {
      const formattedNews = newsData.slice(0, 6).map((row, index) => {
        if (!row.Titulo) return null;
        
        const content = row.Contenido || "Contenido no disponible.";
        const sentences = content.split('.').filter((s: string) => s.trim().length > 0);
        const excerpt = sentences.slice(0, 2).join('. ') + (sentences.length > 2 ? '.' : '');
        
        return {
          title: row.Titulo || "Título no disponible",
          date: row.Fecha_Publicacion || new Date().toLocaleDateString(),
          excerpt: excerpt,
          link: row.Link,
          category: "Noticia",
          imageUrl: `https://placehold.co/800x600?text=Noticia+${index + 1}`,
          aiHint: "news article",
          readingTime: Math.floor(Math.random() * (5 - 2 + 1)) + 2,
      }});
      return formattedNews.filter(Boolean) as NewsItem[];
    } catch (e) {
      console.error("Error formatting news data:", e);
      return [];
    }
}


export async function getRegisteredReferrers(): Promise<string[]> {
  // Asumiendo que los participantes están en la misma hoja que las noticias (gid=0)
  // o en otra. Si es otra hoja, cambia el GID aquí.
  // La columna en el sheet debe llamarse 'Nombre completo'
  const participantsData = await fetchSheetData("0");

  try {
    const referrers = participantsData
      .map(row => row['Nombre completo']?.trim())
      .filter(name => name); // Filtra nombres vacíos o nulos
    
    // Elimina duplicados
    return [...new Set(referrers)];
  } catch (error) {
    console.error("Error processing referrers:", error);
    return [];
  }
}
