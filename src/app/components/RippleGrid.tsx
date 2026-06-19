/*
  RippleGrid — subtle WebGL grid animation for the Hero background.
  Uses OGL (minimal WebGL library). A fullscreen triangle fragment shader
  draws a rotated grid with a slow outward ripple wave. Opacity, glow, and
  vignette keep it premium rather than loud.

  Rules enforced here:
  • prefers-reduced-motion → no WebGL context created at all
  • IntersectionObserver  → RAF loop paused when not in viewport
  • WEBGL_lose_context    → GPU memory released on unmount
  • pointer-events: none  → never intercepts user interaction
  • aria-hidden           → invisible to screen readers
  • No mouse interaction by default (mouseInteraction=false)
  • DPR capped at 1.5    → lower GPU cost on HiDPI screens
*/
import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle } from 'ogl';

type Props = {
  enableRainbow?: boolean;
  gridColor?: string;
  rippleIntensity?: number;
  gridSize?: number;
  gridThickness?: number;
  fadeDistance?: number;
  vignetteStrength?: number;
  glowIntensity?: number;
  opacity?: number;
  gridRotation?: number;
  mouseInteraction?: boolean;
  className?: string;
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

const VERTEX = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT = `
precision highp float;
uniform float uTime;
uniform vec2  uResolution;
uniform vec3  uGridColor;
uniform float uGridSize;
uniform float uGridThickness;
uniform float uRippleIntensity;
uniform float uFadeDistance;
uniform float uVignetteStrength;
uniform float uGlowIntensity;
uniform float uOpacity;
uniform float uGridRotation;
varying vec2 vUv;

mat2 rot2(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

/* Anti-aliased grid lines. Returns 1.0 on line, 0.0 in cell. */
float gridLines(vec2 p, float t) {
  vec2 f = fract(p);
  vec2 d = min(f, 1.0 - f);
  float lx = smoothstep(t, t * 0.4, d.x);
  float ly = smoothstep(t, t * 0.4, d.y);
  return max(lx, ly);
}

void main() {
  /* centre UV, correct for aspect ratio */
  vec2 uv = vUv - 0.5;
  uv.x *= uResolution.x / uResolution.y;

  /* radial distance from centre */
  float dist = length(uv);

  /* vignette — fades the grid toward the edges */
  float vd   = dist / uFadeDistance;
  float vig  = 1.0 - smoothstep(0.25, 1.0, vd);
  vig        = pow(max(vig, 0.0), uVignetteStrength * 0.5);

  /* slow outward ripple wave, strongest at centre */
  float wave = sin(dist * 14.0 - uTime * 1.3)
               * uRippleIntensity
               * (1.0 - smoothstep(0.0, 0.75, dist));
  vec2 disp  = normalize(uv + 0.0001) * wave;

  /* rotate + shift by ripple, then scale to grid */
  vec2 gUv   = rot2(uGridRotation) * uv + disp;
  gUv       *= uGridSize;

  float t    = uGridThickness * 0.001;
  float line = gridLines(gUv, t);
  float glow = gridLines(gUv, t * 3.5) * uGlowIntensity;

  float alpha = (line + glow) * vig * uOpacity;
  gl_FragColor = vec4(uGridColor * (line + glow * 1.8), alpha);
}
`;

export function RippleGrid({
  gridColor      = '#6EA8FF',
  rippleIntensity = 0.025,
  gridSize       = 10.0,
  gridThickness  = 12.0,
  fadeDistance   = 1.6,
  vignetteStrength = 2.5,
  glowIntensity  = 0.06,
  opacity        = 0.22,
  gridRotation   = -10,
  className      = '',
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    /* Hard bail on reduced-motion — no context created */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const [r, g, b] = hexToRgb(gridColor);

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio ?? 1, 1.5),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const canvas = gl.canvas as HTMLCanvasElement;
    Object.assign(canvas.style, {
      position : 'absolute',
      inset    : '0',
      width    : '100%',
      height   : '100%',
      display  : 'block',
    });
    wrap.appendChild(canvas);

    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex   : VERTEX,
      fragment : FRAGMENT,
      uniforms : {
        uTime            : { value: 0 },
        uResolution      : { value: [wrap.clientWidth, wrap.clientHeight] },
        uGridColor       : { value: [r, g, b] },
        uGridSize        : { value: gridSize },
        uGridThickness   : { value: gridThickness },
        uRippleIntensity : { value: rippleIntensity },
        uFadeDistance    : { value: fadeDistance },
        uVignetteStrength: { value: vignetteStrength },
        uGlowIntensity   : { value: glowIntensity },
        uOpacity         : { value: opacity },
        uGridRotation    : { value: (gridRotation * Math.PI) / 180 },
      },
      transparent: true,
      depthTest : false,
      depthWrite: false,
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const w = wrap.clientWidth;
      const h = wrap.clientHeight || 1;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    }
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    const startTime = performance.now();
    let animId = 0;
    let visible = false;

    function tick() {
      animId = requestAnimationFrame(tick);
      if (!visible) return;
      program.uniforms.uTime.value = (performance.now() - startTime) / 1000;
      gl.clear(gl.COLOR_BUFFER_BIT);
      renderer.render({ scene: mesh });
    }
    animId = requestAnimationFrame(tick);

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(animId);
      io.disconnect();
      ro.disconnect();
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      canvas.remove();
    };
  }, []); // props are static; OGL context recreated on full remount if needed

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}
    />
  );
}
