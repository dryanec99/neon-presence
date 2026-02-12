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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('services.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('services.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* AI Delivery Banner */}
      <section className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              {t('aiDelivery.badge')}
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">
              <span className="text-gradient">{t('aiDelivery.title')}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('aiDelivery.subtitle')}
            </p>
          </motion.div>
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
              transition={{ duration: 0.6 }}
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.services.map((service, index) => {
                const slugMap: Record<string, string> = {
                  webDesign: 'web-design', ecommerce: 'ecommerce', mobileApps: 'mobile-apps',
                  googleAds: 'google-ads', seoOptimization: 'seo', googleMyBusiness: 'google-my-business',
                  socialNetworks: 'social-networks', onlineReputation: 'online-reputation', emailMarketing: 'email-marketing',
                };
                return (
                  <motion.div
                    key={service.key}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
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
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-lg text-muted-foreground mb-10">{t('cta.subtitle')}</p>
            <Link
              to={getLocalizedPath('contact')}
              className="btn-primary px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 group"
            >
              {t('cta.button')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Services;
