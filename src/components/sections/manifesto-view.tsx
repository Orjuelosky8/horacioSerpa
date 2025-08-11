import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";

export default function ManifestoView() {
  return (
    <section className="relative w-full h-[90svh] overflow-hidden">
      {/* Background Video */}
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

      {/* Main Container */}
      <div className="relative z-10 h-full">
        {/* Desktop Layout (> 640px) */}
        <div className="hidden sm:flex container mx-auto px-6 h-full items-center">
          <div className="w-1/2 text-left text-white">
            <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Por una Colombia <br />
              <span className="text-primary">justa y unida</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/80 md:text-xl">
              Unidos por la experiencia, la integridad y un compromiso
              inquebrantable con el futuro de nuestra nación.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-start gap-4">
              <Button size="lg" className="h-12 px-8 text-base">
                Conóceme <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base bg-transparent text-white border-white hover:bg-white hover:text-primary"
              >
                Únete a la campaña <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="w-1/2 h-full relative">
            <Image
              src="/Landpage/Horacio Jose 02 - Editado.png"
              alt="Horacio Serpa"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </div>

        {/* Mobile Layout (< 640px) */}
        <div className="sm:hidden flex flex-col h-full text-white">
          <div className="relative w-full h-full">
            <Image
              src="/Landpage/Horacio Jose 02 - Editado.png"
              alt="Horacio Serpa"
              fill
              className="object-contain object-center"
              priority
            />
            <div className="absolute inset-0 flex items-start justify-center p-6 bg-gradient-to-b from-black/60 to-transparent">
              <h1 className="font-headline text-5xl font-bold tracking-tight text-center mt-8 leading-tight">
                Por una Colombia <br />
                <span className="text-primary">justa y unida</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
