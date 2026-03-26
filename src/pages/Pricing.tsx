import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Clock, MessageSquare } from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';
import TextReveal from '@/components/motion/TextReveal';
import StaggerChildren from '@/components/motion/StaggerChildren';
import MouseGlowCard from '@/components/motion/MouseGlowCard';
import MagneticButton from '@/components/motion/MagneticButton';

const TIERS = ['basic', 'ecommerce', 'custom'] as const;

const Pricing = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;
  const getLocalizedPath = (path: string) => `/${currentLang}${path ? `/${path}` : ''}`;

  const faqs = Array.from({ length: 5 }, (_, i) => ({
    q: t(`pricing.faq.${i}.q`),
    a: t(`pricing.faq.${i}.a`),
  }));

  return (
    <>
      <SEOHead title={`${t('nav.pricing')} - MiForgiX Dev`} description={t('pricing.subtitle')} />

      {/* Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-primary/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="h1" className="font-bold mb-6">{t('pricing.title')}</TextReveal>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground">
              {t('pricing.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 md:pb-32">
        <div className="container mx-auto px-4">
          <StaggerChildren className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {TIERS.map((tier, index) => {
              const isPopular = tier === 'ecommerce';
              const features = t(`pricing.tiers.${tier}.features`, { returnObjects: true }) as string[];
              const price = t(`pricing.tiers.${tier}.price`);
              const isCustom = tier === 'custom';

              return (
                <MouseGlowCard key={tier} className="rounded-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className={`bento-item h-full flex flex-col relative ${isPopular ? 'border-primary ring-2 ring-primary/20' : ''}`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider">
                        {t('pricing.mostPopular')}
                      </div>
                    )}

                    <h3 className="text-xl font-bold text-foreground mb-2">{t(`pricing.tiers.${tier}.name`)}</h3>
                    <p className="text-sm text-muted-foreground mb-6">{t(`pricing.tiers.${tier}.description`)}</p>

                    <div className="mb-6">
                      {isCustom ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl font-black text-primary">{price}</span>
                        </div>
                      ) : (
                        <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-black text-primary">{price}</span>
                          <span className="text-lg font-semibold text-muted-foreground">{t(`pricing.tiers.${tier}.currency`)}</span>
                        </div>
                      )}
                      {!isCustom && (
                        <p className="text-xs text-muted-foreground mt-1">{t(`pricing.tiers.${tier}.period`)}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-6 px-3 py-2 rounded-lg bg-accent/10 border border-accent/20">
                      <Clock className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-foreground">
                        {t('pricing.deliveryLabel')}: {t(`pricing.tiers.${tier}.delivery`)}
                      </span>
                    </div>

                    <ul className="space-y-3 flex-1 mb-8">
                      {Array.isArray(features) && features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <MagneticButton className="w-full">
                      <Link
                        to={getLocalizedPath('quote')}
                        className={`w-full px-6 py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                          isPopular
                            ? 'btn-primary'
                            : 'btn-outline'
                        }`}
                      >
                        {isCustom ? (
                          <><MessageSquare className="w-4 h-4" /> {t('pricing.custom')}</>
                        ) : (
                          <>{t('pricing.getStarted')} <ArrowRight className="w-4 h-4" /></>
                        )}
                      </Link>
                    </MagneticButton>
                  </motion.div>
                </MouseGlowCard>
              );
            })}
          </StaggerChildren>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 border-t-2 border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <TextReveal as="h2" className="font-bold mb-12 text-center">{t('pricing.faqTitle')}</TextReveal>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bento-item group cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-semibold text-foreground list-none [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="text-primary text-xl ml-4 group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <TextReveal as="h2" className="font-bold mb-6">{t('cta.title')}</TextReveal>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-lg text-muted-foreground mb-10">
            {t('cta.subtitle')}
          </motion.p>
          <MagneticButton>
            <Link to={getLocalizedPath('quote')} className="btn-primary px-10 py-4 rounded-xl text-base font-semibold inline-flex items-center gap-2 group">
              {t('home.planProject')} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </MagneticButton>
        </div>
      </section>
    </>
  );
};

export default Pricing;
