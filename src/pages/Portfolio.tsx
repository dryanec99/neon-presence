import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ExternalLink, X, Check } from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const TEMPLATE_KEYS = [
  'ecommerce',
  'saas',
  'agency',
  'local',
  'restaurant',
  'medical',
  'realestate',
  'startup',
] as const;

type TemplateKey = (typeof TEMPLATE_KEYS)[number];

const TEMPLATE_IMAGES: Record<TemplateKey, string> = {
  ecommerce: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=800&h=600&fit=crop',
  saas: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  agency: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
  local: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&fit=crop',
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
  medical: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
  realestate: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
  startup: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&fit=crop',
};

const TEMPLATE_PREVIEWS: Partial<Record<TemplateKey, string>> = {
  saas: 'https://illegalbed.s6-tastewp.com/#',
};

const TECH_BADGES: Record<TemplateKey, string[]> = {
  ecommerce: ['wordpress', 'elementor', 'gpl', 'rankmath', 'woocommerce'],
  saas: ['wordpress', 'elementor', 'gpl', 'rankmath'],
  agency: ['wordpress', 'elementor', 'gpl', 'rankmath'],
  local: ['wordpress', 'elementor', 'gpl', 'rankmath'],
  restaurant: ['wordpress', 'elementor', 'gpl', 'rankmath', 'woocommerce'],
  medical: ['wordpress', 'elementor', 'gpl', 'rankmath'],
  realestate: ['wordpress', 'elementor', 'gpl', 'rankmath'],
  startup: ['wordpress', 'elementor', 'gpl', 'rankmath'],
};

const FILTER_CATEGORIES = ['All', 'E-commerce', 'SaaS', 'Corporate', 'Marketing'] as const;

const FILTER_KEYS: Record<string, string> = {
  All: 'filterAll',
  'E-commerce': 'filterEcommerce',
  SaaS: 'filterSaas',
  Corporate: 'filterCorporate',
  Marketing: 'filterMarketing',
};

// Bento size: first two are large (flagship), rest are small
const BENTO_SIZES: Record<number, string> = {
  0: 'md:col-span-2 md:row-span-2',
  1: 'md:col-span-2 md:row-span-2',
};

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey | null>(null);

  const getLocalizedPath = (path: string) => `/${currentLang}${path ? `/${path}` : ''}`;

  const TEMPLATE_SUBJECT_MAP: Record<TemplateKey, string> = {
    ecommerce: 'templateStorefront',
    saas: 'templateExecutive',
    agency: 'templatePortfolio',
    local: 'templateLocalPro',
    restaurant: 'templateDiner',
    medical: 'templateClinic',
    realestate: 'templateListing',
    startup: 'templateLaunchpad',
  };

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
    previewUrl: TEMPLATE_PREVIEWS[key] || null,
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
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {t('portfolio.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('portfolio.subtitle')}
            </p>
          </motion.div>
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
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6 auto-rows-[280px]"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((tpl, index) => (
                <motion.article
                  key={tpl.key}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className={`group cursor-pointer ${BENTO_SIZES[index] || ''}`}
                  onClick={() => setSelectedTemplate(tpl.key as TemplateKey)}
                >
                  <div className="bento-item p-0 overflow-hidden h-full flex flex-col relative">
                    {/* Image */}
                    <div className="absolute inset-0">
                      <img
                        src={tpl.image}
                        alt={tpl.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_4%/0.95)] via-[hsl(0_0%_4%/0.5)] to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col justify-end h-full p-5 md:p-6">
                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {tpl.techBadges.slice(0, 3).map((badge) => (
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

                      {/* Hover overlay action */}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_hsl(152_100%_50%/0.5)]">
                          <ExternalLink className="w-4 h-4 text-primary-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Detail Modal */}
      <Dialog open={!!selectedTemplate} onOpenChange={() => setSelectedTemplate(null)}>
        <DialogContent className="max-w-2xl bg-card border-border max-h-[90vh] overflow-y-auto">
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

              {/* Preview Image */}
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

              {/* Template-Specific Features */}
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
                <a
                  href={selected.previewUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 flex-1 shadow-[0_0_20px_hsl(152_100%_50%/0.4)] transition-all ${!selected.previewUrl ? 'opacity-50 pointer-events-none' : ''}`}
                >
                  {t('portfolio.livePreview')}
                  <ExternalLink className="w-4 h-4" />
                </a>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {t('cta.title')}
            </h2>
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

export default Portfolio;
