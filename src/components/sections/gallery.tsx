
"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Video, Camera } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useEmblaCarousel, { EmblaCarouselType, EmblaOptionsType } from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const photoGallery = [
  { 
    src: "/images/gallery/galeriahjs1.jpg", 
    alt: "Horacio Serpa en evento político", 
    aiHint: "political rally",
    title: "Compromiso en las Calles",
    description: "Recorriendo el país, escuchando a la gente y construyendo propuestas desde el territorio."
  },
  { 
    src: "/images/gallery/galeriahjs2.jpg", 
    alt: "Retrato de Horacio Serpa", 
    aiHint: "politician portrait",
    title: "Una Visión Clara",
    description: "La experiencia y la integridad como pilares para un futuro más justo para todos los colombianos."
  },
  { 
    src: "/images/gallery/galeriahjs3.png", 
    alt: "Horacio Serpa con la comunidad", 
    aiHint: "community meeting",
    title: "Diálogo Ciudadano",
    description: "El poder de la gente es la base de nuestra campaña. Juntos construimos el cambio."
  },
  { 
    src: "/images/gallery/galeriahjs4.jpg", 
    alt: "Horacio Serpa en debate", 
    aiHint: "political debate",
    title: "Debate de Ideas",
    description: "Defendiendo nuestras propuestas con argumentos sólidos y la convicción de un mejor porvenir."
  },
  { 
    src: "/images/gallery/galeriahjs5.jpg", 
    alt: "Campaña en la calle", 
    aiHint: "campaign street",
    title: "La Fuerza del Voluntariado",
    description: "Miles de manos unidas por un solo propósito: transformar Colombia."
  },
];

const videoGallery = [
  { id: "video1", youtubeId: "GaveIyGE4_g", title: "Herencia familiar: Horacio José Serpa revela secretos de su vida política", description: "", src: "https://www.youtube-nocookie.com/embed/GaveIyGE4_g"},
  { id: "video2", youtubeId: "68LmsTWnSbQ", title: "Mi papá no me quería en la política: Horacio José Serpa", description: "Conoce las historias y los rostros que nos inspiran a seguir adelante.", src: "https://www.youtube-nocookie.com/embed/68LmsTWnSbQ" },
  { id: "video3", youtubeId: "LXb3EKWsInQ", title: "Propuestas Clave", description: "Explicamos nuestras ideas para la educación, la salud y el empleo.", src: "https://www.youtube-nocookie.com/embed/LXb3EKWsInQ" },
  { id: "video4", youtubeId: "p_PJbmrX4uk", title: "Debate de Ideas", description: "Nuestra participación en el gran debate nacional sobre el futuro del país.", src: "https://www.youtube-nocookie.com/embed/p_PJbmrX4uk" },
  { id: "video5", youtubeId: "p_PJbmrX4uk", title: "Debate de Ideas 2", description: "Nuestra participación en el gran debate nacional sobre el futuro del país.", src: "https://www.youtube-nocookie.com/embed/p_PJbmrX4uk" },
  { id: "video6", youtubeId: "p_PJbmrX4uk", title: "Debate de Ideas 3", description: "Nuestra participación en el gran debate nacional sobre el futuro del país.", src: "https://www.youtube-nocookie.com/embed/p_PJbmrX4uk" },
];


