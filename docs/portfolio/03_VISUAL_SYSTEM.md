# 03 — Visual System

## Design direction

**High-end product portfolio.** Not a creative agency. Not a visual artist. A senior product designer who ships operational software. The visual language must say: structured, considered, confident, accessible, and honest. It should not say: trendy, experimental, decorative, or trying too hard.

The visual system should recede — the work should lead. The portfolio itself is evidence of restraint as a design decision.

---

## Typography

### Typefaces

| Role | Family | Weight range | Notes |
|---|---|---|---|
| Display / Headings | Plus Jakarta Sans | 700–800 | Used for h1–h4 via `theme.css` |
| Body / UI | Inter | 400–600 | Used for body, labels, nav, metadata |

Both are already loaded via Google Fonts in `src/styles/fonts.css`. Do not add a third typeface.

### Type scale (current → refined)

The Tailwind scale is used throughout. Key classes in use:

| Use | Class |
|---|---|
| Hero H1 | `text-5xl sm:text-6xl md:text-7xl font-black` |
| Section H2 | `text-4xl md:text-6xl font-black` |
| Case name H2 | `text-5xl md:text-7xl font-black` |
| Card H3 | `text-2xl–3xl font-black` |
| Metadata label | `text-xs uppercase tracking-wider` |
| Body copy | `text-base leading-relaxed` |
| Small/caption | `text-sm` |
| Badge/tag | `text-xs–sm font-bold` |

**Refinement target:** `leading-tight` on large display headings. `leading-relaxed` on body. `tracking-tight` on hero H1. Current implementation is mostly correct — confirm `leading-[0.98]` on hero H1 is retained (it is set explicitly, it is correct).

### Font size preference

The view options panel adjusts `--font-size` via `html.experience-large-text`. This is already working. Do not alter.

---

## Colour system

### Palette — current tokens (from `theme.css`)

```
--off-white:        #F7F8FA      ← page background
--pure-white:       #FFFFFF      ← cards, surfaces
--deep-navy:        #07111F      ← hero, contact, AI section background
--ink-black:        #0B0F17      ← alternative dark surface
--graphite-text:    #111827      ← primary text
--muted-text:       #6B7280      ← secondary text
--soft-border:      #E5E7EB      ← light borders
--product-blue:     #2563EB      ← primary action, links, labels
--electric-indigo:  #4F46E5      ← secondary accent (unused currently)
--soft-cyan:        #06B6D4      ← tertiary accent (unused currently)
--warm-sand:        #EAD7A6      ← warm accent (unused currently)
--success-green:    #22C55E      ← status positive
--warning-amber:    #F59E0B      ← truth layer background
--glass-bg:         rgba(255,255,255,0.7)
--glass-border:     rgba(255,255,255,0.2)
--grain-overlay:    rgba(0,0,0,0.03)
```

These tokens are defined but several (`--electric-indigo`, `--soft-cyan`, `--warm-sand`) are not yet in use. The redesign can activate them intentionally.

### Section colour roles

| Section | Background | Text | Notes |
|---|---|---|---|
| Hero | `bg-slate-950` | white | Dark — keeps nav contrast clean |
| Summary | `bg-slate-50` | `text-slate-950` | Light — neutral recovery after hero |
| Work index | `bg-slate-100` | `text-slate-950` | Slightly off-white — visual separation |
| StockLog | `bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950` | white | Dark blue — flagship case |
| Zgrada Plus | `bg-gradient-to-br from-sky-50 via-white to-blue-100` | `text-slate-950` | Light — contrast within the dark case flow |
| WineRoom | `bg-gradient-to-br from-rose-950 via-stone-950 to-rose-900` | white | Dark warm — closes the cases |
| AI section | `bg-slate-950` | white | Matches hero — bookends with contact |
| System | `bg-white` | `text-slate-950` | Pure white — evidence section |
| Contact | `bg-slate-950` | white | Matches hero/AI — consistent dark close |

This alternating dark/light rhythm is intentional and already correct. Do not flatten it.

### Truth layer colour

**Amber** (`border-amber-300 bg-amber-50 text-amber-950` on light; `border-amber-300/20 bg-amber-300/10 text-amber-100` on dark) is reserved exclusively for truth layer callouts. This is a deliberate semantic colour — it marks honesty. Do not use amber anywhere else.

---

## Surface language

### Rounded corners

`--radius: 1.25rem` (20px) is the base. Usage:

| Element | Corner |
|---|---|
| Section cards, panels | `rounded-3xl` (24px) |
| Component cards | `rounded-2xl` (16px) |
| Chips, tags, badges | `rounded-full` |
| Buttons (primary) | `rounded-full` |
| Buttons (card-level) | `rounded-2xl` |

### Border treatment

- Light surfaces: `border border-slate-200`
- Dark surfaces: `border border-white/10`
- High contrast mode: amber borders via `.experience-high-contrast` in `globals.css`
- Truth layer: `border border-amber-300` (light) / `border border-amber-300/20` (dark)

### Glass / blur

Nav uses `bg-white/90 backdrop-blur`. This is correct and should be retained. Do not apply backdrop-blur to content surfaces — only the sticky nav.

### Shadow

`shadow-sm` on resting cards. `hover:shadow-xl` on interactive cards. No shadow on dark-background sections (shadows are invisible against dark). This is correct.

