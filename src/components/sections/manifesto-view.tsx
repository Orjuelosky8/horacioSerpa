import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";

export default function ManifestoView() {
  return (
    <section className="relative w-full h-[90svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-secondary/30 opacity-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-[spin_20s_linear_infinite]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-6 h-full">
        <div className="flex h-full items-center">
          <div className="w-1/2 text-left">
            <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
              Por una Colombia <br />
              <span className="text-primary">justa y unida</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              Unidos por la experiencia, la integridad y un compromiso inquebrantable con el futuro de nuestra nación.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-start gap-4">
              <Button size="lg" className="h-12 px-8 text-base">
                Conóceme <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Únete a la campaña <PlayCircle className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="w-1/2 h-full relative">
            <Image
              src="/Landpage/Horacio Jose 02 - Editado.png"
              alt="Horacio Serpa"
              layout="fill"
              objectFit="contain"
              objectPosition="bottom right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
