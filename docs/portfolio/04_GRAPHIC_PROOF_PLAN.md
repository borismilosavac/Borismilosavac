# 04 — Graphic Proof Plan (Image Placement Specification)

Implementation-ready specification for every visual in the portfolio. This document defines **what goes where**, the **ideal asset**, the **fallback** when the asset does not yet exist, and the exact **caption / alt text / TODO** for each slot.

**Status of this document:** specification only. No UI is changed by this file.

---

## Governing rules

1. **Never fake UI.** No fabricated screenshots, no invented dashboards, no AI-generated "product" screens presented as real work.
2. **Product proof before decorative context.** Real interface artefacts lead. Atmospheric/context renders (e.g. a showroom photo) are permitted only *after* proof and must be labelled as concept visualisation.
3. **Honest status labelling.** StockLog and Zgrada Plus are concept/MVP. WineRoom is a real active project. Captions must not imply launch, adoption, or metrics.
4. **No visible placeholders in production.** Per project rule, a blank placeholder must **not ship**. Where an asset is missing, the section stays **text-only in production** until the asset exists. The "blank premium placeholder" defined below is a *local/preview scaffold only* — it is gated and never deployed.

---

## Status legend

| Mark | Meaning |
|---|---|
| ✅ **Placed** | Asset exists and is rendered in the live build |
| 🟡 **Available** | Asset exists in repo but is unidentified/unplaced |
| ⬜ **Missing** | No asset exists; section stays text-only until provided |

---

## Reusable spec: the "blank premium placeholder"

Used **only** as a local/preview scaffold while building a section before its asset arrives. **Must be gated so it never ships** (e.g. behind an env flag or simply not merged). It must never contain fake UI or "coming soon" text.

```
Container : <figure> aspect-[16/9] (or [4/5] for mobile slots)
Surface   : dark sections → bg-white/[0.03] border border-white/10
            light sections → bg-slate-100 border border-slate-200
Center    : one small Lucide icon (ImageIcon) at 10% opacity, no text
Radius    : rounded-3xl (matches real figures)
No text, no label, no "TODO" visible. Purely a sized, empty premium surface.
```

Production behaviour when asset is missing: **render nothing** (omit the `<figure>` entirely, as Zgrada/WineRoom do today). The placeholder is a scaffold, not a shipped element.

---

## Current asset inventory (verified)

| File (in `src/`) | Size | Identified content | Mapped to |
|---|---|---|---|
| `stocklog-ui.png` | 1.1 MB | Desktop board + companion mobile app | Visual 2 (✅), partial Visual 5 |
| `stocklog-board.svg` | 2.2 MB | Full inventory board (vector) | Visual 4 (✅ in-context) |
| `stocklog-showroom.png` | 2.1 MB | Showroom concept render | Context only (✅, demoted) |
| `Frame 3063.png` | 1.3 MB | **Unidentified** — likely StockLog board/mobile | Candidate: Visual 3/4/5 |
| `SL1.png` | 2.0 MB | **Unidentified** — StockLog screen | Candidate: Visual 3/5 |
| `sl-hero.svg` | 2.8 MB | StockLog hero (unused) | Candidate: Visual 1/2 |
| `sl-hero-1.svg` | 3.0 MB | StockLog hero variant (unused) | Candidate: Visual 1/2 |

No assets exist for Zgrada Plus, WineRoom, AI artefacts, Design System boards, or Contact.

---

# The 16 visuals

---

## 1. Hero narrative illustration — "From Complexity to Clarity"

- **Section:** Hero (`#top`)
- **Implementation:** `src/app/components/HeroSystemArt.tsx` — pure inline SVG, decorative (`aria-hidden`, `pointer-events-none`). **No screenshots, no project images, no readable data/metrics.**
- **Position:** Desktop — large right-side background layer (`variant="panel"`, `right-[-4vw] w-[60vw] max-w-[1080px]`, behind the Selected Work list, masked/faded toward the headline). Tablet/mobile — one compact board-centred card (`variant="card"`, `aspect-[3/2]`, complexity zone hidden) above the Selected Work list.
- **Narrative:** A visual transformation supporting the headline ("complex digital products that people can actually use"):
  - **Zone 1 — Complexity** (background, faint): scattered nodes, disconnected workflow lines, tilted card fragments — raw, messy systems before design.
  - **Zone 2 — Structure** (focal): the central system board — roles sidebar, workflow columns, design-system tiles; connectors resolve into clean rails. The main anchor.
  - **Zone 3 — Human-use** (foreground, brighter): clean mobile surface, action card, status + search chips — the usable, clear product experience.
  - **Selected Work** = the system's output nodes: clarity rails sweep from the board toward the real (DOM) case-study cards, which are linked via `:has()` (hover the art → outputs activate; hover an output → feeding rails brighten).
