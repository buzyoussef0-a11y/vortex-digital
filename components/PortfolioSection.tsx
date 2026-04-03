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
    <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col">
      <span className="text-2xl font-bold bg-gradient-to-r from-[#00E5FF] to-white bg-clip-text text-transparent font-space-grotesk">
        {display}
      </span>
      <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">{label}</span>
    </div>
  );
};

// ─── Rotating Border ───────────────────────────────────────────────────────────

const RotatingBorder = ({ active }: { active: boolean }) => (
  <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
      style={{ background: "conic-gradient(from 0deg, transparent 0deg, transparent 120deg, rgba(0,229,255,0.6) 180deg, transparent 240deg, transparent 360deg)" }}
      animate={{ rotate: 360 }}
      transition={{ duration: active ? 2.5 : 6, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute inset-[1px] rounded-[23px] bg-[#010912]" />
  </div>
);

// ─── Project Card ──────────────────────────────────────────────────────────────

const ProjectCard = ({
  project,
  highlight = false,
  compact = false,
}: {
  project: CaseStudy;
  highlight?: boolean;
  compact?: boolean;
}) => {
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
      whileHover="hover"
      className="relative group overflow-hidden rounded-3xl border border-[#00E5FF]/25 bg-[#00E5FF]/[0.05] backdrop-blur-2xl transition-all duration-700 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(0,229,255,0.22)] flex flex-col h-full"
    >
      {/* Rotating gradient border */}
      <RotatingBorder active={hovered} />

      {/* Outer glow */}
      <motion.div
        className="absolute -inset-[1px] rounded-3xl pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "0 0 60px rgba(0,229,255,0.18), 0 0 120px rgba(0,229,255,0.08), inset 0 0 60px rgba(0,229,255,0.04)"
            : highlight
            ? "0 0 30px rgba(0,229,255,0.1)"
            : "0 0 0px rgba(0,229,255,0)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Top glowing line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px z-10 pointer-events-none"
        animate={{
          background: hovered
            ? "linear-gradient(90deg, transparent, rgba(0,229,255,0.8), transparent)"
            : "linear-gradient(90deg, transparent, rgba(0,229,255,0.25), transparent)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Shimmer sweep */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 bottom-0 w-[60px] -skew-x-12"
          style={{ background: "linear-gradient(90deg, transparent, rgba(0,229,255,0.06), transparent)" }}
          initial={{ left: "-20%" }}
          animate={hovered ? { left: "120%" } : { left: "-20%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      </div>

      {/* Background project number */}
      <div className="absolute top-4 right-6 text-[90px] font-black font-mono text-white/[0.03] select-none pointer-events-none leading-none z-0">
        {project.id}
      </div>

      {/* Card glows */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/18 transition-colors duration-700 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/6 blur-[100px] rounded-full group-hover:bg-cyan-500/12 transition-colors duration-700 pointer-events-none" />

      {/* Image area */}
      <div className={`relative overflow-hidden flex-shrink-0 ${compact ? "h-[140px]" : "h-[190px]"}`}>
        {project.imagePath ? (
          <>
            <motion.img
              src={project.imagePath}
              alt={project.tagline}
              className="absolute inset-0 w-full h-full object-cover object-center"
              animate={{ scale: hovered ? 1.07 : 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#000810] via-transparent to-transparent opacity-90" />
            <div className="absolute inset-0 bg-[#000810]/10 mix-blend-overlay" />
          </>
        ) : (
          <div className="w-full h-full bg-[#00050A] flex items-center justify-center p-8">
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px,rgba(0,229,255,1) 1px,transparent 0)`, backgroundSize: "28px 28px" }} />
            <motion.div variants={{ hover: { scale: 1.1, rotate: 5 } }} className="relative z-10">
              <project.icon className="w-16 h-16 text-cyan-500/20" strokeWidth={0.5} />
            </motion.div>
          </div>
        )}

        {/* Labels overlay */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
          <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-cyan-400/80">{project.category}</span>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/5 border border-white/5 backdrop-blur-md">
            <Globe className="w-2.5 h-2.5 text-white/30" />
            <span className="text-[8px] font-mono text-white/40 uppercase tracking-tighter">{project.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`relative z-10 flex flex-col flex-grow ${compact ? "p-5" : "p-6"} gap-3`}>
        <motion.h3
          dir="rtl"
          className={`font-black text-white text-right leading-tight transition-colors duration-500 ${compact ? "text-lg" : "text-2xl md:text-[1.4rem]"}`}
          animate={{ color: hovered ? "#00E5FF" : "#ffffff" }}
          transition={{ duration: 0.4 }}
        >
          {project.tagline}
        </motion.h3>

        <p className={`text-white/55 leading-relaxed ${compact ? "text-[11px]" : "text-sm"}`}>
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[8px] font-mono px-2 py-0.5 rounded-md bg-[#00E5FF]/[0.06] border border-[#00E5FF]/25 text-white/50 uppercase tracking-wider group-hover:border-cyan-500/40 group-hover:text-white/70 transition-all duration-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats & CTA */}
        <div className="mt-3 pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            {project.stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                <AnimatedStat value={stat.value} label={stat.label} />
                {i < project.stats.length - 1 && <div className="h-5 w-px bg-white/5" />}
              </React.Fragment>
            ))}
          </div>
          {!project.isComingSoon && (
            <motion.button
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[9px] font-bold uppercase tracking-widest hover:bg-cyan-500/20 transition-all duration-300"
              animate={{ borderColor: hovered ? "rgba(0,229,255,0.6)" : "rgba(0,229,255,0.2)", color: hovered ? "#00E5FF" : "rgba(0,229,255,0.8)" }}
            >
              Case Study
              <motion.span animate={{ x: hovered ? 3 : 0 }} transition={{ duration: 0.3 }}>
                <ArrowRight className="w-3 h-3" />
              </motion.span>
            </motion.button>
          )}
        </div>
      </div>

      {/* Classified overlay */}
      {project.isComingSoon && (
        <div className="absolute inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#00050A]/60 backdrop-blur-[6px]" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <motion.div
              className="w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
              animate={{ y: ["-100%", "300%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            />
          </div>
          <div className="relative flex flex-col items-center gap-4 text-center px-4">
            <motion.div
              className="p-4 rounded-full bg-[#000810] border border-cyan-500/30"
              animate={{ boxShadow: ["0 0 20px rgba(0,229,255,0.1)", "0 0 40px rgba(0,229,255,0.3)", "0 0 20px rgba(0,229,255,0.1)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Lock className="w-7 h-7 text-cyan-500" />
            </motion.div>
            <div>
              <span className="text-base font-mono font-bold text-cyan-500 tracking-[0.5em] uppercase">CLASSIFIED</span>
              <div className="h-px w-20 mx-auto bg-cyan-500/30 my-2" />
              <p className="text-cyan-500/60 font-mono text-[9px] max-w-[180px] leading-relaxed uppercase tracking-widest">
                Deep-tech automation in development. Client anonymity guaranteed.
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ─── Spectacular CTA Button ────────────────────────────────────────────────────

const SpectacularButton = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="absolute -inset-[1px] rounded-full overflow-hidden">
        <motion.div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          style={{ background: "conic-gradient(from 0deg, transparent 0deg, rgba(0,229,255,0.0) 60deg, rgba(0,229,255,0.9) 180deg, rgba(0,229,255,0.0) 300deg, transparent 360deg)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: hovered ? 1.5 : 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.div
        className="absolute -inset-4 rounded-full pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0.4, background: hovered ? "radial-gradient(ellipse,rgba(0,229,255,0.18) 0%,transparent 70%)" : "radial-gradient(ellipse,rgba(0,229,255,0.06) 0%,transparent 70%)" }}
        transition={{ duration: 0.4 }}
      />
      <motion.button
        className="relative z-10 flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-[0.25em] overflow-hidden"
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 55, damping: 18, restDelta: 0.001 });

  // ── Header animation
  const headerY = useTransform(smooth, [0, 0.14], [50, 0]);
  const headerO = useTransform(smooth, [0, 0.14], [0, 1]);
  const lineW   = useTransform(smooth, [0, 0.14], [0, 40]);

  // ── Center card (middle column)
  const midY     = useTransform(smooth, [0.08, 0.32], [200, 0]);
  const midO     = useTransform(smooth, [0.08, 0.30], [0, 1]);
  const midScale = useTransform(smooth, [0.08, 0.32], [0.75, 1]);
  const midRotX  = useTransform(smooth, [0.08, 0.32], [25, 0]);

  // ── Spotlight burst
  const burstO     = useTransform(smooth, [0.08, 0.18, 0.36], [0, 1, 0]);
  const burstScale = useTransform(smooth, [0.08, 0.32], [0.4, 2.2]);

  // ── Left card
  const leftX     = useTransform(smooth, [0.28, 0.55], [-280, 0]);
  const leftO     = useTransform(smooth, [0.26, 0.53], [0, 1]);
  const leftRotY  = useTransform(smooth, [0.28, 0.55], [-25, 0]);
  const leftScale = useTransform(smooth, [0.28, 0.55], [0.85, 1]);

  // ── Right card
  const rightX     = useTransform(smooth, [0.28, 0.55], [280, 0]);
  const rightO     = useTransform(smooth, [0.26, 0.53], [0, 1]);
  const rightRotY  = useTransform(smooth, [0.28, 0.55], [25, 0]);
  const rightScale = useTransform(smooth, [0.28, 0.55], [0.85, 1]);

  // ── 4th card
  const fourthY    = useTransform(smooth, [0.54, 0.74], [-80, 0]);
  const fourthO    = useTransform(smooth, [0.52, 0.72], [0, 1]);
  const fourthBlur = useTransform(smooth, [0.52, 0.72], [10, 0]);

  // ── CTA
  const ctaO = useTransform(smooth, [0.76, 0.92], [0, 1]);
  const ctaY = useTransform(smooth, [0.76, 0.92], [24, 0]);

  // ── Background parallax
  const orb1Y = useTransform(smooth, [0, 1], ["-15%", "15%"]);
  const orb2Y = useTransform(smooth, [0, 1], ["10%", "-15%"]);

  // ── Left progress line
  const lineHeight = useTransform(smooth, [0, 0.9], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      style={{ minHeight: "220vh" }}
      className="relative"
    >
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[#010912] flex flex-col justify-center">

        {/* Background */}
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

        {/* Left progress line */}
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/[0.04] hidden lg:block pointer-events-none overflow-hidden">
          <motion.div
            className="w-full bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"
            style={{ height: lineHeight }}
          />
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col gap-5 py-6">

          {/* ── Header ── */}
          <motion.div style={{ opacity: headerO, y: headerY }} className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-3">
              <motion.div className="h-px bg-gradient-to-r from-transparent to-cyan-500/60" style={{ width: lineW }} />
              <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">Provenance &amp; Success</span>
              <motion.div className="h-px bg-gradient-to-l from-transparent to-cyan-500/60" style={{ width: lineW }} />
            </div>

            {/* Title — word reveal */}
            <div className="overflow-hidden flex gap-4">
              {["Our", "Impact"].map((word, wi) => (
                <motion.span
                  key={word}
                  className={`block text-5xl md:text-7xl font-black tracking-tighter uppercase ${wi === 0 ? "text-white" : ""}`}
                  style={wi === 1 ? {
                    backgroundImage: "linear-gradient(135deg, #00E5FF 0%, #ffffff 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  } : {}}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={headerO.get() > 0 ? { y: "0%", opacity: 1 } : {}}
                  transition={{ duration: 0.75, delay: wi * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                </motion.span>
              ))}
            </div>

            <p dir="rtl" className="text-white/35 text-sm font-light text-center max-w-md">
              مشاريعنا كتثبت قوتنا. ماشي غير هدرة — هادي نتيحة.
            </p>
          </motion.div>

          {/* ── Top 3 cards ── */}
          <div className="relative" style={{ perspective: "1400px" }}>
            {/* Spotlight burst */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
              style={{
                opacity: burstO, scale: burstScale,
                background: "radial-gradient(circle, rgba(0,229,255,0.16) 0%, rgba(0,229,255,0.04) 50%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Left */}
              <motion.div style={{ x: leftX, opacity: leftO, rotateY: leftRotY, scale: leftScale, transformStyle: "preserve-3d" }}>
                <ProjectCard project={projects[0]} />
              </motion.div>

              {/* Center */}
              <motion.div style={{ y: midY, opacity: midO, scale: midScale, rotateX: midRotX, transformStyle: "preserve-3d" }}>
                <ProjectCard project={projects[1]} highlight />
              </motion.div>

              {/* Right */}
              <motion.div style={{ x: rightX, opacity: rightO, rotateY: rightRotY, scale: rightScale, transformStyle: "preserve-3d" }}>
                <ProjectCard project={projects[2]} />
              </motion.div>
            </div>
          </div>

          {/* ── Bottom row: 4th card + CTA ── */}
          <div className="flex flex-col md:flex-row items-stretch gap-4">

            {/* Classified card */}
            <motion.div
              className="md:w-1/3"
              style={{
                y: fourthY,
                opacity: fourthO,
                filter: useTransform(fourthBlur, (v) => `blur(${v}px)`),
                transformStyle: "preserve-3d",
              }}
            >
              <ProjectCard project={projects[3]} compact />
            </motion.div>

            {/* CTA block */}
            <motion.div
              style={{ opacity: ctaO, y: ctaY }}
              className="md:w-2/3 flex flex-col items-center justify-center gap-3 rounded-3xl border border-white/[0.04] bg-white/[0.015] backdrop-blur-md py-6 px-8"
            >
              <p className="text-white/25 text-[9px] uppercase tracking-[0.3em] font-mono">Ready for similar results?</p>
              <SpectacularButton />
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
