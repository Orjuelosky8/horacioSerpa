import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle } from "lucide-react";
import Image from "next/image";

export default function ManifestoView() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full h-[90svh]">
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

        <div className="container relative z-20 mx-auto px-6 h-full">
          <div className="flex flex-col sm:flex-row h-full items-center">
            <div className="w-full sm:w-1/2 text-center sm:text-left pt-20 sm:pt-0">
              <h1 className="font-headline text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                Por una Colombia <br />
                <span className="text-primary">justa y unida</span>
              </h1>
              <div className="hidden sm:block">
                <p className="mt-6 max-w-xl text-lg text-white/80 md:text-xl">
                  Unidos por la experiencia, la integridad y un compromiso
                  inquebrantable con el futuro de nuestra nación.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center sm:justify-start gap-4">
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

            <div className="w-full sm:w-1/2 h-full relative">
                <Image
                    src="/Landpage/Horacio Jose 02 - Editado.png"
                    alt="Horacio Serpa"
                    layout="fill"
                    objectFit="contain"
                    objectPosition="bottom center sm:bottom-right"
                />
            </div>
          </div>
        </div>
      </div>
      
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
