"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Home, BookOpen, Briefcase, GraduationCap, Gavel, Building, Users, Instagram, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";


const timelineEvents = [
  {
    icon: Home,
    date: "1982",
    title: "Origen y raíces",
    description:
      "Nace en Barrancabermeja el 20 de julio de 1982, hijo del jurista y líder liberal Horacio Serpa Uribe. Desde joven hereda un profundo compromiso con el servicio público y la defensa de los derechos ciudadanos.",
    imageUrl: "/Timeline/hs0.jpg",
    aiHint: "birth family roots",
    reelUrl: "https://www.instagram.com/reel/Cy1ESFWAwZC/",
  },
  {
    icon: GraduationCap,
    date: "2000s",
    title: "Formación académica",
    description:
      "Administrador de Empresas del CESA, estudios en Negocios Internacionales y Política Económica en American University (EE. UU.), práctica en el BID, especialización en Gobierno y Asuntos Públicos (Externado/Columbia University) y Magíster en Gobierno y Políticas Públicas.",
    imageUrl: "/Timeline/hs1.png",
    aiHint: "university graduation academic achievement",
    reelUrl: "https://www.instagram.com/p/DF-Yn4oRNrt/",
  },
  {
    icon: Briefcase,
    date: "2004 - 2008",
    title: "Experiencia en el sector privado",
    description:
      "Trabaja en la Banca Corporativa de Bancolombia y como consultor en 7-24 Consultores, adquiriendo conocimientos clave sobre el sector empresarial y financiero.",
    imageUrl: "/Timeline/hs2.jpg",
    aiHint: "corporate business work",
    reelUrl: "https://www.instagram.com/p/DF2ywvPJL0s/",
  },
  {
    icon: Building,
    date: "2011 - 2017",
    title: "Liderazgo en Bogotá",
    description:
      "Elegido Concejal de Bogotá, impulsa la creación de la Secretaría de Seguridad y la Secretaría de la Mujer. En 2017 es elegido por unanimidad Presidente del Concejo, destacando por su capacidad de diálogo y liderazgo.",
    imageUrl: "/Timeline/hs3.jpg",
    aiHint: "city government council leadership",
    reelUrl: "https://www.instagram.com/reel/C2Xq4g_uO9v/",
  },
  {
    icon: Gavel,
    date: "2018 - 2022",
    title: "Senado de la República",
    description:
      "Con más de 93.000 votos, llega al Senado. Promueve leyes como Matrícula Cero, Ley de Turismo y Registro de Obras Inconclusas, beneficiando a miles de colombianos y apoyando el desarrollo en tiempos de crisis.",
    imageUrl: "/Timeline/hs4.jpg",
    aiHint: "politics congress lawmaking",
    reelUrl: "https://www.instagram.com/reel/C2Xq4g_uO9v/",
  },
  {
    icon: Users,
    date: "2023",
    title: "Compromiso con Bucaramanga",
    description:
      "Candidato a la Alcaldía de Bucaramanga con la campaña ciudadana 'Ser Pa’ la Gente'. Aunque no resultó electo, reafirmó su compromiso con el progreso de su tierra natal.",
    imageUrl: "/Timeline/hs5.jpg",
    aiHint: "city leadership campaign",
    reelUrl: "https://www.instagram.com/reel/C2Xq4g_uO9v/",
  },
];

function ReelModal({ isOpen, onOpenChange, reelUrl, title }: { isOpen: boolean, onOpenChange: (open: boolean) => void, reelUrl: string | null, title: string | null }) {
  if (!reelUrl || !title) return null;

  const embedUrl = reelUrl.endsWith('/') ? `${reelUrl}embed` : `${reelUrl}/embed`;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "max-w-md w-[90vw] h-[75vh] p-0 bg-transparent border-0 shadow-2xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95"
        )}
      >
        <DialogHeader className="sr-only">
            <DialogTitle>Instagram Reel: {title}</DialogTitle>
        </DialogHeader>
        <div className="relative w-full mx-auto">
          {/* Borde degradado de marca */}
          <div
            className={cn(
              "relative w-full h-full rounded-[36px] p-[3px]",
              "bg-gradient-to-br from-[#bd9b53] via-[#db143c] to-[#bd9b53]",
              // Ligero hover sin exagerar
              "transition-transform duration-300 motion-reduce:transition-none",
              // "hover:scale-[1.02]"
            )}
          >
            {/* Marco oscuro + vidrio */}
            <div
              className={cn(
                "relative w-full h-[70vh] rounded-[32px] bg-[#0b0b0c]/90",
                "backdrop-blur-md ring-1 ring-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.45)]"
              )}
            >
              {/* Notch/acento sutil */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[7px] rounded-b-md
                              bg-gradient-to-r from-[#bd9b53] to-[#db143c] opacity-90" />

              {/* Panel de reproducción */}
              <div className="absolute inset-[10px] rounded-2xl overflow-hidden bg-black/80 ring-1 ring-white/10">
                <iframe
                  src={embedUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  title={`Instagram Reel: ${title}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Cerrar */}
        <DialogHeader className="absolute top-2 right-2 z-10 sr-only">
          <DialogTitle>Instagram Reel: {title}</DialogTitle>
        </DialogHeader>

        <DialogClose asChild>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-3 right-3 rounded-full",
              "bg-black/40 hover:bg-black/60",
              "ring-1 ring-white/10 focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-black/40",
              "focus-visible:ring-[#ececd4]"
            )}
          >
            <X className="h-5 w-5 text-[#ececd4]" />
            <span className="sr-only">Cerrar</span>
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}





export default function InteractiveTimeline() {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null); // se mantiene (no usado visualmente)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReelUrl, setSelectedReelUrl] = useState<string | null>(null);
  const [selectedReelTitle, setSelectedReelTitle] = useState<string | null>(null);


  const handleOpenReel = (reelUrl: string, title: string) => {
    setSelectedReelUrl(reelUrl);
    setSelectedReelTitle(title);
    setIsModalOpen(true);
  };


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
                    <div
                      role="group"
                      tabIndex={0}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      onFocus={() => setHoveredIndex(index)}
                      onBlur={() => setHoveredIndex(null)}
                      onTouchStart={() => setHoveredIndex(index)}
                      className="block w-full text-left focus:outline-none"
                      aria-describedby={`hint-${index}`}
                    >
                      <Card className={cn(
                        "backdrop-blur-sm bg-background/50 transition-all duration-300 hover:shadow-2xl hover:bg-background/80 flex flex-col h-full",
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
                        <CardContent className="flex-grow">
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                          <p id={`hint-${index}`} className="sr-only">Ilustración sugerida: {event.aiHint}</p>
                        </CardContent>
                        {event.reelUrl && (
                          <CardFooter className="pt-4">
                              <Button variant="outline" size="sm" className="w-full" onClick={() => handleOpenReel(event.reelUrl, event.title)}>
                                <Instagram className="mr-2 h-4 w-4" />
                                Ver Reel
                              </Button>
                          </CardFooter>
                        )}
                      </Card>
                    </div>

                    {/* IMAGEN EN MÓVIL (sm) – aparece al hacer hover/focus/touch */}
                    <div
                      className={cn(
                        "md:hidden mt-4 transition-opacity opacity-100",
                        // isHovered ? "opacity-100" : "opacity-50 pointer-events-none"
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
                      width={300}
                      height={350}
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
       <ReelModal 
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        reelUrl={selectedReelUrl}
        title={selectedReelTitle}
       />
    </section>
  );
}
