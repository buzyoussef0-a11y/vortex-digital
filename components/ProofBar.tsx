"use client";

import { useState, useEffect } from "react";

const TICKER_ITEMS = [
  "✦ 15+ Projects Delivered",
  "✦ WhatsApp AI Automations",
  "✦ 3x Average ROI Increase",
  "✦ Next.js 14 • Framer Motion • Lenis",
  "✦ 100% Mobile Optimized",
  "✦ 24/7 Autonomous Systems",
  "✦ Arabic & French NLP",
  "✦ Morocco-Based • Global Standards",
];

// Repeat items exactly 2x for seamless CSS loop
const REPEATED = [...TICKER_ITEMS, ...TICKER_ITEMS];

export default function ProofBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1800);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div className="relative overflow-hidden py-5 border-y border-white/5 bg-[#00050A]">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 z-10 bg-gradient-to-r from-[#00050A] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 z-10 bg-gradient-to-l from-[#00050A] to-transparent" />

      {/* Ticker track */}
      <div
        className="flex gap-0 pause-on-hover"
        style={{
          animation: "ticker 55s linear infinite",
          width: "max-content",
          willChange: "transform",
        }}
      >
        {REPEATED.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-500 whitespace-nowrap px-8"
          >
            {item.startsWith("✦") ? (
              <>
                <span className="text-[#00E5FF]">✦</span>
                <span>{item.slice(2)}</span>
              </>
            ) : (
              item
            )}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
