

# MiForgiX Dev — Professional Upgrade Plan

## Current Issues

The site has a solid dark theme and structure, but several things hold it back from looking like a real professional agency:

1. **Hero is text-heavy with no visual anchor** — no imagery, mockup, or video. Just text and stat boxes on a black background.
2. **No real proof** — the client marquee uses made-up names (FemmeFlora, DailyMarket). There are no real logos, no Google reviews, no certifications.
3. **Portfolio uses stock photos** — not actual project screenshots from the Netlify demos you already have.
4. **No pricing transparency** — Bulgarian small businesses want to know costs upfront before they call.
5. **Footer still has the "CEO Review" dev section** visible to everyone.
6. **Contact section is minimal** — no phone number, no address, no Google Maps embed.

## Proposed Upgrades (Priority Order)

### 1. Hero Section Overhaul
- Add a **browser mockup component** on the right side showing a real project screenshot (use one of your Netlify demos) instead of the stat boxes.
- Add a subtle **gradient mesh or animated SVG background** behind the hero for visual depth.
- Rewrite the subtitle to speak directly to Bulgarian small businesses: "We build websites that bring customers to your door."
- Add **micro-trust signals** below the CTA: "Trusted by 150+ Bulgarian businesses" with small star rating.

### 2. Trust & Social Proof Section
- Replace the fake client marquee with a **"Why Businesses Choose Us"** section featuring 3 real value propositions with icons (Fast Delivery, Affordable Pricing, Bulgarian Support).
- Add a **Google Reviews embed or styled testimonial cards** with real (or realistic) reviews from Bulgarian business owners.
- Add a **"Technologies We Use"** logo strip (WordPress, WooCommerce, React, etc.) — real tech logos build credibility with savvy clients.

### 3. Portfolio with Real Screenshots
- Replace Unsplash stock images with **actual screenshots of the Netlify demo sites** (FemmeFlora, DailyMarket, SmilePro, Nexus).
- Use a **browser frame mockup** around each screenshot to make them look polished.
- Keep the existing live preview and case study modal functionality.

### 4. Add a Pricing Page (/pricing)
- Create a **3-tier pricing page** (Basic Website / E-commerce / Custom) with clear pricing in BGN.
- Each tier shows: what's included, delivery time, and a CTA to the intake form.
- Add an FAQ section below addressing common Bulgarian client concerns (hosting, domain, support).

### 5. Contact Page Enhancement
- Add a **phone number** prominently.
- Add a **physical address or "We serve all of Bulgaria"** note.
- Embed a **Google Maps** widget or a styled map showing your service area.
- Add business hours.

### 6. Footer Cleanup
- Remove the "CEO Review — Intake Options" dev section.
- Keep the 4-column mega-footer but ensure links all point to real pages.

## Technical Approach

- **Files modified**: `src/pages/Home.tsx`, `src/pages/Portfolio.tsx`, `src/pages/Contact.tsx`, `src/components/Footer.tsx`
- **Files created**: `src/pages/Pricing.tsx`, browser mockup component
- **i18n**: All new text added to all 4 locale files (en, bg, ru, fr)
- **Routing**: Add `/pricing` route to `App.tsx`, add nav link in header

## What This Achieves

A Bulgarian small business owner landing on the site will see: a real project in the hero, clear pricing they can afford, proof from other businesses, and an easy way to call or message you. That's what converts visitors into paying clients.

