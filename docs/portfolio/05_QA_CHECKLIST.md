# 05 — QA Checklist

Use this before any deployment to production (`main` branch → Vercel). Work through each section top to bottom. Mark items `[x]` when confirmed. Do not ship with unresolved `[ ]` items in the Critical tier.

---

## Tier definitions

- **Critical** — blocks ship. Must be resolved.
- **High** — should be resolved before ship. Acceptable to defer one cycle with documented reason.
- **Medium** — quality bar. Ship if time-boxed; track for next pass.
- **Low** — polish. Nice to have.

---

## 1. Content integrity

### Critical

- [ ] No placeholder text is visible anywhere (`lorem ipsum`, `TBD`, `Coming soon`, `[image]`, etc.)
- [ ] No fabricated metrics (`40% uplift`, `2x faster`, `300 users`)
- [ ] No fabricated launch or adoption claims for StockLog or Zgrada Plus
- [ ] Truth layer is present on every case study
- [ ] Truth layer on StockLog correctly limits claims to: product structure, workflow design, UI direction, operational UX logic
- [ ] Truth layer on Zgrada Plus correctly limits claims to: MVP structure, role-based UX, flow design, interface direction, accessibility-aware product logic
- [ ] Truth layer on WineRoom correctly limits claims to: UX/UI optimisation, browsing structure, responsive toolbar, product discovery improvements
- [ ] Contact email is correct: `borismilosavac1985@gmail.com`
- [ ] Location is correct: Munich, Germany
- [ ] Work authorisation is correct: Authorised to work in Germany
- [ ] Copyright year is correct: © 2026 Boris Milosavac
- [ ] Portfolio URL is correct: borism.design

### High

- [ ] All three case study numbers and titles match their section IDs (`01/stocklog`, `02/zgrada-plus`, `03/wineroom`)
- [ ] Case order in nav, hero right column, work index and page flow is consistent
- [ ] AI section truth layer callout is present and accurate
- [ ] Design system truth layer is present and accurate

---

## 2. Navigation and scroll

### Critical

- [ ] Nav "BM" button scrolls to `#top`
- [ ] All five nav buttons scroll to their correct section IDs
- [ ] Smooth scroll works when `lessMotion` preference is off
- [ ] Instant scroll works when `lessMotion` preference is on
- [ ] Hero CTAs scroll to correct sections: `#work`, `#summary`
- [ ] Hero case study preview cards scroll to correct case IDs
- [ ] Work index cards scroll to correct case IDs
- [ ] Contact "Back to top" scrolls to `#top`

### High

- [ ] Nav scroll works on mobile (touch)
- [ ] No sections are unreachable via nav or CTA on any viewport

---

## 3. View options panel

### Critical

- [ ] Panel opens and closes via "View options" button
- [ ] "Larger text" increases font size visibly
- [ ] "Higher contrast" visibly strengthens borders and text contrast
- [ ] "Less motion" disables smooth scroll and suppresses animations
- [ ] "Quick scan" tightens vertical padding across sections
- [ ] Reset button returns all preferences to default
- [ ] Preferences persist across page reload (localStorage)
- [ ] Panel displays correctly on mobile (full-width, not cropped)

### High

- [ ] `aria-expanded` attribute on the toggle button reflects open/closed state
- [ ] Panel buttons show active state clearly (blue border/bg when on)

---

## 4. Responsive layout

### Critical

- [ ] Hero: headline readable at 320px width — no overflow or clip
- [ ] Nav: mobile nav shows only BM wordmark and View options button (center nav items hidden on mobile)
- [ ] Case metadata strip: 5 columns collapse gracefully on mobile
- [ ] Work index 3-column grid collapses to 1 column on mobile

### High

- [ ] Hero two-column grid stacks to single column on mobile
- [ ] Summary 2-column body text stacks on mobile
- [ ] Contact 2-column layout stacks on mobile
- [ ] All `md:grid-cols-*` breakpoints verified at 768px

### Medium

- [ ] No horizontal scroll at any breakpoint from 320px to 1440px
- [ ] `max-w-7xl` container does not clip on 1280px viewports

---

## 5. Accessibility

### Critical

- [ ] All text on dark backgrounds passes WCAG AA contrast (4.5:1 body, 3:1 large)
  - Hero H1 white on slate-950: pass ✓
  - Hero body slate-300 on slate-950: verify
  - Case metadata labels slate-400 on white/10 bg: verify
  - Truth layer amber-100 on amber-300/10: verify
