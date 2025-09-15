
"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, Clock, MapPin, Pin, PinOff } from "lucide-react";
import { cn } from "@/lib/utils";

type NewsItem = {
  title: string;
  category: string;
  excerpt: string;
  imageUrl: string;
  aiHint?: string;
  // opcionales para la cara trasera
  details?: string;
  date?: string;
  location?: string;
  readTime?: string;
};

const newsItems: NewsItem[] = [
  {
    title: "Análisis de la Reforma a la Justicia",
    category: "Justicia",
    excerpt:
      "Un profundo vistazo a los puntos clave de la propuesta de reforma judicial y su impacto en el país.",
    imageUrl: "/News/not1.avif",
    aiHint: "justice law",
    details:
      "Puntos clave: acceso a la justicia, descongestión, digitalización de procesos y fortalecimiento de la defensoría.",
    date: "12 Ago 2025",
    location: "Bogotá, Colombia",
    readTime: "4 min",
  },
  {
    title: "Inversión Histórica en Educación Pública",
    category: "Educación",
    excerpt:
      "Detalles del plan para fortalecer la educación pública desde la primera infancia hasta la universidad.",
    imageUrl: "/News/not2.webp",
    aiHint: "education classroom",
    details:
      "Núcleos del plan: infraestructura, formación docente, conectividad y becas de acceso.",
    date: "10 Ago 2025",
    location: "Medellín, Colombia",
    readTime: "3 min",
  },
  {
    title: "Nuevo Modelo de Salud Preventiva",
    category: "Salud",
    excerpt:
      "Se presenta un enfoque en la prevención de enfermedades y el fortalecimiento de la atención primaria.",
    imageUrl: "/News/not3.jpg",
    aiHint: "health doctor",
    details:
      "Líneas: tamizaje temprano, rutas de atención, telemedicina y equipos territoriales.",
    date: "09 Ago 2025",
    location: "Cali, Colombia",
    readTime: "5 min",
  },
  {
    title: "Estrategias para la Generación de Empleo",
    category: "Empleo",
    excerpt:
      "Iniciativas para fomentar el emprendimiento y atraer inversión que genere empleos de calidad.",
    imageUrl: "/News/not4.jpg",
    aiHint: "jobs industry",
    details:
      "Ejes: simplificación regulatoria, clústeres regionales, compras públicas y economía creativa.",
    date: "08 Ago 2025",
    location: "Barranquilla, Colombia",
    readTime: "4 min",
  },
  {
    title: "Foro sobre Sostenibilidad Ambiental",
    category: "Medio Ambiente",
    excerpt: "Expertos debaten sobre el futuro de las energías limpias y la protección de la biodiversidad en Colombia.",
    imageUrl: "/News/not5.jpg",
    aiHint: "sustainability environment",
    details: "Se discutirán políticas de transición energética, economía circular y conservación de ecosistemas estratégicos.",
    date: "15 Ago 2025",
    location: "Leticia, Amazonas",
    readTime: "6 min"
  },
  {
    title: "Alianza por la Transparencia",
    category: "Gobierno",
    excerpt: "Presentamos una nueva plataforma digital para el seguimiento en tiempo real de la contratación pública.",
    imageUrl: "/News/ImagenHoracioVanguardia.jpg",
    aiHint: "transparency government",
    details: "La herramienta permitirá a cualquier ciudadano auditar los contratos estatales, promoviendo la veeduría.",
    date: "18 Ago 2025",
    location: "Virtual",
    readTime: "3 min"
  }
];

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
        // profundidad 3D
        "[perspective:1200px]",
        className
      )}
    >
      {/* Contenedor que rota */}
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-700 ease-out",
          "[transform-style:preserve-3d]",
          // hover en desktop
          "group-hover:[transform:rotateY(180deg)]",
          // estado en móvil/teclado
          flipped && "[transform:rotateY(180deg)]"
        )}
      >
        {/* Cara frontal */}
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
                width={1200}
                height={900}
                className="h-full w-full object-cover"
                data-ai-hint={item.aiHint}
                priority={false}
              />
              {/* overlay gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* categoría + fecha */}
              <div className="absolute left-4 top-4 flex items-center gap-2">
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground shadow">
                  {item.category}
                </span>
                {item.date ? (
                  <span className="rounded-full bg-black/50 px-2 py-1 text-[10px] text-white backdrop-blur">
                    {item.date}
                  </span>
                ) : null}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 flex-grow">
            <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
            <p className="mt-3 text-sm text-muted-foreground">{item.excerpt}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-6 pt-0">
            <Button variant="link" className="p-0 text-sm">
              Leer más <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {/* Indicador de flip */}
            <button
              type="button"
              onClick={toggle}
              onKeyDown={onKey}
              aria-pressed={flipped}
              aria-label="Ver más información de esta tarjeta"
              className="rounded-full border px-3 py-1 text-xs text-muted-foreground hover:bg-muted md:hidden"
            >
              Ver más
            </button>
          </CardFooter>
        </div>

        {/* Cara trasera */}
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
            {item.details ? (
              <p className="text-sm text-muted-foreground">{item.details}</p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Conoce los objetivos, el contexto y cómo te impacta esta iniciativa.
              </p>
            )}
            <div className="grid grid-cols-1 gap-3 text-sm">
              {item.date && (
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span>{item.date}</span>
                </div>
              )}
              {item.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{item.location}</span>
                </div>
              )}
              {item.readTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{item.readTime} de lectura</span>
                </div>
              )}
            </div>
            <ul className="list-disc pl-5 text-sm text-muted-foreground">
              <li>Contexto y objetivos</li>
              <li>Beneficios para la ciudadanía</li>
              <li>Cómo participar o informarte más</li>
            </ul>
          </CardContent>
          <CardFooter className="flex items-center justify-between p-6 pt-0">
            <Button size="sm" onClick={toggle} className="md:hidden">
              Volver
            </Button>
            <Button variant="link" className="p-0 text-sm">
              Leer artículo completo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </div>
      </div>

      {/* Capa de brillo sutil al hover */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(600px_200px_at_0%_-10%,rgba(255,255,255,0.18),transparent_60%)]" />
    </Card>
  );
}

export default function DepthMasonry() {
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
