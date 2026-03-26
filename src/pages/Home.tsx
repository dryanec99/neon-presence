import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Search, Megaphone, Code, Smartphone, ShoppingCart, Zap, Star, ChevronRight, Clock, BadgeDollarSign, Headphones } from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';
import TextReveal from '@/components/motion/TextReveal';
import StaggerChildren from '@/components/motion/StaggerChildren';
import MagneticButton from '@/components/motion/MagneticButton';
import MouseGlowCard from '@/components/motion/MouseGlowCard';
import ParallaxLayer from '@/components/motion/ParallaxLayer';
import AnimatedCounter from '@/components/motion/AnimatedCounter';
import SectionDivider from '@/components/SectionDivider';
import ParticleField from '@/components/motion/ParticleField';

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

  const reasons = [
    { icon: Clock, titleKey: 'home.reason1Title', descKey: 'home.reason1Desc' },
    { icon: BadgeDollarSign, titleKey: 'home.reason2Title', descKey: 'home.reason2Desc' },
    { icon: Headphones, titleKey: 'home.reason3Title', descKey: 'home.reason3Desc' },
  ];

  const testimonials = [
    { name: 'Elena Kostadinova', role: 'CEO, FemmeFlora', textKey: 'home.testimonial1', rating: 5 },
    { name: 'Ivan Petrov', role: 'Director, Nexus Digital', textKey: 'home.testimonial2', rating: 5 },
    { name: 'Maria Stefanova', role: 'Founder, SmilePro Clinic', textKey: 'home.testimonial3', rating: 5 },
  ];

  const methodologySteps = [
    { num: '01', title: t('home.step01Title'), desc: t('home.step01Desc') },
    { num: '02', title: t('home.step02Title'), desc: t('home.step02Desc') },
    { num: '03', title: t('home.step03Title'), desc: t('home.step03Desc') },
  ];

  const technologies = ['React', 'Tailwind', 'Supabase', 'Resend', 'PostgreSQL'];

  return (
    <>
      <SEOHead title="MiForgiX Dev - Powerful Web Solutions" description={t('hero.subtitle')} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[hsl(240,10%,3%)]">
        <ParticleField />
        {/* Animated mesh gradient — bottom-right corner */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full opacity-30 blur-[160px] animate-pulse-slow"
            style={{ background: 'radial-gradient(circle, hsl(262 80% 50% / 0.6), hsl(230 60% 30% / 0.3), transparent 70%)' }} />
          <div className="absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px] animate-pulse-slow"
            style={{ background: 'radial-gradient(circle, hsl(230 70% 40% / 0.4), transparent 70%)', animationDelay: '2s' }} />
          {/* Fine grid overlay */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: 'linear-gradient(hsl(0 0% 100% / 0.1) 1px, transparent 1px), linear-gradient(90deg, hsl(0 0% 100% / 0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left — Copy */}
            <div>
              <div className="mb-8">
                <TextReveal as="h1" className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-[-0.03em] text-white mb-3" delay={0.05}>
                  {t('home.heroLine1')}
                </TextReveal>
                <TextReveal as="h1" className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.08] tracking-[-0.03em] text-primary" delay={0.15}>
                  {t('home.heroLine2')}
                </TextReveal>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
                className="text-base md:text-lg text-[hsl(220,10%,60%)] max-w-lg mb-10 leading-relaxed tracking-[-0.01em]"
              >
                {t('hero.subtitle')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <MagneticButton>
                  <Link
                    to={getLocalizedPath('quote')}
                    className="relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm tracking-wide group overflow-hidden transition-all hover:shadow-[0_0_30px_hsl(262_100%_68%/0.4)]"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {t('home.startProject')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </MagneticButton>
                <Link
                  to={getLocalizedPath('services')}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-[hsl(0,0%,20%)] text-[hsl(0,0%,75%)] font-semibold text-sm tracking-wide hover:border-primary/40 hover:text-primary transition-all group"
                >
                  {t('home.viewMethodology')}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="mt-10 flex items-center gap-3">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-primary/80 text-primary/80" />))}
                </div>
                <span className="text-xs text-[hsl(220,10%,50%)] font-medium tracking-wide">{t('home.trustBadge')}</span>
              </motion.div>
            </div>

            {/* Right — Project Showcase */}
            <div className="hidden lg:block">
              <ParallaxLayer offset={20}>
                <BrowserMockup className="max-w-lg ml-auto" />
              </ParallaxLayer>
            </div>
          </div>

          {/* Stats row — mobile */}
          <StaggerChildren className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 lg:hidden">
            {stats.map((stat) => (
              <div key={stat.labelKey} className="text-center">
                <AnimatedCounter value={stat.value} className="text-3xl font-black text-primary mb-1" />
                <div className="text-xs text-[hsl(220,10%,50%)]">{t(stat.labelKey)}</div>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <SectionDivider variant="wave" />

      {/* Why Choose Us */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <TextReveal as="h2" className="font-bold mb-4">{t('home.whyChooseUs')}</TextReveal>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-muted-foreground max-w-xl mx-auto">
              {t('home.whyChooseUsSubtitle')}
            </motion.p>
          </div>

          <StaggerChildren className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {reasons.map((reason) => (
              <MouseGlowCard key={reason.titleKey} className="rounded-2xl">
                <div className="bento-item h-full text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 border-2 border-primary/20">
                    <reason.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-foreground">{t(reason.titleKey)}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{t(reason.descKey)}</p>
                </div>
              </MouseGlowCard>
            ))}
          </StaggerChildren>

          <div className="hidden lg:grid grid-cols-4 gap-6 mt-12">
            {stats.map((stat, i) => (
              <motion.div key={stat.labelKey} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <AnimatedCounter value={stat.value} className="text-4xl font-black text-primary mb-1 block" />
                <div className="text-sm text-muted-foreground">{t(stat.labelKey)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" flip />

      {/* Methodology — Velocity & Precision */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <ParallaxLayer offset={20}>
              <TextReveal as="h2" className="font-black mb-4 text-4xl md:text-5xl">
                {t('home.methodology')} <span className="text-primary">{t('home.methodologyHighlight')}</span>
              </TextReveal>
            </ParallaxLayer>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-muted-foreground max-w-2xl mx-auto text-lg">
              {t('home.methodologySubtitle')}
            </motion.p>
          </div>

          <StaggerChildren className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {methodologySteps.map((step, i) => (
              <MouseGlowCard key={step.num} className="rounded-2xl">
                <div className="bento-item group flex flex-col h-full min-h-[280px] relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-[80px] font-black leading-none text-primary/[0.07] group-hover:text-primary/15 transition-colors select-none">
                    {step.num}
                  </div>
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all">
                    <span className="text-highlight font-black text-xl">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                    {step.desc}
                  </p>
                  <div className="mt-6 h-1 w-12 rounded-full bg-primary/20 group-hover:w-full group-hover:bg-primary/40 transition-all duration-500" />
                </div>
              </MouseGlowCard>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <SectionDivider variant="wave" />

      {/* AI Delivery Banner */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.span initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-foreground text-sm font-medium mb-6 border-2 border-accent/30">
              <Zap className="w-4 h-4 text-primary" />
              {t('aiDelivery.badge')}
            </motion.span>
            <TextReveal as="h2" className="font-bold mb-4">
              <span className="text-primary">{t('aiDelivery.title')}</span>
            </TextReveal>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('aiDelivery.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      <SectionDivider variant="curve" flip />

      {/* Service Categories */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <TextReveal as="h2" className="font-bold mb-4">{t('services.title')}</TextReveal>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </motion.p>
          </div>

          <StaggerChildren className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {serviceCategories.map((category) => (
              <MouseGlowCard key={category.key} className="rounded-2xl">
                <Link to={getLocalizedPath('services')} className="bento-item block h-full group">
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
              <MouseGlowCard key={service.key} className={`rounded-2xl ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}>
                <div className="bento-item group h-full">
                  <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center mb-4 group-hover:bg-accent/30 transition-colors">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{t(`services.items.${service.key}.title`)}</h3>
                  <p className="text-muted-foreground text-sm">{t(`services.items.${service.key}.description`)}</p>
                </div>
              </MouseGlowCard>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <SectionDivider variant="wave" />

      {/* Testimonials */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <TextReveal as="h2" className="font-bold mb-4">{t('home.trustedBy')} <span className="text-primary">{t('home.trustedByHighlight')}</span></TextReveal>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-muted-foreground max-w-xl mx-auto">
              {t('home.trustedBySubtitle')}
            </motion.p>
          </div>
          <StaggerChildren className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <MouseGlowCard key={i} className="rounded-2xl">
                <div className="bento-item h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (<Star key={j} className="w-4 h-4 fill-accent text-accent" />))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-6">"{t(testimonial.textKey)}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-sm">{testimonial.name.charAt(0)}</div>
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

      <SectionDivider variant="curve" flip />

      {/* Tech Marquee — Dual Track */}
      <section className="py-16 overflow-hidden relative">
        <div className="container mx-auto px-4 mb-8 text-center">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{t('home.integratedTech')}</h3>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
        <div className="flex gap-16 animate-marquee whitespace-nowrap mb-4">
          {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, i) => (
            <span key={i} className="text-foreground/70 text-2xl font-bold tracking-wider uppercase shrink-0 hover:text-primary transition-colors cursor-default">{tech}</span>
          ))}
        </div>
        <div className="flex gap-16 animate-marquee-reverse whitespace-nowrap">
          {[...technologies.reverse(), ...technologies, ...technologies, ...technologies].map((tech, i) => (
            <span key={i} className="text-foreground/30 text-xl font-bold tracking-wider uppercase shrink-0 hover:text-primary transition-colors cursor-default">{tech}</span>
          ))}
        </div>
      </section>

      <SectionDivider variant="wave" />

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="h2" className="font-bold mb-6">{t('cta.title')}</TextReveal>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="text-lg text-muted-foreground mb-10">
              {t('cta.subtitle')}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ type: 'spring', damping: 25, stiffness: 180, delay: 0.25 }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Link to={getLocalizedPath('quote')} className="btn-primary px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 group">
                  {t('home.planProject')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <Link to={getLocalizedPath('pricing')} className="btn-outline px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 group">
                {t('nav.pricing')}
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
