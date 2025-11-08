import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/hooks/useLanguage';
import { Mail, MapPin, Phone } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import socialLinks from '@/settings/social-links.json';

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Contact = () => {
  const { t } = useLanguage();
  const phoneNumber = "+34 123 456 789"; // Configurable

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
          <div className="grid grid-cols-1 gap-8 max-w-2xl mx-auto">
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
                          href="mailto:laspalmas@best-eu.org"
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          laspalmas@best-eu.org
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                        <Phone className="h-6 w-6 text-secondary-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{t('contact.info.phone')}</h3>
                        <a
                          href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                          className="text-muted-foreground transition-colors hover:text-primary"
                        >
                          {phoneNumber}
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
                      const Icon = social.icon === 'TikTok' ? TikTokIcon : (LucideIcons as any)[social.icon];
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