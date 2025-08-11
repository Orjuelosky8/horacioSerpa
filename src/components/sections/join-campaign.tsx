import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Handshake, Heart } from "lucide-react";

export default function JoinCampaign() {
  return (
    <section id="unete" className="w-full py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Únete a la Campaña
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tu participación es fundamental para construir el futuro que soñamos. Hay muchas formas de colaborar. ¡Súmate al cambio!
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Handshake className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Conviértete en Voluntario</h3>
                  <p className="text-muted-foreground">
                    Participa activamente en tu comunidad, organiza eventos y difunde nuestras propuestas.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Realiza una Donación</h3>
                  <p className="text-muted-foreground">
                    Cada aporte, sin importar el tamaño, nos acerca a la meta. Tu apoyo es vital.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Regístrate como voluntario</CardTitle>
              <CardDescription>Completa el formulario y nos pondremos en contacto contigo.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="join-name">Nombre</Label>
                    <Input id="join-name" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="join-email">Correo Electrónico</Label>
                    <Input id="join-email" type="email" placeholder="tu@email.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="join-phone">Teléfono</Label>
                  <Input id="join-phone" placeholder="Tu número de teléfono" />
                </div>
                <div className="space-y-2">
                  <Label>Áreas de interés</Label>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Checkbox id="interest-events" />
                      <Label htmlFor="interest-events">Eventos</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="interest-social" />
                      <Label htmlFor="interest-social">Redes Sociales</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="interest-logistics" />
                      <Label htmlFor="interest-logistics">Logística</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox id="interest-other" />
                      <Label htmlFor="interest-other">Otro</Label>
                    </div>
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Quiero ser voluntario
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
