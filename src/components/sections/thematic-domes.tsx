
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Banknote, Plane, Utensils, Shield, Handshake, Waves, UserX, Building2, Briefcase, ArrowRight, FileText } from "lucide-react";
import { Button } from "../ui/button";

const proposals = [
  {
    id: 'seguridad',
    icon: Camera,
    title: "Sin Seguridad no hay Libertad",
    description: "Cámaras privadas integradas a la Policía para reacción inmediata, con acceso en tiempo real para Juntas de Acción Comunal.",
    details: [
        "Integración de cámaras privadas a redes de seguridad.",
        "Acceso en tiempo real para Juntas de Acción Comunal.",
        "Reducción de tiempos de respuesta ante delitos."
    ],
    pdfUrl: "/propuestas.pdf",
  },
  {
    id: 'icetex',
    icon: Banknote,
    title: "ICETEX Justo y Humano",
    description: "Cuotas proporcionales al ingreso: solo pagas cuando trabajas. Sin empleo, no hay pago, para dar verdadera movilidad social.",
    details: [
        "Cuotas de pago ajustadas a tu ingreso.",
        "Suspensión de pagos durante el desempleo.",
        "Fomento de la educación sin riesgo de quiebra."
    ],
    pdfUrl: "/propuestas.pdf",
  },
  {
    id: 'valorizaciones',
    icon: Building2,
    title: "No más Valorizaciones Anticipadas",
    description: "Obra terminada, obra pagada. Basta de exigir recursos para proyectos que nunca se ejecutan. Transparencia y control ciudadano.",
    details: [
        "El cobro se realizará solo al finalizar la obra.",
        "Veedurías ciudadanas para supervisar proyectos.",
        "Prevenir la financiación de 'elefantes blancos'."
    ],
    pdfUrl: "/propuestas.pdf",
  },
  {
    id: 'alimentos',
    icon: Utensils,
    title: "La Comida no se Bota",
    description: "Eliminaremos regulaciones que obligan a desperdiciar alimentos aptos. La comida debe llegar a quienes la necesitan.",
    details: [
        "Reforma de normativas que causan desperdicio.",
        "Creación de puentes con bancos de alimentos.",
        "Incentivos para la donación de alimentos."
    ],
    pdfUrl: "/propuestas.pdf",
  },
  {
    id: 'pension',
    icon: Handshake,
    title: "Pensión Compartida para Parejas",
    description: "Permitiremos ceder semanas entre la pareja para que uno de los dos alcance la pensión, protegiendo el patrimonio familiar.",
    details: [
        "Posibilidad de transferir semanas de cotización.",
        "Asegurar que un miembro de la pareja logre la pensión.",
        "Protección económica para la vejez del núcleo familiar."
    ],
    pdfUrl: "/propuestas.pdf",
  },
  {
    id: 'rio-magdalena',
    icon: Waves,
    title: "Río Magdalena: Despertar al Gigante",
    description: "Con infraestructura moderna, convertiremos el río en un eje turístico y de transporte, impulsando la productividad regional.",
    details: [
        "Inversión en navegabilidad y puertos fluviales.",
        "Fomento del turismo ecológico y cultural.",
        "Transporte de carga más económico y sostenible."
    ],
    pdfUrl: "/propuestas.pdf",
  },
  {
    id: 'violadores',
    icon: UserX,
    title: "Violadores, No Más",
    description: "Registro permanente e inhabilidad total para agresores. Protección real y sin concesiones para nuestras niñas y mujeres.",
    details: [
        "Registro público y permanente de agresores sexuales.",
        "Inhabilidad de por vida para trabajar con menores.",
        "Endurecimiento de penas sin beneficios carcelarios."
    ],
    pdfUrl: "/propuestas.pdf",
  },
  {
    id: 'limites-presidente',
    icon: Shield,
    title: "Límites Reales al Presidente",
    description: "Más autonomía para las regiones y menos centralismo. Fortaleceremos las instituciones y el equilibrio democrático.",
    details: [
        "Reforma a la distribución de recursos Nación-Territorio.",
        "Fortalecimiento de la autonomía regional y local.",
        "Mecanismos de control más estrictos al poder ejecutivo."
    ],
    pdfUrl: "/propuestas.pdf",
  },
  {
    id: 'turismo-empleo',
    icon: Plane,
    title: "Productividad, Turismo y Empleo",
    description: "IVA cero en vuelos nacionales y estímulos a hotelería y restaurantes para generar empleo inmediato y dinamizar la economía.",
    details: [
        "Eliminación del IVA en tiquetes aéreos nacionales.",
        "Incentivos fiscales para el sector hotelero y gastronómico.",
        "Impulso al turismo como motor de empleo rápido."
    ],
    pdfUrl: "/propuestas.pdf",
  },
];

type Proposal = typeof proposals[0];

function FlipCard({ proposal }: { proposal: Proposal }) {
    return (
      <div className="group w-full h-80 [perspective:1000px]">
        <div className="relative h-full w-full rounded-xl shadow-lg transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          {/* Front Face */}
          <div className="absolute inset-0">
            <Card className="h-full text-center flex flex-col items-center justify-center bg-card">
              <CardHeader>
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <proposal.icon className="h-8 w-8" />
                  </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="font-headline text-2xl">{proposal.title}</CardTitle>
                <p className="mt-3 text-muted-foreground">{proposal.description}</p>
              </CardContent>
            </Card>
          </div>
          {/* Back Face */}
          <div className="absolute inset-0 h-full w-full rounded-xl bg-background text-foreground [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <Card className="h-full flex flex-col justify-between p-6">
                <div>
                    <CardTitle className="font-headline text-2xl text-primary">{proposal.title}</CardTitle>
                    <p className="mt-2 text-sm font-semibold text-muted-foreground">Puntos clave:</p>
                    <ul className="mt-2 space-y-2 text-sm list-disc pl-5 text-muted-foreground">
                        {proposal.details.map((detail, i) => (
                            <li key={i}>{detail}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4 text-center">
                    <Button variant="outline" asChild>
                      <a href={proposal.pdfUrl} target="_blank" rel="noopener noreferrer">
                        Conoce más <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                </div>
            </Card>
          </div>
        </div>
      </div>
    );
}

export default function ThematicDomes() {
  return (
    <section id="propuestas" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="inline-block bg-background/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl">
            <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              9 Propuestas para Hacer País
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Soluciones concretas para los problemas reales de Colombia. Ideas para construir un futuro con seguridad, justicia y oportunidades.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proposals.map((proposal) => (
            <FlipCard key={proposal.id} proposal={proposal} />
          ))}
        </div>
      </div>
    </section>
  );
}
