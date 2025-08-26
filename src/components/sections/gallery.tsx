"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, PlayCircle, Video, Camera } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useEmblaCarousel from "embla-carousel-react";
import { cn } from "@/lib/utils";

const photoGallery = [
  { src: "/images/gallery/photo1.jpg", alt: "Horacio Serpa en evento político", aiHint: "political rally" },
  { src: "/images/gallery/photo2.jpg", alt: "Retrato de Horacio Serpa", aiHint: "politician portrait" },
  { src: "/images/gallery/photo3.jpg", alt: "Horacio Serpa con la comunidad", aiHint: "community meeting" },
  { src: "/images/gallery/photo4.jpg", alt: "Horacio Serpa en debate", aiHint: "political debate" },
  { src: "/images/gallery/photo5.jpg", alt: "Campaña en la calle", aiHint: "campaign street" },
  { src: "/images/gallery/photo6.jpg", alt: "Jóvenes apoyando la campaña", aiHint: "youth support" },
];

const videoGallery = [
  { id: "video1", src: "/videos/gallery/video1.mp4", thumbnail: "/images/gallery/thumb1.jpg", title: "Mensaje a la Nación", aiHint: "political speech" },
  { id: "video2", src: "/videos/gallery/video2.mp4", thumbnail: "/images/gallery/thumb2.jpg", title: "Recorriendo el País", aiHint: "community travel" },
  { id: "video3", src: "/videos/gallery/video3.mp4", thumbnail: "/images/gallery/thumb3.jpg", title: "Propuestas Clave", aiHint: "interview proposals" },
  { id: "video4", src: "/videos/gallery/video4.mp4", thumbnail: "/images/gallery/thumb4.jpg", title: "Debate de Ideas", aiHint: "political debate" },
];

const PhotoCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: 'trimSnaps',
  });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-12">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4" style={{ perspective: '1000px' }}>
          {photoGallery.map((image, index) => (
            <div className="flex-shrink-0 flex-grow-0 basis-1/2 md:basis-1/3 pl-4" key={index}>
              <Card className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-lg transition-transform duration-500 ease-out transform-gpu hover:scale-105">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  data-ai-hint={image.aiHint}
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center -translate-y-1/2 px-4 md:-px-8">
        <Button onClick={scrollPrev} size="icon" variant="outline" className="rounded-full h-12 w-12 bg-background/50 hover:bg-background">
          <ArrowLeft />
        </Button>
        <Button onClick={scrollNext} size="icon" variant="outline" className="rounded-full h-12 w-12 bg-background/50 hover:bg-background">
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};


const VideoCarousel = () => {
  const [selectedVideo, setSelectedVideo] = useState(videoGallery[0]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    align: 'start',
  });

  return (
    <div className="w-full">
      {/* Video Player */}
      <div className="w-full max-w-4xl mx-auto aspect-video rounded-2xl bg-black shadow-2xl overflow-hidden mb-8 relative">
        <video key={selectedVideo.src} src={selectedVideo.src} className="w-full h-full object-cover" controls autoPlay muted loop>
          Tu navegador no soporta el tag de video.
        </video>
         <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h3 className="text-white font-headline text-2xl">{selectedVideo.title}</h3>
        </div>
      </div>

      {/* Thumbnails Carousel */}
      <div className="relative w-full max-w-5xl mx-auto">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {videoGallery.map((video) => (
              <div className="flex-shrink-0 flex-grow-0 basis-1/2 md:basis-1/4 lg:basis-1/5 pl-4" key={video.id}>
                <Card 
                  className={cn(
                    "relative aspect-video overflow-hidden rounded-xl shadow-md cursor-pointer transition-all duration-300",
                    selectedVideo.id === video.id ? "ring-4 ring-primary scale-105" : "hover:scale-105 hover:ring-2 ring-primary/50"
                  )}
                  onClick={() => setSelectedVideo(video)}
                >
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                    data-ai-hint={video.aiHint}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-75 group-hover:opacity-100">
                    <PlayCircle className="h-10 w-10 text-white/80"/>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};


export default function Gallery() {
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
