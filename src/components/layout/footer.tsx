import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <Image 
            src="/Landpage/HoracioSerpa_logo.png"
            alt="Logo Horacio Serpa"
            width={140}
            height={40}
            className="h-auto"
          />

          <p className="mt-4 font-headline text-xl text-foreground">
            El cambio que nos une.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <Button variant="ghost" size="icon" asChild className="rounded-full h-12 w-12 text-muted-foreground hover:bg-primary/10 hover:text-primary">
              <a href="https://x.com/HoracioJSerpa" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="rounded-full h-12 w-12 text-muted-foreground hover:bg-primary/10 hover:text-primary">
              <a href="https://www.instagram.com/horaciojserpa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="rounded-full h-12 w-12 text-muted-foreground hover:bg-primary/10 hover:text-primary">
                <a href="https://www.tiktok.com/@horaciojserpa" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-2.43.03-4.83-.95-6.43-2.88-1.59-1.92-2.3-4.45-2.2-6.87.02-1.11.23-2.21.72-3.26.49-1.05 1.24-1.97 2.19-2.73.95-.76 2.06-1.32 3.23-1.66.02-3.12.02-6.23.01-9.35.01-1.6.93-3.16 2.4-3.95a4.5 4.5 0 0 1 4.78.01c.8.45 1.36 1.25 1.62 2.16.27.91.31 1.86.1 2.78-1.46-.04-2.92-.02-4.38-.02-.02-1.48-.46-2.93-1.63-3.95-1.2-1.04-2.9-.84-4.06.39-.77.83-1.12 1.9-1.11 3.03.01 6.31.01 12.62.01 18.93-.01.91.26 1.81.82 2.53.56.72 1.38 1.16 2.27 1.26.89.1 1.79-.18 2.59-.72.8-.54 1.34-1.36 1.58-2.28.24-.92.25-1.87.04-2.8-.01-3.33.01-6.66-.02-9.99z"></path>
                  </svg>
                </a>
            </Button>
          </div>
        </div>

        <hr className="my-8 border-border" />

        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Campaña Horacio Serpa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}