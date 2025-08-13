"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, GraduationCap, Gavel } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const timelineEvents = [
  {
    icon: GraduationCap,
    date: "1965",
    title: "Grado en Derecho",
    description: "Obtiene su título de abogado de la Universidad del Atlántico.",
    imageUrl: "/Timeline/hs1.png",
    aiHint: "graduation scroll",
  },
  {
    icon: Gavel,
    date: "1970 - 1980",
    title: "Inicios en la Judicatura",
    description: "Ejerce como Juez en Barrancabermeja.",
    imageUrl: "/Timeline/hs2.jpg",
    aiHint: "judge gavel court",
  },
  {
    icon: Briefcase,
    date: "1986 - 2002",
    title: "Congresista y Ministro",
    description: "Destacada carrera en el Congreso y como Ministro del Interior.",
    imageUrl: "/Timeline/hs3.jpg",
    aiHint: "politics congress",
  },
  {
    icon: BookOpen,
    date: "2006 - 2014",
    title: "Gobernador de Santander",
    description: "Lidera el departamento, impulsando proyectos de desarrollo.",
    imageUrl: "/Timeline/hs4.jpg",
    aiHint: "map region",
  },
];

export default function InteractiveTimeline() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null); // se mantiene (no usado visualmente)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="biografia" className="relative w-full overflow-hidden py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Quién Soy
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Un recorrido por una vida dedicada al servicio público y a la construcción de una Colombia más justa.
          </p>
        </div>

        {/* Floating Image Display (conservado pero oculto) */}
        <div className="pointer-events-none absolute inset-0 hidden">
          <Image
            src={hoveredImage || "https://placehold.co/400x500.png"}
            alt="Timeline Event"
            width={300}
            height={400}
            className={cn(
              "rounded-lg object-cover shadow-2xl transition-all duration-500 ease-in-out",
              hoveredImage ? "opacity-100 scale-100" : "opacity-0 scale-90"
            )}
          />
        </div>

        {/* Línea central de la timeline */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border" />

          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0; // tarjeta a la izquierda en layout alternado
            const isHovered = hoveredIndex === index;

            return (
              <div key={index} className="relative mb-16">
                {/* Ícono en la línea */}
                <div className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background ring-4 ring-primary">
                  <event.icon className="h-5 w-5 text-primary" />
                </div>

                {/* FILA PRINCIPAL: tarjeta alterna izquierda/derecha */}
                <div className={cn("relative flex items-center", isLeft ? "justify-start" : "justify-end")}
                >
                  <div className={cn("w-full sm:w-5/6 md:w-1/2", isLeft ? "pr-0 md:pr-8" : "pl-0 md:pl-8")}
                  >
                    {/* Accesibilidad: hover/focus para mostrar imagen; sin click */}
                    <button
                      type="button"
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onFocus={() => setHoveredIndex(index)}
                      onBlur={() => setHoveredIndex(null)}
                      onTouchStart={() => setHoveredIndex(index)}
                      className="block w-full text-left focus:outline-none"
                      aria-describedby={`hint-${index}`}
                    >
                      <Card className={cn(
                        "backdrop-blur-sm bg-background/50 transition-all duration-300 hover:shadow-2xl hover:bg-background/80",
                        isHovered && "ring-2 ring-primary"
                      )}>
                        <CardHeader>
                          <CardTitle className="font-headline flex items-center gap-4">
                            <div>
                              <p className="text-sm font-semibold text-primary">{event.date}</p>
                              <h3 className="text-lg">{event.title}</h3>
                            </div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <p id={`hint-${index}`} className="sr-only">Ilustración sugerida: {event.aiHint}</p>
                        </CardContent>
                      </Card>
                    </button>

                    {/* IMAGEN EN MÓVIL (sm) – aparece al hacer hover/focus/touch */}
                    <div
                      className={cn(
                        "md:hidden mt-4 transition-opacity opacity-50",
                        isHovered ? "opacity-100" : "opacity-50 pointer-events-none"
                      )}
                    >
                      <div className="relative">
                        <Image
                          src={event.imageUrl}
                          alt={`Ilustración: ${event.title}`}
                          width={300}
                          height={150}
                          className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                        {/* Flecha hacia la tarjeta (arriba del borde superior) */}
                        <span
                          className={cn(
                            "absolute -top-2 left-4 block h-3 w-3 rotate-45 bg-background shadow",
                            // en móvil la tarjeta siempre está arriba de la imagen
                            ""
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* IMAGEN EN PANTALLAS MEDIANAS (md) – lado opuesto a la tarjeta */}
                <div
                  className={cn(
                    "hidden md:block lg2:hidden absolute top-1/2 -translate-y-1/2 transition-all duration-300",
                    isHovered ? "opacity-100" : "opacity-0 pointer-events-none",
                    isLeft ? "right-0 translate-x" : "left-0 -translate-x"
                  )}
                >
                  <div className="relative">
                    <Image
                      src={event.imageUrl}
                      alt={`Ilustración: ${event.title}`}
                      width={320}
                      height={150}
                      className="rounded-lg shadow-xl object-cover"
                    />
                    {/* Flecha apuntando hacia la tarjeta (hacia el centro de la timeline) */}
                    <span
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 block h-3 w-3 rotate-45 bg-background shadow",
                        isLeft ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"
                      )}
                    />
                  </div>
                </div>

                {/* IMAGEN EN PANTALLAS GRANDES (lg+) – mismo lado que la tarjeta pero más hacia afuera */}
                <div
                  className={cn(
                    "hidden lg2:block absolute top-1/2 -translate-y-1/2 transition-all duration-300",
                    isHovered ? "opacity-100" : "opacity-0 pointer-events-none",
                    isLeft ? "left-0 -translate-x-[120%]" : "right-0 translate-x-[120%]"
                  )}
                >
                  <div className="relative">
                    <Image
                      src={event.imageUrl}
                      alt={`Ilustración: ${event.title}`}
                      width={200}
                      height={300}
                      className="rounded-xl shadow-2xl object-cover"
                    />
                    {/* Flecha apuntando hacia la tarjeta (inward) */}
                    <span
                      className={cn(
                        "absolute top-1/2 -translate-y-1/2 block h-3 w-3 rotate-45 bg-background shadow",
                        isLeft ? "right-0 translate-x-1/2" : "left-0 -translate-x-1/2"
                      )}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
