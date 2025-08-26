import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/70 backdrop-blur-lg py-16">
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

          <p className="mt-6 font-headline text-xl sm:text-2xl tracking-tight text-foreground text-center">
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

          <p className="mt-0 font-headline text-2xl sm:text-3xl tracking-tight text-foreground text-center">
            <span className="text-foreground italic text-sm">'Hagamos Historia' </span>{" "}
          </p>

          <div className="mt-2 flex justify-center gap-8">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-16 w-16 text-muted-foreground hover:bg-primary/20 hover:text-primary"
              asChild
            >
              <Link href="https://facebook.com" aria-label="Facebook">
                <Facebook className="h-8 w-8" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-16 w-16 text-muted-foreground hover:bg-primary/20 hover:text-primary"
              asChild
            >
              <Link href="https://instagram.com" aria-label="Instagram">
                <Instagram className="h-8 w-8" />
              </Link>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="rounded-full h-16 w-16 text-muted-foreground hover:bg-primary/20 hover:text-primary"
              asChild
            >
              <Link href="https://youtube.com" aria-label="YouTube">
                <Youtube className="h-8 w-8" />
              </Link>
            </Button>
          </div>



          <p className="mt-8 text-sm text-muted-foreground">
            © {new Date().getFullYear()} Horacio Serpa. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}