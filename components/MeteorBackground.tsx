"use client";

import { useEffect, useRef } from "react";

/* ─── Types ──────────────────────────────────────────────── */

interface Node {
  x: number; y: number;
  vx: number; vy: number;
  r: number;
  opacity: number;
  pulseActive: boolean;
  pulseTimer: number;
  pulseMax: number;
}

interface DataPulse {
  fromIdx: number;
  toIdx: number;
  progress: number;
  speed: number;
  alpha: number;
}

interface Comet {
  x: number; y: number;
  angle: number; speed: number;
  length: number; width: number; opacity: number;
  r: number; g: number; b: number;
  life: number; maxLife: number;
}

interface Blob {
  bx: number; by: number;   // 0-1 base position
  phase: number; phaseY: number;
  speed: number;
  radius: number;            // 0-1 relative to max(W,H)
  r: number; g: number; b: number;
  alpha: number;
}

/* ─── Constants ──────────────────────────────────────────── */

const CYAN   = { r: 0,   g: 229, b: 255 };
const PURPLE = { r: 123, g: 97,  b: 255 };
const ICE    = { r: 100, g: 210, b: 255 };
const NODE_COUNT  = 28;
const COMET_COUNT = 6;
const MAX_LINK    = 140;   // px — max distance for connections

/* ─── Helpers ────────────────────────────────────────────── */

function rnd(min: number, max: number) { return min + Math.random() * (max - min); }

