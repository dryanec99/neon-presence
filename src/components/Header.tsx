import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { languages, type LanguageCode } from '@/i18n';
import { cn } from '@/lib/utils';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);

  const currentLang = i18n.language as LanguageCode;

  const navItems = [
    { key: 'home', path: '' },
    { key: 'services', path: 'services' },
    { key: 'portfolio', path: 'portfolio' },
    { key: 'blog', path: 'blog' },
    { key: 'contact', path: 'contact' },
  ];

  const handleLanguageChange = (langCode: LanguageCode) => {
    const currentPath = location.pathname.replace(/^\/(en|bg|ru|fr)/, '') || '/';
    i18n.changeLanguage(langCode);
    navigate(`/${langCode}${currentPath === '/' ? '' : currentPath}`);
    setIsLangOpen(false);
  };

  const getLocalizedPath = (path: string) => `/${currentLang}${path ? `/${path}` : ''}`;

  const isActive = (path: string) => {
    const localizedPath = getLocalizedPath(path);
    if (path === '') return location.pathname === localizedPath || location.pathname === `/${currentLang}`;
    return location.pathname.startsWith(localizedPath);
  };

  const currentLanguage = languages.find(l => l.code === currentLang);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to={getLocalizedPath('')} className="flex items-center gap-2 text-xl md:text-2xl font-bold tracking-tight">
            <span className="text-primary">MiForgiX</span>
            <span className="text-foreground/70 font-light text-lg">DEV</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={getLocalizedPath(item.path)}
                className={cn(
                  "relative text-sm font-medium transition-colors link-hover",
                  isActive(item.path) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <ThemeToggle />
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary"
              >
                {currentLanguage?.flag} {currentLanguage?.nativeName}
                <ChevronDown className={cn("w-4 h-4 transition-transform", isLangOpen && "rotate-180")} />
              </button>
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 top-full mt-2 py-2 bg-card border-2 border-border rounded-xl shadow-float min-w-[140px] z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={cn(
                          "w-full px-4 py-2 text-left text-sm transition-colors flex items-center gap-2",
                          lang.code === currentLang ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                        )}
                      >
                        <span>{lang.flag}</span> {lang.nativeName}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to={getLocalizedPath('quote')} className="btn-primary px-5 py-2.5 rounded-xl text-sm">
              {t('nav.planProject')}
            </Link>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden p-2 text-foreground" aria-label="Toggle menu">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  to={getLocalizedPath(item.path)}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    isActive(item.path) ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              ))}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="px-4 text-xs text-muted-foreground mb-2">{t('nav.language')}</p>
                <div className="flex gap-2 px-4">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { handleLanguageChange(lang.code); setIsMenuOpen(false); }}
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        lang.code === currentLang ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {lang.nativeName}
                    </button>
                  ))}
                </div>
              </div>
              <Link to={getLocalizedPath('quote')} onClick={() => setIsMenuOpen(false)} className="mt-4 btn-primary px-5 py-3 rounded-lg text-center text-sm">
                Plan Your Project
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
