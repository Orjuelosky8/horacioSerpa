import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Twitter, Instagram, Facebook } from "lucide-react";

const socialPosts = [
  {
    platform: "Twitter",
    icon: Twitter,
    user: "@HSerpa",
    handle: "Horacio Serpa",
    content: "Hoy en Barrancabermeja, dialogando con la comunidad sobre el futuro de la industria y el empleo. ¡La energía de la gente es nuestra mayor fortaleza! #ColombiaJusta",
    image: "https://placehold.co/500x300.png",
    aiHint: "people meeting"
  },
  {
    platform: "Instagram",
    icon: Instagram,
    user: "@HoracioSerpaCampaña",
    handle: "Campaña Horacio Serpa",
    content: "Una jornada llena de color y esperanza junto a los jóvenes artistas de la Comuna 13. El arte es transformación social. 🎨✨",
    image: "https://placehold.co/500x500.png",
    aiHint: "art graffiti"
  },
  {
    platform: "Facebook",
    icon: Facebook,
    user: "Horacio Serpa",
    handle: "Horacio Serpa",
    content: "Agradezco a los líderes y lideresas sociales por su invaluable labor. Escuchar sus propuestas es fundamental para construir un programa de gobierno que nos represente a todos. Mira el video completo de nuestro encuentro.",
    image: "https://placehold.co/500x280.png",
    aiHint: "community handshake"
  },
];

export default function LiveCubesphere() {
  return (
    <section id="social" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Muro Social
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Sigue la conversación en tiempo real y únete a nuestra comunidad en redes sociales.
          </p>
        </div>

        <div className="relative">
          {/* Placeholder for the 3D Cubesphere. This grid gives a similar feel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {socialPosts.map((post, index) => (
              <Card key={index} className="overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={`https://placehold.co/40x40.png`} data-ai-hint="portrait man" />
                      <AvatarFallback>HS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{post.handle}</p>
                      <p className="text-sm text-muted-foreground">{post.user}</p>
                    </div>
                    <post.icon className="ml-auto h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm mb-4">{post.content}</p>
                   {post.image && <img src={post.image} data-ai-hint={post.aiHint} alt="Post image" className="rounded-lg w-full object-cover" />}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
