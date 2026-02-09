import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Code, ShoppingCart, Smartphone, BarChart3, Search, MapPin,
  Users, Star, Mail, ArrowRight, CheckCircle, Send, ArrowLeft,
  ChevronDown
} from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';

const SERVICE_ICONS: Record<string, React.ElementType> = {
  webDesign: Code,
  ecommerce: ShoppingCart,
  mobileApps: Smartphone,
  googleAds: BarChart3,
  seoOptimization: Search,
  googleMyBusiness: MapPin,
  socialNetworks: Users,
  onlineReputation: Star,
  emailMarketing: Mail,
};

const SLUG_TO_KEY: Record<string, string> = {
  'web-design': 'webDesign',
  'ecommerce': 'ecommerce',
  'mobile-apps': 'mobileApps',
  'google-ads': 'googleAds',
  'seo': 'seoOptimization',
  'google-my-business': 'googleMyBusiness',
  'social-networks': 'socialNetworks',
  'online-reputation': 'onlineReputation',
  'email-marketing': 'emailMarketing',
};

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const ServiceDetail = () => {
  const { t, i18n } = useTranslation();
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const currentLang = i18n.language as LanguageCode;
  const serviceKey = SLUG_TO_KEY[serviceSlug || ''] || 'webDesign';
  const Icon = SERVICE_ICONS[serviceKey] || Code;

  const getLocalizedPath = (path: string) => `/${currentLang}${path ? `/${path}` : ''}`;

  // Form state
  const [formData, setFormData] = useState<FormData>({
    name: '', phone: '', email: '', message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.validation.nameRequired');
    if (!emailRegex.test(formData.email)) newErrors.email = t('contact.validation.emailInvalid');
    if (formData.phone && !phoneRegex.test(formData.phone)) newErrors.phone = t('contact.validation.phoneInvalid');
    if (!formData.message.trim()) newErrors.message = t('contact.validation.messageRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Service inquiry ready for backend:', { service: serviceKey, ...formData });
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Get features array
  const features: string[] = [];
  for (let i = 0; i < 6; i++) {
    const key = `serviceDetail.${serviceKey}.features.${i}`;
    const val = t(key);
    if (val !== key) features.push(val);
  }

  // Get pricing tiers
  const tiers = ['basic', 'standard', 'premium'] as const;

  // Get FAQ items
  const faqItems: { q: string; a: string }[] = [];
  for (let i = 0; i < 5; i++) {
    const qKey = `serviceDetail.${serviceKey}.faq.${i}.q`;
    const aKey = `serviceDetail.${serviceKey}.faq.${i}.a`;
    const q = t(qKey);
    const a = t(aKey);
    if (q !== qKey && a !== aKey) faqItems.push({ q, a });
  }

  return (
    <>
      <SEOHead
        title={`${t(`serviceDetail.${serviceKey}.title`)} - WebBuilder`}
        description={t(`serviceDetail.${serviceKey}.description`)}
      />

      {/* Hero */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              to={getLocalizedPath('services')}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('nav.services')}
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Icon className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                {t(`serviceDetail.${serviceKey}.title`)}
              </h1>
            </div>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl">
              {t(`serviceDetail.${serviceKey}.description`)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      {features.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-10"
            >
              {t(`serviceDetail.${serviceKey}.featuresTitle`)}
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bento-item flex items-start gap-4"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-foreground">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t(`serviceDetail.${serviceKey}.pricingTitle`)}
            </h2>
            <p className="text-muted-foreground">
              {t(`serviceDetail.${serviceKey}.pricingSubtitle`)}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiers.map((tier, i) => {
              const nameKey = `serviceDetail.${serviceKey}.pricing.${tier}.name`;
              const name = t(nameKey);
              if (name === nameKey) return null;

              const isPopular = tier === 'standard';

              // Get tier features
              const tierFeatures: string[] = [];
              for (let j = 0; j < 6; j++) {
                const fKey = `serviceDetail.${serviceKey}.pricing.${tier}.features.${j}`;
                const fVal = t(fKey);
                if (fVal !== fKey) tierFeatures.push(fVal);
              }

              return (
                <motion.div
                  key={tier}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={cn(
                    "bento-item relative flex flex-col",
                    isPopular && "ring-2 ring-primary"
                  )}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                      {t('serviceDetail.popular')}
                    </div>
                  )}

                  <h3 className="text-xl font-bold mb-2">{name}</h3>
                  <p className="text-3xl font-bold text-primary mb-1">
                    {t(`serviceDetail.${serviceKey}.pricing.${tier}.price`)}
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    {t(`serviceDetail.${serviceKey}.pricing.${tier}.period`)}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {tierFeatures.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={getLocalizedPath('contact')}
                    className={cn(
                      "w-full py-3 rounded-xl text-center font-semibold inline-flex items-center justify-center gap-2 transition-colors",
                      isPopular
                        ? "btn-primary"
                        : "border border-border hover:border-primary hover:text-primary"
                    )}
                  >
                    {t('serviceDetail.getStarted')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {faqItems.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold mb-10 text-center"
            >
              {t('serviceDetail.faqTitle')}
            </motion.h2>

            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bento-item"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between text-left"
                  >
                    <span className="font-semibold pr-4">{item.q}</span>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200",
                        openFaq === i && "rotate-180"
                      )}
                    />
                  </button>
                  {openFaq === i && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-muted-foreground text-sm mt-4 leading-relaxed"
                    >
                      {item.a}
                    </motion.p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Inquiry Form */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('serviceDetail.formTitle')}
            </h2>
            <p className="text-muted-foreground">
              {t('serviceDetail.formSubtitle')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bento-item"
          >
            {isSuccess ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{t('contact.success')}</h3>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 text-primary hover:underline"
                >
                  {t('contact.form.sendAnother')}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <input
                      type="text" id="name" name="name"
                      value={formData.name} onChange={handleChange}
                      className={cn("form-input", errors.name && "border-destructive")}
                      maxLength={100}
                    />
                    {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <input
                      type="tel" id="phone" name="phone"
                      value={formData.phone} onChange={handleChange}
                      className={cn("form-input", errors.phone && "border-destructive")}
                      maxLength={20}
                    />
                    {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    {t('contact.form.email')} *
                  </label>
                  <input
                    type="email" id="email" name="email"
                    value={formData.email} onChange={handleChange}
                    className={cn("form-input", errors.email && "border-destructive")}
                    maxLength={255}
                  />
                  {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    {t('contact.form.message')} *
                  </label>
                  <textarea
                    id="message" name="message"
                    value={formData.message} onChange={handleChange}
                    rows={5}
                    className={cn("form-input resize-none", errors.message && "border-destructive")}
                    maxLength={1000}
                  />
                  {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
                </div>
                <button
                  type="submit" disabled={isSubmitting}
                  className="btn-primary w-full py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  ) : (
                    <>
                      {t('contact.form.submit')}
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ServiceDetail;
