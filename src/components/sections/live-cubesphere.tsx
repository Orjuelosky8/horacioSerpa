
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Instagram, Twitter } from "lucide-react";

const socialLinks = [
    {
        name: "Twitter / X",
        user: "@HoracioJSerpa",
        description: "Mantente al día con las últimas noticias y opiniones en tiempo real.",
        url: "https://x.com/HoracioJSerpa",
        icon: <Twitter className="h-8 w-8" />,
        cta: "Síguenos en X",
    },
    {
        name: "Instagram",
        user: "@horaciojserpa",
        description: "Descubre el lado más cercano de la campaña, con fotos y videos exclusivos.",
        url: "https://www.instagram.com/horaciojserpa/",
        icon: <Instagram className="h-8 w-8" />,
        cta: "Síguenos en Instagram",
    },
    {
        name: "TikTok",
        user: "@horaciojserpa",
        description: "Únete a las tendencias y conoce nuestras propuestas de una forma diferente.",
        url: "https://www.tiktok.com/@horaciojserpa",
        icon: <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.92-2.3-4.45-2.2-6.87.02-1.11.23-2.21.72-3.26.49-1.05 1.24-1.97 2.19-2.73.95-.76 2.06-1.32 3.23-1.66.02-3.12.02-6.23.01-9.35.01-1.6.93-3.16 2.4-3.95a4.5 4.5 0 0 1 4.78.01c.8.45 1.36 1.25 1.62 2.16.27.91.31 1.86.1 2.78-1.46-.04-2.92-.02-4.38-.02-.02-1.48-.46-2.93-1.63-3.95-1.2-1.04-2.9-.84-4.06.39-.77.83-1.12 1.9-1.11 3.03.01 6.31.01 12.62.01 18.93-.01.91.26 1.81.82 2.53.56.72 1.38 1.16 2.27 1.26.89.1 1.79-.18 2.59-.72.8-.54 1.34-1.36 1.58-2.28.24-.92.25-1.87.04-2.8-.01-3.33.01-6.66-.02-9.99z"></path></svg>,
        cta: "Síguenos en TikTok",
    },
];

export default function LiveCubesphere() {
  return (
    <section id="social" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="inline-block bg-background/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl">
            <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Únete a la Conversación
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Tu voz es importante. Síguenos en nuestras redes sociales y sé parte activa del cambio.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {socialLinks.map((social) => (
                <Card key={social.name} className="flex flex-col text-center p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-background/50">
                    <CardContent className="flex flex-col items-center flex-1">
                        <div className="text-primary mb-4">
                            {social.icon}
                        </div>
                        <h3 className="font-headline text-2xl font-semibold">{social.name}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{social.user}</p>
                        <p className="text-muted-foreground flex-1 mb-6">{social.description}</p>
                        <Button size="lg" className="w-full mt-auto" asChild>
                            <a href={social.url} target="_blank" rel="noopener noreferrer">
                                {social.cta}
                            </a>
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </section>
  );
}
