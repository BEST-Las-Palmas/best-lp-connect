import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import upcomingEventsData from '@/settings/events-upcoming.json';
import pastEventsData from '@/settings/events-past.json';
import eventWorkshop from '@/assets/event-workshop.jpg';
import eventCompetition from '@/assets/event-competition.jpg';

const imageMap: Record<string, string> = {
  eventWorkshop,
  eventCompetition,
};

const EventDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  const allEvents = [...upcomingEventsData, ...pastEventsData];
  const event = allEvents.find((e) => e.id.toString() === id);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">{t('events.notfound')}</p>
      </div>
    );
  }

  const image = imageMap[event.image];
  const title = t(event.titleKey);
  const date = t(event.dateKey);
  const description = t(event.descriptionKey);
  const isCourse = event.type === 'course';

  // Course layout inspired by BEST Graz
  if (isCourse) {
    return (
      <div className="min-h-screen">
        {/* Hero Section with Background Image */}
        <section className="relative min-h-[85vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="relative z-10 container-custom text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">{title}</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up">{description}</p>
            {event.registrationUrl && (
              <Button size="lg" className="text-lg px-8 py-6 animate-scale-in" asChild>
                <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                  {t('events.registerNow')}
                </a>
              </Button>
            )}
            <p className="mt-8 text-lg opacity-90 animate-fade-in">
              {t('events.course.subtitle')}
            </p>
          </div>
        </section>

        {/* Why Section */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('events.course.whyTitle')}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {event.objectives?.map((obj: string, idx: number) => (
                <Card key={idx} className="border-none shadow-md hover:shadow-glow transition-all">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-3">{t(obj)}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* What You'll Learn Section */}
        <section className="section-padding bg-secondary/30">
          <div className="container-custom max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              {t('events.course.learnTitle')}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              {t('events.course.learnSubtitle')}
            </p>
            
            {event.agenda && (
              <div className="grid md:grid-cols-2 gap-8">
                {event.agenda.map((item: any, idx: number) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.time}</h3>
                      <p className="text-muted-foreground">{t(item.activityKey)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Event Details */}
        <section className="section-padding bg-background">
          <div className="container-custom max-w-4xl">
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">{t('events.detail.info')}</CardTitle>
              </CardHeader>
              <CardContent className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-secondary/30">
                  <Calendar className="h-8 w-8 text-primary mb-3" />
                  <p className="font-medium mb-1">{t('events.detail.date')}</p>
                  <p className="text-muted-foreground">{date}</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-secondary/30">
                  <MapPin className="h-8 w-8 text-primary mb-3" />
                  <p className="font-medium mb-1">{t('events.detail.location')}</p>
                  <p className="text-muted-foreground">{event.location}</p>
                </div>
                <div className="flex flex-col items-center text-center p-4 rounded-lg bg-secondary/30">
                  <Users className="h-8 w-8 text-primary mb-3" />
                  <p className="font-medium mb-1">{t('events.detail.capacity')}</p>
                  <p className="text-muted-foreground">{event.participants} {t('events.participants')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Gallery */}
        {event.gallery && event.gallery.length > 0 && (
          <section className="section-padding bg-secondary/30">
            <div className="container-custom max-w-6xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                {t('events.detail.gallery')}
              </h2>
              <PhotoProvider>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {event.gallery.map((photo: string, idx: number) => (
                    <PhotoView key={idx} src={photo}>
                      <img
                        src={photo}
                        alt={`${title} - ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-all hover:scale-105"
                      />
                    </PhotoView>
                  ))}
                </div>
              </PhotoProvider>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="section-padding bg-gradient-hero text-center">
          <div className="container-custom">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              {t('events.course.ctaTitle')}
            </h2>
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              {t('events.course.ctaSubtitle')}
            </p>
            {event.registrationUrl ? (
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                  {t('events.registerNow')}
                </a>
              </Button>
            ) : (
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
                <Link to="/contact">{t('events.detail.contactToRegister')}</Link>
              </Button>
            )}
          </div>
        </section>

        {/* Back button */}
        <div className="container-custom max-w-6xl py-8">
          <Link to="/events">
            <Button variant="ghost" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('events.back')}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Standard event layout
  return (
    <div className="min-h-screen py-16 section-padding">
      <div className="container-custom max-w-5xl">
        <Link to="/events">
          <Button variant="ghost" className="mb-8 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('events.back')}
          </Button>
        </Link>

        {/* Hero Image */}
        <Card className="overflow-hidden border-none shadow-lg mb-8">
          <div className="aspect-video relative">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-8 text-white">
                <h1 className="text-4xl font-bold mb-2">{title}</h1>
                <p className="text-lg text-white/90">{description}</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {/* Event Details */}
            <Card className="border-none shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  {t('events.detail.about')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">{t('events.detail.objectives')}</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {event.objectives?.map((obj: string, idx: number) => (
                      <li key={idx}>{t(obj)}</li>
                    ))}
                  </ul>
                </div>

                {event.agenda && (
                  <div>
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {t('events.detail.agenda')}
                    </h3>
                    <ul className="space-y-2">
                      {event.agenda.map((item: any, idx: number) => (
                        <li key={idx} className="flex gap-3 text-sm">
                          <span className="font-medium text-primary min-w-20">{item.time}</span>
                          <span className="text-muted-foreground">{t(item.activityKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Photo Gallery */}
            {event.gallery && event.gallery.length > 0 && (
              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle>{t('events.detail.gallery')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <PhotoProvider>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {event.gallery.map((photo: string, idx: number) => (
                        <PhotoView key={idx} src={photo}>
                          <img
                            src={photo}
                            alt={`${title} - ${idx + 1}`}
                            className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                          />
                        </PhotoView>
                      ))}
                    </div>
                  </PhotoProvider>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Event Info */}
            <Card className="border-none shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">{t('events.detail.info')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t('events.detail.date')}</p>
                      <p className="text-muted-foreground">{date}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t('events.detail.location')}</p>
                      <p className="text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">{t('events.detail.capacity')}</p>
                      <p className="text-muted-foreground">
                        {event.participants} {t('events.participants')}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  {event.registrationUrl ? (
                    <Button className="w-full" asChild>
                      <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer">
                        {t('events.registerNow')}
                      </a>
                    </Button>
                  ) : (
                    <Button className="w-full" asChild>
                      <Link to="/contact">{t('events.detail.contactToRegister')}</Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;