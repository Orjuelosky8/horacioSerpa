import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";

export default function ManifestoView() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Main container with fixed height */}
      <div className="relative w-full h-[90svh]">
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

        {/* Content container that spans the full height */}
        <div className="relative z-10 h-full">
          {/* Desktop view (> 640px) */}
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
                className="object-contain object-right-bottom"
                priority
              />
            </div>
          </div>

          {/* Mobile view (< 640px) - Image and title are in the same block */}
          <div className="sm:hidden h-full flex flex-col">
            <div className="relative flex-grow flex items-center justify-center">
               <div className="absolute inset-0">
                <Image
                    src="/Landpage/Horacio Jose 02 - Editado.png"
                    alt="Horacio Serpa"
                    fill
                    className="object-contain object-bottom"
                    priority
                />
               </div>
              <div className="relative text-center text-white p-6 pt-24 z-10">
                 <h1 className="font-headline text-[15vw] leading-tight font-bold tracking-tight sm:text-6xl">
                    Por una Colombia <br />
                    <span className="text-primary">justa y unida</span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content below for mobile */}
      <div className="sm:hidden bg-background">
        <div className="container mx-auto px-6 py-12 text-center">
            <p className="max-w-xl mx-auto text-lg text-muted-foreground">
                Unidos por la experiencia, la integridad y un compromiso
                inquebrantable con el futuro de nuestra nación.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button size="lg" className="h-12 px-8 text-base">
                Conóceme <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base"
            >
                Únete a la campaña <PlayCircle className="ml-2 h-5 w-5" />
            </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
