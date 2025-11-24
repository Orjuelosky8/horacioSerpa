"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import SocialSidebar from "../layout/social-sidebar";
import Link from "next/link";

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
              <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Por una Colombia <br />
                <span className="text-primary">justa y unida</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg text-white/80">
                Unidos por la experiencia, la integridad y un compromiso
                inquebrantable con el futuro de nuestra nación.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Link href="#unete">
                  <Button
                    size="lg"
                    className="px-10 py-6 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/40"
                  >
                    Únete a la Campaña
                  </Button>
                </Link>
              </div>

            </div>
          </div>

          {/* Desktop Image */}
          <div className="absolute bottom-0 h-[85%] w-1/2 right-0 opacity-90">
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
        <div className="md:hidden h-full flex flex-col justify-between p-6 relative text-white text-center">
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
                    src="/Landpage/Horacio Jose 02 - Editado.png"
                    alt="Horacio Serpa"
                    fill
                    className="object-contain object-bottom"
                    priority
                />
            </div>

            {/* Bottom Content: Button */}
            <div className="flex-shrink-0 z-10">
              <Link href="#unete">
                <Button
                    size="lg"
                    className="w-full max-w-xs mx-auto px-10 py-6 text-lg font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-black/40"
                >
                    Únete a la Campaña
                </Button>
              </Link>
            </div>
        </div>
      </div>
    </section>
  );
}