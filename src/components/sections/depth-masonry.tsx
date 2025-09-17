
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NewsItem } from "@/lib/news";


function FlipCard({ item, className }: { item: NewsItem; className?: string }) {
  const [flipped, setFlipped] = useState(false);

  const toggle = useCallback(() => setFlipped((v) => !v), []);
  const onKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  }, [toggle]);

  return (
    <Card
      className={cn(
        "group relative h-full overflow-hidden border-0 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
        "[perspective:1200px]",
        className
      )}
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-700 ease-out",
          "[transform-style:preserve-3d]",
          "group-hover:[transform:rotateY(180deg)]",
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        <div
          className={cn(
            "bg-gold",
            "[backface-visibility:hidden]",
            "rounded-2xl overflow-hidden flex flex-col h-full"
          )}
        >
          <CardHeader className="p-0 relative">
            <div className="relative aspect-[4/3]">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={800}
                height={600}
                className="h-full w-full object-cover"
                data-ai-hint={item.aiHint}
                priority={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute left-4 top-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                  {item.category}
                </span>
                {item.date && (
                  <span className="rounded-full bg-black/50 px-2 py-1 text-[10px] text-white backdrop-blur flex items-center gap-1">
                    <CalendarDays className="h-3 w-3"/>
                    {item.date}
                  </span>
                )}
                 {item.readingTime && (
                  <span className="rounded-full bg-black/50 px-2 py-1 text-[10px] text-white backdrop-blur flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {item.readingTime} min.
                  </span>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-grow">
            <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
            <p className="mt-3 text-sm text-muted-foreground">{item.excerpt}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-6 pt-0">
            <Button variant="link" asChild className="p-0 text-sm">
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                Leer más <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <button
              type="button"
              onClick={toggle}
              onKeyDown={onKey}
              aria-pressed={flipped}
              aria-label="Ver más información"
              className="rounded-full border px-3 py-1 text-xs text-muted-foreground hover:bg-muted md:hidden"
            >
              Ver más
            </button>
          </CardFooter>
        </div>

        <div
          className={cn(
            "absolute inset-0",
            "bg-background",
            "[transform:rotateY(180deg)] [backface-visibility:hidden]",
            "rounded-2xl overflow-hidden flex flex-col h-full"
          )}
        >
          <CardHeader className="p-6 pb-0">
            <p className="text-xs font-semibold text-primary">Detalles</p>
            <CardTitle className="mt-1 font-headline text-lg">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4 flex-grow">
            <p className="text-sm text-muted-foreground">{item.excerpt}</p>
            <div className="grid grid-cols-1 gap-3 text-sm">
              {item.date && (
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>Publicado: {item.date}</span>
                </div>
              )}
              {item.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Lectura: {item.readingTime} min. aprox.</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-6 pt-0">
            <Button size="sm" onClick={toggle} className="md:hidden">
              Volver
            </Button>
            <Button variant="link" asChild className="p-0 text-sm">
               <a href={item.link} target="_blank" rel="noopener noreferrer">
                Leer artículo completo <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </CardFooter>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(600px_200px_at_0%_-10%,rgba(255,255,255,0.18),transparent_60%)]" />
    </Card>
  );
}

export default function DepthMasonry({ newsItems }: { newsItems: NewsItem[] }) {
  return (
    <section id="noticias" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Noticias y Actividades
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Mantente al día con las últimas noticias, eventos y comunicados de la campaña.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item, idx) => (
            <FlipCard key={idx} item={item} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <a 
              href="https://www.vanguardia.com/autor/horacio-jose-serpa/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Ver todas las noticias
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
