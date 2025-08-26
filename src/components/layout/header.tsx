"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

const navLinks = [
  { href: "#biografia", label: "Quién Soy", description: "Aquí conocerás más sobre mi historia, mis raíces y mi trayectoria." },
  { href: "#propuestas", label: "Propuestas", description: "Descubre las ideas y proyectos para construir un futuro mejor." },
  { href: "#noticias", label: "Noticias", description: "Mantente al día con las últimas novedades y actividades de la campaña." },
  { href: "#habla-con-ia", label: "Habla con mi IA", description: "Conversa con mi asistente virtual para resolver tus dudas al instante." },
  { href: "#unete", label: "Únete", description: "Tu apoyo es fundamental. ¡Súmate al cambio y participa activamente!" },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

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
      isScrolled ? "border-border/50 bg-[#ffd16f]/80 backdrop-blur-xl" : "bg-transparent border-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 md:pl-0">
          <Image
            src="/Landpage/HoracioSerpa_logo.png"
            alt="Logo Horacio Serpa"
            width={140}
            height={30}
            className="h-auto"
          />
        </Link>
        <TooltipProvider delayDuration={150}>
          <nav className="hidden items-center justify-center rounded-full border bg-secondary/50 px-4 py-2 shadow-sm md:flex">
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
              <Button variant="ghost" size="icon" className={cn("md:hidden", !isScrolled && "text-white hover:text-white hover:bg-white/10")}>
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
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
          <Button asChild className={cn("hidden md:inline-flex rounded-full", !isScrolled && "bg-white/10 border border-white/20 text-white hover:bg-white/20")}>
            <Link href="#contacto">Contacto</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
