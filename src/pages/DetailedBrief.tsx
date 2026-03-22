import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import {
  User, Briefcase, Globe, Palette, Layout, ShieldCheck, Lock,
  Truck, CreditCard, MessageCircle, BarChart3, Mail, Share2,
  CheckCircle2, ChevronRight, ChevronLeft, FileText, Monitor,
  Smartphone, ShoppingCart, Search, Bot, Megaphone, Settings,
  Video, Users, Filter, Tag, Bell, Zap, Eye, Copy, Menu as MenuIcon,
  Calendar, DollarSign, Send, ArrowUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

const TOTAL_STEPS = 8; // 7 sections + 1 review

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  proposedDomain: string;
  isRedesign: boolean;
  currentWebsite: string;
  designInnovative: boolean;
  designResponsive: boolean;
  contentProtection: boolean;
  menuStructure: string;
  adminPanel: boolean;
  employeeRoles: string;
  videoTraining: boolean;
  sslCertificate: boolean;
  gdprCompliance: boolean;
  onPageSeo: boolean;
  cacheOptimization: boolean;
  robotTxt: boolean;
  isEcommerce: boolean;
  courierEcont: boolean;
  courierSpeedy: boolean;
  courierBoxNow: boolean;
  paymentCod: boolean;
  paymentBank: boolean;
  paymentCard: boolean;
  filterPrice: boolean;
  filterCategory: boolean;
  filterColor: boolean;
  chatMessenger: boolean;
  chatWhatsApp: boolean;
  chatViber: boolean;
  googleAnalytics: boolean;
  searchConsole: boolean;
  emailMailchimp: boolean;
  emailBrevo: boolean;
  popupSystem: boolean;
  socialSync: boolean;
  projectDescription: string;
  budgetRange: string;
  launchDate: string;
  additionalNotes: string;
}

const initialData: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  projectType: "", proposedDomain: "", isRedesign: false, currentWebsite: "",
  designInnovative: false, designResponsive: true, contentProtection: false, menuStructure: "",
  adminPanel: true, employeeRoles: "", videoTraining: false,
  sslCertificate: true, gdprCompliance: true, onPageSeo: true, cacheOptimization: false, robotTxt: false,
  isEcommerce: false,
  courierEcont: false, courierSpeedy: false, courierBoxNow: false,
  paymentCod: false, paymentBank: false, paymentCard: false,
  filterPrice: false, filterCategory: false, filterColor: false,
  chatMessenger: false, chatWhatsApp: false, chatViber: false,
  googleAnalytics: true, searchConsole: true, emailMailchimp: false, emailBrevo: false,
  popupSystem: false, socialSync: false,
  projectDescription: "", budgetRange: "", launchDate: "", additionalNotes: "",
};

