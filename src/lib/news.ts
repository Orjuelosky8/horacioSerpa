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
        
        return new Promise((resolve, reject) => {
            Papa.parse(csvText, {
                header: true,
                complete: (results) => {
                    const newsData = results.data as any[];
                    const formattedNews: NewsItem[] = newsData.slice(0, 6).map((row, index) => {
                      if (!row.Titulo) return null; // Skip empty rows
                      
                      const content = row.Contenido || "Contenido no disponible.";
                      const excerpt = content.length > 100 ? content.substring(0, 100) + '...' : content;
                      
                      return {
                        title: row.Titulo || "Título no disponible",
                        date: row.Fecha_Publicacion || new Date().toLocaleDateString(),
                        excerpt: excerpt,
                        link: row.Link,
                        category: "Noticia",
                        imageUrl: `https://placehold.co/800x600?text=Noticia+${index + 1}`,
                        aiHint: "news article",
                        readingTime: Math.floor(content.split(" ").length / 200) || 2, // Estimate reading time
                    }});
                    resolve(formattedNews.filter(Boolean) as NewsItem[]);
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
