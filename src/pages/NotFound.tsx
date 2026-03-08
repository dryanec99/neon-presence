import { useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { type LanguageCode } from '@/i18n';

const NotFound = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language || 'en') as LanguageCode;

  useEffect(() => {
    console.error('404 Error: User attempted to access non-existent route:', location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 180 }}
        className="text-center max-w-lg"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.1 }}
          className="text-[10rem] md:text-[12rem] font-black leading-none text-primary/15 select-none"
        >
          404
        </motion.div>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4 -mt-8">
          {t('notFound.title')}
        </h1>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          {t('notFound.description')}
        </p>
        <Link
          to={`/${currentLang}`}
          className="btn-primary px-8 py-4 rounded-xl text-sm font-semibold inline-flex items-center gap-2 group"
        >
          {t('notFound.button')}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
