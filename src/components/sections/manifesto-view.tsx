"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import SocialSidebar from "../layout/social-sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ManifestoView() {
  return (
    <section className="relative w-full -mt-20" id="manifesto-section">
      
      {/* --- Desktop View (>768px) --- */}
      <div className="hidden md:block relative w-full">
        {/* Imagen principal que ocupa todo el ancho */}
        <div className="relative w-full">
            <Image
              src="/FondoHoracioSerpa.jpeg"
              alt="Campaña Horacio Serpa"
              width={1920}
              height={1080}
              className="w-full h-auto object-cover"
              priority
              quality={90}
            />
            <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2">
                <SocialSidebar />
            </div>
        </div>

        {/* Contenedor separado para el tarjetón y el botón, posicionado debajo de la imagen */}
        <div className="relative -mt-24 sm:-mt-32 md:-mt-40 lg:-mt-48 xl:-mt-56 z-10 flex flex-col items-center">
            <div className="mb-4">
                <Image
                    src="/Landpage/tarjeton.png"
                    alt="Tarjetón electoral, marque L 9"
                    width={300}
                    height={150}
                    className="h-auto w-48 sm:w-56 md:w-64 lg:w-72 transition-all"
                />
            </div>
            <Button
                asChild
                size="lg"
                className="px-10 py-6 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40"
            >
                <Link href="#unete">Únete a la Campaña</Link>
            </Button>
        </div>
      </div>

      {/* --- Mobile View (<768px) --- */}
      <div className="md:hidden relative w-full h-[90svh]">
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
        <div className="relative z-10 h-full">
          <div className="h-full flex flex-col justify-between p-6 relative text-white text-center">
              <SocialSidebar />
              {/* Top Content: Title and Text */}
              <div className="flex-shrink-0 z-10 pt-20">
                   <h1 className="font-headline text-5xl font-bold tracking-tight">
                      Por una Colombia <br />
                      <span className="text-primary">justa y unida</span>
                  </h1>
                  <p className="mt-4 max-w-sm mx-auto text-base text-white/80">
                      Unidos por la experiencia, la integridad y un compromiso inquebrantable.
                  </p>
              </div>

              {/* Middle Content: Image */}
              <div className="relative w-full flex-grow h-[50%] -mb-10">
                   <Image
                      src="/Landpage/PortadaHoracio.png"
                      alt="Horacio Serpa"
                      fill
                      className="object-contain object-bottom"
                      priority
                  />
              </div>

              {/* Bottom Content: Button */}
              <div className="flex-shrink-0 z-10">
                <Button
                    asChild
                    size="lg"
                    className="w-full max-w-xs mx-auto px-10 py-6 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-black/40"
                >
                    <Link href="#unete">Únete a la Campaña</Link>
                </Button>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
