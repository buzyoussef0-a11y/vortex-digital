"use client";

import { useEffect, useRef } from "react";

/* ─── Types ──────────────────────────────────────────────── */

interface Particle {
  x: number;
  y: number;
  angle: number;      // radians
  speed: number;
  length: number;     // trail length px
  width: number;      // stroke width
  opacity: number;    // max opacity
  r: number; g: number; b: number; // color
  life: number;
  maxLife: number;
  isUltra: boolean;   // rare super-bright comet
}

/* ─── Helpers ────────────────────────────────────────────── */

const CYAN   = { r: 0,   g: 229, b: 255 };
const PURPLE = { r: 123, g: 97,  b: 255 };
const ICE    = { r: 160, g: 230, b: 255 };

function pickColor(): { r: number; g: number; b: number } {
  const t = Math.random();
  if (t < 0.58) return CYAN;
  if (t < 0.88) return PURPLE;
  return ICE;
}

function makeParticle(
  w: number,
  h: number,
  randomStart = false,
  forceUltra = false,
): Particle {
  const isUltra = forceUltra || Math.random() < 0.04; // 4% chance
  const angle   = (Math.PI / 180) * (36 + Math.random() * 22); // 36–58°
  const speed   = isUltra
    ? 7 + Math.random() * 5
    : 0.8 + Math.random() * 4.5;

  const speedRatio = Math.min((speed - 0.8) / 4.5, 1);
  const maxLife    = isUltra
    ? 60  + Math.random() * 60
    : 90  + Math.random() * 200;
  const col = pickColor();

  // Spawn along the top edge or left edge, randomly distributed
  let startX: number, startY: number;
  if (randomStart) {
    startX = Math.random() * w;
    startY = Math.random() * h;
  } else {
    const useTop = Math.random() < 0.65;
    if (useTop) {
      startX = Math.random() * (w + 600) - 300;
      startY = -80 - Math.random() * 120;
    } else {
      startX = -80 - Math.random() * 120;
      startY = Math.random() * h;
    }
  }

  return {
    x: startX,
    y: startY,
    angle,
    speed,
    length: isUltra
      ? 280 + Math.random() * 220
      : 25  + speedRatio * 260 + Math.random() * 80,
    width: isUltra
      ? 1.8 + Math.random() * 1.2
      : 0.35 + speedRatio * 2   + Math.random() * 0.6,
    opacity: isUltra
      ? 0.75 + Math.random() * 0.25
      : 0.12 + speedRatio * 0.60 + Math.random() * 0.18,
    r: col.r, g: col.g, b: col.b,
    life: randomStart ? Math.random() * maxLife : 0,
    maxLife,
    isUltra,
  };
}

/* ─── Component ──────────────────────────────────────────── */

export default function MeteorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
    let W = window.innerWidth;
    let H = window.innerHeight;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width  = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Particles ── */
    const COUNT = 60;
    const particles: Particle[] = Array.from({ length: COUNT }, () =>
      makeParticle(W, H, true),
    );
    // Seed 2 ultra comets from the start
    particles[0] = makeParticle(W, H, true, true);

    let rafId: number;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      // "lighter" blend → particles glow brightly where they overlap
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Advance
        p.x    += Math.cos(p.angle) * p.speed;
        p.y    += Math.sin(p.angle) * p.speed;
        p.life += 1;

        // Life-cycle alpha envelope
        const t       = p.life / p.maxLife;
        const fadeIn  = Math.min(t * 7, 1);
        const fadeOut = t > 0.6 ? 1 - (t - 0.6) / 0.4 : 1;
        const alpha   = p.opacity * fadeIn * fadeOut;

        if (alpha > 0.005) {
          const cosA = Math.cos(p.angle);
          const sinA = Math.sin(p.angle);
          const tx   = p.x - cosA * p.length;
          const ty   = p.y - sinA * p.length;

          // ── Trail ──
          const trail = ctx.createLinearGradient(tx, ty, p.x, p.y);
          trail.addColorStop(0,    `rgba(${p.r},${p.g},${p.b},0)`);
          trail.addColorStop(0.45, `rgba(${p.r},${p.g},${p.b},${alpha * 0.25})`);
          trail.addColorStop(1,    `rgba(${p.r},${p.g},${p.b},${alpha})`);

          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = trail;
          ctx.lineWidth   = p.width;
          ctx.lineCap     = "round";
          ctx.stroke();

          // ── Head glow (mid-bright + ultra particles only) ──
          if ((p.opacity > 0.35 || p.isUltra) && alpha > 0.08) {
            const glowR = p.width * (p.isUltra ? 10 : 6);
            const halo  = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR);
            halo.addColorStop(0,   `rgba(${p.r},${p.g},${p.b},${alpha})`);
            halo.addColorStop(0.35,`rgba(${p.r},${p.g},${p.b},${alpha * 0.4})`);
            halo.addColorStop(1,   `rgba(${p.r},${p.g},${p.b},0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = halo;
            ctx.fill();

            // Ultra: extra wide outer bloom
            if (p.isUltra && alpha > 0.2) {
              const bloom = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowR * 3);
              bloom.addColorStop(0,  `rgba(${p.r},${p.g},${p.b},${alpha * 0.25})`);
              bloom.addColorStop(1,  `rgba(${p.r},${p.g},${p.b},0)`);
              ctx.beginPath();
              ctx.arc(p.x, p.y, glowR * 3, 0, Math.PI * 2);
              ctx.fillStyle = bloom;
              ctx.fill();
            }
          }
        }

        // ── Respawn ──
        if (
          p.life >= p.maxLife ||
          p.x > W + 300 ||
          p.y > H + 300
        ) {
          particles[i] = makeParticle(W, H, false);
        }
      }

      ctx.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
