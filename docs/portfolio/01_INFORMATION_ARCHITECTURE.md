# 01 — Information Architecture

## Current structure

The portfolio is a single-page scroll. There is no router. Navigation is anchor-based via `scrollTo()`. This structure is correct for this format and audience — do not add routing.

---

## Section map (current → target)

```
#top          Hero
#summary      60-second recruiter summary
#work         Case study index (3 cards)
#stocklog     StockLog case study
#zgrada-plus  Zgrada Plus case study
#wineroom     WineRoom case study
#ai           AI workflow section
#system       Design system section
#contact      Contact
```

This order is functionally correct. The only structural change under consideration is whether `#ai` and `#system` should swap — see discussion below.

---

## Navigation bar

**Current items:** summary · work · ai · system · contact

**Issues:**
- `ai` as a nav label is ambiguous to a recruiter scanning quickly
- `system` is similarly vague
- No visual indicator of current section on scroll

**Target labels:**
- `summary` → keep
- `work` → keep
- `workflow` (replaces `ai`) — clearer, less buzzword-y
- `systems` (replaces `system`) — slight improvement
- `contact` → keep

**Active state:** Add a scroll-position-aware active indicator. Underline or bold is sufficient — no animated pill required.

---

## Section order rationale

| Position | Section | Why here |
|---|---|---|
| 1 | Hero | Immediate identity + location + role signal |
| 2 | 60-second summary | Recruiters scan then decide — give them the short version before the cases |
| 3 | Work index | Three-card tease before the full cases — creates a visual anchor |
| 4–6 | Case studies | Full depth, in order of complexity signal |
| 7 | AI workflow | After cases — earned context, not a headline |
| 8 | Design systems | After AI — supporting evidence, not primary claim |
| 9 | Contact | Close the page with a clear action |

---

## Section content requirements

### Hero (`#top`)
- Name / role / location — above fold, always
- Munich + work authorisation badge — critical for recruiter filter
- Headline — 1 strong sentence
- Sub-headline — role + years, no fluff
- Tags — Munich-based, English fluent, Learning German, Web + Mobile, SaaS/B2B/E-commerce, AI-assisted human-led
- CTAs: View selected work · Read 60-second summary · Contact Boris
- Right column: 3 case study preview cards with `why it matters` blurb

### 60-second summary (`#summary`)
- Recruiter summary callout box
- 4 short paragraphs: experience, product type, location/eligibility, AI approach
- 6 fit area cards (B2B SaaS, Multi-role, E-commerce, Design systems, AI-assisted, Accessibility)

### Work index (`#work`)
- Section heading: "Selected work"
- 3 case study cards — eyebrow, title, intro, why it matters
- Clicking scrolls to the case

### Case studies (`#stocklog`, `#zgrada-plus`, `#wineroom`)
Each case contains:
- Case number + eyebrow tag
- Case name (large)
- Headline statement
- Intro paragraph
- 5-column metadata strip: Status · Industry · Platform · Role · Focus
- The problem
- Core UX challenge + user flow
- Users (list)
- Key design decisions (numbered list)
- Design outcome
- Truth layer (honest scope statement)

**Missing from current cases:**
- Visual evidence (screenshots, mockups, SVGs) — currently zero images in case sections
- Before/after framing where applicable (WineRoom especially)
- A "what I would do next" or "open questions" block for concept cases

### AI workflow (`#ai`)
- Section heading
- Intro paragraph — tool, not claim
- 9-step grid (current)
- Truth layer callout

**Gap:** No visual of the actual AI-assisted workflow. The steps are text-only.

### Design systems (`#system`)
- Section heading
- Intro paragraph
- 3 component group cards (one per project)
- Key system principles
- Truth layer

**Gap:** Component chips are text labels only. No visual evidence.

### Contact (`#contact`)
- Large closing headline
- Sub-paragraph
- Contact info card: Name, Location, Work auth, Languages, Email, Portfolio
- Action buttons: Email, Download CV/PDF, Back to top
- Availability card
- Best fit summary card
- Copyright line

---

## Section-to-component mapping (target)

When `App.tsx` is decomposed, each section becomes a file:

```
src/app/sections/
  HeroSection.tsx
  SummarySection.tsx
  WorkIndexSection.tsx
  CaseStudySection.tsx      ← rendered once per caseStudies[] item
  AIWorkflowSection.tsx
  SystemSection.tsx
  ContactSection.tsx

src/app/components/
  NavBar.tsx
  ViewOptionsPanel.tsx
  CaseStudyCard.tsx          ← used in WorkIndex + Hero right column
  MetadataStrip.tsx
  TruthLayer.tsx
  FitAreaCard.tsx

src/data/
  caseStudies.ts
  fitAreas.ts
  aiSteps.ts
  systemGroups.ts
  preferenceOptions.ts
```

---

## Section order discussion: AI vs System

**Current:** AI → System
**Alternative:** System → AI

**Recommendation: keep current order (AI before System).**

Reasoning: AI workflow is a differentiated claim that a recruiter may find notable. Design system section is supporting evidence. The claim comes before the proof.

---

## Open questions

- [ ] Should the work index section (`#work`) show any visual thumbnails or remain text-card only?
- [ ] Should there be a dedicated "About" section, or does the 60-second summary cover it?
- [ ] Should case studies have their own scroll-restored hash routes in future, or remain anchor-only?
- [ ] Is a "back to top" floating button needed on mobile, or is the nav sufficient?
- [ ] Should the contact section include a simple contact form, or email-only?
