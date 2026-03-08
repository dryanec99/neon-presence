import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Search, Globe, Palette, Code, Smartphone,
  BarChart3, Shield, ArrowRight, ArrowLeft, CheckCircle,
  Building2, Target, Image, Clock, Send, Sparkles,
  FileText, Camera, Type,
} from 'lucide-react';

const STEPS = ['Identity & Vision', 'Capabilities', 'Asset Audit', 'Timeline & Contact'];

const capabilities = [
  { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingCart, desc: 'Online store & payments' },
  { id: 'seo', label: 'SEO Optimization', icon: Search, desc: 'Search engine visibility' },
  { id: 'multilingual', label: 'Multi-Language', icon: Globe, desc: 'Reach global audiences' },
  { id: 'customDesign', label: 'Custom Design', icon: Palette, desc: 'Bespoke visual identity' },
  { id: 'cms', label: 'CMS Integration', icon: Code, desc: 'Content management system' },
  { id: 'responsive', label: 'Mobile-First', icon: Smartphone, desc: 'All devices optimized' },
  { id: 'analytics', label: 'Analytics & Tracking', icon: BarChart3, desc: 'Data-driven insights' },
  { id: 'security', label: 'Advanced Security', icon: Shield, desc: 'SSL, backups, protection' },
];

const assetStatuses = ['Ready to go', 'Needs update', 'Need from scratch'];

const timelines = [
  { id: 'urgent', label: 'ASAP (2–4 weeks)', desc: 'Rush delivery with priority support' },
  { id: 'standard', label: 'Standard (4–8 weeks)', desc: 'Balanced pace for quality results' },
  { id: 'relaxed', label: 'Flexible (8–12 weeks)', desc: 'Thorough process, no rush' },
  { id: 'ongoing', label: 'Ongoing Retainer', desc: 'Continuous partnership & iteration' },
];

const budgetRanges = ['€1,000 – €3,000', '€3,000 – €7,000', '€7,000 – €15,000', '€15,000+'];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

