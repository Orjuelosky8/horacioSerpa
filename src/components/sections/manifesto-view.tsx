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
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 bg-background/30 backdrop-blur-sm"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Mobile-only title < 640px */}
        <div className="sm:hidden flex-shrink-0 pt-20 pb-4 text-center">
          <h1 className="font-headline text-5xl font-bold tracking-tight leading-tight text-white">
            Por una Colombia <br />
            <span className="text-primary">justa y unida</span>
          </h1>
        </div>

        {/* Content for > 640px */}
        <div className="hidden sm:flex container mx-auto px-6 flex-1 items-center">
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
        </div>

        {/* Image Container */}
        <div className="absolute bottom-0 left-0 right-0 h-[85%] w-full sm:w-1/2 sm:left-auto">
          <Image
            src="/Landpage/Horacio Jose 02 - Editado.png"
            alt="Horacio Serpa"
            fill
            className="object-contain object-bottom opacity-90"
            priority
          />
        </div>
      </div>
    </section>
  );
}
