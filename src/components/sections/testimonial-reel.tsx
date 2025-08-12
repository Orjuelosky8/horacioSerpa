"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Ana María García",
    role: "Líder Comunitaria, Medellín",
    quote:
      "Horacio siempre ha escuchado a la gente. Su experiencia es la garantía que necesitamos para un futuro con más oportunidades para todos.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "portrait woman",
  },
  {
    name: "Carlos Rodríguez",
    role: "Pequeño Empresario, Cali",
    quote:
      "Su compromiso con el desarrollo económico local es real. Conoce los desafíos que enfrentamos y tiene propuestas claras para apoyarnos.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "portrait man smiling",
  },
  {
    name: "Sofía Castro",
    role: "Estudiante Universitaria, Bogotá",
    quote:
      "Necesitamos líderes que crean en la educación como motor de cambio. Las propuestas de Horacio para los jóvenes nos devuelven la esperanza.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "portrait person",
  },
  {
    name: "Javier Torres",
    role: "Agricultor, Boyacá",
    quote:
      "El campo necesita apoyo y políticas serias. Horacio Serpa entiende nuestras necesidades y ha demostrado con hechos que está de nuestro lado.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "farmer portrait",
  },
  // Puedes dejar tus duplicados si quieres, pero no son necesarios para el bucle
];

const DUPLICATIONS = 2; // duplicamos el contenido para lograr el loop sin cortes
const MIN_SPEED = -600; // px/seg (negativo = hacia la izquierda)
const MAX_SPEED = 600;  // px/seg
const BASE_SPEED = 80;  // velocidad base (px/seg)

export default function TestimonialReel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [speed, setSpeed] = useState<number>(BASE_SPEED); // px/seg
  const [isHover, setIsHover] = useState(false);

  // Drag manual
  const drag = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
  });

  // Loop infinito con requestAnimationFrame
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Arrancamos en el primer "ciclo"
    const half = el.scrollWidth / 4;
    if (el.scrollLeft >= half || el.scrollLeft === 0) {
      el.scrollLeft = 1;
    }

    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = (now - last) / 1000; // segundos
      last = now;

      // durante hover no frenamos; solo dejamos que el usuario modifique con wheel/drag
      const move = speed * dt; // px a mover
      el.scrollLeft += move;

      // Cuando llegamos a la mitad, rebotamos al inicio del primer set
      const hw = el.scrollWidth / 2;
      if (el.scrollLeft >= hw) el.scrollLeft -= hw;
      if (el.scrollLeft < 0) el.scrollLeft += hw;

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  // Acelerar/desacelerar con la rueda del mouse (scroll)
  const onWheel = (e: React.WheelEvent) => {
    // deltaY > 0 -> hacia la derecha (avanza)
    // deltaY < 0 -> hacia la izquierda (retrocede)
    const k = 2.2; // sensibilidad
    setSpeed((v) => clamp(v + k * e.deltaY, MIN_SPEED, MAX_SPEED));
  };

  // Drag para “arrastrar” el carrusel
  const onPointerDown = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    el.setPointerCapture(e.pointerId);
    drag.current.active = true;
    drag.current.startX = e.clientX;
    drag.current.startScroll = el.scrollLeft;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    el.scrollLeft = drag.current.startScroll - dx;

    // Ajustamos velocidad “inercial” según el movimiento
    const k = 200; // factor para traducir dx a velocidad
    setSpeed(clamp(-dx * 2 + (isHover ? 0 : BASE_SPEED), MIN_SPEED, MAX_SPEED));
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = containerRef.current;
    if (!el) return;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}
    drag.current.active = false;
  };

  return (
    <section id="testimonios" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Voces que nos Inspiran
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Testimonios de ciudadanos que, como tú, creen en un futuro mejor para Colombia.
          </p>
        </div>

        <div className="relative">
          <div
            ref={containerRef}
            role="region"
            aria-label="Carrusel de testimonios"
            className={[
              // contenedor sin scroll visible (lo manejamos por JS)
              "relative overflow-hidden select-none",
              // ocultar scrollbar
              "[-ms-overflow-style:none] [scrollbar-width:none]",
              "[&::-webkit-scrollbar]:hidden",
              // cursor para drag
              "cursor-grab active:cursor-grabbing",
            ].join(" ")}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => {
              setIsHover(false);
              setSpeed((v) => (Math.abs(v) < 10 ? BASE_SPEED : v));
            }}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            {/* Pista: duplicamos contenido para efecto infinito */}
            <div className="flex gap-8 py-2">
              {Array.from({ length: DUPLICATIONS }).map((_, dupIndex) => (
                <Row key={dupIndex} testimonials={testimonials} />
              ))}
            </div>
          </div>

          {/* Fades laterales */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent" />

          {/* Indicaciones sutiles (opcional) */}
          <div className="mt-3 text-center text-xs text-muted-foreground">
            Usa la rueda del mouse para acelerar o retroceder. Arrastra para mover manualmente.
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ testimonials }: { testimonials: typeof testimonials }) {
  return (
    <>
      {testimonials.map((t, i) => (
        <Card key={`${t.name}-${i}`} className="w-80 flex-shrink-0 md:w-96">
          <CardContent className="flex h-full flex-col p-8">
            <p className="flex-1 italic text-muted-foreground">"{t.quote}"</p>
            <div className="mt-6 flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={t.avatar}
                  data-ai-hint={t.aiHint}
                  alt={t.name}
                />
                <AvatarFallback>{t.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
