import { Button } from "@/components/ui/button";
import Image from "next/image";
import SocialSidebar from "../layout/social-sidebar";
import { cn } from "@/lib/utils";

export default function ManifestoView() {
  return (
    <section className="relative w-full h-[90svh] md:h-[90svh] -mt-20" id="manifesto-section">
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
      <div className="relative z-10 h-full">

        {/* --- Desktop View (>768px) --- */}
        <div className="hidden md:flex h-full flex-col">
          <div className="container mx-auto px-6 h-full flex items-center">
            <SocialSidebar />
            <div className="w-full md:w-1/2 text-left text-white pl-0 sm:pl-20">
              <h1 className="font-headline text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                Por una Colombia <br />
                <span className="text-primary">justa y unida</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-white/80">
                Unidos por la experiencia, la integridad y un compromiso
                inquebrantable con el futuro de nuestra nación.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Button 
                  size="lg" 
                  className="px-10 py-6 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40"
                >
                  Únete a la Campaña
                </Button>
              </div>
            </div>
          </div>
          
          {/* Desktop Image */}
          <div className="absolute bottom-0 h-full w-1/2 right-0 opacity-90">
            <Image
              src="/Landpage/Horacio Jose 02 - Editado.png"
              alt="Horacio Serpa"
              fill
              className="object-contain object-right-bottom"
              priority
            />
          </div>
        </div>

        {/* --- Mobile View (<768px) --- */}
        <div className="md:hidden h-full flex flex-col justify-end relative text-white text-center">
            {/* Image fills bottom part of the screen */}
            <div className="absolute bottom-0 left-0 w-full h-2/3">
                <Image
                    src="/Landpage/Horacio Jose 02 - Editado.png"
                    alt="Horacio Serpa"
                    fill
                    className="object-contain object-bottom"
                    priority
                />
            </div>
            {/* Content overlay */}
            <div className="relative z-10 p-6 flex flex-col items-center h-full justify-between">
                <div />
                <div className="flex flex-col items-center">
                    <h1 className="font-headline text-5xl font-bold tracking-tight">
                        Por una Colombia <br />
                        <span className="text-primary">justa y unida</span>
                    </h1>
                    <p className="mt-4 max-w-sm text-base text-white/80">
                        Unidos por la experiencia, la integridad y un compromiso inquebrantable.
                    </p>
                    <Button 
                        size="lg" 
                        className="mt-8 px-10 py-6 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-black/40"
                    >
                        Únete a la Campaña
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
