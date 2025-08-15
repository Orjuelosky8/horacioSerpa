import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";

export default function ManifestoView() {
  return (
    <section className="relative w-full h-[90svh] -mt-20">
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
         <div className="absolute inset-0 bg-beige-200/10 backdrop-filter backdrop-blur-sm"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Content for > 640px */}
        <div className="hidden sm:flex container mx-auto px-6 flex-1 items-center">
          <div className="w-1/2 text-left text-white">
            <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
              Por una Colombia <br />
              <span className="text-primary">justa y unida</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              Unidos por la experiencia, la integridad y un compromiso
              inquebrantable con el futuro de nuestra nación.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Button size="lg" className="transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30">
                Conóceme <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white/50 hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
              >
                Únete a la campaña <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile-only layout */}
        <div className="sm:hidden h-full flex flex-col justify-between pt-24 pb-4">
            <h1 className="font-headline text-5xl font-bold tracking-tight leading-tight text-white px-4 text-center">
              Por una Colombia <br />
              <span className="text-primary">justa y unida</span>
            </h1>
            <div className="flex-1 flex items-end -mb-4">
                <div className="relative w-3/4 h-full">
                    <Image
                        src="/Landpage/Horacio Jose 02 - Editado.png"
                        alt="Horacio Serpa"
                        fill
                        className="object-contain object-left-bottom"
                        priority
                    />
                </div>
                <div className="w-1/4 flex justify-center items-center pr-4">
                    <Button
                        size="lg"
                        variant="outline"
                        className="bg-white/10 text-white border-white/50 hover:bg-white/20 h-auto p-3 flex flex-col gap-1 rounded-full aspect-square justify-center"
                    >
                        <PlayCircle className="h-8 w-8 ml-0" />
                        <span className="text-xs font-semibold uppercase tracking-wider">Únete</span>
                    </Button>
                </div>
            </div>
        </div>
        
        {/* Desktop Image */}
        <div className="hidden sm:block absolute bottom-0 h-full w-1/2 right-0 opacity-90">
          <Image
            src="/Landpage/Horacio Jose 02 - Editado.png"
            alt="Horacio Serpa"
            fill
            className="object-contain object-right-bottom"
            priority
          />
        </div>
      </div>
    </section>
  );
}
