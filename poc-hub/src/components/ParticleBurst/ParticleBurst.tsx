import { useEffect, useRef, useCallback } from 'react';

// ── Noise (simplex-inspired value noise) ────────────────────────────
const PERM = new Uint8Array(512);
const GRAD = new Float32Array(512);
(() => {
  const p = new Uint8Array(256);
  for (let i = 0; i < 256; i++) p[i] = i;
  for (let i = 255; i > 0; i--) {
    const j = (Math.random() * (i + 1)) | 0;
    [p[i], p[j]] = [p[j], p[i]];
  }
  for (let i = 0; i < 512; i++) {
    PERM[i] = p[i & 255];
    GRAD[i] = ((PERM[i] & 15) / 7.5 - 1.0); // -1..1
  }
})();

function noise2D(x: number, y: number): number {
  const xi = Math.floor(x) & 255;
  const yi = Math.floor(y) & 255;
  const xf = x - Math.floor(x);
  const yf = y - Math.floor(y);
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const aa = PERM[PERM[xi] + yi];
  const ab = PERM[PERM[xi] + yi + 1];
  const ba = PERM[PERM[xi + 1] + yi];
  const bb = PERM[PERM[xi + 1] + yi + 1];
  const x1 = GRAD[aa] * xf + GRAD[aa + 1] * yf;
  const x2 = GRAD[ba] * (xf - 1) + GRAD[ba + 1] * yf;
  const y1 = GRAD[ab] * xf + GRAD[ab + 1] * (yf - 1);
  const y2 = GRAD[bb] * (xf - 1) + GRAD[bb + 1] * (yf - 1);
  const lerpX1 = x1 + u * (x2 - x1);
  const lerpX2 = y1 + u * (y2 - y1);
  return lerpX1 + v * (lerpX2 - lerpX1);
}

// ── Particle type ───────────────────────────────────────────────────
interface Particle {
  // origin
  ox: number;
  oy: number;
  // current position
  x: number;
  y: number;
  // velocity
  vx: number;
  vy: number;
  // visual
  size: number;
  length: number; // elongation
  angle: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  // noise offset (unique per particle)
  noiseOffX: number;
  noiseOffY: number;
  // depth layer 0-1
  depth: number;
}

// ── Config ──────────────────────────────────────────────────────────
const PARTICLE_COUNT = 1050;      // 30% fewer
const SPRING_K = 0.012;          // spring return stiffness
const DAMPING = 0.92;            // velocity decay per frame
const CURSOR_INFLUENCE = 350;    // pixels – outer influence radius (wider reach)
const CURSOR_INNER = 40;         // inner dead-zone radius
const CURSOR_STRENGTH = 10;      // repulsion magnitude
const NOISE_SCALE = 0.003;       // spatial frequency
const NOISE_SPEED = 0.0004;      // temporal speed
const NOISE_STRENGTH = 0.35;     // force magnitude

// ── Color palette (green / teal / blue – Kanini brand) ──────────────
const COLORS = [
  [0, 181, 173],    // teal #00B5AD
  [76, 175, 80],    // green #4CAF50
  [0, 150, 136],    // teal-dark
  [56, 142, 60],    // green-dark
  [0, 200, 190],    // teal-light
  [100, 200, 100],  // green-light
  [30, 160, 160],   // muted teal
  [60, 180, 120],   // sea green
];

function createParticles(w: number, h: number): Particle[] {
  const cx = w / 2;
  const cy = h / 2;
  const maxRadius = Math.min(w, h) * 0.55;   // wider spread
  const particles: Particle[] = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Radial distribution with sqrt for uniform area density
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * maxRadius;
    const ox = cx + Math.cos(angle) * r;
    const oy = cy + Math.sin(angle) * r;

    const depth = 0.3 + Math.random() * 0.7;
    const color = COLORS[(Math.random() * COLORS.length) | 0];
    const size = 1 + Math.random() * 2.5 * depth;

    particles.push({
      ox, oy,
      x: ox, y: oy,
      vx: 0, vy: 0,
      size,
      length: 1 + Math.random() * 2,  // shorter micro-lines
      angle: Math.random() * Math.PI,
      r: color[0],
      g: color[1],
      b: color[2],
      alpha: 0.15 + Math.random() * 0.45 * depth,
      noiseOffX: Math.random() * 1000,
      noiseOffY: Math.random() * 1000,
      depth,
    });
  }
  return particles;
}

