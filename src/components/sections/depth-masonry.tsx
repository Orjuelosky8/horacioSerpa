
"use client";

import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import type { NewsItem } from "@/lib/news";
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Card
      className="group relative h-full overflow-hidden border-0 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-card flex flex-col"
    >
      <CardHeader className="p-0 relative">
        <div className="relative aspect-[4/3]">
          <Image
            src="/News/ImagenHoracioVanguardia.jpg"
            alt={item.title}
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
        <p className="mt-3 text-sm text-muted-foreground line-clamp-3">{item.excerpt}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-6 pt-0">
        <Button variant="link" asChild className="p-0 text-sm">
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            Leer más <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default function DepthMasonry({ newsItems }: { newsItems: NewsItem[] }) {
  const options: EmblaOptionsType = { loop: true, align: 'start' };
  const autoplay = useRef(Autoplay({ delay: 3000, stopOnInteraction: true, stopOnMouseEnter: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current]);
  
  useEffect(() => {
    if (!emblaApi) return;
    // Lógica adicional si es necesaria
  }, [emblaApi]);


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

        {newsItems.length > 0 ? (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6">
              {newsItems.map((item, idx) => (
                <div className="flex-[0_0_90%] sm:flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_33.333%] pl-6" key={idx}>
                  <NewsCard item={item} />
                </div>
              ))}
            </div>
          </div>
        ) : (
           <div className="text-center text-muted-foreground border-2 border-dashed border-muted-foreground/30 rounded-lg p-12">
             <p>No hay noticias para mostrar en este momento.</p>
           </div>
        )}
        

        <div className="mt-16 text-center">
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
