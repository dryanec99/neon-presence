import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

function escapeHtml(str: string) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildClassicEmail(data: Record<string, unknown>) {
  const rows = [
    ["Project Name", data.projectName],
    ["Website URL", data.websiteUrl || "N/A"],
    ["Business Goals", data.businessGoals || "N/A"],
    ["Design Styles", (data.designStyles as string[])?.join(", ") || "N/A"],
    ["Technical Requirements", data.technicalRequirements || "N/A"],
    ["Budget Range", data.budgetRange || "N/A"],
    ["Name", data.contactName],
    ["Email", data.contactEmail],
    ["Phone", data.contactPhone || "N/A"],
  ];

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
      <div style="background:#7d3cff;padding:24px 32px;border-radius:12px 12px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:22px;">📋 New Classic Request</h1>
        <p style="color:rgba(255,255,255,0.8);margin:8px 0 0;font-size:14px;">Submitted via the Classic Request Form</p>
      </div>
      <div style="background:#fceed1;padding:24px 32px;border-radius:0 0 12px 12px;">
        <table style="width:100%;border-collapse:collapse;">
          ${rows.map(([label, val]) => `
            <tr>
              <td style="padding:12px 8px;font-weight:600;border-bottom:1px solid #e8d9b8;vertical-align:top;width:180px;color:#333;">${label}</td>
              <td style="padding:12px 8px;border-bottom:1px solid #e8d9b8;color:#555;">${escapeHtml(val as string)}</td>
            </tr>
          `).join("")}
        </table>
      </div>
    </div>
  `;
}

function buildBlueprintEmail(data: Record<string, unknown>) {
  const capLabels: Record<string, string> = {
    ecommerce: "E-Commerce",
    seo: "SEO Optimization",
    multilingual: "Multi-Language",
    customDesign: "Custom Design",
    cms: "CMS Integration",
    responsive: "Mobile-First",
    analytics: "Analytics & Tracking",
    security: "Advanced Security",
  };

  const timelineLabels: Record<string, string> = {
    urgent: "ASAP (2–4 weeks)",
    standard: "Standard (4–8 weeks)",
    relaxed: "Flexible (8–12 weeks)",
    ongoing: "Ongoing Retainer",
  };

  const caps = ((data.capabilities as string[]) || []).map((c) => capLabels[c] || c).join(", ");

  const sections = [
    { title: "🏢 Identity & Vision", rows: [
      ["Company", data.companyName],
      ["Industry", data.industry || "N/A"],
      ["Website", data.websiteUrl || "N/A"],
      ["Vision & Goals", data.vision],
    ]},
    { title: "⚙️ Capabilities", rows: [
      ["Selected", caps || "None"],
    ]},
    { title: "🎨 Asset Audit", rows: [
      ["Logo / Branding", data.logoStatus],
      ["Copy / Content", data.copyStatus],
      ["Photography", data.imageryStatus],
    ]},
    { title: "📅 Timeline & Budget", rows: [
      ["Timeline", timelineLabels[data.timeline as string] || data.timeline],
      ["Budget", data.budget || "N/A"],
    ]},
    { title: "👤 Contact", rows: [
      ["Name", data.contactName],
      ["Email", data.contactEmail],
      ["Phone", data.contactPhone || "N/A"],
      ["Notes", data.additionalNotes || "N/A"],
    ]},
  ];

  return `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
      <div style="background:linear-gradient(135deg,#7d3cff,#6366f1);padding:32px;border-radius:12px 12px 0 0;">
        <h1 style="color:#fff;margin:0;font-size:24px;">🏗️ New Blueprint Discovery</h1>
        <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">Premium project blueprint submitted</p>
      </div>
      <div style="background:#fceed1;padding:8px 32px 32px;border-radius:0 0 12px 12px;">
        ${sections.map((s) => `
          <h2 style="color:#7d3cff;font-size:16px;margin:24px 0 12px;border-bottom:2px solid #7d3cff;padding-bottom:6px;">${s.title}</h2>
          <table style="width:100%;border-collapse:collapse;">
            ${s.rows.map(([label, val]) => `
              <tr>
                <td style="padding:10px 8px;font-weight:600;vertical-align:top;width:160px;color:#333;">${label}</td>
                <td style="padding:10px 8px;color:#555;">${escapeHtml(val as string)}</td>
              </tr>
            `).join("")}
          </table>
        `).join("")}
      </div>
    </div>
  `;
}

function buildTechnicalBriefEmail(data: Record<string, unknown>) {
  const designLabels: Record<string, string> = {
    minimalist: "Minimalist / Clean",
    bold: "Bold / Dramatic",
    corporate: "Corporate / Professional",
    creative: "Creative / Artistic",
    retro: "Retro / Vintage",
    futuristic: "Futuristic / Tech",
  };

  const techLabels: Record<string, string> = {
    userAccounts: "User Accounts & Auth",
    payments: "Payment Gateways",
    apiIntegrations: "API Integrations",
    multilingual: "Multilingual (EN, FR, BG, RU)",
    blogCms: "Blog / CMS",
    seo: "SEO Optimization",
    analytics: "Analytics & Tracking",
    security: "Advanced Security",
  };

  const contentLabels: Record<string, string> = {
    client: "Client provides all content",
    agency: "Agency writes the copy",
    collaborative: "Collaborative (shared effort)",
    ai: "AI-assisted copywriting",
  };

  const styles = ((data.designStyles as string[]) || []).map((s) => designLabels[s] || s).join(", ");
  const tech = ((data.techScope as string[]) || []).map((t) => techLabels[t] || t).join(", ");
  const files = ((data.fileNames as string[]) || []).join(", ");

  return `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:700px;margin:0 auto;background:#fceed1;border-radius:12px;overflow:hidden;border:2px solid #7d3cff;">
      
      <!-- Header -->
      <div style="background:linear-gradient(135deg,#7d3cff 0%,#6366f1 100%);padding:40px 32px;text-align:center;">
        <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;letter-spacing:-0.5px;">📋 TECHNICAL BRIEF</h1>
        <p style="color:rgba(255,255,255,0.9);margin:12px 0 0;font-size:14px;">Comprehensive Project Specification Document</p>
        <p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:12px;">Submitted: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>

      <div style="padding:32px;">
        
        <!-- Section 1: The Basics -->
        <div style="margin-bottom:28px;">
          <h2 style="color:#7d3cff;font-size:18px;margin:0 0 16px;padding-bottom:8px;border-bottom:3px solid #7d3cff;display:flex;align-items:center;">
            🏢 SECTION 1: THE BASICS
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="background:rgba(125,60,255,0.05);">
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">Project Name</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;font-size:15px;">${escapeHtml(data.projectName as string)}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">Company</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;">${escapeHtml(data.companyName as string)}</td>
            </tr>
            <tr style="background:rgba(125,60,255,0.05);">
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">Current Website</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;">${escapeHtml((data.currentWebsite as string) || "N/A")}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">Primary Goal</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;">${escapeHtml((data.primaryGoal as string) || "N/A")}</td>
            </tr>
          </table>
          ${data.projectDescription ? `
            <div style="margin-top:16px;padding:16px;background:rgba(125,60,255,0.05);border-radius:8px;border-left:4px solid #7d3cff;">
              <strong style="color:#7d3cff;font-size:13px;">PROJECT DESCRIPTION</strong>
              <p style="margin:8px 0 0;color:#333;line-height:1.6;font-size:14px;">${escapeHtml(data.projectDescription as string)}</p>
            </div>
          ` : ""}
        </div>

        <!-- Section 2: Visual Identity -->
        <div style="margin-bottom:28px;">
          <h2 style="color:#7d3cff;font-size:18px;margin:0 0 16px;padding-bottom:8px;border-bottom:3px solid #7d3cff;">
            🎨 SECTION 2: VISUAL IDENTITY & BRANDING
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="background:rgba(125,60,255,0.05);">
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">Design Styles</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;">${escapeHtml(styles || "Not specified")}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">Brand Guidelines</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;">${escapeHtml((data.hasBrandGuidelines as string) || "N/A")}</td>
            </tr>
            <tr style="background:rgba(125,60,255,0.05);">
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">Logo Available</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;">${escapeHtml((data.hasLogo as string) || "N/A")}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">Hi-Res Imagery</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;">${escapeHtml((data.hasImagery as string) || "N/A")}</td>
            </tr>
          </table>
        </div>

        <!-- Section 3: Technical Scope -->
        <div style="margin-bottom:28px;">
          <h2 style="color:#7d3cff;font-size:18px;margin:0 0 16px;padding-bottom:8px;border-bottom:3px solid #7d3cff;">
            ⚙️ SECTION 3: TECHNICAL SCOPE
          </h2>
          <div style="padding:16px;background:rgba(125,60,255,0.05);border-radius:8px;margin-bottom:12px;">
            <strong style="color:#7d3cff;font-size:13px;">REQUIRED FEATURES</strong>
            <p style="margin:8px 0 0;color:#333;font-size:14px;">${escapeHtml(tech || "None selected")}</p>
          </div>
          ${data.technicalChallenges ? `
            <div style="padding:16px;background:#fff;border-radius:8px;border:1px solid #e8d9b8;">
              <strong style="color:#7d3cff;font-size:13px;">SPECIFIC TECHNICAL CHALLENGES</strong>
              <p style="margin:8px 0 0;color:#333;line-height:1.6;font-size:14px;">${escapeHtml(data.technicalChallenges as string)}</p>
            </div>
          ` : ""}
        </div>

        <!-- Section 4: Content Strategy -->
        <div style="margin-bottom:28px;">
          <h2 style="color:#7d3cff;font-size:18px;margin:0 0 16px;padding-bottom:8px;border-bottom:3px solid #7d3cff;">
            💬 SECTION 4: CONTENT STRATEGY
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="background:rgba(125,60,255,0.05);">
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">Content Provider</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;">${escapeHtml(contentLabels[data.contentProvider as string] || "N/A")}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">AI Copywriting</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;">${data.needsAiCopy ? "✅ Yes, interested" : "❌ No"}</td>
            </tr>
          </table>
        </div>

        <!-- Section 5: Logistics -->
        <div style="margin-bottom:28px;">
          <h2 style="color:#7d3cff;font-size:18px;margin:0 0 16px;padding-bottom:8px;border-bottom:3px solid #7d3cff;">
            💰 SECTION 5: LOGISTICS & INVESTMENT
          </h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr style="background:rgba(125,60,255,0.05);">
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">Launch Date</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;font-weight:600;">${escapeHtml((data.launchDate as string) || "Flexible")}</td>
            </tr>
            <tr>
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">Budget Range</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;font-weight:600;">${escapeHtml((data.budgetRange as string) || "To be discussed")}</td>
            </tr>
            ${files ? `
            <tr style="background:rgba(125,60,255,0.05);">
              <td style="padding:12px 16px;font-weight:700;width:180px;color:#333;border-bottom:1px solid #e8d9b8;">Attached Files</td>
              <td style="padding:12px 16px;color:#222;border-bottom:1px solid #e8d9b8;">${escapeHtml(files)}</td>
            </tr>
            ` : ""}
          </table>
        </div>

        <!-- Contact Info -->
        <div style="background:linear-gradient(135deg,#7d3cff,#6366f1);padding:24px;border-radius:12px;color:#fff;">
          <h3 style="margin:0 0 16px;font-size:16px;">👤 CONTACT INFORMATION</h3>
          <table style="width:100%;">
            <tr>
              <td style="padding:6px 0;font-weight:600;width:100px;">Name:</td>
              <td style="padding:6px 0;">${escapeHtml(data.contactName as string)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0;font-weight:600;">Email:</td>
              <td style="padding:6px 0;"><a href="mailto:${escapeHtml(data.contactEmail as string)}" style="color:#f2d53c;">${escapeHtml(data.contactEmail as string)}</a></td>
            </tr>
            ${data.contactPhone ? `
            <tr>
              <td style="padding:6px 0;font-weight:600;">Phone:</td>
              <td style="padding:6px 0;">${escapeHtml(data.contactPhone as string)}</td>
            </tr>
            ` : ""}
          </table>
        </div>

        ${data.additionalNotes ? `
        <div style="margin-top:20px;padding:16px;background:#fff;border-radius:8px;border:1px solid #e8d9b8;">
          <strong style="color:#7d3cff;font-size:13px;">ADDITIONAL NOTES</strong>
          <p style="margin:8px 0 0;color:#333;line-height:1.6;font-size:14px;">${escapeHtml(data.additionalNotes as string)}</p>
        </div>
        ` : ""}

      </div>

      <!-- Footer -->
      <div style="background:#333;padding:20px 32px;text-align:center;">
        <p style="color:#999;margin:0;font-size:12px;">This technical brief was submitted via MiForgiX Dev's Request Brief system.</p>
        <p style="color:#7d3cff;margin:8px 0 0;font-size:11px;">Reply directly to this email to contact the client.</p>
      </div>

    </div>
  `;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { formType } = body;

    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const isBlueprint = formType === "blueprint";
    const isBrief = formType === "brief";
    
    let subject: string;
    let html: string;
    
    if (isBrief) {
      subject = `📋 TECHNICAL BRIEF — ${body.projectName || "Unknown"} (${body.companyName || "Unknown"})`;
      html = buildTechnicalBriefEmail(body);
    } else if (isBlueprint) {
      subject = `NEW BLUEPRINT DISCOVERY — ${body.companyName || "Unknown"}`;
      html = buildBlueprintEmail(body);
    } else {
      subject = `NEW CLASSIC REQUEST — ${body.projectName || "Unknown"}`;
      html = buildClassicEmail(body);
    }
    
    const replyTo = body.contactEmail || body.email;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "MiForgiX Dev <noreply@miforgixdev.com>",
        to: ["homer_bart@abv.bg"],
        subject,
        html,
        reply_to: replyTo,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      console.error("Resend error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
