import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Search, Megaphone, Code, Smartphone, ShoppingCart, Zap, Star, ChevronRight } from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';
import TextReveal from '@/components/motion/TextReveal';
import StaggerChildren from '@/components/motion/StaggerChildren';
import MagneticButton from '@/components/motion/MagneticButton';
import MouseGlowCard from '@/components/motion/MouseGlowCard';

const Home = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;

  const getLocalizedPath = (path: string) => {
    return `/${currentLang}${path ? `/${path}` : ''}`;
  };

  const serviceCategories = [
    { key: 'presence', icon: Globe },
    { key: 'seo', icon: Search },
    { key: 'marketing', icon: Megaphone },
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

  const clients = [
    'FemmeFlora', 'DailyMarket', 'SmilePro', 'Nexus Digital',
    'TechForge', 'AuraStudio', 'VeloShop', 'MindBridge',
  ];

  const testimonials = [
    {
      name: 'Elena Kostadinova',
      role: 'CEO, FemmeFlora',
      text: 'MiForgiX Dev delivered our e-commerce store in 3 days. The quality is exceptional — we went from zero to €50k/month in sales.',
      rating: 5,
    },
    {
      name: 'Ivan Petrov',
      role: 'Director, Nexus Digital',
      text: 'The team rebuilt our agency site and our leads tripled within 2 months. The animation quality rivals Vercel itself.',
      rating: 5,
    },
    {
      name: 'Maria Stefanova',
      role: 'Founder, SmilePro Clinic',
      text: 'Incredibly fast delivery. Our new site loads in under 1 second and Google loves it. Top-tier professionalism.',
      rating: 5,
    },
  ];

  const methodologySteps = [
    { num: '01', title: t('home.step01Title'), desc: t('home.step01Desc') },
    { num: '02', title: t('home.step02Title'), desc: t('home.step02Desc') },
    { num: '03', title: t('home.step03Title'), desc: t('home.step03Desc') },
  ];

  const technologies = ['React', 'Tailwind', 'Supabase', 'Resend', 'PostgreSQL'];

  return (
    <>
      <SEOHead 
        title="MiForgiX Dev - Powerful Web Solutions"
        description={t('hero.subtitle')}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border-2 border-accent/50 bg-accent/10 text-foreground text-sm font-semibold">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse inline-block" />
                  {t('hero.badge')} — {t('home.availableNow')}
                </div>
              </motion.div>

              <div className="mb-6">
                <TextReveal as="h1" className="font-black leading-[1.05] mb-2" delay={0.05}>
                  <span className="text-foreground">{t('home.heroTitle1')}</span>
                </TextReveal>
                <TextReveal as="h1" className="font-black leading-[1.05] mb-2" delay={0.12}>
                  <span className="text-primary">{t('home.heroTitle2')}</span>
                </TextReveal>
                <TextReveal as="h1" className="font-black leading-[1.05]" delay={0.19}>
                  <span className="text-highlight">{t('home.heroTitle3')}</span>
                </TextReveal>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180, delay: 0.3 }}
                className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 180, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <MagneticButton>
                  <Link
                    to={getLocalizedPath('quote')}
                    className="btn-primary px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-2 group"
                  >
                    {t('home.planProject')}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticButton>
                <Link
                  to={getLocalizedPath('portfolio')}
                  className="btn-outline px-8 py-4 rounded-xl text-base font-semibold flex items-center gap-2 group"
                >
                  {t('hero.ctaSecondary')}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Stats bento */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 160, delay: 0.3 + i * 0.08 }}
                  className="bento-item text-center"
                >
                  <div className="text-4xl font-black text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile stats */}
          <StaggerChildren className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 lg:hidden">
            {stats.map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{t(stat.labelKey)}</div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Client Marquee */}
      <section className="py-12 border-y-2 border-border overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...clients, ...clients].map((client, i) => (
            <span key={i} className="text-muted-foreground/60 text-sm font-semibold tracking-widest uppercase shrink-0 hover:text-primary transition-colors cursor-default">
              {client}
            </span>
          ))}
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <TextReveal as="h2" className="font-bold mb-4">{t('home.methodology')} <span className="text-primary">{t('home.methodologyHighlight')}</span></TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              {t('home.methodologySubtitle')}
            </motion.p>
          </div>

          <StaggerChildren className="grid md:grid-cols-3 gap-8">
            {methodologySteps.map((step) => (
              <div key={step.num} className="bento-item group relative">
                <div className="text-6xl font-black text-accent/30 group-hover:text-accent/50 transition-colors mb-4 leading-none">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* AI Delivery Banner */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-foreground text-sm font-medium mb-6 border-2 border-accent/30"
            >
              <Zap className="w-4 h-4 text-primary" />
              {t('aiDelivery.badge')}
            </motion.span>
            <TextReveal as="h2" className="font-bold mb-4">
              <span className="text-primary">{t('aiDelivery.title')}</span>
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
                  <div className="w-14 h-14 rounded-xl bg-accent/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <category.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {t(`services.categories.${category.key}.title`)}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {t(`services.categories.${category.key}.description`)}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-primary/70 text-sm font-medium group-hover:gap-2 transition-all">
                    {t('home.learnMore')} <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </MouseGlowCard>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Bento Services */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <StaggerChildren className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {featuredServices.map((service, index) => (
              <MouseGlowCard
                key={service.key}
                className={`rounded-2xl ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="bento-item group h-full">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
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

      {/* Testimonials */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <TextReveal as="h2" className="font-bold mb-4">{t('home.trustedBy')} <span className="text-primary">{t('home.trustedByHighlight')}</span></TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-muted-foreground max-w-xl mx-auto"
            >
              {t('home.trustedBySubtitle')}
            </motion.p>
          </div>
          <StaggerChildren className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <MouseGlowCard key={i} className="rounded-2xl">
                <div className="bento-item h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </MouseGlowCard>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Tech Marquee */}
      <section className="py-16 border-y-2 border-border overflow-hidden relative">
        <div className="container mx-auto px-4 mb-8 text-center">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{t('home.integratedTech')}</h3>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, i) => (
            <span key={i} className="text-foreground/70 text-2xl font-bold tracking-wider uppercase shrink-0 hover:text-primary transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
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
                  to={getLocalizedPath('quote')}
                  className="btn-primary px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 group"
                >
                  Plan Your Project
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
