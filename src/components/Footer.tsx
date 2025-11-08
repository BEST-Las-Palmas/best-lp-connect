import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import socialLinks from '@/settings/social-links.json';

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const Footer = () => {
  const { t } = useLanguage();

  const navigation = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.events'), href: '/events' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  return (
    <footer className="border-t bg-card">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">{t('footer.quick')}</h3>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Spacer */}
          <div>
            <div className="mb-4 flex items-center space-x-2">
            </div>
          </div>

          {/* Contact Info */}
          <div className="md:text-right md:flex md:flex-col md:items-end">
            <h3 className="mb-4 text-sm font-semibold">{t('contact.info.title')}</h3>
            <div className="space-y-3 w-full md:w-auto">
              <div className="flex items-center justify-start md:justify-end gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href="mailto:laspalmas@best-eu.org" className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  laspalmas@best-eu.org
                </a>
              </div>
              <div className="flex items-center justify-start md:justify-end gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {t('contact.info.location.text')}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 w-full md:w-auto">
              <h4 className="mb-3 text-sm font-semibold">{t('footer.social')}</h4>
              <div className="flex justify-start md:justify-end gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon === 'TikTok' ? TikTokIcon : (LucideIcons as any)[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                      aria-label={social.label}
                    >
                      {Icon ? <Icon className="h-4 w-4" /> : null}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {/* 🚫 No eliminar este crédito. Es parte del acuerdo de autoría del sitio. */}
            © {new Date().getFullYear()} BEST Las Palmas. {t('footer.rights')} Credits: <a href="https://www.linkedin.com/in/javier-rico-rodríguez-b8a40a34b/" target="_blank" rel="noopener noreferrer">Javier Rico</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;