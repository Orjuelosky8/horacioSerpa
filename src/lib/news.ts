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

export async function getNewsFromSheet(): Promise<NewsItem[]> {
    const sheetId = "16C0Pa1Pjgrjne-jeZIxscFu34jqe2F217ZPanVwsYJs";
    const sheetGid = "0";
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=${sheetGid}`;

    try {
        const response = await fetch(csvUrl, { next: { revalidate: 3600 } }); // Revalidate every hour
        if (!response.ok) {
          throw new Error(`Failed to fetch Google Sheet: ${response.statusText}`);
        }
        const csvText = await response.text();
        
        return await new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                complete: async (results) => {
                    try {
                        const newsData = results.data as any[];
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
                        resolve(formattedNews.filter(Boolean) as NewsItem[]);
                    } catch(e) {
                      reject(e);
                    }
                },
                error: (error: any) => {
                    console.error("Error parsing CSV:", error);
                    reject(error);
                },
            });
        });
    } catch (error) {
        console.error("Error fetching Google Sheet:", error);
        return [];
    }
}
