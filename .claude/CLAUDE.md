# Boris Milosavac — Portfolio

## Project goal

High-end product designer portfolio targeting Munich HR recruiters and hiring managers. The portfolio must signal senior-level product thinking and operational UX credibility in 30–90 seconds.

## Audience

Munich-based HR recruiter or hiring manager at a tech company, SaaS business, or product-led organisation. They are experienced with design portfolios and will immediately recognise inflation, generic work, or AI-generated bulk.

## Stack — do not change

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- Radix UI (shadcn pattern)
- Lucide React (icons only)
- pnpm

Do not add dependencies. Do not introduce a router. Do not rebuild from scratch.

## Hard rules

- Do not change the technology stack.
- Do not invent facts. If information is not confirmed, ask.
- Do not add fake metrics, conversion lifts, adoption numbers or revenue claims.
- Do not add fake launch or deployment claims for StockLog or Zgrada Plus. Both are concepts/MVPs. WineRoom is a real project.
- Do not leave visible placeholders in any shipped output.
- Do not edit `src/app/components/ui/**` — these are Radix/shadcn primitives.
- Do not edit `vite.config.ts` — the figma asset resolver is load-bearing.

## Content truth rules

Every case study ends with a Truth Layer. It must be honest:

- **StockLog** — concept/MVP. Claim: product structure, workflow design, UI direction. Do not claim: launch, adoption, beta outcomes.
- **Zgrada Plus** — concept/MVP. Claim: role-based UX, flow design, accessibility-aware product logic. Do not claim: live metrics, launched outcomes.
- **WineRoom** — real active project. Claim: UX/UI optimisation, browsing structure, responsive toolbar. Do not claim: conversion lift, revenue, analytics-backed metrics.

Amber colour treatment is reserved exclusively for Truth Layer cards. Do not use amber elsewhere.

## High-end design rules

- The visual system must recede. The work leads.
- No decorative elements that do not serve the content.
- No emoji. No gradient text. No neon accents.
- No entrance animations on text — text appears immediately.
- Background animations (aurora, grain) only in the hero section.
- Card hover transforms are permitted (`-translate-y-1`, `shadow-xl`).
- All animation must be suppressed when `lessMotion` preference is active.
- Image format: prefer SVG for UI exports, PNG @2x for screenshots. Use `ImageWithFallback` for all case images.
- `max-w-7xl` content width. `px-4 md:px-8` side padding. Do not widen.

## Output format

- Edit existing files. Do not create new files unless the task explicitly requires it.
- Default to no comments in code.
- When content changes are needed, update `docs/portfolio/02_CONTENT_MASTER.md` alongside the code.
- Full portfolio content lives in `docs/portfolio/02_CONTENT_MASTER.md` — not here.
- Planning documents live in `docs/portfolio/` — read them before making structural changes.
