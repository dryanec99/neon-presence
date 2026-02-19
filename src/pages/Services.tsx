import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, Code, Smartphone, ShoppingCart, 
  Search, BarChart3, MapPin,
  Megaphone, Users, Mail, Star,
  ArrowRight, Zap
} from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';
import TextReveal from '@/components/motion/TextReveal';
import StaggerChildren from '@/components/motion/StaggerChildren';
import MouseGlowCard from '@/components/motion/MouseGlowCard';
import MagneticButton from '@/components/motion/MagneticButton';

const Services = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;

  const getLocalizedPath = (path: string) => {
    return `/${currentLang}${path ? `/${path}` : ''}`;
  };

  const serviceGroups = [
    {
      key: 'presence',
      icon: Globe,
      color: 'primary',
      services: [
        { key: 'webDesign', icon: Code },
        { key: 'ecommerce', icon: ShoppingCart },
        { key: 'mobileApps', icon: Smartphone },
      ],
    },
    {
      key: 'seo',
      icon: Search,
      color: 'blue-500',
      services: [
        { key: 'googleAds', icon: BarChart3 },
        { key: 'seoOptimization', icon: Search },
        { key: 'googleMyBusiness', icon: MapPin },
      ],
    },
    {
      key: 'marketing',
      icon: Megaphone,
      color: 'purple-500',
      services: [
        { key: 'socialNetworks', icon: Users },
        { key: 'onlineReputation', icon: Star },
        { key: 'emailMarketing', icon: Mail },
      ],
    },
  ];

  return (
    <>
      <SEOHead 
        title={`${t('nav.services')} - WebBuilder`}
        description={t('services.subtitle')}
      />

      {/* Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="h1" className="font-bold mb-6">
              {t('services.title')}
            </TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground"
            >
              {t('services.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* AI Delivery Banner */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
            >
              <Zap className="w-4 h-4" />
              {t('aiDelivery.badge')}
            </motion.span>
            <TextReveal as="h2" className="font-bold mb-3">
              <span className="text-gradient">{t('aiDelivery.title')}</span>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              {t('aiDelivery.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Service Groups */}
      {serviceGroups.map((group, groupIndex) => (
        <section 
          key={group.key} 
          className={`py-16 md:py-24 ${groupIndex % 2 === 1 ? 'bg-card/50' : ''}`}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="flex items-center gap-4 mb-12"
            >
              <div className={`w-14 h-14 rounded-xl bg-${group.color}/10 flex items-center justify-center`}>
                <group.icon className={`w-7 h-7 text-${group.color === 'primary' ? 'primary' : group.color}`} />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">
                  {t(`services.categories.${group.key}.title`)}
                </h2>
                <p className="text-muted-foreground">
                  {t(`services.categories.${group.key}.description`)}
                </p>
              </div>
            </motion.div>

            <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.services.map((service) => {
                const slugMap: Record<string, string> = {
                  webDesign: 'web-design', ecommerce: 'ecommerce', mobileApps: 'mobile-apps',
                  googleAds: 'google-ads', seoOptimization: 'seo', googleMyBusiness: 'google-my-business',
                  socialNetworks: 'social-networks', onlineReputation: 'online-reputation', emailMarketing: 'email-marketing',
                };
                return (
                  <MouseGlowCard key={service.key} className="rounded-2xl">
                    <Link
                      to={getLocalizedPath(`services/${slugMap[service.key]}`)}
                      className="bento-item group cursor-pointer block h-full"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {t(`services.items.${service.key}.title`)}
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        {t(`services.items.${service.key}.description`)}
                      </p>
                    </Link>
                  </MouseGlowCard>
                );
              })}
            </StaggerChildren>
          </div>
        </section>
      ))}

      {/* CTA */}
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

export default Services;
