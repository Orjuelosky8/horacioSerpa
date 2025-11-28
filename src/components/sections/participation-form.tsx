
'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
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
import type { ReferrersDebugInfo } from '@/lib/news';

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
  errors: [] as any[],
  values: {
    fullName: '',
    email: '',
    phone: '',
    documentType: '',
    idCard: '',
    department: '',
    city: '',
    referrer: '',
    proposal: '',
    dataAuthorization: '',
  },
};

type ParticipationFormProps = {
  referrersList: string[];
  referrersDebug?: ReferrersDebugInfo;
};

export default function ParticipationForm({ referrersList, referrersDebug }: ParticipationFormProps) {
  const { toast } = useToast();
  const [state, formAction] = useActionState(submitForm as any, initialState);

  const [selectedDepartment, setSelectedDepartment] = useState(state.values?.department || '');
  const [selectedDocType, setSelectedDocType] = useState(state.values?.documentType || '');
  const [cityValue, setCityValue] = useState(state.values?.city || '');

  const municipalities = useMemo(() => {
    if (!selectedDepartment) return [];
    return getMunicipalitiesByDepartment(selectedDepartment);
  }, [selectedDepartment]);

  const formRef = useRef<HTMLFormElement>(null);
  
  // Effect to handle form state changes after submission
  useEffect(() => {
    if (state.success) {
      toast({
        title: '¡Registro Exitoso!',
        description: state.message,
        variant: 'default',
        action: <CheckCircle className="text-green-500" />,
      });
      formRef.current?.reset();
      setSelectedDepartment('');
      setSelectedDocType('');
      setCityValue('');
    } else if (state.message && !state.success && state.errors?.length) { // Check for errors to distinguish from initial state
      toast({
        title: 'Error en el envío',
        description: state.message,
        variant: 'destructive',
        action: <AlertTriangle className="text-white" />,
      });
      setSelectedDepartment(state.values?.department || '');
      setSelectedDocType(state.values?.documentType || '');
      
      // If the department from the failed state is valid, set the city. Otherwise, don't.
      const prevDepartmentIsValid = departments.includes(state.values?.department || '');
      if (prevDepartmentIsValid) {
        setCityValue(state.values?.city || '');
      } else {
        setCityValue('');
      }
    }
  }, [state, toast]);


  // Effect to reset city when department changes manually
  useEffect(() => {
    if(formRef.current){ // Only run on manual changes, not on initial render or state recovery
      const isInitialRenderOrStateRecovery = (state.errors && state.errors.length > 0);
      if(!isInitialRenderOrStateRecovery) {
         setCityValue('');
      }
    }
  }, [selectedDepartment]);


  const getError = (fieldName: string) =>
    state.errors?.find((e: any) => e.path.includes(fieldName))?.message;
    
  return (
    <section id="unete" className="w-full py-20 md:py-32 bg-background/10">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
          <div className="inline-block bg-background/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl">
            <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
                Únete a la Campaña
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                Tu apoyo es fundamental. Registra tus datos y sé parte del cambio que nos une.
            </p>
          </div>
        </div>
        <Card className="max-w-4xl mx-auto shadow-2xl bg-card/80 backdrop-blur-sm overflow-hidden border-2 border-primary/20">
            <CardContent className="px-4 md:px-8 pb-8 pt-8">
              <form ref={formRef} action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Nombres y apellidos completos *</Label>
                    <Input id="fullName" name="fullName" defaultValue={state.values?.fullName} />
                    {getError('fullName') && (<p className="text-sm text-destructive">{getError('fullName')}</p>)}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico *</Label>
                    <Input id="email" type="email" name="email" defaultValue={state.values?.email} />
                    {getError('email') && (<p className="text-sm text-destructive">{getError('email')}</p>)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="documentType">Tipo de Documento *</Label>
                    <Select name="documentType" value={selectedDocType} onValueChange={setSelectedDocType}>
                      <SelectTrigger id="documentType">
                        <SelectValue placeholder="Seleccione un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cédula de ciudadanía">Cédula de ciudadanía</SelectItem>
                        <SelectItem value="Cédula de extranjería">Cédula de extranjería</SelectItem>
                        <SelectItem value="Pasaporte">Pasaporte</SelectItem>
                      </SelectContent>
                    </Select>
                    {getError('documentType') && (<p className="text-sm text-destructive">{getError('documentType')}</p>)}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="idCard">Número de documento *</Label>
                    <Input
                      id="idCard"
                      name="idCard"
                      inputMode={selectedDocType !== 'Pasaporte' ? 'numeric' : 'text'}
                      pattern={selectedDocType !== 'Pasaporte' ? '[0-9]*' : undefined}
                      defaultValue={state.values?.idCard}
                    />
                    {getError('idCard') && (<p className="text-sm text-destructive">{getError('idCard')}</p>)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono celular / WhatsApp *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      defaultValue={state.values?.phone}
                    />
                    {getError('phone') && (<p className="text-sm text-destructive">{getError('phone')}</p>)}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="referrer">¿Quién te contó de mí? Escribe su Nombre completo. *</Label>
                    <Select name="referrer" defaultValue={state.values?.referrer || undefined}>
                      <SelectTrigger id="referrer">
                        <SelectValue placeholder={referrersList.length > 0 ? "Selecciona la persona que te contó" : "Cargando..."} />
                      </SelectTrigger>
                      <SelectContent>
                        {referrersList.map((name) => (<SelectItem key={name} value={name}>{name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    {getError('referrer') && (<p className="text-sm text-destructive">{getError('referrer')}</p>)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">Departamento *</Label>
                    <Select name="department" value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Seleccione un departamento" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (<SelectItem key={dept} value={dept}>{dept}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    {getError('department') && (<p className="text-sm text-destructive">{getError('department')}</p>)}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Municipio - Ciudad *</Label>
                    <Select name="city" value={cityValue} onValueChange={setCityValue} disabled={!selectedDepartment}>
                      <SelectTrigger id="city">
                        <SelectValue placeholder={selectedDepartment ? "Seleccione un municipio" : "Seleccione primero un departamento"} />
                      </SelectTrigger>
                      <SelectContent>
                        {municipalities.map((city) => (<SelectItem key={city} value={city}>{city}</SelectItem>))}
                      </SelectContent>
                    </Select>
                    {getError('city') && (<p className="text-sm text-destructive">{getError('city')}</p>)}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="proposal">Dinos tu propuesta (Opcional)</Label>
                  <Textarea
                    id="proposal"
                    name="proposal"
                    placeholder="Describe aquí tu idea o propuesta para mejorar nuestra comunidad..."
                    rows={4}
                    defaultValue={state.values?.proposal}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Checkbox id="dataAuthorization" name="dataAuthorization" defaultChecked={!!state.values?.dataAuthorization} />
                    <div className="grid gap-1.5 leading-none">
                      <Label htmlFor="dataAuthorization" className="cursor-pointer">¿Autoriza el tratamiento de sus datos? *</Label>
                      <p className="text-xs text-muted-foreground">Al marcar esta casilla, aceptas nuestra{' '}<a href="#" className="underline">política de tratamiento de datos</a>.</p>
                    </div>
                  </div>
                  {getError('dataAuthorization') && (<p className="text-sm text-destructive">{getError('dataAuthorization')}</p>)}
                </div>

                <SubmitButton />
              </form>
            </CardContent>
        </Card>
      </div>
    </section>
  );
}
