/*
  AI workflow section — inline SVG illustrations for steps 07–09.
  Three distinct abstract illustrations sharing one style system:
    07 — UI Refinement:      rough wireframes → signal path → clean structure
    08 — Accessibility check: focus ring, contrast pairs, status column
    09 — Product-ready UI:   full frame, component grid, ready-state nodes
  Decorative, aria-hidden, no text/metrics. Same slate-glass panels,
  blue/violet palette and line weight as the Hero narrative illustration.
*/
import { useId } from 'react';

type Props = { variant: '07' | '08' | '09'; className?: string };

export function AiStepIllustration({ variant, className = '' }: Props) {
  const uid = useId().replace(/:/g, '');
  const panelId = `ai-panel-${uid}`;
  const glowId = `ai-glow-${uid}`;
  const focalId = `ai-focal-${uid}`;
  const arrowId = `ai-arrow-${uid}`;
  return (
    <svg
      viewBox="0 0 280 210"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        {/* slate-glass panel — same as Hero board for visual family */}
        <linearGradient id={panelId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e2c48" stopOpacity="0.95" />
          <stop offset="1" stopColor="#121a2e" stopOpacity="0.92" />
        </linearGradient>
        <radialGradient id={glowId} cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0.22" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
        </radialGradient>
        {variant === '09' && (
          <radialGradient id={focalId} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#60a5fa" stopOpacity="0.38" />
            <stop offset="1" stopColor="#818cf8" stopOpacity="0" />
          </radialGradient>
        )}
        {variant === '07' && (
          <marker id={arrowId} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 z" fill="#93c5fd" fillOpacity="0.9" />
          </marker>
        )}
      </defs>

      {/* ambient background glow */}
      <rect width="280" height="210" fill={`url(#${glowId})`} className="ai-step-glow" />

      {/* ── 07 — UI Refinement ─────────────────────────────────────────── */}
      {variant === '07' && (
        <g>
          {/* rough left blocks — slightly rotated, uneven */}
          <rect x="8" y="18" width="70" height="50" rx="6" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.16" transform="rotate(-3 43 43)" />
          <rect x="12" y="80" width="64" height="36" rx="6" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.13" transform="rotate(2 44 98)" />
          <rect x="6" y="128" width="74" height="44" rx="6" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.15" transform="rotate(-2 43 150)" />
          {/* rough internal bars (misaligned) */}
          <rect x="18" y="28" width="48" height="6" rx="2" fill="#ffffff" fillOpacity="0.22" />
          <rect x="24" y="42" width="34" height="6" rx="2" fill="#ffffff" fillOpacity="0.14" />
          <rect x="20" y="90" width="42" height="6" rx="2" fill="#ffffff" fillOpacity="0.18" />
          <rect x="14" y="140" width="52" height="6" rx="2" fill="#ffffff" fillOpacity="0.22" />
          <rect x="20" y="155" width="38" height="6" rx="2" fill="#ffffff" fillOpacity="0.14" />
          {/* misalignment guide line */}
          <line x1="8" y1="76" x2="82" y2="76" stroke="#60a5fa" strokeWidth="1" strokeOpacity="0.28" strokeDasharray="3 4" />
          {/* refinement signal path + node */}
          <path className="ai-step-line" d="M 86 105 C 102 88, 114 122, 130 105" stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.9" markerEnd={`url(#${arrowId})`} />
          <circle className="hero-art-node" cx="108" cy="105" r="3.5" fill="#60a5fa" />
          {/* clean right structure card */}
          <rect x="142" y="22" width="130" height="166" rx="12" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.28" />
          <rect x="152" y="32" width="110" height="16" rx="5" fill="#ffffff" fillOpacity="0.09" />
          {/* aligned content rows */}
          <rect x="152" y="62" width="110" height="8" rx="3" fill="#ffffff" fillOpacity="0.26" />
          <rect x="152" y="80" width="82" height="8" rx="3" fill="#ffffff" fillOpacity="0.16" />
          <rect x="152" y="98" width="110" height="8" rx="3" fill="#ffffff" fillOpacity="0.26" />
          <rect x="152" y="116" width="66" height="8" rx="3" fill="#ffffff" fillOpacity="0.16" />
          {/* clean action element */}
          <rect x="152" y="136" width="86" height="24" rx="12" fill="#60a5fa" fillOpacity="0.38" stroke="#60a5fa" strokeOpacity="0.65" />
          {/* alignment guides (dashed) */}
          <line x1="142" y1="62" x2="272" y2="62" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.07" strokeDasharray="3 4" />
          <line x1="142" y1="98" x2="272" y2="98" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.07" strokeDasharray="3 4" />
          {/* decision highlight node */}
          <circle className="hero-art-node hero-art-node--b" cx="262" cy="88" r="4.5" fill="#60a5fa" />
        </g>
      )}

      {/* ── 08 — Accessibility Check ────────────────────────────────────── */}
      {variant === '08' && (
        <g>
          {/* left — contrast bar pairs */}
          <rect x="10" y="38" width="54" height="16" rx="4" fill="#ffffff" fillOpacity="0.52" />
          <rect x="10" y="58" width="54" height="16" rx="4" fill="#ffffff" fillOpacity="0.14" />
          <circle className="hero-art-node" cx="70" cy="46" r="3.5" fill="#22c55e" />
          <rect x="10" y="90" width="54" height="16" rx="4" fill="#ffffff" fillOpacity="0.36" />
          <rect x="10" y="110" width="54" height="16" rx="4" fill="#ffffff" fillOpacity="0.14" />
          <circle className="hero-art-node hero-art-node--c" cx="70" cy="98" r="3.5" fill="#22c55e" />
          {/* motion-safe toggle */}
          <rect x="10" y="156" width="48" height="22" rx="11" fill="#ffffff" fillOpacity="0.07" stroke="#ffffff" strokeOpacity="0.22" />
          <circle cx="46" cy="167" r="8" fill="#60a5fa" fillOpacity="0.62" />
          {/* center — focus ring (dashed, activates on hover) */}
          <rect className="ai-step-line" x="78" y="52" width="124" height="106" rx="16" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeOpacity="0.55" strokeDasharray="5 3" />
          {/* focused card body */}
          <rect x="84" y="58" width="112" height="94" rx="12" fill={`url(#${panelId})`} stroke="#60a5fa" strokeWidth="2" strokeOpacity="0.72" />
          {/* card content rows */}
          <rect x="94" y="70" width="82" height="8" rx="3" fill="#ffffff" fillOpacity="0.28" />
          <rect x="94" y="86" width="58" height="7" rx="3" fill="#ffffff" fillOpacity="0.18" />
          {/* interactive element inside card */}
          <rect x="94" y="106" width="72" height="22" rx="11" fill="#60a5fa" fillOpacity="0.44" stroke="#60a5fa" strokeOpacity="0.68" />
          <rect x="94" y="136" width="92" height="7" rx="3" fill="#ffffff" fillOpacity="0.14" />
          {/* right — status check column */}
          <circle cx="224" cy="52" r="6" fill="#22c55e" fillOpacity="0.18" stroke="#22c55e" strokeOpacity="0.65" />
          <circle cx="224" cy="52" r="2.5" fill="#22c55e" />
          <line x1="224" y1="58" x2="224" y2="72" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx="224" cy="80" r="6" fill="#22c55e" fillOpacity="0.18" stroke="#22c55e" strokeOpacity="0.65" />
          <circle cx="224" cy="80" r="2.5" fill="#22c55e" />
          <line x1="224" y1="86" x2="224" y2="100" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx="224" cy="108" r="6" fill="#f59e0b" fillOpacity="0.18" stroke="#f59e0b" strokeOpacity="0.55" />
          <circle cx="224" cy="108" r="2.5" fill="#f59e0b" />
          <line x1="224" y1="114" x2="224" y2="128" stroke="#ffffff" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx="224" cy="136" r="6" fill="#22c55e" fillOpacity="0.18" stroke="#22c55e" strokeOpacity="0.65" />
          <circle cx="224" cy="136" r="2.5" fill="#22c55e" />
        </g>
      )}

      {/* ── 09 — Product-ready UI Direction ─────────────────────────────── */}
      {variant === '09' && (
        <g>
          {/* ready-state focal glow (breathes via hero-art-focal animation) */}
          <ellipse className="hero-art-focal" cx="140" cy="105" rx="160" ry="130" fill={`url(#${focalId})`} />
          {/* main product frame */}
          <rect x="12" y="12" width="256" height="186" rx="14" fill={`url(#${panelId})`} stroke="#ffffff" strokeOpacity="0.3" />
          {/* header strip + status dots */}
          <rect x="22" y="22" width="236" height="18" rx="5" fill="#ffffff" fillOpacity="0.09" />
          <circle cx="34" cy="31" r="3" fill="#22c55e" />
          <circle cx="44" cy="31" r="3" fill="#60a5fa" />
          <circle cx="54" cy="31" r="3" fill="#f59e0b" />
          {/* left sidebar */}
          <rect x="22" y="48" width="56" height="142" rx="8" fill="#ffffff" fillOpacity="0.06" />
          <rect x="30" y="60" width="40" height="7" rx="2" fill="#ffffff" fillOpacity="0.26" />
          <rect x="30" y="76" width="28" height="7" rx="2" fill="#ffffff" fillOpacity="0.16" />
          <rect x="30" y="92" width="40" height="7" rx="2" fill="#ffffff" fillOpacity="0.16" />
          <rect x="30" y="108" width="32" height="7" rx="2" fill="#ffffff" fillOpacity="0.12" />
          {/* component tile grid — row 1 */}
          <rect x="88" y="48" width="54" height="44" rx="8" fill="#ffffff" fillOpacity="0.08" stroke="#ffffff" strokeOpacity="0.14" />
          <rect x="150" y="48" width="54" height="44" rx="8" fill="#60a5fa" fillOpacity="0.15" stroke="#60a5fa" strokeOpacity="0.4" />
          <rect x="212" y="48" width="54" height="44" rx="8" fill="#ffffff" fillOpacity="0.08" />
          {/* tile content bars — row 1 */}
          <rect x="96" y="62" width="36" height="6" rx="2" fill="#ffffff" fillOpacity="0.28" />
          <rect x="158" y="62" width="36" height="6" rx="2" fill="#60a5fa" fillOpacity="0.62" />
          <rect x="220" y="62" width="36" height="6" rx="2" fill="#ffffff" fillOpacity="0.24" />
          {/* connector lines between rows (activates on hover) */}
          <path className="ai-step-line" d="M 115 92 L 115 100 M 177 92 L 177 100 M 239 92 L 239 100" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.14" />
          {/* component tile grid — row 2 */}
          <rect x="88" y="100" width="54" height="44" rx="8" fill="#ffffff" fillOpacity="0.08" />
          <rect x="150" y="100" width="54" height="44" rx="8" fill="#a78bfa" fillOpacity="0.14" stroke="#a78bfa" strokeOpacity="0.38" />
          <rect x="212" y="100" width="54" height="44" rx="8" fill="#ffffff" fillOpacity="0.08" />
          {/* tile content bars — row 2 */}
          <rect x="96" y="114" width="36" height="6" rx="2" fill="#ffffff" fillOpacity="0.24" />
          <rect x="158" y="114" width="36" height="6" rx="2" fill="#a78bfa" fillOpacity="0.56" />
          <rect x="220" y="114" width="36" height="6" rx="2" fill="#ffffff" fillOpacity="0.24" />
          {/* bottom status/output strip */}
          <rect x="88" y="152" width="178" height="28" rx="8" fill="#ffffff" fillOpacity="0.05" stroke="#ffffff" strokeOpacity="0.1" />
          {/* ready-state nodes */}
          <circle className="hero-art-node" cx="108" cy="166" r="3.5" fill="#22c55e" />
          <circle className="hero-art-node hero-art-node--b" cx="148" cy="166" r="3.5" fill="#22c55e" />
          <circle className="hero-art-node hero-art-node--c" cx="188" cy="166" r="3.5" fill="#22c55e" />
          <circle cx="230" cy="166" r="3.5" fill="#60a5fa" fillOpacity="0.65" />
          {/* junction nodes at grid corners */}
          <circle className="hero-art-node hero-art-node--c" cx="88" cy="48" r="2.5" fill="#60a5fa" />
          <circle cx="266" cy="48" r="2.5" fill="#a78bfa" fillOpacity="0.72" />
        </g>
      )}
    </svg>
  );
}
