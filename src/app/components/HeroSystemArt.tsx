/*
  Hero narrative illustration — "Narrative System Map" (raw complexity →
  design structure → usable outcomes). Decorative only (aria-hidden), pure SVG,
  no screenshots and no readable data/metrics. Built for PRESENCE: the main
  surfaces are semi-opaque slate glass (not faint white washes), so the board
  and the human-use focal read as real elevated panels.

  Zones (background → foreground, dim → bright = complexity → clarity):
    1. Complexity — a few scattered nodes, broken lines, tilted fragments
       (raw systems before design). Background, ~20-30% presence.
    2. Structure — the central system map: roles sidebar, workflow columns,
       design-system tiles; clean connector paths. The strongest anchor.
    3. Human-use — bright foreground cluster with a focal glow: clean mobile
       surface, action card with a vivid primary action, status + search chips.
    Arrowheaded connector rails then lead to the real Selected Work cards as
    the system's final output nodes.

  Two variants share the element set:
    • panel — tall right-side desktop canvas, fades left toward the headline.
    • card  — compact board + human-use window for tablet/mobile (no complexity).
  Motion (drift / pulse / float / focal breathe / clarity signal) is CSS-driven
  so it pauses offscreen and disables under prefers-reduced-motion.
*/
import { useId } from 'react';

type Props = { className?: string; variant?: 'panel' | 'card' };

