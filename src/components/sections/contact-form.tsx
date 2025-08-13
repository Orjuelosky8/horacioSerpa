import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ContactForm() {
  return (
    <section id="contacto" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <Card className="max-w-3xl mx-auto shadow-2xl bg-background">
          <CardHeader>
            <CardTitle className="font-headline text-3xl md:text-4xl text-center">Ponte en Contacto</CardTitle>
            <CardDescription className="text-center max-w-xl mx-auto">
              Tu voz es importante. Completa el formulario y nos pondremos en contacto contigo lo antes posible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input id="name" placeholder="Tu nombre" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input id="email" type="email" placeholder="tu@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Ciudad</Label>
                  <Input id="location" placeholder="Escribe tu ciudad" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Soy un/a</Label>
                   <Select>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Selecciona tu rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ciudadano">Ciudadano(a)</SelectItem>
                      <SelectItem value="lider">Líder Comunitario</SelectItem>
                      <SelectItem value="periodista">Periodista</SelectItem>
                      <SelectItem value="empresa">Empresa / Organización</SelectItem>
                       <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
               <div className="space-y-2">
                <Label htmlFor="subject">Asunto</Label>
                <Select>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Elige el motivo de tu contacto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pregunta">Pregunta General</SelectItem>
                    <SelectItem value="propuesta">Propuesta de Campaña</SelectItem>
                    <SelectItem value="invitacion">Invitación a Evento</SelectItem>
                    <SelectItem value="prensa">Contacto de Prensa</SelectItem>
                     <SelectItem value="otro">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Mensaje</Label>
                <Textarea id="message" placeholder="Escribe tu mensaje aquí..." rows={5} />
              </div>
              <Button type="submit" size="lg" className="w-full transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/20">
                Enviar Mensaje
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
