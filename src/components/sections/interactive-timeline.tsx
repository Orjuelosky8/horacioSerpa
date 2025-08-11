import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, GraduationCap, Gavel } from "lucide-react";

const timelineEvents = [
  {
    icon: GraduationCap,
    date: "1965",
    title: "Grado en Derecho",
    description: "Obtiene su título de abogado de la Universidad del Atlántico, sentando las bases de su carrera pública.",
  },
  {
    icon: Gavel,
    date: "1970 - 1980",
    title: "Inicios en la Judicatura",
    description: "Ejerce como Juez Promiscuo Municipal y Juez Penal del Circuito en Barrancabermeja.",
  },
  {
    icon: Briefcase,
    date: "1986 - 2002",
    title: "Congresista y Ministro",
    description: "Una destacada carrera en el Congreso y como Ministro del Interior, de Gobierno y de la Presidencia.",
  },
  {
    icon: BookOpen,
    date: "2006 - 2014",
    title: "Gobernador de Santander",
    description: "Lidera el departamento de Santander, impulsando proyectos clave de desarrollo social y de infraestructura.",
  },
];

export default function InteractiveTimeline() {
  return (
    <section id="biografia" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Quién Soy
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Un recorrido por una vida dedicada al servicio público y a la construcción de una Colombia más justa.
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          {timelineEvents.map((event, index) => (
            <div key={index} className="relative mb-8 flex items-center">
              <div
                className={`flex w-full items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <div
                  className={`w-1/2 ${
                    index % 2 === 0 ? "pr-8" : "pl-8"
                  }`}
                >
                  <Card className="transition-shadow hover:shadow-xl">
                    <CardHeader>
                      <CardTitle className="font-headline flex items-center gap-4">
                        <div>
                          <p className="text-sm font-semibold text-primary">{event.date}</p>
                          <h3 className="text-lg">{event.title}</h3>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="absolute left-1/2 top-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-background ring-4 ring-primary">
                <event.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
