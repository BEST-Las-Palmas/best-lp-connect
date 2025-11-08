import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Users, ArrowLeft, Clock, FileText, BookOpen, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';

import upcomingCoursesData from '@/settings/courses-upcoming.json';
import pastCoursesData from '@/settings/courses-past.json';
import { getImage } from '@/lib/imageMap';

const CourseDetail = () => {
  const { id } = useParams();
  const { t } = useLanguage();

  const allCourses = [...upcomingCoursesData, ...pastCoursesData];
  const course = allCourses.find((c) => c.id.toString() === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">{t('courses.notfound')}</p>
      </div>
    );
  }

  const image = getImage(course.image) || course.image;
  const title = t(course.titleKey);
  const date = t(course.dateKey);
  const description = t('shortdescriptionKey' in course ? course.shortdescriptionKey : course.descriptionKey);

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
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-slide-up whitespace-pre-line">{description}</p>
          {course.registrationUrl && (
            <Button size="lg" className="text-lg px-8 py-6 animate-scale-in" asChild>
              <a href={course.registrationUrl} target="_blank" rel="noopener noreferrer">
                {t('courses.registerNow')}
              </a>
            </Button>
          )}
          <p className="mt-8 text-lg opacity-90 animate-fade-in">
            {t('courses.subtitle')}
          </p>

          <img src="/logo-courses.png" className="h-24 mx-auto mt-16" />
        </div>
      </section>

      {/* Course Resources */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            {t('courses.resources.title')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {course.scheduleUrl && (
              <Card className="border-none shadow-lg hover:shadow-glow transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Calendar className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-bold text-xl mb-3">{t('courses.resources.schedule')}</h3>
                  <p className="text-muted-foreground mb-4">{t('courses.resources.scheduleDesc')}</p>
                  <Button asChild className="w-full">
                    <a href={course.scheduleUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="h-4 w-4 mr-2" />
                      {t('courses.resources.viewSchedule')}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
            {course.survivalGuideUrl && (
              <Card className="border-none shadow-lg hover:shadow-glow transition-all">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <BookOpen className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-bold text-xl mb-3">{t('courses.resources.survivalGuide')}</h3>
                  <p className="text-muted-foreground mb-4">{t('courses.resources.survivalGuideDesc')}</p>
                  <Button asChild className="w-full">
                    <a href={course.survivalGuideUrl} target="_blank" rel="noopener noreferrer">
                      <BookOpen className="h-4 w-4 mr-2" />
                      {t('courses.resources.viewGuide')}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      {'whatYouWillLearn' in course && course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
      <section className="section-padding bg-secondary/30">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            {t('courses.learnTitle')}
          </h2>
    {(
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {course.whatYouWillLearn.map((key: string, idx: number) => (
          <Card
            key={idx}
            className="border-none shadow-md hover:shadow-glow transition-all max-w-sm mx-auto"
          >
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold text-lg text-primary">
                {t(key)}
              </h3>
            </CardContent>
          </Card>
        ))}
      </div>
    )}

          {course.agenda && (
            <div className="grid md:grid-cols-2 gap-8">
              {course.agenda.map((item: any, idx: number) => (
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
      )}

      {/* Why Section */}
      <section className="section-padding bg-background">
        <div className="container-custom max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t('courses.whyTitle')}
          </h2>
<div className="grid gap-6 justify-center"
     style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
  {course.objectives?.map((obj: string, idx: number) => (
    <Card
      key={idx}
      className="border-none shadow-md hover:shadow-glow transition-all max-w-sm mx-auto"
    >
      <CardContent className="p-6 text-center">
        <h3 className="font-bold text-lg mb-3">{t(obj)}</h3>
      </CardContent>
    </Card>
  ))}
</div>
        </div>
      </section>

      {/* Course Details */}
      <section className="section-padding bg-secondary/30">
        <div className="container-custom max-w-4xl">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">{t('courses.detail.info')}</CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-4 gap-6">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
                <Calendar className="h-8 w-8 text-primary mb-3" />
                <p className="font-medium mb-1">{t('courses.detail.date')}</p>
                <p className="text-muted-foreground">{date}</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
                <MapPin className="h-8 w-8 text-primary mb-3" />
                <p className="font-medium mb-1">{t('courses.detail.location')}</p>
                <p className="text-muted-foreground">{course.location}</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
                <Clock className="h-8 w-8 text-primary mb-3" />
                <p className="font-medium mb-1">{t('courses.detail.hours')}</p>
                <p className="text-muted-foreground">{course.hours} {t('courses.hours')}</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-background">
                <DollarSign className="h-8 w-8 text-primary mb-3" />
                <p className="font-medium mb-1">{t('courses.detail.price')}</p>
                <p className="text-muted-foreground">{course.price}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* YouTube Video Section */}
      {'videoUrl' in course && course.videoUrl && (
        <section className="section-padding bg-background">
          <div className="container-custom max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              {t('courses.videoTitle')}
            </h2>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe className="absolute top-0 left-0 w-full h-full" src={course.videoUrl} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {course.gallery && course.gallery.length > 0 && (
        <section className="section-padding bg-secondary/30">
          <div className="container-custom max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              {t('courses.detail.gallery')}
            </h2>
            <PhotoProvider>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {course.gallery.map((photo: string, idx: number) => (
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
            {t('courses.ctaTitle')}
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {t('courses.ctaSubtitle')}
          </p>
          {course.registrationUrl ? (
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <a href={course.registrationUrl} target="_blank" rel="noopener noreferrer">
                {t('courses.registerNow')}
              </a>
            </Button>
          ) : (
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link to="/contact">{t('courses.detail.contactToRegister')}</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Back button */}
      <div className="container-custom max-w-6xl py-8">
        <Link to="/events">
          <Button variant="ghost" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('courses.back')}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CourseDetail;
