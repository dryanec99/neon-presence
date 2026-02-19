import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Search, Megaphone, Code, Smartphone, ShoppingCart, Zap } from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';
import TextReveal from '@/components/motion/TextReveal';
import StaggerChildren from '@/components/motion/StaggerChildren';
import MagneticButton from '@/components/motion/MagneticButton';
import MouseGlowCard from '@/components/motion/MouseGlowCard';
import RippleButton from '@/components/motion/RippleButton';

const Home = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;

  const getLocalizedPath = (path: string) => {
    return `/${currentLang}${path ? `/${path}` : ''}`;
  };

  const serviceCategories = [
    { key: 'presence', icon: Globe, gradient: 'from-primary/20 to-primary/5' },
    { key: 'seo', icon: Search, gradient: 'from-blue-500/20 to-blue-500/5' },
    { key: 'marketing', icon: Megaphone, gradient: 'from-purple-500/20 to-purple-500/5' },
  ];

  const featuredServices = [
    { key: 'webDesign', icon: Code },
    { key: 'mobileApps', icon: Smartphone },
    { key: 'ecommerce', icon: ShoppingCart },
  ];

  const stats = [
    { value: '150+', labelKey: 'stats.projects' },
    { value: '98%', labelKey: 'stats.satisfaction' },
    { value: '10+', labelKey: 'stats.experience' },
    { value: '24/7', labelKey: 'stats.support' },
  ];

  return (
    <>
      <SEOHead 
        title={`MiForgiX Dev - ${t('hero.badge')}`}
        description={t('hero.subtitle')}
      />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
            >
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                {t('hero.badge')}
              </span>
            </motion.div>

            <TextReveal as="h1" className="font-bold leading-tight mb-6" delay={0.1}>
              <span className="text-foreground">{t('hero.title').split(' ').slice(0, -2).join(' ')} </span>
              <span className="text-gradient">{t('hero.title').split(' ').slice(-2).join(' ')}</span>
            </TextReveal>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180, delay: 0.25 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180, delay: 0.35 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <MagneticButton>
                <Link
                  to={getLocalizedPath('contact')}
                  className="btn-primary px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-2 group"
                >
                  {t('hero.cta')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <Link
                to={getLocalizedPath('portfolio')}
                className="btn-outline px-8 py-4 rounded-xl text-base font-semibold"
              >
                {t('hero.ctaSecondary')}
              </Link>
            </motion.div>
          </div>

          {/* Stats */}
          <StaggerChildren className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* AI Delivery Banner */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4" />
              {t('aiDelivery.badge')}
            </motion.span>
            <TextReveal as="h2" className="font-bold mb-4">
              <span className="text-gradient">{t('aiDelivery.title')}</span>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {t('aiDelivery.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <TextReveal as="h2" className="font-bold mb-4">{t('services.title')}</TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {t('services.subtitle')}
            </motion.p>
          </div>

          <StaggerChildren className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {serviceCategories.map((category) => (
              <MouseGlowCard key={category.key} className="rounded-2xl">
                <Link
                  to={getLocalizedPath('services')}
                  className="bento-item block h-full group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {t(`services.categories.${category.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(`services.categories.${category.key}.description`)}
                  </p>
                </Link>
              </MouseGlowCard>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Bento Grid Services */}
      <section className="py-20 md:py-32 bg-card/50">
        <div className="container mx-auto px-4">
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {featuredServices.map((service, index) => (
              <MouseGlowCard
                key={service.key}
                className={`rounded-2xl ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="bento-item group h-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {t(`services.items.${service.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t(`services.items.${service.key}.description`)}
                  </p>
                </div>
              </MouseGlowCard>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="h2" className="font-bold mb-6">{t('cta.title')}</TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-lg text-muted-foreground mb-10"
            >
              {t('cta.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 25, stiffness: 180, delay: 0.25 }}
            >
              <MagneticButton>
                <Link
                  to={getLocalizedPath('contact')}
                  className="btn-primary px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 group"
                >
                  {t('cta.button')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
