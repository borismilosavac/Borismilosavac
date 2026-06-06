import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Briefcase, Check, Download, Eye, Mail, MapPin, Menu, RotateCcw, SlidersHorizontal, X } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { ImagePlaceholder } from './components/ImagePlaceholder';
import stocklogUi from '../stocklog-ui.png';
import stocklogBoard from '../stocklog-board.svg';
import stocklogShowroom from '../stocklog-showroom.png';

type PreferenceKey = 'largeText' | 'highContrast' | 'lessMotion' | 'quickScan';

type Preferences = Record<PreferenceKey, boolean>;

const preferenceOptions: { key: PreferenceKey; label: string; description: string }[] = [
  { key: 'largeText', label: 'Larger text', description: 'Increase body copy and interface text for easier reading.' },
  { key: 'highContrast', label: 'Higher contrast', description: 'Strengthen text, borders and surfaces for clearer separation.' },
  { key: 'lessMotion', label: 'Less motion', description: 'Reduce animation and smooth scrolling.' },
  { key: 'quickScan', label: 'Quick scan', description: 'Tighten spacing and reduce visual noise for faster reviewing.' },
];

const defaultPreferences: Preferences = {
  largeText: false,
  highContrast: false,
  lessMotion: false,
  quickScan: false,
};

const navItems: { id: string; label: string }[] = [
  { id: 'summary', label: 'Summary' },
  { id: 'work', label: 'Work' },
  { id: 'ai', label: 'AI workflow' },
  { id: 'system', label: 'Systems' },
  { id: 'contact', label: 'Contact' },
];

const fitAreas = [
  {
    title: 'B2B SaaS and operational products',
    body: 'Products with dashboards, cards, filters, tables, status logic, roles, permissions and internal workflows.',
  },
  {
    title: 'Multi-role platforms',
    body: 'Products where different user groups need different levels of control, visibility and simplicity.',
  },
  {
    title: 'E-commerce UX',
    body: 'Online shops where product discovery, filtering, sorting, search and mobile browsing need to be clearer.',
  },
  {
    title: 'Design-system-aware product teams',
    body: 'Teams that need reusable UI patterns, scalable components, states and consistent interface logic.',
  },
  {
    title: 'AI-assisted product workflows',
    body: 'Teams that want faster exploration and prototyping without outsourcing design judgement to AI.',
  },
  {
    title: 'Accessibility-aware interfaces',
    body: 'Products where readability, contrast, keyboard access, motion control and clear states are part of the product quality.',
  },
];