- **Presence:** built for contrast, not a watermark — structure board ~60–70% presence, complexity ~20–35%, a **bright human-use focal with a soft glow**, arrowheaded rails; relaxed left mask + thinner page overlay.
- **Motion:** CSS-only, transform/opacity/stroke only — complexity counter-drift (22s), staggered node pulse, human-use float, focal-glow breathe (transform-scale, no animated blur), and an occasional "clarity signal" sweeping the output rail (9s, faster on hover). Paused offscreen via `motion-paused`; disabled under `prefers-reduced-motion` (story still reads statically).
- **Truth note:** Honest by construction — abstract, not a depiction of any real or fake product, so it carries no launch/metric claim. Supersedes the earlier "tri-product composite" idea (un-buildable without Zgrada + WineRoom assets).
- **Caption / Alt text:** *(none — decorative `aria-hidden`)*
- **Replacement TODO:** None required. Optional: fine-tune zone density / mask / signal on the Vercel preview.

## 2. StockLog main dashboard

- **Section:** StockLog (`#stocklog`)
- **Position:** Full-width `<figure>` immediately after the case intro, before the metadata strip. **(Currently placed here.)**
- **Purpose:** Primary proof — the two-board operational workspace, the flagship's strongest evidence.
- **Ideal asset:** High-res desktop inventory board + companion mobile. `stocklog-ui.png` ✅, or re-export from `sl-hero.svg` for crispness.
- **Fallback placeholder:** N/A — placed.
- **Caption:** `StockLog — inventory board with companion mobile app.`
- **Alt text:** `StockLog inventory board on desktop with the companion mobile app — vehicle cards grouped into columns by salesperson, with inventory, assignment and deal-status filters along the top.`
- **Replacement TODO:** ✅ Placed. Optional: swap to a compressed WebP (current PNG is 1.1 MB).

## 3. StockLog vehicle card anatomy

- **Section:** StockLog (`#stocklog`)
- **Position:** Inline with / beside the "Key design decisions" card (the decision about the vehicle card as working unit).
- **Purpose:** Show the card as the atomic unit — VIN, stock number, make/model, year, condition, price, colour, status, days in stock.
- **Ideal asset:** A single isolated vehicle card, optionally with quiet annotation labels for each field. ~600px wide, 4:5.
- **Fallback placeholder:** Blank premium placeholder (4:5) — **scaffold only, do not ship**. Production: omit until exported.
- **Caption:** `Vehicle card — the atomic working unit, surfacing stock, price, status and days in inventory.`
- **Alt text:** `A single StockLog vehicle card showing VIN, stock number, make and model, year, condition, price, colour, status and days in stock.`
- **Replacement TODO:** ⬜ Export isolated annotated card from the StockLog Figma source. Check if `SL1.png`/`Frame 3063.png` already contains a usable crop.

## 4. StockLog filter/search state

- **Section:** StockLog (`#stocklog`)
- **Position:** Left column of the 2-up grid below "Key design decisions". **(Currently `stocklog-board.svg` placed here as in-context proof.)**
- **Purpose:** Show lookup-heavy filtering/search by VIN, stock number, model and price — and visible status states.
- **Ideal asset:** A dedicated filter/search-active board state. Interim: the full board SVG conveys filters + status in context. ✅
- **Fallback placeholder:** N/A — covered in context by `stocklog-board.svg`.
- **Caption:** `Inventory board detail — vehicle cards, filters and status states in context.`
- **Alt text:** `StockLog inventory board — vehicle cards arranged in columns, each showing make, model, price and condition, with filter controls and status states along the board.`
- **Replacement TODO:** 🟡 Optional upgrade — a dedicated "filter open / search active" crop would sharpen the point. Low priority (in-context proof exists).

## 5. StockLog mobile view

