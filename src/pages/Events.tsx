import { useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { useLanguage } from '@/hooks/useLanguage';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { getImage } from '@/lib/imageMap';

import upcomingEventsData from '@/settings/events-upcoming.json';
import pastEventsData from '@/settings/events-past.json';

import upcomingCoursesData from '@/settings/courses-upcoming.json';
import pastCoursesData from '@/settings/courses-past.json';
import testimonialsData from '@/settings/testimonials.json';

const Events = () => {
  const { t } = useLanguage();
  const [filter, setFilter] = useState<string>('all');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [isGalleryEventOpen, setIsGalleryEventOpen] = useState(false);
  const [isGalleryCourseOpen, setIsGalleryCourseOpen] = useState(false);

  const upcomingEvents = upcomingEventsData.map(e => ({
    ...e,
    title: t(e.titleKey),
    date: t(e.dateKey),
    description: t(e.descriptionKey),
    image: getImage(e.image) || e.image,
  }));

  const pastEvents = pastEventsData.map(e => ({
    ...e,
    title: t(e.titleKey),
    date: t(e.dateKey),
    description: t(e.descriptionKey),
    image: getImage(e.image) || e.image,
  }));

  const upcomingCourses = upcomingCoursesData.map(c => ({
    ...c,
    title: t(c.titleKey),
    date: t(c.dateKey),
    description: t(c.descriptionKey),
    image: getImage(c.image) || c.image,
  }));

  const pastCourses = pastCoursesData.map(c => ({
    ...c,
    title: t(c.titleKey),
    date: t(c.dateKey),
    description: t(c.descriptionKey),
    image: getImage(c.image) || c.image,
  }));

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'workshop':
        return t('events.filter.workshop');
      case 'competition':
        return t('events.filter.competition');
      case 'internal':
        return t('events.filter.internal');
      case 'cultural':
        return t('events.filter.cultural');
      default:
        return type;
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'workshop':
        return 'default';
      case 'competition':
        return 'destructive';
      case 'internal':
        return 'internal';
      case 'cultural':
        return 'cultural';
      default:
        return 'default';
    }
  };

  const EventCard = ({ event, isPast = false }: { event: any; isPast?: boolean }) => {
    return (
      <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-glow hover:scale-105">
        <div className="aspect-video overflow-hidden relative">
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
            <Link to={`/events/${event.id}`} className="w-full">
              <Button className="w-full">{t('events.viewmore')}</Button>
            </Link>
          ) : (
            <Button variant="outline" className="w-full" onClick={() => { setSelectedEvent(event); setIsGalleryEventOpen(true); }}>{t('events.gallery')}</Button>
          )}
        </CardFooter>
      </Card>
    );
  };

  const CourseCard = ({ course, isPast = false }: { course: any; isPast?: boolean }) => {
    return (
      <Card className="overflow-hidden border-none shadow-md transition-all hover:shadow-glow hover:scale-105 ring-2 ring-primary shadow-elegant">
        <div className="aspect-video overflow-hidden relative">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform hover:scale-110"
          />
          {!isPast && (
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-primary text-primary-foreground shadow-lg">
                {t('courses.featured')}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-6">
          <div className="mb-3 flex items-center gap-2">
            <Badge variant="secondary">
              {t('courses.badge')}
            </Badge>
          </div>
          <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
          <p className="mb-4 text-sm text-muted-foreground">{course.description}</p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{course.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{course.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{course.hours} {t('courses.hours')}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          {!isPast ? (
            <Link to={`/courses/${course.id}`} className="w-full">
              <Button className="w-full">{t('courses.viewmore')}</Button>
            </Link>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => {
                setSelectedCourse(course);
                setIsGalleryCourseOpen(true);
              }}
            >
              {t('courses.gallery')}
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  };

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

      {/* Courses Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-8 grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="upcoming">{t('courses.upcoming')}</TabsTrigger>
              <TabsTrigger value="past">{t('courses.past')}</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past" className="space-y-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastCourses.map((course) => (
                  <CourseCard key={course.id} course={course} isPast />
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <Dialog open={isGalleryCourseOpen} onOpenChange={setIsGalleryCourseOpen} modal={false}>
            <DialogContent className="max-w-5xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedCourse ? selectedCourse.title : t('courses.gallery')}
                </DialogTitle>
              </DialogHeader>

              {selectedCourse?.gallery?.length ? (
                <PhotoProvider>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {selectedCourse.gallery.map((img: string, index: number) => (
                      <PhotoView key={index} src={img}>
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="h-48 w-full object-cover rounded-lg shadow-sm cursor-pointer transition-transform hover:scale-105"
                        />
                      </PhotoView>
                    ))}
                  </div>
                </PhotoProvider>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">{t('courses.galleryEmpty')}</p>
              )}
            </DialogContent>
          </Dialog>
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

          <Dialog open={isGalleryEventOpen} onOpenChange={setIsGalleryEventOpen} modal={false}>
            <DialogContent className="max-w-5xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedEvent ? selectedEvent.title : t('events.gallery')}
                </DialogTitle>
              </DialogHeader>

              {selectedEvent?.gallery?.length ? (
                <PhotoProvider>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {selectedEvent.gallery.map((img: string, index: number) => (
                      <PhotoView key={index} src={img}>
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="h-48 w-full object-cover rounded-lg shadow-sm cursor-pointer transition-transform hover:scale-105"
                        />
                      </PhotoView>
                    ))}
                  </div>
                </PhotoProvider>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">{t('events.galleryEmpty')}</p>
              )}
            </DialogContent>
          </Dialog>
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