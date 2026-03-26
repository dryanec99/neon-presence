

# Mega Visual & UX Upgrade — All At Once

Everything below will be implemented in a single batch. No more one-by-one.

## 1. Smooth Scroll with Lenis
Add `lenis` for buttery smooth page scrolling across the entire site. Wrap the Layout in a `SmoothScroll` provider.

**New file**: `src/components/motion/SmoothScroll.tsx`
**Edit**: `src/components/Layout.tsx`

## 2. Particle/Sparkle Background on Hero
Add a canvas-based floating particle system behind the hero — tiny glowing dots that drift slowly, creating a starfield effect. Pure canvas, no library needed.

**New file**: `src/components/motion/ParticleField.tsx`
**Edit**: `src/pages/Home.tsx`

## 3. Magnetic Cursor Effect on All CTA Buttons
Already have `MagneticButton` — apply it to every CTA across **all pages** (Services, Portfolio, Pricing, Contact, Blog). Currently only used on Home.

**Edit**: Already mostly done on Home, need to verify Services/Portfolio/Pricing CTAs use it.

## 4. Scroll-Triggered Progress Bar
Add a thin progress bar at the top of the page (under the header) that fills as the user scrolls down. Purple gradient, 3px tall.

**New file**: `src/components/ScrollProgress.tsx`
**Edit**: `src/components/Layout.tsx`

## 5. Animated Page Transitions
Wrap the `<Outlet>` in Layout with framer-motion `AnimatePresence` so pages fade/slide in when navigating between routes.

**Edit**: `src/components/Layout.tsx`

## 6. Floating Orbs on ALL Pages (not just Home)
Move the floating orbs background into the Layout so every page has subtle ambient motion, not just the homepage.

**Edit**: `src/components/Layout.tsx`, `src/index.css` (adjust orb opacity for non-hero sections)

## 7. "Reveal on Scroll" for Every Section Heading
Add a reusable scroll-reveal wrapper and apply it to section headings on Services, Portfolio, Pricing, Blog, and Contact pages. Currently only Home uses `TextReveal` — extend to all pages.

**Edit**: `src/pages/Services.tsx`, `src/pages/Portfolio.tsx`, `src/pages/Pricing.tsx`, `src/pages/Blog.tsx`, `src/pages/Contact.tsx`

## 8. Staggered Card Animations on All Grids
Wrap card grids on Services bento, Portfolio bento, Pricing tiers, and Blog grid with `StaggerChildren` so they cascade in on scroll. Some pages already have it, others don't.

**Edit**: `src/pages/Blog.tsx`, `src/pages/Contact.tsx`

## 9. Hover Glow + 3D Tilt on Portfolio Cards
Portfolio cards currently use `MouseGlowCard` but the images use basic `bento-item`. Ensure the 3D tilt effect applies to the portfolio grid items.

Already handled by `MouseGlowCard` upgrade.

## 10. Tech Marquee Upgrade
Make the tech marquee on Home smoother with a second row scrolling in the opposite direction, creating a dual-track effect.

**Edit**: `src/pages/Home.tsx`

## 11. Animated Gradient Border on Pricing "Most Popular" Card
Add the `border-beam` rotating gradient animation to the popular pricing card instead of a static purple border.

**Edit**: `src/pages/Pricing.tsx`

## 12. Blog Featured Post Parallax Image
Add a subtle parallax zoom effect to the featured blog post image on scroll.

**Edit**: `src/pages/Blog.tsx`

## 13. Contact Page — Pulsing "Online" Status Dot
Add a green pulsing dot next to the email/phone in the contact sidebar to signal "We're Online."

**Edit**: `src/pages/Contact.tsx`

## 14. Footer — Animated Wave Divider Above
Add an SVG wave divider above the footer for a smooth visual transition.

**Edit**: `src/components/Footer.tsx`

## Summary

| # | What | Files |
|---|---|---|
| 1 | Lenis smooth scroll | New SmoothScroll.tsx, Layout.tsx |
| 2 | Hero particle field | New ParticleField.tsx, Home.tsx |
| 3 | Magnetic buttons everywhere | Services, Portfolio, Pricing verified |
| 4 | Scroll progress bar | New ScrollProgress.tsx, Layout.tsx |
| 5 | Page transitions | Layout.tsx |
| 6 | Floating orbs global | Layout.tsx, index.css |
| 7 | TextReveal on all pages | Services, Portfolio, Pricing, Blog, Contact |
| 8 | StaggerChildren on all grids | Blog, Contact |
| 9 | 3D tilt on portfolio | Already done via MouseGlowCard |
| 10 | Dual-track tech marquee | Home.tsx |
| 11 | Border beam on pricing | Pricing.tsx |
| 12 | Blog parallax image | Blog.tsx |
| 13 | Contact online dot | Contact.tsx |
| 14 | Footer wave divider | Footer.tsx |

No new dependencies except `lenis` (lightweight smooth scroll library). Everything else uses existing framer-motion + CSS.

