"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  Stethoscope,
  Layers,
  Globe,
  ArrowRight,
  Lock,
  Building2,
} from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Stat { value: string; label: string }
interface CaseStudy {
  id: string; category: string; location: string; tagline: string;
  description: string; tags: string[]; stats: Stat[];
  colorAccent: string; icon: React.ElementType;
  isComingSoon?: boolean; imagePath?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects: CaseStudy[] = [
  {
    id: "01", category: "Web Design + Booking System", location: "Azrou, Morocco",
    tagline: "كليينتا كيحجز بلا ما يتصل",
    description: "A premium dental clinic website with a fully automated online booking system. Patients can schedule appointments 24/7 — no phone calls, no friction.",
    tags: ["Next.js", "Booking System", "UI/UX", "Healthcare"],
    stats: [{ value: "↑ 3x", label: "Online Bookings" }, { value: "100%", label: "Mobile Optimized" }],
    colorAccent: "#00E5FF", icon: Stethoscope,
    imagePath: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=85",
  },
  {
    id: "04", category: "E-Commerce + WhatsApp AI", location: "Casablanca, Morocco",
    tagline: "متجر بيبيع حتى منين تنعس",
    description: "A premium coffee brand e-commerce store with an AI WhatsApp bot that handles orders, tracks delivery, and upsells automatically — 24/7.",
    tags: ["E-Commerce", "WhatsApp AI", "Next.js", "Automation"],
    stats: [{ value: "↑ 2.8x", label: "Revenue Increase" }, { value: "24/7", label: "AI Sales Active" }],
    colorAccent: "#00E5FF", icon: Building2,
    imagePath: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85",
  },
  {
    id: "02", category: "Agency Branding + Web", location: "Morocco",
    tagline: "الموقع اللي كتشوف فيه دابا",
    description: "The official Vortex Digital portfolio — built with Next.js 14, Framer Motion, and Lenis. Featuring 3D scroll animations, AI chat interface, and a futuristic design system.",
    tags: ["Next.js 14", "Framer Motion", "Lenis", "AI Chat"],
    stats: [{ value: "∞", label: "Scroll Depth" }, { value: "AAA", label: "Design Grade" }],
    colorAccent: "#67F3FF", icon: Layers,
    imagePath: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=85",
  },
  {
    id: "03", category: "AI Automation", location: "Morocco",
    tagline: "مشروع قادم — قيد التطوير",
    description: "An intelligent WhatsApp automation system for a local business — handling leads, follow-ups, and bookings entirely via AI in Arabic & French.",
    tags: ["AI", "WhatsApp", "Automation", "Arabic NLP"],
    stats: [{ value: "24/7", label: "AI Active" }, { value: "0", label: "Human Hours" }],
    colorAccent: "#00A8BD", isComingSoon: true, icon: Globe,
  },
];

// ─── Animated Stat ─────────────────────────────────────────────────────────────

const AnimatedStat = ({ value, label }: { value: string; label: string }) => {
  const match = value.match(/\d+/);
  const numericEnd = match ? parseInt(match[0]) : null;
  const { ref, count } = useCountUp({ end: numericEnd ?? 0, duration: 1500 });
  const display = numericEnd !== null ? value.replace(match![0], count.toString()) : value;
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col gap-0.5">
      <span className="text-xl font-black bg-gradient-to-r from-[#00E5FF] to-white bg-clip-text text-transparent font-mono">{display}</span>
      <span className="text-[9px] text-white/35 uppercase tracking-[0.15em] font-mono">{label}</span>
    </div>
  );
};

// ─── Rotating Border ───────────────────────────────────────────────────────────

