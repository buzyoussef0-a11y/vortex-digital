"use client";

import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroCanvas from "@/components/sections/HeroCanvas";
import TheShift from "@/components/sections/TheShift";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import ChatCTA from "@/components/sections/ChatCTA";

export default function Home() {
  // ── Lenis smooth scroll ──────────────────────────────────────────────────
  useEffect(() => {
    let lenis: any;
    let rafId: number;

    const initLenis = async () => {
      // Dynamic import so it's client-only
      const LenisClass = (await import("@studio-freight/lenis")).default;

      lenis = new LenisClass({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time: number) {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      }

      rafId = requestAnimationFrame(raf);
    };

    initLenis();

    return () => {
      cancelAnimationFrame(rafId);
      lenis?.destroy();
    };
  }, []);

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "#00050A" }}
    >
      {/* ── Navbar ── */}
      <Navbar />

      {/* ── Hero (canvas image sequence) ── */}
      <HeroCanvas />

      {/* ── The Shift — problem/solution ── */}
      <TheShift />

      {/* ── Services ── */}
      <Services />

      {/* ── Portfolio ── */}
      <Portfolio />

      {/* ── Chat CTA ── */}
      <ChatCTA />

      {/* ── Footer ── */}
      <footer className="relative border-t border-white/[0.05] px-6 md:px-16 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-[0.2em] text-white/40 uppercase">
              VORTEX
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
            <span className="text-xs text-white/20">Digital</span>
          </div>
          <p className="text-xs text-white/20 tracking-wider">
            © {new Date().getFullYear()} Vortex Digital. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Built with{" "}
            <span className="text-cyan-400/60">AI</span> ·{" "}
            <span className="text-cyan-400/60">Next.js</span> ·{" "}
            <span className="text-cyan-400/60">Framer Motion</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
