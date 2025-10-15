import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '@/contexts/LanguageContext';
import { Calendar, MapPin, Users } from 'lucide-react';
import eventWorkshop from '@/assets/event-workshop.jpg';
import eventCompetition from '@/assets/event-competition.jpg';

import upcomingEventsData from '@/settings/events-upcoming.json';
import pastEventsData from '@/settings/events-past.json';
import testimonialsData from '@/settings/testimonials.json';

const imageMap: Record<string, string> = {
  eventWorkshop,
  eventCompetition,
};

const Events = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState<string>('all');

  const upcomingEvents = upcomingEventsData.map(e => ({
    ...e,
    title: t(e.titleKey),
    date: t(e.dateKey),
    description: t(e.descriptionKey),
    image: imageMap[e.image],
  }));

  const pastEvents = pastEventsData.map(e => ({
    ...e,
    title: t(e.titleKey),
    date: t(e.dateKey),
    description: t(e.descriptionKey),
    image: imageMap[e.image],
  }));

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
            <span>{event.participants} {t('events.participants')}</span>
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
            {t('events.description')}
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
            {testimonialsData.map((testimonial, index) => (
              <Card key={index} className="border-none bg-card shadow-md">
                <CardContent className="p-6">
                  <p className="mb-4 italic text-muted-foreground">"{t(testimonial.quoteKey)}"</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{t(testimonial.roleKey)}</p>
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