const Blueprint = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    companyName: '',
    industry: '',
    websiteUrl: '',
    vision: '',
    capabilities: [] as string[],
    logoStatus: '',
    copyStatus: '',
    imageryStatus: '',
    timeline: '',
    budget: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    additionalNotes: '',
  });

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleCapability = (id: string) =>
    setForm((prev) => ({
      ...prev,
      capabilities: prev.capabilities.includes(id)
        ? prev.capabilities.filter((c) => c !== id)
        : [...prev.capabilities, id],
    }));

  const goTo = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  const canProceed = () => {
    if (step === 0) return form.companyName && form.vision;
    if (step === 1) return form.capabilities.length > 0;
    if (step === 2) return form.logoStatus && form.copyStatus && form.imageryStatus;
    if (step === 3) return form.contactName && form.contactEmail && form.timeline;
    return true;
  };

  const handleSubmit = async () => {
    if (!canProceed()) {
      toast({ title: 'Please complete all required fields', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-intake', {
        body: { ...form, formType: 'blueprint' },
      });
      if (error) throw error;
      setIsSubmitted(true);
    } catch {
      toast({ title: 'Failed to send. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-lg"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8"
          >
            <Sparkles className="w-12 h-12 text-primary" />
          </motion.div>
          <h1 className="text-4xl font-bold text-foreground mb-4">Blueprint Received</h1>
          <p className="text-muted-foreground text-lg">
            Your project blueprint has been submitted. Our strategy team will review your requirements and reach out within 24 hours to schedule a discovery call.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Project <span className="text-primary">Blueprint</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A guided discovery experience to define your vision and requirements.
          </p>
        </div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex justify-between mb-3">
            {STEPS.map((label, i) => (
              <button
                key={label}
                onClick={() => i <= step && goTo(i)}
                className={`text-xs font-semibold transition-colors ${
                  i <= step ? 'text-primary' : 'text-muted-foreground'
                } ${i < step ? 'cursor-pointer hover:text-primary/80' : i === step ? '' : 'cursor-default'}`}
              >
                {label}
              </button>
            ))}
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Steps */}
        <div className="relative overflow-hidden min-h-[480px]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={step}
              custom={dir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
              className="space-y-6"
            >
              {/* STEP 0 — Identity & Vision */}
              {step === 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Building2 className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Identity & Vision</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Company / Brand Name *</Label>
                      <Input value={form.companyName} onChange={(e) => updateField('companyName', e.target.value)} placeholder="Acme Corp" className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <Label>Industry</Label>
                      <Input value={form.industry} onChange={(e) => updateField('industry', e.target.value)} placeholder="Tech, Healthcare, Retail…" className="form-input" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Current Website (if any)</Label>
                    <Input value={form.websiteUrl} onChange={(e) => updateField('websiteUrl', e.target.value)} placeholder="https://example.com" className="form-input" />
                  </div>
                  <div className="space-y-2">
                    <Label>Your Vision & Goals *</Label>
                    <Textarea
                      value={form.vision}
                      onChange={(e) => updateField('vision', e.target.value)}
                      placeholder="Describe what you want to achieve. What problems should this project solve?"
                      className="form-input min-h-[140px]"
                    />
                  </div>
                </div>
              )}

              {/* STEP 1 — Capabilities */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Select Capabilities *</h2>
                  </div>
                  <p className="text-muted-foreground text-sm">Choose all that apply to your project.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {capabilities.map((cap) => {
                      const Icon = cap.icon;
                      const selected = form.capabilities.includes(cap.id);
                      return (
                        <button
                          key={cap.id}
                          type="button"
                          onClick={() => toggleCapability(cap.id)}
                          className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                            selected
                              ? 'border-primary bg-primary/5 shadow-[var(--glow-primary)]'
                              : 'border-border bg-card hover:border-primary/40'
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                            selected ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-semibold text-foreground text-sm">{cap.label}</div>
                            <div className="text-muted-foreground text-xs mt-0.5">{cap.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2 — Asset Audit */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Image className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Asset Audit</h2>
                  </div>
                  <p className="text-muted-foreground text-sm">Help us understand what assets you already have.</p>

                  {[
                    { key: 'logoStatus', label: 'Logo / Branding', icon: Sparkles },
                    { key: 'copyStatus', label: 'Website Copy / Content', icon: Type },
                    { key: 'imageryStatus', label: 'Photography / Imagery', icon: Camera },
                  ].map((asset) => {
                    const AIcon = asset.icon;
                    return (
                      <div key={asset.key} className="p-5 rounded-xl border-2 border-border bg-card space-y-3">
                        <div className="flex items-center gap-3">
                          <AIcon className="w-5 h-5 text-primary" />
                          <span className="font-semibold text-foreground">{asset.label}</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {assetStatuses.map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => updateField(asset.key, status)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                                form[asset.key as keyof typeof form] === status
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border bg-secondary text-muted-foreground hover:border-primary/40'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* STEP 3 — Timeline & Contact */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">Timeline & Contact</h2>
                  </div>

                  <div className="space-y-3">
                    <Label>Preferred Timeline *</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {timelines.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => updateField('timeline', t.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${
                            form.timeline === t.id
                              ? 'border-primary bg-primary/5'
                              : 'border-border bg-card hover:border-primary/40'
                          }`}
                        >
                          <div className="font-semibold text-foreground text-sm">{t.label}</div>
                          <div className="text-muted-foreground text-xs mt-1">{t.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Budget Range</Label>
                    <div className="flex flex-wrap gap-2">
                      {budgetRanges.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => updateField('budget', b)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all ${
                            form.budget === b
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border bg-secondary text-muted-foreground hover:border-primary/40'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name *</Label>
                      <Input value={form.contactName} onChange={(e) => updateField('contactName', e.target.value)} placeholder="John Doe" className="form-input" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email *</Label>
                      <Input type="email" value={form.contactEmail} onChange={(e) => updateField('contactEmail', e.target.value)} placeholder="john@example.com" className="form-input" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Phone (optional)</Label>
                    <Input value={form.contactPhone} onChange={(e) => updateField('contactPhone', e.target.value)} placeholder="+359 888 123 456" className="form-input" />
                  </div>
                  <div className="space-y-2">
                    <Label>Additional Notes</Label>
                    <Textarea
                      value={form.additionalNotes}
                      onChange={(e) => updateField('additionalNotes', e.target.value)}
                      placeholder="Anything else we should know?"
                      className="form-input min-h-[80px]"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8 pt-6 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={() => goTo(step - 1)}
            disabled={step === 0}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              type="button"
              onClick={() => canProceed() && goTo(step + 1)}
              disabled={!canProceed()}
              className="gap-2 btn-primary"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !canProceed()}
              className="gap-2 btn-primary"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" /> Submit Blueprint
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blueprint;
