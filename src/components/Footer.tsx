import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Instagram, Twitter, Mail, Phone } from 'lucide-react';
import { type LanguageCode } from '@/i18n';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;

  const getLocalizedPath = (path: string) => {
    return `/${currentLang}${path ? `/${path}` : ''}`;
  };

  const quickLinks = [
    { key: 'home', path: '' },
    { key: 'services', path: 'services' },
    { key: 'portfolio', path: 'portfolio' },
    { key: 'blog', path: 'blog' },
    { key: 'contact', path: 'contact' },
  ];

  const serviceLinks = [
    { key: 'webDesign', path: 'services' },
    { key: 'webDev', path: 'services' },
    { key: 'seoTechnical', path: 'services' },
    { key: 'ppc', path: 'services' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to={getLocalizedPath('')} className="inline-flex items-center gap-2 text-2xl font-bold mb-4">
              <span className="text-primary">Web</span>
              <span className="text-foreground">Builder</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={getLocalizedPath(link.path)}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">{t('footer.services')}</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    to={getLocalizedPath(link.path)}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {t(`services.items.${link.key}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">{t('footer.connect')}</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@webbuilder.bg"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@webbuilder.bg
                </a>
              </li>
              <li>
                <a
                  href="tel:+359888123456"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +359 888 123 456
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} WebBuilder. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
