# 02 — Content Master

This file is the single source of truth for all portfolio text content. It mirrors the data structures in `src/app/App.tsx` and will serve as the reference for any content edits. Do not edit content in JSX directly without updating this file.

---

## Global identity

| Field | Value |
|---|---|
| Full name | Boris Milosavac |
| Role title | Product Designer / Senior UX/UI Designer |
| Location | Munich, Germany |
| Work status | Authorised to work in Germany |
| Languages | English fluent · Learning German |
| Email | borismilosavac1985@gmail.com |
| Portfolio URL | borism.design |
| Experience | 14+ years |
| Copyright | © 2026 Boris Milosavac |

---

## Hero

**Positioning badge:**
> Munich, Germany · Authorised to work in Germany

**H1:**
> I design complex digital products that people can actually use.

**Sub-headline (p1):**
> Product Designer / Senior UX/UI Designer with 14+ years of hands-on experience across SaaS, B2B operations and e-commerce.

**Body (p2):**
> My strongest work sits where products become operationally complex: dashboards, multi-role workflows, filters, tables, permissions, mobile utility, and reusable UI systems that keep teams moving.

**Tags:**
- Munich-based
- English fluent
- Learning German
- Web + Mobile
- SaaS / B2B / E-commerce
- AI-assisted, human-led workflow

**CTAs:**
- Primary: View selected work
- Secondary: Read the 60-second summary
- Tertiary: Contact Boris → `mailto:borismilosavac1985@gmail.com`

---

## 60-second summary

**Section label:** 60-second recruiter summary

**H2:**
> If you are hiring for a Munich-based Product Designer or Senior UX/UI Designer, here is the short version.

**Body paragraphs:**
1. I bring 14+ years of hands-on digital design experience, with the strongest fit in SaaS products, B2B dashboards, operational tools, e-commerce UX, and design-system-aware product teams.
2. I work best on products that need structure: dashboards, complex workflows, multi-role permissions, responsive behaviour, and interface states that need to stay clear as products grow.
3. I am based in Munich, authorised to work in Germany, fluent in English, and currently learning German.
4. I use AI to speed up exploration and prototyping, but I keep final product decisions human, deliberate and accountable.

---

## Fit areas

| Title | Body |
|---|---|
| B2B SaaS and operational products | Products with dashboards, cards, filters, tables, status logic, roles, permissions and internal workflows. |
| Multi-role platforms | Products where different user groups need different levels of control, visibility and simplicity. |
| E-commerce UX | Online shops where product discovery, filtering, sorting, search and mobile browsing need to be clearer. |
| Design-system-aware product teams | Teams that need reusable UI patterns, scalable components, states and consistent interface logic. |
| AI-assisted product workflows | Teams that want faster exploration and prototyping without outsourcing design judgement to AI. |
| Accessibility-aware interfaces | Products where readability, contrast, keyboard access, motion control and clear states are part of the product quality. |

---

## Case study 01 — StockLog

| Field | Value |
|---|---|
| ID | stocklog |
| Number | 01 |
| Eyebrow | B2B SaaS / Operations Platform |
| Status | MVP / beta preparation |
| Industry | Automotive dealerships |
| Platform | Web + mobile |
| Role | Product Designer / UX/UI Designer |
| Focus | Inventory workflows, performance visibility, filters, cards, status logic |
| Gradient | from-slate-950 via-slate-900 to-blue-950 (dark) |

**Headline:**
> Designing a clearer operational workflow for dealership inventory and sales performance.

**Intro:**
> StockLog is a B2B operations concept for automotive dealership teams. I structured the product around two core working views, Inventory and Performance, so teams could manage stock, track active sales activity, and move faster without losing visibility.

**Why it matters:**
> Dealership teams need fast visibility into stock, active deals, ownership and performance without switching between disconnected tools.

