import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, ArrowUp, Mail } from 'lucide-react';
import { type LanguageCode } from '@/i18n';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;
  const getLocalizedPath = (path: string) => `/${currentLang}${path ? `/${path}` : ''}`;

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const capabilities = [
    { key: 'webDesign', path: 'services' },
    { key: 'ecommerce', path: 'services' },
    { key: 'seoOptimization', path: 'services' },
    { key: 'socialNetworks', path: 'services' },
  ];

  const studioLinks = [
    { labelKey: 'footer.studio.portfolio', path: 'portfolio' },
    { labelKey: 'footer.studio.framework', path: '' },
    { labelKey: 'footer.studio.initiate', path: 'quote' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: XIcon, href: '#', label: 'X' },
    { icon: Github, href: '#', label: 'GitHub' },
  ];

  return (
    <>
      <footer className="bg-card/50 backdrop-blur-xl border-t-2 border-border">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Column 1: Brand */}
            <div className="lg:col-span-1">
              <Link to={getLocalizedPath('')} className="inline-flex items-center gap-2 text-2xl font-bold mb-4 tracking-tight">
                <span className="text-primary">MiForgiX</span>
                <span className="text-foreground/70 font-light text-lg">DEV</span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('footer.tagline')}
              </p>
            </div>

            {/* Column 2: Capabilities */}
            <div>
              <h4 className="text-foreground font-semibold mb-6 text-sm uppercase tracking-widest">{t('footer.capabilities')}</h4>
              <ul className="space-y-3">
                {capabilities.map((link) => (
                  <li key={link.key}>
                    <Link to={getLocalizedPath(link.path)} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                      {t(`services.items.${link.key}.title`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Studio */}
            <div>
              <h4 className="text-foreground font-semibold mb-6 text-sm uppercase tracking-widest">{t('footer.studioTitle')}</h4>
              <ul className="space-y-3">
                {studioLinks.map((link) => (
                  <li key={link.labelKey}>
                    <Link to={getLocalizedPath(link.path)} className="text-muted-foreground hover:text-primary text-sm transition-colors">
                      {t(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="text-foreground font-semibold mb-6 text-sm uppercase tracking-widest">{t('footer.connect')}</h4>
              <ul className="space-y-3 mb-6">
                <li>
                  <a href="mailto:homer_bart@abv.bg" className="flex items-center gap-2 text-muted-foreground hover:text-primary text-sm transition-colors">
                    <Mail className="w-4 h-4" /> homer_bart@abv.bg
                  </a>
                </li>
              </ul>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 border border-transparent hover:border-primary/20"
                  >
                    {typeof social.icon === 'function' && social.icon.toString().includes('svg') ? (
                      <social.icon />
                    ) : (
                      <social.icon className="w-5 h-5" />
                    )}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">© {new Date().getFullYear()} MiForgiX Dev. {t('footer.rights')}</p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <button onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors cursor-pointer">{t('footer.privacy')}</button>
              <button onClick={(e) => e.preventDefault()} className="hover:text-primary transition-colors cursor-pointer">{t('footer.terms')}</button>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;
