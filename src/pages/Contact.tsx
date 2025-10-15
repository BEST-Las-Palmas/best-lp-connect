import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, MapPin } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import socialLinks from '@/settings/social-links.json';

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
      description: t('contact.form.description'),
    });
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
                          {t('contact.info.country')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="border-none bg-gradient-card shadow-lg">
                <CardContent className="p-8">
                  <h2 className="mb-6 text-2xl font-bold">{t('contact.social')}</h2>
                  <div className="flex gap-4">
                    {socialLinks.map((social) => {
                      const Icon = (LucideIcons as any)[social.icon];
                      return (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex h-14 w-14 items-center justify-center rounded-lg bg-secondary text-foreground transition-all hover:scale-110`}
                          aria-label={social.label}
                        >
                          {Icon && <Icon className="h-6 w-6" />}
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Map Card */}
              <Card
                className="border-none shadow-lg overflow-hidden cursor-pointer"
                onClick={() =>
                  window.open(
                    'https://www.google.com/maps?q=Escuela+de+Ingenier%C3%ADa+de+Telecomunicaci%C3%B3n+y+Electr%C3%B3nica+(EITE)+ULPGC&ll=28.073465,-15.452362&z=17',
                    '_blank'
                  )
                }
              >
                <div className="aspect-video">
                  <iframe
                    title="Mapa EITE ULPGC"
                    src="https://www.google.com/maps?q=Escuela+de+Ingenier%C3%ADa+de+Telecomunicaci%C3%B3n+y+Electr%C3%B3nica+(EITE)+ULPGC&ll=28.073465,-15.452362&z=17&output=embed"
                    width="100%"
                    height="100%"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                  ></iframe>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;