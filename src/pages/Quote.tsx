import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Send, Building2, ShoppingCart, Palette, Code, Globe, LayoutDashboard, CreditCard, Search } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import TextReveal from '@/components/motion/TextReveal';
import { type LanguageCode } from '@/i18n';

const PROJECT_TYPE_ICONS: Record<string, React.ElementType> = {
  corporate: Building2,
  ecommerce: ShoppingCart,
  branding: Palette,
  webapp: Code,
};

const REQUIREMENT_ICONS: Record<string, React.ElementType> = {
  multilingual: Globe,
  cms: LayoutDashboard,
  payments: CreditCard,
  seo: Search,
};

const PROJECT_TYPE_KEYS = ['corporate', 'ecommerce', 'branding', 'webapp'] as const;
const REQUIREMENT_KEYS = ['multilingual', 'cms', 'payments', 'seo'] as const;

interface FormState {
  projectType: string;
  requirements: string[];
  vision: string;
  name: string;
  company: string;
  email: string;
}

const Quote = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState<FormState>({
    projectType: '',
    requirements: [],
    vision: '',
    name: '',
    company: '',
    email: '',
  });

  const steps = t('quote.steps', { returnObjects: true }) as string[];

  const toggleRequirement = (id: string) => {
    setForm(prev => ({
      ...prev,
      requirements: prev.requirements.includes(id)
        ? prev.requirements.filter(r => r !== id)
        : [...prev.requirements, id],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 0: return !!form.projectType;
      case 1: return form.requirements.length > 0;
      case 2: return form.vision.trim().length > 10;
      case 3: return form.name.trim() && form.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      default: return false;
    }
  };

  const handleSubmit = async () => {
    if (!canProceed()) return;
    setIsSubmitting(true);

    const projectLabel = t(`quote.projectTypes.${form.projectType}`);
    const reqLabels = form.requirements.map(r => t(`quote.requirements.${r}`)).join(', ');

    try {
      const { data, error } = await supabase.functions.invoke('send-quote', {
        body: {
          projectType: projectLabel,
          requirements: reqLabels,
          vision: form.vision,
          name: form.name,
          company: form.company,
          email: form.email,
        },
      });

      if (error) throw error;
      setIsSuccess(true);
    } catch (err) {
      console.error('Quote submission error:', err);
      alert(t('quote.errorMessage'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const methodologySteps = [
    { num: '01', title: t('quote.methStep01Title'), desc: t('quote.methStep01Desc') },
    { num: '02', title: t('quote.methStep02Title'), desc: t('quote.methStep02Desc') },
    { num: '03', title: t('quote.methStep03Title'), desc: t('quote.methStep03Desc') },
  ];

  const technologies = ['React', 'Tailwind', 'Supabase', 'Resend', 'PostgreSQL'];

  if (isSuccess) {
    return (
      <>
        <SEOHead title={`${t('quote.successTitle')} — MiForgiX Dev`} description={t('quote.successMessage')} />
        <section className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
              className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-8"
            >
              <Check className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">{t('quote.successTitle')}</h1>
            <p className="text-muted-foreground mb-8">{t('quote.successMessage')}</p>
            <a href={`/${currentLang}`} className="btn-primary px-8 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
              {t('quote.successButton')} <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEOHead title={`${t('quote.heroTitle')} ${t('quote.heroHighlight')} — MiForgiX Dev`} description={t('quote.heroSubtitle')} />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="h1" className="font-bold mb-4">
              {t('quote.heroTitle')} <span className="text-primary">{t('quote.heroHighlight')}</span>
            </TextReveal>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              {t('quote.heroSubtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            {Array.isArray(steps) && steps.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  i <= step ? 'bg-primary text-primary-foreground border-primary' : 'bg-card text-muted-foreground border-border'
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-xs font-medium hidden sm:inline ${i <= step ? 'text-primary' : 'text-muted-foreground'}`}>{s}</span>
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${((step + 1) / (Array.isArray(steps) ? steps.length : 4)) * 100}%` }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            />
          </div>
        </div>
      </div>

      {/* Form Steps */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="step0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">{t('quote.step0Title')}</h2>
                  <p className="text-muted-foreground mb-8">{t('quote.step0Subtitle')}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {PROJECT_TYPE_KEYS.map(key => {
                      const Icon = PROJECT_TYPE_ICONS[key];
                      return (
                        <button
                          key={key}
                          onClick={() => setForm(prev => ({ ...prev, projectType: key }))}
                          className={`bento-item text-left flex items-start gap-4 cursor-pointer ${
                            form.projectType === key ? 'border-primary bg-primary/5' : ''
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            form.projectType === key ? 'bg-primary/15' : 'bg-accent/20'
                          }`}>
                            <Icon className={`w-6 h-6 ${form.projectType === key ? 'text-primary' : 'text-foreground/60'}`} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">{t(`quote.projectTypes.${key}`)}</h3>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">{t('quote.step1Title')}</h2>
                  <p className="text-muted-foreground mb-8">{t('quote.step1Subtitle')}</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {REQUIREMENT_KEYS.map(key => {
                      const Icon = REQUIREMENT_ICONS[key];
                      const isSelected = form.requirements.includes(key);
                      return (
                        <button
                          key={key}
                          onClick={() => toggleRequirement(key)}
                          className={`bento-item text-left flex items-start gap-4 cursor-pointer ${
                            isSelected ? 'border-primary bg-primary/5' : ''
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-primary/15' : 'bg-accent/20'
                          }`}>
                            <Icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-foreground/60'}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{t(`quote.requirements.${key}`)}</h3>
                          </div>
                          {isSelected && <Check className="w-5 h-5 text-primary shrink-0 mt-1" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">{t('quote.step2Title')}</h2>
                  <p className="text-muted-foreground mb-8">{t('quote.step2Subtitle')}</p>
                  <textarea
                    value={form.vision}
                    onChange={e => setForm(prev => ({ ...prev, vision: e.target.value }))}
                    placeholder={t('quote.step2Placeholder')}
                    rows={8}
                    className="form-input resize-none"
                    maxLength={2000}
                  />
                  <p className="text-xs text-muted-foreground mt-2">{form.vision.length}/2000 {t('quote.characters')}</p>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">{t('quote.step3Title')}</h2>
                  <p className="text-muted-foreground mb-8">{t('quote.step3Subtitle')}</p>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">{t('quote.fullName')} *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                        className="form-input"
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">{t('quote.company')}</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => setForm(prev => ({ ...prev, company: e.target.value }))}
                        className="form-input"
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">{t('quote.emailAddress')} *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                        className="form-input"
                        maxLength={255}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10">
              <button
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> {t('quote.back')}
              </button>

              {step < (Array.isArray(steps) ? steps.length : 4) - 1 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canProceed()}
                  className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t('quote.continue')} <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>{t('quote.submitInquiry')} <Send className="w-4 h-4" /></>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <TextReveal as="h2" className="font-bold mb-4">{t('quote.methodologyTitle')} <span className="text-primary">{t('quote.methodologyHighlight')}</span></TextReveal>
            <p className="text-muted-foreground max-w-xl mx-auto">
              {t('quote.methodologySubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {methodologySteps.map(s => (
              <div key={s.num} className="bento-item group">
                <div className="text-5xl font-black text-primary/15 group-hover:text-primary/25 transition-colors mb-3 leading-none">
                  {s.num}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Marquee */}
      <section className="py-14 border-y border-border overflow-hidden relative">
        <div className="container mx-auto px-4 mb-6 text-center">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{t('quote.integratedTech')}</h3>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
        <div className="flex gap-16 animate-marquee whitespace-nowrap">
          {[...technologies, ...technologies, ...technologies, ...technologies].map((tech, i) => (
            <span key={i} className="text-foreground/60 text-2xl font-bold tracking-wider uppercase shrink-0 hover:text-primary transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </section>
    </>
  );
};

export default Quote;
