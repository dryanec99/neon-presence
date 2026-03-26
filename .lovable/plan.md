

# Hero Section Text & Layout Fixes

## What Changes

### 1. Update hero headline text
Replace "Precision Engineering. / Accelerated Delivery." with something more natural and client-facing. New copy:
- **Line 1**: "We Build Digital Products"
- **Line 2**: "That Drive Growth."

### 2. Remove the purple "Digital Studio" badge
Delete the badge pill element above the headline (lines 85-93 in Home.tsx). Update `hero.badge` key removal or just remove the JSX.

### 3. Replace the glassmorphic dashboard with a scrollable project showcase
Remove the fake dashboard (metrics, chart bars, status bar) on the right side of the hero. Replace it with the existing `BrowserMockup` component which already has auto-rotating project screenshots with navigation arrows and dot indicators. This lets visitors see real work samples right in the hero.

### 4. Fix the CTA section phrase
Replace "Ready to Transform Your Digital Presence?" with something direct like "Let's Build Something Great Together" across all 4 locale files.

## Files Changed

| File | What |
|---|---|
| `src/pages/Home.tsx` | Remove badge, replace dashboard with `BrowserMockup`, update headline keys |
| `src/i18n/locales/en.json` | New heroLine1/2, remove badge, update cta.title |
| `src/i18n/locales/bg.json` | Same translations in Bulgarian |
| `src/i18n/locales/fr.json` | Same translations in French |
| `src/i18n/locales/ru.json` | Same translations in Russian |

## Technical Details

- Import `BrowserMockup` in Home.tsx (already exists at `src/components/BrowserMockup.tsx`)
- The BrowserMockup component already has 4 default projects with auto-rotation, arrows, and dots — no extra config needed
- Remove the entire glassmorphic dashboard block (lines ~148-216) and replace with `<BrowserMockup />`
- The badge JSX block (lines 85-93) gets deleted entirely