export function HeroSystemArt({ className = '', variant = 'panel' }: Props) {
  const uid = useId().replace(/:/g, '');
  const gridId = `hsa-grid-${uid}`;
  const panelId = `hsa-panel-${uid}`;
  const glowId = `hsa-glow-${uid}`;
  const focalId = `hsa-focal-${uid}`;
  const arrowId = `hsa-arrow-${uid}`;
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
          <path d="M46 0H0V46" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1" />
        </pattern>
        {/* semi-opaque slate glass — gives panels real elevation vs the bg */}
        <linearGradient id={panelId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e2c48" stopOpacity="0.96" />
          <stop offset="1" stopColor="#121a2e" stopOpacity="0.92" />
        </linearGradient>
        <radialGradient id={glowId} cx="0.5" cy="0.4" r="0.6">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.24" />
          <stop offset="0.55" stopColor="#a78bfa" stopOpacity="0.09" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={focalId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.52" />
          <stop offset="0.55" stopColor="#818cf8" stopOpacity="0.18" />
          <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
        </radialGradient>
        <marker id={arrowId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L10 5 L0 10 z" fill="#93c5fd" fillOpacity="0.85" />
        </marker>
        {isPanel && (
          <>
            <linearGradient id={maskGradId} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#000000" />
              <stop offset="0.12" stopColor="#000000" />
              <stop offset="0.24" stopColor="#ffffff" />
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
        {/* ZONE 1 — Complexity (background, controlled chaos, few elements) */}
        {isPanel && (
          <g className="hero-art-complexity">
            {/* broken connector lines */}
            <g stroke="#60a5fa" strokeWidth="1.25" strokeLinecap="round" fill="none" strokeOpacity="0.38">
              <path d="M118 150 L 196 118" />
              <path d="M300 96 L 248 198" />
              <path d="M690 150 L 636 252" stroke="#a78bfa" />
              <path d="M150 360 L 232 322" />
            </g>
            {/* fragmented / tilted cards */}
            <rect x="150" y="170" width="70" height="44" rx="8" fill="#ffffff" fillOpacity="0.07" transform="rotate(-9 185 192)" />
            <rect x="690" y="196" width="64" height="40" rx="8" fill="#ffffff" fillOpacity="0.06" transform="rotate(7 722 216)" />
            {/* scattered nodes */}
            <circle className="hero-art-node hero-art-node--b" cx="118" cy="150" r="3.5" fill="#60a5fa" fillOpacity="0.85" />
            <circle className="hero-art-node" cx="196" cy="118" r="3" fill="#a78bfa" fillOpacity="0.75" />
            <circle className="hero-art-node hero-art-node--c" cx="300" cy="96" r="3.5" fill="#60a5fa" fillOpacity="0.7" />
            <circle className="hero-art-node hero-art-node--b" cx="560" cy="132" r="3" fill="#60a5fa" fillOpacity="0.7" />
            <circle className="hero-art-node hero-art-node--c" cx="690" cy="150" r="3.5" fill="#a78bfa" fillOpacity="0.75" />
            <circle className="hero-art-node hero-art-node--b" cx="742" cy="300" r="3.5" fill="#a78bfa" fillOpacity="0.7" />
          </g>
        )}

        {/* connector flow — complexity entering, then clean rails toward outputs */}
        <g className="hero-art-lines" strokeLinecap="round" fill="none">
          {/* complexity -> board (entering, still rough) */}
          <path className="hero-art-line" d="M248 198 C 270 224, 282 244, 296 268" stroke="#60a5fa" strokeWidth="1.6" strokeOpacity="0.34" />
          <path className="hero-art-line hero-art-line--b" d="M560 132 C 548 180, 536 214, 520 250" stroke="#a78bfa" strokeWidth="1.6" strokeOpacity="0.32" />
          {/* board -> human-use (clean, directed) */}
          <path className="hero-art-line" d="M650 466 C 690 486, 700 506, 702 520" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.62" markerEnd={`url(#${arrowId})`} />
          <path className="hero-art-line hero-art-line--b" d="M628 520 C 660 556, 672 588, 676 608" stroke="#a78bfa" strokeWidth="2" strokeOpacity="0.56" markerEnd={`url(#${arrowId})`} />
          {/* output rail -> right edge (toward Selected Work) */}
          <path className="hero-art-line" d="M690 556 C 760 550, 802 547, 832 545" stroke="#93c5fd" strokeWidth="2.4" strokeOpacity="0.62" markerEnd={`url(#${arrowId})`} />
          <path className="hero-art-signal" d="M700 602 C 762 606, 802 610, 836 612" stroke="#dbeafe" strokeWidth="3" strokeDasharray="18 170" />
        </g>

        {/* ZONE 2 — Structure board (focal anchor, strongest of the wireframe) */}
        <g className="hero-art-board">
          <rect className="hero-art-board-edge" x="250" y="250" width="400" height="310" rx="20" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.28" />
          <rect x="270" y="270" width="360" height="26" rx="8" fill="#ffffff" fillOpacity="0.1" />
          <circle className="hero-art-node" cx="288" cy="283" r="4" fill="#22c55e" />
          <circle className="hero-art-node hero-art-node--b" cx="302" cy="283" r="4" fill="#60a5fa" />
          <circle className="hero-art-node hero-art-node--c" cx="316" cy="283" r="4" fill="#f59e0b" />
          {/* roles sidebar */}
          <rect x="270" y="312" width="80" height="232" rx="12" fill="#ffffff" fillOpacity="0.07" />
          <rect x="286" y="328" width="48" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.26" />
          <rect x="286" y="346" width="36" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.18" />
          <rect x="286" y="364" width="48" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.18" />
          <rect x="286" y="382" width="40" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.13" />
          {/* workflow columns */}
          <rect x="366" y="312" width="124" height="60" rx="10" fill="#ffffff" fillOpacity="0.1" stroke="#60a5fa" strokeOpacity="0.55" />
          <rect x="366" y="382" width="124" height="50" rx="10" fill="#ffffff" fillOpacity="0.08" />
          <rect x="366" y="442" width="124" height="54" rx="10" fill="#ffffff" fillOpacity="0.08" />
          <rect x="502" y="312" width="124" height="50" rx="10" fill="#ffffff" fillOpacity="0.08" />
          <rect x="502" y="372" width="124" height="60" rx="10" fill="#ffffff" fillOpacity="0.1" stroke="#a78bfa" strokeOpacity="0.55" />
          <rect x="502" y="442" width="124" height="54" rx="10" fill="#ffffff" fillOpacity="0.08" />
          {/* tiny bars */}
          <rect x="378" y="326" width="60" height="6" rx="3" fill="#ffffff" fillOpacity="0.3" />
          <rect x="378" y="340" width="40" height="6" rx="3" fill="#ffffff" fillOpacity="0.2" />
          <rect x="514" y="386" width="60" height="6" rx="3" fill="#ffffff" fillOpacity="0.3" />
          <rect x="514" y="400" width="44" height="6" rx="3" fill="#ffffff" fillOpacity="0.2" />
          {/* design-system tiles (reusable UI) */}
          <rect x="366" y="506" width="34" height="34" rx="8" fill="#ffffff" fillOpacity="0.09" stroke="#ffffff" strokeOpacity="0.16" />
          <rect x="408" y="506" width="34" height="34" rx="8" fill="#ffffff" fillOpacity="0.07" />
          <rect x="450" y="506" width="34" height="34" rx="17" fill="#ffffff" fillOpacity="0.07" />
          <rect x="492" y="506" width="34" height="34" rx="8" fill="#a78bfa" fillOpacity="0.26" stroke="#a78bfa" strokeOpacity="0.55" />
          <rect x="534" y="506" width="34" height="34" rx="8" fill="#ffffff" fillOpacity="0.07" />
        </g>

        {/* ZONE 3 — Human-use cluster (bright foreground focal, in front of board) */}
        <g className="hero-art-human hero-art-float hero-art-float--b">
          {/* focal glow behind the usable surface */}
          <ellipse className="hero-art-focal" cx="700" cy="566" rx="200" ry="172" fill={`url(#${focalId})`} />
          {/* clean mobile surface */}
          <rect x="540" y="480" width="104" height="266" rx="22" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.3" />
          <rect x="578" y="492" width="28" height="6" rx="3" fill="#ffffff" fillOpacity="0.26" />
          <rect x="556" y="514" width="72" height="40" rx="10" fill="#60a5fa" fillOpacity="0.28" stroke="#60a5fa" strokeOpacity="0.6" />
          <rect x="556" y="564" width="72" height="26" rx="7" fill="#ffffff" fillOpacity="0.11" />
          <rect x="556" y="598" width="72" height="26" rx="7" fill="#ffffff" fillOpacity="0.11" />
          <circle className="hero-art-node" cx="566" cy="716" r="4" fill="#60a5fa" />
          <circle cx="588" cy="716" r="4" fill="#ffffff" fillOpacity="0.3" />
          <circle cx="610" cy="716" r="4" fill="#ffffff" fillOpacity="0.3" />
          {/* clean action card */}
          <rect x="660" y="500" width="146" height="120" rx="16" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.3" />
          <rect x="678" y="518" width="92" height="8" rx="4" fill="#ffffff" fillOpacity="0.32" />
          <rect x="678" y="536" width="64" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.2" />
          <rect x="678" y="576" width="110" height="26" rx="13" fill="#3b82f6" fillOpacity="0.7" stroke="#bfdbfe" strokeOpacity="0.85" />
          {/* status chip + search chip */}
          <rect x="660" y="636" width="70" height="22" rx="11" fill="#22c55e" fillOpacity="0.24" stroke="#22c55e" strokeOpacity="0.55" />
          <circle className="hero-art-node hero-art-node--c" cx="673" cy="647" r="3.5" fill="#22c55e" />
          <rect x="744" y="636" width="62" height="22" rx="11" fill="#ffffff" fillOpacity="0.09" stroke="#ffffff" strokeOpacity="0.24" />
          <circle cx="757" cy="647" r="4.5" stroke="#a78bfa" strokeOpacity="0.7" strokeWidth="1.5" />
        </g>

        {/* free clarity node bridging board -> outputs */}
        <circle className="hero-art-node hero-art-node--c" cx="690" cy="556" r="4.5" fill="#93c5fd" />
      </g>
    </svg>
  );
}