const PhotoCarousel = () => {
  const options: EmblaOptionsType = { loop: true, align: 'center' };
  const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay.current]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const selectedPhoto = photoGallery[selectedIndex];

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="overflow-hidden w-full max-w-6xl" ref={emblaRef}>
        <div className="flex -ml-4 items-center h-[500px]">
          {photoGallery.map((image, index) => (
            <div 
              className="flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] pl-4" 
              key={index}
              onClick={() => scrollTo(index)}
            >
              <Card 
                className={cn(
                  "relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg transition-all duration-500 ease-out transform-gpu cursor-pointer",
                  index === selectedIndex
                    ? "scale-100 opacity-100"
                    : "scale-75 opacity-50 blur-sm hover:opacity-75 hover:blur-none"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  data-ai-hint={image.aiHint}
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      <div className="w-full max-w-6xl relative mt-4">
        <Button onClick={scrollPrev} size="icon" variant="outline" className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 bg-background/50 hover:bg-background z-10">
          <ArrowLeft />
        </Button>
        <Button onClick={scrollNext} size="icon" variant="outline" className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full h-12 w-12 bg-background/50 hover:bg-background z-10">
          <ArrowRight />
        </Button>
      </div>

      <div className="text-center mt-8 w-full max-w-2xl">
        <h3 className="font-headline text-2xl font-bold text-primary">{selectedPhoto?.title}</h3>
        <p className="mt-2 text-muted-foreground">{selectedPhoto?.description}</p>
      </div>
    </div>
  );
};

const VideoCarousel = () => {
  const [selectedVideo, setSelectedVideo] = useState(videoGallery[0]);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start', 
    containScroll: 'trimSnaps' 
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  
  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onSelect]);


  const handleThumbClick = useCallback((video: typeof videoGallery[0]) => {
    setSelectedVideo(video);
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!selectedVideo) return null;

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Video Principal */}
      <div className="mb-8">
        <div className="relative aspect-video rounded-2xl bg-black shadow-2xl overflow-hidden">
          <iframe
            key={selectedVideo.id}
            width="100%"
            height="100%"
            src={`${selectedVideo.src}?autoplay=1&mute=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          />
        </div>
        <div className="text-center mt-4">
          <h3 className="font-headline text-2xl font-bold text-primary">{selectedVideo.title}</h3>
        </div>
      </div>

      {/* Carrusel de Miniaturas */}
      <div className="relative w-full">
        <Button
          onClick={scrollPrev}
          size="icon"
          variant="outline"
          className={cn("absolute -left-5 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-background/80 hover:bg-background z-10 backdrop-blur-sm transition-opacity duration-300", !canScrollPrev && "opacity-0 pointer-events-none")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        <div className="overflow-hidden pb-4 pt-6" ref={emblaRef}>
          <div className="flex -ml-4">
            {videoGallery.map((video) => (
              <div
                className="flex-[0_0_50%] sm:flex-[0_0_33.33%] md:flex-[0_0_25%] pl-4"
                key={video.id}
                onClick={() => handleThumbClick(video)}
              >
                <Card
                  className={cn(
                    "group relative aspect-video overflow-hidden rounded-xl shadow-md cursor-pointer transition-all duration-300",
                    selectedVideo.id === video.id
                      ? "ring-4 ring-primary/60 scale-[1.03]"
                      : "hover:scale-[1.02] hover:ring-2 ring-primary/50"
                  )}
                  role="button"
                  tabIndex={0}
                  aria-label={`Seleccionar video: ${video.title}`}
                >
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-2">
                    <div className="h-10 w-10 text-white/90 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                      <Video className="h-5 w-5" />
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={scrollNext}
          size="icon"
          variant="outline"
          className={cn("absolute -right-5 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 bg-background/80 hover:bg-background z-10 backdrop-blur-sm transition-opacity duration-300", !canScrollNext && "opacity-0 pointer-events-none")}
        >
          <ArrowRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default function Gallery() {
  return (
    <section id="galeria" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-0 md:px-6">
        <div className="mb-12 text-center px-6">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Galería de Momentos
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Un recorrido visual por los momentos, las personas y las historias que construyen esta campaña.
          </p>
        </div>

        <Tabs defaultValue="photos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto h-12">
            <TabsTrigger value="photos" className="h-10 text-base gap-2">
                <Camera className="h-5 w-5"/>Fotos
            </TabsTrigger>
            <TabsTrigger value="videos" className="h-10 text-base gap-2">
                <Video className="h-5 w-5"/>Videos
            </TabsTrigger>
          </TabsList>
          <TabsContent value="photos" className="pt-8">
            <PhotoCarousel />
          </TabsContent>
          <TabsContent value="videos" className="pt-8">
            <VideoCarousel />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}

