/*
  Abstract "product system" illustration for the Hero — decorative only.
  No real screenshots, no readable data: a large central system board (the
  focal anchor) surrounded by a commerce/search fragment, a mobile flow
  silhouette, reusable-UI tiles and an AI/process node, tied together by
  thin connector lines and small nodes over a faint grid + orbit + glow.
  Two variants share one element set:
    • panel — tall right-side desktop canvas, dissolves toward the left.
    • card  — compact, board-centred viewBox window for tablet/mobile.
  Pure SVG; motion (drift / node + line pulse / fragment float) is driven by
  CSS classes so it can be paused offscreen and disabled under reduced motion.
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
      viewBox={isPanel ? '0 0 840 900' : '230 215 540 360'}
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
        <radialGradient id={glowId} cx="0.6" cy="0.42" r="0.62">
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

      {/* back layer — ambient glow, grid, faint orbit rings */}
      <rect width="840" height="900" fill={`url(#${glowId})`} />
      <rect width="840" height="900" fill={`url(#${gridId})`} />
      {isPanel && (
        <g fill="none">
          <ellipse cx="520" cy="420" rx="360" ry="300" stroke="#a78bfa" strokeOpacity="0.08" />
          <ellipse cx="520" cy="420" rx="250" ry="210" stroke="#60a5fa" strokeOpacity="0.07" />
        </g>
      )}

      <g mask={isPanel ? `url(#${maskId})` : undefined}>
        {/* connectors (behind panels) */}
        <g strokeWidth="1.5" strokeLinecap="round" fill="none">
          <path className="hero-art-line" d="M698 470 C 720 485, 712 505, 706 520" stroke="#60a5fa" strokeOpacity="0.4" />
          <path className="hero-art-line hero-art-line--b" d="M540 558 C 570 590, 595 615, 606 628" stroke="#a78bfa" strokeOpacity="0.38" />
          <path className="hero-art-line" d="M380 326 C 360 345, 340 350, 322 360" stroke="#60a5fa" strokeOpacity="0.32" />
          <path className="hero-art-line hero-art-line--b" d="M470 544 C 460 565, 450 585, 446 600" stroke="#a78bfa" strokeOpacity="0.3" />
          <path className="hero-art-line" d="M300 430 C 250 432, 210 432, 180 432" stroke="#60a5fa" strokeOpacity="0.24" />
        </g>

        {/* commerce / search discovery fragment (secondary, floats) */}
        <g className="hero-art-float">
          <rect x="210" y="120" width="200" height="208" rx="16" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.1" />
          <rect x="226" y="136" width="168" height="92" rx="10" fill="#ffffff" fillOpacity="0.05" />
          <rect x="226" y="240" width="120" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.16" />
          <rect x="226" y="256" width="74" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.1" />
          <rect x="226" y="276" width="44" height="16" rx="8" fill="#60a5fa" fillOpacity="0.12" stroke="#60a5fa" strokeOpacity="0.3" />
          <rect x="278" y="276" width="56" height="16" rx="8" fill="#ffffff" fillOpacity="0.05" />
          <rect x="342" y="276" width="36" height="16" rx="8" fill="#ffffff" fillOpacity="0.05" />
          <rect x="226" y="300" width="168" height="22" rx="11" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.08" />
          <circle cx="242" cy="311" r="5" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="1.5" />
        </g>

        {/* main system board — focal anchor */}
        <g>
          <rect x="300" y="230" width="400" height="330" rx="20" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.12" />
          <rect x="320" y="250" width="360" height="26" rx="8" fill="#ffffff" fillOpacity="0.05" />
          <circle className="hero-art-node" cx="338" cy="263" r="4" fill="#22c55e" />
          <circle className="hero-art-node hero-art-node--b" cx="352" cy="263" r="4" fill="#60a5fa" />
          <circle className="hero-art-node hero-art-node--c" cx="366" cy="263" r="4" fill="#f59e0b" />
          {/* sidebar (roles / navigation) */}
          <rect x="320" y="292" width="80" height="250" rx="12" fill="#ffffff" fillOpacity="0.04" />
          <rect x="336" y="308" width="48" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.14" />
          <rect x="336" y="326" width="36" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.1" />
          <rect x="336" y="344" width="48" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.1" />
          <rect x="336" y="362" width="40" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.08" />
          {/* workflow columns */}
          <rect x="416" y="292" width="124" height="64" rx="10" fill="#ffffff" fillOpacity="0.05" stroke="#60a5fa" strokeOpacity="0.22" />
          <rect x="416" y="366" width="124" height="52" rx="10" fill="#ffffff" fillOpacity="0.04" />
          <rect x="416" y="428" width="124" height="56" rx="10" fill="#ffffff" fillOpacity="0.04" />
          <rect x="552" y="292" width="124" height="52" rx="10" fill="#ffffff" fillOpacity="0.04" />
          <rect x="552" y="354" width="124" height="64" rx="10" fill="#ffffff" fillOpacity="0.05" stroke="#a78bfa" strokeOpacity="0.22" />
          <rect x="552" y="428" width="124" height="56" rx="10" fill="#ffffff" fillOpacity="0.04" />
          {/* tiny bars inside a couple of cards */}
          <rect x="428" y="306" width="60" height="6" rx="3" fill="#ffffff" fillOpacity="0.18" />
          <rect x="428" y="320" width="40" height="6" rx="3" fill="#ffffff" fillOpacity="0.12" />
          <rect x="564" y="368" width="60" height="6" rx="3" fill="#ffffff" fillOpacity="0.18" />
          <rect x="564" y="382" width="44" height="6" rx="3" fill="#ffffff" fillOpacity="0.12" />
          <rect x="416" y="500" width="260" height="42" rx="10" fill="#ffffff" fillOpacity="0.03" stroke="#ffffff" strokeOpacity="0.06" />
        </g>

        {/* mobile flow silhouette (secondary, floats, overlaps board corner) */}
        <g className="hero-art-float hero-art-float--b">
          <rect x="690" y="420" width="120" height="300" rx="24" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.12" />
          <rect x="734" y="434" width="32" height="6" rx="3" fill="#ffffff" fillOpacity="0.12" />
          <rect x="706" y="458" width="88" height="44" rx="12" fill="#ffffff" fillOpacity="0.05" stroke="#60a5fa" strokeOpacity="0.22" />
          <rect x="706" y="512" width="88" height="30" rx="8" fill="#ffffff" fillOpacity="0.04" />
          <rect x="706" y="550" width="88" height="30" rx="8" fill="#ffffff" fillOpacity="0.04" />
          <rect x="706" y="588" width="88" height="30" rx="8" fill="#ffffff" fillOpacity="0.04" />
          <circle className="hero-art-node" cx="728" cy="688" r="4" fill="#60a5fa" />
          <circle cx="750" cy="688" r="4" fill="#ffffff" fillOpacity="0.18" />
          <circle cx="772" cy="688" r="4" fill="#ffffff" fillOpacity="0.18" />
        </g>

        {/* reusable UI component tiles (secondary, floats) */}
        <g className="hero-art-float hero-art-float--c">
          <rect x="320" y="600" width="46" height="46" rx="10" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.08" />
          <rect x="374" y="600" width="46" height="46" rx="10" fill="#ffffff" fillOpacity="0.04" />
          <rect x="428" y="600" width="46" height="46" rx="23" fill="#ffffff" fillOpacity="0.04" />
          <rect x="320" y="654" width="46" height="46" rx="10" fill="#ffffff" fillOpacity="0.04" />
          <rect x="374" y="654" width="46" height="46" rx="10" fill="#a78bfa" fillOpacity="0.12" stroke="#a78bfa" strokeOpacity="0.28" />
          <rect x="428" y="654" width="46" height="46" rx="10" fill="#ffffff" fillOpacity="0.04" />
          <rect x="332" y="618" width="22" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.16" />
          <circle cx="451" cy="623" r="9" stroke="#60a5fa" strokeOpacity="0.4" strokeWidth="1.5" />
        </g>

        {/* AI / process node (secondary, floats) */}
        <g className="hero-art-float hero-art-float--b">
          <circle cx="610" cy="640" r="34" fill="#ffffff" fillOpacity="0.03" stroke="#a78bfa" strokeOpacity="0.3" />
          <circle className="hero-art-node" cx="610" cy="640" r="15" fill="#60a5fa" fillOpacity="0.25" stroke="#60a5fa" strokeOpacity="0.6" />
          <circle cx="610" cy="640" r="4" fill="#a78bfa" />
          <circle className="hero-art-node hero-art-node--b" cx="576" cy="640" r="4" fill="#60a5fa" />
          <circle className="hero-art-node hero-art-node--c" cx="644" cy="640" r="4" fill="#a78bfa" />
        </g>

        {/* free connection nodes */}
        <circle className="hero-art-node" cx="700" cy="300" r="4.5" fill="#60a5fa" />
        <circle className="hero-art-node hero-art-node--c" cx="540" cy="200" r="4" fill="#a78bfa" />
        {isPanel && (
          <g>
            <circle className="hero-art-node hero-art-node--b" cx="180" cy="430" r="4" fill="#60a5fa" />
            <circle className="hero-art-node" cx="120" cy="500" r="3.5" fill="#a78bfa" />
          </g>
        )}
      </g>
    </svg>
  );
}
