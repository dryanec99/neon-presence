import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, Send, Building2, ShoppingCart, Palette, Code, Globe, LayoutDashboard, CreditCard, Search } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import TextReveal from '@/components/motion/TextReveal';

const STEPS = ['Project Scope', 'Requirements', 'Project Goals', 'Contact Information'];

const PROJECT_TYPES = [
  { id: 'corporate', label: 'Corporate Website', icon: Building2 },
  { id: 'ecommerce', label: 'E-commerce Platform', icon: ShoppingCart },
  { id: 'branding', label: 'Brand Identity', icon: Palette },
  { id: 'webapp', label: 'Custom Web Application', icon: Code },
];

const REQUIREMENTS = [
  { id: 'multilingual', label: 'Multilingual Support', icon: Globe },
  { id: 'cms', label: 'CMS / Admin Dashboard', icon: LayoutDashboard },
  { id: 'payments', label: 'Payment Integration', icon: CreditCard },
  { id: 'seo', label: 'SEO Optimization', icon: Search },
];

interface FormState {
  projectType: string;
  requirements: string[];
  vision: string;
  name: string;
  company: string;
  email: string;
}

const Quote = () => {
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

    const projectLabel = PROJECT_TYPES.find(p => p.id === form.projectType)?.label || form.projectType;
    const reqLabels = form.requirements.map(r => REQUIREMENTS.find(req => req.id === r)?.label || r).join(', ');

    const emailBody = `
New Project Inquiry — MiForgiX Dev

Project Type: ${projectLabel}
Requirements: ${reqLabels}
Vision: ${form.vision}

Contact:
Name: ${form.name}
Company: ${form.company || 'N/A'}
Email: ${form.email}
    `.trim();

    // Ready for backend email integration to homer_bart@abv.bg
    console.log('Quote submission for homer_bart@abv.bg:', emailBody);

    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const methodologySteps = [
    { num: '01', title: 'Analysis & Strategy', desc: 'We audit your digital presence, define clear goals, and create a custom roadmap.' },
    { num: '02', title: 'Development & Integration', desc: 'AI-native workflow delivers production-grade code with modern frameworks.' },
    { num: '03', title: 'Quality Assurance & Launch', desc: 'Rigorous testing, performance optimization, and seamless deployment.' },
  ];

  const technologies = ['React', 'Tailwind', 'Supabase', 'Resend', 'PostgreSQL'];

  if (isSuccess) {
    return (
      <>
        <SEOHead title="Thank You — MiForgiX Dev" description="Your project inquiry has been received." />
        <section className="min-h-screen flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center px-4"
          >
            <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-8">
              <Check className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-foreground">Project Inquiry Received</h1>
            <p className="text-muted-foreground mb-8">
              Thank you, {form.name}! We'll review your project details and get back to you within 24 hours with a tailored proposal.
            </p>
            <a href="/" className="btn-primary px-8 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2">
              Back to Home <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </section>
      </>
    );
  }

  return (
    <>
      <SEOHead title="Plan Your Project — MiForgiX Dev" description="Tell us about your project and get a tailored quote." />

      {/* Hero */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <TextReveal as="h1" className="font-bold mb-4">
              Professional <span className="text-primary">Project Planner</span>
            </TextReveal>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Tell us about your vision and we'll craft a tailored strategy and quote for your project.
            </p>
          </div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="container mx-auto px-4 mb-12">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
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
              animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
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
                  <h2 className="text-2xl font-bold mb-2 text-foreground">What type of project do you need?</h2>
                  <p className="text-muted-foreground mb-8">Select the category that best describes your project.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {PROJECT_TYPES.map(pt => (
                      <button
                        key={pt.id}
                        onClick={() => setForm(prev => ({ ...prev, projectType: pt.id }))}
                        className={`bento-item text-left flex items-start gap-4 cursor-pointer ${
                          form.projectType === pt.id ? 'border-primary bg-primary/5' : ''
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          form.projectType === pt.id ? 'bg-primary/15' : 'bg-accent/20'
                        }`}>
                          <pt.icon className={`w-6 h-6 ${form.projectType === pt.id ? 'text-primary' : 'text-foreground/60'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{pt.label}</h3>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">What features do you need?</h2>
                  <p className="text-muted-foreground mb-8">Select all that apply to your project.</p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {REQUIREMENTS.map(req => {
                      const isSelected = form.requirements.includes(req.id);
                      return (
                        <button
                          key={req.id}
                          onClick={() => toggleRequirement(req.id)}
                          className={`bento-item text-left flex items-start gap-4 cursor-pointer ${
                            isSelected ? 'border-primary bg-primary/5' : ''
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-primary/15' : 'bg-accent/20'
                          }`}>
                            <req.icon className={`w-6 h-6 ${isSelected ? 'text-primary' : 'text-foreground/60'}`} />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{req.label}</h3>
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
                  <h2 className="text-2xl font-bold mb-2 text-foreground">Describe your vision</h2>
                  <p className="text-muted-foreground mb-8">Tell us about your project goals, target audience, and any specific ideas you have.</p>
                  <textarea
                    value={form.vision}
                    onChange={e => setForm(prev => ({ ...prev, vision: e.target.value }))}
                    placeholder="E.g., We need a modern e-commerce platform targeting millennials in Europe, with a focus on sustainable fashion..."
                    rows={8}
                    className="form-input resize-none"
                    maxLength={2000}
                  />
                  <p className="text-xs text-muted-foreground mt-2">{form.vision.length}/2000 characters</p>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h2 className="text-2xl font-bold mb-2 text-foreground">Your contact details</h2>
                  <p className="text-muted-foreground mb-8">We'll use this to send your personalized proposal.</p>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Full Name *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
                        className="form-input"
                        placeholder="John Doe"
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Company</label>
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => setForm(prev => ({ ...prev, company: e.target.value }))}
                        className="form-input"
                        placeholder="Acme Inc."
                        maxLength={100}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-foreground">Email Address *</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))}
                        className="form-input"
                        placeholder="john@company.com"
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
                <ArrowLeft className="w-4 h-4" /> Back
              </button>

              {step < STEPS.length - 1 ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canProceed()}
                  className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <ArrowRight className="w-4 h-4" />
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
                    <>Submit Inquiry <Send className="w-4 h-4" /></>
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
            <TextReveal as="h2" className="font-bold mb-4">Our <span className="text-primary">Methodology</span></TextReveal>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A proven 3-step process that turns ideas into high-performing digital products.
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
      <section className="py-14 border-y-2 border-border overflow-hidden relative">
        <div className="container mx-auto px-4 mb-6 text-center">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">Integrated Technologies</h3>
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
