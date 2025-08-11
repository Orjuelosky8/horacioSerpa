import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, BookHeart, Stethoscope, Briefcase, ShieldCheck, Leaf } from "lucide-react";

const proposals = [
  {
    icon: Scale,
    title: "Justicia",
    description: "Fortalecimiento del sistema judicial para una justicia más rápida, transparente y accesible para todos los ciudadanos.",
  },
  {
    icon: BookHeart,
    title: "Educación",
    description: "Inversión en educación de calidad desde la primera infancia hasta la universidad, con enfoque en tecnología y bilingüismo.",
  },
  {
    icon: Stethoscope,
    title: "Salud",
    description: "Un sistema de salud preventivo y eficiente que garantice cobertura universal y atención digna en todo el territorio.",
  },
  {
    icon: Briefcase,
    title: "Empleo",
    description: "Creación de empleos de calidad a través del apoyo a emprendedores, la industria nacional y la inversión extranjera.",
  },
  {
    icon: ShieldCheck,
    title: "Derechos Humanos",
    description: "Protección y promoción de los derechos humanos como pilar fundamental de una sociedad pacífica y equitativa.",
  },
  {
    icon: Leaf,
    title: "Medio Ambiente",
    description: "Políticas para la protección de nuestra biodiversidad, el fomento de energías limpias y el desarrollo sostenible.",
  },
];

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
            <Card key={index} className="text-center transition-all duration-300 hover:bg-card/90 hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <proposal.icon className="h-8 w-8" />
                </div>
              </CardHeader>
              <CardContent>
                <CardTitle className="font-headline text-xl">{proposal.title}</CardTitle>
                <p className="mt-3 text-muted-foreground">{proposal.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
