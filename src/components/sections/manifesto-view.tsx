import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";

export default function ManifestoView() {
  return (
    <section className="relative w-full h-[90svh] flex items-center justify-center overflow-hidden">
       <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/background-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="container relative z-10 mx-auto px-6 h-full">
        <div className="flex flex-col md:flex-row h-full items-center">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Por una Colombia <br />
              <span className="text-primary">justa y unida</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80 md:text-xl mx-auto md:mx-0">
              Unidos por la experiencia, la integridad y un compromiso inquebrantable con el futuro de nuestra nación.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Button size="lg" className="h-12 px-8 text-base">
                Conóceme <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base bg-transparent text-white border-white hover:bg-white hover:text-primary">
                Únete a la campaña <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2 h-full relative">
            <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <Image
              src="/Landpage/Horacio Jose 02 - Editado.png"
              alt="Horacio Serpa"
              fill
              className="object-contain object-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}