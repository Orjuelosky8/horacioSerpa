import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";
import { FaTiktok } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  const btnBase =
    "rounded-2xl h-14 w-14 border border-foreground/20 border-b-2 border-r-2 " +
    "text-muted-foreground shadow-sm shadow-black/10 mr-1 mb-1 " + // margen más pronunciado a la derecha/abajo
    "transition-all ease-out hover:rotate-[-360deg] " +
    "hover:bg-primary/10 hover:text-primary hover:border-primary/30";

  return (
    <footer className=" rounded-t-[25%] bg-[#d8b15d] backdrop-blur-lg mt-[-70px] pt-6 pb-2"> 
    {/* ffd16f es el anterior fondo (mas encendido) */}
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/Landpage/HoracioSerpa_logo.png"
            alt="Logo Horacio Serpa"
            width={160}
            height={45}
            className="h-auto"
            priority
          />

          {/* Frase con typewriter loop infinito (5s) y colores alternados */}
          <p className="mt-6 font-headline text-xl sm:text-2xl tracking-tight text-foreground text-center user-select-none">
            <span
              className="inline-block overflow-hidden align-bottom border-r border-current pr-1
              [animation:typeLoop_5s_steps(22,end)infinite,blink.9s_steps(1,end)_infinite]"
              style={{ whiteSpace: "nowrap", width: "0ch" }}
            >
              <span className="text-primary font-semibold">El cambio</span>{" "}
              <span className="text-foreground">que nos</span>{" "}
              <span className="text-primary font-semibold">une.</span>
            </span>
          </p>

          <p className="mt-0 font-headline text-2xl sm:text-3xl tracking-tight text-foreground text-center user-select-none">
            <span className="text-foreground italic text-sm">'Hagamos Historia(s)'</span>{" "}
          </p>

          {/* Redes */}
          <div className="mt-2 flex justify-center gap-5">
            <Button variant="ghost" size="icon" className={btnBase} asChild style={{ transitionDuration: "1500ms" }}>
              <Link href="https://www.facebook.com/horaciojserpa/?locale=es_LA" aria-label="Facebook">
                <Facebook className="h-9 w-9" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className={btnBase} asChild style={{ transitionDuration: "1500ms" }}>
              <Link href="https://www.instagram.com/horaciojserpa/?hl=es" aria-label="Instagram">
                <Instagram className="h-9 w-9" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className={btnBase} asChild style={{ transitionDuration: "1500ms" }}>
              <Link href="https://www.youtube.com/channel/UChc4BmK9Rd0tA-yg8knPaDA" aria-label="YouTube">
                <Youtube className="h-9 w-9" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className={btnBase} asChild style={{ transitionDuration: "1500ms" }}>
              <Link href="https://www.tiktok.com/@horaciojserpa?lang=es" aria-label="TikTok">
                <FaTiktok className="h-9 w-9" />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className={btnBase} asChild style={{ transitionDuration: "1500ms" }}>
              <Link href="https://chat.whatsapp.com/Kr6uQato4GN6GrmSZwxQ1H?mode=ems_copy_t" aria-label="WhatsApp">
                <FaWhatsapp className="h-9 w-9" />
              </Link>
            </Button>
          </div>

          {/* Divisor y derechos pegados abajo */}
          <div className="mt-8 w-full border-t border-border" />
          <p className="mt-4 text-xs text-muted-foreground">
            © {new Date().getFullYear()} Horacio Jose Serpa. Todos los derechos reservados. - Diseño de Página web por Politech IA.
          </p>
        </div>
      </div>
    </footer>
  );
}