function FeatureTile({
  icon: Icon, label, active, onClick
}: { icon: React.ElementType; label: string; active: boolean; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all cursor-pointer text-center min-h-[100px] justify-center ${
        active
          ? "border-[#7d3cff] bg-[#7d3cff]/10 text-[#7d3cff] shadow-lg shadow-[#7d3cff]/20"
          : "border-border bg-card hover:border-[#7d3cff]/40"
      }`}
    >
      <Icon className={`w-6 h-6 ${active ? "text-[#f2d53c]" : "text-muted-foreground"}`} />
      <span className="text-xs font-medium leading-tight">{label}</span>
      {active && <CheckCircle2 className="w-4 h-4 text-[#7d3cff]" />}
    </motion.button>
  );
}

export default function DetailedBrief() {
  const { t } = useTranslation();
  const { lang } = useParams();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const db = t("detailedBrief", { returnObjects: true }) as Record<string, any>;

  const stepKeys = ["personal", "project", "design", "technical", "seo", "ecommerce", "marketing", "review"];

  const completedSections = useMemo(() => {
    const c: boolean[] = [];
    c[0] = !!(form.firstName && form.lastName && form.email);
    c[1] = !!form.projectType;
    c[2] = form.designInnovative || form.designResponsive || form.contentProtection || !!form.menuStructure;
    c[3] = form.adminPanel || form.videoTraining || !!form.employeeRoles;
    c[4] = form.sslCertificate || form.gdprCompliance || form.onPageSeo;
    c[5] = form.isEcommerce;
    c[6] = form.googleAnalytics || form.searchConsole || form.emailMailchimp || form.socialSync;
    c[7] = false;
    return c;
  }, [form]);

  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  const set = (key: keyof FormData, val: any) => setForm(prev => ({ ...prev, [key]: val }));
  const toggle = (key: keyof FormData) => setForm(prev => ({ ...prev, [key]: !prev[key] }));

  const handleSubmit = async () => {
    if (!form.firstName || !form.email) {
      toast({ title: "Error", description: db.validation?.required || "Please fill in required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-intake", {
        body: { ...form, formType: "detailed-brief", contactName: `${form.firstName} ${form.lastName}`, contactEmail: form.email, contactPhone: form.phone },
      });
      if (error) throw error;
      setSubmitted(true);
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to submit", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <>
        <SEOHead title="Brief Submitted" description="Your detailed project brief has been submitted." />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md mx-auto px-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }} className="w-20 h-20 rounded-full bg-[#7d3cff]/20 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-[#7d3cff]" />
            </motion.div>
            <h2 className="text-2xl font-bold mb-3">{db.successTitle}</h2>
            <p className="text-muted-foreground mb-6">{db.successMessage}</p>
            <Button onClick={() => window.location.href = `/${lang}`} className="bg-[#7d3cff] hover:bg-[#6a2ee0]">{db.successButton}</Button>
          </motion.div>
        </div>
      </>
    );
  }

  const renderStep = () => {
    switch (step) {
      case 0: return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>{db.fields?.firstName} *</Label><Input value={form.firstName} onChange={e => set("firstName", e.target.value)} /></div>
            <div><Label>{db.fields?.lastName} *</Label><Input value={form.lastName} onChange={e => set("lastName", e.target.value)} /></div>
          </div>
          <div><Label>{db.fields?.email} *</Label><Input type="email" value={form.email} onChange={e => set("email", e.target.value)} /></div>
          <div><Label>{db.fields?.phone}</Label><Input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} /></div>
        </div>
      );
      case 1: return (
        <div className="space-y-4">
          <div>
            <Label>{db.fields?.projectType} *</Label>
            <Select value={form.projectType} onValueChange={v => set("projectType", v)}>
              <SelectTrigger><SelectValue placeholder={db.fields?.selectType} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="online-store">{db.projectTypes?.onlineStore}</SelectItem>
                <SelectItem value="info-site">{db.projectTypes?.infoSite}</SelectItem>
                <SelectItem value="catalog">{db.projectTypes?.catalog}</SelectItem>
                <SelectItem value="webapp">{db.projectTypes?.webapp}</SelectItem>
                <SelectItem value="landing">{db.projectTypes?.landing}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div><Label>{db.fields?.proposedDomain}</Label><Input value={form.proposedDomain} onChange={e => set("proposedDomain", e.target.value)} placeholder="example.com" /></div>
          <div className="flex items-center gap-3">
            <Switch checked={form.isRedesign} onCheckedChange={() => toggle("isRedesign")} />
            <Label>{db.fields?.isRedesign}</Label>
          </div>
          {form.isRedesign && (
            <div><Label>{db.fields?.currentWebsite}</Label><Input value={form.currentWebsite} onChange={e => set("currentWebsite", e.target.value)} /></div>
          )}
          <div><Label>{db.fields?.projectDescription}</Label><Textarea value={form.projectDescription} onChange={e => set("projectDescription", e.target.value)} rows={4} /></div>
        </div>
      );
      case 2: return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <FeatureTile icon={Zap} label={db.designOptions?.innovative} active={form.designInnovative} onClick={() => toggle("designInnovative")} />
            <FeatureTile icon={Smartphone} label={db.designOptions?.responsive} active={form.designResponsive} onClick={() => toggle("designResponsive")} />
            <FeatureTile icon={Copy} label={db.designOptions?.contentProtection} active={form.contentProtection} onClick={() => toggle("contentProtection")} />
            <FeatureTile icon={MenuIcon} label={db.designOptions?.menuStructure} active={!!form.menuStructure} onClick={() => set("menuStructure", form.menuStructure ? "" : "20")} />
          </div>
          {form.menuStructure !== "" && (
            <div><Label>{db.fields?.menuPages}</Label><Input type="number" value={form.menuStructure} onChange={e => set("menuStructure", e.target.value)} max={50} /></div>
          )}
        </div>
      );
      case 3: return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <FeatureTile icon={Settings} label={db.techOptions?.adminPanel} active={form.adminPanel} onClick={() => toggle("adminPanel")} />
            <FeatureTile icon={Users} label={db.techOptions?.employeeRoles} active={!!form.employeeRoles} onClick={() => set("employeeRoles", form.employeeRoles ? "" : "default")} />
            <FeatureTile icon={Video} label={db.techOptions?.videoTraining} active={form.videoTraining} onClick={() => toggle("videoTraining")} />
          </div>
          {form.employeeRoles && (
            <div><Label>{db.fields?.rolesDescription}</Label><Textarea value={form.employeeRoles === "default" ? "" : form.employeeRoles} onChange={e => set("employeeRoles", e.target.value || "default")} rows={3} /></div>
          )}
        </div>
      );
      case 4: return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <FeatureTile icon={ShieldCheck} label={db.seoOptions?.ssl} active={form.sslCertificate} onClick={() => toggle("sslCertificate")} />
            <FeatureTile icon={Lock} label={db.seoOptions?.gdpr} active={form.gdprCompliance} onClick={() => toggle("gdprCompliance")} />
            <FeatureTile icon={Search} label={db.seoOptions?.onPageSeo} active={form.onPageSeo} onClick={() => toggle("onPageSeo")} />
            <FeatureTile icon={Zap} label={db.seoOptions?.cache} active={form.cacheOptimization} onClick={() => toggle("cacheOptimization")} />
            <FeatureTile icon={FileText} label={db.seoOptions?.robotTxt} active={form.robotTxt} onClick={() => toggle("robotTxt")} />
          </div>
        </div>
      );
      case 5: return (
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Switch checked={form.isEcommerce} onCheckedChange={() => toggle("isEcommerce")} />
            <Label className="text-base font-semibold">{db.ecommerceOptions?.enableEcommerce}</Label>
          </div>
          {form.isEcommerce && (
            <>
              <div>
                <h4 className="font-semibold text-sm mb-3 text-[#7d3cff]">{db.ecommerceOptions?.couriers}</h4>
                <div className="grid grid-cols-3 gap-3">
                  <FeatureTile icon={Truck} label="Econt" active={form.courierEcont} onClick={() => toggle("courierEcont")} />
                  <FeatureTile icon={Truck} label="Speedy" active={form.courierSpeedy} onClick={() => toggle("courierSpeedy")} />
                  <FeatureTile icon={Truck} label="BoxNow" active={form.courierBoxNow} onClick={() => toggle("courierBoxNow")} />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3 text-[#7d3cff]">{db.ecommerceOptions?.payments}</h4>
                <div className="grid grid-cols-3 gap-3">
                  <FeatureTile icon={CreditCard} label={db.paymentMethods?.cod} active={form.paymentCod} onClick={() => toggle("paymentCod")} />
                  <FeatureTile icon={CreditCard} label={db.paymentMethods?.bank} active={form.paymentBank} onClick={() => toggle("paymentBank")} />
                  <FeatureTile icon={CreditCard} label={db.paymentMethods?.card} active={form.paymentCard} onClick={() => toggle("paymentCard")} />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3 text-[#7d3cff]">{db.ecommerceOptions?.filters}</h4>
                <div className="grid grid-cols-3 gap-3">
                  <FeatureTile icon={Filter} label={db.filterOptions?.price} active={form.filterPrice} onClick={() => toggle("filterPrice")} />
                  <FeatureTile icon={Tag} label={db.filterOptions?.category} active={form.filterCategory} onClick={() => toggle("filterCategory")} />
                  <FeatureTile icon={Palette} label={db.filterOptions?.color} active={form.filterColor} onClick={() => toggle("filterColor")} />
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-3 text-[#7d3cff]">{db.ecommerceOptions?.chatbot}</h4>
                <div className="grid grid-cols-3 gap-3">
                  <FeatureTile icon={MessageCircle} label="Messenger" active={form.chatMessenger} onClick={() => toggle("chatMessenger")} />
                  <FeatureTile icon={MessageCircle} label="WhatsApp" active={form.chatWhatsApp} onClick={() => toggle("chatWhatsApp")} />
                  <FeatureTile icon={MessageCircle} label="Viber" active={form.chatViber} onClick={() => toggle("chatViber")} />
                </div>
              </div>
            </>
          )}
        </div>
      );
      case 6: return (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <FeatureTile icon={BarChart3} label="Google Analytics" active={form.googleAnalytics} onClick={() => toggle("googleAnalytics")} />
            <FeatureTile icon={Search} label="Search Console" active={form.searchConsole} onClick={() => toggle("searchConsole")} />
            <FeatureTile icon={Mail} label="Mailchimp" active={form.emailMailchimp} onClick={() => toggle("emailMailchimp")} />
            <FeatureTile icon={Mail} label="Brevo" active={form.emailBrevo} onClick={() => toggle("emailBrevo")} />
            <FeatureTile icon={Bell} label={db.marketingOptions?.popups} active={form.popupSystem} onClick={() => toggle("popupSystem")} />
            <FeatureTile icon={Share2} label={db.marketingOptions?.socialSync} active={form.socialSync} onClick={() => toggle("socialSync")} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <div>
              <Label>{db.fields?.budgetRange}</Label>
              <Select value={form.budgetRange} onValueChange={v => set("budgetRange", v)}>
                <SelectTrigger><SelectValue placeholder={db.fields?.selectBudget} /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="500-1000">€500 – €1,000</SelectItem>
                  <SelectItem value="1000-2500">€1,000 – €2,500</SelectItem>
                  <SelectItem value="2500-5000">€2,500 – €5,000</SelectItem>
                  <SelectItem value="5000-10000">€5,000 – €10,000</SelectItem>
                  <SelectItem value="10000+">€10,000+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{db.fields?.launchDate}</Label>
              <Input type="date" value={form.launchDate} onChange={e => set("launchDate", e.target.value)} />
            </div>
          </div>
          <div><Label>{db.fields?.additionalNotes}</Label><Textarea value={form.additionalNotes} onChange={e => set("additionalNotes", e.target.value)} rows={3} /></div>
        </div>
      );
      case 7: return (
        <div className="space-y-6">
          <ReviewSection title={db.steps?.[0]} items={[
            [db.fields?.firstName, form.firstName],
            [db.fields?.lastName, form.lastName],
            [db.fields?.email, form.email],
            [db.fields?.phone, form.phone || "—"],
          ]} />
          <ReviewSection title={db.steps?.[1]} items={[
            [db.fields?.projectType, form.projectType || "—"],
            [db.fields?.proposedDomain, form.proposedDomain || "—"],
            [db.fields?.isRedesign, form.isRedesign ? "✓" : "✗"],
          ]} />
          <ReviewSection title={db.steps?.[2]} items={[
            [db.designOptions?.innovative, form.designInnovative ? "✓" : "✗"],
            [db.designOptions?.responsive, form.designResponsive ? "✓" : "✗"],
            [db.designOptions?.contentProtection, form.contentProtection ? "✓" : "✗"],
            [db.fields?.menuPages, form.menuStructure || "—"],
          ]} />
          <ReviewSection title={db.steps?.[4]} items={[
            [db.seoOptions?.ssl, form.sslCertificate ? "✓" : "✗"],
            [db.seoOptions?.gdpr, form.gdprCompliance ? "✓" : "✗"],
            [db.seoOptions?.onPageSeo, form.onPageSeo ? "✓" : "✗"],
          ]} />
          {form.isEcommerce && (
            <ReviewSection title={db.steps?.[5]} items={[
              [db.ecommerceOptions?.couriers, [form.courierEcont && "Econt", form.courierSpeedy && "Speedy", form.courierBoxNow && "BoxNow"].filter(Boolean).join(", ") || "—"],
              [db.ecommerceOptions?.payments, [form.paymentCod && "COD", form.paymentBank && "Bank", form.paymentCard && "Card"].filter(Boolean).join(", ") || "—"],
            ]} />
          )}
          <ReviewSection title={db.steps?.[6]} items={[
            ["Google Analytics", form.googleAnalytics ? "✓" : "✗"],
            ["Search Console", form.searchConsole ? "✓" : "✗"],
            [db.fields?.budgetRange, form.budgetRange || "—"],
            [db.fields?.launchDate, form.launchDate || "—"],
          ]} />
          {form.additionalNotes && (
            <div className="p-4 bg-muted/50 rounded-lg border">
              <h4 className="font-semibold text-sm mb-2">{db.fields?.additionalNotes}</h4>
              <p className="text-sm text-muted-foreground">{form.additionalNotes}</p>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <>
      <SEOHead title={db.pageTitle} description={db.pageSubtitle} />
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7d3cff]/30 bg-[#7d3cff]/5 mb-6">
              <FileText className="w-4 h-4 text-[#7d3cff]" />
              <span className="text-sm font-medium text-[#7d3cff]">{db.badge}</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-3xl md:text-5xl font-bold mb-4">
              {db.pageTitle}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {db.pageSubtitle}
            </motion.p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 pb-24 flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="p-4 rounded-xl border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold">{db.progress}</span>
                  <span className="text-sm text-[#7d3cff] font-bold">{progress}%</span>
                </div>
                <Progress value={progress} className="h-2 mb-4" />
                <nav className="space-y-1">
                  {(db.steps as string[])?.map((s: string, i: number) => (
                    <button
                      key={i}
                      onClick={() => setStep(i)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                        step === i ? "bg-[#7d3cff]/10 text-[#7d3cff] font-semibold" : "hover:bg-muted/50"
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        completedSections[i] ? "bg-[#7d3cff] text-white" : step === i ? "border-2 border-[#7d3cff] text-[#7d3cff]" : "border border-muted-foreground/30 text-muted-foreground"
                      }`}>
                        {completedSections[i] ? "✓" : i + 1}
                      </span>
                      <span className="truncate">{s}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0">
            <div className="p-6 md:p-8 rounded-2xl border bg-card">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-[#7d3cff]">{db.steps?.[step]}</h2>
                <p className="text-sm text-muted-foreground mt-1">{db.stepSubtitles?.[step]}</p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button variant="outline" onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>
                  <ChevronLeft className="w-4 h-4 mr-1" /> {db.back}
                </Button>
                {step < TOTAL_STEPS - 1 ? (
                  <Button onClick={() => setStep(s => Math.min(TOTAL_STEPS - 1, s + 1))} className="bg-[#7d3cff] hover:bg-[#6a2ee0]">
                    {db.next} <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit} disabled={submitting} className="bg-[#7d3cff] hover:bg-[#6a2ee0]">
                    {submitting ? "..." : db.submit} <Send className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

function ReviewSection({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div className="p-4 rounded-lg border bg-muted/30">
      <h4 className="font-semibold text-sm text-[#7d3cff] mb-3">{title}</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {items.map(([label, val], i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium">{val}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