const caseStudies = [
  {
    id: 'stocklog',
    number: '01',
    title: 'StockLog',
    eyebrow: 'B2B SaaS / Operations Platform',
    headline: 'Designing a clearer operational workflow for dealership inventory and sales performance.',
    intro: 'StockLog is a B2B operations concept for automotive dealership teams. I structured the product around two core working views, Inventory and Performance, so teams could manage stock, track active sales activity, and move faster without losing visibility.',
    status: 'MVP / beta preparation',
    industry: 'Automotive dealerships',
    platform: 'Web + mobile',
    role: 'Product Designer / UX/UI Designer',
    focus: 'Inventory workflows, performance visibility, filters, cards, status logic',
    why: 'Dealership teams need fast visibility into stock, active deals, ownership and performance without switching between disconnected tools.',
    problem: 'Dealership teams often work across fragmented inventory updates, unclear deal ownership, inconsistent follow-up, and limited visibility into team performance. The product challenge was to make stock movement, sales activity, and team coordination easier to scan and easier to act on.',
    users: [
      'Dealership Owner: needs high-level visibility into inventory, team performance and location activity.',
      'Sales Manager: needs control over assignments, deals, sales performance and daily team coordination.',
      'Salesperson: needs fast access to available vehicles, active deals, comments, status updates and notifications.',
      'Multi-location Manager: needs a consistent view across several dealership branches without losing local context.',
    ],
    challenge: 'The hardest design question was how to separate seeing inventory clearly from tracking performance clearly without forcing users into one overloaded dashboard.',
    flow: 'Inventory Board -> Vehicle Card -> Assign / Move -> Performance Board -> Goals / Challenges / Leaderboard',
    decisions: [
      'Separate Inventory and Performance so users know whether they are looking at available stock or active sales performance.',
      'Use vehicle cards as the main working unit, with VIN, stock number, make/model, year, condition, price, colour, comments, status and days in stock visible at card level.',
      'Prioritise precise search and filtering by VIN, stock number, model and price because dealership work is lookup-heavy.',
      'Keep goals, challenges and leaderboard logic inside the Performance Board so motivational tools do not distract from inventory control.',
      'Treat permissions and notifications as workflow infrastructure because they define who can act, who can see what, and what changed.',
    ],
    outcome: 'The MVP structure defines two core workspaces, key vehicle card data, search/filter logic, status states, assignment actions and performance modules. This gives the product a clear foundation for beta validation with dealership teams.',
    truth: 'Claimed: product structure, workflow design, UI direction, operational UX logic. Not claimed: launch impact, adoption metrics, dealership revenue results or measured beta outcomes.',
    palette: 'from-slate-950 via-slate-900 to-blue-950',
  },
  {
    id: 'zgrada-plus',
    number: '02',
    title: 'Zgrada Plus',
    eyebrow: 'Multi-role SaaS / PropTech / Facility Management',
    headline: 'Designing one platform for residents, managers, accounting and service partners.',
    intro: 'Zgrada Plus is a multi-role building-management product concept. I organised the experience around role clarity, trust, permissions, and task completion so residents, managers and partner roles could use one platform without being forced into the same interface logic.',
    status: 'MVP / prototype',
    industry: 'PropTech / facility management / civic communication',
    platform: 'Web + iOS + Android',
    role: 'Product Designer / UX/UI Designer',
    focus: 'Multi-role UX, dashboards, forms, permissions, status tracking, accessibility',
    why: 'One platform must support very different users with different tasks, permissions and digital confidence levels.',
    problem: 'Residential building management often breaks down across informal messaging, manual records, unclear maintenance follow-up, and low transparency between stakeholders. The product challenge was to centralise communication, issues, finances, documents and service coordination without creating a heavy or bureaucratic interface.',
    users: [
      'Residents / Apartment Owners: need simple access to announcements, issue reporting, financial information and documents.',
      'Building Managers: need dashboards, resident management, issue tracking, costs, debts, announcements and reporting.',
      'Accounting Services: need structured financial data, import logic and reduced duplication.',
      'Commercial Partners: need campaign visibility and service coordination without damaging user trust.',
      'City / Municipality Roles: need segmented announcements, polls and structured communication.',
      'Admins / Moderators: need control over users, packages, content, logs and permissions.',
    ],
    challenge: 'The core UX tension was inclusion versus complexity: powerful enough for managers and admins, but understandable for residents who may only enter occasionally and may have lower digital confidence.',
    flow: 'Mobile-first resident flows + web-first manager/admin workflows + clear status logic + role-based access + visible consent and privacy decisions',
    decisions: [
      'Make resident journeys mobile-first for announcements, issue reporting, status tracking and documents.',
      'Keep manager and admin workflows web-first for dashboards, tables, reports, validation, assignments and moderation.',
      'Treat permissions as a UX problem so users understand what they can see, change and approve.',
      'Make maintenance status visible so issue reporting does not end at submitting a form.',
      'Use accessibility-aware language and states for a mixed-confidence audience.',
    ],
    outcome: 'The case establishes a strong foundation for a multi-role SaaS product: role model, modular architecture, key flows, accessibility-aware form logic, permission logic and scalable interface direction.',
    truth: 'Claimed: MVP product structure, role-based UX, flow design, interface direction, accessibility-aware product logic. Not claimed: live-market metrics, launched-product outcomes or verified adoption data.',
    palette: 'from-sky-50 via-white to-blue-100',
  },
  {
    id: 'wineroom',
    number: '03',
    title: 'WineRoom',
    eyebrow: 'E-commerce / WooCommerce',
    headline: 'Improving product discovery and mobile browsing for a live WooCommerce wine shop.',
    intro: 'WineRoom is a real e-commerce project focused on helping users find relevant products faster through clearer listing hierarchy, better filter/sort access, search support, and stronger mobile browsing behaviour.',
    status: 'Real active project',
    industry: 'E-commerce / WooCommerce',
    platform: 'Web + mobile',
    role: 'UX/UI optimisation',
    focus: 'Product listing, filtering, sorting, search, mobile toolbar, responsive browsing',
    why: 'E-commerce friction starts before checkout when users cannot quickly find, narrow or compare products.',
    problem: 'When product discovery is slow, e-commerce friction starts before checkout. Wine shoppers may compare by type, price, availability, attributes, origin, preference or occasion. If filters, sorting and search are hard to access, especially on mobile, product discovery becomes slow and uncertain.',
    users: [
      'Returning shoppers: know roughly what they want and need faster search or filtering.',
      'Exploratory shoppers: compare types, prices, product attributes and categories.',
      'Mobile shoppers: need lightweight, always-available controls for filter, sort and search.',
    ],
    challenge: 'The main challenge was balancing information density with scanning speed while keeping filter, sort, search and product cards directly accessible on mobile.',
    flow: 'Browse -> Filter -> Sort -> Search -> Scan product cards',
    decisions: [
      'Improve product-card hierarchy so users can identify product name, price and key attributes quickly.',
      'Make filter and sort easier to access and close to the browsing flow, especially on mobile.',
      'Support faster search access for users who move from exploration to intent.',
      'Treat the mobile toolbar as a primary shopping tool, not just a responsive detail.',
      'Keep catalogue browsing clear, not decorative.',
    ],
    outcome: 'The updated browsing structure gives users clearer access to product discovery actions: filtering, sorting, search and product scanning. The case demonstrates practical e-commerce UX work inside a real WooCommerce environment.',
    truth: 'Claimed: UX/UI optimisation, browsing structure, responsive toolbar, product discovery improvements. Not claimed: conversion lift, revenue increase, sales growth or analytics-backed business metrics.',
    palette: 'from-rose-950 via-stone-950 to-rose-900',
  },
];

const aiSteps = [
  ['Product problem', 'Define the design question before using tools'],
  ['Structured prompt', 'Frame the constraints, users and output type'],
  ['UX flow exploration', 'Generate possible structures and directions'],
  ['Wireframe / layout options', 'Explore early interface organisation'],
  ['Figma Make prototype', 'Move quickly from idea to interaction'],
  ['Human design review', 'Challenge weak outputs and select useful directions'],
  ['UI refinement', 'Turn rough options into usable interface decisions'],
  ['Accessibility check', 'Review contrast, readability, states and motion'],
  ['Product-ready UI direction', 'Prepare a direction that can be refined or built'],
];