// ── Component ───────────────────────────────────────────────────────
export default function ParticleBurst({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999, smoothX: -9999, smoothY: -9999, active: false });
  const rafRef = useRef(0);
  const timeRef = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  // Resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    sizeRef.current = { w, h };

    // Recreate particles on resize
    particlesRef.current = createParticles(w, h);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    // ── Global cursor tracking (works at screen edges) ─────────
    const onMouseMove = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // Use clientX/Y relative to canvas, clamped so edges still register
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };
    const onMouseLeave = () => {
      // Keep last position active briefly so edge interactions aren't cut off
      mouseRef.current.active = false;
    };

    // Listen on document for truly global tracking (even outside canvas)
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    // ── Animation loop ──────────────────────────────────────────
    const animate = (timestamp: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const { w, h } = sizeRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      timeRef.current = timestamp;

      // Smooth cursor interpolation (keeps tracking even after leave)
      const lerpFactor = 0.15;
      if (mouse.active) {
        mouse.smoothX += (mouse.x - mouse.smoothX) * lerpFactor;
        mouse.smoothY += (mouse.y - mouse.smoothY) * lerpFactor;
      } else {
        // Slow fade-out: keep last known position, gradually lose influence
        mouse.smoothX += (mouse.x - mouse.smoothX) * 0.02;
        mouse.smoothY += (mouse.y - mouse.smoothY) * 0.02;
      }

      const t = timestamp * NOISE_SPEED;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // 1. Spring force → return to origin
        const dxo = p.ox - p.x;
        const dyo = p.oy - p.y;
        const springFx = dxo * SPRING_K;
        const springFy = dyo * SPRING_K;

        // 2. Cursor repulsion force
        let cursorFx = 0;
        let cursorFy = 0;
        const dxc = p.x - mouse.smoothX;
        const dyc = p.y - mouse.smoothY;
        const distSq = dxc * dxc + dyc * dyc;
        const dist = Math.sqrt(distSq);

        if (dist < CURSOR_INFLUENCE && dist > CURSOR_INNER) {
          const influence = CURSOR_INFLUENCE * (0.8 + p.depth * 0.4); // depth parallax
          if (dist < influence) {
            const falloff = 1 - (dist - CURSOR_INNER) / (influence - CURSOR_INNER);
            const strength = CURSOR_STRENGTH * falloff * falloff; // quadratic falloff
            const invDist = 1 / (dist || 1);
            cursorFx = dxc * invDist * strength;
            cursorFy = dyc * invDist * strength;
          }
        }

        // 3. Noise force → continuous ambient motion
        const nx = noise2D(p.x * NOISE_SCALE + p.noiseOffX, t + p.noiseOffY);
        const ny = noise2D(p.y * NOISE_SCALE + p.noiseOffY, t + p.noiseOffX + 100);
        const noiseFx = nx * NOISE_STRENGTH;
        const noiseFy = ny * NOISE_STRENGTH;

        // 4. Integrate
        p.vx += springFx + cursorFx + noiseFx;
        p.vy += springFy + cursorFy + noiseFy;
        p.vx *= DAMPING;
        p.vy *= DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        // 5. Update angle based on velocity for elongated look
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > 0.2) {
          p.angle = Math.atan2(p.vy, p.vx);
        }

        // 6. Draw as elongated micro-line
        const elongation = Math.min(p.length + speed * 1, p.length * 2);
        const cosA = Math.cos(p.angle);
        const sinA = Math.sin(p.angle);
        const halfLen = elongation * 0.5;

        ctx.beginPath();
        ctx.moveTo(p.x - cosA * halfLen, p.y - sinA * halfLen);
        ctx.lineTo(p.x + cosA * halfLen, p.y + sinA * halfLen);
        ctx.strokeStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha})`;
        ctx.lineWidth = p.size;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
