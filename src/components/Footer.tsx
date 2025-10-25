import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';
import socialLinks from '@/settings/social-links.json';

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
                  const Icon = (LucideIcons as any)[social.icon];
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
            © {new Date().getFullYear()} BEST Las Palmas. {t('footer.rights')}. Credits: <a href="https://www.linkedin.com/in/javier-rico-rodríguez-b8a40a34b/" target="_blank" rel="noopener noreferrer">Javier Rico</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;