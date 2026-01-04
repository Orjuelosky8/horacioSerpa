
"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RankingModal } from "@/components/gamification/ranking-modal";

const navLinks = [
  { href: "#propuestas", label: "Propuestas", description: "Descubre las ideas y proyectos para construir un futuro mejor." },
  { href: "#biografia", label: "Quién Soy", description: "Aquí conocerás más sobre mi historia, mis raíces y mi trayectoria." },
  { href: "#noticias", label: "Noticias", description: "Mantente al día con las últimas novedades y actividades de la campaña." },
  { href: "#galeria", label: "Galería", description: "Un recorrido visual por nuestra campaña." },
  { href: "#unete", label: "Únete", description: "Tu apoyo es fundamental. ¡Súmate al cambio y participa activamente!" },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);

      const sections = navLinks.map(link => {
        const elem = document.querySelector(link.href);
        return elem ? elem : null;
      }).filter(Boolean);

      let currentSection = "";

      sections.forEach(section => {
        if (section) {
          const sectionTop = (section as HTMLElement).offsetTop;
          if (window.scrollY >= sectionTop - 100) {
            currentSection = `#${section.id}`;
          }
        }
      });
      setActiveLink(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-40 w-full transition-all duration-300",
      isScrolled ? "border-border/50 bg-background/80 backdrop-blur-xl" : "bg-transparent border-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-2 md:pl-0 transition-opacity duration-300",
            !isScrolled ? "md:opacity-0 md:pointer-events-none" : "opacity-100"
          )}
        >
          <Image
            src="/Landpage/logoSerpaRojo.png"
            alt="Logo Horacio Serpa"
            width={140}
            height={30}
            className="h-auto"
          />
        </Link>
        <TooltipProvider delayDuration={150}>
          <nav className={cn(
            "hidden items-center justify-center rounded-full border bg-secondary/50 px-4 py-2 shadow-sm md:flex transition-opacity duration-300",
            !isScrolled ? "md:opacity-0 md:pointer-events-none" : "opacity-100"
          )}>
            {navLinks.map((link) => (
              <Tooltip key={link.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                      activeLink === link.href && "text-primary-foreground"
                    )}
                  >
                    {activeLink === link.href && (
                      <span className="absolute inset-0 -z-10 rounded-full bg-primary" />
                    )}
                    {link.label}
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{link.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </nav>
        </TooltipProvider>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "md:hidden transition-all duration-300",
                  isScrolled ? "text-foreground" : "text-white hover:text-white hover:bg-white/10"
                )}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="sr-only">Menú de Navegación</SheetTitle>
              <nav className="flex flex-col gap-6 pt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Button asChild className={cn(
            "hidden md:inline-flex rounded-full transition-opacity duration-300",
            !isScrolled ? "md:opacity-0 md:pointer-events-none" : "opacity-100"
          )}>
            <Link href="#unete">Únete</Link>
          </Button>

          <div className={cn(
            "hidden md:block transition-opacity duration-300",
            !isScrolled ? "md:opacity-0 md:pointer-events-none" : "opacity-100"
          )}>
            <RankingModal />
          </div>
        </div>
      </div>
    </header>
  );
}
