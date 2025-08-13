import { Card, CardContent } from "@/components/ui/card";
import { Twitter } from "lucide-react";

export default function LiveCubesphere() {
  return (
    <section id="social" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Muro Social
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Sigue la conversación en tiempo real y únete a nuestra comunidad en redes sociales.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            
            {/* Twitter/X Embed */}
            <Card className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl col-span-1 md:col-span-2 lg:col-span-1">
              <CardContent className="p-4">
                <blockquote className="twitter-tweet" data-theme="light">
                  <p lang="es" dir="ltr">Hoy en Barrancabermeja, dialogando con la comunidad sobre el futuro de la industria y el empleo. ¡La energía de la gente es nuestra mayor fortaleza! <a href="https://twitter.com/hashtag/ColombiaJusta?src=hash&amp;ref_src=twsrc%5Etfw">#ColombiaJusta</a></p>
                  &mdash; Horacio Serpa (@HoracioJSerpa) <a href="https://twitter.com/HoracioJSerpa/status/1798791566151815168">June 6, 2024</a>
                </blockquote>
              </CardContent>
            </Card>

            {/* Instagram Embed */}
            <Card className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardContent className="p-0">
                <blockquote 
                  className="instagram-media" 
                  data-instgrm-permalink="https://www.instagram.com/p/C7_QY2vRUeK/" 
                  data-instgrm-version="14"
                  style={{ background: '#FFF', border: '0', borderRadius: '3px', boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)', margin: '1px', maxWidth: '540px', minWidth: '326px', padding: '0', width: '99.375%' }}>
                </blockquote>
              </CardContent>
            </Card>
            
            {/* TikTok Embed could go here, but requires more complex scripting */}
            <Card className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl p-4 flex flex-col items-center justify-center text-center bg-background/50">
               <svg className="h-12 w-12 text-primary mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.92-2.3-4.45-2.2-6.87.02-1.11.23-2.21.72-3.26.49-1.05 1.24-1.97 2.19-2.73.95-.76 2.06-1.32 3.23-1.66.02-3.12.02-6.23.01-9.35.01-1.6.93-3.16 2.4-3.95a4.5 4.5 0 0 1 4.78.01c.8.45 1.36 1.25 1.62 2.16.27.91.31 1.86.1 2.78-1.46-.04-2.92-.02-4.38-.02-.02-1.48-.46-2.93-1.63-3.95-1.2-1.04-2.9-.84-4.06.39-.77.83-1.12 1.9-1.11 3.03.01 6.31.01 12.62.01 18.93-.01.91.26 1.81.82 2.53.56.72 1.38 1.16 2.27 1.26.89.1 1.79-.18 2.59-.72.8-.54 1.34-1.36 1.58-2.28.24-.92.25-1.87.04-2.8-.01-3.33.01-6.66-.02-9.99z"></path>
                </svg>
              <h3 className="font-headline text-xl font-semibold">Sigue en TikTok</h3>
              <p className="text-muted-foreground mt-2">Descubre los videos más recientes y únete a los trends de la campaña.</p>
              <a href="https://www.tiktok.com/@horaciojserpa" target="_blank" rel="noopener noreferrer" className="mt-4 inline-block bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold">
                Ver Perfil
              </a>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}
