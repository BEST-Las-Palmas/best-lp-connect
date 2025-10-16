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

  // Standard event layout
  return (
    <div className="min-h-screen py-16 section-padding">
      <div className="container-custom max-w-5xl">
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
                  <Button className="w-full" asChild>
                    <Link to="/contact">{t('events.detail.contactToRegister')}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          <Link to="/events">
          <Button variant="ghost" className="mb-8 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('events.back')}
          </Button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;