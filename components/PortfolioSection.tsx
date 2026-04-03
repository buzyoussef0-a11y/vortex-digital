"use client";

import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useInView,
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
  id: string;
  category: string;
  location: string;
  tagline: string;
  description: string;
  tags: string[];
  stats: Stat[];
  colorAccent: string;
  icon: React.ElementType;
  isComingSoon?: boolean;
  imagePath?: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects: CaseStudy[] = [
  {
    id: "01",
    category: "Web Design + Booking System",
    location: "Azrou, Morocco",
    tagline: "كليينتا كيحجز بلا ما يتصل",
    description:
      "A premium dental clinic website with a fully automated online booking system. Patients can schedule appointments 24/7 — no phone calls, no friction.",
    tags: ["Next.js", "Booking System", "UI/UX", "Healthcare"],
    stats: [
      { value: "↑ 3x", label: "Online Bookings" },
      { value: "100%", label: "Mobile Optimized" },
    ],
    colorAccent: "#00E5FF",
    icon: Stethoscope,
    imagePath: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=85",
  },
  {
    id: "04",
    category: "E-Commerce + WhatsApp AI",
    location: "Casablanca, Morocco",
    tagline: "متجر بيبيع حتى منين تنعس",
    description:
      "A premium coffee brand e-commerce store with an AI WhatsApp bot that handles orders, tracks delivery, and upsells automatically — 24/7.",
    tags: ["E-Commerce", "WhatsApp AI", "Next.js", "Automation"],
    stats: [
      { value: "↑ 2.8x", label: "Revenue Increase" },
      { value: "24/7", label: "AI Sales Active" },
    ],
    colorAccent: "#00E5FF",
    icon: Building2,
    imagePath: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85",
  },
  {
    id: "02",
    category: "Agency Branding + Web",
    location: "Morocco",
    tagline: "الموقع اللي كتشوف فيه دابا",
    description:
      "The official Vortex Digital portfolio — built with Next.js 14, Framer Motion, and Lenis. Featuring 3D scroll animations, AI chat interface, and a futuristic design system.",
    tags: ["Next.js 14", "Framer Motion", "Lenis", "AI Chat"],
    stats: [
      { value: "∞", label: "Scroll Depth" },
      { value: "AAA", label: "Design Grade" },
    ],
    colorAccent: "#67F3FF",
    icon: Layers,
    imagePath: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=85",
  },
  {
    id: "03",
    category: "AI Automation",
    location: "Morocco",
    tagline: "مشروع قادم — قيد التطوير",
    description:
      "An intelligent WhatsApp automation system for a local business — handling leads, follow-ups, and bookings entirely via AI in Arabic & French.",
    tags: ["AI", "WhatsApp", "Automation", "Arabic NLP"],
    stats: [
      { value: "24/7", label: "AI Active" },
      { value: "0", label: "Human Hours" },
    ],
    colorAccent: "#00A8BD",
    isComingSoon: true,
    icon: Globe,
  },
];

// ─── Animated Stat ─────────────────────────────────────────────────────────────

const AnimatedStat = ({ value, label }: { value: string; label: string }) => {
  const match = value.match(/\d+/);
  const numericEnd = match ? parseInt(match[0]) : null;
  const { ref, count } = useCountUp({ end: numericEnd ?? 0, duration: 1500, start: 0 });
  const displayValue = numericEnd !== null ? value.replace(match![0], count.toString()) : value;

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col gap-0.5">
      <span className="text-xl font-black bg-gradient-to-r from-[#00E5FF] to-white bg-clip-text text-transparent font-mono tracking-tight">
        {displayValue}
      </span>
      <span className="text-[9px] text-white/35 uppercase tracking-[0.15em] font-mono">
        {label}
      </span>
    </div>
  );
};

// ─── Rotating Border ───────────────────────────────────────────────────────────

