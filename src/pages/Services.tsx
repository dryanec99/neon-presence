import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Globe, Code, Smartphone, ShoppingCart, 
  Search, BarChart3, MapPin,
  Megaphone, Users, Mail, Star,
  ArrowRight, Zap, ExternalLink
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

  const slugMap: Record<string, string> = {
    webDesign: 'web-design', ecommerce: 'ecommerce', mobileApps: 'mobile-apps',
    googleAds: 'google-ads', seoOptimization: 'seo', googleMyBusiness: 'google-my-business',
    socialNetworks: 'social-networks', onlineReputation: 'online-reputation', emailMarketing: 'email-marketing',
  };

  // All 9 services in one bento grid
  const allServices = [
    { key: 'webDesign', icon: Code, size: 'md:col-span-2', featured: true, gradient: 'from-primary/20 to-primary/5' },
    { key: 'ecommerce', icon: ShoppingCart, size: '', featured: false, gradient: 'from-emerald-500/20 to-emerald-500/5' },
    { key: 'mobileApps', icon: Smartphone, size: '', featured: false, gradient: 'from-blue-500/20 to-blue-500/5' },
    { key: 'googleAds', icon: BarChart3, size: '', featured: false, gradient: 'from-orange-500/20 to-orange-500/5' },
    { key: 'seoOptimization', icon: Search, size: 'md:col-span-2', featured: true, gradient: 'from-purple-500/20 to-purple-500/5' },
    { key: 'googleMyBusiness', icon: MapPin, size: '', featured: false, gradient: 'from-red-500/20 to-red-500/5' },
    { key: 'socialNetworks', icon: Users, size: '', featured: false, gradient: 'from-pink-500/20 to-pink-500/5' },
    { key: 'onlineReputation', icon: Star, size: '', featured: false, gradient: 'from-yellow-500/20 to-yellow-500/5' },
    { key: 'emailMarketing', icon: Mail, size: '', featured: false, gradient: 'from-cyan-500/20 to-cyan-500/5' },
  ];

  const processSteps = [
    { num: '01', title: 'Discovery', desc: 'We audit your current digital presence and define clear goals.' },
    { num: '02', title: 'Strategy', desc: 'We design a custom roadmap tailored to your market and audience.' },
    { num: '03', title: 'Execution', desc: 'Our AI-native workflow delivers production-grade output in record time.' },
    { num: '04', title: 'Growth', desc: 'We monitor, iterate and scale. Your success is our metric.' },
  ];

  return (
    <>
      <SEOHead 
        title={`Services - MiForgiX Dev`}
        description={t('services.subtitle')}
      />

      {/* Hero */}
      <section className="py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,hsl(152_100%_50%/0.07),transparent)]" />
          <div className="absolute inset-0 opacity-[0.025]" style={{
            backgroundImage: 'linear-gradient(hsl(0 0% 100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100%) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }} />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 180 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-mono mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block" />
              9 Specialized Services
            </motion.div>
            <TextReveal as="h1" className="font-black mb-6">
              {t('services.title')}
            </TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            >
              {t('services.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* AI Delivery Banner */}
      <section className="py-10 md:py-14 relative overflow-hidden border-y border-border">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-sm text-primary font-mono font-medium">{t('aiDelivery.badge')}</div>
                <div className="text-foreground font-bold text-lg">{t('aiDelivery.title')}</div>
              </div>
            </div>
            <MagneticButton>
              <Link
                to={getLocalizedPath('contact')}
                className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 group shrink-0"
              >
                Start Your Project
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* Asymmetric Bento Grid of All Services */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <TextReveal as="h2" className="font-bold mb-4">Everything You Need to Dominate Online</TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              From design to deployment to growth — we handle the full digital stack.
            </motion.p>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {allServices.map((service) => (
              <MouseGlowCard key={service.key} className={`rounded-2xl ${service.size}`}>
                <Link
                  to={getLocalizedPath(`services/${slugMap[service.key]}`)}
                  className="bento-item group cursor-pointer flex flex-col h-full min-h-[200px]"
                >
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    {service.featured && (
                      <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {t(`services.items.${service.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {t(`services.items.${service.key}.description`)}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-primary/70 text-sm font-medium group-hover:gap-3 transition-all">
                    View pricing & details
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </MouseGlowCard>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-card/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,hsl(152_100%_50%/0.04),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-14">
            <TextReveal as="h2" className="font-bold mb-4">How We Work</TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              A proven 4-step system that turns ideas into high-performing digital products.
            </motion.p>
          </div>

          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div key={step.num} className="bento-item group relative">
                <div className="text-6xl font-black text-primary/10 group-hover:text-primary/20 transition-colors mb-4 leading-none font-mono">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

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
