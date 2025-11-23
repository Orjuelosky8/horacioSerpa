'use client';

import { useEffect, useMemo, useState, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { departments, getMunicipalitiesByDepartment } from '@/lib/colombia-geo';
import { submitForm } from '@/app/actions/submit-form';
import { Loader2, Send, CheckCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className={cn(
        'w-full text-lg font-bold transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-xl',
        pending
          ? 'bg-muted-foreground'
          : 'bg-primary hover:bg-primary/90 hover:shadow-primary/30'
      )}
      disabled={pending}
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Enviando...
        </>
      ) : (
        <>
          <Send className="mr-2 h-5 w-5" />
          Enviar Participación
        </>
      )}
    </Button>
  );
}

const initialState = {
  success: false,
  message: '',
  errors: [],
};

export default function ParticipationForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(submitForm, initialState);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const municipalities = useMemo(
    () => getMunicipalitiesByDepartment(selectedDepartment),
    [selectedDepartment]
  );
  
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast({
          title: '¡Registro Exitoso!',
          description: state.message,
          variant: 'default',
          action: <CheckCircle className="text-green-500" />,
        });
        formRef.current?.reset();
        setSelectedDepartment('');
      } else {
        toast({
          title: 'Error en el envío',
          description: state.message,
          variant: 'destructive',
          action: <AlertTriangle className="text-white" />,
        });
      }
    }
  }, [state, toast]);

  const getError = (fieldName: string) => state.errors?.find(e => e.path.includes(fieldName))?.message;

  return (
    <section id="unete" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <Card className="max-w-4xl mx-auto shadow-2xl bg-background/80 backdrop-blur-sm overflow-hidden border-2 border-primary/20">
          <div className="relative w-full h-48 md:h-64">
            <Image
              src="https://picsum.photos/seed/campaign-banner/1200/400"
              alt="Banner de participación"
              fill
              objectFit="cover"
              className="opacity-90"
              data-ai-hint="political campaign banner"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          </div>
          <div className="relative -mt-16">
            <CardHeader className="text-center">
              <CardTitle className="font-headline text-4xl md:text-5xl text-primary">
                Formulario de Participación
              </CardTitle>
              <CardDescription className="text-lg max-w-2xl mx-auto">
                Tu voz es clave para construir el futuro. Registra tus datos para
                unirte a nuestro equipo.
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 md:px-8 pb-8">
              <form ref={formRef} action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombres y apellidos completos *</Label>
                    <Input id="fullName" name="fullName" />
                    {getError('fullName') && <p className="text-sm text-destructive">{getError('fullName')}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input id="email" type="email" name="email" />
                    {getError('email') && <p className="text-sm text-destructive">{getError('email')}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono celular / WhatsApp *</Label>
                    <Input id="phone" type="tel" name="phone" />
                    {getError('phone') && <p className="text-sm text-destructive">{getError('phone')}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idCard">Cédula de ciudadanía *</Label>
                    <Input id="idCard" name="idCard" />
                    {getError('idCard') && <p className="text-sm text-destructive">{getError('idCard')}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento *</Label>
                    <Select name="department" onValueChange={setSelectedDepartment} >
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Seleccione un departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                     {getError('department') && <p className="text-sm text-destructive">{getError('department')}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Municipio - Ciudad *</Label>
                    <Select name="city" disabled={!selectedDepartment}>
                      <SelectTrigger id="city">
                        <SelectValue placeholder={selectedDepartment ? "Seleccione un municipio" : "Seleccione primero un departamento"} />
                      </SelectTrigger>
                      <SelectContent>
                        {municipalities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {getError('city') && <p className="text-sm text-destructive">{getError('city')}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referrer">
                    ¿Quién te contó de mí? Escribe su Nombre completo. *
                  </Label>
                  <Input id="referrer" name="referrer" />
                   {getError('referrer') && <p className="text-sm text-destructive">{getError('referrer')}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="proposal">Dinos tu propuesta (Opcional)</Label>
                  <Textarea
                    id="proposal"
                    name="proposal"
                    placeholder="Describe aquí tu idea o propuesta para mejorar nuestra comunidad..."
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                   <div className="flex items-start space-x-3">
                    <Checkbox id="dataAuthorization" name="dataAuthorization" />
                    <div className="grid gap-1.5 leading-none">
                       <Label htmlFor="dataAuthorization" className="cursor-pointer">
                        ¿Autoriza el tratamiento de sus datos? *
                       </Label>
                       <p className="text-xs text-muted-foreground">
                        Al marcar esta casilla, aceptas nuestra <a href="#" className="underline">política de tratamiento de datos</a>.
                       </p>
                    </div>
                  </div>
                  {getError('dataAuthorization') && <p className="text-sm text-destructive">{getError('dataAuthorization')}</p>}
                </div>

                <SubmitButton />
              </form>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
