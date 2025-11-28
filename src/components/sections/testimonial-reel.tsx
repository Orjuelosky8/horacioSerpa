
"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Ana María García",
    role: "Líder Comunitaria, Medellín",
    quote:
      "Horacio siempre ha escuchado a la gente. Su experiencia es la garantía que necesitamos para un futuro con más oportunidades para todos.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "portrait woman",
  },
  {
    name: "Carlos Rodríguez",
    role: "Pequeño Empresario, Cali",
    quote:
      "Su compromiso con el desarrollo económico local es real. Conoce los desafíos que enfrentamos y tiene propuestas claras para apoyarnos.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "portrait man smiling",
  },
  {
    name: "Sofía Castro",
    role: "Estudiante Universitaria, Bogotá",
    quote:
      "Necesitamos líderes que crean en la educación como motor de cambio. Las propuestas de Horacio para los jóvenes nos devuelven la esperanza.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "portrait person",
  },
  {
    name: "Javier Torres",
    role: "Agricultor, Boyacá",
    quote:
      "El campo necesita apoyo y políticas serias. Horacio Serpa entiende nuestras necesidades y ha demostrado con hechos que está de nuestro lado.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "farmer portrait",
  },
  {
    name: "Elena Vélez",
    role: "Docente, Barranquilla",
    quote:
      "Su visión para la educación es inspiradora. Se nota que entiende la importancia de invertir en nuestros niños y maestros.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "teacher portrait",
    },
  {
    name: "Luis Fernando Rojas",
    role: "Emprendedor Tecnológico",
    quote:
      "Las propuestas para la innovación y el empleo son exactamente lo que el país necesita para ser más competitivo. Un líder con visión de futuro.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "tech entrepreneur",
    },
];

const DUPLICATION_FACTOR = 2; // Duplicar para el bucle infinito

export default function TestimonialReel() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    scroller.setAttribute("data-animated", "true");

    const scrollerInner = scroller.querySelector(".scroller__inner");
    if (!scrollerInner) return;

    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true) as HTMLElement;
      duplicatedItem.setAttribute("aria-hidden", "true");
      scrollerInner.appendChild(duplicatedItem);
    });
  }, []);

  return (
    <section id="testimonios" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="inline-block bg-background/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl">
            <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Voces que nos Inspiran
            </h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
              Testimonios de ciudadanos que, como tú, creen en un futuro mejor para Colombia.
            </p>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="scroller group relative z-10 w-full overflow-hidden"
          style={{
            mask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)",
            WebkitMask: "linear-gradient(90deg, transparent, white 20%, white 80%, transparent)"
          }}
        >
          <div className="scroller__inner flex w-max flex-nowrap gap-8 py-4 animate-scroll group-hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card key={index} className="w-80 flex-shrink-0 md:w-96 bg-background/80 backdrop-blur-sm shadow-lg">
                <CardContent className="flex h-full flex-col p-6 md:p-8">
                  <blockquote className="flex-1 text-base italic text-muted-foreground border-l-4 border-primary pl-4">
                    {testimonial.quote}
                  </blockquote>
                  <div className="mt-6 flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/50">
                    <AvatarFallback className="text-lg font-semibold">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
       <style jsx global>{`
        @keyframes scroll {
          to {
            transform: translate(calc(-50% - 1rem));
          }
        }
        .scroller__inner {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
}
