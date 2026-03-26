

# Hero Text Fix + Live Website Embed + Services Page Stability

## 3 Changes

### 1. Hero headline: "That Drive Growth." → "Architected for Performance."
Update `home.heroLine2` in all 4 locale files (en, bg, fr, ru) with appropriate translations.

### 2. Browser mockup → Live website iframe embed
Replace the `BrowserMockup` component's image-based approach with actual `<iframe>` embeds of your websites. The browser chrome (URL bar, dots, navigation arrows) stays the same, but instead of `<img>`, render an `<iframe>` pointing to the real URLs.

Changes to `src/components/BrowserMockup.tsx`:
- Update `DEFAULT_PROJECTS` to use real URLs (the existing `.bg` domains)
- Replace `<motion.img>` with `<iframe>` inside the content area
- Add `pointer-events-none` on the iframe wrapper to prevent interaction stealing scroll, with a "Visit Site" overlay button
- Keep the auto-rotate, arrows, and dots navigation

### 3. Services page — add error boundary / loading resilience
The "sometimes nothing loads" issue is likely a race condition with Framer Motion's `AnimatePresence` + `LayoutGroup`. Fix:
- In `src/pages/Services.tsx`, remove `LayoutGroup` wrapper (it can cause blank renders when combined with `AnimatePresence mode="wait"`)
- Add `key={activeTab}` on the grid container to force clean re-renders
- Keep `AnimatePresence` for the transition animation

## Files Changed

| File | What |
|---|---|
| `src/i18n/locales/en.json` | heroLine2 → "Architected for Performance." |
| `src/i18n/locales/bg.json` | heroLine2 → "Проектирани за производителност." |
| `src/i18n/locales/fr.json` | heroLine2 → "Conçus pour la performance." |
| `src/i18n/locales/ru.json` | heroLine2 → "Спроектированы для производительности." |
| `src/components/BrowserMockup.tsx` | Replace `<img>` with `<iframe>`, update default project URLs |
| `src/pages/Services.tsx` | Remove `LayoutGroup`, stabilize AnimatePresence rendering |

## Technical Notes
- Iframes will use `sandbox="allow-scripts allow-same-origin"` and `loading="lazy"` for security and performance
- The iframe will have `pointer-events-none` by default to prevent scroll hijacking, with a clickable overlay to open the site in a new tab
- Removing `LayoutGroup` from Services fixes the intermittent blank-render bug without losing the tab-switch animation

