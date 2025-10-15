import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

const Contact = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t('contact.form.success'),
      description: language === 'es' 
        ? 'Nos pondremos en contacto contigo pronto.' 
        : 'We will get in touch with you soon.',
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook', color: 'hover:text-[#1877F2]' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'hover:text-[#E4405F]' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-[#0A66C2]' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container-custom text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary-foreground md:text-5xl animate-fade-in">
            {t('contact.title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90 animate-slide-up">
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <Card className="border-none shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">{t('contact.form.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">{t('contact.form.email')}</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message">{t('contact.form.message')}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="mt-2"
                    />
                  </div>
                  <Button type="submit" className="w-full" size="lg">
                    {t('contact.form.send')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-none bg-gradient-card shadow-lg">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-2xl font-bold">{t('contact.info.title')}</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                        <Mail className="h-6 w-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{t('contact.info.email')}</h3>
                        <a
                          href="mailto:laspalmas@best.eu.org"
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          laspalmas@best.eu.org
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent">
                        <MapPin className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{t('contact.info.location')}</h3>
                        <p className="text-muted-foreground">
                          {t('contact.info.location.text')}
                          <br />
                          35017 Las Palmas de Gran Canaria
                          <br />
                          {language === 'es' ? 'España' : 'Spain'}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none bg-gradient-card shadow-lg">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-2xl font-bold">{t('contact.social')}</h2>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-14 w-14 items-center justify-center rounded-lg bg-secondary text-foreground transition-all hover:scale-110 ${social.color}`}
                        aria-label={social.label}
                      >
                        <social.icon className="h-6 w-6" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg overflow-hidden">
                <div className="aspect-video bg-secondary flex items-center justify-center">
                  <MapPin className="h-16 w-16 text-muted-foreground" />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-secondary/50">
        <div className="container-custom">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            {language === 'es' ? 'Preguntas Frecuentes' : 'Frequently Asked Questions'}
          </h2>
          <div className="mx-auto max-w-3xl space-y-6">
            {[
              {
                question: language === 'es' ? '¿Cómo puedo unirme a BEST?' : 'How can I join BEST?',
                answer: language === 'es'
                  ? 'Cualquier estudiante de ingeniería o tecnología de la ULPGC puede unirse a BEST. Contáctanos para más información sobre el proceso de inscripción.'
                  : 'Any engineering or technology student from ULPGC can join BEST. Contact us for more information about the registration process.',
              },
              {
                question: language === 'es' ? '¿Qué tipo de eventos organizan?' : 'What type of events do you organize?',
                answer: language === 'es'
                  ? 'Organizamos cursos BEST, workshops técnicos, competencias de ingeniería, eventos de networking y actividades de intercambio cultural.'
                  : 'We organize BEST courses, technical workshops, engineering competitions, networking events, and cultural exchange activities.',
              },
              {
                question: language === 'es' ? '¿Los eventos tienen costo?' : 'Do events have a cost?',
                answer: language === 'es'
                  ? 'Algunos eventos son gratuitos, mientras que otros tienen un costo simbólico para cubrir materiales y logística. Los miembros de BEST suelen tener descuentos.'
                  : 'Some events are free, while others have a symbolic cost to cover materials and logistics. BEST members usually get discounts.',
              },
            ].map((faq, index) => (
              <Card key={index} className="border-none bg-card shadow-md">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-bold">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
