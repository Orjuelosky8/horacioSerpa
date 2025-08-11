"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#biografia", label: "Quién Soy" },
  { href: "#propuestas", label: "Propuestas" },
  { href: "#noticias", label: "Noticias" },
  { href: "#unete", label: "Únete" },
];

export default function Header() {
  const [activeLink, setActiveLink] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = navLinks.map(link => document.querySelector(link.href));
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
      isScrolled ? "border-b border-border/50 bg-background/80 backdrop-blur-xl" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-headline text-2xl font-bold">
            <span className="text-primary">Serpa</span>
            <span className="font-light text-foreground/80">Inmersivo</span>
          </span>
        </Link>
        <nav className="hidden items-center justify-center rounded-full border bg-secondary/50 px-4 py-2 shadow-sm md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
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
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
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
          <Button asChild className="hidden md:inline-flex rounded-full">
            <Link href="#contacto">Contacto</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