**The problem:**
> Dealership teams often work across fragmented inventory updates, unclear deal ownership, inconsistent follow-up, and limited visibility into team performance. The product challenge was to make stock movement, sales activity, and team coordination easier to scan and easier to act on.

**Users:**
1. Dealership Owner: needs high-level visibility into inventory, team performance and location activity.
2. Sales Manager: needs control over assignments, deals, sales performance and daily team coordination.
3. Salesperson: needs fast access to available vehicles, active deals, comments, status updates and notifications.
4. Multi-location Manager: needs a consistent view across several dealership branches without losing local context.

**Core UX challenge:**
> The hardest design question was how to separate seeing inventory clearly from tracking performance clearly without forcing users into one overloaded dashboard.

**User flow:**
> Inventory Board → Vehicle Card → Assign / Move → Performance Board → Goals / Challenges / Leaderboard

**Key design decisions:**
1. Separate Inventory and Performance so users know whether they are looking at available stock or active sales performance.
2. Use vehicle cards as the main working unit, with VIN, stock number, make/model, year, condition, price, colour, comments, status and days in stock visible at card level.
3. Prioritise precise search and filtering by VIN, stock number, model and price because dealership work is lookup-heavy.
4. Keep goals, challenges and leaderboard logic inside the Performance Board so motivational tools do not distract from inventory control.
5. Treat permissions and notifications as workflow infrastructure because they define who can act, who can see what, and what changed.

**Design outcome:**
> The MVP structure defines two core workspaces, key vehicle card data, search/filter logic, status states, assignment actions and performance modules. This gives the product a clear foundation for beta validation with dealership teams.

**Truth layer:**
> Claimed: product structure, workflow design, UI direction, operational UX logic. Not claimed: launch impact, adoption metrics, dealership revenue results or measured beta outcomes.

**Visual evidence status:** `src/SL1.png`, `src/StockLog showroom.png`, `src/SotckLog desktop.svg`, `src/sl-hero.svg`, `src/sl-hero-1.svg` — present in src/ but not displayed in any case section. **Need to integrate.**

---

## Case study 02 — Zgrada Plus

| Field | Value |
|---|---|
| ID | zgrada-plus |
| Number | 02 |
| Eyebrow | Multi-role SaaS / PropTech / Facility Management |
| Status | MVP / prototype |
| Industry | PropTech / facility management / civic communication |
| Platform | Web + iOS + Android |
| Role | Product Designer / UX/UI Designer |
| Focus | Multi-role UX, dashboards, forms, permissions, status tracking, accessibility |
| Gradient | from-sky-50 via-white to-blue-100 (light) |

**Headline:**
> Designing one platform for residents, managers, accounting and service partners.

**Intro:**
> Zgrada Plus is a multi-role building-management product concept. I organised the experience around role clarity, trust, permissions, and task completion so residents, managers and partner roles could use one platform without being forced into the same interface logic.

**Why it matters:**
> One platform must support very different users with different tasks, permissions and digital confidence levels.

**The problem:**
> Residential building management often breaks down across informal messaging, manual records, unclear maintenance follow-up, and low transparency between stakeholders. The product challenge was to centralise communication, issues, finances, documents and service coordination without creating a heavy or bureaucratic interface.

**Users:**
1. Residents / Apartment Owners: need simple access to announcements, issue reporting, financial information and documents.
2. Building Managers: need dashboards, resident management, issue tracking, costs, debts, announcements and reporting.
3. Accounting Services: need structured financial data, import logic and reduced duplication.
4. Commercial Partners: need campaign visibility and service coordination without damaging user trust.
5. City / Municipality Roles: need segmented announcements, polls and structured communication.
6. Admins / Moderators: need control over users, packages, content, logs and permissions.

**Core UX challenge:**
> The core UX tension was inclusion versus complexity: powerful enough for managers and admins, but understandable for residents who may only enter occasionally and may have lower digital confidence.

**User flow:**
> Mobile-first resident flows + web-first manager/admin workflows + clear status logic + role-based access + visible consent and privacy decisions

