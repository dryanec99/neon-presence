import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
import { type LanguageCode } from '@/i18n';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  message?: string;
}

const Contact = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language as LanguageCode;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    subject: 'webDesign',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation patterns
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('contact.validation.nameRequired');
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = t('contact.validation.emailInvalid');
    }

    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = t('contact.validation.phoneInvalid');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('contact.validation.messageRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: 'webDesign',
      message: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const subjects = ['webDesign', 'development', 'seo', 'marketing', 'other'] as const;

  const contactInfo = [
    {
      icon: MapPin,
      label: currentLang === 'bg' ? 'Адрес' : currentLang === 'ru' ? 'Адрес' : 'Address',
      value: 'Sofia, Bulgaria',
    },
    {
      icon: Phone,
      label: currentLang === 'bg' ? 'Телефон' : currentLang === 'ru' ? 'Телефон' : 'Phone',
      value: '+359 888 123 456',
      href: 'tel:+359888123456',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'hello@webbuilder.bg',
      href: 'mailto:hello@webbuilder.bg',
    },
    {
      icon: Clock,
      label: currentLang === 'bg' ? 'Работно време' : currentLang === 'ru' ? 'Рабочее время' : 'Working Hours',
      value: currentLang === 'bg' ? 'Пон-Пет: 9:00 - 18:00' : currentLang === 'ru' ? 'Пн-Пт: 9:00 - 18:00' : 'Mon-Fri: 9:00 AM - 6:00 PM',
    },
  ];

  return (
    <>
      <SEOHead 
        title={`${t('nav.contact')} - WebBuilder`}
        description={t('contact.subtitle')}
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
              {t('contact.title')}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bento-item">
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
                      {currentLang === 'bg' ? 'Изпрати ново съобщение' : currentLang === 'ru' ? 'Отправить новое сообщение' : 'Send another message'}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          {t('contact.form.name')} *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={cn(
                            "form-input",
                            errors.name && "border-destructive focus:ring-destructive"
                          )}
                          maxLength={100}
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-destructive">{errors.name}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          {t('contact.form.phone')}
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={cn(
                            "form-input",
                            errors.phone && "border-destructive focus:ring-destructive"
                          )}
                          maxLength={20}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-destructive">{errors.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          {t('contact.form.email')} *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={cn(
                            "form-input",
                            errors.email && "border-destructive focus:ring-destructive"
                          )}
                          maxLength={255}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-destructive">{errors.email}</p>
                        )}
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          {t('contact.form.subject')}
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className="form-input"
                        >
                          {subjects.map(subject => (
                            <option key={subject} value={subject}>
                              {t(`contact.form.subjects.${subject}`)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        {t('contact.form.message')} *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={6}
                        className={cn(
                          "form-input resize-none",
                          errors.message && "border-destructive focus:ring-destructive"
                        )}
                        maxLength={1000}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-destructive">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full md:w-auto px-8 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              {contactInfo.map((info, index) => (
                <div key={index} className="bento-item flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                    {info.href ? (
                      <a 
                        href={info.href}
                        className="text-foreground font-medium hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="bento-item p-0 overflow-hidden aspect-[4/3]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d93720.20921920727!2d23.24374585!3d42.69576835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40aa8682cb317bf5%3A0x400a01269bf5e60!2sSofia%2C%20Bulgaria!5e0!3m2!1sen!2s!4v1704903600000!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
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