function makeComet(W: number, H: number, warm = false): Comet {
  const isUltra = Math.random() < 0.05;
  const col     = Math.random() < 0.62 ? CYAN : Math.random() < 0.7 ? PURPLE : ICE;
  const speed   = isUltra ? rnd(7, 13) : rnd(0.8, 5.5);
  const sr      = Math.min((speed - 0.8) / 5, 1);
  const maxLife = rnd(70, 180);
  const angle   = (Math.PI / 180) * rnd(34, 58);
  let sx: number, sy: number;
  if (warm) { sx = rnd(0, W); sy = rnd(0, H); }
  else if (Math.random() < 0.6) { sx = rnd(-200, W + 200); sy = rnd(-80, -30); }
  else { sx = rnd(-80, -30); sy = rnd(0, H); }

  return {
    x: sx, y: sy, angle, speed,
    length:  isUltra ? rnd(240, 480) : 18 + sr * 230 + rnd(0, 70),
    width:   isUltra ? rnd(1.5, 2.8) : 0.3 + sr * 2.2 + rnd(0, 0.6),
    opacity: isUltra ? rnd(0.55, 0.9) : 0.08 + sr * 0.52 + rnd(0, 0.18),
    r: col.r, g: col.g, b: col.b,
    life: warm ? rnd(0, maxLife) : 0,
    maxLife,
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

    const dpr = Math.min(window.devicePixelRatio ?? 1, 1.5);
    let W = 0, H = 0;

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

    /* ── Aurora blobs ──────────────────────────────────────── */
    const blobs: Blob[] = [
      { bx: 0.12, by: 0.22, phase: 0,              phaseY: 1.1, speed: 8e-5, radius: 0.48, ...CYAN,   alpha: 0.038 },
      { bx: 0.88, by: 0.72, phase: Math.PI,        phaseY: 2.1, speed: 7e-5, radius: 0.55, ...PURPLE, alpha: 0.032 },
      { bx: 0.52, by: 0.42, phase: 1.6,            phaseY: 0.7, speed: 1e-4, radius: 0.44, ...CYAN,   alpha: 0.024 },
      { bx: 0.18, by: 0.82, phase: 4.3,            phaseY: 3.5, speed: 9e-5, radius: 0.42, ...PURPLE, alpha: 0.028 },
      { bx: 0.78, by: 0.18, phase: 2.9,            phaseY: 5.2, speed: 6e-5, radius: 0.40, ...CYAN,   alpha: 0.020 },
    ];

    /* ── Neural network nodes ──────────────────────────────── */
    const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
      x: rnd(0, W || window.innerWidth),
      y: rnd(0, H || window.innerHeight),
      vx: rnd(-0.28, 0.28),
      vy: rnd(-0.28, 0.28),
      r:  rnd(0.8, 2.2),
      opacity: rnd(0.18, 0.55),
      pulseActive: false,
      pulseTimer:  0,
      pulseMax:    rnd(250, 600),
    }));

    /* ── Data pulses ───────────────────────────────────────── */
    const pulses: DataPulse[] = [];

    /* ── Comets ────────────────────────────────────────────── */
    const comets: Comet[] = Array.from({ length: COMET_COUNT }, () => makeComet(W, H, true));

    let t = 0;
    let rafId: number;
    let frameSkip = 0;

    /* ════════════════ MAIN DRAW ════════════════ */
    const draw = () => {
      rafId = requestAnimationFrame(draw);
      frameSkip++;
      if (frameSkip % 2 !== 0) return; // throttle to ~30fps
      t++;
      ctx.clearRect(0, 0, W, H);

      /* ── 1. Aurora ── */
      ctx.globalCompositeOperation = "source-over";
      blobs.forEach(b => {
        const cx = (b.bx + Math.sin(t * b.speed        + b.phase ) * 0.17) * W;
        const cy = (b.by + Math.cos(t * b.speed * 0.83 + b.phaseY) * 0.11) * H;
        const R  = b.radius * Math.max(W, H);
        // Stretch horizontally via scale trick for ellipse
        ctx.save();
        ctx.translate(cx, cy);
        ctx.scale(1.35, 1);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, R);
        g.addColorStop(0,   `rgba(${b.r},${b.g},${b.b},${b.alpha})`);
        g.addColorStop(0.45,`rgba(${b.r},${b.g},${b.b},${b.alpha * 0.35})`);
        g.addColorStop(1,   `rgba(${b.r},${b.g},${b.b},0)`);
        ctx.beginPath();
        ctx.arc(0, 0, R, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        ctx.restore();
      });

      /* ── 2. Move nodes (bounded bounce) ── */
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0) { n.x = 0;  n.vx *= -1; }
        if (n.x > W) { n.x = W;  n.vx *= -1; }
        if (n.y < 0) { n.y = 0;  n.vy *= -1; }
        if (n.y > H) { n.y = H;  n.vy *= -1; }
        // Pulse timer
        if (!n.pulseActive) {
          n.pulseTimer++;
          if (n.pulseTimer >= n.pulseMax) {
            n.pulseTimer = 0;
            n.pulseMax   = rnd(250, 600);
            n.pulseActive = true;
          }
        }
      });

      /* ── 3. Connections ── */
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < NODE_COUNT; i++) {
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const dx   = nodes[i].x - nodes[j].x;
          const dy   = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist >= MAX_LINK) continue;

          const a = (1 - dist / MAX_LINK) * 0.09;

          const lg = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
          lg.addColorStop(0,   `rgba(0,229,255,${a})`);
          lg.addColorStop(0.5, `rgba(0,229,255,${a * 1.6})`);
          lg.addColorStop(1,   `rgba(0,229,255,${a})`);

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = lg;
          ctx.lineWidth   = 0.55;
          ctx.stroke();

          // Occasionally spawn a data pulse on this edge
          if (Math.random() < 0.00025) {
            pulses.push({
              fromIdx:  i,
              toIdx:    j,
              progress: 0,
              speed:    rnd(0.007, 0.018),
              alpha:    rnd(0.35, 0.75),
            });
          }
        }
      }

      /* ── 4. Nodes ── */
      nodes.forEach(n => {
        // Glow halo
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        halo.addColorStop(0,   `rgba(0,229,255,${n.opacity * 0.5})`);
        halo.addColorStop(1,   `rgba(0,229,255,0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${n.opacity})`;
        ctx.fill();

        // Pulse ring
        if (n.pulseActive) {
          const pr = (n.pulseTimer / 80) * 36;
          const pa = Math.max(0, 1 - n.pulseTimer / 80) * 0.28;
          ctx.beginPath();
          ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,229,255,${pa})`;
          ctx.lineWidth   = 1;
          ctx.stroke();
          if (++n.pulseTimer > 80) { n.pulseActive = false; n.pulseTimer = 0; }
        }
      });

      /* ── 5. Data pulses ── */
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;
        if (p.progress > 1) { pulses.splice(i, 1); continue; }

        const fn = nodes[p.fromIdx];
        const tn = nodes[p.toIdx];
        const px = fn.x + (tn.x - fn.x) * p.progress;
        const py = fn.y + (tn.y - fn.y) * p.progress;

        const dg = ctx.createRadialGradient(px, py, 0, px, py, 6);
        dg.addColorStop(0,   `rgba(0,229,255,${p.alpha})`);
        dg.addColorStop(0.45,`rgba(0,229,255,${p.alpha * 0.28})`);
        dg.addColorStop(1,   `rgba(0,229,255,0)`);
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fillStyle = dg;
        ctx.fill();
      }

      /* ── 6. Comets ── */
      for (let i = 0; i < COMET_COUNT; i++) {
        const c = comets[i];
        c.x    += Math.cos(c.angle) * c.speed;
        c.y    += Math.sin(c.angle) * c.speed;
        c.life += 1;

        const tv  = c.life / c.maxLife;
        const fi  = Math.min(tv * 7, 1);
        const fo  = tv > 0.6 ? 1 - (tv - 0.6) / 0.4 : 1;
        const alp = c.opacity * fi * fo;

        if (alp > 0.005) {
          const ca = Math.cos(c.angle);
          const sa = Math.sin(c.angle);
          const tx = c.x - ca * c.length;
          const ty = c.y - sa * c.length;

          // Trail
          const tg = ctx.createLinearGradient(tx, ty, c.x, c.y);
          tg.addColorStop(0,    `rgba(${c.r},${c.g},${c.b},0)`);
          tg.addColorStop(0.45, `rgba(${c.r},${c.g},${c.b},${alp * 0.28})`);
          tg.addColorStop(1,    `rgba(${c.r},${c.g},${c.b},${alp})`);
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(c.x, c.y);
          ctx.strokeStyle = tg;
          ctx.lineWidth   = c.width;
          ctx.lineCap     = "round";
          ctx.stroke();

          // Head glow
          if (c.opacity > 0.28 && alp > 0.07) {
            const gr = c.width * 7;
            const hg = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, gr);
            hg.addColorStop(0,    `rgba(${c.r},${c.g},${c.b},${alp})`);
            hg.addColorStop(0.38, `rgba(${c.r},${c.g},${c.b},${alp * 0.32})`);
            hg.addColorStop(1,    `rgba(${c.r},${c.g},${c.b},0)`);
            ctx.beginPath();
            ctx.arc(c.x, c.y, gr, 0, Math.PI * 2);
            ctx.fillStyle = hg;
            ctx.fill();
          }
        }

        if (c.life >= c.maxLife || c.x > W + 400 || c.y > H + 400) {
          comets[i] = makeComet(W, H, false);
        }
      }

      ctx.globalCompositeOperation = "source-over";
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
      style={{
        zIndex: 25,           // above sections wrapper (z-20)
        mixBlendMode: "screen", // dark canvas = transparent, particles = additive glow
      }}
    />
  );
}
