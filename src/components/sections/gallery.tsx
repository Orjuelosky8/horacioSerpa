"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

const galleryImages = [
  { src: "https://placehold.co/800x600.png", alt: "Horacio Serpa en evento político", aiHint: "political rally" },
  { src: "https://placehold.co/600x800.png", alt: "Retrato de Horacio Serpa", aiHint: "politician portrait" },
  { src: "https://placehold.co/800x600.png", alt: "Horacio Serpa con la comunidad", aiHint: "community meeting" },
  { src: "https://placehold.co/800x800.png", alt: "Horacio Serpa en debate", aiHint: "political debate" },
  { src: "https://placehold.co/800x600.png", alt: "Campaña en la calle", aiHint: "campaign street" },
  { src: "https://placehold.co/600x800.png", alt: "Jóvenes apoyando la campaña", aiHint: "youth support" },
  { src: "https://placehold.co/800x600.png", alt: "Evento de campaña", aiHint: "campaign event" },
];

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const gridStyles = [
    "col-span-2 row-span-2",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-2 row-span-1"
  ]


  return (
    <section id="galeria" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Galería de Momentos
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Un recorrido visual por los momentos, las personas y las historias que construyen esta campaña.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 gap-4 h-[600px]">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={cn(
                "relative overflow-hidden rounded-xl shadow-lg cursor-pointer group",
                gridStyles[index % gridStyles.length]
              )}
              onClick={() => openLightbox(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                data-ai-hint={image.aiHint}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white font-bold text-lg text-center p-4">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-in fade-in-0"
          onClick={closeLightbox}
        >
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white/70 hover:text-white h-12 w-12"
            onClick={closeLightbox}
            aria-label="Cerrar galería"
          >
            <X className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white h-14 w-14 hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            aria-label="Imagen anterior"
          >
            <ChevronLeft className="h-10 w-10" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white h-14 w-14 hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            aria-label="Siguiente imagen"
          >
            <ChevronRight className="h-10 w-10" />
          </Button>

          <div 
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galleryImages[currentImageIndex].src}
              alt={galleryImages[currentImageIndex].alt}
              width={1600}
              height={1200}
              className="object-contain w-full h-full max-w-[90vw] max-h-[90vh] rounded-lg shadow-2xl"
              data-ai-hint={galleryImages[currentImageIndex].aiHint}
            />
          </div>
        </div>
      )}
    </section>
  );
}
