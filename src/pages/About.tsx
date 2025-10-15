import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target, Eye, Users } from 'lucide-react';

const About = () => {
  const { t, language } = useLanguage();

  const boardMembers = [
    {
      name: 'Ana García',
      position: t('about.board.president'),
      quote: 'Leading with passion for student development',
      image: '👤',
    },
    {
      name: 'Carlos Rodríguez',
      position: t('about.board.secretary'),
      quote: 'Organizing excellence, one event at a time',
      image: '👤',
    },
    {
      name: 'Laura Martínez',
      position: t('about.board.treasurer'),
      quote: 'Managing resources for maximum impact',
      image: '👤',
    },
    {
      name: 'Miguel Santos',
      position: t('about.board.hr'),
      quote: 'Building strong teams, creating leaders',
      image: '👤',
    },
    {
      name: 'Elena Pérez',
      position: t('about.board.cr'),
      quote: 'Connecting students with industry',
      image: '👤',
    },
    {
      name: 'David López',
      position: t('about.board.prd'),
      quote: 'Crafting our story, sharing our vision',
      image: '👤',
    },
    {
      name: 'Sofía Hernández',
      position: t('about.board.it'),
      quote: 'Powering innovation with technology',
      image: '👤',
    },
    {
      name: 'Javier Díaz',
      position: t('about.board.events'),
      quote: 'Creating unforgettable learning experiences',
      image: '👤',
    },
  ];

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

      {/* Board Members */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <div className="mb-12 text-center">
            <div className="mb-4 flex justify-center">
              <Users className="h-12 w-12 text-primary" />
            </div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">{t('about.board.title')}</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              {language === 'es' 
                ? 'Conoce al equipo que hace posible BEST Las Palmas'
                : 'Meet the team that makes BEST Las Palmas possible'}
            </p>
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

      {/* History Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-6 text-3xl font-bold text-center">{language === 'es' ? 'Nuestra Historia' : 'Our History'}</h2>
            <div className="space-y-6 text-muted-foreground">
              <p>
                {language === 'es'
                  ? 'BEST Las Palmas forma parte de Board of European Students of Technology (BEST), una organización estudiantil internacional sin ánimo de lucro fundada en 1989 que conecta a estudiantes de tecnología de más de 90 universidades europeas.'
                  : 'BEST Las Palmas is part of Board of European Students of Technology (BEST), an international non-profit student organization founded in 1989 that connects technology students from over 90 European universities.'}
              </p>
              <p>
                {language === 'es'
                  ? 'Nuestro grupo local en la Universidad de Las Palmas de Gran Canaria trabaja para ofrecer a los estudiantes oportunidades únicas de desarrollo personal y profesional, complementando su formación académica con experiencias prácticas y conexiones internacionales.'
                  : 'Our local group at Universidad de Las Palmas de Gran Canaria works to offer students unique opportunities for personal and professional development, complementing their academic training with practical experiences and international connections.'}
              </p>
              <p>
                {language === 'es'
                  ? 'A través de cursos BEST, workshops técnicos, competencias de ingeniería y eventos de intercambio cultural, creamos un ambiente donde los estudiantes pueden crecer, aprender y conectar con profesionales y compañeros de toda Europa.'
                  : 'Through BEST courses, technical workshops, engineering competitions, and cultural exchange events, we create an environment where students can grow, learn, and connect with professionals and peers from across Europe.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