**Key design decisions:**
1. Make resident journeys mobile-first for announcements, issue reporting, status tracking and documents.
2. Keep manager and admin workflows web-first for dashboards, tables, reports, validation, assignments and moderation.
3. Treat permissions as a UX problem so users understand what they can see, change and approve.
4. Make maintenance status visible so issue reporting does not end at submitting a form.
5. Use accessibility-aware language and states for a mixed-confidence audience.

**Design outcome:**
> The case establishes a strong foundation for a multi-role SaaS product: role model, modular architecture, key flows, accessibility-aware form logic, permission logic and scalable interface direction.

**Truth layer:**
> Claimed: MVP product structure, role-based UX, flow design, interface direction, accessibility-aware product logic. Not claimed: live-market metrics, launched-product outcomes or verified adoption data.

**Visual evidence status:** No images present for this case. **Missing — needs design exports.**

---

## Case study 03 — WineRoom

| Field | Value |
|---|---|
| ID | wineroom |
| Number | 03 |
| Eyebrow | E-commerce / WooCommerce |
| Status | Real active project |
| Industry | E-commerce / WooCommerce |
| Platform | Web + mobile |
| Role | UX/UI optimisation |
| Focus | Product listing, filtering, sorting, search, mobile toolbar, responsive browsing |
| Gradient | from-rose-950 via-stone-950 to-rose-900 (dark) |

**Headline:**
> Improving product discovery and mobile browsing for a live WooCommerce wine shop.

**Intro:**
> WineRoom is a real e-commerce project focused on helping users find relevant products faster through clearer listing hierarchy, better filter/sort access, search support, and stronger mobile browsing behaviour.

**Why it matters:**
> E-commerce friction starts before checkout when users cannot quickly find, narrow or compare products.

**The problem:**
> When product discovery is slow, e-commerce friction starts before checkout. Wine shoppers may compare by type, price, availability, attributes, origin, preference or occasion. If filters, sorting and search are hard to access, especially on mobile, product discovery becomes slow and uncertain.

**Users:**
1. Returning shoppers: know roughly what they want and need faster search or filtering.
2. Exploratory shoppers: compare types, prices, product attributes and categories.
3. Mobile shoppers: need lightweight, always-available controls for filter, sort and search.

**Core UX challenge:**
> The main challenge was balancing information density with scanning speed while keeping filter, sort, search and product cards directly accessible on mobile.

**User flow:**
> Browse → Filter → Sort → Search → Scan product cards

**Key design decisions:**
1. Improve product-card hierarchy so users can identify product name, price and key attributes quickly.
2. Make filter and sort easier to access and close to the browsing flow, especially on mobile.
3. Support faster search access for users who move from exploration to intent.
4. Treat the mobile toolbar as a primary shopping tool, not just a responsive detail.
5. Keep catalogue browsing clear, not decorative.

**Design outcome:**
> The updated browsing structure gives users clearer access to product discovery actions: filtering, sorting, search and product scanning. The case demonstrates practical e-commerce UX work inside a real WooCommerce environment.

**Truth layer:**
> Claimed: UX/UI optimisation, browsing structure, responsive toolbar, product discovery improvements. Not claimed: conversion lift, revenue increase, sales growth or analytics-backed business metrics.

**Visual evidence status:** No images present for this case in the live UI. **Missing — needs before/after screenshots.**

---

## AI workflow section

**Section label:** AI-assisted workflow

**H2:**
> Using AI to accelerate exploration without outsourcing design judgement.

**Intro:**
> I use AI as a design accelerator for ideation, flow exploration, structured prompting and rapid prototyping. The final judgement, refinement and accessibility review stay human-led.

**9 steps:**

