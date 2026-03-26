import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import TextReveal from '@/components/motion/TextReveal';
import StaggerChildren from '@/components/motion/StaggerChildren';
import MagneticButton from '@/components/motion/MagneticButton';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface FormData { name: string; phone: string; email: string; subject: string; message: string; }
interface FormErrors { name?: string; phone?: string; email?: string; message?: string; }

const Contact = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [formData, setFormData] = useState<FormData>({
    name: '', phone: '', email: '', subject: searchParams.get('subject') || 'webDesign', message: '',
  });

  useEffect(() => {
    const subject = searchParams.get('subject');
    if (subject) setFormData(prev => ({ ...prev, subject }));
  }, [searchParams]);

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    console.log('Form submission for homer_bart@abv.bg:', formData);
    setIsSubmitting(false);
    setIsSuccess(true);
    toast({ title: t('contact.success'), description: t('contact.subtitle') });
    setFormData({ name: '', phone: '', email: '', subject: 'webDesign', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const subjects = [
    'webDesign', 'ecommerce', 'appDev', 'googleAds', 'seo', 'gmb', 'social', 'reputation', 'email',
    'templateStorefront', 'templateExecutive', 'templatePortfolio', 'templateLocalPro', 'templateDiner', 'templateClinic', 'templateListing', 'templateLaunchpad', 'other'
  ] as const;

  const contactInfo = [
    { icon: MapPin, labelKey: 'contact.info.address', value: 'Sofia, Bulgaria' },
    { icon: Phone, labelKey: 'contact.info.phone', value: '+359 888 123 456', href: 'tel:+359888123456' },
    { icon: Mail, labelKey: 'contact.info.email', value: 'homer_bart@abv.bg', href: 'mailto:homer_bart@abv.bg' },
    { icon: Clock, labelKey: 'contact.info.workingHours', valueKey: 'contact.info.workingHoursValue' },
  ];

  return (
    <>
      <SEOHead title={`${t('nav.contact')} - MiForgiX Dev`} description={t('contact.subtitle')} />

      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="h1" className="font-bold mb-6">{t('contact.title')}</TextReveal>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-muted-foreground">
              {t('contact.subtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3">
              <div className="bento-item">
                {isSuccess ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-foreground">{t('contact.success')}</h3>
                    <button onClick={() => setIsSuccess(false)} className="mt-4 text-primary hover:underline">{t('contact.form.sendAnother')}</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">{t('contact.form.name')} *</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={cn("form-input", errors.name && "border-destructive focus:ring-destructive")} maxLength={100} />
                        {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">{t('contact.form.phone')}</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={cn("form-input", errors.phone && "border-destructive focus:ring-destructive")} maxLength={20} />
                        {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone}</p>}
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">{t('contact.form.email')} *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={cn("form-input", errors.email && "border-destructive focus:ring-destructive")} maxLength={255} />
                        {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2 text-foreground">{t('contact.form.subject')}</label>
                        <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="form-input">
                          {subjects.map(subject => (<option key={subject} value={subject}>{t(`contact.form.subjects.${subject}`)}</option>))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2 text-foreground">{t('contact.form.message')} *</label>
                      <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={6} className={cn("form-input resize-none", errors.message && "border-destructive focus:ring-destructive")} maxLength={1000} />
                      {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message}</p>}
                    </div>
                    <MagneticButton>
                      <button type="submit" disabled={isSubmitting} className="btn-primary w-full md:w-auto px-8 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        {isSubmitting ? <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : <>{t('contact.form.submit')} <Send className="w-5 h-5" /></>}
                      </button>
                    </MagneticButton>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-2">
              <StaggerChildren className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="bento-item flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0 relative">
                      <info.icon className="w-6 h-6 text-primary" />
                      {/* Pulsing online dot for phone and email */}
                      {(info.icon === Phone || info.icon === Mail) && (
                        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-card animate-pulse" />
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{t(info.labelKey)}</p>
                      {info.href ? (
                        <a href={info.href} className="text-foreground font-medium hover:text-primary transition-colors">{info.value}</a>
                      ) : (
                        <p className="text-foreground font-medium">{info.valueKey ? t(info.valueKey) : info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </StaggerChildren>
              <div className="mt-6 bento-item p-0 overflow-hidden aspect-[4/3] rounded-2xl border-2 border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93720.20921920727!2d23.24374585!3d42.69576835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia%2C%20Bulgaria!5e0!3m2!1sen!2s!4v1704903600000!5m2!1sen!2s"
                  width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Location Map"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