- **Section:** StockLog (`#stocklog`)
- **Position:** Paired with Visual 2 (already inside the `stocklog-ui.png` composite) or as a standalone mobile slot in a future 2-up.
- **Purpose:** Show the salesperson's on-the-floor mobile experience (available vehicles, deals, status, notifications).
- **Ideal asset:** A dedicated mobile screen, 9:19.5, frameless. Partially covered by the composite today.
- **Fallback placeholder:** N/A — represented within Visual 2. Standalone slot omitted until a dedicated screen exists.
- **Caption:** `Salesperson mobile view — vehicles, active deals and status on the floor.`
- **Alt text:** `StockLog mobile app screen showing available vehicles, active deals, status updates and notifications for a salesperson.`
- **Replacement TODO:** 🟡 Identify `Frame 3063.png` / `SL1.png` — if either is a clean mobile screen, place it. Otherwise export from Figma.

## 6. Zgrada Plus role ecosystem

- **Section:** Zgrada Plus (`#zgrada-plus`)
- **Position:** Primary visual — full-width `<figure>` after the case intro.
- **Purpose:** Make the multi-role model legible: residents, managers, accounting, partners, city/municipality, admins — and how access differs.
- **Ideal asset:** A clean role-ecosystem diagram (not a screenshot) — honest as a design artefact, not fake UI.
- **Fallback placeholder:** Blank premium placeholder (16:9) — scaffold only. Production: **section stays text-only** (current behaviour).
- **Caption:** `Role model — one platform, six role types with distinct access and tasks. (Concept/MVP.)`
- **Alt text:** `Diagram of the Zgrada Plus role ecosystem: residents, building managers, accounting services, commercial partners, city/municipality roles and admins, each with different permissions.`
- **Replacement TODO:** ⬜ Design/export role-ecosystem diagram from the Zgrada Plus source.

## 7. Zgrada Plus resident mobile flow

- **Section:** Zgrada Plus (`#zgrada-plus`)
- **Position:** Right column of a 2-up grid (paired with Visual 8).
- **Purpose:** Show the mobile-first resident journey — announcements, issue reporting, status tracking, documents.
- **Ideal asset:** 2–3 mobile screens of the resident flow, 9:19.5, frameless.
- **Fallback placeholder:** Blank premium placeholder (4:5) — scaffold only. Production: omit.
- **Caption:** `Resident flow — mobile-first reporting and status tracking. (Concept/MVP.)`
- **Alt text:** `Zgrada Plus resident mobile screens showing announcements, issue reporting and maintenance status tracking.`
- **Replacement TODO:** ⬜ Export resident mobile screens from Figma.

## 8. Zgrada Plus manager dashboard

- **Section:** Zgrada Plus (`#zgrada-plus`)
- **Position:** Left column of the 2-up grid (paired with Visual 7), or primary if Visual 6 is a diagram.
- **Purpose:** Show the web-first manager workspace — dashboards, resident management, issues, costs/debts, reporting.
- **Ideal asset:** Desktop manager dashboard, 16:9, frameless.
- **Fallback placeholder:** Blank premium placeholder (16:9) — scaffold only. Production: omit.
- **Caption:** `Manager dashboard — web-first oversight of residents, issues and finances. (Concept/MVP.)`
- **Alt text:** `Zgrada Plus manager dashboard on desktop showing resident management, issue tracking, costs and reporting.`
- **Replacement TODO:** ⬜ Export manager dashboard from Figma.

## 9. Zgrada Plus accessibility / status states

- **Section:** Zgrada Plus (`#zgrada-plus`)
- **Position:** Inline with the accessibility-related design decision, or a small full-width strip.
- **Purpose:** Evidence of accessibility-aware product logic — clear status states, consent/privacy UI, mixed-confidence language.
- **Ideal asset:** A small state set (e.g. issue-status badges, consent checkbox group) — real component states, not decorative.
- **Fallback placeholder:** Blank premium placeholder (16:9) — scaffold only. Production: omit.
- **Caption:** `Status and consent states — accessibility-aware patterns for a mixed-confidence audience. (Concept/MVP.)`
- **Alt text:** `Zgrada Plus interface states: issue status badges, a consent checkbox group and role permission badges, designed for clarity and accessibility.`
- **Replacement TODO:** ⬜ Export status/consent component states from Figma.

## 10. WineRoom product listing

