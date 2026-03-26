import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  Code, Smartphone, ShoppingCart, 
  Search, BarChart3, MapPin,
  Users, Star, Mail,
  ArrowRight, Zap, ExternalLink, Check
} from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';
import TextReveal from '@/components/motion/TextReveal';
import MagneticButton from '@/components/motion/MagneticButton';

const TABS = ['web', 'mobile'] as const;
type Tab = typeof TABS[number];

const Services = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;
  const [activeTab, setActiveTab] = useState<Tab>('web');

  const getLocalizedPath = (path: string) => `/${currentLang}${path ? `/${path}` : ''}`;

  const slugMap: Record<string, string> = {
    webDesign: 'web-design', ecommerce: 'ecommerce', mobileApps: 'mobile-apps',
    googleAds: 'google-ads', seoOptimization: 'seo', googleMyBusiness: 'google-my-business',
    socialNetworks: 'social-networks', onlineReputation: 'online-reputation', emailMarketing: 'email-marketing',
  };

  const iconMap: Record<string, React.ElementType> = {
    webDesign: Code, ecommerce: ShoppingCart, mobileApps: Smartphone,
    googleAds: BarChart3, seoOptimization: Search, googleMyBusiness: MapPin,
    socialNetworks: Users, onlineReputation: Star, emailMarketing: Mail,
  };

  const webServices = ['webDesign', 'ecommerce', 'seoOptimization', 'googleAds', 'googleMyBusiness', 'emailMarketing'];
  const mobileServices = ['mobileApps', 'socialNetworks', 'onlineReputation'];

  const specs: Record<string, string[]> = {
    webDesign: ['services.specs.webDesign.0', 'services.specs.webDesign.1', 'services.specs.webDesign.2'],
    ecommerce: ['services.specs.ecommerce.0', 'services.specs.ecommerce.1', 'services.specs.ecommerce.2'],
    mobileApps: ['services.specs.mobileApps.0', 'services.specs.mobileApps.1', 'services.specs.mobileApps.2'],
    googleAds: ['services.specs.googleAds.0', 'services.specs.googleAds.1', 'services.specs.googleAds.2'],
    seoOptimization: ['services.specs.seoOptimization.0', 'services.specs.seoOptimization.1', 'services.specs.seoOptimization.2'],
    googleMyBusiness: ['services.specs.googleMyBusiness.0', 'services.specs.googleMyBusiness.1', 'services.specs.googleMyBusiness.2'],
    socialNetworks: ['services.specs.socialNetworks.0', 'services.specs.socialNetworks.1', 'services.specs.socialNetworks.2'],
    onlineReputation: ['services.specs.onlineReputation.0', 'services.specs.onlineReputation.1', 'services.specs.onlineReputation.2'],
    emailMarketing: ['services.specs.emailMarketing.0', 'services.specs.emailMarketing.1', 'services.specs.emailMarketing.2'],
  };

  const activeServices = activeTab === 'web' ? webServices : mobileServices;

  const processSteps = [
    { num: '01', title: t('home.step01Title'), desc: t('home.step01Desc') },
    { num: '02', title: t('home.step02Title'), desc: t('home.step02Desc') },
    { num: '03', title: t('home.step03Title'), desc: t('home.step03Desc') },
    { num: '04', title: t('services.processStep04Title'), desc: t('services.processStep04Desc') },
  ];

  return (
    <>
      <SEOHead title="Services - MiForgiX Dev" description={t('services.subtitle')} />

      {/* Hero — dark blueprint */}
      <section className="py-24 md:py-36 relative overflow-hidden bg-[hsl(240,10%,4%)]">
        {/* Blueprint grid */}
        <div className="absolute inset-0 opacity-[0.07]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '15px 15px'
        }} />
        {/* Corner glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/4 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono font-medium mb-8 tracking-wider uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
              {t('services.systemStatus')}
            </motion.div>
            <TextReveal as="h1" className="font-black mb-6 text-white">
              {t('services.title')}
            </TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light"
            >
              {t('services.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Segmented Control + Tech Cards */}
      <section className="py-20 md:py-32 bg-[hsl(240,10%,4%)] relative">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="container mx-auto px-4 relative z-10">
          {/* Section heading */}
          <div className="text-center mb-10">
            <TextReveal as="h2" className="font-bold mb-4 text-white">
              {t('services.bentoTitle')} <span className="text-primary">{t('services.bentoHighlight')}</span>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 max-w-xl mx-auto"
            >
              {t('services.bentoSubtitle')}
            </motion.p>
          </div>

          {/* Segmented Control */}
          <div className="flex justify-center mb-14">
            <div className="relative inline-flex rounded-xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-sm">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative z-10 px-8 py-3 rounded-lg text-sm font-semibold tracking-wide transition-colors duration-200 ${
                    activeTab === tab ? 'text-white' : 'text-white/40 hover:text-white/60'
                  }`}
                >
                  {t(`services.tabs.${tab}`)}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 rounded-lg bg-primary/20 border border-primary/40"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Cards Grid */}
          <LayoutGroup>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
              >
                {activeServices.map((key, index) => {
                  const Icon = iconMap[key];
                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <Link
                        to={getLocalizedPath(`services/${slugMap[key]}`)}
                        className="group block h-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 hover:border-primary/40 hover:bg-primary/[0.03] transition-all duration-400 relative overflow-hidden"
                      >
                        {/* Hover glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/0 group-hover:bg-primary/10 rounded-full blur-[60px] transition-all duration-500 -translate-y-1/2 translate-x-1/2" />

                        <div className="flex items-center gap-3 mb-5">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <h3 className="font-mono font-bold text-white tracking-tight text-base">
                            {t(`services.items.${key}.title`)}
                          </h3>
                        </div>

                        <p className="text-white/40 text-sm leading-relaxed mb-5">
                          {t(`services.items.${key}.description`)}
                        </p>

                        {/* Technical Specs */}
                        <div className="border-t border-white/[0.06] pt-4 space-y-2.5">
                          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/60">
                            {t('services.techSpecs')}
                          </span>
                          {specs[key]?.map((specKey, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
                              <span className="text-xs font-mono text-white/50">{t(specKey)}</span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-5 flex items-center gap-1.5 text-primary/60 text-xs font-mono group-hover:text-primary group-hover:gap-3 transition-all">
                          {t('services.viewPricing')}
                          <ExternalLink className="w-3 h-3" />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </LayoutGroup>
        </div>
      </section>

      {/* Rapid Delivery Banner */}
      <section className="py-10 md:py-14 relative overflow-hidden bg-[hsl(240,10%,6%)] border-y border-white/[0.06]">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-xs font-mono text-primary uppercase tracking-wider">{t('aiDelivery.badge')}</div>
                <div className="text-white font-bold text-lg">{t('aiDelivery.title')}</div>
              </div>
            </div>
            <MagneticButton>
              <Link
                to={getLocalizedPath('quote')}
                className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 group shrink-0"
              >
                {t('nav.planProject')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-[hsl(240,10%,4%)]">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: 'linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <TextReveal as="h2" className="font-bold mb-4 text-white">
              {t('services.processTitle')} <span className="text-primary">{t('services.processHighlight')}</span>
            </TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-white/40 max-w-xl mx-auto"
            >
              {t('services.processSubtitle')}
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 group hover:border-primary/30 transition-all"
              >
                <div className="text-5xl font-black font-mono text-primary/10 group-hover:text-primary/20 transition-colors mb-4 leading-none">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold font-mono text-white mb-2">{step.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden bg-[hsl(240,10%,4%)]">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="h2" className="font-bold mb-6 text-white">{t('cta.title')}</TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-lg text-white/40 mb-10"
            >
              {t('cta.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', damping: 25, stiffness: 180, delay: 0.2 }}
            >
              <MagneticButton>
                <Link
                  to={getLocalizedPath('quote')}
                  className="btn-primary px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 group"
                >
                  {t('nav.planProject')}
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
