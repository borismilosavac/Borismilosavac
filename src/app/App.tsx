import { useState, useEffect, useRef, type RefObject } from 'react';
import { Menu, X, Linkedin, Mail, Globe, ChevronDown, MapPin, Check, Globe2, Calendar, Briefcase, ArrowRight, Download, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

type Hotspot = {
  n: string;
  pos: string;
  tip: string;
  title: string;
  desc: string;
};

function PhotoHotspot({
  hotspot,
  colorClass,
  tooltipClass = 'w-44 sm:w-52',
}: {
  hotspot: Hotspot;
  colorClass: string;
  tooltipClass?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`absolute ${hotspot.pos} group`}
      onBlur={(event) => {
        const nextFocus = event.relatedTarget as Node | null;
        if (!nextFocus || !event.currentTarget.contains(nextFocus)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-label={`Show annotation: ${hotspot.title}`}
        onClick={() => setOpen((current) => !current)}
        className={`photo-hotspot-button w-9 h-9 sm:w-8 sm:h-8 rounded-full ${colorClass} border-2 border-white flex items-center justify-center text-white text-sm font-bold cursor-pointer hover:scale-110 focus:scale-110 focus:outline-none focus:ring-2 focus:ring-white/90 focus:ring-offset-2 focus:ring-offset-transparent transition-transform`}
      >
        {hotspot.n}
      </button>
      <div
        className={`photo-hotspot-tooltip absolute ${hotspot.tip} ${tooltipClass} max-w-[calc(100vw-3rem)] bg-white/95 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-2xl ${open ? 'opacity-100' : 'opacity-0'} group-hover:opacity-100 transition-opacity pointer-events-none z-10`}
      >
        <div className="text-xs font-semibold text-[#0F172A] mb-1">{hotspot.title}</div>
        <div className="text-xs text-[#64748B]">{hotspot.desc}</div>
      </div>
    </div>
  );
}

type ExperienceSettings = {
  largeText: boolean;
  highContrast: boolean;
  reducedMotion: boolean;
  quickScan: boolean;
};

type ExperienceSettingKey = keyof ExperienceSettings;

const EXPERIENCE_STORAGE_KEY = 'portfolio-experience-settings';

const DEFAULT_EXPERIENCE_SETTINGS: ExperienceSettings = {
  largeText: false,
  highContrast: false,
  reducedMotion: false,
  quickScan: false,
};

const EXPERIENCE_CLASS_NAMES: Record<ExperienceSettingKey, string> = {
  largeText: 'experience-large-text',
  highContrast: 'experience-high-contrast',
  reducedMotion: 'experience-reduced-motion',
  quickScan: 'experience-quick-scan',
};

const EXPERIENCE_OPTIONS: { key: ExperienceSettingKey; label: string; description: string }[] = [
  { key: 'largeText', label: 'Large Text', description: 'Larger portfolio copy and controls.' },
  { key: 'highContrast', label: 'High Contrast', description: 'Stronger surfaces, borders and text.' },
  { key: 'reducedMotion', label: 'Reduced Motion', description: 'Disables ambient motion and smooth scroll.' },
  { key: 'quickScan', label: 'Quick Scan / Reading Mode', description: 'Tighter sections with less visual noise.' },
];

const readExperienceSettings = (): ExperienceSettings => {
  if (typeof window === 'undefined') return DEFAULT_EXPERIENCE_SETTINGS;

  try {
    const stored = window.localStorage.getItem(EXPERIENCE_STORAGE_KEY);
    if (!stored) return DEFAULT_EXPERIENCE_SETTINGS;
    const parsed = JSON.parse(stored) as Partial<ExperienceSettings>;

    return {
      largeText: Boolean(parsed.largeText),
      highContrast: Boolean(parsed.highContrast),
      reducedMotion: Boolean(parsed.reducedMotion),
      quickScan: Boolean(parsed.quickScan),
    };
  } catch {
    return DEFAULT_EXPERIENCE_SETTINGS;
  }
};

function AdjustExperiencePanel({
  settings,
  open,
  panelRef,
  onOpenChange,
  onToggle,
  onReset,
}: {
  settings: ExperienceSettings;
  open: boolean;
  panelRef: RefObject<HTMLDivElement>;
  onOpenChange: (open: boolean) => void;
  onToggle: (key: ExperienceSettingKey) => void;
  onReset: () => void;
}) {
  const activeCount = Object.values(settings).filter(Boolean).length;

  return (
    <div ref={panelRef} className="experience-panel fixed top-[58px] right-3 sm:top-[64px] sm:right-4 md:top-[76px] z-[999] flex flex-col items-end gap-2">
      <button
        type="button"
        aria-label={open ? 'Close Adjust Experience panel' : 'Open Adjust Experience panel'}
        aria-expanded={open}
        aria-controls="adjust-experience-panel"
        onClick={() => onOpenChange(!open)}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-[#080C14]/82 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white shadow-2xl shadow-black/20 backdrop-blur-xl transition-all duration-300 hover:bg-[#111827]/92 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] focus:ring-offset-2 focus:ring-offset-[#080C14]"
      >
        <SlidersHorizontal size={15} aria-hidden="true" />
        <span className="hidden sm:inline">Adjust Experience</span>
        <span className="sm:hidden">Adjust</span>
        {activeCount > 0 && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#60A5FA] px-1.5 text-[11px] text-[#020617]">
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div
          id="adjust-experience-panel"
          role="region"
          aria-label="Adjust Experience settings"
          className="w-[min(calc(100vw-1.5rem),360px)] overflow-hidden rounded-2xl border border-white/18 bg-[#080C14]/94 text-white shadow-2xl shadow-black/35 backdrop-blur-2xl"
        >
          <div className="border-b border-white/10 px-4 py-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8BA4BE]">Accessibility</div>
            <div className="text-sm font-semibold text-white">Adjust Experience</div>
          </div>

          <div className="grid gap-2 p-2">
            {EXPERIENCE_OPTIONS.map((option) => {
              const active = settings[option.key];

              return (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onToggle(option.key)}
                  className={`flex items-center justify-between gap-4 rounded-xl border px-3 py-3 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#60A5FA] ${
                    active
                      ? 'border-[#60A5FA]/70 bg-[#2563EB]/24'
                      : 'border-white/10 bg-white/[0.045] hover:border-white/20 hover:bg-white/[0.075]'
                  }`}
                >
                  <span>
                    <span className="block text-sm font-semibold text-white">{option.label}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-[#8BA4BE]">{option.description}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className={`relative h-5 w-9 shrink-0 rounded-full border transition-colors ${
                      active ? 'border-[#60A5FA] bg-[#60A5FA]' : 'border-white/20 bg-white/10'
                    }`}
                  >
                    <span
                      className={`absolute top-1/2 h-3.5 w-3.5 -translate-y-1/2 rounded-full bg-white transition-transform ${
                        active ? 'translate-x-[18px]' : 'translate-x-1'
                      }`}
                    />
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-white/10 px-3 py-3">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-[#CBD5E1] transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#60A5FA]"
            >
              <RotateCcw size={13} aria-hidden="true" />
              Reset
            </button>
            <span className="text-[11px] text-[#64748B]">Saved on this device</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * ═══════════════════════════════════════════════════════════════════
 *  UNIFIED COLOR SYSTEM — 2026 Portfolio
 * ───────────────────────────────────────────────────────────────────
 *  GLOBAL IDENTITY
 *    Portfolio Blue     #2563EB   primary CTA, nav, profile gradient
 *    Portfolio Indigo   #4F46E5   secondary gradient partner
 *    Portfolio Violet   #6D28D9   aurora accent only
 *
 *  GLOBAL LIGHT SURFACES  (Profile, Skills, Design System)
 *    Surface-0          #FFFFFF
 *    Surface-1          #F8F9FB   section bg alternating
 *    Border             #E2E8F0
 *    Text-1             #0F172A   headings
 *    Text-2             #64748B   body / labels
 *    Text-3             #94A3B8   captions
 *
 *  GLOBAL DARK SURFACES  (Hero, AI Workflow, Contact)
 *    Base               #080C14   deepest bg
 *    Surface            #0C1018   panels
 *    Text-1             #F0F4F8
 *    Text-2             #8BA4BE
 *    Text-3             #566A80
 *
 *  STOCKLOG — Carbon Steel  (same dark base as global dark)
 *    Sub-bg-1           #0C1018   alternating section bg
 *    Sub-bg-2           #0F1320
 *    Card               #141A24
 *    Card raised        #1A2130
 *    Border-1           #253040
 *    Border-2           #1E2A38
 *    Accent             #3B82F6   blue-500 (brighter than portfolio #2563EB)
 *    Accent dim         #1E3A5C
 *
 *  ZGRADA PLUS — Sky Light
 *    Bg-1               #F0F6FF
 *    Bg-2               #E8F2FD
 *    Border             #BFDBFE   blue-200
 *    Accent             #0EA5E9   sky-500
 *    Accent dark        #0369A1   sky-700
 *    Badge              bg #E0F2FE  border #7DD3FC  text #0369A1
 *    Text-1             #0F172A   (same as global)
 *    Text-2             #475569   (same as global)
 *
 *  WINEROOM — Crimson Dark
 *    Bg-1               #0C0409
 *    Bg-2               #10060C
 *    Card               #1A0A11
 *    Card raised        #201018
 *    Border             #3A1422
 *    Accent             #BE185D   rose-700
 *    Accent dark        #881337   rose-900
 *    Accent bright      #F43F5E   rose-500
 *    Text-1             #FDF2F4
 *    Text-2             #FBBDCA   rose-300
 *    Text-3             #BE7A90
 * ═══════════════════════════════════════════════════════════════════
 */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark');
  const [navBg, setNavBg] = useState<string>('#080C14');
  const [mobileNavVisible, setMobileNavVisible] = useState(true);
  const [experiencePanelOpen, setExperiencePanelOpen] = useState(false);
  const [experienceSettings, setExperienceSettings] = useState<ExperienceSettings>(readExperienceSettings);
  const experiencePanelRef = useRef<HTMLDivElement>(null);

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const heroStars: [string, string, number, string, string][] = [
    ['6%',  '14%', 2, '3.8s', '0.0s'], ['14%', '68%', 1, '5.2s', '0.9s'],
    ['22%', '35%', 2, '4.5s', '2.3s'], ['31%', '82%', 1, '6.1s', '1.5s'],
    ['39%', '20%', 3, '4.0s', '3.2s'], ['48%', '55%', 1, '5.7s', '0.5s'],
    ['57%', '88%', 2, '3.6s', '2.8s'], ['64%', '30%', 1, '4.9s', '1.1s'],
    ['73%', '72%', 2, '5.4s', '3.7s'], ['80%', '12%', 1, '3.9s', '0.3s'],
    ['87%', '48%', 2, '6.3s', '2.0s'], ['93%', '78%', 1, '4.2s', '1.7s'],
    ['11%', '92%', 2, '5.0s', '4.1s'], ['52%', '8%',  1, '4.6s', '0.7s'],
    ['76%', '94%', 2, '3.7s', '3.0s'], ['44%', '44%', 1, '5.9s', '1.4s'],
  ];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: experienceSettings.reducedMotion ? 'auto' : 'smooth', block: 'start' });
      setMenuOpen(false);
    }
  };

  const toggleExperienceSetting = (key: ExperienceSettingKey) => {
    setExperienceSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  const resetExperienceSettings = () => {
    setExperienceSettings(DEFAULT_EXPERIENCE_SETTINGS);
  };

  const experienceRootClassName = [
    'portfolio-experience-root min-h-screen bg-[#F8F9FB] overflow-x-hidden',
    experienceSettings.largeText ? EXPERIENCE_CLASS_NAMES.largeText : '',
    experienceSettings.highContrast ? EXPERIENCE_CLASS_NAMES.highContrast : '',
    experienceSettings.reducedMotion ? EXPERIENCE_CLASS_NAMES.reducedMotion : '',
    experienceSettings.quickScan ? EXPERIENCE_CLASS_NAMES.quickScan : '',
  ].filter(Boolean).join(' ');

  // Watch every section; flip nav palette when a section crosses the viewport centre
  useEffect(() => {
    const sections = document.querySelectorAll('section[data-theme]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setNavTheme(entry.target.getAttribute('data-theme') as 'dark' | 'light');
            const bg = entry.target.getAttribute('data-navbg');
            if (bg) setNavBg(bg);
          }
        });
      },
      { rootMargin: '-42% 0px -42% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    const updateMobileNav = () => {
      const currentY = window.scrollY;
      const isMobile = window.matchMedia('(max-width: 767px)').matches;
      const delta = currentY - lastY;

      if (!isMobile || menuOpen || currentY < 16) {
        setMobileNavVisible(true);
      } else if (delta > 8) {
        setMobileNavVisible(false);
      } else if (delta < -8) {
        setMobileNavVisible(true);
      }

      lastY = currentY;
    };

    window.addEventListener('scroll', updateMobileNav, { passive: true });
    window.addEventListener('resize', updateMobileNav);
    updateMobileNav();

    return () => {
      window.removeEventListener('scroll', updateMobileNav);
      window.removeEventListener('resize', updateMobileNav);
    };
  }, [menuOpen]);

  useEffect(() => {
    try {
      window.localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(experienceSettings));
    } catch {
      // Non-critical: the controls still work for the current session.
    }

    const html = document.documentElement;
    (Object.keys(EXPERIENCE_CLASS_NAMES) as ExperienceSettingKey[]).forEach((key) => {
      html.classList.toggle(EXPERIENCE_CLASS_NAMES[key], experienceSettings[key]);
    });

    return () => {
      Object.values(EXPERIENCE_CLASS_NAMES).forEach((className) => html.classList.remove(className));
    };
  }, [experienceSettings]);

  useEffect(() => {
    if (!experiencePanelOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setExperiencePanelOpen(false);
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (experiencePanelRef.current && !experiencePanelRef.current.contains(event.target as Node)) {
        setExperiencePanelOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [experiencePanelOpen]);

  return (
    <div className={experienceRootClassName}>

      <AdjustExperiencePanel
        settings={experienceSettings}
        open={experiencePanelOpen}
        panelRef={experiencePanelRef}
        onOpenChange={setExperiencePanelOpen}
        onToggle={toggleExperienceSetting}
        onReset={resetExperienceSettings}
      />

      {/* ── NAV ─────────────────────────────────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transform-gpu backdrop-blur-xl border-b ${mobileNavVisible ? 'translate-y-0' : '-translate-y-full md:translate-y-0'} ${navTheme === 'dark' ? 'border-white/[0.08]' : 'border-black/[0.06]'}`}
        style={{
          backgroundColor: experienceSettings.highContrast ? 'rgba(2,6,23,0.96)' : hexToRgba(navBg, navTheme === 'dark' ? 0.72 : 0.88),
          transition: 'background-color 500ms ease, border-color 500ms ease, transform 260ms ease',
        }}
      >
          <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-2 md:py-4 flex items-center justify-between">
          <button
            onClick={() => scrollToSection('cover')}
            className="group flex items-center transition-all duration-500"
            aria-label="Back to top"
          >
            {/* BM logomark — Frame10-1 geometry, responsive scale, navTheme-adaptive */}
            <div
              className="relative flex-shrink-0 w-[44px] h-[22px] md:w-[63px] md:h-[32px] group-hover:scale-105 transition-transform duration-300"
            >
              <div className="origin-top-left scale-[0.3056] md:scale-[0.4375]" style={{ width: 144, height: 72 }}>
                <div className="relative w-full h-full">
                  {/* B — top bar */}
                  <div
                    className="absolute h-[32px] left-0 rounded-br-[64px] rounded-tr-[64px] top-0 w-[56px] transition-colors duration-500"
                    style={{ backgroundColor: navTheme === 'dark' ? '#FFFFFF' : '#2563EB' }}
                  />
                  {/* B — bottom bar */}
                  <div
                    className="absolute h-[32px] left-0 rounded-br-[64px] rounded-tr-[64px] top-[40px] w-[56px] transition-colors duration-500"
                    style={{ backgroundColor: navTheme === 'dark' ? '#FFFFFF' : '#2563EB' }}
                  />
                  {/* M — two vertical arch pills */}
                  <div className="absolute flex gap-[8px] items-center left-[64px] top-0">
                    <div className="flex h-[72px] items-center justify-center shrink-0 w-[36px]">
                      <div className="-rotate-90 flex-none">
                        <div
                          className="h-[36px] rounded-br-[64px] rounded-tr-[64px] w-[72px] transition-colors duration-500"
                          style={{ backgroundColor: navTheme === 'dark' ? '#FFFFFF' : '#2563EB' }}
                        />
                      </div>
                    </div>
                    <div className="flex h-[72px] items-center justify-center shrink-0 w-[36px]">
                      <div className="-rotate-90 flex-none">
                        <div
                          className="h-[36px] rounded-br-[64px] rounded-tr-[64px] w-[72px] transition-colors duration-500"
                          style={{ backgroundColor: navTheme === 'dark' ? '#FFFFFF' : '#2563EB' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {['Profile', 'StockLog', 'Zgrada Plus', 'WineRoom', 'AI Workflow', 'System', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className={`px-4 py-2 text-sm rounded-full transition-all duration-500 ${
                  navTheme === 'dark'
                    ? 'text-white/60 hover:text-white hover:bg-white/10'
                    : 'text-[#64748B] hover:text-[#2563EB] hover:bg-[#2563EB]/6'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-all duration-500 ${navTheme === 'dark' ? 'text-white hover:bg-white/10' : 'text-[#0F172A] hover:bg-[#F8F9FB]'}`}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className={`md:hidden backdrop-blur-xl border-t py-4 transition-colors duration-500 ${navTheme === 'dark' ? 'bg-[#080C14]/90 border-white/[0.08]' : 'bg-white/95 border-[#E2E8F0]/60'}`}>
            <div className="flex flex-col gap-1 px-4">
              {['Profile', 'StockLog', 'Zgrada Plus', 'WineRoom', 'AI Workflow', 'System', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className={`text-left px-4 py-3 rounded-lg transition-all duration-500 ${
                    navTheme === 'dark'
                      ? 'text-white/60 hover:text-white hover:bg-white/10'
                      : 'text-[#64748B] hover:text-[#2563EB] hover:bg-[#2563EB]/6'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO COVER ──────────────────────────────────────────────── */}
      {/* Dark base: #080C14 — shared with AI Workflow + Contact */}
      <section id="cover" data-theme="dark" data-navbg="#080C14" className="min-h-screen flex items-center px-4 md:px-12 pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-br from-[#080C14] via-[#0C1018] to-[#080C14] text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[4%] left-[3%] w-[580px] h-[580px] rounded-full bg-[#2563EB] blur-[130px] opacity-35" style={{ animation: 'auroraDrift1 24s ease-in-out infinite' }} />
          <div className="absolute bottom-[4%] right-[3%] w-[500px] h-[500px] rounded-full bg-[#4F46E5] blur-[120px] opacity-30" style={{ animation: 'auroraDrift2 30s ease-in-out infinite' }} />
          <div className="absolute top-[28%] right-[22%] w-[340px] h-[340px] rounded-full bg-[#6D28D9] blur-[110px] opacity-18" style={{ animation: 'auroraDrift3 19s ease-in-out infinite' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {heroStars.map(([left, top, size, duration, delay], i) => (
            <div key={i} className="absolute rounded-full bg-white" style={{ left, top, width: size, height: size, animation: `starTwinkle ${duration} ease-in-out ${delay} infinite` }} />
          ))}
        </div>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', animation: 'grainBreathe 9s ease-in-out infinite' }} />

        <div className="max-w-[1400px] w-full mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-center">
            <div className="flex flex-col gap-6 md:gap-7">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 w-fit">
                <MapPin size={13} className="shrink-0 opacity-80" />
                <span className="text-xs sm:text-sm text-white/80 tracking-wide">Munich, Germany</span>
              </div>
              <div className="flex flex-col gap-2 md:gap-3">
                <h1 className="text-[52px] sm:text-[64px] md:text-[60px] lg:text-[84px] xl:text-[108px] font-bold tracking-tight text-white" style={{ lineHeight: 1.1 }}>
                  Product<br />Designer
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-white/50 tracking-wide">Senior UX/UI Designer</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                {['SaaS', 'B2B Platforms', 'E-commerce', 'Design Systems', 'AI Workflows'].map((item, i, arr) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span className="text-[11px] sm:text-xs text-white/40 uppercase tracking-[0.14em]">{item}</span>
                    {i < arr.length - 1 && <span className="text-white/20 text-xs select-none">·</span>}
                  </span>
                ))}
              </div>
              <p className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed max-w-md">
                Munich-based designer with 14+ years of hands-on digital design experience in SaaS, B2B operational tools and e-commerce.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Munich-based', 'Authorized to work in Germany', 'English fluent', 'Web + Mobile'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-white/10 text-[11px] sm:text-xs text-white/70 rounded-full border border-white/20 hover:bg-white/20 hover:text-white transition-all duration-300 cursor-default">{tag}</span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <button onClick={() => scrollToSection('contact')} className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] hover:from-[#4F46E5] hover:to-[#2563EB] text-white rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#2563EB]/30">
                  Get in touch <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button onClick={() => scrollToSection('stocklog')} className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-medium border border-white/20 transition-all duration-300 hover:scale-105">
                  View work <ChevronDown size={15} className="group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
            <div className="relative h-[460px] lg:h-[520px] xl:h-[580px] hidden md:block">
              <div className="absolute top-0 right-0 w-[280px] lg:w-[310px] xl:w-[340px] h-[210px] lg:h-[232px] xl:h-[255px] bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl rotate-6 hover:rotate-3 transition-all duration-500 overflow-hidden">
                <ImageWithFallback src="https://github.com/borismilosavac/Borismilosavac/blob/main/src/StockLog%20showroom.png?raw=true" alt="Dashboard" className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="absolute top-[140px] lg:top-[152px] left-0 w-[252px] lg:w-[278px] xl:w-[308px] h-[190px] lg:h-[210px] xl:h-[232px] bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl -rotate-6 hover:-rotate-3 transition-all duration-500 overflow-hidden">
                <ImageWithFallback src="https://github.com/borismilosavac/Borismilosavac/blob/main/src/StockLog%20showroom.png?raw=true" alt="StockLog" className="w-full h-full object-cover opacity-80" />
              </div>
              <div className="absolute bottom-0 right-6 w-[218px] lg:w-[242px] xl:w-[268px] h-[164px] lg:h-[182px] xl:h-[200px] bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl rotate-3 hover:rotate-1 transition-all duration-500 overflow-hidden">
                <ImageWithFallback src="https://images.unsplash.com/photo-1743112194335-31f70ca7a64a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx3aW5lJTIwYm90dGxlcyUyMHNob3AlMjBlY29tbWVyY2V8ZW58MXx8fHwxNzc3NDAwNTEzfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="WineRoom" className="w-full h-full object-cover opacity-80" />
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => scrollToSection('profile')} className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-40 hover:opacity-80 transition-opacity">
          <ChevronDown size={26} className="text-white" />
        </button>
      </section>

      {/* ── PROFILE ─────────────────────────────────────────────────── */}
      {/* Light surface: #F8F9FB */}
      <section id="profile" data-theme="light" data-navbg="#F8F9FB" className="py-16 md:py-32 px-4 md:px-12 bg-[#F8F9FB]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-2 md:col-span-8 bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#E2E8F0] hover:shadow-2xl transition-all duration-500">
              <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#0F172A] mb-4 md:mb-6 leading-tight">
                Designing clear, scalable and business-ready digital product experiences.
              </h2>
              <p className="text-base sm:text-xl text-[#64748B] leading-relaxed">
                I am a Munich-based Product Designer / Senior UX/UI Designer with 14+ years of hands-on digital design experience. My work focuses on SaaS platforms, B2B operational tools, e-commerce systems, responsive web/mobile interfaces, Figma-based design systems and AI-assisted prototyping workflows.
              </p>
            </div>
            {/* Portfolio identity gradient — #2563EB → #4F46E5 */}
            <div className="col-span-2 md:col-span-4 bg-gradient-to-br from-[#2563EB] to-[#4F46E5] rounded-3xl p-6 sm:p-8 text-white hover:scale-105 transition-all duration-500 flex flex-col justify-between">
              <Calendar size={32} className="mb-4 opacity-80" />
              <div>
                <div className="text-5xl sm:text-6xl font-bold mb-2">14+</div>
                <div className="text-xl opacity-90">Years</div>
                <div className="text-sm opacity-70 mt-2">Digital design experience since 2010</div>
              </div>
            </div>
            <div className="md:col-span-3 bg-white rounded-3xl p-5 sm:p-8 border border-[#E2E8F0] hover:shadow-xl transition-all duration-500">
              <MapPin size={24} className="text-[#2563EB] mb-3 md:mb-4" />
              <div className="text-xs sm:text-sm text-[#64748B] mb-1 md:mb-2">Location</div>
              <div className="text-sm sm:text-lg font-semibold text-[#0F172A]">Based in Munich</div>
            </div>
            <div className="md:col-span-3 bg-white rounded-3xl p-5 sm:p-8 border border-[#E2E8F0] hover:shadow-xl transition-all duration-500">
              {/* Icon uses sky accent to preview Zgrada's palette */}
              <Check size={24} className="text-[#0EA5E9] mb-3 md:mb-4" />
              <div className="text-xs sm:text-sm text-[#64748B] mb-1 md:mb-2">Work Authorization</div>
              <div className="text-sm sm:text-lg font-semibold text-[#0F172A]">Authorized to work in Germany</div>
            </div>
            <div className="md:col-span-3 bg-white rounded-3xl p-5 sm:p-8 border border-[#E2E8F0] hover:shadow-xl transition-all duration-500">
              <Globe2 size={24} className="text-[#4F46E5] mb-3 md:mb-4" />
              <div className="text-xs sm:text-sm text-[#64748B] mb-1 md:mb-2">Languages</div>
              <div className="text-sm sm:text-lg font-semibold text-[#0F172A]">English fluent<br/>Learning German</div>
            </div>
            <div className="md:col-span-3 bg-white rounded-3xl p-5 sm:p-8 border border-[#E2E8F0] hover:shadow-xl transition-all duration-500">
              <Briefcase size={24} className="text-[#F59E0B] mb-3 md:mb-4" />
              <div className="text-xs sm:text-sm text-[#64748B] mb-1 md:mb-2">Availability</div>
              <div className="text-sm sm:text-lg font-semibold text-[#0F172A]">Onsite, hybrid & remote in Munich</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────────── */}
      {/* Light surface: #FFFFFF */}
      <section id="skills" data-theme="light" data-navbg="#FFFFFF" className="py-16 md:py-32 px-4 md:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#0F172A] mb-10 md:mb-16 max-w-3xl">Skills & Positioning</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {[
              { title: 'Product & UX',        color: 'from-[#2563EB] to-[#4F46E5]', skills: ['User flows', 'Information architecture', 'Dashboard UX', 'Multi-role systems', 'Operational workflows', 'Mobile-first UX', 'Responsive product design'] },
              { title: 'UI & Design Systems', color: 'from-[#4F46E5] to-[#6D28D9]', skills: ['Figma', 'Components', 'Cards', 'Tables', 'Forms', 'Status states', 'Accessibility-aware UI', 'Reusable UI patterns'] },
              { title: 'Business Context',    color: 'from-[#0EA5E9] to-[#0369A1]', skills: ['B2B SaaS', 'Automotive dealership operations', 'Property management SaaS', 'E-commerce UX', 'WooCommerce', 'Product discovery', 'Workflow clarity'] },
              { title: 'AI-assisted Workflow',color: 'from-[#F59E0B] to-[#D97706]', skills: ['Figma Make', 'Structured prompts', 'AI-assisted ideation', 'Rapid prototyping', 'Human-led design decisions'] },
            ].map((cat, i) => (
              <div key={i} className="bg-[#F8F9FB] rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className={`inline-block px-4 py-2 bg-gradient-to-r ${cat.color} text-white rounded-full text-sm font-medium mb-4 md:mb-6`}>{cat.title}</div>
                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill, j) => (
                    <span key={j} className="px-3 py-2 bg-white text-sm text-[#64748B] rounded-xl border border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB] hover:scale-105 transition-all duration-300 cursor-default">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Dark closing card uses global dark base #080C14 */}
          <div className="bg-[#080C14] rounded-3xl p-8 sm:p-12 text-center">
            <p className="text-lg sm:text-2xl md:text-3xl text-white/90 leading-relaxed max-w-4xl mx-auto">
              I combine UX structure, visual clarity, reusable UI systems and modern AI-assisted workflows to turn complex product requirements into clear digital experiences.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STOCKLOG — CARBON STEEL
          Base: #080C14 hero / #0C1018 + #0F1320 alternating sub-sections
          Cards: #141A24 / #1A2130   Borders: #253040 / #1E2A38
          Accent: #3B82F6 (blue-500)   Text: #F0F4F8 / #8BA4BE / #566A80
          ═══════════════════════════════════════════════════════════════ */}

      <section id="stocklog" data-theme="dark" data-navbg="#080C14" className="py-16 md:py-32 px-4 md:px-12 bg-gradient-to-br from-[#080C14] via-[#0C1018] to-[#080C14] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.07) 1px, transparent 1px)`, backgroundSize: '60px 60px' }}></div>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#1E3A5C] rounded-full blur-[160px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#0D1B30] rounded-full blur-[160px]"></div>
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="text-5xl md:text-7xl font-bold text-white/[0.07]">01</div>
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white/[0.07] backdrop-blur-md rounded-full text-xs uppercase tracking-wider border border-white/[0.1] font-medium text-[#8BA4BE]">
              CASE STUDY 01 / B2B OPERATIONS SAAS
            </div>
          </div>
          <h2 className="text-[40px] sm:text-6xl md:text-[104px] font-bold mb-5 md:mb-8 leading-[0.95] tracking-tight text-[#F0F4F8]">StockLog</h2>
          <p className="text-lg sm:text-2xl md:text-3xl text-[#8BA4BE] mb-4 md:mb-8 max-w-3xl">B2B operations platform for automotive dealerships</p>
          <p className="text-base sm:text-xl text-[#566A80] mb-8 md:mb-12 max-w-3xl leading-relaxed">
            A mobile and web platform designed to help automotive sales teams manage inventory, track sales performance and improve team coordination through real-time boards, vehicle cards, filters, notifications, goals and leaderboards.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-10 md:mb-16">
            {[
              { label: 'Type', value: 'B2B SaaS / Operations Platform' },
              { label: 'Industry', value: 'Automotive Dealerships' },
              { label: 'Platform', value: 'Mobile + Web' },
              { label: 'Status', value: 'MVP / Beta-preparation' },
              { label: 'Role', value: 'UX/UI Design + Marketing Strategy' },
              { label: 'Focus', value: 'Inventory Boards, Sales Performance' },
            ].map((meta, i) => (
              <div key={i} className="bg-white/[0.06] backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/[0.09] hover:bg-white/[0.1] transition-all duration-300">
                <div className="text-xs text-[#566A80] mb-1 sm:mb-2">{meta.label}</div>
                <div className="text-xs sm:text-sm font-medium text-[#F0F4F8]">{meta.value}</div>
              </div>
            ))}
          </div>
          <div className="relative rounded-3xl overflow-hidden border-2 border-white/[0.1] shadow-2xl hover:scale-[1.02] transition-all duration-500">
            <ImageWithFallback src="https://raw.githubusercontent.com/borismilosavac/Borismilosavac/refs/heads/main/src/StockLog%20showroom.png" alt="StockLog operations dashboard" className="w-full h-[280px] sm:h-[400px] md:h-[500px] object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/90 via-transparent to-transparent"></div>
            {[
              { n: '1', pos: 'top-6 sm:top-12 left-6 sm:left-12', tip: 'top-0 left-10 sm:left-12', title: 'Dashboard Structure', desc: 'Two-board system: Inventory + Performance' },
              { n: '2', pos: 'top-1/3 right-6 sm:right-12', tip: 'top-0 right-10 sm:right-12', title: 'Real-Time Updates', desc: 'Notifications for inventory changes & assignments' },
            ].map((h) => (
              <PhotoHotspot key={h.n} hotspot={h} colorClass="bg-[#3B82F6]" />
            ))}
            <div className="absolute bottom-16 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {['B2B SaaS', 'Dashboard', 'Operations', 'Mobile + Web', 'Real-time'].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white/[0.12] backdrop-blur-xl text-white text-xs sm:text-sm rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all cursor-default">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* StockLog — Problem & Users   bg: #0C1018 */}
      <section data-theme="dark" data-navbg="#0C1018" className="py-16 md:py-32 px-4 md:px-12 bg-[#0C1018]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#F0F4F8] mb-5 md:mb-8 max-w-4xl">
            The challenge: dealership teams need one clear view of stock, sales activity and team performance.
          </h2>
          <p className="text-base sm:text-xl text-[#8BA4BE] mb-10 md:mb-16 max-w-3xl leading-relaxed">
            Automotive dealerships often deal with fragmented inventory tracking, unclear sales activity, poor team coordination and limited performance visibility. StockLog is designed to centralize vehicle inventory, sales workflow and team performance into two main working areas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {[
              { role: 'Dealership Owner',       goal: 'Improve operations, sales visibility and transparency',    pain: 'Hard to monitor inventory and team performance',    needs: 'High-level dashboard, reports, multi-location view' },
              { role: 'Sales Manager',           goal: 'Track team performance and assign deals',                  pain: 'Poor coordination and lack of visibility',           needs: 'Performance board, filters, leaderboard, notifications' },
              { role: 'Salesperson',             goal: 'Sell vehicles and stay updated on inventory',              pain: 'Needs real-time inventory and deal status',           needs: 'Mobile-first cards, search, simple actions' },
              { role: 'Multi-location Manager',  goal: 'Manage several dealership branches',                       pain: 'Inconsistent data across locations',                  needs: 'Centralized dashboard and synced data' },
            ].map((user, i) => (
              <div key={i} className="bg-[#141A24] rounded-3xl p-6 sm:p-8 border border-[#253040] hover:border-[#3B82F6]/30 hover:-translate-y-2 transition-all duration-500">
                <div className="inline-block px-4 py-2 bg-[#1A2130] text-[#60A5FA] rounded-full text-sm font-medium mb-4 md:mb-6 border border-[#3B82F6]/20">{user.role}</div>
                <div className="space-y-3 md:space-y-4">
                  <div><div className="text-xs text-[#566A80] uppercase tracking-wide mb-1">Goal</div><div className="text-sm sm:text-base text-[#F0F4F8] font-medium">{user.goal}</div></div>
                  <div><div className="text-xs text-[#566A80] uppercase tracking-wide mb-1">Pain point</div><div className="text-sm sm:text-base text-[#8BA4BE]">{user.pain}</div></div>
                  <div><div className="text-xs text-[#566A80] uppercase tracking-wide mb-1">Interface needs</div><div className="text-sm text-[#566A80]">{user.needs}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* StockLog — Workflows   bg: #0F1320 */}
      <section data-theme="dark" data-navbg="#0F1320" className="py-16 md:py-32 px-4 md:px-12 bg-[#0F1320]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#F0F4F8] mb-5 md:mb-8">
            Core workflows separate inventory visibility from sales performance.
          </h2>
          <div className="bg-[#141A24] rounded-3xl p-5 sm:p-8 mb-10 md:mb-16 border border-[#253040]">
            <p className="text-base sm:text-xl md:text-2xl text-[#8BA4BE] font-medium">
              Inventory Board → Vehicle Card → Assign / Move → Performance Board → Goals / Challenges / Leaderboard
            </p>
          </div>
          <div className="bg-[#141A24] rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#253040] mb-8 md:mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="bg-[#1A2130] rounded-2xl p-6 sm:p-8 border-2 border-[#3B82F6]/20 hover:border-[#3B82F6]/40 hover:scale-105 transition-all duration-500">
                <div className="text-sm text-[#60A5FA] font-semibold uppercase tracking-wider mb-3">Board 1</div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F0F4F8] mb-4">Inventory Board</h3>
                <div className="space-y-2">
                  {['Available stock', 'Vehicle cards', 'Quick filters', 'Search by VIN'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#3B82F6] rounded-full shrink-0"></div><span className="text-sm text-[#8BA4BE]">{item}</span></div>
                  ))}
                </div>
              </div>
              <div className="flex flex-row md:flex-col items-center justify-center gap-4">
                <div className="bg-gradient-to-br from-[#1E3A5C] to-[#162D47] rounded-xl p-5 sm:p-6 shadow-2xl border border-[#3B82F6]/20 hover:scale-110 transition-all duration-500">
                  <div className="text-center"><div className="text-xs uppercase tracking-wider mb-2 text-[#566A80]">Vehicle Card</div><div className="text-base sm:text-lg font-bold text-[#F0F4F8]">Assign / Move</div></div>
                </div>
                <div className="flex items-center gap-2">
                  {[0,1,2].map(i => <div key={i} className="w-2 h-2 bg-[#253040] rounded-full"></div>)}
                </div>
              </div>
              <div className="bg-[#1A2130] rounded-2xl p-6 sm:p-8 border-2 border-[#38BDF8]/20 hover:border-[#38BDF8]/40 hover:scale-105 transition-all duration-500">
                <div className="text-sm text-[#38BDF8] font-semibold uppercase tracking-wider mb-3">Board 2</div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#F0F4F8] mb-4">Performance Board</h3>
                <div className="space-y-2">
                  {['Active deals', 'Goals tracking', 'Leaderboard', 'Challenges'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-[#38BDF8] rounded-full shrink-0"></div><span className="text-sm text-[#8BA4BE]">{item}</span></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { title: 'Inventory browsing', desc: 'Supports fast scanning of many vehicles' },
              { title: 'Vehicle card detail', desc: 'VIN, price, condition, images, comments and status in one place' },
              { title: 'Assign / move vehicle', desc: 'Move vehicles to performance board for active sales tracking' },
              { title: 'Search / filter inventory', desc: 'Find vehicles by VIN, model, price or stock number' },
              { title: 'Sales performance tracking', desc: 'Monitor active deals and sales progress' },
              { title: 'Goals tracking', desc: 'Set and monitor individual and team sales targets' },
              { title: 'Challenges', desc: 'Create competitive sales challenges for motivation' },
              { title: 'Leaderboard', desc: 'Visualize team performance and top performers' },
              { title: 'Notifications', desc: 'Reduce missed updates in active sales workflows' },
              { title: 'Comments / notes', desc: 'Team communication on specific vehicles and deals' },
              { title: 'Role permissions', desc: 'Protect sensitive dealership information' },
            ].map((flow, i) => (
              <div key={i} className="bg-[#141A24] rounded-2xl p-5 sm:p-6 border border-[#253040] hover:border-[#3B82F6]/30 hover:-translate-y-1 transition-all duration-500 group">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#1E3A5C] to-[#162D47] border border-[#3B82F6]/25 flex items-center justify-center text-[#60A5FA] font-bold mb-3 sm:mb-4 group-hover:scale-110 transition-transform text-sm">{i + 1}</div>
                <h3 className="text-base sm:text-lg font-semibold text-[#F0F4F8] mb-2">{flow.title}</h3>
                <div className="text-sm text-[#566A80]">{flow.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* StockLog — UI & Operations Logic   bg: #0C1018 */}
      <section data-theme="dark" data-navbg="#0C1018" className="py-16 md:py-32 px-4 md:px-12 bg-[#0C1018]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#F0F4F8] mb-10 md:mb-16">
            Operational UX built around boards, cards, filters and real-time status.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            {[
              { label: 'Main Data',  accent: '#3B82F6', hover: '#3B82F6', items: ['Vehicle inventory', 'VIN', 'Stock number', 'Year', 'Condition', 'Make/model', 'Colors', 'Price', 'Equipment/icons', 'Comments', 'Price changes', 'Days in stock'] },
              { label: 'Filtering', accent: '#38BDF8', hover: '#38BDF8', items: ['Make', 'Model', 'Price', 'VIN', 'Stock number', 'Salesperson', 'Deals', 'Time frames'] },
            ].map((panel, i) => (
              <div key={i} className="bg-[#141A24] rounded-3xl p-6 sm:p-10 border border-[#253040]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#F0F4F8] mb-4 sm:mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E3A5C] to-[#162D47] border border-[#3B82F6]/20 flex items-center justify-center text-[#60A5FA] text-sm shrink-0">{i + 1}</span>
                  {panel.label}
                </h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {panel.items.map((item, j) => (
                    <div key={j} className="px-3 py-2 bg-[#0F1320] text-xs sm:text-sm text-[#8BA4BE] rounded-xl border border-[#1E2A38] hover:border-[#3B82F6]/30 hover:scale-105 transition-all cursor-default">{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {[
              { title: 'Board Structure', items: ['Inventory Board', 'Performance Board'],             accent: '#3B82F6' },
              { title: 'Status Logic',    items: ['Delivered', 'Pending', 'Other deals'],             accent: '#38BDF8' },
              { title: 'Actions',         items: ['Assign / move cards', 'Update status', 'Comment', 'Filter/search', 'Set goals', 'Create challenges'], accent: '#60A5FA' },
            ].map((box, i) => (
              <div key={i} className="bg-[#141A24] rounded-3xl p-6 sm:p-8 border border-[#253040]">
                <h3 className="text-lg sm:text-xl font-bold text-[#F0F4F8] mb-4">{box.title}</h3>
                <ul className="space-y-2">{box.items.map((item, j) => <li key={j} className="text-sm text-[#8BA4BE]">• {item}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#253040] shadow-xl hover:scale-[1.01] transition-all duration-500">
            <ImageWithFallback src="https://images.unsplash.com/photo-1658953229625-aad99d7603b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjB1aSUyMGRlc2lnbnxlbnwxfHx8fDE3Nzc0MDA1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Board layout" className="w-full h-64 sm:h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080C14]/80 to-transparent"></div>
            {[
              { n: '1', pos: 'top-6 sm:top-8 left-6 sm:left-8',   tip: 'top-0 left-10 sm:left-12',  title: 'Board Columns',   desc: 'Inventory & Performance separation' },
              { n: '2', pos: 'top-1/3 right-6 sm:right-12',        tip: 'top-0 right-10 sm:right-12', title: 'Filter Panel',    desc: 'Fast vehicle search by VIN, model, price' },
              { n: '3', pos: 'bottom-20 sm:bottom-24 left-1/3',    tip: 'bottom-10 sm:bottom-12 left-0', title: 'Vehicle Cards', desc: 'VIN, price, status, salesperson assignment' },
              { n: '4', pos: 'top-1/2 left-6 sm:left-8',           tip: 'top-0 left-10 sm:left-12',  title: 'Role Permissions', desc: 'Control access to sensitive dealership data' },
            ].map((h) => (
              <PhotoHotspot key={h.n} hotspot={h} colorClass="bg-[#3B82F6]" tooltipClass="w-40 sm:w-48" />
            ))}
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white">
              <div className="text-base sm:text-xl font-medium">Board layout with vehicle cards, filters and real-time status</div>
              <div className="text-xs sm:text-sm mt-1 sm:mt-2 text-[#8BA4BE]">Tap or hover numbered annotations for UX insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* StockLog — Decisions & Learnings   bg: #0F1320 */}
      <section data-theme="dark" data-navbg="#0F1320" className="py-16 md:py-32 px-4 md:px-12 bg-[#0F1320]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#F0F4F8] mb-10 md:mb-16">
            Design decisions focused on clarity, speed and dealership workflow control.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
            {[
              { title: 'Two fixed boards: Inventory + Performance',                   benefit: 'Separates stock management from sales performance' },
              { title: 'Card-and-column layout',                                      benefit: 'Supports fast scanning and intuitive workflow' },
              { title: 'Color-coded vehicle cards',                                   benefit: 'Helps users recognize vehicles faster' },
              { title: 'Search/filter by VIN, model, price and stock number',         benefit: 'Reduces time spent locating vehicles' },
              { title: 'Real-time notifications',                                     benefit: 'Keeps users updated on assignments and inventory changes' },
              { title: 'Role-based permissions',                                      benefit: 'Gives each user relevant access and protects sensitive information' },
              { title: 'Goals, challenges and leaderboard',                           benefit: 'Adds motivation and recognition to sales performance' },
              { title: 'Multi-location dashboard',                                    benefit: 'Supports oversight across multiple dealership locations' },
            ].map((d, i) => (
              <div key={i} className="bg-[#141A24] rounded-3xl p-6 sm:p-8 border border-[#253040] hover:border-[#3B82F6]/25 hover:-translate-y-2 transition-all duration-500">
                <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#1E3A5C] to-[#162D47] border border-[#3B82F6]/20 flex items-center justify-center text-[#60A5FA] font-bold shrink-0 text-sm">{i + 1}</div>
                  <div className="text-base sm:text-xl font-semibold text-[#F0F4F8]">{d.title}</div>
                </div>
                <div className="text-sm sm:text-base text-[#566A80] ml-12 sm:ml-14">
                  <span className="font-medium text-[#8BA4BE]">Benefit:</span> {d.benefit}
                </div>
              </div>
            ))}
          </div>
          <div className="bg-[#141A24] rounded-3xl p-7 sm:p-10 border-2 border-[#3B82F6]/15">
            <div className="text-xl sm:text-2xl font-bold text-[#F0F4F8] mb-4">Outcome / Learning</div>
            <p className="text-sm sm:text-lg text-[#8BA4BE] leading-relaxed">
              StockLog is strongest as a portfolio case for B2B operations UX, dashboard structure and workflow-heavy product design. The current portfolio version focuses on product complexity and operational clarity without claiming launch impact or measured beta results until real validation data exists.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ZGRADA PLUS — SKY LIGHT
          Backgrounds: #F0F6FF / #E8F2FD   Surface: #FFFFFF
          Border: #BFDBFE   Accent: #0EA5E9 / #0369A1
          Text-1: #0F172A (same as global)   Text-2: #475569
          ═══════════════════════════════════════════════════════════════ */}

      <section id="zgrada-plus" data-theme="light" data-navbg="#F0F6FF" className="py-16 md:py-32 px-4 md:px-12 bg-[#F0F6FF] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: `linear-gradient(to right, rgba(14,165,233,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,165,233,0.12) 1px, transparent 1px)`, backgroundSize: '80px 80px' }}></div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="text-5xl md:text-7xl font-bold text-[#0EA5E9]/[0.07]">02</div>
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#E0F2FE] rounded-full text-xs uppercase tracking-wider border border-[#7DD3FC] font-medium text-[#0369A1]">
              CASE STUDY 02 / MULTI-ROLE PROPTECH SAAS
            </div>
          </div>
          <h2 className="text-[40px] sm:text-6xl md:text-[104px] font-bold text-[#0F172A] mb-5 md:mb-8 leading-[0.95] tracking-tight">Zgrada Plus</h2>
          <p className="text-lg sm:text-2xl md:text-3xl text-[#475569] mb-4 md:mb-8 max-w-3xl">Multi-role SaaS platform for residential building management</p>
          <p className="text-base sm:text-xl text-[#64748B] mb-6 md:mb-8 max-w-3xl leading-relaxed">
            A cross-platform product concept designed to centralize building communication, maintenance issue reporting, financial visibility, documents and local service coordination.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FEF9C3] rounded-2xl text-sm border border-[#FDE047]/40 mb-8 md:mb-12">
            <span className="text-[#713F12] font-medium">MVP / Prototype product design case — no confirmed market results yet</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 md:gap-4 mb-10 md:mb-16">
            {[
              { label: 'Type', value: 'B2B / B2C / B2G SaaS' },
              { label: 'Industry', value: 'PropTech / Facility Management' },
              { label: 'Platform', value: 'Web + iOS + Android' },
              { label: 'Status', value: 'MVP / Prototype' },
              { label: 'Role', value: 'Product Designer / UX/UI Designer' },
              { label: 'Focus', value: 'Multi-role UX, Dashboards' },
            ].map((meta, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 sm:p-6 border border-[#BFDBFE] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-xs text-[#64748B] mb-1 sm:mb-2">{meta.label}</div>
                <div className="text-xs sm:text-sm font-medium text-[#0F172A]">{meta.value}</div>
              </div>
            ))}
          </div>
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#BFDBFE] shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all duration-500">
            <ImageWithFallback src="https://images.unsplash.com/photo-1764327264819-46456857b071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMHJlc2lkZW50aWFsJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3NzQwMDUxM3ww&ixlib=rb-4.1.0&q=80&w=1080" alt="Zgrada Plus platform" className="w-full h-64 sm:h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/75 to-transparent"></div>
            {[
              { n: '1', pos: 'top-6 sm:top-8 left-6 sm:left-8',   tip: 'top-0 left-10 sm:left-12',   title: 'Role-Based Dashboard',      desc: 'Different views for residents, managers, admins' },
              { n: '2', pos: 'top-1/3 right-6 sm:right-8',         tip: 'top-0 right-10 sm:right-12',  title: 'Mobile-First Resident UX',  desc: 'Issue reporting, announcements, financial overview' },
              { n: '3', pos: 'bottom-20 sm:bottom-24 left-1/3',    tip: 'bottom-10 sm:bottom-12 left-0', title: 'Status Tracking',          desc: 'Clear issue status updates across all roles' },
            ].map((h) => (
              <PhotoHotspot key={h.n} hotspot={h} colorClass="bg-[#0EA5E9]" tooltipClass="w-44 sm:w-56" />
            ))}
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white">
              <div className="text-base sm:text-xl font-medium">Role-based dashboard and mobile resident screens</div>
              <div className="text-xs sm:text-sm mt-1 sm:mt-2 opacity-70">Tap or hover numbered annotations for UX insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* Zgrada Plus — Problem & Users   bg: #E8F2FD */}
      <section data-theme="light" data-navbg="#E8F2FD" className="py-16 md:py-32 px-4 md:px-12 bg-[#E8F2FD]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#0F172A] mb-5 md:mb-8 max-w-4xl">
            The challenge: one platform for residents, managers, accounting, partners and institutions.
          </h2>
          <p className="text-base sm:text-xl text-[#475569] mb-8 md:mb-12 max-w-3xl leading-relaxed">
            Residential building management is often fragmented across informal communication channels, manual financial records, unclear maintenance processes and limited transparency between residents and managers.
          </p>
          <div className="bg-[#E0F2FE]/70 rounded-3xl p-6 sm:p-12 mb-8 md:mb-12 border-2 border-[#BAE6FD]/60">
            <div className="text-xl sm:text-2xl font-bold text-[#0F172A] text-center mb-3 sm:mb-4">Role Ecosystem</div>
            <div className="text-base sm:text-lg text-center text-[#475569] max-w-2xl mx-auto mb-8 sm:mb-12">
              "One platform, six user groups, different permissions, different levels of digital confidence."
            </div>
            <div className="flex justify-center">
              <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-3xl bg-gradient-to-br from-[#0EA5E9] to-[#0369A1] flex items-center justify-center text-white shadow-2xl">
                <div className="text-center"><div className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Zgrada Plus</div><div className="text-xs sm:text-sm opacity-80">Central Platform</div></div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {[
              { role: 'Resident / Apartment Owner', needs: 'Announcements, financial overview, issue reporting, voting', pain: 'Low transparency, slow communication, unclear issue status', risk: 'Interface can become too complex for lower digital confidence users' },
              { role: 'Building Manager',           needs: 'Manage residents, costs, debts and announcements',       pain: 'Manual work, many buildings, lack of centralization',    risk: 'Dashboard overload' },
              { role: 'Accounting Service',          needs: 'Financial data entry and synchronization',               pain: 'Manual import and duplicated data',                     risk: 'Import errors and unclear validation' },
              { role: 'Commercial Partner',          needs: 'Visibility, campaigns and analytics',                    pain: 'Hard to target relevant users',                         risk: 'Advertising can damage user trust' },
              { role: 'City / Municipality',         needs: 'Segmented announcements, polls and analytics',           pain: 'Slow public communication and administrative pressure', risk: 'Legal and data sensitivity' },
              { role: 'Admin / Moderator',           needs: 'Control users, content, packages and logs',             pain: 'Moderation, abuse risk and escalation',                 risk: 'High error risk because of permissions' },
            ].map((user, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 sm:p-6 border border-[#BFDBFE] hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                <div className="text-base sm:text-lg font-semibold text-[#0F172A] mb-3 sm:mb-4">{user.role}</div>
                <div className="space-y-2 sm:space-y-3">
                  <div><div className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Needs</div><div className="text-xs sm:text-sm text-[#475569]">{user.needs}</div></div>
                  <div><div className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">Pain points</div><div className="text-xs sm:text-sm text-[#475569]">{user.pain}</div></div>
                  <div><div className="text-xs text-[#94A3B8] uppercase tracking-wide mb-1">UX risk</div><div className="text-xs sm:text-sm text-[#64748B]">{user.risk}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Zgrada Plus — Key Flows   bg: #F0F6FF */}
      <section data-theme="light" data-navbg="#F0F6FF" className="py-16 md:py-32 px-4 md:px-12 bg-[#F0F6FF]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#0F172A] mb-10 md:mb-16">
            Key flows were structured around role clarity, trust and task completion.
          </h2>
          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#BFDBFE] mb-8 md:mb-12 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {[
                { lane: 'Lane 1', title: 'Mobile-First Resident Flows', letter: 'M', color: 'from-[#0EA5E9] to-[#0369A1]', hoverBorder: 'hover:border-[#0EA5E9]', connector: 'bg-[#0EA5E9]/30',
                  steps: [{ step: 'Registration', detail: 'Email/phone verification' }, { step: 'Apartment Linking', detail: 'Add & verify apartment(s)' }, { step: 'Issue Reporting', detail: 'Mobile photo upload + description' }, { step: 'Status Tracking', detail: 'View issue status updates' }, { step: 'Announcements', detail: 'Read building updates' }, { step: 'Financial Overview', detail: 'View costs & debts' }] },
                { lane: 'Lane 2', title: 'Web-First Manager/Admin Flows', letter: 'W', color: 'from-[#0369A1] to-[#075985]', hoverBorder: 'hover:border-[#0369A1]', connector: 'bg-[#0369A1]/30',
                  steps: [{ step: 'Issue Assignment', detail: 'Assign issues to staff/partners' }, { step: 'Status Updates', detail: 'Update progress & notify residents' }, { step: 'Announcement Creation', detail: 'Create & schedule announcements' }, { step: 'Financial Reports', detail: 'Generate cost reports' }, { step: 'CSV/XLS Import', detail: 'Bulk data import for accounting' }, { step: 'Admin Moderation', detail: 'User permissions & content control' }] },
              ].map((lane, li) => (
                <div key={li}>
                  <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br ${lane.color} flex items-center justify-center text-white font-bold text-lg sm:text-xl shrink-0`}>{lane.letter}</div>
                    <div><div className="text-xs sm:text-sm text-[#94A3B8] uppercase tracking-wider">{lane.lane}</div><div className="text-base sm:text-xl font-bold text-[#0F172A]">{lane.title}</div></div>
                  </div>
                  <div className="space-y-3 sm:space-y-4">
                    {lane.steps.map((item, i) => (
                      <div key={i} className="group relative">
                        <div className={`flex items-start gap-3 sm:gap-4 bg-[#F0F6FF] rounded-2xl p-4 sm:p-5 border border-[#BFDBFE] ${lane.hoverBorder} hover:shadow-lg hover:-translate-y-1 transition-all duration-300`}>
                          <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br ${lane.color} flex items-center justify-center text-white font-bold shrink-0 text-sm`}>{i + 1}</div>
                          <div className="flex-1"><div className="text-sm sm:text-base font-semibold text-[#0F172A] mb-1">{item.step}</div><div className="text-xs sm:text-sm text-[#475569]">{item.detail}</div></div>
                        </div>
                        {i < 5 && <div className={`absolute left-[22px] sm:left-[28px] top-[56px] sm:top-[60px] w-0.5 h-3 sm:h-4 ${lane.connector}`}></div>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0EA5E9]/[0.07] to-[#0369A1]/[0.04] rounded-3xl p-7 sm:p-10 border-2 border-[#BFDBFE]">
            <div className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">Design Decisions</div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {['Mobile-first for residents', 'Web-first for managers and admins', 'Role-based onboarding', 'Freemium/premium separation', 'Granular consent for sensitive data', 'Status tracking for maintenance issues'].map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-br from-[#0EA5E9] to-[#0369A1] flex items-center justify-center text-white text-xs shrink-0 mt-0.5">✓</div>
                  <span className="text-sm sm:text-base text-[#475569]">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Zgrada Plus — UI System   bg: #E8F2FD */}
      <section data-theme="light" data-navbg="#E8F2FD" className="py-16 md:py-32 px-4 md:px-12 bg-[#E8F2FD]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#0F172A] mb-10 md:mb-16">
            A scalable UI direction for complex multi-role SaaS workflows.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#BFDBFE]">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4 sm:mb-6">UI Components</h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {['Role-based dashboards', 'Registration forms', 'Issue reporting forms', 'Announcement creation', 'Financial overview', 'CSV/XLS import', 'Partner campaign form', 'Admin/moderation table', 'Status badges', 'Empty states', 'Error states', 'Success states'].map((comp, i) => (
                  <div key={i} className="px-3 py-2 bg-[#F0F6FF] rounded-xl text-xs sm:text-sm text-[#475569] text-center border border-[#BFDBFE] hover:border-[#0EA5E9] hover:scale-105 transition-all cursor-default">{comp}</div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#BFDBFE]">
              <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4 sm:mb-6">Accessibility / System Notes</h3>
              <ul className="space-y-2 sm:space-y-3">
                {['WCAG 2.1 AA mindset', 'Mobile-first for residents', 'Web-first for managers/admin users', 'High-contrast forms', 'Clear status states', 'Readable tables', 'Color + label for status', 'Active consent checkboxes', 'Simple language for older or less digitally confident users'].map((note, i) => (
                  <li key={i} className="flex items-start gap-2"><div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full mt-2 shrink-0"></div><span className="text-xs sm:text-sm text-[#475569]">{note}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#0EA5E9]/[0.07] to-[#0369A1]/[0.04] rounded-3xl p-7 sm:p-10 border-2 border-[#BFDBFE]">
            <div className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4">Outcome / Learning</div>
            <p className="text-sm sm:text-lg text-[#475569] leading-relaxed">
              The project produced a structured MVP concept, user roles, modular product architecture, freemium/premium business logic, legal-compliance considerations and a foundation for Figma prototyping. No real market results are confirmed yet.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WINEROOM — CRIMSON DARK
          Backgrounds: #0C0409 / #10060C   Card: #1A0A11 / #201018
          Border: #3A1422   Accent: #BE185D / #881337 / #F43F5E
          Text-1: #FDF2F4   Text-2: #FBBDCA   Text-3: #BE7A90
          ═══════════════════════════════════════════════════════════════ */}

      <section id="wineroom" data-theme="dark" data-navbg="#0C0409" className="py-16 md:py-32 px-4 md:px-12 bg-[#0C0409] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-[#7F1D3C] rounded-full blur-[160px]"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#4C0520] rounded-full blur-[140px]"></div>
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
            <div className="text-5xl md:text-7xl font-bold text-[#BE185D]/[0.12]">03</div>
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#BE185D]/[0.12] rounded-full text-xs uppercase tracking-wider border border-[#BE185D]/25 font-medium text-[#F43F5E]">
              CASE STUDY 03 / E-COMMERCE UX
            </div>
          </div>
          <h2 className="text-[40px] sm:text-6xl md:text-[104px] font-bold text-[#FDF2F4] mb-5 md:mb-8 leading-[0.95] tracking-tight">WineRoom</h2>
          <p className="text-lg sm:text-2xl md:text-3xl text-[#FBBDCA] mb-4 md:mb-8 max-w-3xl">E-commerce UX/UI optimization for an online wine shop</p>
          <p className="text-base sm:text-xl text-[#BE7A90] mb-8 md:mb-12 max-w-3xl leading-relaxed">
            A WooCommerce-based online wine shop project focused on improving product browsing, filtering, search and responsive shopping experience.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-10 md:mb-16">
            {[
              { label: 'Type', value: 'E-commerce / WooCommerce' },
              { label: 'Platform', value: 'Web + Mobile' },
              { label: 'Role', value: 'UX/UI Optimization' },
              { label: 'Focus', value: 'Product Listing, Filters, Search, Mobile Toolbar' },
              { label: 'Status', value: 'Real active web shop' },
            ].map((meta, i) => (
              <div key={i} className="bg-[#1A0A11] rounded-2xl p-4 sm:p-6 border border-[#3A1422] hover:border-[#BE185D]/40 hover:-translate-y-1 transition-all duration-300">
                <div className="text-xs text-[#BE7A90] mb-1 sm:mb-2">{meta.label}</div>
                <div className="text-xs sm:text-sm font-medium text-[#FDF2F4]">{meta.value}</div>
              </div>
            ))}
          </div>
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#3A1422] shadow-xl hover:scale-[1.01] transition-all duration-500">
            <ImageWithFallback src="https://images.unsplash.com/photo-1743112194335-31f70ca7a64a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx3aW5lJTIwYm90dGxlcyUyMHNob3AlMjBlY29tbWVyY2V8ZW58MXx8fHwxNzc3NDAwNTEzfDA&ixlib=rb-4.1.0&q=80&w=1080" alt="WineRoom e-commerce" className="w-full h-64 sm:h-96 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0C0409]/90 to-transparent"></div>
            {[
              { n: '1', pos: 'top-6 sm:top-12 left-6 sm:left-12',  tip: 'top-0 left-10 sm:left-12',   title: 'Product Grid',   desc: 'Clean scannable layout for product browsing' },
              { n: '2', pos: 'top-6 sm:top-12 right-6 sm:right-12', tip: 'top-0 right-10 sm:right-12', title: 'Filter Access',  desc: 'Easy filtering by type, region, price' },
            ].map((h) => (
              <PhotoHotspot key={h.n} hotspot={h} colorClass="bg-[#BE185D]" />
            ))}
            <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white">
              <div className="text-base sm:text-xl font-medium">Product listing and filtering interface</div>
              <div className="text-xs sm:text-sm mt-1 sm:mt-2 text-[#FBBDCA]/70">Tap or hover annotations for UX insights</div>
            </div>
          </div>
        </div>
      </section>

      {/* WineRoom — E-commerce UX   bg: #10060C */}
      <section data-theme="dark" data-navbg="#10060C" className="py-16 md:py-32 px-4 md:px-12 bg-[#10060C]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#FDF2F4] mb-10 md:mb-16">Helping users find the right wine faster.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-[#1A0A11] rounded-3xl p-6 sm:p-10 border border-[#3A1422]">
              <h3 className="text-xl sm:text-2xl font-bold text-[#FDF2F4] mb-4 sm:mb-6">Features</h3>
              <ul className="space-y-2 sm:space-y-3">
                {['Product listing', 'Filters', 'Sorting', 'Product attributes', 'Product card hierarchy', 'Search access'].map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-gradient-to-br from-[#881337] to-[#BE185D] flex items-center justify-center text-white text-xs shrink-0 mt-0.5">✓</div>
                    <span className="text-sm sm:text-base text-[#FBBDCA]">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1A0A11] rounded-3xl p-6 sm:p-10 border border-[#3A1422]">
              <h3 className="text-xl sm:text-2xl font-bold text-[#FDF2F4] mb-4 sm:mb-6">Decision Cards</h3>
              <ul className="space-y-2 sm:space-y-3">
                {['Improve product listing hierarchy', 'Make filtering and sorting easier to access', 'Support faster search with FiboSearch', 'Keep product cards scannable', 'Improve responsive browsing behavior'].map((d, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-[#BE185D] rounded-full mt-2 shrink-0"></div>
                    <span className="text-sm sm:text-base text-[#FBBDCA]">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* WineRoom — Mobile   bg: #0C0409 */}
      <section data-theme="dark" data-navbg="#0C0409" className="py-16 md:py-32 px-4 md:px-12 bg-[#0C0409]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-[#FDF2F4] mb-10 md:mb-16">Mobile-first toolbar for filtering, sorting and search.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
            {[
              { src: 'https://images.unsplash.com/photo-1661246627162-feb0269e0c07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzc3MzUwMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Mobile interface', caption: 'Mobile product grid',
                spots: [{ n:'1', pos:'top-6 sm:top-8 left-6 sm:left-8',  tip:'top-0 left-10 sm:left-12',   title:'Sticky Toolbar', desc:'Filter, Sort, Search always accessible on mobile' }, { n:'2', pos:'top-1/3 right-6 sm:right-8', tip:'top-0 right-10 sm:right-12', title:'Product Cards', desc:'Clear hierarchy: image, name, price, attributes' }] },
              { src: 'https://images.unsplash.com/photo-1769521711111-741c5978c464?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx3aW5lJTIwYm90dGxlcyUyMHNob3AlMjBlY29tbWVyY2V8ZW58MXx8fHwxNzc3NDAwNTEzfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Product display', caption: 'Responsive toolbar placement',
                spots: [{ n:'3', pos:'top-1/2 left-6 sm:left-8', tip:'top-0 left-10 sm:left-12', title:'Search Integration', desc:'FiboSearch for fast wine discovery' }] },
            ].map((panel, pi) => (
              <div key={pi} className="relative rounded-3xl overflow-hidden border-2 border-[#3A1422] shadow-xl hover:scale-[1.02] transition-all duration-500">
                <ImageWithFallback src={panel.src} alt={panel.alt} className="w-full h-64 sm:h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C0409]/80 to-transparent"></div>
                {panel.spots.map((h) => (
                  <PhotoHotspot key={h.n} hotspot={h} colorClass="bg-[#BE185D]" tooltipClass="w-44 sm:w-56" />
                ))}
                <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 right-4 sm:right-8 text-white">
                  <div className="text-base sm:text-lg font-medium">{panel.caption}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-[#1A0A11] rounded-3xl p-6 sm:p-8 border border-[#3A1422]">
              <div className="text-lg sm:text-xl font-bold text-[#FDF2F4] mb-4">Technical/Context Notes</div>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {['WordPress', 'WooCommerce', 'BeRocket filter UI', 'FiboSearch', 'PHP/CSS adjustments', 'Responsive layout customization'].map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#201018] text-xs sm:text-sm text-[#FBBDCA] rounded-xl border border-[#3A1422] hover:border-[#BE185D]/50 hover:scale-105 transition-all cursor-default">{tech}</span>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#BE185D]/[0.1] to-[#881337]/[0.1] rounded-3xl p-6 sm:p-8 border-2 border-[#BE185D]/20">
              <div className="text-lg sm:text-xl font-bold text-[#FDF2F4] mb-4">Outcome</div>
              <p className="text-sm sm:text-base text-[#FBBDCA] leading-relaxed">
                The redesigned browsing structure improves clarity around product discovery, filtering, sorting and mobile shopping flow. No conversion or sales metrics are claimed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI WORKFLOW ─────────────────────────────────────────────── */}
      {/* Dark base: #080C14 — same global dark as hero and contact */}
      <section id="ai-workflow" data-theme="dark" data-navbg="#080C14" className="py-16 md:py-32 px-4 md:px-12 bg-gradient-to-br from-[#080C14] via-[#0C1018] to-[#080C14] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[700px] h-[700px] bg-[#0369A1] rounded-full blur-[150px]"></div>
          <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-[#4F46E5] rounded-full blur-[150px]"></div>
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#0EA5E9]/15 backdrop-blur-md rounded-full text-xs uppercase tracking-wider border border-[#0EA5E9]/25 font-medium text-[#38BDF8] mb-6 sm:mb-8">
            AI-ASSISTED WORKFLOW
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-[96px] font-bold mb-5 md:mb-8 leading-[0.95] tracking-tight text-[#F0F4F8]">AI-assisted workflows for faster product exploration.</h2>
          <p className="text-base sm:text-xl md:text-2xl text-[#8BA4BE] mb-10 md:mb-16 max-w-3xl">
            I use AI to speed up ideation and prototyping while keeping final design decisions human, structured and product-driven.
          </p>
          <div className="bg-white/[0.05] backdrop-blur-sm rounded-3xl p-6 sm:p-10 md:p-12 border border-white/[0.1] mb-8 md:mb-12">
            <div className="grid grid-cols-3 md:grid-cols-9 gap-2 sm:gap-3">
              {[
                { num: '1', label: 'Product problem',      color: 'from-[#0EA5E9] to-[#0284C7]' },
                { num: '2', label: 'Structured prompt',    color: 'from-[#0284C7] to-[#0369A1]' },
                { num: '3', label: 'UX flow exploration',  color: 'from-[#2563EB] to-[#1D4ED8]' },
                { num: '4', label: 'Wireframe / layout',   color: 'from-[#4F46E5] to-[#4338CA]' },
                { num: '5', label: 'Prototype product', color: 'from-[#6D28D9] to-[#5B21B6]' },
                { num: '6', label: 'Human design review',  color: 'from-[#059669] to-[#047857]' },
                { num: '7', label: 'UI refinement',        color: 'from-[#2563EB] to-[#1E40AF]' },
                { num: '8', label: 'Accessibility check',  color: 'from-[#1E40AF] to-[#1E3A8A]' },
                { num: '9', label: 'Product-ready',        color: 'from-[#0EA5E9] to-[#0284C7]' },
              ].map((step, i) => (
                <div key={i} className="group">
                  <div className={`bg-gradient-to-br ${step.color} rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 ${i === 5 ? 'border-[#10B981] shadow-[0_0_20px_rgba(16,185,129,0.25)]' : 'border-white/[0.12]'} hover:scale-105 transition-all duration-500`}>
                    <div className="text-lg sm:text-2xl font-bold text-white text-center mb-1 sm:mb-2">{step.num}</div>
                    <div className="text-[10px] sm:text-xs text-white/90 text-center leading-tight">{step.label}</div>
                    {i === 5 && <div className="mt-1 sm:mt-2 pt-1 sm:pt-2 border-t border-white/30"><div className="text-[8px] sm:text-[10px] text-white/80 text-center uppercase tracking-wider">Critical checkpoint</div></div>}
                  </div>
                  {i < 8 && <div className="flex justify-center my-1 sm:my-2 md:hidden"><div className="w-1 h-2 sm:h-3 bg-gradient-to-b from-white/40 to-transparent rounded-full"></div></div>}
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white/[0.07] backdrop-blur-sm rounded-3xl p-7 sm:p-10 border border-white/[0.1]">
              <p className="text-base sm:text-lg text-[#F0F4F8] leading-relaxed mb-4">AI is used as a workflow accelerator, not as a replacement for design judgment.</p>
              <p className="text-xs sm:text-sm text-[#566A80] italic">Note: Avoiding claims like "fully automated design" or "revolutionary" — AI assists exploration, humans make decisions.</p>
            </div>
            <div className="rounded-3xl overflow-hidden border-2 border-white/[0.1] shadow-2xl hover:scale-105 transition-all duration-500 min-h-[200px]">
              <ImageWithFallback src="https://images.unsplash.com/photo-1661246626039-5429b8f7488a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkZXNpZ258ZW58MXx8fHwxNzc3MzUwMjI4fDA&ixlib=rb-4.1.0&q=80&w=1080" alt="AI workflow" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ── DESIGN SYSTEM ───────────────────────────────────────────── */}
      {/* Light surface: #FFFFFF */}
      <section id="system" data-theme="light" data-navbg="#FFFFFF" className="py-16 md:py-32 px-4 md:px-12 bg-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(to right, rgba(37,99,235,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,99,235,0.1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}></div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center mb-10 md:mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#2563EB]/8 rounded-full text-xs uppercase tracking-wider border border-[#2563EB]/15 font-medium text-[#2563EB] mb-6 sm:mb-8">DESIGN SYSTEM SNAPSHOT</div>
              <h2 className="text-3xl sm:text-5xl md:text-[96px] font-bold text-[#0F172A] mb-5 md:mb-8 leading-[0.95] tracking-tight">Reusable UI systems for scalable product design.</h2>
              <p className="text-lg sm:text-2xl text-[#64748B]">I design screens and the systems behind them.</p>
            </div>
            <div className="rounded-3xl overflow-hidden border-2 border-[#E2E8F0] shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500">
              <ImageWithFallback src="https://images.unsplash.com/photo-1720962158883-b0f2021fb51e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkYXNoYm9hcmQlMjBpbnRlcmZhY2UlMjB1aSUyMGRlc2lnbnxlbnwxfHx8fDE3Nzc0MDA1MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080" alt="Design system" className="w-full h-64 sm:h-80 object-cover" />
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border-2 border-[#E2E8F0] mb-8 md:mb-12 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#0F172A] mb-6 sm:mb-8">Component State Examples</h3>
            <div className="mb-8 md:mb-12">
              <div className="text-base sm:text-lg font-semibold text-[#0F172A] mb-4">Buttons</div>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {[{ label: 'Default', cls: 'bg-gradient-to-r from-[#2563EB] to-[#4F46E5]' }, { label: 'Hover', cls: 'bg-gradient-to-r from-[#4F46E5] to-[#2563EB] shadow-lg' }, { label: 'Active', cls: 'bg-gradient-to-r from-[#1E40AF] to-[#3730A3] scale-95' }, { label: 'Disabled', cls: 'bg-[#E2E8F0] cursor-not-allowed opacity-50' }].map((btn) => (
                  <div key={btn.label} className="text-center">
                    <div className="text-xs text-[#94A3B8] mb-2 sm:mb-3 uppercase tracking-wider">{btn.label}</div>
                    <button className={`px-5 sm:px-6 py-2.5 sm:py-3 ${btn.cls} text-white rounded-xl font-medium text-sm`}>Primary Button</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-8 md:mb-12">
              <div className="text-base sm:text-lg font-semibold text-[#0F172A] mb-4">Input Fields</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div><div className="text-xs text-[#94A3B8] mb-2 sm:mb-3 uppercase tracking-wider">Default</div><input type="text" placeholder="Enter text..." className="w-full px-4 py-3 bg-white border-2 border-[#E2E8F0] rounded-xl focus:outline-none text-sm text-[#0F172A]" /></div>
                <div><div className="text-xs text-[#94A3B8] mb-2 sm:mb-3 uppercase tracking-wider">Focus</div><input type="text" value="Focused state" readOnly className="w-full px-4 py-3 bg-white border-2 border-[#2563EB] rounded-xl shadow-[0_0_0_3px_rgba(37,99,235,0.1)] text-sm text-[#0F172A]" /></div>
                <div><div className="text-xs text-[#94A3B8] mb-2 sm:mb-3 uppercase tracking-wider">Error</div><input type="text" value="Invalid input" readOnly className="w-full px-4 py-3 bg-white border-2 border-[#F43F5E] rounded-xl text-sm text-[#0F172A]" /></div>
              </div>
            </div>
            <div className="mb-8 md:mb-12">
              <div className="text-base sm:text-lg font-semibold text-[#0F172A] mb-4">Cards</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div><div className="text-xs text-[#94A3B8] mb-2 sm:mb-3 uppercase tracking-wider">Default</div><div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E2E8F0]"><div className="text-sm sm:text-base font-medium text-[#0F172A] mb-2">Card Title</div><div className="text-xs sm:text-sm text-[#64748B]">Card content example</div></div></div>
                <div><div className="text-xs text-[#94A3B8] mb-2 sm:mb-3 uppercase tracking-wider">Hover</div><div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#2563EB] shadow-xl -translate-y-1"><div className="text-sm sm:text-base font-medium text-[#0F172A] mb-2">Card Title</div><div className="text-xs sm:text-sm text-[#64748B]">Card content example</div></div></div>
                <div><div className="text-xs text-[#94A3B8] mb-2 sm:mb-3 uppercase tracking-wider">Active</div><div className="bg-gradient-to-br from-[#2563EB]/8 to-[#4F46E5]/8 rounded-2xl p-5 sm:p-6 border-2 border-[#2563EB]"><div className="text-sm sm:text-base font-medium text-[#0F172A] mb-2">Card Title</div><div className="text-xs sm:text-sm text-[#64748B]">Card content example</div></div></div>
              </div>
            </div>
            <div>
              <div className="text-base sm:text-lg font-semibold text-[#0F172A] mb-4">Status Badges</div>
              <div className="flex flex-wrap gap-2 sm:gap-4">
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#DCFCE7] text-[#15803D] rounded-full text-xs sm:text-sm font-medium border border-[#86EFAC]">Confirmed</span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#FEF9C3] text-[#713F12] rounded-full text-xs sm:text-sm font-medium border border-[#FDE047]/50">MVP / Prototype</span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#DBEAFE] text-[#1E40AF] rounded-full text-xs sm:text-sm font-medium border border-[#93C5FD]">In Progress</span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#EDE9FE] text-[#5B21B6] rounded-full text-xs sm:text-sm font-medium border border-[#C4B5FD]">Planned</span>
                <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#F1F5F9] text-[#64748B] rounded-full text-xs sm:text-sm font-medium border border-[#CBD5E1]">Not Claimed</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
            {[
              { title: 'Components', dot: '#2563EB', items: ['Colors', 'Typography', 'Spacing', 'Buttons', 'Inputs', 'Cards', 'Tables', 'Filters', 'Status badges', 'Notifications', 'Empty states', 'Error states', 'Mobile toolbar', 'Dashboard cards'], grid: true },
              { title: 'Patterns', dot: '#4F46E5', items: ['Responsive behavior', 'Grid system', 'Breakpoints', 'Border radius', 'Shadows', 'Layout systems', 'Form patterns', 'Card patterns'], grid: false },
              { title: 'Accessibility Notes', dot: '#0EA5E9', items: ['Color contrast', 'Focus states', 'Keyboard navigation', 'Screen reader support', 'Touch targets', 'Readable text', 'Semantic HTML', 'ARIA labels'], grid: false },
            ].map((panel, i) => (
              <div key={i} className="bg-[#F8F9FB] rounded-3xl p-6 sm:p-10 border border-[#E2E8F0]">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] mb-4 sm:mb-6">{panel.title}</h3>
                {panel.grid ? (
                  <div className="grid grid-cols-2 gap-2">{panel.items.map((item, j) => <div key={j} className="px-2 py-2 bg-white text-xs text-[#64748B] rounded-xl border border-[#E2E8F0] text-center hover:border-[#2563EB] hover:text-[#2563EB] hover:scale-105 transition-all cursor-default">{item}</div>)}</div>
                ) : (
                  <ul className="space-y-2">{panel.items.map((item, j) => <li key={j} className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: panel.dot }}></div><span className="text-xs sm:text-sm text-[#64748B]">{item}</span></li>)}</ul>
                )}
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-[#080C14] to-[#0C1018] rounded-3xl p-8 sm:p-16 mb-6 sm:mb-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-15"><div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB] rounded-full blur-[120px]"></div></div>
            <div className="relative z-10">
              <div className="text-xs sm:text-sm text-[#566A80] uppercase tracking-wider mb-4">System Principle</div>
              <p className="text-xl sm:text-3xl md:text-4xl text-white font-medium leading-relaxed">"Reusable patterns make complex products easier to scale."</p>
              <p className="text-sm sm:text-lg text-[#8BA4BE] mt-4 sm:mt-6 max-w-3xl">A strong UI system reduces inconsistency, speeds up iteration and makes products easier to scale across roles, screens and platforms.</p>
            </div>
          </div>
          <div className="bg-[#FEF9C3] rounded-2xl p-5 sm:p-6 border border-[#FDE047]/40">
            <p className="text-xs sm:text-sm text-[#713F12]"><span className="font-semibold">Note:</span> This is a portfolio-level design system snapshot. Individual project design systems (StockLog, Zgrada Plus) are not claimed as finalized component libraries.</p>
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      {/* Dark base: #080C14 — same as hero and AI workflow */}
      <section id="contact" data-theme="dark" data-navbg="#080C14" className="py-16 md:py-32 px-4 md:px-12 bg-gradient-to-br from-[#080C14] via-[#0C1018] to-[#080C14] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-25 pointer-events-none">
          <div className="absolute top-20 left-1/4 w-[800px] h-[800px] bg-[#2563EB] rounded-full blur-[160px]"></div>
          <div className="absolute bottom-20 right-1/4 w-[700px] h-[700px] bg-[#4F46E5] rounded-full blur-[160px]"></div>
        </div>
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }}></div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <h2 className="text-3xl sm:text-5xl md:text-[104px] font-bold mb-5 md:mb-8 leading-[1.0] md:leading-[0.95] tracking-tight text-[#F0F4F8]">
            Let's build clearer digital product experiences.
          </h2>
          <p className="text-base sm:text-xl md:text-2xl text-[#8BA4BE] mb-10 md:mb-16 max-w-3xl">
            Product Designer / Senior UX/UI Designer based in Munich, focused on SaaS, B2B operations, e-commerce, Figma design systems, accessibility and AI-assisted workflows.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10 md:mb-16">
            <div className="space-y-4 sm:space-y-6">
              {[{ label: 'Name', value: 'Boris Milosavac' }, { label: 'Location', value: 'Munich, Germany' }, { label: 'Email', value: '[Email]' }, { label: 'Phone', value: '[Phone]' }].map((item, i) => (
                <div key={i} className="bg-white/[0.07] backdrop-blur-sm rounded-2xl p-5 sm:p-6 border border-white/[0.1]">
                  <div className="text-xs sm:text-sm text-[#566A80] mb-1 sm:mb-2">{item.label}</div>
                  <div className="text-lg sm:text-xl text-[#F0F4F8] font-medium">{item.value}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4 sm:space-y-6">
              <div className="text-base sm:text-lg text-[#8BA4BE] mb-2">Connect</div>
              <a href="#" className="flex items-center justify-between p-5 sm:p-6 bg-gradient-to-r from-[#2563EB] to-[#4F46E5] hover:from-[#4F46E5] hover:to-[#2563EB] rounded-2xl border border-white/20 transition-all duration-300 group shadow-lg hover:shadow-2xl hover:shadow-[#2563EB]/20 hover:-translate-y-1">
                <div className="flex items-center gap-3 sm:gap-4"><Mail size={22} className="text-white" /><span className="text-white font-medium text-sm sm:text-base">Contact me</span></div>
                <ArrowRight size={18} className="text-white group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#" className="flex items-center justify-between p-5 sm:p-6 bg-white/[0.07] hover:bg-white/[0.12] rounded-2xl border border-white/[0.1] transition-all duration-300 group hover:-translate-y-1">
                <div className="flex items-center gap-3 sm:gap-4"><Linkedin size={22} className="text-[#38BDF8] group-hover:scale-110 transition-transform" /><span className="text-[#F0F4F8]/90 group-hover:text-white text-sm sm:text-base">[LinkedIn URL]</span></div>
                <ArrowRight size={18} className="text-[#566A80] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </a>
              <a href="#" className="flex items-center justify-between p-5 sm:p-6 bg-white/[0.07] hover:bg-white/[0.12] rounded-2xl border border-white/[0.1] transition-all duration-300 group hover:-translate-y-1">
                <div className="flex items-center gap-3 sm:gap-4"><Globe size={22} className="text-[#F59E0B] group-hover:scale-110 transition-transform" /><span className="text-[#F0F4F8]/90 group-hover:text-white text-sm sm:text-base">[Portfolio URL]</span></div>
                <ArrowRight size={18} className="text-[#566A80] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); window.print(); }} className="flex items-center justify-between p-5 sm:p-6 bg-white/[0.07] hover:bg-white/[0.12] rounded-2xl border border-white/[0.1] transition-all duration-300 group hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-3 sm:gap-4"><Download size={22} className="text-[#10B981] group-hover:scale-110 transition-transform" /><span className="text-[#F0F4F8]/90 group-hover:text-white text-sm sm:text-base">Download PDF</span></div>
                <ArrowRight size={18} className="text-[#566A80] group-hover:text-white group-hover:translate-x-1 transition-all" />
              </a>
            </div>
          </div>
          <div className="bg-white/[0.07] backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-white/[0.1]">
            <div className="text-base sm:text-lg font-medium text-[#F0F4F8] mb-2 sm:mb-3">Availability</div>
            <div className="text-[#8BA4BE] text-sm sm:text-lg">Available for Product Designer, Senior UX/UI Designer and UX/UI Designer roles in Munich — onsite, hybrid or remote.</div>
          </div>
          <div className="mt-12 md:mt-16 text-center text-[#566A80] text-xs sm:text-sm">© 2026 Product Design Portfolio</div>
        </div>
      </section>
    </div>
  );
}