const RotatingBorder = ({ active }: { active: boolean }) => (
  <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
      style={{ background: "conic-gradient(from 0deg, transparent 0deg, transparent 120deg, rgba(0,229,255,0.6) 180deg, transparent 240deg, transparent 360deg)" }}
      animate={{ rotate: 360 }}
      transition={{ duration: active ? 2.5 : 6, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute inset-[1px] rounded-[27px] bg-[#010912]" />
  </div>
);

// ─── Project Card ──────────────────────────────────────────────────────────────

const ProjectCard = ({ project, highlight = false }: { project: CaseStudy; highlight?: boolean }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 200, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 22 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    rawX.set(((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -7);
    rawY.set(((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 7);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false); rawX.set(0); rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col h-full"
    >
      <RotatingBorder active={hovered} />

      <motion.div
        className="absolute -inset-[1px] rounded-[28px] pointer-events-none"
        animate={{
          boxShadow: hovered
            ? `0 0 60px rgba(0,229,255,0.2), 0 0 120px rgba(0,229,255,0.08)`
            : highlight
            ? `0 0 40px rgba(0,229,255,0.12)`
            : `0 0 0px rgba(0,229,255,0)`,
        }}
        transition={{ duration: 0.5 }}
      />

      <div className="relative z-10 rounded-[27px] overflow-hidden flex flex-col h-full bg-[#010912] border border-[#00E5FF]/[0.12]">
        {/* Top line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px z-20 pointer-events-none"
          animate={{ background: hovered ? "linear-gradient(90deg,transparent,rgba(0,229,255,0.9),transparent)" : "linear-gradient(90deg,transparent,rgba(0,229,255,0.2),transparent)" }}
          transition={{ duration: 0.4 }}
        />

        {/* Shimmer */}
        <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 bottom-0 w-[60px] -skew-x-12"
            style={{ background: "linear-gradient(90deg,transparent,rgba(0,229,255,0.07),transparent)" }}
            initial={{ left: "-20%" }}
            animate={hovered ? { left: "120%" } : { left: "-20%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Image */}
        <div className="relative overflow-hidden h-[190px] flex-shrink-0">
          {project.imagePath ? (
            <>
              <motion.img
                src={project.imagePath} alt={project.tagline}
                className="absolute inset-0 w-full h-full object-cover"
                animate={{ scale: hovered ? 1.07 : 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#010912] via-[#010912]/30 to-transparent" />
            </>
          ) : (
            <div className="w-full h-full bg-[#00050A] flex items-center justify-center">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px,rgba(0,229,255,1) 1px,transparent 0)`, backgroundSize: "32px 32px" }} />
              <motion.div animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 5 : 0 }} transition={{ duration: 0.6 }}>
                <project.icon className="w-14 h-14 text-cyan-500/20" strokeWidth={0.75} />
              </motion.div>
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between">
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-400/80 bg-[#010912]/70 backdrop-blur-sm px-2 py-0.5 rounded">{project.category}</span>
            <span className="text-[9px] font-mono text-white/30 flex items-center gap-1"><Globe className="w-2.5 h-2.5" />{project.location}</span>
          </div>
          <div className="absolute top-3 right-4 text-[70px] font-black font-mono text-white/[0.04] select-none leading-none pointer-events-none">{project.id}</div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5 gap-3">
          <motion.h3 dir="rtl" className="text-xl font-black text-white leading-snug text-right"
            animate={{ color: hovered ? "#00E5FF" : "#ffffff" }} transition={{ duration: 0.4 }}>
            {project.tagline}
          </motion.h3>
          <p className="text-white/45 text-[12px] leading-relaxed">{project.description}</p>

          <div className="flex flex-wrap gap-1 mt-auto">
            {project.tags.map(tag => (
              <span key={tag} className="text-[8px] font-mono px-2 py-0.5 rounded bg-[#00E5FF]/[0.06] border border-[#00E5FF]/20 text-white/40 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-4">
              {project.stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <AnimatedStat value={stat.value} label={stat.label} />
                  {i < project.stats.length - 1 && <div className="h-4 w-px bg-white/[0.07]" />}
                </React.Fragment>
              ))}
            </div>
            {!project.isComingSoon && (
              <motion.button
                className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#00E5FF]/25 text-[#00E5FF]/70 text-[8px] font-mono uppercase tracking-widest"
                animate={{ borderColor: hovered ? "rgba(0,229,255,0.6)" : "rgba(0,229,255,0.25)", color: hovered ? "#00E5FF" : "rgba(0,229,255,0.7)", backgroundColor: hovered ? "rgba(0,229,255,0.08)" : "transparent" }}
                transition={{ duration: 0.3 }}
              >
                Case Study <motion.span animate={{ x: hovered ? 3 : 0 }}><ArrowRight className="w-2.5 h-2.5" /></motion.span>
              </motion.button>
            )}
          </div>
        </div>

        {/* Classified overlay */}
        {project.isComingSoon && (
          <div className="absolute inset-0 z-40 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#010912]/70 backdrop-blur-[8px]" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
              <motion.div className="w-full h-1/3 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
                animate={{ y: ["-100%", "300%"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }} />
            </div>
            <div className="relative flex flex-col items-center gap-3 text-center px-4">
              <motion.div className="p-4 rounded-full bg-[#010912] border border-cyan-500/40"
                animate={{ boxShadow: ["0 0 20px rgba(0,229,255,0.1)", "0 0 40px rgba(0,229,255,0.3)", "0 0 20px rgba(0,229,255,0.1)"] }}
                transition={{ duration: 2, repeat: Infinity }}>
                <Lock className="w-6 h-6 text-cyan-400" />
              </motion.div>
              <div>
                <p className="text-sm font-black font-mono text-cyan-400 tracking-[0.4em] uppercase mb-2">CLASSIFIED</p>
                <div className="h-px w-16 mx-auto bg-cyan-500/30 mb-2" />
                <p className="text-cyan-500/50 font-mono text-[8px] leading-relaxed uppercase tracking-widest">Deep-tech automation in development.<br />Client anonymity guaranteed.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ─── Spectacular CTA Button ────────────────────────────────────────────────────

const SpectacularButton = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="absolute -inset-[1px] rounded-full overflow-hidden">
        <motion.div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          style={{ background: "conic-gradient(from 0deg, transparent 0deg, rgba(0,229,255,0.0) 60deg, rgba(0,229,255,0.9) 180deg, rgba(0,229,255,0.0) 300deg, transparent 360deg)" }}
          animate={{ rotate: 360 }} transition={{ duration: hovered ? 1.5 : 3, repeat: Infinity, ease: "linear" }} />
      </div>
      <motion.div className="absolute -inset-4 rounded-full pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0.4, background: hovered ? "radial-gradient(ellipse,rgba(0,229,255,0.18) 0%,transparent 70%)" : "radial-gradient(ellipse,rgba(0,229,255,0.06) 0%,transparent 70%)" }}
        transition={{ duration: 0.4 }} />
      <motion.button
        className="relative z-10 flex items-center gap-3 px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.25em] overflow-hidden"
        style={{ border: "1px solid rgba(0,229,255,0.3)" }}
        animate={{ backgroundColor: hovered ? "rgba(0,229,255,1)" : "rgba(0,229,255,0)", color: hovered ? "#00050A" : "#00E5FF" }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div className="absolute inset-0 bg-[#00E5FF]" initial={{ y: "100%" }} animate={{ y: hovered ? "0%" : "100%" }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} />
        <span className="relative z-10">Start Your Project</span>
        <motion.span className="relative z-10" animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.3 }}>
          <ArrowRight className="w-4 h-4" />
        </motion.span>
      </motion.button>
    </div>
  );
};

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // The section is 200vh — useScroll captures full scroll-through
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring — the spring is the secret sauce for fluid feel
  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 18, restDelta: 0.001 });

  // ── Header
  const headerY    = useTransform(smooth, [0, 0.14], [50, 0]);
  const headerO    = useTransform(smooth, [0, 0.14], [0, 1]);

  // ── Center card (index 1 = coffee / e-commerce — displayed in middle)
  const midY       = useTransform(smooth, [0.08, 0.32], [220, 0]);
  const midO       = useTransform(smooth, [0.08, 0.30], [0, 1]);
  const midScale   = useTransform(smooth, [0.08, 0.32], [0.72, 1]);
  const midRotX    = useTransform(smooth, [0.08, 0.32], [28, 0]);

  // ── Spotlight burst behind center card
  const burstO     = useTransform(smooth, [0.08, 0.18, 0.35], [0, 1, 0]);
  const burstScale = useTransform(smooth, [0.08, 0.32], [0.4, 2.2]);

  // ── Left card (index 0 = dental)
  const leftX      = useTransform(smooth, [0.28, 0.55], [-260, 0]);
  const leftO      = useTransform(smooth, [0.26, 0.53], [0, 1]);
  const leftRotY   = useTransform(smooth, [0.28, 0.55], [-28, 0]);
  const leftScale  = useTransform(smooth, [0.28, 0.55], [0.82, 1]);

  // ── Right card (index 2 = vortex portfolio)
  const rightX     = useTransform(smooth, [0.28, 0.55], [260, 0]);
  const rightO     = useTransform(smooth, [0.26, 0.53], [0, 1]);
  const rightRotY  = useTransform(smooth, [0.28, 0.55], [28, 0]);
  const rightScale = useTransform(smooth, [0.28, 0.55], [0.82, 1]);

  // ── 4th card (classified) — drops from top
  const fourthY    = useTransform(smooth, [0.54, 0.74], [-80, 0]);
  const fourthO    = useTransform(smooth, [0.52, 0.72], [0, 1]);
  const fourthBlur = useTransform(smooth, [0.52, 0.72], [12, 0]);

  // ── CTA
  const ctaO       = useTransform(smooth, [0.76, 0.92], [0, 1]);
  const ctaY       = useTransform(smooth, [0.76, 0.92], [30, 0]);

  // ── Background orb parallax (subtle)
  const orb1Y      = useTransform(smooth, [0, 1], ["-15%", "15%"]);
  const orb2Y      = useTransform(smooth, [0, 1], ["10%", "-15%"]);

  // ── Vertical progress line
  const lineHeight = useTransform(smooth, [0, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative"
      style={{ minHeight: "200vh" }}
    >
      {/* ── Sticky inner ── */}
      <div className="sticky top-0 h-screen overflow-hidden bg-[#010912] flex flex-col justify-center">

        {/* ── Background atmosphere ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div style={{ y: orb1Y }} className="absolute top-[-15%] right-[-5%] w-[700px] h-[700px]">
            <div className="w-full h-full rounded-full bg-cyan-500/[0.07] blur-[120px]" />
          </motion.div>
          <motion.div style={{ y: orb2Y }} className="absolute bottom-[-15%] left-[-5%] w-[600px] h-[600px]">
            <div className="w-full h-full rounded-full bg-indigo-600/[0.05] blur-[140px]" />
          </motion.div>
          <div className="absolute inset-0 opacity-[0.022]"
            style={{ backgroundImage: `radial-gradient(circle at 1px 1px,rgba(0,229,255,1) 1px,transparent 0)`, backgroundSize: "40px 40px" }} />
          <div className="absolute inset-0 opacity-[0.012]"
            style={{ backgroundImage: "linear-gradient(rgba(0,229,255,0.3) 1px,transparent 1px)", backgroundSize: "100% 4px" }} />
        </div>

        {/* ── Left edge scroll-progress line ── */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.04] hidden lg:block pointer-events-none overflow-hidden">
          <motion.div className="w-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent" style={{ height: lineHeight }} />
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col gap-8">

          {/* ── Header ── */}
          <motion.div style={{ opacity: headerO, y: headerY }} className="flex flex-col items-center gap-3">
            <div className="flex items-center gap-3">
              <motion.div className="h-px bg-gradient-to-r from-transparent to-cyan-500/60" style={{ width: useTransform(headerO, [0, 1], [0, 40]) }} />
              <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">Provenance &amp; Success</span>
              <motion.div className="h-px bg-gradient-to-l from-transparent to-cyan-500/60" style={{ width: useTransform(headerO, [0, 1], [0, 40]) }} />
            </div>

            <h2 className="text-4xl md:text-7xl font-black text-center tracking-tighter uppercase flex gap-3 md:gap-5">
              <span className="text-white">Our</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-white">Impact</span>
            </h2>

            <p dir="rtl" className="text-white/35 text-base md:text-lg font-light text-center max-w-lg">
              مشاريعنا كتثبت قوتنا. ماشي غير هدرة — هادي نتيحة.
            </p>
          </motion.div>

          {/* ── Cards row ── */}
          <div className="relative" style={{ perspective: "1400px" }}>

            {/* Spotlight burst behind center */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{
                opacity: burstO,
                scale: burstScale,
                background: "radial-gradient(circle, rgba(0,229,255,0.18) 0%, rgba(0,229,255,0.04) 50%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">

              {/* Left card */}
              <motion.div style={{ x: leftX, opacity: leftO, rotateY: leftRotY, scale: leftScale, transformStyle: "preserve-3d" }}>
                <ProjectCard project={projects[0]} />
              </motion.div>

              {/* Center card */}
              <motion.div style={{ y: midY, opacity: midO, scale: midScale, rotateX: midRotX, transformStyle: "preserve-3d" }}>
                <ProjectCard project={projects[1]} highlight />
              </motion.div>

              {/* Right card */}
              <motion.div style={{ x: rightX, opacity: rightO, rotateY: rightRotY, scale: rightScale, transformStyle: "preserve-3d" }}>
                <ProjectCard project={projects[2]} />
              </motion.div>

            </div>
          </div>

          {/* ── 4th card (classified) + CTA — same row ── */}
          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* Classified card — 1/3 width */}
            <motion.div
              className="w-full md:w-1/3"
              style={{
                y: fourthY,
                opacity: fourthO,
                filter: useTransform(fourthBlur, v => `blur(${v}px)`),
                transformStyle: "preserve-3d",
              }}
            >
              <ProjectCard project={projects[3]} />
            </motion.div>

            {/* CTA — 2/3 width */}
            <motion.div
              style={{ opacity: ctaO, y: ctaY }}
              className="w-full md:w-2/3 flex flex-col items-center justify-center gap-4 py-6"
            >
              <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] font-mono">
                Ready for similar results?
              </p>
              <SpectacularButton />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
