import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';

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

  return (
    <div className="min-h-screen py-16 section-padding">
      <div className="container-custom max-w-4xl">
        <Link to="/events">
          <Button variant="ghost" className="mb-8 flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('events.back')}
          </Button>
        </Link>

        <Card className="overflow-hidden border-none shadow-lg">
          <div className="aspect-video">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>

          <CardContent className="p-6 space-y-4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-muted-foreground">{description}</p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {event.participants} {t('events.participants')}
                </span>
              </div>
            </div>

            <div className="pt-4">
              <Button className="w-full">{t('events.registerNow')}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EventDetail;