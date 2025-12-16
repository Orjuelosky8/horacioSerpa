
"use client";

import { useState, useMemo, useTransition, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Ticket, Calendar as CalendarIcon, ArrowRight, Search, CheckCircle, Loader2 } from 'lucide-react';
import { addDays, format, isSameDay, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '../ui/badge';
import { AnimatePresence, motion } from 'framer-motion';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';

type Event = {
  date: Date;
  title: string;
  location: string;
  time: string;
  type: 'Debate' | 'Encuentro' | 'Virtual' | 'Foro';
  description: string;
  googleMapsUrl?: string;
};

// Se mueve la definición de eventos fuera para que no se recree, pero se inicializará en el cliente
const getEvents = (): Event[] => [
  {
    date: new Date(),
    title: 'Encuentro ciudadano en Bogotá',
    location: 'Plaza de Bolívar, Bogotá',
    time: '10:00 AM',
    type: 'Encuentro',
    description: 'Diálogo abierto con la comunidad para discutir propuestas sobre seguridad y empleo.',
    googleMapsUrl: 'https://maps.app.goo.gl/y2PDRp2HrtM9S8xG9'
  },
  {
    date: addDays(new Date(), 2),
    title: 'Debate sobre educación',
    location: 'Transmisión en vivo',
    time: '7:00 PM',
    type: 'Virtual',
    description: 'Participación en el gran debate nacional sobre el futuro de la educación superior.',
  },
  {
    date: addDays(new Date(), 2),
    title: 'Foro de Sostenibilidad',
    location: 'Universidad de los Andes',
    time: '2:00 PM',
    type: 'Foro',
    description: 'Análisis de las políticas de transición energética y economía circular.',
    googleMapsUrl: 'https://maps.app.goo.gl/9zV5q7r8s7D9J6F57'
  },
  {
    date: addDays(new Date(), 5),
    title: 'Reunión con empresarios de Medellín',
    location: 'Cámara de Comercio, Medellín',
    time: '9:00 AM',
    type: 'Encuentro',
    description: 'Presentación de incentivos para la inversión y la generación de empleo en la región.',
    googleMapsUrl: 'https://maps.app.goo.gl/GqH3Y7y9s6E5B4r3A'
  },
  {
    date: addDays(new Date(), 8),
    title: 'Gran Debate Presidencial',
    location: 'Canal RCN',
    time: '8:00 PM',
    type: 'Debate',
    description: 'Enfrentando las grandes preguntas del país en el último debate antes de elecciones.',
  },
];

const EventCard = ({ event, onRegister }: { event: Event, onRegister: (event: Event) => void }) => {
  const typeStyles = {
    Debate: 'bg-red-200 text-red-800 border-red-300',
    Encuentro: 'bg-blue-200 text-blue-800 border-blue-300',
    Virtual: 'bg-purple-200 text-purple-800 border-purple-300',
    Foro: 'bg-green-200 text-green-800 border-green-300',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="w-full"
    >
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 bg-background/60">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0 text-center border-r md:pr-6">
              <p className="font-headline text-4xl text-primary">{format(event.date, 'dd')}</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">{format(event.date, 'MMM', { locale: es })}</p>
            </div>
            <div className="flex-grow">
              <Badge variant="secondary" className={`mb-2 ${typeStyles[event.type]}`}>{event.type}</Badge>
              <h3 className="font-headline text-xl font-bold text-foreground mb-2">{event.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{event.description}</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3 w-3" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3 w-3" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center justify-center gap-2">
                <Button size="sm" className="w-full md:w-auto" onClick={() => onRegister(event)}>
                    <Ticket className="mr-2 h-4 w-4"/> Inscribirse
                </Button>
                {event.googleMapsUrl && (
                    <Button size="sm" variant="outline" className="w-full md:w-auto" asChild>
                        <a href={event.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                            <MapPin className="mr-2 h-4 w-4"/> Cómo llegar
                        </a>
                    </Button>
                )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const RegistrationModal = ({ 
    isOpen, 
    onOpenChange, 
    event 
} : {
    isOpen: boolean,
    onOpenChange: (open: boolean) => void,
    event: Event | null
}) => {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    async function handleRegistration(formData: FormData) {
        if (!event) return;

        startTransition(async () => {
            // Simular el envío a un backend
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            console.log({
                eventName: event.title,
                registrantName: formData.get('name'),
                registrantEmail: formData.get('email'),
            });

            // En un futuro, aquí iría la lógica para enviar a Google Sheets
            // a través de una Server Action que use la API de Google.

            onOpenChange(false);
            toast({
                title: "¡Inscripción exitosa!",
                description: `Te has inscrito correctamente al evento: ${event.title}.`,
                variant: "default",
                action: <CheckCircle className="text-green-500"/>
            });
        });
    }

    if (!event) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl">Confirmar Asistencia</DialogTitle>
                    <CardDescription>Estás a un paso de unirte a: <strong className="text-primary">{event.title}</strong></CardDescription>
                </DialogHeader>
                <form action={handleRegistration} className="space-y-4 pt-4">
                    <div>
                        <Label htmlFor="name">Nombre Completo</Label>
                        <Input id="name" name="name" placeholder="Tu nombre y apellido" required />
                    </div>
                     <div>
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input id="email" name="email" type="email" placeholder="tu@email.com" required />
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={isPending} className="w-full">
                            {isPending ? 'Procesando...' : 'Confirmar mi cupo'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const CalendarLoadingSkeleton = () => (
  <section id="agenda" className="w-full py-20 md:py-32 bg-secondary/30">
    <div className="container mx-auto px-6">
      <div className="mb-12 text-center">
        <div className="inline-block bg-background/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl">
          <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">Agenda de Campaña</h2>
          <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
            Encuentra, filtra y participa en nuestros próximos eventos. ¡Tu presencia es importante!
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg2:grid-cols-3 gap-12">
        <div className="lg2:col-span-1">
          <div className="flex flex-col items-center md:items-start md:flex-row md:gap-8 lg2:flex-col lg2:gap-8">
            <Card className="w-full md:flex-1 lg2:w-auto shadow-2xl bg-background/80 backdrop-blur-sm">
              <CardHeader><CardTitle className="font-headline">Filtrar Eventos</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="h-10 bg-muted rounded-md animate-pulse" />
                <div className="h-10 bg-muted rounded-md animate-pulse" />
              </CardContent>
            </Card>
            <div className="w-full flex justify-center md:w-auto mt-8 md:mt-0">
              <Card className="p-0 shadow-2xl bg-background/80 backdrop-blur-sm self-start inline-block">
                <div className="p-4 h-[298px] w-[288px] flex items-center justify-center bg-muted rounded-lg animate-pulse">
                  <Loader2 className="h-8 w-8 text-muted-foreground animate-spin" />
                </div>
              </Card>
            </div>
          </div>
        </div>
        <div className="lg2:col-span-2">
          <h3 className="font-headline text-2xl font-bold mb-6">Próximos Eventos</h3>
          <div className="space-y-6">
            <Card className="flex flex-col items-center justify-center p-8 text-center h-64 border-dashed bg-background/30">
              <Loader2 className="h-12 w-12 text-muted-foreground mb-4 animate-spin" />
              <h4 className="font-semibold text-lg">Cargando eventos...</h4>
            </Card>
          </div>
        </div>
      </div>
    </div>
  </section>
);


export default function EventsCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  const [selectedEventForRegistration, setSelectedEventForRegistration] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Se ejecuta solo en el cliente para evitar errores de hidratación.
    setEvents(getEvents());
    setIsMounted(true);
  }, []);

  const handleRegisterClick = (event: Event) => {
    setSelectedEventForRegistration(event);
    setIsModalOpen(true);
  };

  const filteredEvents = useMemo(() => {
    if (!isMounted) return []; // No filtrar hasta que el componente esté montado.

    const today = startOfToday();
    let upcoming = events.filter(event => event.date >= today);

    if (date) {
      upcoming = upcoming.filter(event => isSameDay(event.date, date));
    }
    if (searchQuery) {
      upcoming = upcoming.filter(event => 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (typeFilter !== 'all') {
      upcoming = upcoming.filter(event => event.type === typeFilter);
    }
    
    return upcoming.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [date, searchQuery, typeFilter, events, isMounted]);


  const eventDates = useMemo(() => isMounted ? events.map(event => event.date) : [], [events, isMounted]);

  if (!isMounted) {
    return <CalendarLoadingSkeleton />;
  }

  return (
    <>
      <section id="agenda" className="w-full py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="mb-12 text-center">
              <div className="inline-block bg-background/30 backdrop-blur-sm p-6 md:p-8 rounded-2xl">
                <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">Agenda de Campaña</h2>
                <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
                    Encuentra, filtra y participa en nuestros próximos eventos. ¡Tu presencia es importante!
                </p>
              </div>
          </div>
          <div className="grid grid-cols-1 lg2:grid-cols-3 gap-12">
                  <div className="lg2:col-span-1">
                      <div className="flex flex-col items-center md:items-start md:flex-row md:gap-8 lg2:flex-col lg2:gap-8">
                          <Card className="w-full md:flex-1 lg2:w-auto shadow-2xl bg-background/80 backdrop-blur-sm">
                              <CardHeader>
                                  <CardTitle className="font-headline">Filtrar Eventos</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                  <div className="relative">
                                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                                      <Input 
                                          placeholder="Buscar por nombre..." 
                                          className="pl-10"
                                          value={searchQuery}
                                          onChange={(e) => setSearchQuery(e.target.value)}
                                      />
                                  </div>
                                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                                      <SelectTrigger>
                                          <SelectValue placeholder="Filtrar por tipo" />
                                      </SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="all">Todos los tipos</SelectItem>
                                          <SelectItem value="Debate">Debate</SelectItem>
                                          <SelectItem value="Encuentro">Encuentro</SelectItem>
                                          <SelectItem value="Virtual">Virtual</SelectItem>
                                          <SelectItem value="Foro">Foro</SelectItem>
                                      </SelectContent>
                                  </Select>
                              </CardContent>
                          </Card>
                          <div className="w-full flex justify-center md:w-auto mt-8 md:mt-0">
                               <Card className="p-0 shadow-2xl bg-background/80 backdrop-blur-sm self-start inline-block">
                                  <Calendar
                                      mode="single"
                                      selected={date}
                                      onSelect={setDate}
                                      locale={es}
                                      modifiers={{
                                      event: eventDates,
                                      }}
                                      modifiersClassNames={{
                                      event: "bg-primary/20 text-primary-foreground rounded-full font-bold",
                                      selected: "bg-primary text-primary-foreground",
                                      }}
                                      className="p-4"
                                      footer={date ? <Button variant="ghost" size="sm" onClick={() => setDate(undefined)}>Limpiar selección</Button> : undefined}
                                  />
                              </Card>
                          </div>
                      </div>
                  </div>

                  <div className="lg2:col-span-2">
                      <div className="flex items-center justify-between mb-6">
                          <h3 className="font-headline text-2xl font-bold">
                              {date ? `Eventos para el ${format(date, "d 'de' MMMM", { locale: es })}` : 'Próximos Eventos'}
                          </h3>
                      </div>
                      <div className="space-y-6">
                          <AnimatePresence>
                              {filteredEvents.length > 0 ? (
                                  filteredEvents.map((event, index) => (
                                      <EventCard key={index} event={event} onRegister={handleRegisterClick}/>
                                  ))
                              ) : (
                                  <Card className="flex flex-col items-center justify-center p-8 text-center h-64 border-dashed bg-background/30">
                                      <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                                      <h4 className="font-semibold text-lg">No se encontraron eventos</h4>
                                      <p className="text-muted-foreground text-sm">Intenta ajustar tu búsqueda o selecciona otra fecha.</p>
                                  </Card>
                              )}
                          </AnimatePresence>
                      </div>
                  </div>
              </div>
        </div>
      </section>
      <RegistrationModal 
          isOpen={isModalOpen}
          onOpenChange={setIsModalOpen}
          event={selectedEventForRegistration}
      />
    </>
  );
}
