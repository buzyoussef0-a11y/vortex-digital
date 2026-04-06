"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work",     href: "#portfolio" },
  { label: "Process",  href: "#process"   },
  { label: "About",    href: "#about"     },
  { label: "Contact",  href: "#contact"   },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

function useActiveSection() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.35, rootMargin: "-80px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

function scrollToSection(href: string) {
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Navbar() {
  const [isPlaying, setIsPlaying]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const audioRef         = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef  = useRef<NodeJS.Timeout | null>(null);
  const targetVolume     = 0.2;

  const { scrollY } = useScroll();
  const [threshold, setThreshold] = useState(0);

  useEffect(() => {
    // Hero is 500vh, sticky until end reaches top (scrollY = 500vh)
    const updateThreshold = () => setThreshold(window.innerHeight * 5);
    updateThreshold();
    window.addEventListener("resize", updateThreshold);
    return () => window.removeEventListener("resize", updateThreshold);
  }, []);
  
  // Navbar specific transform logic
  // Slide down only when scroll reaches the end of the Hero section
  const navY = useTransform(scrollY, [threshold - 10, threshold], ["-100%", "0%"]);
  
  // Background and border transitions for when it is visible
  const navBg     = useTransform(scrollY, [threshold, threshold + 100], ["rgba(0, 0, 0, 0)", "rgba(0, 5, 10, 0.85)"]);
  const navBorder = useTransform(scrollY, [threshold, threshold + 100], ["rgba(255,255,255,0)", "rgba(255,255,255,0.06)"]);

  const activeSection = useActiveSection();

  /* ─── Audio helpers ─────────────────────────────────────────────── */
  const fadeAudio = useCallback(
    (startVol: number, endVol: number, duration: number, onComplete?: () => void) => {
      if (!audioRef.current) return;
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

      const steps = 20;
      const stepTime = duration / steps;
      const volStep = (endVol - startVol) / steps;
      let currentStep = 0;
      audioRef.current.volume = Math.max(0, Math.min(1, startVol));

      if (startVol === 0 && endVol > 0) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }

      fadeIntervalRef.current = setInterval(() => {
        currentStep++;
        if (!audioRef.current) return;
        audioRef.current.volume = Math.max(0, Math.min(1, startVol + volStep * currentStep));
        if (currentStep >= steps) {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          if (endVol === 0) audioRef.current.pause();
          onComplete?.();
        }
      }, stepTime);
    },
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    audioRef.current = new Audio("/back-music/Simulated_Serenity.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0;

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => { setIsPlaying(true); fadeAudio(0, targetVolume, 2000); })
        .catch(() => setIsPlaying(false));
    }

    const handleUnload = () => {
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
    };
    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide",     handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide",     handleUnload);
      if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; audioRef.current = null; }
    };
  }, [fadeAudio]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) { setIsPlaying(false); fadeAudio(audioRef.current.volume, 0, 800); }
    else           { setIsPlaying(true);  fadeAudio(audioRef.current.volume, targetVolume, 800); }
  };

  /* ─── Render ─────────────────────────────────────────────────────── */
  return (
    <>
      <motion.nav
        style={{ 
          backgroundColor: navBg, 
          borderColor: navBorder,
          y: navY
        }}
        className="fixed top-0 left-0 w-full z-50 h-16 px-4 md:px-10 border-b transition-colors duration-300 backdrop-blur-md flex items-center"
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-6">

          {/* ── Wordmark ─────────────────────────────────────────── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-lg font-bold tracking-[0.3em] uppercase group cursor-pointer shrink-0"
          >
            Vortex <span className="text-[#00E5FF] group-hover:blur-[2px] transition-all">Digital</span>
          </button>

          {/* ── Desktop Nav Links ────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => {
              const id      = href.slice(1);
              const isActive = activeSection === id;
              return (
                <button
                  key={href}
                  onClick={() => scrollToSection(href)}
                  className={`relative text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${
                    isActive ? "text-[#00E5FF]" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {label}
                  {/* Underline indicator */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[1px] bg-[#00E5FF]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{ originX: 0, width: "100%" }}
                  />
                </button>
              );
            })}
          </nav>

          {/* ── Right Controls ───────────────────────────────────── */}
          <div className="flex items-center gap-4 md:gap-6 shrink-0">

            {/* ── Audio Toggle — vinyl/waveform design ── */}
            <motion.button
              onClick={toggleAudio}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.93 }}
              aria-label={isPlaying ? "Pause background music" : "Play background music"}
              className="relative flex items-center gap-2.5 px-3 py-1.5 rounded-full overflow-hidden group"
              style={{
                background: isPlaying
                  ? "linear-gradient(135deg, rgba(0,229,255,0.12), rgba(0,229,255,0.04))"
                  : "rgba(255,255,255,0.03)",
                border: isPlaying
                  ? "1px solid rgba(0,229,255,0.45)"
                  : "1px solid rgba(255,255,255,0.1)",
                boxShadow: isPlaying
                  ? "0 0 18px rgba(0,229,255,0.22), inset 0 0 12px rgba(0,229,255,0.06)"
                  : "none",
                transition: "all 0.4s ease",
              }}
            >
              {/* Shimmer sweep on hover */}
              <span className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-[#00E5FF]/8 to-transparent pointer-events-none" />

              {/* Vinyl disc */}
              <div className="relative shrink-0 w-5 h-5">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 3, repeat: isPlaying ? Infinity : 0, ease: "linear" }}
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{
                    background: isPlaying
                      ? "conic-gradient(from 0deg, rgba(0,229,255,0.9) 0%, rgba(0,229,255,0.1) 25%, rgba(0,229,255,0.7) 50%, rgba(0,229,255,0.15) 75%, rgba(0,229,255,0.9) 100%)"
                      : "conic-gradient(from 0deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.3) 100%)",
                    boxShadow: isPlaying ? "0 0 10px rgba(0,229,255,0.5)" : "none",
                    transition: "box-shadow 0.4s",
                  }}
                >
                  {/* Center hole */}
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: isPlaying ? "#001a1f" : "#111",
                      boxShadow: isPlaying ? "0 0 4px rgba(0,229,255,0.6)" : "none",
                    }}
                  />
                </motion.div>
              </div>

              {/* Waveform bars */}
              <div className="flex gap-[2.5px] h-4 items-center">
                {[0.6, 1, 0.75, 1, 0.5].map((scale, i) => (
                  <motion.div
                    key={i}
                    animate={isPlaying ? {
                      height: ["30%", `${55 + scale * 45}%`, "25%", `${40 + scale * 55}%`, "30%"],
                      opacity: [0.6, 1, 0.7, 1, 0.6],
                    } : {
                      height: "25%",
                      opacity: 0.25,
                    }}
                    transition={isPlaying ? {
                      duration: 0.7 + i * 0.1,
                      repeat: Infinity,
                      delay: i * 0.12,
                      ease: "easeInOut",
                    } : { duration: 0.3 }}
                    className="w-[2px] rounded-full"
                    style={{
                      background: isPlaying
                        ? `rgba(0,229,255,${0.6 + scale * 0.4})`
                        : "rgba(255,255,255,0.35)",
                      boxShadow: isPlaying ? `0 0 6px rgba(0,229,255,${scale * 0.8})` : "none",
                    }}
                  />
                ))}
              </div>

              <span
                className="hidden sm:block text-[9px] font-mono tracking-[0.18em] uppercase transition-all duration-300"
                style={{
                  color: isPlaying ? "#00E5FF" : "rgba(255,255,255,0.45)",
                  textShadow: isPlaying ? "0 0 10px rgba(0,229,255,0.7)" : "none",
                }}
              >
                {isPlaying ? "Playing" : "Audio Off"}
              </span>
            </motion.button>

            {/* ── Desktop CTA ── */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.93 }}
              className="hidden md:flex items-center gap-2 px-5 py-1.5 rounded-full font-mono text-[9px] font-bold uppercase tracking-widest relative overflow-hidden group"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.06))",
                border: "1px solid rgba(0,229,255,0.45)",
                color: "#00E5FF",
                boxShadow: "0 0 14px rgba(0,229,255,0.18)",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "#00E5FF";
                el.style.color = "#000";
                el.style.boxShadow = "0 0 28px rgba(0,229,255,0.55)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "linear-gradient(135deg, rgba(0,229,255,0.15), rgba(0,229,255,0.06))";
                el.style.color = "#00E5FF";
                el.style.boxShadow = "0 0 14px rgba(0,229,255,0.18)";
              }}
            >
              {/* Shine sweep */}
              <span className="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <span className="relative">Initiate Project</span>
              <motion.span
                className="relative text-[10px]"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.a>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              className="md:hidden flex flex-col gap-[5px] justify-center items-center w-10 h-10 rounded-lg border border-white/10 hover:border-[#00E5FF]/30 transition-colors shrink-0"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-4 h-[1.5px] bg-white origin-center transition-all"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block w-4 h-[1.5px] bg-white origin-center transition-all"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-4 h-[1.5px] bg-white origin-center transition-all"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ── Mobile Drawer ─────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[64px] left-0 w-full z-40 bg-[#00050A]/95 backdrop-blur-xl border-b border-white/5 md:hidden"
          >
            <nav className="flex flex-col py-6 px-8">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.button
                  key={href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setMobileOpen(false); scrollToSection(href); }}
                  className={`text-left py-4 text-xs font-mono uppercase tracking-widest border-b border-white/5 transition-colors ${
                    activeSection === href.slice(1) ? "text-[#00E5FF]" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {label}
                </motion.button>
              ))}
              <motion.a
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-6 w-full py-4 border border-[#00E5FF]/40 rounded-xl text-center text-xs font-bold uppercase tracking-widest text-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-all"
              >
                Initiate Project →
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
