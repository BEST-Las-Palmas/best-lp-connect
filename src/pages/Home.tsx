import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Users, Globe2, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import { getImage } from '@/lib/imageMap';
import sponsorsCurrent from '@/settings/sponsors-current.json';
import sponsorsPast from '@/settings/sponsors-past.json';

const Home = () => {
  const { t } = useLanguage();
  const heroImage = getImage('assets/hero-students.png');

  const stats = [
    { value: '3000+', label: t('home.stats.students') },
    { value: '20+', label: t('home.stats.events') },
    { value: '90+', label: t('home.stats.universities') },
  ];

  const values = [
    {
      icon: GraduationCap,
      title: t('home.values.education'),
      description: t('home.values.education.desc'),
    },
    {
      icon: Globe2,
      title: t('home.values.culture'),
      description: t('home.values.culture.desc'),
    },
    {
      icon: Users,
      title: t('home.values.cooperation'),
      description: t('home.values.cooperation.desc'),
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="absolute inset-0 opacity-25">
          <img
            src={heroImage}
            alt="Students collaborating"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="container-custom relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-6xl animate-fade-in">
              {t('home.hero.title')}
            </h1>
            <p className="mb-8 text-lg text-primary-foreground/90 md:text-xl animate-slide-up">
              {t('home.hero.subtitle')}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-scale-in">
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  {t('home.hero.cta')}
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20">
                  {t('home.hero.learn')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {stats.map((stat, index) => (
              <Card key={index} className="border-none bg-card shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="mb-2 text-4xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About BEST Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 flex justify-center">
              <Lightbulb className="h-12 w-12 text-accent" />
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t('home.about.title')}</h2>
            <p className="mb-3 text-lg font-semibold text-primary">{t('home.about.subtitle')}</p>
            <p className="mb-8 text-muted-foreground">{t('home.about.description')}</p>
            
            <div className="mt-12 rounded-2xl bg-gradient-card p-8">
              <h3 className="mb-4 text-2xl font-bold">{t('home.local.title')}</h3>
              <p className="text-muted-foreground">{t('home.local.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            {t('home.values.title')}
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {values.map((value, index) => (
              <Card key={index} className="border-none bg-card shadow-md transition-transform hover:scale-105">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                    <value.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

        {/* Sponsors Section */}
      {(sponsorsCurrent.length > 0 || sponsorsPast.length > 0) && (
        <section className="section-padding overflow-hidden">
          <div className="container-custom">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              {t('home.sponsors.title')}
            </h2>
          </div>

          {/* Current Sponsors */}
          {sponsorsCurrent.length > 0 && (
            <div className="mb-12 w-full overflow-hidden">
              <div className="flex animate-scroll-left hover:[animation-play-state:paused]">
                {[...Array(3)].map((_, groupIndex) => (
                  <div key={groupIndex} className="flex flex-shrink-0">
                    {sponsorsCurrent.map((sponsor, index) => (
                      <div key={`${groupIndex}-${sponsor.id}-${index}`} className="w-64 flex-shrink-0 px-4">
                        <a
                          href={sponsor.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block transition-transform hover:scale-105"
                        >
                          <Card className="border-none shadow-md">
                            <CardContent className="flex aspect-square items-center justify-center p-6">
                              <img
                                src={getImage(sponsor.image) || sponsor.image}
                                alt={sponsor.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            </CardContent>
                          </Card>
                        </a>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Past Sponsors */}
          {sponsorsPast.length > 0 && (
            <>
              <div className="container-custom">
                <h3 className="mb-6 text-center text-xl font-semibold text-muted-foreground">
                  {t('home.sponsors.past')}
                </h3>
              </div>

              <div className="w-full overflow-hidden">
                <div className="flex animate-scroll-left-fast hover:[animation-play-state:paused]">
                  {[...Array(3)].map((_, groupIndex) => (
                    <div key={groupIndex} className="flex flex-shrink-0">
                      {sponsorsPast.map((sponsor, index) => (
                        <div key={`${groupIndex}-${sponsor.id}-${index}`} className="w-48 flex-shrink-0 px-2">
                          <a
                            href={sponsor.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block transition-transform hover:scale-105"
                          >
                            <Card className="border-none shadow-sm">
                              <CardContent className="flex aspect-square items-center justify-center p-4">
                                <img
                                  src={getImage(sponsor.image) || sponsor.image}
                                  alt={sponsor.name}
                                  className="max-h-full max-w-full object-contain opacity-70 hover:opacity-100 transition-opacity"
                                />
                              </CardContent>
                            </Card>
                          </a>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      )}

      {/* CTA Section */}
      <section className="section-padding bg-gradient-hero">
        <div className="container-custom text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            {t('home.hero.cta')}
          </h2>
          <p className="mb-8 text-lg text-primary-foreground/90">
            {t('home.hero.subtitle')}
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              {t('nav.contact')}
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
