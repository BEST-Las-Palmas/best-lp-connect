import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin, Users } from 'lucide-react';
import eventWorkshop from '@/assets/event-workshop.jpg';
import eventCompetition from '@/assets/event-competition.jpg';

const Events = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<string>('all');

  const upcomingEvents = [
    {
      id: 1,
      title: language === 'es' ? 'Workshop de Inteligencia Artificial' : 'Artificial Intelligence Workshop',
      type: 'workshop',
      date: language === 'es' ? '15 de Noviembre, 2025' : 'November 15, 2025',
      location: 'ULPGC - Edificio de Informática',
      participants: 40,
      description: language === 'es'
        ? 'Aprende los fundamentos del Machine Learning y Deep Learning con expertos del sector.'
        : 'Learn the fundamentals of Machine Learning and Deep Learning with industry experts.',
      image: eventWorkshop,
    },
    {
      id: 2,
      title: language === 'es' ? 'Competencia de Robótica' : 'Robotics Competition',
      type: 'competition',
      date: language === 'es' ? '3 de Diciembre, 2025' : 'December 3, 2025',
      location: 'ULPGC - Laboratorio de Robótica',
      participants: 60,
      description: language === 'es'
        ? 'Demuestra tus habilidades en robótica y compite con otros estudiantes de tecnología.'
        : 'Showcase your robotics skills and compete with other technology students.',
      image: eventCompetition,
    },
    {
      id: 3,
      title: language === 'es' ? 'Curso BEST: Desarrollo Web Avanzado' : 'BEST Course: Advanced Web Development',
      type: 'course',
      date: language === 'es' ? '10-15 de Enero, 2026' : 'January 10-15, 2026',
      location: 'ULPGC - Campus Tafira',
      participants: 30,
      description: language === 'es'
        ? 'Curso intensivo de una semana sobre tecnologías web modernas y mejores prácticas.'
        : 'Intensive one-week course on modern web technologies and best practices.',
      image: eventWorkshop,
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: language === 'es' ? 'Hackathon de Sostenibilidad' : 'Sustainability Hackathon',
      type: 'competition',
      date: language === 'es' ? '20 de Septiembre, 2025' : 'September 20, 2025',
      location: 'ULPGC',
      participants: 80,
      description: language === 'es'
        ? 'Desarrolla soluciones tecnológicas para desafíos de sostenibilidad en 24 horas.'
        : 'Develop technological solutions for sustainability challenges in 24 hours.',
      image: eventCompetition,
    },
    {
      id: 5,
      title: language === 'es' ? 'Workshop de Ciberseguridad' : 'Cybersecurity Workshop',
      type: 'workshop',
      date: language === 'es' ? '5 de Octubre, 2025' : 'October 5, 2025',
      location: 'ULPGC - Edificio de Informática',
      participants: 50,
      description: language === 'es'
        ? 'Aprende sobre seguridad informática, ethical hacking y protección de datos.'
        : 'Learn about computer security, ethical hacking, and data protection.',
      image: eventWorkshop,
    },
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'workshop':
        return t('events.filter.workshop');
      case 'course':
        return t('events.filter.course');
      case 'competition':
        return t('events.filter.competition');
      default:
        return type;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'default';
      case 'course':
        return 'secondary';
      case 'competition':
        return 'destructive';
      default:
        return 'default';
    }
  };

  const EventCard = ({ event, isPast = false }: { event: any; isPast?: boolean }) => (
    <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-glow hover:scale-105">
      <div className="aspect-video overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover transition-transform hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <Badge variant={getTypeBadgeVariant(event.type) as any}>
            {getTypeLabel(event.type)}
          </Badge>
        </div>
        <h3 className="mb-2 text-xl font-bold">{event.title}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{event.description}</p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{event.participants} {language === 'es' ? 'participantes' : 'participants'}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        {!isPast ? (
          <Button className="w-full">{t('events.register')}</Button>
        ) : (
          <Button variant="outline" className="w-full">{t('events.gallery')}</Button>
        )}
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl animate-fade-in">
            {t('events.title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90 animate-slide-up">
            {language === 'es'
              ? 'Descubre nuestros próximos eventos y revive los momentos más destacados'
              : 'Discover our upcoming events and relive the highlights'}
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="section-padding">
        <div className="container-custom">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="upcoming">{t('events.upcoming')}</TabsTrigger>
              <TabsTrigger value="past">{t('events.past')}</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} isPast />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            {t('testimonials.title')}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: 'María González',
                role: language === 'es' ? 'Estudiante de Ingeniería Informática' : 'Computer Engineering Student',
                quote: language === 'es'
                  ? 'Los eventos de BEST me han ayudado a desarrollar habilidades que no aprendería en clase. ¡Totalmente recomendado!'
                  : 'BEST events have helped me develop skills I wouldn\'t learn in class. Totally recommended!',
              },
              {
                name: 'Juan Pérez',
                role: language === 'es' ? 'Estudiante de Ingeniería Industrial' : 'Industrial Engineering Student',
                quote: language === 'es'
                  ? 'Conocí a estudiantes de toda Europa y aprendí de los mejores profesionales del sector.'
                  : 'I met students from all over Europe and learned from the best professionals in the industry.',
              },
              {
                name: 'Lucía Martín',
                role: language === 'es' ? 'Estudiante de Telecomunicaciones' : 'Telecommunications Student',
                quote: language === 'es'
                  ? 'BEST ha sido una experiencia transformadora. He crecido tanto personal como profesionalmente.'
                  : 'BEST has been a transformative experience. I\'ve grown both personally and professionally.',
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-none bg-card shadow-md">
                <CardContent className="p-6">
                  <p className="mb-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
