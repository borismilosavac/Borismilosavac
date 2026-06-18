/*
  Hero illustration — "Controlled Complexity Map".

  Decorative only (aria-hidden), pure SVG, no screenshots / device frames /
  readable data. The whole composition is built on a single 60-unit grid
  (viewBox 840×900 = 14×15 cells), so every element sits on the grid the
  background draws — alignment is the primary "high-end" signal. Read
  left → right as a three-band narrative:

    1. Raw complexity (left)  — small cells on the grid, but with broken
       edges and ±15 (quarter-unit) offsets: disorder *within* a system,
       not random network dots. Low opacity; dims further on hover.
    2. Structure (centre)     — a clean module lattice on a shared baseline:
       header, rail, three aligned module tiles. The stable anchor; no
       chrome, no traffic-lights, no dashboard mimicry.
    3. Outcomes (right)       — exactly three calm output tiles on an even
       vertical rhythm, rhyming with the three Selected Work cards. Fed by
       thin orthogonal (Manhattan) connectors — no curves, no arrowheads.

  Two variants share the element set:
    • panel — tall right-side desktop canvas; fades left toward the headline
      via an SVG alpha mask. Includes the denser complexity cells.
    • card  — compact crop (complexity hint + structure + outputs) for
      tablet/mobile; renders only the shared minimal complexity.

  Motion is CSS-only (node pulse, complexity drift, focal breathe, sequential
  output brighten on hover) so it pauses offscreen and disables under
  prefers-reduced-motion. Transform / opacity only — no filters, no blur.
*/
import { useId } from 'react';

type Props = { className?: string; variant?: 'panel' | 'card' };

