/*
  Abstract "product system" illustration for the Hero — decorative only.
  No real screenshots, no readable data: just wireframe panels, connector
  lines, nodes and component fragments that evoke dashboards, multi-role
  flows, e-commerce discovery, reusable UI and an AI/process node.
  Pure SVG; motion (drift / node + line pulse) is driven by CSS classes
  so it can be paused offscreen and disabled under reduced motion.
*/
type Props = { className?: string };

export function HeroSystemArt({ className = '' }: Props) {
  return (
    <svg
      viewBox="0 0 720 720"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <pattern id="hsa-grid" width="44" height="44" patternUnits="userSpaceOnUse">
          <path d="M44 0H0V44" stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1" />
        </pattern>
        <linearGradient id="hsa-panel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.02" />
        </linearGradient>
        <radialGradient id="hsa-glow" cx="0.62" cy="0.42" r="0.6">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.16" />
          <stop offset="0.55" stopColor="#a78bfa" stopOpacity="0.06" />
          <stop offset="1" stopColor="#a78bfa" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ambient glow + grid */}
      <rect width="720" height="720" fill="url(#hsa-glow)" />
      <rect width="720" height="720" fill="url(#hsa-grid)" />

      {/* connector signal paths (behind panels) */}
      <g stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round">
        <path className="hero-art-line" d="M250 250 C 360 240, 470 220, 560 150" strokeOpacity="0.4" />
        <path className="hero-art-line" d="M250 330 C 360 380, 470 430, 556 470" stroke="#a78bfa" strokeOpacity="0.4" />
        <path className="hero-art-line" d="M210 360 C 200 430, 195 470, 190 520" strokeOpacity="0.35" />
        <path className="hero-art-line" d="M430 360 C 470 430, 500 470, 520 540" stroke="#a78bfa" strokeOpacity="0.3" />
      </g>

      {/* main system board */}
      <g>
        <rect x="120" y="150" width="320" height="220" rx="16" fill="url(#hsa-panel)" stroke="#ffffff" strokeOpacity="0.1" />
        {/* header strip + status dots */}
        <rect x="136" y="166" width="288" height="22" rx="6" fill="#ffffff" fillOpacity="0.05" />
        <circle className="hero-art-node" cx="150" cy="177" r="3.5" fill="#22c55e" />
        <circle className="hero-art-node" cx="162" cy="177" r="3.5" fill="#60a5fa" />
        <circle className="hero-art-node" cx="174" cy="177" r="3.5" fill="#f59e0b" />
        {/* sidebar */}
        <rect x="136" y="200" width="64" height="154" rx="8" fill="#ffffff" fillOpacity="0.04" />
        <rect x="148" y="214" width="40" height="6" rx="3" fill="#ffffff" fillOpacity="0.14" />
        <rect x="148" y="230" width="32" height="6" rx="3" fill="#ffffff" fillOpacity="0.1" />
        <rect x="148" y="246" width="40" height="6" rx="3" fill="#ffffff" fillOpacity="0.1" />
        {/* board columns (kanban-like cards) */}
        <g>
          <rect x="212" y="200" width="96" height="50" rx="8" fill="#ffffff" fillOpacity="0.05" stroke="#60a5fa" strokeOpacity="0.25" />
          <rect x="212" y="258" width="96" height="40" rx="8" fill="#ffffff" fillOpacity="0.04" />
          <rect x="212" y="306" width="96" height="48" rx="8" fill="#ffffff" fillOpacity="0.04" />
          <rect x="320" y="200" width="96" height="40" rx="8" fill="#ffffff" fillOpacity="0.04" />
          <rect x="320" y="248" width="96" height="50" rx="8" fill="#ffffff" fillOpacity="0.05" stroke="#a78bfa" strokeOpacity="0.25" />
          <rect x="320" y="306" width="96" height="48" rx="8" fill="#ffffff" fillOpacity="0.04" />
        </g>
        {/* tiny bars inside a couple of cards */}
        <rect x="222" y="212" width="48" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.18" />
        <rect x="222" y="224" width="30" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.12" />
        <rect x="330" y="260" width="48" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.18" />
        <rect x="330" y="272" width="34" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.12" />
      </g>

      {/* mobile flow frame */}
      <g>
        <rect x="500" y="120" width="120" height="248" rx="22" fill="url(#hsa-panel)" stroke="#ffffff" strokeOpacity="0.12" />
        <rect x="544" y="132" width="32" height="6" rx="3" fill="#ffffff" fillOpacity="0.12" />
        <rect x="516" y="156" width="88" height="40" rx="10" fill="#ffffff" fillOpacity="0.05" stroke="#60a5fa" strokeOpacity="0.22" />
        <rect x="516" y="206" width="88" height="30" rx="8" fill="#ffffff" fillOpacity="0.04" />
        <rect x="516" y="244" width="88" height="30" rx="8" fill="#ffffff" fillOpacity="0.04" />
        <rect x="516" y="282" width="88" height="30" rx="8" fill="#ffffff" fillOpacity="0.04" />
        <circle className="hero-art-node" cx="538" cy="340" r="4" fill="#60a5fa" />
        <circle cx="560" cy="340" r="4" fill="#ffffff" fillOpacity="0.18" />
        <circle cx="582" cy="340" r="4" fill="#ffffff" fillOpacity="0.18" />
      </g>

      {/* commerce / search discovery card */}
      <g>
        <rect x="120" y="400" width="200" height="230" rx="16" fill="url(#hsa-panel)" stroke="#ffffff" strokeOpacity="0.1" />
        <rect x="136" y="416" width="168" height="96" rx="10" fill="#ffffff" fillOpacity="0.05" />
        <rect x="136" y="524" width="120" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.16" />
        <rect x="136" y="540" width="70" height="7" rx="3.5" fill="#ffffff" fillOpacity="0.1" />
        {/* filter chips */}
        <rect x="136" y="560" width="42" height="16" rx="8" fill="#60a5fa" fillOpacity="0.12" stroke="#60a5fa" strokeOpacity="0.3" />
        <rect x="184" y="560" width="56" height="16" rx="8" fill="#ffffff" fillOpacity="0.05" />
        <rect x="246" y="560" width="36" height="16" rx="8" fill="#ffffff" fillOpacity="0.05" />
        {/* search bar */}
        <rect x="136" y="588" width="168" height="24" rx="12" fill="#ffffff" fillOpacity="0.04" stroke="#ffffff" strokeOpacity="0.08" />
        <circle cx="152" cy="600" r="5" stroke="#a78bfa" strokeOpacity="0.5" strokeWidth="1.5" />
      </g>

      {/* design-system component grid */}
      <g>
        <rect x="470" y="430" width="40" height="40" rx="8" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.08" />
        <rect x="518" y="430" width="40" height="40" rx="8" fill="#ffffff" fillOpacity="0.04" />
        <rect x="566" y="430" width="40" height="40" rx="20" fill="#ffffff" fillOpacity="0.04" />
        <rect x="470" y="478" width="40" height="40" rx="8" fill="#ffffff" fillOpacity="0.04" />
        <rect x="518" y="478" width="40" height="40" rx="8" fill="#a78bfa" fillOpacity="0.12" stroke="#a78bfa" strokeOpacity="0.28" />
        <rect x="566" y="478" width="40" height="40" rx="8" fill="#ffffff" fillOpacity="0.04" />
        <rect x="480" y="446" width="20" height="6" rx="3" fill="#ffffff" fillOpacity="0.16" />
        <circle cx="586" cy="450" r="8" stroke="#60a5fa" strokeOpacity="0.4" strokeWidth="1.5" />
      </g>

      {/* AI / process node */}
      <g>
        <circle cx="600" cy="540" r="34" fill="#ffffff" fillOpacity="0.03" stroke="#a78bfa" strokeOpacity="0.3" />
        <circle className="hero-art-node" cx="600" cy="540" r="14" fill="#60a5fa" fillOpacity="0.25" stroke="#60a5fa" strokeOpacity="0.6" />
        <circle cx="600" cy="540" r="4" fill="#a78bfa" />
        <circle className="hero-art-node" cx="566" cy="540" r="4" fill="#60a5fa" />
        <circle className="hero-art-node" cx="634" cy="540" r="4" fill="#a78bfa" />
      </g>

      {/* free-floating connection nodes */}
      <circle className="hero-art-node" cx="440" cy="200" r="4.5" fill="#60a5fa" />
      <circle className="hero-art-node" cx="500" cy="180" r="4" fill="#a78bfa" />
      <circle className="hero-art-node" cx="320" cy="400" r="4" fill="#60a5fa" />
    </svg>
  );
}