const RotatingBorder = ({ active }: { active: boolean }) => (
  <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none">
    <motion.div
      className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
      style={{
        background:
          "conic-gradient(from 0deg, transparent 0deg, transparent 120deg, rgba(0,229,255,0.6) 180deg, transparent 240deg, transparent 360deg)",
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: active ? 3 : 6, repeat: Infinity, ease: "linear" }}
    />
    <div className="absolute inset-[1px] rounded-[27px] bg-[#010912]" />
  </div>
);

// ─── Project Card ──────────────────────────────────────────────────────────────

const ProjectCard = ({
  project,
  index,
  scrollY,
}: {
  project: CaseStudy;
  index: number;
  scrollY: ReturnType<typeof useTransform<number, number>>;
}) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 200, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 200, damping: 22 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set(((e.clientY - cy) / (rect.height / 2)) * -7);
    rawY.set(((e.clientX - cx) / (rect.width / 2)) * 7);
  }, [rawX, rawY]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: 12,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.9,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ y: scrollY, rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", perspective: 1000 }}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative flex flex-col group"
    >
      {/* Rotating gradient border */}
      <RotatingBorder active={hovered} />

      {/* Outer glow on hover */}
      <motion.div
        className="absolute -inset-[1px] rounded-[28px] pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "0 0 60px rgba(0,229,255,0.18), 0 0 120px rgba(0,229,255,0.08), inset 0 0 60px rgba(0,229,255,0.04)"
            : "0 0 0px rgba(0,229,255,0)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Card body */}
      <div className="relative z-10 rounded-[27px] overflow-hidden flex flex-col h-full bg-[#010912] border border-[#00E5FF]/[0.12]">

        {/* Top edge glow line */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none z-20"
          animate={{
            background: hovered
              ? "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.8) 50%, transparent 100%)"
              : "linear-gradient(90deg, transparent 0%, rgba(0,229,255,0.2) 50%, transparent 100%)",
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

        {/* ── Image area ── */}
        <div className="relative overflow-hidden h-[210px] flex-shrink-0">
          {project.imagePath ? (
            <>
              <motion.img
                src={project.imagePath}
                alt={project.tagline}
                className="absolute inset-0 w-full h-full object-cover object-center"
                animate={{ scale: hovered ? 1.07 : 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
              {/* Color overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#010912] via-[#010912]/40 to-transparent" />
              <div className="absolute inset-0 bg-[#00E5FF]/[0.04] mix-blend-screen" />
            </>
          ) : (
            <div className="w-full h-full bg-[#00050A] flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,229,255,1) 1px, transparent 0)`,
                  backgroundSize: "32px 32px",
                }}
              />
              <motion.div animate={{ scale: hovered ? 1.12 : 1, rotate: hovered ? 5 : 0 }} transition={{ duration: 0.6 }}>
                <project.icon className="w-16 h-16 text-cyan-500/20" strokeWidth={0.75} />
              </motion.div>
            </div>
          )}

          {/* Category + location bar */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-cyan-400/90 bg-[#010912]/70 backdrop-blur-sm px-2 py-1 rounded">
              {project.category}
            </span>
            <span className="text-[9px] font-mono text-white/35 flex items-center gap-1">
              <Globe className="w-2.5 h-2.5" /> {project.location}
            </span>
          </div>

          {/* Big ID watermark */}
          <div className="absolute top-3 right-4 text-[80px] font-black font-mono text-white/[0.04] select-none leading-none pointer-events-none">
            {project.id}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-col flex-grow p-6 gap-4">

          {/* Tagline */}
          <motion.h3
            dir="rtl"
            className="text-2xl md:text-[1.6rem] font-black text-white leading-snug text-right"
            animate={{ color: hovered ? "#00E5FF" : "#ffffff" }}
            transition={{ duration: 0.4 }}
          >
            {project.tagline}
          </motion.h3>

          {/* Description */}
          <p className="text-white/50 text-[13px] leading-relaxed">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.15 + i * 0.05 + 0.4, duration: 0.3 }}
                className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#00E5FF]/[0.06] border border-[#00E5FF]/20 text-white/45 uppercase tracking-wider"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Stats + CTA */}
          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-5">
              {project.stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <AnimatedStat value={stat.value} label={stat.label} />
                  {i < project.stats.length - 1 && <div className="h-5 w-px bg-white/[0.07]" />}
                </React.Fragment>
              ))}
            </div>

            {!project.isComingSoon && (
              <motion.button
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#00E5FF]/25 text-[#00E5FF]/70 text-[9px] font-mono uppercase tracking-widest"
                animate={{
                  borderColor: hovered ? "rgba(0,229,255,0.6)" : "rgba(0,229,255,0.25)",
                  color: hovered ? "rgba(0,229,255,1)" : "rgba(0,229,255,0.7)",
                  backgroundColor: hovered ? "rgba(0,229,255,0.08)" : "rgba(0,229,255,0)",
                }}
                transition={{ duration: 0.3 }}
              >
                Case Study
                <motion.span animate={{ x: hovered ? 3 : 0 }} transition={{ duration: 0.3 }}>
                  <ArrowRight className="w-3 h-3" />
                </motion.span>
              </motion.button>
            )}
          </div>
        </div>

        {/* ── Classified Overlay ── */}
        {project.isComingSoon && (
          <div className="absolute inset-0 z-40 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#010912]/70 backdrop-blur-[8px]" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
              <motion.div
                className="w-full h-1/3 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
                animate={{ y: ["-100%", "300%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
              />
            </div>
            <div className="relative flex flex-col items-center gap-4 text-center px-6">
              <motion.div
                className="p-4 rounded-full bg-[#010912] border border-cyan-500/40"
                animate={{ boxShadow: ["0 0 20px rgba(0,229,255,0.1)", "0 0 40px rgba(0,229,255,0.3)", "0 0 20px rgba(0,229,255,0.1)"] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Lock className="w-7 h-7 text-cyan-400" />
              </motion.div>
              <div>
                <p className="text-base font-black font-mono text-cyan-400 tracking-[0.4em] uppercase mb-2">CLASSIFIED</p>
                <div className="h-px w-20 mx-auto bg-cyan-500/30 mb-3" />
                <p className="text-cyan-500/50 font-mono text-[9px] leading-relaxed uppercase tracking-widest">
                  Deep-tech automation in development.<br />Client anonymity guaranteed.
                </p>
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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-4"
    >
      <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] font-mono">
        Ready for similar results?
      </p>

      {/* Button wrapper with rotating border */}
      <div
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Spinning conic border */}
        <div className="absolute -inset-[1px] rounded-full overflow-hidden">
          <motion.div
            className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg, rgba(0,229,255,0.0) 60deg, rgba(0,229,255,0.9) 180deg, rgba(0,229,255,0.0) 300deg, transparent 360deg)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: hovered ? 1.5 : 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Outer glow */}
        <motion.div
          className="absolute -inset-3 rounded-full pointer-events-none"
          animate={{
            opacity: hovered ? 1 : 0.4,
            background: hovered
              ? "radial-gradient(ellipse, rgba(0,229,255,0.15) 0%, transparent 70%)"
              : "radial-gradient(ellipse, rgba(0,229,255,0.06) 0%, transparent 70%)",
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Button core */}
        <motion.button
          className="relative z-10 flex items-center gap-3 px-10 py-4 rounded-full font-black text-xs uppercase tracking-[0.25em] overflow-hidden"
          animate={{
            backgroundColor: hovered ? "rgba(0,229,255,1)" : "rgba(0,229,255,0)",
            color: hovered ? "#00050A" : "#00E5FF",
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          style={{ border: "1px solid rgba(0,229,255,0.3)" }}
        >
          {/* Liquid fill from bottom */}
          <motion.div
            className="absolute inset-0 bg-[#00E5FF]"
            initial={{ y: "100%" }}
            animate={{ y: hovered ? "0%" : "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />

          <span className="relative z-10">Start Your Project</span>

          <motion.span
            className="relative z-10"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

// ─── Section Header ────────────────────────────────────────────────────────────

const SectionHeader = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const words = ["Our", "Impact"];

  return (
    <div ref={ref} className="flex flex-col items-center mb-20 md:mb-28">
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3 mb-6"
      >
        <motion.div
          className="h-px bg-gradient-to-r from-transparent to-cyan-500/60"
          initial={{ width: 0 }}
          animate={isInView ? { width: 40 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">
          Provenance &amp; Success
        </span>
        <motion.div
          className="h-px bg-gradient-to-l from-transparent to-cyan-500/60"
          initial={{ width: 0 }}
          animate={isInView ? { width: 40 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </motion.div>

      {/* Title — word by word reveal */}
      <h2 className="text-5xl md:text-8xl font-black text-center tracking-tighter uppercase overflow-hidden flex gap-4">
        {words.map((word, wi) => (
          <motion.span
            key={word}
            initial={{ y: "100%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : {}}
            transition={{ duration: 0.75, delay: wi * 0.12 + 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="block"
            style={{
              color: wi === 1 ? "transparent" : "white",
              backgroundImage: wi === 1 ? "linear-gradient(135deg, #00E5FF 0%, #ffffff 100%)" : "none",
              WebkitBackgroundClip: wi === 1 ? "text" : "unset",
              backgroundClip: wi === 1 ? "text" : "unset",
            }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.35 }}
        dir="rtl"
        className="text-white/35 text-lg md:text-xl font-light tracking-wide text-center max-w-xl mt-6"
      >
        مشاريعنا كتثبت قوتنا. ماشي غير هدرة — هادي نتيحة.
      </motion.p>

      {/* Decorative line */}
      <motion.div
        className="mt-8 h-px w-24 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  );
};

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function PortfolioSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax speeds per column (subtle — just enough to feel alive)
  const y0 = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const y1 = useTransform(scrollYProgress, [0, 1], [120, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -50]);

  const cardScrollY = [y0, y1, y2, y3];

  // Background parallax
  const bgOrb1Y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
  const bgOrb2Y = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative py-24 md:py-40 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#010912]"
    >
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Parallax orb 1 */}
        <motion.div
          style={{ y: bgOrb1Y }}
          className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full"
          aria-hidden="true"
        >
          <div className="w-full h-full rounded-full bg-cyan-500/[0.07] blur-[120px]" />
        </motion.div>

        {/* Parallax orb 2 */}
        <motion.div
          style={{ y: bgOrb2Y }}
          className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full"
          aria-hidden="true"
        >
          <div className="w-full h-full rounded-full bg-blue-600/[0.05] blur-[140px]" />
        </motion.div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,229,255,1) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Scanline texture */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "linear-gradient(rgba(0,229,255,0.3) 1px, transparent 1px)",
            backgroundSize: "100% 3px",
          }}
        />
      </div>

      {/* ── Left edge progress line ── */}
      <div className="absolute left-0 top-0 bottom-0 w-[1px] overflow-hidden hidden lg:block pointer-events-none">
        <motion.div
          className="w-full bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent"
          style={{ height: "60%", y: useTransform(scrollYProgress, [0, 1], ["-30%", "70%"]) }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header */}
        <SectionHeader />

        {/* Cards grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7"
          style={{ perspective: "1200px" }}
        >
          {projects.slice(0, 3).map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              scrollY={cardScrollY[index]}
            />
          ))}
        </div>

        {/* 4th card — half width centered */}
        <div className="mt-6 lg:mt-7 flex justify-center" style={{ perspective: "1200px" }}>
          <div className="w-full md:w-[calc(33.333%-12px)]">
            <ProjectCard
              project={projects[3]}
              index={3}
              scrollY={cardScrollY[3]}
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 flex flex-col items-center">
          <SpectacularButton />
        </div>
      </div>
    </section>
  );
}