- [ ] All interactive elements are keyboard focusable (nav buttons, CTAs, view options)
- [ ] Focus indicators are visible — not hidden or clipped
- [ ] `aria-label` on nav "BM" button: "Back to top" — verify present (App.tsx:197)
- [ ] `aria-expanded` on view options toggle reflects actual state
- [ ] All images have meaningful `alt` text (once images are added)
- [ ] `lang="en"` is set on `<html>` in index.html ✓

### High

- [ ] `lessMotion` preference disables all CSS animations (via `globals.css` rules)
- [ ] No content is conveyed by colour alone (truth layer amber is labelled "Truth layer" in text)
- [ ] Contact email link is a real `mailto:` — not a `javascript:void(0)`
- [ ] Download CV button triggers a real PDF — not `window.print()` unless intentional

### Medium

- [ ] Tab order follows visual reading order (top to bottom, left to right)
- [ ] No focus traps outside of modal-type elements

---

## 6. Performance

### High

- [ ] Build completes without errors: `pnpm build`
- [ ] No console errors on load in production build
- [ ] No 404s for assets in the network tab

### Medium

- [ ] Images are not larger than needed (2x max for retina, WebP if supported)
- [ ] SVG files are not excessively large (check `src/sl-hero.svg` and `src/SotckLog desktop.svg`)
- [ ] Google Fonts load via `display=swap` (already set in `fonts.css`) ✓

### Low

- [ ] Lighthouse performance score ≥ 90 on desktop
- [ ] Lighthouse accessibility score ≥ 90

---

## 7. SEO and meta

### High

- [ ] `<title>` is set and accurate (index.html) ✓
- [ ] `<meta name="description">` is set and accurate ✓
- [ ] `<meta property="og:title">` is set ✓
- [ ] `<meta property="og:description">` is set ✓
- [ ] `<meta property="og:image">` is set — **currently missing**
- [ ] `<meta property="og:image:alt">` is set ✓ (but image itself is missing)
- [ ] Canonical URL `<link rel="canonical" href="https://borism.design">` — **currently missing**

### Medium

- [ ] `<meta name="robots" content="index, follow">` — not set (acceptable default)
- [ ] OG image is 1200×630px and renders correctly in LinkedIn link preview

---

## 8. Contact actions

### Critical

- [ ] "Email Boris" link uses `mailto:borismilosavac1985@gmail.com`
- [ ] Link opens default email client on click

### High

- [ ] "Download CV / PDF" provides a real downloadable file, not `window.print()` — **currently unresolved**
- [ ] If `window.print()` is intentional for now, confirm print stylesheet produces a readable CV layout

---

## 9. Visual evidence (case studies)

### High

- [ ] StockLog case has at least one image displayed
- [ ] Zgrada Plus case has at least one image displayed
- [ ] WineRoom case has at least one image displayed

### Critical (once images are added)

- [ ] No broken image `src` paths
- [ ] `ImageWithFallback` component is used for all case images
- [ ] All images have `alt` attributes

---

## 10. Code integrity

### High

- [ ] `pnpm build` produces no TypeScript errors
- [ ] `pnpm build` produces no Vite warnings about missing assets
- [ ] No `console.log` statements in production build
- [ ] No unused imports in `App.tsx` (currently: `react-router`, `@mui/*` etc. are installed but unused — acceptable, but track)

### Medium

- [ ] `src/imports/` folder is not included in the production build output (it is source-only, not referenced)
- [ ] `default_shadcn_theme.css` is not imported anywhere unintentionally

---

## Pre-deploy sign-off

Before merging to `main` and triggering Vercel deploy:

| Check | Confirmed by | Date |
|---|---|---|
| Critical content items resolved | | |
| Critical accessibility items resolved | | |
| Critical navigation items resolved | | |
| Build passes cleanly | | |
| Tested on mobile (real device or DevTools) | | |
| Tested on desktop at 1280px and 1440px | | |

---

## Known open items (current state, pre-redesign)

These are confirmed gaps that exist in the live portfolio today. They are tracked here so they are not forgotten during the redesign cycle.

| Item | Tier | Status |
|---|---|---|
| No images in any case study section | High | Open |
| OG image not set | High | Open |
| Canonical URL not set | Medium | Open |
| CV/PDF download uses `window.print()` | High | Open |
| LinkedIn URL not present | High | Open |
| WineRoom live site URL not linked | Medium | Open |
| `Frame 3063.png` and `Frame 3064.png` unidentified | Medium | Open |
| Asset filenames inconsistent (typo in SotckLog) | Low | Open |
| Assets not in `src/assets/` — loose in `src/` | Low | Open |
