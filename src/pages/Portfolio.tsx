import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, Check } from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';
import PreviewModal from '@/components/PreviewModal';
import TextReveal from '@/components/motion/TextReveal';
import StaggerChildren from '@/components/motion/StaggerChildren';
import MouseGlowCard from '@/components/motion/MouseGlowCard';
import MagneticButton from '@/components/motion/MagneticButton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const TEMPLATE_KEYS = ['femmeflora', 'dailymarket', 'smilepro', 'nexus'] as const;
type TemplateKey = (typeof TEMPLATE_KEYS)[number];

const TEMPLATE_IMAGES: Record<TemplateKey, string> = {
  femmeflora: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
  dailymarket: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
  smilepro: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
  nexus: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
};

const TEMPLATE_PREVIEWS: Record<TemplateKey, string> = {
  femmeflora: 'https://musical-raindrop-acf78e.netlify.app',
  dailymarket: 'https://snazzy-scone-01c792.netlify.app',
  smilepro: 'https://peppy-arithmetic-db87b8.netlify.app',
  nexus: 'https://roaring-gnome-eb42de.netlify.app',
};

const TECH_BADGES: Record<TemplateKey, string[]> = {
  femmeflora: ['woocommerce', 'elementor', 'staticEngine'],
  dailymarket: ['ecommerce', 'astraKit', 'seoReady'],
  smilepro: ['medical', 'leadGen', 'staticFast'],
  nexus: ['agency', 'highEndUI', 'staticPowered'],
};

const FILTER_CATEGORIES = ['All', 'E-commerce', 'Healthcare', 'Agency'] as const;

const FILTER_KEYS: Record<string, string> = {
  All: 'filterAll',
  'E-commerce': 'filterEcommerce',
  Healthcare: 'filterHealthcare',
  Agency: 'filterAgency',
};

const BENTO_SIZES: Record<number, string> = {
  0: 'md:col-span-2 md:row-span-2',
  1: 'md:col-span-2 md:row-span-2',
};

const TEMPLATE_SUBJECT_MAP: Record<TemplateKey, string> = {
  femmeflora: 'templateFemmeFlora',
  dailymarket: 'templateDailyMarket',
  smilepro: 'templateSmilePro',
  nexus: 'templateNexus',
};

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState('');

  const getLocalizedPath = (path: string) => `/${currentLang}${path ? `/${path}` : ''}`;

  const coreFeatures = t('portfolio.coreFeaturesList', { returnObjects: true }) as string[];

  const templates = TEMPLATE_KEYS.map((key) => ({
    key,
    title: t(`portfolio.templates.${key}.title`),
    subtitle: t(`portfolio.templates.${key}.subtitle`),
    category: t(`portfolio.templates.${key}.category`),
    description: t(`portfolio.templates.${key}.description`),
    features: t(`portfolio.templates.${key}.features`, { returnObjects: true }) as string[],
    image: TEMPLATE_IMAGES[key],
    techBadges: TECH_BADGES[key],
    previewUrl: TEMPLATE_PREVIEWS[key],
  }));

  const filtered =
    activeFilter === 'All'
      ? templates
      : templates.filter((tpl) => tpl.category === activeFilter);

  const selected = selectedTemplate
    ? templates.find((tpl) => tpl.key === selectedTemplate)
    : null;

  return (
    <>
      <SEOHead
        title={`${t('portfolio.title')} - WebBuilder`}
        description={t('portfolio.subtitle')}
      />

      {/* Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="h1" className="font-bold mb-6">
              {t('portfolio.title')}
            </TextReveal>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground"
            >
              {t('portfolio.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {FILTER_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-primary text-primary-foreground shadow-[0_0_20px_hsl(152_100%_50%/0.4)]'
                    : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                }`}
              >
                {t(`portfolio.${FILTER_KEYS[cat]}`)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 auto-rows-[280px]">
            <AnimatePresence mode="popLayout">
              {filtered.map((tpl, index) => (
                <MouseGlowCard
                  key={tpl.key}
                  className={`group cursor-pointer rounded-2xl ${BENTO_SIZES[index] || ''}`}
                >
                  <div
                    className="bento-item p-0 overflow-hidden h-full flex flex-col relative"
                    onClick={() => setSelectedTemplate(tpl.key as TemplateKey)}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={tpl.image}
                        alt={tpl.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_4%/0.95)] via-[hsl(0_0%_4%/0.5)] to-transparent" />
                    </div>
                    <div className="relative z-10 flex flex-col justify-end h-full p-5 md:p-6">
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {tpl.techBadges.map((badge) => (
                          <span
                            key={badge}
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30"
                          >
                            {t(`portfolio.techBadges.${badge}`)}
                          </span>
                        ))}
                      </div>
                      <span className="text-primary text-xs font-medium mb-1 uppercase tracking-wider">
                        {tpl.category}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-foreground mb-0.5 group-hover:text-primary transition-colors">
                        {tpl.title}
                      </h3>
                      <p className="text-primary/70 text-xs font-medium mb-1">
                        {tpl.subtitle}
                      </p>
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {tpl.description}
                      </p>
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_hsl(152_100%_50%/0.5)]">
                          <ExternalLink className="w-4 h-4 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                </MouseGlowCard>
              ))}
            </AnimatePresence>
          </StaggerChildren>
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-2xl glass border-[hsl(0_0%_100%/0.1)] max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {selected.techBadges.map((badge) => (
                    <span
                      key={badge}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30"
                    >
                      {t(`portfolio.techBadges.${badge}`)}
                    </span>
                  ))}
                </div>
                <DialogTitle className="text-2xl font-bold">{selected.title}</DialogTitle>
                <p className="text-primary/80 text-sm font-medium">{selected.subtitle}</p>
                <DialogDescription className="text-muted-foreground text-sm mt-1">
                  {selected.description}
                </DialogDescription>
              </DialogHeader>

              <div className="rounded-xl overflow-hidden border border-border my-4">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-48 md:h-64 object-cover"
                />
              </div>

              {/* Core Features */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  {t('portfolio.coreFeatures')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Array.isArray(coreFeatures) &&
                    coreFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{feat}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Template Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
                  {t('portfolio.features')}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Array.isArray(selected.features) &&
                    selected.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">{feat}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <MagneticButton className="flex-1">
                  <button
                    onClick={() => {
                      setSelectedTemplate(null);
                      setPreviewTitle(selected.title);
                      setPreviewUrl(selected.previewUrl);
                    }}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_hsl(152_100%_50%/0.4)] transition-all"
                  >
                    {t('portfolio.livePreview')}
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </MagneticButton>
                <button
                  onClick={() => {
                    const subjectKey = TEMPLATE_SUBJECT_MAP[selectedTemplate!];
                    setSelectedTemplate(null);
                    navigate(`${getLocalizedPath('contact')}?subject=${subjectKey}`);
                  }}
                  className="btn-outline px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 flex-1"
                >
                  {t('portfolio.requestQuote')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Fullscreen Preview Modal */}
      <PreviewModal
        url={previewUrl || ''}
        title={previewTitle}
        open={!!previewUrl}
        onClose={() => setPreviewUrl(null)}
      />

      {/* CTA */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="h2" className="font-bold mb-6">
              {t('cta.title')}
            </TextReveal>
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

export default Portfolio;
