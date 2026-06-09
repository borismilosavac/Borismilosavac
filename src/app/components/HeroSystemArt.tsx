/*
  Hero narrative illustration — "From Complexity to Clarity". Decorative only
  (aria-hidden), pure SVG, no screenshots and no readable data/metrics.

  Three zones tell the story behind the headline ("complex digital products
  that people can actually use"):
    1. Complexity  — faint scattered nodes, disconnected workflow lines and
       tilted card fragments (raw, messy systems before design). Background.
    2. Structure   — the central system board: roles sidebar, workflow columns,
       design-system tiles; connectors resolve into clean rails. Focal anchor.
    3. Human-use   — foreground cluster: clean mobile surface, action card,
       status + search chips (the usable, clear product experience).
  Flow rails then exit the system toward the right edge, where the real
  Selected Work cards act as the final output nodes.

  Two variants share the element set:
    • panel — tall right-side desktop canvas, fades left toward the headline.
    • card  — compact board-centred window for tablet/mobile (complexity hidden).
  Motion (drift / pulse / float / clarity-signal) is CSS-driven so it pauses
  offscreen and disables under prefers-reduced-motion.
*/
import { useId } from 'react';

type Props = { className?: string; variant?: 'panel' | 'card' };

export function HeroSystemArt({ className = '', variant = 'panel' }: Props) {
  const uid = useId().replace(/:/g, '');
  const gridId = `hsa-grid-${uid}`;
  const panelId = `hsa-panel-${uid}`;
  const glowId = `hsa-glow-${uid}`;
  const maskId = `hsa-fade-${uid}`;
  const maskGradId = `hsa-fadegrad-${uid}`;
  const isPanel = variant === 'panel';
  return (
    <svg
      viewBox={isPanel ? '0 0 840 900' : '180 230 540 360'}
      preserveAspectRatio={isPanel ? 'xMidYMid slice' : 'xMidYMid meet'}
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
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.07" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id={glowId} cx="0.58" cy="0.44" r="0.62">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.18" />
          <stop offset="0.55" stopColor="#a78bfa" stopOpacity="0.07" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
        {isPanel && (
          <>
            <linearGradient id={maskGradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#000000" />
              <stop offset="0.16" stopColor="#000000" />
              <stop offset="0.3" stopColor="#ffffff" />
            </linearGradient>
            <mask id={maskId}>
              <rect width="840" height="900" fill={`url(#${maskGradId})`} />
            </mask>
          </>
        )}
      </defs>

      {/* back layer — ambient glow + grid */}
      <rect className="hero-art-glow" width="840" height="900" fill={`url(#${glowId})`} />
      <rect width="840" height="900" fill={`url(#${gridId})`} />

      <g mask={isPanel ? `url(#${maskId})` : undefined}>
        {/* ZONE 1 — Complexity (background, faint, messy-but-controlled) */}
        {isPanel && (
          <g className="hero-art-complexity">
            {/* disconnected workflow lines */}
            <g stroke="#60a5fa" strokeWidth="1.25" strokeLinecap="round" fill="none" strokeOpacity="0.22">
              <path d="M118 150 L 196 118" />
              <path d="M300 96 L 248 198" />
              <path d="M470 118 L 560 132" stroke="#a78bfa" />
              <path d="M690 150 L 636 252" stroke="#a78bfa" />
              <path d="M150 360 L 232 322" />
              <path d="M742 300 L 690 360" />
            </g>
            {/* tilted abstract card fragments */}
            <rect x="150" y="170" width="70" height="44" rx="8" fill="#ffffff" fillOpacity="0.04" transform="rotate(-9 185 192)" />
            <rect x="690" y="196" width="64" height="40" rx="8" fill="#ffffff" fillOpacity="0.04" transform="rotate(7 722 216)" />
            <rect x="300" y="150" width="58" height="38" rx="8" fill="#ffffff" fillOpacity="0.035" transform="rotate(-5 329 169)" />
            {/* scattered faint nodes */}
            <circle className="hero-art-node hero-art-node--b" cx="118" cy="150" r="3.5" fill="#60a5fa" fillOpacity="0.6" />
            <circle className="hero-art-node" cx="196" cy="118" r="3" fill="#a78bfa" fillOpacity="0.55" />
            <circle className="hero-art-node hero-art-node--c" cx="300" cy="96" r="3.5" fill="#60a5fa" fillOpacity="0.5" />
            <circle className="hero-art-node" cx="470" cy="118" r="3" fill="#a78bfa" fillOpacity="0.5" />
            <circle className="hero-art-node hero-art-node--b" cx="560" cy="132" r="3" fill="#60a5fa" fillOpacity="0.5" />
            <circle className="hero-art-node hero-art-node--c" cx="690" cy="150" r="3.5" fill="#a78bfa" fillOpacity="0.55" />
            <circle className="hero-art-node" cx="150" cy="360" r="3" fill="#60a5fa" fillOpacity="0.5" />
            <circle className="hero-art-node hero-art-node--b" cx="742" cy="300" r="3.5" fill="#a78bfa" fillOpacity="0.5" />
          </g>
        )}

        {/* connector flow — complexity entering, then clean rails toward outputs */}
        <g className="hero-art-lines" strokeWidth="1.5" strokeLinecap="round" fill="none">
          {/* complexity -> board (entering) */}
          <path className="hero-art-line" d="M248 198 C 270 224, 282 244, 296 268" stroke="#60a5fa" strokeOpacity="0.28" />
          <path className="hero-art-line hero-art-line--b" d="M560 132 C 548 180, 536 214, 520 250" stroke="#a78bfa" strokeOpacity="0.26" />
          {/* board -> human-use (cleaner) */}
          <path className="hero-art-line" d="M650 470 C 690 488, 700 506, 700 522" stroke="#60a5fa" strokeOpacity="0.4" />
          <path className="hero-art-line hero-art-line--b" d="M628 520 C 660 556, 672 588, 678 612" stroke="#a78bfa" strokeOpacity="0.36" />
          {/* output rails -> right edge (toward Selected Work) */}
          <path className="hero-art-line" d="M690 556 C 760 550, 806 546, 838 543" stroke="#60a5fa" strokeOpacity="0.3" />
          <path className="hero-art-signal" d="M700 602 C 762 606, 802 610, 838 612" stroke="#93c5fd" strokeWidth="2.5" strokeDasharray="16 170" />
        </g>

        {/* ZONE 3 (under board edge) — Human-use cluster (foreground, brighter) */}
        <g className="hero-art-human hero-art-float hero-art-float--b">
          {/* clean mobile surface */}
          <rect x="540" y="480" width="104" height="266" rx="22" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.14" />
          <rect x="578" y="492" width="28" height="6" rx="3" fill="#ffffff" fillOpacity="0.14" />
          <rect x="556" y="514" width="72" height="40" rx="10" fill="#60a5fa" fillOpacity="0.14" stroke="#60a5fa" strokeOpacity="0.3" />
          <rect x="556" y="564" width="72" height="26" rx="7" fill="#ffffff" fillOpacity="0.05" />
          <rect x="556" y="598" width="72" height="26" rx="7" fill="#ffffff" fillOpacity="0.05" />
          <circle className="hero-art-node" cx="566" cy="716" r="4" fill="#60a5fa" />
          <circle cx="588" cy="716" r="4" fill="#ffffff" fillOpacity="0.18" />
          <circle cx="610" cy="716" r="4" fill="#ffffff" fillOpacity="0.18" />
          {/* clean action card */}
          <rect x="660" y="500" width="146" height="120" rx="16" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.14" />
          <rect x="678" y="518" width="92" height="8" rx="4" fill="#ffffff" fillOpacity="0.18" />
          <rect x="678" y="536" width="64" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.1" />
          <rect x="678" y="576" width="110" height="26" rx="13" fill="#60a5fa" fillOpacity="0.22" stroke="#60a5fa" strokeOpacity="0.45" />
          {/* status chip + search chip */}
          <rect x="660" y="636" width="70" height="22" rx="11" fill="#22c55e" fillOpacity="0.12" stroke="#22c55e" strokeOpacity="0.3" />
          <circle className="hero-art-node hero-art-node--c" cx="673" cy="647" r="3.5" fill="#22c55e" />
          <rect x="744" y="636" width="62" height="22" rx="11" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.1" />
          <circle cx="757" cy="647" r="4.5" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="1.5" />
        </g>

        {/* ZONE 2 — Structure board (focal anchor) */}
        <g className="hero-art-board">
          <rect className="hero-art-board-edge" x="250" y="250" width="400" height="310" rx="20" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.12" />
          <rect x="270" y="270" width="360" height="26" rx="8" fill="#ffffff" fillOpacity="0.05" />
          <circle className="hero-art-node" cx="288" cy="283" r="4" fill="#22c55e" />
          <circle className="hero-art-node hero-art-node--b" cx="302" cy="283" r="4" fill="#60a5fa" />
          <circle className="hero-art-node hero-art-node--c" cx="316" cy="283" r="4" fill="#f59e0b" />
          {/* roles sidebar */}
          <rect x="270" y="312" width="80" height="232" rx="12" fill="#ffffff" fillOpacity="0.04" />
          <rect x="286" y="328" width="48" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.14" />
          <rect x="286" y="346" width="36" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.1" />
          <rect x="286" y="364" width="48" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.1" />
          <rect x="286" y="382" width="40" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.08" />
          {/* workflow columns */}
          <rect x="366" y="312" width="124" height="60" rx="10" fill="#ffffff" fillOpacity="0.05" stroke="#60a5fa" strokeOpacity="0.22" />
          <rect x="366" y="382" width="124" height="50" rx="10" fill="#ffffff" fillOpacity="0.04" />
          <rect x="366" y="442" width="124" height="54" rx="10" fill="#ffffff" fillOpacity="0.04" />
          <rect x="502" y="312" width="124" height="50" rx="10" fill="#ffffff" fillOpacity="0.04" />
          <rect x="502" y="372" width="124" height="60" rx="10" fill="#ffffff" fillOpacity="0.05" stroke="#a78bfa" strokeOpacity="0.22" />
          <rect x="502" y="442" width="124" height="54" rx="10" fill="#ffffff" fillOpacity="0.04" />
          {/* tiny bars */}
          <rect x="378" y="326" width="60" height="6" rx="3" fill="#ffffff" fillOpacity="0.18" />
          <rect x="378" y="340" width="40" height="6" rx="3" fill="#ffffff" fillOpacity="0.12" />
          <rect x="514" y="386" width="60" height="6" rx="3" fill="#ffffff" fillOpacity="0.18" />
          <rect x="514" y="400" width="44" height="6" rx="3" fill="#ffffff" fillOpacity="0.12" />
          {/* design-system tiles (reusable UI) */}
          <rect x="366" y="506" width="34" height="34" rx="8" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.08" />
          <rect x="408" y="506" width="34" height="34" rx="8" fill="#ffffff" fillOpacity="0.04" />
          <rect x="450" y="506" width="34" height="34" rx="17" fill="#ffffff" fillOpacity="0.04" />
          <rect x="492" y="506" width="34" height="34" rx="8" fill="#a78bfa" fillOpacity="0.12" stroke="#a78bfa" strokeOpacity="0.28" />
          <rect x="534" y="506" width="34" height="34" rx="8" fill="#ffffff" fillOpacity="0.04" />
        </g>

        {/* free clarity node bridging board -> outputs */}
        <circle className="hero-art-node hero-art-node--c" cx="690" cy="556" r="4" fill="#60a5fa" />
      </g>
    </svg>
  );
}
