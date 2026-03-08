import { useState, useRef, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import {
  Building2, Globe, Target, Palette, Code2, FileText, CalendarIcon,
  DollarSign, Upload, Send, Sparkles, CheckCircle, User, Mail,
  Phone, Briefcase, Eye, PenTool, Languages, Search, ShoppingCart,
  Shield, BarChart3, MessageSquare, Bot, Clock, FileUp, X,
} from 'lucide-react';

/* ─── CONSTANTS ─── */
const DESIGN_STYLES = [
  { id: 'minimalist', label: 'Minimalist / Clean' },
  { id: 'bold', label: 'Bold / Dramatic' },
  { id: 'corporate', label: 'Corporate / Professional' },
  { id: 'creative', label: 'Creative / Artistic' },
  { id: 'retro', label: 'Retro / Vintage' },
  { id: 'futuristic', label: 'Futuristic / Tech' },
];

const TECH_SCOPE = [
  { id: 'userAccounts', label: 'User Accounts & Auth', icon: User },
  { id: 'payments', label: 'Payment Gateways', icon: ShoppingCart },
  { id: 'apiIntegrations', label: 'API Integrations', icon: Code2 },
  { id: 'multilingual', label: 'Multilingual (EN, FR, BG, RU)', icon: Languages },
  { id: 'blogCms', label: 'Blog / CMS', icon: FileText },
  { id: 'seo', label: 'SEO Optimization', icon: Search },
  { id: 'analytics', label: 'Analytics & Tracking', icon: BarChart3 },
  { id: 'security', label: 'Advanced Security', icon: Shield },
];

const BUDGET_TIERS = [
  '€3,000 – €5,000',
  '€5,000 – €10,000',
  '€10,000 – €20,000',
  '€20,000 – €50,000',
  '€50,000+',
];

const CONTENT_PROVIDERS = [
  { id: 'client', label: 'We provide all content' },
  { id: 'agency', label: 'Agency writes the copy' },
  { id: 'collaborative', label: 'Collaborative (shared effort)' },
  { id: 'ai', label: 'AI-assisted copywriting' },
];

const SECTIONS = [
  { id: 'basics', label: 'The Basics', icon: Building2 },
  { id: 'branding', label: 'Visual Identity', icon: Palette },
  { id: 'technical', label: 'Technical Scope', icon: Code2 },
  { id: 'content', label: 'Content Strategy', icon: MessageSquare },
  { id: 'logistics', label: 'Logistics & Investment', icon: DollarSign },
];

/* ─── COMPONENT ─── */
const RequestBrief = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeSection, setActiveSection] = useState('basics');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const [form, setForm] = useState({
    projectName: '',
    companyName: '',
    currentWebsite: '',
    primaryGoal: '',
    projectDescription: '',
    designStyles: [] as string[],
    hasBrandGuidelines: '',
    hasLogo: '',
    hasImagery: '',
    techScope: [] as string[],
    technicalChallenges: '',
    contentProvider: '',
    needsAiCopy: false,
    launchDate: undefined as Date | undefined,
    budgetRange: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    additionalNotes: '',
  });

  const updateField = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleArrayField = (field: 'designStyles' | 'techScope', id: string) =>
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(id)
        ? prev[field].filter((v) => v !== id)
        : [...prev[field], id],
    }));

  /* ─── Scroll spy ─── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );
    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* ─── Completion % ─── */
  const completionPct = useCallback(() => {
    let filled = 0;
    let total = 10;
    if (form.projectName) filled++;
    if (form.companyName) filled++;
    if (form.primaryGoal) filled++;
    if (form.designStyles.length > 0) filled++;
    if (form.techScope.length > 0) filled++;
    if (form.contentProvider) filled++;
    if (form.budgetRange) filled++;
    if (form.contactName) filled++;
    if (form.contactEmail) filled++;
    if (form.launchDate) filled++;
    return Math.round((filled / total) * 100);
  }, [form]);

  /* ─── File upload ─── */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).slice(0, 10);
    setUploadedFiles((prev) => [...prev, ...files].slice(0, 10));
  };

  const removeFile = (idx: number) =>
    setUploadedFiles((prev) => prev.filter((_, i) => i !== idx));

  /* ─── Submit ─── */
  const handleSubmit = async () => {
    if (!form.projectName || !form.contactName || !form.contactEmail) {
      toast({ title: 'Please fill in required fields (Project Name, Name, Email)', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    try {
      const payload = {
        ...form,
        formType: 'brief',
        launchDate: form.launchDate ? format(form.launchDate, 'PPP') : 'Not specified',
        fileNames: uploadedFiles.map((f) => f.name),
      };
      const { error } = await supabase.functions.invoke('send-intake', { body: payload });
      if (error) throw error;
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      toast({ title: 'Submission failed. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ─── Success state ─── */
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
          <h1 className="text-4xl font-bold text-foreground mb-4">Brief Submitted</h1>
          <p className="text-muted-foreground text-lg">
            Your comprehensive technical brief has been received. Our team will review every detail and respond within 24 hours.
          </p>
        </motion.div>
      </div>
    );
  }

  /* ─── Section wrapper ─── */
  const Section = ({
    id,
    title,
    subtitle,
    icon: Icon,
    children,
  }: {
    id: string;
    title: string;
    subtitle: string;
    icon: React.ElementType;
    children: React.ReactNode;
  }) => (
    <section
      id={id}
      ref={(el: HTMLDivElement | null) => { sectionRefs.current[id] = el; }}
      className="scroll-mt-24"
    >
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">{title}</h2>
          <p className="text-primary font-medium text-sm mt-1">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-5 pl-0 md:pl-16">{children}</div>
      <Separator className="my-10" />
    </section>
  );

  /* ─── Render ─── */
  return (
    <div className="min-h-screen bg-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-foreground mb-4"
          >
            Project <span className="text-primary">Technical Brief</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg"
          >
            This comprehensive document helps us understand every facet of your project.
            The more detail you provide, the more precise our proposal will be.
          </motion.p>
        </div>

        <div className="flex gap-8 max-w-6xl mx-auto relative">
          {/* ─── Main Form ─── */}
          <div className="flex-1 min-w-0">
            {/* Section 1: The Basics */}
            <Section
              id="basics"
              title="The Basics"
              subtitle="Establishing the foundation — who you are and what you need."
              icon={Building2}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold">Project Name *</Label>
                  <Input
                    value={form.projectName}
                    onChange={(e) => updateField('projectName', e.target.value)}
                    placeholder="e.g. Corporate Rebrand 2026"
                    className="form-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold">Company Name *</Label>
                  <Input
                    value={form.companyName}
                    onChange={(e) => updateField('companyName', e.target.value)}
                    placeholder="e.g. Acme Industries"
                    className="form-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Current Website</Label>
                <Input
                  value={form.currentWebsite}
                  onChange={(e) => updateField('currentWebsite', e.target.value)}
                  placeholder="https://your-current-site.com"
                  className="form-input"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Primary Business Goal *</Label>
                <Input
                  value={form.primaryGoal}
                  onChange={(e) => updateField('primaryGoal', e.target.value)}
                  placeholder="e.g. Increase online conversions by 40%"
                  className="form-input"
                />
              </div>
              <div className="space-y-2">
                <Label className="font-semibold">Project Description</Label>
                <Textarea
                  value={form.projectDescription}
                  onChange={(e) => updateField('projectDescription', e.target.value)}
                  placeholder="Provide a detailed overview of the project scope, target audience, and desired outcomes..."
                  className="form-input min-h-[160px]"
                />
              </div>
            </Section>

            {/* Section 2: Visual Identity & Branding */}
            <Section
              id="branding"
              title="Visual Identity & Branding"
              subtitle="Defining the look, feel, and emotional tone of your digital presence."
              icon={Palette}
            >
              <div className="space-y-3">
                <Label className="font-semibold">Preferred Design Style</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {DESIGN_STYLES.map((style) => {
                    const checked = form.designStyles.includes(style.id);
                    return (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => toggleArrayField('designStyles', style.id)}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-left transition-all text-sm font-medium',
                          checked
                            ? 'border-primary bg-primary/5 text-primary'
                            : 'border-border bg-card text-foreground hover:border-primary/40'
                        )}
                      >
                        <Checkbox checked={checked} className="pointer-events-none" />
                        {style.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {[
                { key: 'hasBrandGuidelines', label: 'Do you have Brand Guidelines?', icon: Briefcase },
                { key: 'hasLogo', label: 'Do you have a Logo?', icon: PenTool },
                { key: 'hasImagery', label: 'Do you have High-Resolution Imagery?', icon: Eye },
              ].map((q) => (
                <div key={q.key} className="space-y-2">
                  <Label className="font-semibold flex items-center gap-2">
                    <q.icon className="w-4 h-4 text-primary" /> {q.label}
                  </Label>
                  <div className="flex gap-3">
                    {['Yes', 'No', 'Needs Update'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateField(q.key, opt)}
                        className={cn(
                          'px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all',
                          form[q.key as keyof typeof form] === opt
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border bg-card text-muted-foreground hover:border-primary/40'
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </Section>

            {/* Section 3: Technical Scope */}
            <Section
              id="technical"
              title="Technical Scope"
              subtitle="Mapping the functional requirements and integrations your project demands."
              icon={Code2}
            >
              <div className="space-y-3">
                <Label className="font-semibold">Required Features & Integrations</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TECH_SCOPE.map((tech) => {
                    const Icon = tech.icon;
                    const checked = form.techScope.includes(tech.id);
                    return (
                      <button
                        key={tech.id}
                        type="button"
                        onClick={() => toggleArrayField('techScope', tech.id)}
                        className={cn(
                          'flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all',
                          checked
                            ? 'border-primary bg-primary/5 shadow-[var(--glow-primary)]'
                            : 'border-border bg-card hover:border-primary/40'
                        )}
                      >
                        <div className={cn(
                          'w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                          checked ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
                        )}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className={cn('font-medium text-sm', checked ? 'text-primary' : 'text-foreground')}>
                          {tech.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">Specific Technical Challenges</Label>
                <Textarea
                  value={form.technicalChallenges}
                  onChange={(e) => updateField('technicalChallenges', e.target.value)}
                  placeholder="Describe any complex integrations, migration needs, legacy system compatibility, performance requirements, or third-party APIs..."
                  className="form-input min-h-[140px]"
                />
              </div>
            </Section>

            {/* Section 4: Content Strategy */}
            <Section
              id="content"
              title="Content Strategy"
              subtitle="Understanding who creates, curates, and manages the words on your site."
              icon={MessageSquare}
            >
              <div className="space-y-3">
                <Label className="font-semibold">Who is providing the website text?</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CONTENT_PROVIDERS.map((cp) => (
                    <button
                      key={cp.id}
                      type="button"
                      onClick={() => updateField('contentProvider', cp.id)}
                      className={cn(
                        'px-4 py-3 rounded-xl border-2 text-left text-sm font-medium transition-all',
                        form.contentProvider === cp.id
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border bg-card text-foreground hover:border-primary/40'
                      )}
                    >
                      {cp.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-xl border-2 border-border bg-card">
                <Checkbox
                  checked={form.needsAiCopy}
                  onCheckedChange={(v) => updateField('needsAiCopy', !!v)}
                />
                <div>
                  <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                    <Bot className="w-4 h-4 text-primary" /> AI-Assisted Copywriting
                  </div>
                  <p className="text-muted-foreground text-xs mt-1">
                    We can generate draft copy using AI, then refine it with your input for maximum efficiency.
                  </p>
                </div>
              </div>
            </Section>

            {/* Section 5: Logistics & Investment */}
            <Section
              id="logistics"
              title="Logistics & Investment"
              subtitle="Aligning expectations on timeline, budget, and how to reach you."
              icon={DollarSign}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-primary" /> Expected Launch Date
                  </Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !form.launchDate && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {form.launchDate ? format(form.launchDate, 'PPP') : 'Select a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={form.launchDate}
                        onSelect={(d) => updateField('launchDate', d)}
                        disabled={(d) => d < new Date()}
                        initialFocus
                        className={cn('p-3 pointer-events-auto')}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-primary" /> Budget Range
                  </Label>
                  <Select value={form.budgetRange} onValueChange={(v) => updateField('budgetRange', v)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select budget tier" />
                    </SelectTrigger>
                    <SelectContent>
                      {BUDGET_TIERS.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> Full Name *
                  </Label>
                  <Input
                    value={form.contactName}
                    onChange={(e) => updateField('contactName', e.target.value)}
                    placeholder="John Doe"
                    className="form-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold flex items-center gap-2">
                    <Mail className="w-4 h-4 text-primary" /> Email *
                  </Label>
                  <Input
                    type="email"
                    value={form.contactEmail}
                    onChange={(e) => updateField('contactEmail', e.target.value)}
                    placeholder="john@company.com"
                    className="form-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-semibold flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" /> Phone
                  </Label>
                  <Input
                    value={form.contactPhone}
                    onChange={(e) => updateField('contactPhone', e.target.value)}
                    placeholder="+359 888 123 456"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Upload zone */}
              <div className="space-y-2">
                <Label className="font-semibold flex items-center gap-2">
                  <Upload className="w-4 h-4 text-primary" /> Upload Assets
                </Label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className={cn(
                    'relative rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition-all',
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card hover:border-primary/40'
                  )}
                >
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []).slice(0, 10);
                      setUploadedFiles((prev) => [...prev, ...files].slice(0, 10));
                    }}
                  />
                  <FileUp className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-foreground font-semibold text-sm">Drop files here or click to browse</p>
                  <p className="text-muted-foreground text-xs mt-1">
                    Brand guidelines, logos, wireframes, reference images (max 10 files)
                  </p>
                </div>
                {uploadedFiles.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {uploadedFiles.map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm text-foreground"
                      >
                        <FileText className="w-3 h-3 text-primary" />
                        <span className="max-w-[120px] truncate">{f.name}</span>
                        <button onClick={() => removeFile(i)} className="text-muted-foreground hover:text-destructive">
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="font-semibold">Additional Notes</Label>
                <Textarea
                  value={form.additionalNotes}
                  onChange={(e) => updateField('additionalNotes', e.target.value)}
                  placeholder="Anything else we should know? Competitor references, past experiences, specific concerns..."
                  className="form-input min-h-[120px]"
                />
              </div>

              {/* Submit */}
              <div className="pt-4">
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto gap-2 text-base px-10 py-6"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-5 h-5 animate-spin" /> Submitting…
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" /> Submit Technical Brief
                    </>
                  )}
                </Button>
              </div>
            </Section>
          </div>

          {/* ─── Sticky Sidebar (Desktop) ─── */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28 space-y-6">
              {/* Progress card */}
              <div className="rounded-2xl border-2 border-border bg-card p-5 space-y-4">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <Target className="w-4 h-4 text-primary" /> Brief Progress
                </h3>
                <Progress value={completionPct()} className="h-2" />
                <p className="text-xs text-muted-foreground">{completionPct()}% complete</p>

                <div className="space-y-1">
                  {SECTIONS.map((s) => {
                    const Icon = s.icon;
                    const isActive = activeSection === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => scrollToSection(s.id)}
                        className={cn(
                          'flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all',
                          isActive
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                        )}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        {s.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live summary card */}
              <div className="rounded-2xl border-2 border-border bg-card p-5 space-y-3">
                <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                  <FileText className="w-4 h-4 text-primary" /> Brief Summary
                </h3>
                <div className="space-y-2 text-xs">
                  {form.projectName && (
                    <div>
                      <span className="text-muted-foreground">Project:</span>{' '}
                      <span className="text-foreground font-medium">{form.projectName}</span>
                    </div>
                  )}
                  {form.companyName && (
                    <div>
                      <span className="text-muted-foreground">Company:</span>{' '}
                      <span className="text-foreground font-medium">{form.companyName}</span>
                    </div>
                  )}
                  {form.designStyles.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Style:</span>{' '}
                      <span className="text-foreground font-medium">
                        {form.designStyles.map((id) => DESIGN_STYLES.find((s) => s.id === id)?.label).join(', ')}
                      </span>
                    </div>
                  )}
                  {form.techScope.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Tech:</span>{' '}
                      <span className="text-foreground font-medium">
                        {form.techScope.length} feature{form.techScope.length > 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                  {form.budgetRange && (
                    <div>
                      <span className="text-muted-foreground">Budget:</span>{' '}
                      <span className="text-foreground font-medium">{form.budgetRange}</span>
                    </div>
                  )}
                  {form.launchDate && (
                    <div>
                      <span className="text-muted-foreground">Launch:</span>{' '}
                      <span className="text-foreground font-medium">{format(form.launchDate, 'PPP')}</span>
                    </div>
                  )}
                  {uploadedFiles.length > 0 && (
                    <div>
                      <span className="text-muted-foreground">Files:</span>{' '}
                      <span className="text-foreground font-medium">{uploadedFiles.length} attached</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default RequestBrief;
