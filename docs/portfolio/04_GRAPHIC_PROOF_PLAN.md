# 04 — Graphic Proof Plan

Visual evidence is the largest gap between the current portfolio and a high-end standard. Case study sections contain zero screenshots, mockups or design exports. This document defines what is needed, where it goes, and what format it should take.

---

## The problem

A portfolio that describes design decisions without showing any design output is a content document, not a portfolio. Senior-level portfolios are expected to show the work alongside the explanation.

Current state: All three case sections are text-only.

Target state: Each case has at minimum two visual artefacts. They do not need to be pixel-perfect finished product screens — they need to be honest, clear representations of the design work described.

---

## Assets already present

These files exist in `src/` but are not rendered anywhere in the portfolio:

| File | Format | Likely content |
|---|---|---|
| `src/SL1.png` | PNG | StockLog — unknown view |
| `src/StockLog showroom.png` | PNG | StockLog — showroom view |
| `src/SotckLog desktop.svg` | SVG | StockLog — desktop UI (note: filename has typo) |
| `src/sl-hero.svg` | SVG | StockLog — hero image / illustration |
| `src/sl-hero-1.svg` | SVG | StockLog — hero variant |
| `src/Frame 3063.png` | PNG | Unknown (Figma export) |
| `src/Frame 3064.png` | PNG | Unknown (Figma export) |

**Immediate action available:** Wire StockLog images into the StockLog case section. This requires no new assets.

---

## Asset requirements per case

### Case 01 — StockLog

**Status:** Assets available, not integrated.

| Asset slot | Description | Format | Source |
|---|---|---|---|
| Hero visual | Desktop UI — Inventory Board or full dashboard view | SVG or PNG | `src/SotckLog desktop.svg` or `src/sl-hero.svg` |
| Supporting visual 1 | Vehicle card detail | PNG or SVG | `src/SL1.png` or `src/StockLog showroom.png` |
| Supporting visual 2 | Performance Board or mobile view | PNG or SVG | TBD — may need export |

**Suggested layout:**
```
[ Full-width or contained image: desktop dashboard ]
[ Two-column: vehicle card detail | performance board ]
```

---

### Case 02 — Zgrada Plus

**Status:** No assets present. All needed.

| Asset slot | Description | Format | Priority |
|---|---|---|---|
| Hero visual | Manager dashboard or resident mobile view | PNG or SVG export | High |
| Supporting visual 1 | Role-based permission UI or issue tracking flow | PNG | High |
| Supporting visual 2 | Mobile resident flow (issue reporting or announcements) | PNG | Medium |

**Export needed from:** Figma (source file not in this repo)

**Suggested layout:**
```
[ Full-width: manager dashboard — web ]
[ Two-column: resident mobile | permission/role UI ]
```

---

### Case 03 — WineRoom

**Status:** No assets present. All needed. This is the only real-world project — visual evidence is highest-priority here.

| Asset slot | Description | Format | Priority |
|---|---|---|---|
| Before | Current WooCommerce product listing — desktop or mobile | Screenshot | High |
| After | Redesigned listing — same view | Screenshot or mockup | High |
| Mobile comparison | Before/after mobile toolbar | PNG side-by-side | High |

**This case benefits most from before/after framing.** It is the only case where a real-world problem was solved in an existing live product. Without before/after evidence, it reads as generic.

**Suggested layout:**
```
[ Two-column: Before | After — desktop listing ]
[ Two-column: Before mobile | After mobile ]
```

---

## Visual format standards

### For all case visuals

1. **No device mockup frames** unless the frame adds context (e.g. mobile-specific UI). Plain screens on a simple background are preferable to fake MacBook or iPhone renders.
2. **No drop shadows on images.** The card containers handle elevation.
3. **No gradient overlays on images** unless needed for text legibility (avoid text on images).
4. **Consistent aspect ratios** within a case — if one image is 16:9, all in that group should be 16:9.
5. **Alt text required** for every image. Descriptive, functional. Not "screenshot of design".

### Recommended display sizes

| Slot | Recommended width | Aspect |
|---|---|---|
| Full-width hero image | 1280px | 16:9 or 3:2 |
| Half-width (2-col grid) | 640px | 4:3 or 1:1 |
| Mobile mockup | 390px | 9:19.5 (iPhone) |

### File format guidance

| Format | Use when |
|---|---|
| SVG | UI exported as vectors — scalable, no quality loss |
| PNG | Screenshots, raster UI exports — use 2x (@2x) if possible |
| WebP | Preferred for large rasters if Vite handles the conversion |

Vite already handles `.svg` imports via `assetsInclude`. PNG is natively handled.

---

## Integration pattern

Images go into `src/assets/` (currently empty/absent — create the folder). Import them directly in the section component or in `App.tsx`:

```tsx
import stocklogDesktop from '@/assets/stocklog-desktop.svg';
import stocklogShowroom from '../assets/stocklog-showroom.png';
```

Use `ImageWithFallback` from `src/app/components/figma/ImageWithFallback.tsx` for graceful fallback. This component is already present and should be used for all portfolio images.

Rename assets on move:

| Current name | Rename to |
|---|---|
| `src/SotckLog desktop.svg` | `src/assets/stocklog-desktop.svg` |
| `src/StockLog showroom.png` | `src/assets/stocklog-showroom.png` |
| `src/SL1.png` | `src/assets/stocklog-screen-1.png` |
| `src/sl-hero.svg` | `src/assets/stocklog-hero.svg` |
| `src/sl-hero-1.svg` | `src/assets/stocklog-hero-alt.svg` |
| `src/Frame 3063.png` | `src/assets/frame-3063.png` (until identified) |
| `src/Frame 3064.png` | `src/assets/frame-3064.png` (until identified) |

---

## OG / social image

**Status:** `og:image` is not set in `index.html`. This means link previews on LinkedIn, Slack, and email clients show no image — a significant miss for a portfolio that will be shared by recruiters.

**Requirements:**
- Dimensions: 1200 × 630px
- Format: PNG or JPG
- Content: Name, role title, borism.design URL, representative visual (StockLog dashboard or hero composition)
- Must not include placeholder text or generic patterns

**Placement:** `public/og-image.png` (Vite serves `public/` as static root) → add to `index.html`:
```html
<meta property="og:image" content="https://borism.design/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
```

---

## Priority order

| Priority | Item | Blocker |
|---|---|---|
| 1 | Integrate StockLog assets already in src/ | No new assets needed |
| 2 | Export and add Zgrada Plus screens | Requires Figma access |
| 3 | Capture WineRoom before/after screenshots | Requires access to live WineRoom site |
| 4 | Create and add OG image | Requires design export |
| 5 | Move all assets to src/assets/ with clean names | Can be done anytime |

---

## Open questions

- [ ] Where is the Figma source file for StockLog? Is it accessible for re-export at higher resolution?
- [ ] Where is the Figma source file for Zgrada Plus?
- [ ] What is the WineRoom live site URL? Screenshots can be taken from there.
- [ ] Are `Frame 3063.png` and `Frame 3064.png` Zgrada Plus exports, WineRoom exports, or something else?
- [ ] Should `sl-hero.svg` and `sl-hero-1.svg` be used as the main StockLog hero visual or are they drafts?
- [ ] Is there a preferred device frame style, or should all screens be frameless?
