import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Send, CheckCircle } from 'lucide-react';

const designStyles = [
  'Minimalist / Clean',
  'Bold / Creative',
  'Corporate / Professional',
  'Elegant / Luxury',
  'Playful / Fun',
  'Tech / Modern',
];

const budgetRanges = [
  '€500 – €1,500',
  '€1,500 – €3,000',
  '€3,000 – €7,000',
  '€7,000 – €15,000',
  '€15,000+',
];

const RequestForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    projectName: '',
    websiteUrl: '',
    businessGoals: '',
    designStyles: [] as string[],
    technicalRequirements: '',
    budgetRange: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
  });

  const updateField = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleDesignStyle = (style: string) =>
    setForm((prev) => ({
      ...prev,
      designStyles: prev.designStyles.includes(style)
        ? prev.designStyles.filter((s) => s !== style)
        : [...prev.designStyles, style],
    }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.projectName || !form.contactName || !form.contactEmail) {
      toast({ title: 'Please fill in all required fields', variant: 'destructive' });
      return;
    }
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke('send-intake', {
        body: { ...form, formType: 'classic' },
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
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-3">Request Received</h1>
          <p className="text-muted-foreground">
            Thank you! We've received your project request and will get back to you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Project <span className="text-primary">Request</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Fill out the details below and our team will prepare a tailored proposal for you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Project Info */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
              Project Information
            </h2>
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                placeholder="e.g. Company Rebrand Website"
                value={form.projectName}
                onChange={(e) => updateField('projectName', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">Current Website URL (if any)</Label>
              <Input
                id="websiteUrl"
                placeholder="https://example.com"
                value={form.websiteUrl}
                onChange={(e) => updateField('websiteUrl', e.target.value)}
                className="form-input"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessGoals">Business Goals</Label>
              <Textarea
                id="businessGoals"
                placeholder="What do you want to achieve with this project?"
                value={form.businessGoals}
                onChange={(e) => updateField('businessGoals', e.target.value)}
                className="form-input min-h-[100px]"
              />
            </div>
          </section>

          {/* Design Style */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
              Design Style
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {designStyles.map((style) => (
                <label
                  key={style}
                  className="flex items-center gap-3 p-3 rounded-lg border-2 border-border bg-card cursor-pointer hover:border-primary/50 transition-colors"
                >
                  <Checkbox
                    checked={form.designStyles.includes(style)}
                    onCheckedChange={() => toggleDesignStyle(style)}
                  />
                  <span className="text-sm text-foreground">{style}</span>
                </label>
              ))}
            </div>
          </section>

          {/* Technical Requirements */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
              Technical Requirements
            </h2>
            <Textarea
              placeholder="Describe any specific technical needs: CMS, e-commerce, integrations, multi-language, etc."
              value={form.technicalRequirements}
              onChange={(e) => updateField('technicalRequirements', e.target.value)}
              className="form-input min-h-[120px]"
            />
          </section>

          {/* Budget */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
              Budget Range
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {budgetRanges.map((range) => (
                <label
                  key={range}
                  className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-colors text-sm font-medium ${
                    form.budgetRange === range
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-border bg-card text-foreground hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="budget"
                    value={range}
                    checked={form.budgetRange === range}
                    onChange={(e) => updateField('budgetRange', e.target.value)}
                    className="sr-only"
                  />
                  {range}
                </label>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section className="space-y-5">
            <h2 className="text-xl font-semibold text-foreground border-b border-border pb-2">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Full Name *</Label>
                <Input
                  id="contactName"
                  placeholder="John Doe"
                  value={form.contactName}
                  onChange={(e) => updateField('contactName', e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="john@example.com"
                  value={form.contactEmail}
                  onChange={(e) => updateField('contactEmail', e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactPhone">Phone (optional)</Label>
              <Input
                id="contactPhone"
                placeholder="+359 888 123 456"
                value={form.contactPhone}
                onChange={(e) => updateField('contactPhone', e.target.value)}
                className="form-input"
              />
            </div>
          </section>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-14 text-base font-semibold btn-primary rounded-xl"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Sending…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-5 h-5" /> Submit Request
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RequestForm;