| # | Step | Purpose |
|---|---|---|
| 1 | Product problem | Define the design question before using tools |
| 2 | Structured prompt | Frame the constraints, users and output type |
| 3 | UX flow exploration | Generate possible structures and directions |
| 4 | Wireframe / layout options | Explore early interface organisation |
| 5 | Figma Make prototype | Move quickly from idea to interaction |
| 6 | Human design review | Challenge weak outputs and select useful directions |
| 7 | UI refinement | Turn rough options into usable interface decisions |
| 8 | Accessibility check | Review contrast, readability, states and motion |
| 9 | Product-ready UI direction | Prepare a direction that can be refined or built |

**Truth layer callout:**
> AI gives range. Human review gives judgement.
> Truth layer: AI-assisted exploration, prompt structuring, workflow acceleration and human-led review are claimed. Fully automated design, AI-generated final products, fake productivity metrics and replacement of design judgement are not claimed.

---

## Design system section

**Section label:** Design System Snapshot

**H2:**
> Designing screens, and the reusable rules behind them.

**Intro:**
> This section shows how I think about reusability across cards, tables, forms, filters, states, mobile controls and accessibility notes. It is evidence of scalable UI thinking, not a claim that every project has a finished enterprise library.

**Component groups:**

| Project | Components |
|---|---|
| StockLog | Vehicle Card · Board Column · Status Chip · Filter Chip · Leaderboard Row · Notification Card |
| Zgrada Plus | Issue Status Badge · Announcement Card · Consent Checkbox Group · Financial Overview Card · CSV Import Validation Row · Role Permission Badge |
| WineRoom | Product Card · Filter Button · Sort Button · Search Button · Product Attribute Chip |

**Key system principles:**
- Reuse patterns where products repeat decisions.
- Design states, not only screens.
- Make clarity scalable as roles, modules and data are added.
- Treat accessibility as system quality.

**Truth layer:**
> Claimed: reusable UI thinking, state design, component grouping, accessibility-aware product patterns. Not claimed: a final production design system for every project unless verified.

---

## Contact section

**H2:**
> Let's build clearer digital product experiences.

**Intro:**
> I am a Munich-based Product Designer focused on SaaS, B2B operations, e-commerce UX, reusable UI systems, accessibility, and AI-assisted product exploration.

**Contact card:**

| Label | Value |
|---|---|
| Name | Boris Milosavac |
| Location | Munich, Germany |
| Work authorisation | Authorised to work in Germany |
| Languages | English fluent · Learning German |
| Email | borismilosavac1985@gmail.com |
| Portfolio | borism.design |

**Action items:**
- Email Boris → `mailto:borismilosavac1985@gmail.com`
- Download CV / PDF → currently `window.print()` — needs a real PDF
- Back to top → scrolls to `#top`

**Availability:**
> Open to Product Designer, Senior UX/UI Designer and UX/UI Designer roles in Munich, onsite, hybrid or remote.

**Best fit:**
> SaaS products · B2B dashboards · Operational tools · E-commerce UX · Design systems · AI-assisted workflows

---

## View options panel

| Key | Label | Description |
|---|---|---|
| largeText | Larger text | Increase body copy and interface text for easier reading. |
| highContrast | Higher contrast | Strengthen text, borders and surfaces for clearer separation. |
| lessMotion | Less motion | Reduce animation and smooth scrolling. |
| quickScan | Quick scan | Tighten spacing and reduce visual noise for faster reviewing. |

---

## Missing content (confirmed gaps)

| Item | Status | Priority |
|---|---|---|
| LinkedIn URL | Not present anywhere | High |
| CV / PDF file | No file — only `window.print()` | High |
| StockLog screenshots integrated into case | Images exist in src/ but not displayed | High |
| Zgrada Plus visual exports | No images present | High |
| WineRoom before/after screenshots | No images present | High |
| OG image for social sharing | Not set in index.html | Medium |
| Canonical URL tag | Not set | Medium |
| WineRoom live site URL | Not linked | Medium |
| Figma community / Behance link | Not present | Low |
| Dribbble link | Not present | Low |