const systemGroups = [
  ['StockLog components', 'Vehicle Card', 'Board Column', 'Status Chip', 'Filter Chip', 'Leaderboard Row', 'Notification Card'],
  ['Zgrada Plus components', 'Issue Status Badge', 'Announcement Card', 'Consent Checkbox Group', 'Financial Overview Card', 'CSV Import Validation Row', 'Role Permission Badge'],
  ['WineRoom components', 'Product Card', 'Filter Button', 'Sort Button', 'Search Button', 'Product Attribute Chip'],
];

function scrollTo(id: string, smooth: boolean) {
  document.getElementById(id)?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
}

export default function App() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(() => {
    try {
      return { ...defaultPreferences, ...JSON.parse(localStorage.getItem('portfolio-view-options') || '{}') };
    } catch {
      return defaultPreferences;
    }
  });

  useEffect(() => {
    localStorage.setItem('portfolio-view-options', JSON.stringify(preferences));
  }, [preferences]);

  useEffect(() => {
    if (preferences.lessMotion) {
      document.documentElement.classList.add('experience-reduced-motion');
    } else {
      document.documentElement.classList.remove('experience-reduced-motion');
    }
  }, [preferences.lessMotion]);

  const textSize = preferences.largeText ? 'text-lg' : 'text-base';
  const sectionPad = preferences.quickScan ? 'py-14 md:py-20' : 'py-20 md:py-28';
  const surface = preferences.highContrast ? 'border-slate-900' : 'border-slate-200';
  const smooth = !preferences.lessMotion;

  return (
    <main className={`min-h-screen bg-slate-50 text-slate-950 antialiased ${textSize}`}>
      <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <button onClick={() => scrollTo('top', smooth)} className="flex items-center gap-2.5 text-left" aria-label="Back to top">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-surface-dark text-sm font-bold tracking-tight text-white">BM</span>
            <span className="hidden text-sm font-semibold tracking-tight text-slate-900 sm:block">Boris Milosavac</span>
          </button>
          <div className="hidden items-center gap-0.5 text-sm md:flex">
            {navItems.map(({ id, label }) => (
              <button key={id} onClick={() => scrollTo(id, smooth)} className="rounded-full px-3.5 py-2 font-medium text-slate-600 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none">{label}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a href="mailto:borismilosavac1985@gmail.com" className="hidden items-center gap-2 rounded-full bg-surface-dark px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none sm:inline-flex">Get in touch</a>
            <button onClick={() => setPanelOpen((open) => !open)} className="hidden items-center gap-2 rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-700 transition-colors duration-150 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none sm:inline-flex" aria-expanded={panelOpen}>
              <SlidersHorizontal size={16} /> <span className="hidden sm:inline">View options</span>
            </button>
            <button onClick={() => setMenuOpen((open) => !open)} className="inline-flex items-center justify-center rounded-xl border border-slate-300 p-2 text-slate-700 transition-colors duration-150 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none md:hidden" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <nav aria-label="Mobile navigation">
              <div className="flex flex-col gap-1">
                {navItems.map(({ id, label }) => (
                  <button key={id} onClick={() => { scrollTo(id, smooth); setMenuOpen(false); }} className="rounded-xl px-4 py-3 text-left font-medium text-slate-700 transition-colors duration-150 hover:bg-slate-100 hover:text-slate-950 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none">{label}</button>
                ))}
              </div>
              <div className="mt-3 border-t border-slate-100 pt-3 flex flex-col gap-2">
                <a href="mailto:borismilosavac1985@gmail.com" onClick={() => setMenuOpen(false)} className="inline-flex items-center gap-2 rounded-xl bg-surface-dark px-4 py-3 font-semibold text-white transition-colors duration-150 hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"><Mail size={16} /> Get in touch</a>
                <button onClick={() => { setPanelOpen((open) => !open); setMenuOpen(false); }} className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition-colors duration-150 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"><SlidersHorizontal size={16} /> View options</button>
              </div>
            </nav>
          </div>
        )}
        {panelOpen && (
          <div className="border-t border-slate-200 bg-white px-4 py-5 md:px-8">
            <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[1fr_2fr_auto] md:items-start">
              <div>
                <div className="font-semibold tracking-tight text-slate-900">Adjust this portfolio for easier review</div>
                <p className="mt-1 text-sm text-slate-600">Change readability, contrast and motion preferences for a more comfortable viewing experience.</p>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {preferenceOptions.map((option) => (
                  <button key={option.key} onClick={() => setPreferences((current) => ({ ...current, [option.key]: !current[option.key] }))} className={`rounded-xl border p-3 text-left transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none ${preferences[option.key] ? 'border-blue-600 bg-blue-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
                    <span className="block text-sm font-semibold text-slate-900">{option.label}</span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-600">{option.description}</span>
                  </button>
                ))}
              </div>
              <button onClick={() => setPreferences(defaultPreferences)} className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors duration-150 hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"><RotateCcw size={15} /> Reset</button>
            </div>
            <div className="mx-auto mt-3 max-w-7xl text-xs text-slate-500">Saved on this device only.</div>
          </div>
        )}
      </nav>

      <section id="top" className="relative overflow-hidden bg-surface-dark text-white">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-44 left-1/3 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[130px]" />
          <div className="absolute -bottom-52 right-0 h-[36rem] w-[36rem] rounded-full bg-indigo-600/15 blur-[130px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_55%)]" />
        </div>
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-4 py-20 md:px-8 md:py-28 lg:min-h-[86vh] lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-w-0">
            <div className="mb-7 inline-flex max-w-full items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur"><MapPin size={15} className="shrink-0" /><span className="truncate">Munich, Germany · Authorised to work in Germany</span></div>
            <h1 className="max-w-4xl text-balance type-display">I design complex digital products that people can actually use.</h1>
            <p className="mt-7 max-w-2xl type-lead text-slate-300">Product Designer / Senior UX/UI Designer with 14+ years of hands-on experience across SaaS, B2B operations and e-commerce.</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-slate-400">My strongest work sits where products become operationally complex: dashboards, multi-role workflows, filters, tables, permissions, mobile utility, and reusable UI systems that keep teams moving.</p>
            <div className="mt-7 flex flex-wrap gap-2 text-sm text-slate-200">
              {['Munich-based', 'English fluent', 'Learning German', 'Web + Mobile', 'SaaS / B2B / E-commerce', 'AI-assisted, human-led workflow'].map((tag) => <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">{tag}</span>)}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <button onClick={() => scrollTo('work', smooth)} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-slate-950 transition-colors duration-150 hover:bg-slate-200 active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none">View selected work <ArrowRight size={18} /></button>
              <button onClick={() => scrollTo('summary', smooth)} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-semibold text-white transition-colors duration-150 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none">Read the 60-second summary</button>
              <a href="mailto:borismilosavac1985@gmail.com" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-semibold text-white transition-colors duration-150 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none">Contact Boris</a>
            </div>
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-4">
            {/*
              TODO: Replace ImagePlaceholder frames below with real project
              screenshots before publishing to production. Per
              docs/portfolio/04_GRAPHIC_PROOF_PLAN.md Visual 1, the hero
              composite must not ship until Zgrada Plus (Visual 8) and
              WineRoom (Visual 10) assets exist.
            */}
            <figure
              role="img"
              aria-label="Composite preview of Boris Milosavac's product design portfolio, showing dashboard, mobile and e-commerce interface work."
              className="grid w-full gap-2"
            >
              <ImagePlaceholder variant="dashboard" tone="dark" />
              <div className="grid grid-cols-2 gap-2">
                <ImagePlaceholder variant="mobile" tone="dark" aspectOverride="aspect-[4/3]" />
                <ImagePlaceholder variant="ecommerce" tone="dark" />
              </div>
            </figure>
            <div className="grid gap-2">
              <div className="type-eyebrow text-slate-400">Selected work</div>
              {caseStudies.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id, smooth)} className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-left transition-all duration-200 hover:border-white/25 hover:bg-white/[0.08] focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none">
                  <span className="font-mono text-sm text-slate-400">{item.number}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block type-h3">{item.title}</span>
                    <span className="mt-1 block truncate type-caption text-slate-400">{item.eyebrow}</span>
                  </span>
                  <ArrowUpRight size={20} className="shrink-0 text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="summary" className={`${sectionPad} px-4 md:px-8`}>
        <div className="mx-auto max-w-7xl">
          <div className={`rounded-3xl border bg-white p-6 shadow-sm md:p-12 ${surface}`}>
            <div className="mb-5 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 type-eyebrow text-blue-700">60-second recruiter summary</div>
            <h2 className="max-w-4xl type-h2">If you are hiring for a Munich-based Product Designer or Senior UX/UI Designer, here is the short version.</h2>
            <div className="mt-8 grid gap-6 leading-relaxed text-slate-700 md:grid-cols-2">
              <p>I bring 14+ years of hands-on digital design experience, with the strongest fit in SaaS products, B2B dashboards, operational tools, e-commerce UX, and design-system-aware product teams.</p>
              <p>I work best on products that need structure: dashboards, complex workflows, multi-role permissions, responsive behaviour, and interface states that need to stay clear as products grow.</p>
              <p>I am based in Munich, authorised to work in Germany, fluent in English, and currently learning German.</p>
              <p>I use AI to speed up exploration and prototyping, but I keep final product decisions human, deliberate and accountable.</p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {fitAreas.map((area) => (
              <article key={area.title} className={`rounded-2xl border bg-white p-6 transition-colors duration-150 hover:border-slate-300 ${surface}`}>
                <h3 className="font-semibold tracking-tight text-slate-900">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{area.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className={`${sectionPad} border-y border-slate-200 bg-slate-100 px-4 md:px-8`}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 max-w-3xl">
            <div className="type-eyebrow text-slate-500">Selected work</div>
            <h2 className="mt-3 type-h2">Three product design cases</h2>
            <p className="mt-4 type-lead text-slate-600">A B2B operations platform, a multi-role SaaS product, and a real e-commerce optimisation — each shown as a product problem, not a gallery.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {caseStudies.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id, smooth)} className="group flex flex-col rounded-3xl border border-slate-200 bg-white p-7 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm text-slate-400">{item.number}</span>
                  <ArrowUpRight size={20} className="text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-900" />
                </div>
                <div className="mt-5 type-eyebrow text-blue-700">{item.eyebrow}</div>
                <h3 className="mt-2 type-h3-lg">{item.title}</h3>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-slate-600">{item.intro}</p>
                <p className="mt-5 border-t border-slate-100 pt-4 text-sm leading-relaxed text-slate-500"><span className="font-semibold text-slate-900">Why it matters:</span> {item.why}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {caseStudies.map((item) => {
        const dark = item.id !== 'zgrada-plus';
        const cardSurface = dark ? 'border-white/10 bg-white/[0.05]' : 'border-sky-200 bg-white/85';
        const subText = dark ? 'text-slate-300' : 'text-slate-600';
        const listItem = dark ? 'border-white/10 bg-white/[0.04] text-slate-300' : 'border-sky-100 bg-sky-50/80 text-slate-700';
        return (
          <section key={item.id} id={item.id} className={`relative overflow-hidden ${sectionPad} px-4 md:px-8 bg-gradient-to-br ${item.palette} ${dark ? 'text-white' : 'text-slate-950'}`}>
            <div className="relative mx-auto max-w-7xl">
              <div className="flex flex-wrap items-center gap-4">
                <span className={`font-mono text-5xl font-semibold md:text-6xl ${dark ? 'text-white/15' : 'text-slate-900/15'}`}>{item.number}</span>
                <span className={`rounded-full border px-4 py-2 type-eyebrow ${dark ? 'border-white/15 bg-white/10 text-slate-200' : 'border-sky-200 bg-white/70 text-sky-800'}`}>{item.eyebrow}</span>
                {item.id === 'stocklog' && <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 type-eyebrow text-amber-200">Flagship case</span>}
              </div>
              <h2 className="mt-6 text-balance type-title">{item.title}</h2>
              <p className={`mt-5 max-w-4xl text-xl font-medium leading-snug md:text-2xl ${dark ? 'text-slate-200' : 'text-slate-700'}`}>{item.headline}</p>
              <p className={`mt-5 max-w-[65ch] leading-relaxed ${subText}`}>{item.intro}</p>

              {item.id === 'stocklog' && (
                <figure className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40 shadow-2xl shadow-black/40">
                  <ImageWithFallback src={stocklogUi} alt="StockLog dashboard concept showing dealership inventory cards, filters and sales performance structure." className="w-full" />
                  <figcaption className="border-t border-white/10 px-5 py-3 type-caption text-slate-400">Two-board structure separates inventory visibility from sales performance.</figcaption>
                </figure>
              )}

              {item.id === 'zgrada-plus' && (
                <ImagePlaceholder
                  variant="ecosystem"
                  tone="light"
                  className="mt-10"
                  alt="Zgrada Plus role ecosystem showing residents, managers, accounting, partners, city roles and admins."
                  caption="Role-based structure keeps resident tasks simple while supporting dense manager workflows."
                />
              )}

              {item.id === 'wineroom' && (
                /*
                  TODO: Replace this ImagePlaceholder with real WineRoom
                  screenshot before publishing. Per 04_GRAPHIC_PROOF_PLAN
                  Visual 10, the placeholder must not ship to production.
                  Needs live site URL to capture desktop product listing.
                */
                <ImagePlaceholder
                  variant="ecommerce"
                  tone="dark"
                  className="mt-10"
                  alt="WineRoom e-commerce product listing with filters, sorting and scannable product cards."
                  caption="Product discovery starts with clear listing, filtering and sorting."
                />
              )}

              <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
                {[
                  ['Status', item.status],
                  ['Industry', item.industry],
                  ['Platform', item.platform],
                  ['My role', item.role],
                  ['Focus', item.focus],
                ].map(([label, value]) => (
                  <div key={label} className={`rounded-2xl border p-4 ${dark ? 'border-white/10 bg-white/[0.05]' : 'border-sky-200 bg-white/80'}`}>
                    <div className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
                    <div className="mt-2 text-sm font-semibold leading-snug">{value}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <article className={`rounded-3xl border p-6 md:p-8 ${cardSurface}`}>
                  <h3 className="type-h3">The problem</h3>
                  <p className={`mt-4 leading-relaxed ${subText}`}>{item.problem}</p>
                </article>
                <article className={`rounded-3xl border p-6 md:p-8 ${cardSurface}`}>
                  <h3 className="type-h3">Core UX challenge</h3>
                  <p className={`mt-4 leading-relaxed ${subText}`}>{item.challenge}</p>
                  <div className={`mt-5 rounded-2xl border p-4 font-mono text-sm leading-relaxed ${dark ? 'border-white/10 bg-black/25 text-slate-200' : 'border-sky-200 bg-sky-50 text-slate-800'}`}>{item.flow}</div>
                </article>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <article className={`rounded-3xl border p-6 md:p-8 ${cardSurface}`}>
                  <h3 className="type-h3">Users</h3>
                  <ul className="mt-4 space-y-3">
                    {item.users.map((user) => <li key={user} className={`rounded-xl border p-3.5 text-[0.9375rem] leading-relaxed ${listItem}`}>{user}</li>)}
                  </ul>
                </article>
                <article className={`rounded-3xl border p-6 md:p-8 ${cardSurface}`}>
                  <h3 className="type-h3">Key design decisions</h3>
                  <ol className="mt-4 space-y-3">
                    {item.decisions.map((decision, index) => (
                      <li key={decision} className={`flex gap-3 rounded-xl border p-3.5 text-[0.9375rem] leading-relaxed ${listItem}`}>
                        <span className={`mt-px font-mono text-xs ${dark ? 'text-slate-400' : 'text-sky-700'}`}>{String(index + 1).padStart(2, '0')}</span>
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ol>
                </article>
              </div>

              {item.id === 'stocklog' && (
                <>
                  {/*
                    TODO: Replace the ImagePlaceholder frames (vehicle card
                    anatomy, mobile view) with real StockLog UI exports before
                    publishing. Per 04_GRAPHIC_PROOF_PLAN Visuals 3 & 5, blank
                    placeholders must not ship to production.
                  */}
                  <div className="mt-5 grid gap-5 lg:grid-cols-2 lg:items-start">
                    <ImagePlaceholder
                      variant="board"
                      tone="dark"
                      aspectOverride="aspect-[4/3]"
                      alt="Vehicle card anatomy showing key dealership inventory data fields."
                      caption="Vehicle cards keep operational data scannable at board level."
                    />
                    <figure className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/40">
                      <ImageWithFallback src={stocklogBoard} alt="Search and filter interface for dealership inventory and sales workflow." className="w-full" />
                      <figcaption className="border-t border-white/10 px-5 py-3 type-caption text-slate-400">Precise search supports lookup-heavy dealership workflows.</figcaption>
                    </figure>
                  </div>
                  <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1.4fr] lg:items-start">
                    <ImagePlaceholder
                      variant="mobile"
                      tone="dark"
                      className="mx-auto w-full max-w-[280px]"
                      alt="Mobile StockLog interface showing vehicle cards and operational actions."
                      caption="Mobile view supports quick access to inventory and deal status."
                    />
                    <figure className="overflow-hidden rounded-3xl border border-white/10">
                      <ImageWithFallback src={stocklogShowroom} alt="Concept visualisation of the StockLog board displayed on a large screen in an automotive showroom environment." className="w-full" />
                      <figcaption className="border-t border-white/10 px-5 py-3 type-caption text-slate-400">Concept visualisation — context only.</figcaption>
                    </figure>
                  </div>
                </>
              )}

              {item.id === 'zgrada-plus' && (
                <>
                  {/*
                    TODO: Replace these ImagePlaceholder frames with real Zgrada Plus
                    screen exports before publishing. Per 04_GRAPHIC_PROOF_PLAN
                    Visuals 6-9, blank placeholders must not ship to production.
                  */}
                  <ImagePlaceholder
                    variant="dashboard"
                    tone="light"
                    className="mt-5"
                    alt="Zgrada Plus manager dashboard showing building management overview and operational modules."
                    caption="Manager workflows use denser web layouts for overview and control."
                  />
                  <div className="mt-5 grid gap-5 lg:grid-cols-2 lg:items-start">
                    <div role="img" aria-label="Mobile resident flow for building management, issue reporting and status tracking.">
                      <div className="grid grid-cols-3 gap-2">
                        <ImagePlaceholder variant="mobile" tone="light" />
                        <ImagePlaceholder variant="mobile" tone="light" />
                        <ImagePlaceholder variant="mobile" tone="light" />
                      </div>
                      <div className="mt-2 type-caption text-slate-500">Resident flows stay mobile-first and task-focused.</div>
                    </div>
                    <ImagePlaceholder
                      variant="board"
                      tone="light"
                      aspectOverride="aspect-[4/3]"
                      alt="Zgrada Plus interface states showing status badges, consent controls and form feedback."
                      caption="Accessibility is shown through readable states, labels and predictable controls."
                    />
                  </div>
                </>
              )}

              {item.id === 'wineroom' && (
                <>
                  {/*
                    TODO: Replace these ImagePlaceholder frames with real WineRoom
                    screenshots before publishing. Per 04_GRAPHIC_PROOF_PLAN
                    Visuals 11 & 12, placeholders must not ship to production.
                    Needs live site URL to capture mobile toolbar and filter state.
                  */}
                  <div className="mt-5 grid gap-5 lg:grid-cols-2 lg:items-start">
                    <ImagePlaceholder
                      variant="mobile"
                      tone="dark"
                      className="mx-auto w-full max-w-[280px]"
                      alt="WineRoom mobile product listing with filter, sort and search toolbar."
                      caption="Mobile toolbar keeps filter, sort and search available during browsing."
                    />
                    <ImagePlaceholder
                      variant="ecommerce"
                      tone="dark"
                      aspectOverride="aspect-[4/3]"
                      alt="WineRoom filter and search interface for product discovery."
                      caption="Search and filters reduce browsing friction before checkout."
                    />
                  </div>
                </>
              )}

              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <article className={`rounded-3xl border p-6 md:p-8 ${cardSurface}`}>
                  <h3 className="type-h3">Design outcome</h3>
                  <p className={`mt-4 leading-relaxed ${subText}`}>{item.outcome}</p>
                </article>
                <article className={`rounded-3xl border p-6 md:p-8 ${dark ? 'border-amber-300/25 bg-amber-300/[0.08]' : 'border-amber-300 bg-amber-50'}`}>
                  <h3 className={`type-h3 ${dark ? 'text-amber-200' : 'text-amber-900'}`}>Truth layer</h3>
                  <p className={`mt-4 leading-relaxed ${dark ? 'text-amber-100/90' : 'text-amber-900'}`}>{item.truth}</p>
                </article>
              </div>
            </div>
          </section>
        );
      })}

      <section id="ai" className={`relative overflow-hidden ${sectionPad} bg-surface-dark px-4 text-white md:px-8`}>
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.12),transparent_45%)]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="type-eyebrow text-slate-400">AI-assisted workflow</div>
            <h2 className="mt-3 type-h2">Using AI to accelerate exploration without outsourcing design judgement.</h2>
            <p className="mt-5 type-lead text-slate-300">I use AI as a design accelerator for ideation, flow exploration, structured prompting and rapid prototyping. The final judgement, refinement and accessibility review stay human-led.</p>
          </div>
          <div className="mt-12 space-y-5">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3 type-eyebrow text-slate-400">
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Steps 01–05</span>
                AI-assisted exploration
              </div>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
                {aiSteps.slice(0, 5).map(([step, purpose], index) => (
                  <div key={step} className="bg-surface-dark p-5 transition-colors duration-150 hover:bg-slate-900">
                    <div className="font-mono text-sm text-slate-400">{String(index + 1).padStart(2, '0')}</div>
                    <h3 className="mt-2 text-sm font-semibold tracking-tight text-white">{step}</h3>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-slate-400">{purpose}</p>
                  </div>
                ))}
              </div>
            </div>

            <div aria-hidden className="flex justify-center text-slate-600">
              <ArrowRight size={20} className="rotate-90" />
            </div>

            <div className="rounded-2xl border-2 border-blue-500/60 bg-blue-500/[0.12] p-6 md:p-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500 text-white"><Eye size={20} /></span>
                <span className="font-mono text-sm text-blue-300">06</span>
                <span className="rounded-full bg-blue-500/20 px-3 py-1 type-eyebrow text-blue-200">Human-led checkpoint</span>
              </div>
              <h3 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">{aiSteps[5][0]}</h3>
              <p className="mt-2 max-w-2xl leading-relaxed text-slate-200">{aiSteps[5][1]}</p>
            </div>

            <div aria-hidden className="flex justify-center text-slate-600">
              <ArrowRight size={20} className="rotate-90" />
            </div>

            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3 type-eyebrow text-slate-400">
                <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1">Steps 07–09</span>
                Human-led refinement &amp; delivery
              </div>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-3">
                {aiSteps.slice(6).map(([step, purpose], index) => (
                  <div key={step} className="bg-surface-dark p-5 transition-colors duration-150 hover:bg-slate-900">
                    <div className="font-mono text-sm text-slate-400">{String(index + 7).padStart(2, '0')}</div>
                    <h3 className="mt-2 text-sm font-semibold tracking-tight text-white">{step}</h3>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-slate-400">{purpose}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/*
            TODO: Replace these ImagePlaceholder frames with real process
            artefacts (an actual prompt, wireframe and refined screen) before
            publishing. Per 04_GRAPHIC_PROOF_PLAN Visual 14, do not fabricate —
            placeholders must not ship to production.
          */}
          <div className="mt-6">
            <div role="img" aria-label="Three-step AI-assisted design example showing prompt, wireframe and refined interface direction." className="grid gap-2 sm:grid-cols-3">
              <ImagePlaceholder variant="board" tone="dark" aspectOverride="aspect-[4/3]" />
              <ImagePlaceholder variant="board" tone="dark" aspectOverride="aspect-[4/3]" />
              <ImagePlaceholder variant="board" tone="dark" aspectOverride="aspect-[4/3]" />
            </div>
            <div className="mt-2 type-caption text-slate-400">Generated options are treated as draft material, not final design.</div>
          </div>
          <div className="mt-6 grid gap-5 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:grid-cols-[1fr_1.4fr] md:p-8">
            <p className="text-2xl font-semibold tracking-tight md:text-3xl">AI gives range.<br />Human review gives judgement.</p>
            <p className="leading-relaxed text-slate-300">Truth layer: AI-assisted exploration, prompt structuring, workflow acceleration and human-led review are claimed. Fully automated design, AI-generated final products, fake productivity metrics and replacement of design judgement are not claimed.</p>
          </div>
        </div>
      </section>

      <section id="system" className={`${sectionPad} bg-white px-4 md:px-8`}>
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="type-eyebrow text-blue-700">Design system snapshot</div>
            <h2 className="mt-3 type-h2">Designing screens, and the reusable rules behind them.</h2>
            <p className="mt-5 type-lead text-slate-600">This section shows how I think about reusability across cards, tables, forms, filters, states, mobile controls and accessibility notes. It is evidence of scalable UI thinking, not a claim that every project has a finished enterprise library.</p>
          </div>
          {/*
            TODO: Replace this ImagePlaceholder with a real component board
            (StockLog's can be cropped from existing UI) before publishing. Per
            04_GRAPHIC_PROOF_PLAN Visual 15, placeholder must not ship; the
            project-specific chip cards below remain the honest baseline.
          */}
          <ImagePlaceholder
            variant="board"
            tone="light"
            className="mt-12"
            alt="Portfolio design system snapshot showing reusable project-specific cards, badges, filters and controls."
            caption="Reusable UI patterns make complex products easier to scale."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {systemGroups.map(([title, ...items]) => (
              <article key={title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 md:p-7">
                <h3 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h3>
                <div className="mt-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-400">{items.length} components</div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((component) => <span key={component} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">{component}</span>)}
                </div>
              </article>
            ))}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="rounded-3xl bg-surface-dark p-6 text-white md:p-8">
              <h3 className="type-h3">Key system principles</h3>
              <ul className="mt-5 space-y-3 text-slate-300">
                {['Reuse patterns where products repeat decisions.', 'Design states, not only screens.', 'Make clarity scalable as roles, modules and data are added.', 'Treat accessibility as system quality.'].map((principle) => (
                  <li key={principle} className="flex gap-3"><Check size={18} className="mt-0.5 shrink-0 text-blue-400" /> {principle}</li>
                ))}
              </ul>
            </article>
            <article className="rounded-3xl border border-amber-300 bg-amber-50 p-6 text-amber-950 md:p-8">
              <h3 className="type-h3 text-amber-900">Truth layer</h3>
              <p className="mt-5 leading-relaxed">Claimed: reusable UI thinking, state design, component grouping, accessibility-aware product patterns. Not claimed: a final production design system for every project unless verified.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="contact" className={`relative overflow-hidden ${sectionPad} bg-surface-dark px-4 text-white md:px-8`}>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -bottom-40 left-1/4 h-[34rem] w-[34rem] rounded-full bg-blue-600/15 blur-[130px]" />
        </div>
        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="type-eyebrow text-slate-400">Contact</div>
            <h2 className="mt-3 text-balance type-title">Let’s build clearer digital product experiences.</h2>
            <p className="mt-6 max-w-3xl type-lead text-slate-300">I am a Munich-based Product Designer focused on SaaS, B2B operations, e-commerce UX, reusable UI systems, accessibility, and AI-assisted product exploration.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-6 md:p-8">
              <h3 className="type-h3">Contact details</h3>
              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                <div><dt className="text-sm text-slate-400">Name</dt><dd className="mt-0.5 font-semibold">Boris Milosavac</dd></div>
                <div><dt className="text-sm text-slate-400">Location</dt><dd className="mt-0.5 font-semibold">Munich, Germany</dd></div>
                <div><dt className="text-sm text-slate-400">Work authorisation</dt><dd className="mt-0.5 font-semibold">Authorised to work in Germany</dd></div>
                <div><dt className="text-sm text-slate-400">Languages</dt><dd className="mt-0.5 font-semibold">English fluent · Learning German</dd></div>
                <div><dt className="text-sm text-slate-400">Email</dt><dd className="mt-0.5 font-semibold break-words">borismilosavac1985@gmail.com</dd></div>
                <div><dt className="text-sm text-slate-400">Portfolio</dt><dd className="mt-0.5 font-semibold">borism.design</dd></div>
              </dl>
            </div>
            <div className="grid content-start gap-3">
              <a href="mailto:borismilosavac1985@gmail.com" className="group inline-flex items-center justify-between rounded-2xl bg-white p-5 font-semibold text-slate-950 transition-colors duration-150 hover:bg-slate-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"><span className="inline-flex items-center gap-3"><Mail size={20} /> Email Boris</span><ArrowRight size={20} className="transition-all duration-200 group-hover:translate-x-0.5" /></a>
              <button onClick={() => window.print()} className="group inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-5 font-semibold text-white transition-colors duration-150 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"><span className="inline-flex items-center gap-3"><Download size={20} /> Print / Save as PDF</span><ArrowRight size={20} className="transition-all duration-200 group-hover:translate-x-0.5" /></button>
              <button onClick={() => scrollTo('top', smooth)} className="group inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-5 font-semibold text-white transition-colors duration-150 hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none"><span className="inline-flex items-center gap-3"><Eye size={20} /> Back to top</span><ArrowRight size={20} className="transition-all duration-200 group-hover:translate-x-0.5" /></button>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <div className="inline-flex items-center gap-2 text-sm text-slate-300"><Briefcase size={18} /> Availability</div>
                <p className="mt-2 font-semibold leading-relaxed">Open to Product Designer, Senior UX/UI Designer and UX/UI Designer roles in Munich, onsite, hybrid or remote.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <div className="inline-flex items-center gap-2 text-sm text-slate-300"><Check size={18} /> Best fit</div>
                <p className="mt-2 leading-relaxed text-slate-300">SaaS products · B2B dashboards · Operational tools · E-commerce UX · Design systems · AI-assisted workflows</p>
              </div>
            </div>
          </div>
          {/*
            TODO: Replace this subtle ImagePlaceholder strip with a small real
            preview of project interfaces before publishing. Per
            04_GRAPHIC_PROOF_PLAN Visual 16, placeholder must not ship. Kept
            secondary so it never competes with the contact CTAs above.
          */}
          <ImagePlaceholder
            variant="board"
            tone="dark"
            className="mt-12 opacity-80"
            aspectOverride="aspect-[5/1]"
            alt="Small visual preview strip of Boris Milosavac's product design portfolio."
          />
          <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 type-caption text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Boris Milosavac</span>
            <span>Munich, Germany · borism.design</span>
          </div>
        </div>
      </section>
    </main>
  );
}
