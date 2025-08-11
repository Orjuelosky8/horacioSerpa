import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const newsItems = [
  {
    title: "Análisis de la Reforma a la Justicia",
    category: "Justicia",
    excerpt: "Un profundo vistazo a los puntos clave de la propuesta de reforma judicial y su impacto en el país.",
    imageUrl: "https://placehold.co/600x400.png",
    aiHint: "justice law",
  },
  {
    title: "Inversión Histórica en Educación Pública",
    category: "Educación",
    excerpt: "Detalles del plan para fortalecer la educación pública desde la primera infancia hasta la universidad.",
    imageUrl: "https://placehold.co/600x700.png",
    aiHint: "education classroom",
  },
  {
    title: "Nuevo Modelo de Salud Preventiva",
    category: "Salud",
    excerpt: "Se presenta un enfoque en la prevención de enfermedades y el fortalecimiento de la atención primaria.",
    imageUrl: "https://placehold.co/600x500.png",
    aiHint: "health doctor",
  },
  {
    title: "Estrategias para la Generación de Empleo",
    category: "Empleo",
    excerpt: "Iniciativas para fomentar el emprendimiento y atraer inversión que genere empleos de calidad.",
    imageUrl: "https://placehold.co/600x600.png",
    aiHint: "jobs industry",
  },
];

export default function DepthMasonry() {
  return (
    <section id="noticias" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Noticias y Actividades
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Mantente al día con las últimas noticias, eventos y comunicados de la campaña.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Card key={index} className="flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <CardHeader className="p-0">
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={600}
                    height={400}
                    data-ai-hint={item.aiHint}
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6">
                <p className="text-sm font-medium text-primary">{item.category}</p>
                <CardTitle className="mt-2 font-headline text-xl">{item.title}</CardTitle>
                <p className="mt-3 text-muted-foreground">{item.excerpt}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="link" className="p-0">
                  Leer más <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
           <Card className="flex flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl md:col-span-2 lg:col-span-1">
              <CardHeader className="p-0">
                <div className="aspect-w-4 aspect-h-3">
                  <Image
                    src="https://placehold.co/600x400.png"
                    alt="Próximos Eventos"
                    width={600}
                    height={400}
                    data-ai-hint="calendar event"
                    className="object-cover"
                  />
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-6">
                <p className="text-sm font-medium text-primary">AGENDA</p>
                <CardTitle className="mt-2 font-headline text-xl">Calendario de Eventos</CardTitle>
                <p className="mt-3 text-muted-foreground">Descubre los próximos encuentros, debates y actividades en tu ciudad.</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button variant="link" className="p-0">
                  Ver calendario <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
        </div>
        <div className="mt-12 text-center">
            <Button size="lg">Ver todas las noticias</Button>
        </div>
      </div>
    </section>
  );
}