---

## Motion

### Keyframe animations (defined in `globals.css`)

| Animation | Use | Duration |
|---|---|---|
| `auroraDrift1/2/3` | Hero background blobs | Slow atmospheric drift |
| `starTwinkle` | Constellation dots | Subtle opacity/scale |
| `grainBreathe` | Grain texture | Very subtle pulse |
| `meshOrbit` | Mesh ring | Slow 360° rotation |

These are defined but may not all be wired to DOM elements in the current `App.tsx` hero. Confirm which are active before the visual redesign.

### Interaction motion

- Card hover: `hover:-translate-y-1 hover:shadow-xl transition` — keep
- Scroll behaviour: `smooth` unless `lessMotion` preference is on — keep
- No entrance animations currently — consider subtle fade-in on section entry (only if `lessMotion` is false)

### Motion rules

1. No entrance animations on text. Text appears immediately.
2. Background animations only in the hero section.
3. Card hover transforms are permitted — they confirm interactivity.
4. All animation must be disabled when `lessMotion: true`.

---

## Iconography

**Lucide React** is the only icon library in use. Icons present:

| Icon | Location |
|---|---|
| `ArrowRight` | CTAs, contact action buttons |
| `Briefcase` | Availability label |
| `Check` | Best fit label |
| `Download` | CV button |
| `Eye` | Back to top button |
| `Mail` | Email CTA |
| `MapPin` | Location badge in hero |
| `RotateCcw` | Reset preferences |
| `SlidersHorizontal` | View options toggle |

**Rule:** Do not introduce new icons beyond what Lucide already provides. Do not use emoji as icons.

---

## Spacing

Tailwind's default spacing scale is in use. Section padding pattern:

```
Normal:    py-16 md:py-28   →  64px / 112px
Quick scan: py-12 md:py-16   →  48px / 64px  (via preference)
```

Max content width: `max-w-7xl` (1280px) with `px-4 md:px-8` side padding.

Grid patterns in use:
- 2-col: `md:grid-cols-2`
- 3-col: `md:grid-cols-3`
- 5-col: `md:grid-cols-5` (metadata strip)
- Asymmetric: `md:grid-cols-[1.1fr_0.9fr]` (hero), `lg:grid-cols-[1.05fr_0.95fr]` (case articles)

---

## Component visual inventory

### Nav bar
- Sticky, `top-0 z-50`
- `BM` wordmark left — font-black, text-slate-950
- Section buttons center — pill shape, hover bg
- View options toggle right — border pill

### Hero right-column cards
- Dark glass cards: `border border-white/10 bg-white/[0.06]`
- Hover: `hover:bg-white/[0.1]`
- Case number in blue-200
- Case title font-black text-2xl
- Why text slate-300 text-sm

### Work index cards
- White bg with slate-200 border
- Hover: `-translate-y-1 shadow-xl`
- Eyebrow in blue-700
- Title font-black text-3xl

### Case metadata strip
- 5-column grid
- Dark: `border-white/10 bg-white/10`
- Light: `border-sky-200 bg-white/80`
- Label: xs, uppercase, tracking-wider
- Value: sm, font-semibold

### Fit area cards
- `rounded-2xl border` with surface variable
- Title: font-black
- Body: text-sm text-slate-600

### AI step cards
- Dark glass: `border border-white/10 bg-white/10`
- Step number: text-3xl font-black text-sky-300
- Title: font-black

### System component chips
- `rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700`

### Truth layer card
- Amber coloured, always
- H3: "Truth layer"
- Semantic colour — do not reuse for other purposes

---

## Visual evidence gaps

The most significant visual gap in the current portfolio:

**Zero screenshots or mockups are displayed inside any case study section.**

Images that exist in `src/`:
- `src/SL1.png`
- `src/StockLog showroom.png`
- `src/SotckLog desktop.svg`
- `src/sl-hero.svg`
- `src/sl-hero-1.svg`
- `src/Frame 3063.png`
- `src/Frame 3064.png`

None of these are rendered in any case section. This is the largest gap between current state and a high-end portfolio standard.

**Target:** Each case study should show at minimum 1–2 representative screens. These can be:
- Full-width desktop mockup
- Side-by-side mobile + desktop
- Component detail strip

Image handling should use `src/app/components/figma/ImageWithFallback.tsx` which is already present.

---

## Accessibility visual requirements

1. All text on dark backgrounds must pass WCAG AA contrast (4.5:1 body, 3:1 large text)
2. Focus states must be visible — currently inherited from Tailwind/Radix
3. The view options panel (View Options) must remain functional and visible in all preference modes
4. Truth layer amber must remain legible in high contrast mode — check `globals.css` line 69–113

---

## Open questions

- [ ] Should the hero include the aurora/grain animations from `globals.css`, or is the current bg-slate-950 flat background intentional?
- [ ] What is the intended treatment for image display inside case studies — full bleed, contained in a card, or framed with device mockup?
- [ ] Should the `--electric-indigo` and `--soft-cyan` tokens be used anywhere, or removed from theme.css if unused?
- [ ] Is there a dark mode intent? `theme.css` defines full `.dark` tokens but the portfolio does not currently offer a dark mode toggle.
