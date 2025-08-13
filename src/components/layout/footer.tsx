import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Instagram } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center text-center">
          <Image 
            src="/Landpage/logoHoracioSerpa.png"
            alt="Logo Horacio Serpa"
            width={250}
            height={70}
            className="h-auto"
          />

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Inicio
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Biografía
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Propuestas
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Noticias
            </a>
            <a
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Únete
            </a>
          </div>
        </div>

        <hr className="my-6 border-border" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Campaña Horacio Serpa. Todos los derechos reservados.
          </p>

          <div className="-mx-2 mt-3 flex sm:mt-0">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://x.com/HoracioJSerpa" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.instagram.com/horaciojserpa/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
