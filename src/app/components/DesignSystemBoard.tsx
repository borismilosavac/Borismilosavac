/*
  Design System Snapshot — "Reusable UI System Board" illustration.
  Decorative inline SVG (aria-hidden), no readable text and no fake metrics.
  Story: one central reusable component (focal tile + glow) feeding many
  product contexts — design tokens on the left, component variants above,
  a dashboard module, mobile surface, filter chips, status badges and table
  rows on the right/below — tied together by thin connector rails and nodes.
  Shares the slate-glass / blue-violet style system of HeroSystemArt and
  AiStepIllustration, and reuses their pulse/float motion classes (already
  paused-safe and disabled under prefers-reduced-motion).
*/
import { useId } from 'react';

type Props = { className?: string };

export function DesignSystemBoard({ className = '' }: Props) {
  const uid = useId().replace(/:/g, '');
  const gridId = `dsb-grid-${uid}`;
  const panelId = `dsb-panel-${uid}`;
  const glowId = `dsb-glow-${uid}`;
  const focalId = `dsb-focal-${uid}`;
  return (
    <svg
      viewBox="0 0 960 420"
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <pattern id={gridId} width="46" height="46" patternUnits="userSpaceOnUse">
          <path d="M46 0H0V46" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
        <linearGradient id={panelId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e2c48" stopOpacity="0.95" />
          <stop offset="1" stopColor="#121a2e" stopOpacity="0.92" />
        </linearGradient>
        <radialGradient id={glowId} cx="0.5" cy="0.45" r="0.65">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.14" />
          <stop offset="0.55" stopColor="#a78bfa" stopOpacity="0.05" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={focalId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.34" />
          <stop offset="0.55" stopColor="#818cf8" stopOpacity="0.12" />
          <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient glow + grid */}
      <rect width="960" height="420" fill={`url(#${glowId})`} />
      <rect width="960" height="420" fill={`url(#${gridId})`} />

      {/* connector system — one component, many product contexts */}
      <g className="ds-board-lines" strokeWidth="1.5" strokeLinecap="round" fill="none">
        <path className="hero-art-line" d="M556 180 C 610 160, 650 140, 696 120" stroke="#60a5fa" strokeOpacity="0.45" />
        <path className="hero-art-line hero-art-line--b" d="M556 215 C 600 230, 640 244, 692 252" stroke="#a78bfa" strokeOpacity="0.4" />
        <path className="hero-art-line" d="M556 238 C 660 292, 740 300, 850 296" stroke="#60a5fa" strokeOpacity="0.35" />
        <path className="hero-art-line hero-art-line--b" d="M404 200 C 340 196, 300 190, 240 185" stroke="#a78bfa" strokeOpacity="0.4" />
        <path className="hero-art-line" d="M430 268 C 380 300, 332 326, 290 344" stroke="#60a5fa" strokeOpacity="0.38" />
        <path className="hero-art-line hero-art-line--b" d="M450 142 C 424 126, 406 114, 396 108" stroke="#60a5fa" strokeOpacity="0.3" />
        <path className="hero-art-line" d="M530 142 C 552 126, 568 116, 578 108" stroke="#a78bfa" strokeOpacity="0.3" />
      </g>
      {/* relationship nodes */}
      <circle className="hero-art-node" cx="556" cy="180" r="3.5" fill="#60a5fa" />
      <circle className="hero-art-node hero-art-node--b" cx="692" cy="252" r="3.5" fill="#a78bfa" />
      <circle className="hero-art-node hero-art-node--c" cx="850" cy="296" r="3.5" fill="#60a5fa" />
      <circle className="hero-art-node hero-art-node--b" cx="240" cy="185" r="3.5" fill="#a78bfa" />
      <circle className="hero-art-node hero-art-node--c" cx="290" cy="344" r="3.5" fill="#60a5fa" />
      <circle className="hero-art-node" cx="396" cy="108" r="3" fill="#60a5fa" />
      <circle className="hero-art-node hero-art-node--c" cx="578" cy="108" r="3" fill="#a78bfa" />

      {/* token layer — colour, radius, spacing and type-scale markers */}
      <g>
        <rect x="64" y="70" width="170" height="230" rx="14" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.08" />
        <circle cx="92" cy="100" r="6" fill="#60a5fa" fillOpacity="0.9" />
        <circle cx="116" cy="100" r="6" fill="#a78bfa" fillOpacity="0.85" />
        <circle cx="140" cy="100" r="6" fill="#22c55e" fillOpacity="0.8" />
        <circle cx="164" cy="100" r="6" fill="#f59e0b" fillOpacity="0.75" />
        <rect x="84" y="124" width="20" height="20" rx="3" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.18" />
        <rect x="112" y="124" width="20" height="20" rx="7" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.18" />
        <rect x="140" y="124" width="20" height="20" rx="10" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.18" />
        <line x1="84" y1="168" x2="112" y2="168" stroke="#ffffff" strokeOpacity="0.25" strokeWidth="2" strokeLinecap="round" />
        <line x1="84" y1="180" x2="132" y2="180" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="2" strokeLinecap="round" />
        <line x1="84" y1="192" x2="152" y2="192" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2" strokeLinecap="round" />
        <rect x="84" y="214" width="84" height="9" rx="3" fill="#ffffff" fillOpacity="0.3" />
        <rect x="84" y="231" width="62" height="8" rx="3" fill="#ffffff" fillOpacity="0.22" />
        <rect x="84" y="247" width="44" height="7" rx="3" fill="#ffffff" fillOpacity="0.16" />
        <rect x="84" y="272" width="40" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.12" />
        <rect x="132" y="272" width="24" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.1" />
      </g>

      {/* table-row pattern with status states */}
      <g>
        <rect x="64" y="328" width="230" height="20" rx="5" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.08" />
        <circle cx="80" cy="338" r="3.5" fill="#22c55e" />
        <rect x="94" y="334" width="60" height="7" rx="3" fill="#ffffff" fillOpacity="0.2" />
        <rect x="170" y="334" width="36" height="7" rx="3" fill="#ffffff" fillOpacity="0.12" />
        <rect x="64" y="356" width="230" height="20" rx="5" fill="#ffffff" fillOpacity="0.04" />
        <circle cx="80" cy="366" r="3.5" fill="#60a5fa" />
        <rect x="94" y="362" width="48" height="7" rx="3" fill="#ffffff" fillOpacity="0.16" />
        <rect x="170" y="362" width="44" height="7" rx="3" fill="#ffffff" fillOpacity="0.1" />
        <rect x="64" y="384" width="230" height="20" rx="5" fill="#ffffff" fillOpacity="0.04" />
        <circle cx="80" cy="394" r="3.5" fill="#f59e0b" />
        <rect x="94" y="390" width="54" height="7" rx="3" fill="#ffffff" fillOpacity="0.16" />
      </g>

      {/* component variant tiles */}
      <g>
        <rect x="312" y="64" width="92" height="56" rx="12" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.14" />
        <rect x="328" y="84" width="60" height="18" rx="9" fill="#60a5fa" fillOpacity="0.3" stroke="#60a5fa" strokeOpacity="0.5" />
        <rect x="556" y="64" width="92" height="56" rx="12" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.14" />
        <rect x="570" y="84" width="30" height="14" rx="7" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeOpacity="0.16" />
        <rect x="606" y="84" width="28" height="14" rx="7" fill="#a78bfa" fillOpacity="0.2" stroke="#a78bfa" strokeOpacity="0.45" />
      </g>

      {/* core reusable component — focal */}
      <ellipse className="ds-board-core" cx="480" cy="200" rx="170" ry="130" fill={`url(#${focalId})`} />
      <g>
        <rect x="404" y="142" width="152" height="126" rx="16" fill={`url(#${panelId})`} stroke="#60a5fa" strokeOpacity="0.5" strokeWidth="1.5" />
        <rect x="420" y="158" width="72" height="9" rx="4" fill="#ffffff" fillOpacity="0.3" />
        <rect x="420" y="175" width="46" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.16" />
        <rect x="420" y="196" width="80" height="22" rx="11" fill="#3b82f6" fillOpacity="0.55" stroke="#93c5fd" strokeOpacity="0.7" />
        <rect x="420" y="228" width="48" height="16" rx="8" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeOpacity="0.2" />
        <rect x="476" y="228" width="44" height="16" rx="8" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeOpacity="0.4" />
        <circle cx="487" cy="236" r="3" fill="#22c55e" />
        <circle className="hero-art-node" cx="480" cy="136" r="5" fill="#93c5fd" />
      </g>

      {/* product context — dashboard module (floats) */}
      <g className="hero-art-float">
        <rect x="698" y="44" width="224" height="152" rx="14" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.16" />
        <rect x="710" y="56" width="200" height="14" rx="5" fill="#ffffff" fillOpacity="0.07" />
        <circle cx="720" cy="63" r="3" fill="#22c55e" />
        <circle cx="732" cy="63" r="3" fill="#60a5fa" />
        <rect x="710" y="80" width="42" height="104" rx="8" fill="#ffffff" fillOpacity="0.05" />
        <rect x="718" y="92" width="26" height="6" rx="3" fill="#ffffff" fillOpacity="0.18" />
        <rect x="718" y="106" width="20" height="6" rx="3" fill="#ffffff" fillOpacity="0.12" />
        <rect x="762" y="80" width="70" height="46" rx="8" fill="#ffffff" fillOpacity="0.07" stroke="#60a5fa" strokeOpacity="0.35" />
        <rect x="770" y="92" width="40" height="6" rx="3" fill="#ffffff" fillOpacity="0.22" />
        <rect x="840" y="80" width="70" height="46" rx="8" fill="#ffffff" fillOpacity="0.05" />
        <rect x="762" y="134" width="148" height="50" rx="8" fill="#ffffff" fillOpacity="0.05" />
        <rect x="772" y="146" width="64" height="6" rx="3" fill="#ffffff" fillOpacity="0.18" />
        <rect x="772" y="160" width="44" height="6" rx="3" fill="#ffffff" fillOpacity="0.12" />
      </g>

      {/* product context — filter chips + status badges */}
      <g>
        <rect x="698" y="232" width="46" height="18" rx="9" fill="#60a5fa" fillOpacity="0.15" stroke="#60a5fa" strokeOpacity="0.4" />
        <rect x="752" y="232" width="58" height="18" rx="9" fill="#ffffff" fillOpacity="0.06" stroke="#ffffff" strokeOpacity="0.15" />
        <rect x="818" y="232" width="34" height="18" rx="9" fill="#ffffff" fillOpacity="0.06" />
        <rect x="698" y="266" width="62" height="20" rx="10" fill="#22c55e" fillOpacity="0.14" stroke="#22c55e" strokeOpacity="0.4" />
        <circle cx="712" cy="276" r="3.5" fill="#22c55e" />
        <rect x="768" y="266" width="62" height="20" rx="10" fill="#f59e0b" fillOpacity="0.12" stroke="#f59e0b" strokeOpacity="0.35" />
        <circle cx="782" cy="276" r="3.5" fill="#f59e0b" />
      </g>

      {/* product context — mobile surface (floats, offset phase) */}
      <g className="hero-art-float hero-art-float--b">
        <rect x="856" y="224" width="66" height="140" rx="14" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.16" />
        <rect x="866" y="238" width="46" height="26" rx="6" fill="#60a5fa" fillOpacity="0.14" stroke="#60a5fa" strokeOpacity="0.35" />
        <rect x="866" y="272" width="46" height="18" rx="5" fill="#ffffff" fillOpacity="0.06" />
        <rect x="866" y="296" width="46" height="18" rx="5" fill="#ffffff" fillOpacity="0.06" />
        <circle cx="878" cy="348" r="2.5" fill="#60a5fa" />
        <circle cx="889" cy="348" r="2.5" fill="#ffffff" fillOpacity="0.2" />
        <circle cx="900" cy="348" r="2.5" fill="#ffffff" fillOpacity="0.2" />
      </g>
    </svg>
  );
}