export function HeroSystemArt({ className = '', variant = 'panel' }: Props) {
  const uid = useId().replace(/:/g, '');
  const gridId = `hsa-grid-${uid}`;
  const panelId = `hsa-panel-${uid}`;
  const focalId = `hsa-focal-${uid}`;
  const maskId = `hsa-fade-${uid}`;
  const maskGradId = `hsa-fadegrad-${uid}`;
  const isPanel = variant === 'panel';
  return (
    <svg
      viewBox={isPanel ? '0 0 840 900' : '228 228 600 444'}
      preserveAspectRatio={isPanel ? 'xMidYMid slice' : 'xMidYMid meet'}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        {/* grid unit = 60; every element below snaps to it (½/¼-unit only for
            optical centring and the deliberate complexity offsets) */}
        <pattern id={gridId} width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0H0V60" stroke="#ffffff" strokeOpacity="0.045" strokeWidth="1" />
        </pattern>
        <linearGradient id={panelId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e2c48" stopOpacity="0.96" />
          <stop offset="1" stopColor="#121a2e" stopOpacity="0.92" />
        </linearGradient>
        {/* single tight focal behind the structure→outcomes axis (no broad haze) */}
        <radialGradient id={focalId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.30" />
          <stop offset="0.55" stopColor="#818cf8" stopOpacity="0.10" />
          <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
        {isPanel && (
          <>
            <linearGradient id={maskGradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#000000" />
              <stop offset="0.1" stopColor="#000000" />
              <stop offset="0.22" stopColor="#ffffff" />
            </linearGradient>
            <mask id={maskId}>
              <rect width="840" height="900" fill={`url(#${maskGradId})`} />
            </mask>
          </>
        )}
      </defs>

      {/* background grid — elements visibly sit on it */}
      <rect width="840" height="900" fill={`url(#${gridId})`} />
      {/* single tight focal glow on the structure→outcomes axis */}
      <ellipse className="hero-art-focal" cx="600" cy="450" rx="220" ry="190" fill={`url(#${focalId})`} />

      <g mask={isPanel ? `url(#${maskId})` : undefined}>

        {/* ─── ZONE 1: Raw complexity (left) ─────────────────────────────────
            Cells on the grid with broken edges + ¼-unit offsets = controlled
            disorder. Opacity driven by --sys-complexity (0.55 → 0.22 hover). */}
        <g className="hero-art-complexity">
          {/* shared minimal — renders in both variants */}
          <rect x="240" y="300" width="40" height="40" rx="6" fill="#ffffff" fillOpacity="0.10" stroke="#ffffff" strokeOpacity="0.16" />
          <rect x="315" y="300" width="40" height="40" rx="6" fill="#ffffff" fillOpacity="0.07" />
          <path d="M240 400 V360 H280" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.25" fill="none" />
          <circle className="hero-art-node" cx="300" cy="360" r="3" fill="#60a5fa" />
          <circle className="hero-art-node hero-art-node--b" cx="360" cy="420" r="3" fill="#a78bfa" />
          {/* complexity entering the structure (orthogonal, dims on hover) */}
          <path d="M360 360 H420" stroke="#60a5fa" strokeOpacity="0.34" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M360 480 H420" stroke="#a78bfa" strokeOpacity="0.30" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* panel-only denser field */}
          {isPanel && (
            <>
              <rect x="240" y="435" width="40" height="40" rx="6" fill="#ffffff" fillOpacity="0.08" />
              <path d="M300 420 H340 V460" stroke="#ffffff" strokeOpacity="0.16" strokeWidth="1.25" fill="none" />
              <rect x="300" y="540" width="40" height="40" rx="6" fill="#ffffff" fillOpacity="0.07" stroke="#ffffff" strokeOpacity="0.12" />
              <rect x="255" y="480" width="40" height="40" rx="6" fill="#ffffff" fillOpacity="0.05" />
              <rect x="360" y="300" width="36" height="36" rx="6" fill="#ffffff" fillOpacity="0.05" />
              <path d="M300 540 H360 V480" stroke="#60a5fa" strokeOpacity="0.22" strokeWidth="1.25" fill="none" />
              <circle className="hero-art-node hero-art-node--c" cx="300" cy="480" r="2.5" fill="#ffffff" fillOpacity="0.5" />
              <circle className="hero-art-node hero-art-node--b" cx="360" cy="540" r="3" fill="#60a5fa" />
              <circle className="hero-art-node" cx="240" cy="300" r="2.5" fill="#a78bfa" />
            </>
          )}
        </g>

        {/* connectors structure → outcomes (orthogonal spine, no arrowheads) */}
        <g className="hero-art-lines" strokeLinecap="round" fill="none" strokeWidth="2">
          <path d="M660 420 H690" stroke="#93c5fd" strokeOpacity="0.5" />
          <path d="M690 300 V540" stroke="#60a5fa" strokeOpacity="0.4" />
          <path d="M690 300 H720" className="hero-art-line" stroke="#60a5fa" strokeOpacity="0.45" />
          <path d="M690 420 H720" className="hero-art-line hero-art-line--b" stroke="#60a5fa" strokeOpacity="0.5" />
          <path d="M690 540 H720" className="hero-art-line" stroke="#60a5fa" strokeOpacity="0.45" />
        </g>

        {/* ─── ZONE 2: Structure lattice (centre anchor) ───────────────────── */}
        <g className="hero-art-board">
          <rect className="hero-art-board-edge" x="420" y="240" width="240" height="420" rx="20" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.28" />
          {/* header */}
          <rect x="450" y="270" width="180" height="24" rx="6" fill="#ffffff" fillOpacity="0.10" />
          <circle className="hero-art-node" cx="465" cy="282" r="3" fill="#60a5fa" />
          <rect x="486" y="279" width="90" height="6" rx="3" fill="#ffffff" fillOpacity="0.22" />
          {/* left rail */}
          <rect x="450" y="318" width="48" height="282" rx="8" fill="#ffffff" fillOpacity="0.06" />
          <rect x="462" y="336" width="24" height="6" rx="3" fill="#ffffff" fillOpacity="0.22" />
          <rect x="462" y="360" width="18" height="6" rx="3" fill="#ffffff" fillOpacity="0.16" />
          <rect x="462" y="384" width="24" height="6" rx="3" fill="#ffffff" fillOpacity="0.16" />
          <rect x="462" y="408" width="16" height="6" rx="3" fill="#ffffff" fillOpacity="0.13" />
          {/* module tiles on a shared baseline; tile A emphasised */}
          <rect x="516" y="318" width="114" height="84" rx="10" fill="#ffffff" fillOpacity="0.09" stroke="#60a5fa" strokeOpacity="0.5" />
          <rect x="534" y="336" width="72" height="6" rx="3" fill="#ffffff" fillOpacity="0.3" />
          <rect x="534" y="354" width="44" height="6" rx="3" fill="#ffffff" fillOpacity="0.2" />
          <rect x="516" y="414" width="114" height="78" rx="10" fill="#ffffff" fillOpacity="0.07" />
          <rect x="534" y="432" width="60" height="6" rx="3" fill="#ffffff" fillOpacity="0.22" />
          <rect x="516" y="504" width="114" height="96" rx="10" fill="#ffffff" fillOpacity="0.07" />
          <rect x="534" y="522" width="50" height="6" rx="3" fill="#ffffff" fillOpacity="0.2" />
          <rect x="534" y="558" width="72" height="22" rx="11" fill="#a78bfa" fillOpacity="0.26" stroke="#a78bfa" strokeOpacity="0.55" />
        </g>

        {/* ─── ZONE 3: Outcome tiles (right) — rhyme with 3 Selected Work rows ── */}
        <g className="hero-art-output">
          <rect x="720" y="264" width="96" height="72" rx="12" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.28" />
          <rect x="732" y="282" width="6" height="36" rx="3" fill="#60a5fa" fillOpacity="0.8" />
          <circle className="hero-art-node" cx="750" cy="300" r="3.5" fill="#60a5fa" />
          <rect x="762" y="287" width="48" height="7" rx="3" fill="#ffffff" fillOpacity="0.26" />
          <rect x="762" y="304" width="30" height="6" rx="3" fill="#ffffff" fillOpacity="0.16" />
        </g>
        <g className="hero-art-output hero-art-output--b">
          <rect x="720" y="384" width="96" height="72" rx="12" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.28" />
          <rect x="732" y="402" width="6" height="36" rx="3" fill="#a78bfa" fillOpacity="0.8" />
          <circle className="hero-art-node hero-art-node--b" cx="750" cy="420" r="3.5" fill="#a78bfa" />
          <rect x="762" y="407" width="48" height="7" rx="3" fill="#ffffff" fillOpacity="0.26" />
          <rect x="762" y="424" width="30" height="6" rx="3" fill="#ffffff" fillOpacity="0.16" />
        </g>
        <g className="hero-art-output hero-art-output--c">
          <rect x="720" y="504" width="96" height="72" rx="12" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.28" />
          <rect x="732" y="522" width="6" height="36" rx="3" fill="#22c55e" fillOpacity="0.75" />
          <circle className="hero-art-node hero-art-node--c" cx="750" cy="540" r="3.5" fill="#22c55e" />
          <rect x="762" y="527" width="48" height="7" rx="3" fill="#ffffff" fillOpacity="0.26" />
          <rect x="762" y="544" width="30" height="6" rx="3" fill="#ffffff" fillOpacity="0.16" />
        </g>

        {/* clarity node bridging structure → outcomes */}
        <circle className="hero-art-node hero-art-node--c" cx="660" cy="420" r="4" fill="#93c5fd" />
      </g>
    </svg>
  );
}
