import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Ana María García",
    role: "Líder Comunitaria, Medellín",
    quote: "Horacio siempre ha escuchado a la gente. Su experiencia es la garantía que necesitamos para un futuro con más oportunidades para todos.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "portrait woman"
  },
  {
    name: "Carlos Rodríguez",
    role: "Pequeño Empresario, Cali",
    quote: "Su compromiso con el desarrollo económico local es real. Conoce los desafíos que enfrentamos y tiene propuestas claras para apoyarnos.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "portrait man smiling"
  },
  {
    name: "Sofía Castro",
    role: "Estudiante Universitaria, Bogotá",
    quote: "Necesitamos líderes que crean en la educación como motor de cambio. Las propuestas de Horacio para los jóvenes nos devuelven la esperanza.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "portrait person"
  },
   {
    name: "Javier Torres",
    role: "Agricultor, Boyacá",
    quote: "El campo necesita apoyo y políticas serias. Horacio Serpa entiende nuestras necesidades y ha demostrado con hechos que está de nuestro lado.",
    avatar: "https://placehold.co/100x100.png",
    aiHint: "farmer portrait"
  },
];

export default function TestimonialReel() {
  return (
    <section id="testimonios" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Voces que nos Inspiran
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Testimonios de ciudadanos que, como tú, creen en un futuro mejor para Colombia.
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-8 overflow-x-auto pb-8 [-ms-overflow-style:none] [scrollbar-width:none]">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="w-80 flex-shrink-0 md:w-96">
                <CardContent className="p-8 flex flex-col h-full">
                    <p className="flex-1 text-muted-foreground italic">"{testimonial.quote}"</p>
                    <div className="mt-6 flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={testimonial.avatar} data-ai-hint={testimonial.aiHint} alt={testimonial.name} />
                            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
