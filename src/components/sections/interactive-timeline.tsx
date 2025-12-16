
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
    imageUrl: "/Timeline/hs4.jpeg",
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
              "transition-transform duration-300 motion-reduce:transition-none",
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReelUrl, setSelectedReelUrl] = useState<string | null>(null);
  const [selectedReelTitle, setSelectedReelTitle] = useState<string | null>(null);

  const handleOpenReel = (reelUrl: string, title: string) => {
    setSelectedReelUrl(reelUrl);
    setSelectedReelTitle(title);
    setIsModalOpen(true);
  };
  
  const cardVariants = {
    offscreen: {
      opacity: 0,
      x: -100,
    },
    onscreen: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: i * 0.2,
      },
    }),
  };

  const imageVariants = {
    offscreen: {
      opacity: 0,
      x: 100,
      scale: 0.8,
    },
    onscreen: (i: number) => ({
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 20,
        delay: i * 0.2,
      },
    }),
  };

  return (
    <section id="biografia" className="relative w-full overflow-hidden py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="inline-block bg-background/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl">
            <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Quién Soy
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Un recorrido por una vida dedicada al servicio público y a la construcción de una Colombia más justa.
            </p>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border/50" />

          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div key={index} className="relative mb-12 md:mb-16">
                
                {/* --- Vista de Escritorio --- */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-16 items-center">
                  <div className={cn(
                      "absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background ring-4 ring-primary"
                  )}>
                    <event.icon className="h-5 w-5 text-primary" />
                  </div>
                
                  {isLeft ? (
                    <>
                      {/* CARD (IZQUIERDA) */}
                      <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={cardVariants}
                        custom={index}
                        className="md:col-start-1"
                      >
                        <Card className="backdrop-blur-sm bg-background/50 transition-all duration-300 hover:shadow-2xl hover:bg-background/80 flex flex-col h-full w-full">
                          <CardHeader>
                              <p className="text-sm font-semibold text-primary">{event.date}</p>
                              <CardTitle className="font-headline text-lg">{event.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground">{event.description}</p>
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
                      </motion.div>
                      
                      {/* IMAGE (DERECHA) */}
                      <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={imageVariants}
                        custom={index}
                        className="md:col-start-2"
                      >
                        <Image
                          src={event.imageUrl}
                          alt={`Ilustración: ${event.title}`}
                          width={500}
                          height={350}
                          className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[4/3] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        />
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {/* IMAGE (IZQUIERDA) */}
                      <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={cardVariants}
                        custom={index}
                        className="md:col-start-1"
                      >
                         <Image
                          src={event.imageUrl}
                          alt={`Ilustración: ${event.title}`}
                          width={500}
                          height={350}
                          className="rounded-lg shadow-xl object-cover w-full h-auto aspect-[4/3] transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        />
                      </motion.div>

                      {/* CARD (DERECHA) */}
                      <motion.div
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={imageVariants}
                        custom={index}
                        className="md:col-start-2"
                      >
                        <Card className="backdrop-blur-sm bg-background/50 transition-all duration-300 hover:shadow-2xl hover:bg-background/80 flex flex-col h-full w-full">
                          <CardHeader>
                              <p className="text-sm font-semibold text-primary">{event.date}</p>
                              <CardTitle className="font-headline text-lg">{event.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground">{event.description}</p>
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
                      </motion.div>
                    </>
                  )}
                </div>

                {/* --- Vista Móvil --- */}
                <div className="md:hidden flex flex-col items-center gap-6">
                  <div className={cn(
                      "relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background ring-4 ring-primary"
                  )}>
                    <event.icon className="h-5 w-5 text-primary" />
                  </div>
                  
                   <motion.div
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.5 }}
                      variants={cardVariants}
                      custom={index}
                      className="w-full"
                    >
                      <Card className="backdrop-blur-sm bg-background/50 transition-all duration-300 hover:shadow-2xl hover:bg-background/80 flex flex-col h-full w-full">
                        <CardHeader>
                            <p className="text-sm font-semibold text-primary">{event.date}</p>
                            <CardTitle className="font-headline text-lg">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <p className="text-sm text-muted-foreground">{event.description}</p>
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
                    </motion.div>
                  
                   <motion.div
                      initial="offscreen"
                      whileInView="onscreen"
                      viewport={{ once: true, amount: 0.5 }}
                      variants={imageVariants}
                      custom={index}
                      className="w-full"
                    >
                      <Image
                        src={event.imageUrl}
                        alt={`Ilustración: ${event.title}`}
                        width={500}
                        height={350}
                        className="rounded-lg shadow-xl object-cover w-full h-64 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                      />
                    </motion.div>
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

