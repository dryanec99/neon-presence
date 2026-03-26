

# Animation & Visual Polish Upgrade

## What's Missing Now

The site has good structure but feels static. The hero background is just two faint gradient blobs, sections appear with basic fade-ins, and there's no ambient motion that makes a site feel "alive." High-end agency sites use continuous subtle movement to create depth.

## Proposed Additions

### 1. Floating Animated Orbs in Hero Background
Replace the static gradient blobs with 3-4 slowly floating, pulsing orbs using CSS animations. Different sizes, colors (primary/accent), and animation durations create organic, parallax-like depth. Pure CSS — no performance cost.

**Files**: `src/pages/Home.tsx` (replace the static gradient divs), `src/index.css` (add `@keyframes float-orbit` with varying durations)

### 2. Animated Gradient Mesh Background
Add a slow-moving gradient that shifts colors subtly across the hero section using CSS `background-position` animation. Creates a "living" backdrop without JavaScript overhead.

**Files**: `src/index.css` (new `.gradient-mesh-animated` class)

### 3. Parallax Scroll Effect on Sections
Create a `ParallaxSection` wrapper component using framer-motion's `useScroll` + `useTransform`. Sections will have a subtle vertical offset as you scroll, creating depth. Apply to the hero mockup and section headings.

**Files**: New `src/components/motion/ParallaxLayer.tsx`

### 4. Animated Counter for Stats
Replace static stat numbers (150+, 98%, 10+, 24/7) with a counting-up animation that triggers when scrolled into view. Numbers roll up from 0 to their final value.

**Files**: New `src/components/motion/AnimatedCounter.tsx`, update `src/pages/Home.tsx`

### 5. Smooth Section Dividers
Replace the hard `border-y-2` lines between sections with animated SVG wave or curve dividers that add visual flow between sections.

**Files**: New `src/components/SectionDivider.tsx`, update `src/pages/Home.tsx`

### 6. Card Tilt/3D Effect on Hover
Upgrade the `MouseGlowCard` to also apply a subtle 3D perspective tilt based on mouse position (rotateX/rotateY). Cards will feel interactive and physical.

**Files**: Update `src/components/motion/MouseGlowCard.tsx`

### 7. Typing Effect on Hero Subtitle
Add a typewriter animation to the hero subtitle text, making it appear character by character after the title reveals.

**Files**: New `src/components/motion/TypeWriter.tsx`, update `src/pages/Home.tsx`

## Technical Notes

- All animations use CSS or framer-motion (already in the project) — no new dependencies
- Animations respect `prefers-reduced-motion` media query
- Performance: floating orbs and gradient mesh are GPU-accelerated CSS transforms
- The 3D card tilt uses `transform: perspective() rotateX() rotateY()` — lightweight

## Summary of Changes

| Component | Effect |
|---|---|
| Hero background | Floating orbs + animated gradient mesh |
| Hero subtitle | Typewriter animation |
| Stats numbers | Count-up animation on scroll |
| MouseGlowCard | 3D tilt on hover |
| Section dividers | SVG wave separators |
| Section headings | Parallax scroll offset |

