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
    const subject = isBlueprint
      ? `NEW BLUEPRINT DISCOVERY — ${body.companyName || "Unknown"}`
      : `NEW CLASSIC REQUEST — ${body.projectName || "Unknown"}`;
    const html = isBlueprint ? buildBlueprintEmail(body) : buildClassicEmail(body);
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
