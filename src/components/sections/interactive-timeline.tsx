
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
    imageUrl: "https://placehold.co/400x500.png",
    aiHint: "graduation scroll",
  },
  {
    icon: Gavel,
    date: "1970 - 1980",
    title: "Inicios en la Judicatura",
    description: "Ejerce como Juez en Barrancabermeja.",
    imageUrl: "https://placehold.co/400x500.png",
    aiHint: "judge gavel court",
  },
  {
    icon: Briefcase,
    date: "1986 - 2002",
    title: "Congresista y Ministro",
    description: "Destacada carrera en el Congreso y como Ministro del Interior.",
    imageUrl: "https://placehold.co/400x500.png",
    aiHint: "politics congress",
  },
  {
    icon: BookOpen,
    date: "2006 - 2014",
    title: "Gobernador de Santander",
    description: "Lidera el departamento, impulsando proyectos de desarrollo.",
    imageUrl: "https://placehold.co/400x500.png",
    aiHint: "map region",
  },
];

export default function InteractiveTimeline() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

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

        {/* Floating Image Display */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
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

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          {timelineEvents.map((event, index) => (
            <div
              key={index}
              className="relative mb-8 flex items-center"
              onMouseEnter={() => setHoveredImage(event.imageUrl)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div
                className={`flex w-full items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8" : "pl-8"
                  }`}
                >
                  <Card className="backdrop-blur-sm bg-background/50 transition-all duration-300 hover:shadow-2xl hover:bg-background/80">
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
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background ring-4 ring-primary">
                <event.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
