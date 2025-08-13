import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, BookHeart, Stethoscope, Briefcase, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const proposals = [
  {
    icon: Scale,
    title: "Justicia",
    description: "Fortalecimiento del sistema judicial para una justicia más rápida, transparente y accesible para todos.",
    details: [
        "Modernización de la infraestructura judicial.",
        "Implementación de expedientes digitales.",
        "Fortalecimiento de la defensoría pública.",
        "Programas de acceso a la justicia en zonas rurales."
    ],
  },
  {
    icon: BookHeart,
    title: "Educación",
    description: "Inversión en educación de calidad desde la primera infancia hasta la universidad, con enfoque en tecnología.",
    details: [
        "Cobertura universal en educación preescolar.",
        "Bilingüismo y formación en habilidades digitales.",
        "Becas y créditos condonables para educación superior.",
        "Infraestructura y conectividad para colegios públicos."
    ],
  },
  {
    icon: Stethoscope,
    title: "Salud",
    description: "Un sistema de salud preventivo y eficiente que garantice cobertura universal y atención digna en todo el territorio.",
    details: [
        "Enfoque en la medicina preventiva y la salud mental.",
        "Equipos de salud en casa para zonas apartadas.",
        "Reducción de los tiempos de espera para especialistas.",
        "Transparencia en el manejo de los recursos de la salud."
    ],
  },
  {
    icon: Briefcase,
    title: "Empleo",
    description: "Creación de empleos de calidad a través del apoyo a emprendedores, la industria nacional y la inversión.",
    details: [
        "Incentivos tributarios para la contratación de jóvenes.",
        "Apoyo al emprendimiento y a las PYMES.",
        "Inversión en sectores estratégicos como el turismo y la tecnología.",
        "Programas de formación para el trabajo."
    ],
  },
  {
    icon: ShieldCheck,
    title: "Derechos Humanos",
    description: "Protección y promoción de los derechos humanos como pilar fundamental de una sociedad pacífica y equitativa.",
    details: [
        "Fortalecimiento de la Defensoría del Pueblo.",
        "Lucha contra la discriminación y la violencia de género.",
        "Protección a líderes sociales y defensores de DDHH.",
        "Políticas de inclusión para minorías."
    ],
  },
  {
    icon: Leaf,
    title: "Medio Ambiente",
    description: "Políticas para la protección de nuestra biodiversidad, el fomento de energías limpias y el desarrollo sostenible.",
    details: [
        "Transición hacia energías limpias y renovables.",
        "Protección de páramos, selvas y fuentes hídricas.",
        "Lucha frontal contra la deforestación.",
        "Incentivos a la producción y consumo sostenible."
    ],
  },
];


function FlipCard({ proposal }: { proposal: typeof proposals[0] }) {
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
                    <Button variant="outline">
                        Conoce más <ArrowRight className="ml-2 h-4 w-4" />
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
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Nuestras Propuestas
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Pilares para construir la Colombia que soñamos: un país con justicia, oportunidades y bienestar para todos.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {proposals.map((proposal, index) => (
            <FlipCard key={index} proposal={proposal} />
          ))}
        </div>
      </div>
    </section>
  );
}
