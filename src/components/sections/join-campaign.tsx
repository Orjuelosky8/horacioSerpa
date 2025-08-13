import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Handshake, Heart, Users, MessageCircle, ShieldCheck, Truck } from "lucide-react";

export default function JoinCampaign() {
  return (
    <section id="unete" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-lg">
            <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
              Súmate al Cambio
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Tu participación es la fuerza que impulsa este movimiento. Hay muchas formas de colaborar y construir juntos el futuro que soñamos. ¡Elige cómo quieres aportar!
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-background/50 transition-colors">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Handshake className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Conviértete en Voluntario</h3>
                  <p className="text-muted-foreground">
                    Participa activamente en tu comunidad, organiza eventos y difunde nuestras propuestas. Rellena el formulario para empezar.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-background/50 transition-colors">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Realiza una Donación</h3>
                  <p className="text-muted-foreground">
                    Cada aporte, sin importar el tamaño, nos acerca a la meta. Tu apoyo financiero es vital para la campaña.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Card className="bg-background shadow-2xl">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Regístrate y participa</CardTitle>
              <CardDescription>Completa tus datos y únete al equipo. Nos pondremos en contacto contigo pronto.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="join-name">Nombre</Label>
                    <Input id="join-name" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="join-lastname">Apellido</Label>
                    <Input id="join-lastname" placeholder="Tu apellido" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="join-email">Correo Electrónico</Label>
                  <Input id="join-email" type="email" placeholder="tu@email.com" />
                </div>
                 <div className="space-y-2">
                  <Label>¿Cómo te gustaría ayudar?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                      <Checkbox id="interest-voz" />
                      <Label htmlFor="interest-voz" className="flex items-center gap-1.5 cursor-pointer"><Users className="h-4 w-4 text-primary"/> Voz a voz</Label>
                    </div>
                    <div className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                      <Checkbox id="interest-digital" />
                      <Label htmlFor="interest-digital" className="flex items-center gap-1.5 cursor-pointer"><MessageCircle className="h-4 w-4 text-primary"/> Activismo digital</Label>
                    </div>
                    <div className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                      <Checkbox id="interest-voto" />
                      <Label htmlFor="interest-voto" className="flex items-center gap-1.5 cursor-pointer"><ShieldCheck className="h-4 w-4 text-primary"/> Defensa del voto</Label>
                    </div>
                    <div className="flex items-center gap-2 rounded-md p-2 hover:bg-muted">
                      <Checkbox id="interest-logistica" />
                      <Label htmlFor="interest-logistica" className="flex items-center gap-1.5 cursor-pointer"><Truck className="h-4 w-4 text-primary"/> Logística</Label>
                    </div>
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20">
                  Quiero ser parte del cambio
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
