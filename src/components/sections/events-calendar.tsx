"use client";

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Ticket, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { addDays, format, isSameDay } from 'date-fns';
import { es } from 'date-fns/locale';
import { Badge } from '../ui/badge';
import { AnimatePresence, motion } from 'framer-motion';

type Event = {
  date: Date;
  title: string;
  location: string;
  time: string;
  type: 'Debate' | 'Encuentro' | 'Virtual' | 'Foro';
  description: string;
  url: string;
};

const events: Event[] = [
  {
    date: new Date(),
    title: 'Encuentro ciudadano en Bogotá',
    location: 'Plaza de Bolívar, Bogotá',
    time: '10:00 AM',
    type: 'Encuentro',
    description: 'Diálogo abierto con la comunidad para discutir propuestas sobre seguridad y empleo.',
    url: '#',
  },
  {
    date: addDays(new Date(), 2),
    title: 'Debate sobre educación',
    location: 'Transmisión en vivo',
    time: '7:00 PM',
    type: 'Virtual',
    description: 'Participación en el gran debate nacional sobre el futuro de la educación superior.',
    url: '#',
  },
  {
    date: addDays(new Date(), 2),
    title: 'Foro de Sostenibilidad',
    location: 'Universidad de los Andes',
    time: '2:00 PM',
    type: 'Foro',
    description: 'Análisis de las políticas de transición energética y economía circular.',
    url: '#',
  },
  {
    date: addDays(new Date(), 5),
    title: 'Reunión con empresarios',
    location: 'Cámara de Comercio, Medellín',
    time: '9:00 AM',
    type: 'Encuentro',
    description: 'Presentación de incentivos para la inversión y la generación de empleo en la región.',
    url: '#',
  },
  {
    date: addDays(new Date(), 8),
    title: 'Gran Debate Presidencial',
    location: 'Canal RCN',
    time: '8:00 PM',
    type: 'Debate',
    description: 'Enfrentando las grandes preguntas del país en el último debate antes de elecciones.',
    url: '#',
  },
];

const EventCard = ({ event, isFeatured }: { event: Event; isFeatured: boolean }) => {
  const typeStyles = {
    Debate: 'bg-red-200 text-red-800 border-red-300',
    Encuentro: 'bg-blue-200 text-blue-800 border-blue-300',
    Virtual: 'bg-purple-200 text-purple-800 border-purple-300',
    Foro: 'bg-green-200 text-green-800 border-green-300',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="w-full"
    >
      <Card className={`overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${isFeatured ? 'bg-background' : 'bg-background/60'}`}>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-shrink-0 text-center">
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
            <div className="flex-shrink-0 flex items-center justify-center">
                <Button size="icon" variant="outline" className="rounded-full h-12 w-12 group">
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"/>
                </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};


export default function EventsCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedEvents = useMemo(() => {
    return date ? events.filter(event => isSameDay(event.date, date)) : [];
  }, [date]);

  const upcomingEvents = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar a medianoche
    return events
        .filter(event => event.date >= today)
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 3);
  }, []);

  const displayedEvents = date ? selectedEvents : upcomingEvents;

  const eventDates = useMemo(() => events.map(event => event.date), []);

  return (
    <section id="agenda" className="w-full py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="mb-12 text-center">
            <h2 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">Agenda de Campaña</h2>
            <p className="mt-4 mx-auto max-w-2xl text-lg text-muted-foreground">
                Descubre nuestros próximos eventos. ¡Acompáñanos y sé parte activa del cambio!
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1 flex justify-center">
                <Card className="p-4 shadow-2xl bg-background/80 backdrop-blur-sm">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        locale={es}
                        modifiers={{
                          event: eventDates,
                        }}
                        modifiersClassNames={{
                          event: "bg-primary/20 text-primary-foreground rounded-full",
                          selected: "bg-primary text-primary-foreground",
                        }}
                        className="w-full"
                    />
                </Card>
            </div>

            <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-headline text-2xl font-bold">
                        {date ? `Eventos para el ${format(date, 'd \'de\' MMMM', { locale: es })}` : 'Próximos Eventos'}
                    </h3>
                    {date && (
                        <Button variant="ghost" onClick={() => setDate(undefined)}>
                            Mostrar todos
                        </Button>
                    )}
                </div>
                <div className="space-y-6">
                    <AnimatePresence>
                        {displayedEvents.length > 0 ? (
                            displayedEvents.map((event, index) => (
                                <EventCard key={index} event={event} isFeatured={!date || index === 0}/>
                            ))
                        ) : (
                            <Card className="flex flex-col items-center justify-center p-8 text-center h-64 border-dashed">
                                <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                                <h4 className="font-semibold text-lg">No hay eventos programados</h4>
                                <p className="text-muted-foreground text-sm">Por favor, selecciona otra fecha en el calendario.</p>
                            </Card>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}