- **Section:** WineRoom (`#wineroom`)
- **Position:** Primary visual after the case intro — ideally a **before/after** pair (2-up).
- **Purpose:** Strongest possible proof — the only real, live project. Show improved listing hierarchy (name, price, attributes).
- **Ideal asset:** Before/after screenshots of the **live WooCommerce** desktop listing. Real screenshots — capturable, no fabrication.
- **Fallback placeholder:** Blank premium placeholder (16:9 ×2) — scaffold only. Production: **section stays text-only** until captured.
- **Caption:** `Product listing — clearer hierarchy for name, price and key attributes. (Live WooCommerce project.)`
- **Alt text:** `WineRoom product listing page showing the improved layout with clearer product name, price and attribute hierarchy.`
- **Replacement TODO:** ⬜ Capture before/after from the live WineRoom site. **Needs the site URL.**

## 11. WineRoom mobile toolbar

- **Section:** WineRoom (`#wineroom`)
- **Position:** Right column of a 2-up (paired with Visual 12), or a dedicated mobile strip.
- **Purpose:** Show the mobile toolbar treated as a primary shopping tool (always-available filter/sort/search).
- **Ideal asset:** Mobile screenshots of the live toolbar, 9:19.5.
- **Fallback placeholder:** Blank premium placeholder (4:5) — scaffold only. Production: omit.
- **Caption:** `Mobile toolbar — filter, sort and search kept within reach while browsing.`
- **Alt text:** `WineRoom mobile shopping toolbar with always-accessible filter, sort and search controls above the product list.`
- **Replacement TODO:** ⬜ Capture mobile toolbar from the live site.

## 12. WineRoom filter/search state

- **Section:** WineRoom (`#wineroom`)
- **Position:** Left column of the 2-up (paired with Visual 11).
- **Purpose:** Show filter/sort/search in an active state — the core discovery improvement.
- **Ideal asset:** Screenshot of filters open / search active on the live site.
- **Fallback placeholder:** Blank premium placeholder (16:9) — scaffold only. Production: omit.
- **Caption:** `Filter and search — faster narrowing from exploration to intent.`
- **Alt text:** `WineRoom listing with filters open and search active, showing how shoppers narrow products by type, price and attributes.`
- **Replacement TODO:** ⬜ Capture filter/search-active state from the live site.

## 13. AI workflow pipeline

- **Section:** AI workflow (`#ai`)
- **Position:** Already present — the built CSS pipeline (steps 01–05 → human checkpoint 06 → 07–09).
- **Purpose:** Show the human-led process. This is a **real built diagram, not an image** — fully satisfies the slot without any asset.
- **Ideal asset:** None required. The HTML/CSS pipeline is the proof.
- **Fallback placeholder:** N/A — already built and shipped.
- **Caption:** *(inline section copy)*
- **Alt text:** N/A (semantic HTML, not an image).
- **Replacement TODO:** ✅ Satisfied as a component. No image needed.

## 14. AI prompt / wireframe / refined-UI triptych

- **Section:** AI workflow (`#ai`)
- **Position:** Below the pipeline — a 3-panel row.
- **Purpose:** Make the human-led progression concrete: structured prompt → wireframe/layout option → refined UI. Demonstrates judgement, not automation.
- **Ideal asset:** **Three real artefacts from Boris's own process** — an actual prompt, an actual wireframe export, an actual refined screen. Must be genuine, not reconstructed.
- **Fallback placeholder:** Blank premium placeholder (3 × 4:5) — scaffold only. Production: omit (the pipeline alone is sufficient until real artefacts exist).
- **Caption:** `From structured prompt to wireframe to refined UI — every step human-reviewed.`
- **Alt text:** `Three-panel progression of an AI-assisted, human-led workflow: a structured text prompt, an early wireframe, and a refined user interface.`
- **Replacement TODO:** ⬜ Gather three **real** process artefacts. Do not fabricate. Lower priority than case proof.

## 15. Design System component board

- **Section:** Design System (`#system`)
- **Position:** Augmenting the three project component-chip cards (StockLog / Zgrada / WineRoom).
- **Purpose:** Show that the listed components are real, designed elements — not just words.
- **Ideal asset:** A compact component board per project. **StockLog's can be cropped from existing real UI** (board SVG); Zgrada/WineRoom require their assets first.
- **Fallback placeholder:** Keep the **text chips** (current, honest). No blank placeholder — the chips are legitimate content.
- **Caption:** `Reusable components, grouped by the product they were designed for.`
- **Alt text:** `A board of reusable interface components from StockLog: vehicle card, board column, status chip, filter chip, leaderboard row and notification card.`
- **Replacement TODO:** 🟡 StockLog component board can be produced now from existing UI. Zgrada/WineRoom boards wait on their assets. Until then, chips stay.
- **Section-top visual:** ✅ The former blank 16:9 placeholder above the chip cards is now `src/app/components/DesignSystemBoard.tsx` — an abstract "Reusable UI System Board" SVG (token markers, central reusable component with focal glow, variant tiles, dashboard/mobile/chips/badges/table contexts, connector rails). Decorative `aria-hidden` artwork inside a `role="img"` figure; honest by construction (no project claim, no readable text/metrics). Caption unchanged.

