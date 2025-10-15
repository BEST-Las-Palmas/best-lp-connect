import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target, Eye, Users } from 'lucide-react';
import boardMembersData from '@/settings/about.json';

const About = () => {
  const { t, language } = useLanguage();

  const boardMembers = boardMembersData.map(member => ({
    ...member,
    position: t(member.position),
    quote: t(member.quote),
  }));

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl animate-fade-in">
            {t('about.title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90 animate-slide-up">
            {t('home.about.subtitle')}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <Card className="border-none bg-gradient-card shadow-lg">
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                  <Target className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="mb-4 text-2xl font-bold">{t('about.mission.title')}</h2>
                <p className="text-muted-foreground">{t('about.mission.text')}</p>
              </CardContent>
            </Card>

            <Card className="border-none bg-gradient-card shadow-lg">
              <CardContent className="p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                  <Eye className="h-6 w-6 text-accent-foreground" />
                </div>
                <h2 className="mb-4 text-2xl font-bold">{t('about.vision.title')}</h2>
                <p className="text-muted-foreground">{t('about.vision.text')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-center">{t('history.title')}</h2>
            <div className="space-y-6 text-muted-foreground">
              <p>
                {t('history.1')}
              </p>
              <p>
                {t('history.2')}
              </p>
              <p>
                {t('history.3')}
              </p>
            </div>
          </div>
        </div>
      </section>

            {/* Board Members */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
              <Users className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t('about.board.title')}</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">{t('about.board.description')}</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {boardMembers.map((member, index) => (
              <Card
                key={index}
                className="border-none bg-card shadow-md transition-all hover:shadow-glow hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-gradient-hero text-4xl">
                    {member.image}
                  </div>
                  <h3 className="mb-1 text-lg font-bold">{member.name}</h3>
                  <p className="mb-3 text-sm font-semibold text-primary">{member.position}</p>
                  <p className="text-xs italic text-muted-foreground">"{member.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