## 16. Contact visual

- **Section:** Contact (`#contact`) + `index.html` (social)
- **Position:** (a) Optional portrait beside the contact card; (b) the OG/social image referenced from `index.html`.
- **Purpose:** Human trust signal (portrait) and correct social-share preview (OG image).
- **Ideal asset:** (a) A professional portrait of Boris, 4:5; (b) a 1200×630 OG image (name, role, `borism.design`, one real StockLog frame — no placeholder text).
- **Fallback placeholder:** **None in UI** — contact stays text-only (no placeholder portrait). The OG image is a meta-tag asset, not UI.
- **Caption:** *(none for portrait; OG image is not captioned)*
- **Alt text:** Portrait → `Boris Milosavac, Product Designer based in Munich.` · OG → existing `og:image:alt` is already written and waiting.
- **Replacement TODO:** ⬜ (a) Provide a portrait if desired (optional). (b) **Create the 1200×630 OG image** and add `og:image` / `og:image:width` / `og:image:height` to `index.html` — `og:image:alt` already exists but is currently orphaned.

---

## Shared format standards

- **Frameless** screens on simple backgrounds. No fake MacBook/iPhone frames (except genuine mobile UI at 9:19.5).
- **No drop shadows baked into images** — the `<figure>` container handles elevation.
- **Consistent aspect ratio within a case** (pick 16:9 for desktop, 4:5/9:19.5 for mobile, and hold it).
- **Compress before shipping:** target **WebP ≤ 200 KB** per asset. Current StockLog set is 1.1–2.2 MB each — too heavy.
- **Storage:** move all assets to `src/assets/` with clean, lowercase, space-free names. Render via `ImageWithFallback` inside a `<figure>` with `loading="lazy"` and `decoding="async"`.

---

## Missing assets summary

| Visual | Section | Status | Blocker |
|---|---|---|---|
| 1 Hero abstract system illustration | Hero | ✅ | — (decorative SVG, no assets needed) |
| 2 StockLog dashboard | StockLog | ✅ | — (compress only) |
| 3 Vehicle card anatomy | StockLog | ⬜ | Figma export / identify `SL1`,`Frame 3063` |
| 4 Filter/search state | StockLog | ✅ (in-context) | Optional dedicated crop |
| 5 Mobile view | StockLog | 🟡 | Identify existing assets or export |
| 6 Role ecosystem | Zgrada | ⬜ | Diagram export |
| 7 Resident mobile flow | Zgrada | ⬜ | Figma export |
| 8 Manager dashboard | Zgrada | ⬜ | Figma export |
| 9 Accessibility/status states | Zgrada | ⬜ | Figma export |
| 10 Product listing | WineRoom | ⬜ | **Live site URL** + capture |
| 11 Mobile toolbar | WineRoom | ⬜ | Live capture |
| 12 Filter/search state | WineRoom | ⬜ | Live capture |
| 13 AI pipeline | AI | ✅ | — (built component) |
| 14 Prompt/wireframe/UI triptych | AI | ⬜ | Real artefacts only |
| 15 Component board | System | 🟡 | StockLog now; others wait |
| 16 Contact / OG image | Contact | ⬜ | OG export (portrait optional) |

**Placed: 3 · In-context/partial: 2 · Missing: 11**

---

## Open questions (blockers to resolve)

- [ ] WineRoom **live site URL** — unblocks Visuals 10–12 (highest-value real proof).
- [ ] StockLog Figma source — unblocks Visuals 3, 5 at high resolution.
- [ ] Zgrada Plus source — unblocks Visuals 6–9.
- [ ] Identity of `Frame 3063.png` and `SL1.png` — may already cover Visuals 3 or 5.
- [ ] Are `sl-hero.svg` / `sl-hero-1.svg` final hero art or drafts?
- [ ] Is a portrait of Boris available/wanted for Visual 16?
