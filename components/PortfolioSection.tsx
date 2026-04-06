"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  motion, useScroll, useTransform, useSpring,
  useMotionValue, AnimatePresence, useInView, LayoutGroup,
} from "framer-motion";
import {
  Stethoscope, Layers, Globe, ArrowRight, Building2,
  ShoppingBag, Home, ChevronLeft, ChevronRight, UtensilsCrossed,
} from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

/* ─── Types ──────────────────────────────────────────────── */

interface Stat  { value: string; label: string }
interface CaseStudy {
  id: string; category: string; location: string;
  tagline: string; description: string; tags: string[];
  stats: Stat[]; icon: React.ElementType;
  imagePath?: string; isComingSoon?: boolean;
}

/* ─── Projects ───────────────────────────────────────────── */

const projects: CaseStudy[] = [
  {
    id: "01", category: "Web Design + Booking System", location: "Azrou, Morocco",
    tagline: "كليينتا كيحجز بلا ما يتصل",
    description: "A premium dental clinic website with a fully automated online booking system. Patients can schedule appointments 24/7 — no phone calls, no friction.",
    tags: ["Next.js", "Booking System", "UI/UX", "Healthcare"],
    stats: [{ value: "↑ 3x", label: "Online Bookings" }, { value: "100%", label: "Mobile Optimized" }],
    icon: Stethoscope,
    imagePath: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=85",
  },
  {
    id: "02", category: "E-Commerce + WhatsApp AI", location: "Casablanca, Morocco",
    tagline: "متجر بيبيع حتى منين تنعس",
    description: "A premium coffee brand e-commerce store with an AI WhatsApp bot that handles orders, tracks delivery, and upsells automatically — 24/7.",
    tags: ["E-Commerce", "WhatsApp AI", "Next.js", "Automation"],
    stats: [{ value: "↑ 2.8x", label: "Revenue Increase" }, { value: "24/7", label: "AI Sales Active" }],
    icon: Building2,
    imagePath: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=85",
  },
  {
    id: "03", category: "Agency Branding + Web", location: "Morocco",
    tagline: "الموقع اللي كتشوف فيه دابا",
    description: "The official Vortex Digital portfolio — built with Next.js, Framer Motion, and Lenis. Featuring 3D scroll animations, AI chat interface, and a futuristic design system.",
    tags: ["Next.js", "Framer Motion", "Lenis", "AI Chat"],
    stats: [{ value: "∞", label: "Scroll Depth" }, { value: "AAA", label: "Design Grade" }],
    icon: Layers,
    imagePath: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=85",
  },
  {
    id: "04", category: "Restaurant + Reservation App", location: "Marrakech, Morocco",
    tagline: "طاولتك محجوزة قبل ما توصل",
    description: "A high-end restaurant digital experience with live table reservations, WhatsApp confirmations, and an AI that handles waitlists — all automated.",
    tags: ["Next.js", "Reservation System", "WhatsApp", "AI"],
    stats: [{ value: "↑ 4x", label: "Reservations" }, { value: "0", label: "No-Shows" }],
    icon: UtensilsCrossed,
    imagePath: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=85",
  },
  {
    id: "05", category: "Real Estate + AI Lead Gen", location: "Rabat, Morocco",
    tagline: "كل زبون يجي مقتنع قبل ما يتصل",
    description: "A real estate platform with AI-powered property matching, automatic WhatsApp follow-ups, and a 3D virtual tour integration that pre-qualifies every lead.",
    tags: ["Real Estate", "AI Matching", "3D Tours", "Lead Gen"],
    stats: [{ value: "↑ 5x", label: "Qualified Leads" }, { value: "60%", label: "Less Cold Calls" }],
    icon: Home,
    imagePath: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=85",
  },
  {
    id: "06", category: "Fashion E-Commerce + Brand", location: "Tanger, Morocco",
    tagline: "موضة مغربية بمستوى عالمي",
    description: "A luxury fashion brand e-commerce store with AI-powered size recommendations, bilingual Arabic/French UI, and an automated returns & loyalty system.",
    tags: ["Fashion", "E-Commerce", "AI Sizing", "Bilingual"],
    stats: [{ value: "↑ 3.5x", label: "Conversion Rate" }, { value: "92%", label: "Satisfaction" }],
    icon: ShoppingBag,
    imagePath: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=85",
  },
];

const TOTAL = projects.length;

/* ─── Animated Stat ──────────────────────────────────────── */

const AnimatedStat = ({ value, label }: { value: string; label: string }) => {
  const match = value.match(/\d+/);
  const numericEnd = match ? parseInt(match[0]) : null;
  const { ref, count } = useCountUp({ end: numericEnd ?? 0, duration: 1500, start: 0 });
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

/* ─── Project Card ───────────────────────────────────────── */

const ProjectCard = ({ project }: { project: CaseStudy }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 180, damping: 22 });
  const rotateY = useSpring(rawY, { stiffness: 180, damping: 22 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    rawX.set(((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -6);
    rawY.set(((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 6);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); rawX.set(0); rawY.set(0); }}
      whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="relative group flex flex-col"
    >
      {/* Spinning conic border */}
      <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          style={{ background: "conic-gradient(from 0deg,transparent 0deg,transparent 130deg,rgba(0,229,255,0.7) 180deg,transparent 230deg,transparent 360deg)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: hovered ? 2 : 5, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-[1px] rounded-[27px] bg-[#010912]" />
      </div>

      {/* Outer glow */}
      <motion.div
        className="absolute -inset-px rounded-[28px] pointer-events-none"
        animate={{ boxShadow: hovered ? "0 8px 80px rgba(0,229,255,0.18), 0 0 0 1px rgba(0,229,255,0.25)" : "0 0 0px rgba(0,229,255,0)" }}
        transition={{ duration: 0.5 }}
      />

      {/* Card body */}
      <div className="relative z-10 rounded-[27px] overflow-hidden flex flex-col bg-[#010912]">
        <motion.div className="absolute top-0 left-0 right-0 h-[1px] z-20 pointer-events-none"
          animate={{ background: hovered ? "linear-gradient(90deg,transparent,rgba(0,229,255,1),transparent)" : "linear-gradient(90deg,transparent,rgba(0,229,255,0.25),transparent)" }}
          transition={{ duration: 0.4 }}
        />

        {/* Shimmer sweep */}
        <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
          <motion.div className="absolute top-0 bottom-0 w-[100px] -skew-x-[18deg]"
            style={{ background: "linear-gradient(90deg,transparent,rgba(0,229,255,0.06),transparent)" }}
            initial={{ left: "-30%" }}
            animate={hovered ? { left: "130%" } : { left: "-30%" }}
            transition={{ duration: 0.95, ease: "easeInOut" }}
          />
        </div>

        {/* Left accent strip */}
        <motion.div className="absolute left-0 top-[30%] bottom-[30%] w-[2px] z-20 pointer-events-none rounded-full"
          animate={{ background: hovered ? "linear-gradient(to bottom,transparent,rgba(0,229,255,0.9),transparent)" : "linear-gradient(to bottom,transparent,rgba(0,229,255,0.15),transparent)" }}
          transition={{ duration: 0.5 }}
        />

        {/* Image */}
        <div className="relative overflow-hidden h-[230px] flex-shrink-0">
          {project.imagePath ? (
            <motion.img src={project.imagePath} alt={project.tagline}
              className="absolute inset-0 w-full h-full object-cover object-center"
              animate={{ scale: hovered ? 1.08 : 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#00111A] to-[#010912] flex items-center justify-center">
              <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `radial-gradient(circle at 1px 1px,rgba(0,229,255,1) 1px,transparent 0)`, backgroundSize: "24px 24px" }} />
              <motion.div animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 8 : 0 }} transition={{ duration: 0.6 }}>
                <project.icon className="w-16 h-16 text-cyan-400/20" strokeWidth={0.75} />
              </motion.div>
            </div>
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(0,8,16,0.15) 0%,transparent 25%,transparent 40%,rgba(1,9,18,0.85) 75%,#010912 100%)" }} />
          <div className="absolute inset-0 opacity-[0.08]" style={{ background: "linear-gradient(135deg,rgba(0,229,255,0.3) 0%,transparent 60%)" }} />

          {/* ID watermark */}
          <div className="absolute top-3 right-5 font-black font-mono text-white/[0.06] select-none pointer-events-none leading-none" style={{ fontSize: "100px", lineHeight: 1 }}>
            {project.id}
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border border-[#00E5FF]/25 bg-[#010912]/70">
              <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              <span className="text-[8px] font-mono uppercase tracking-[0.18em] text-cyan-300/90">{project.category}</span>
            </div>
          </div>

          {/* Location badge */}
          <div className="absolute top-4 right-4 z-10">
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/[0.07]">
              <Globe className="w-2.5 h-2.5 text-white/30" />
              <span className="text-[8px] font-mono text-white/35 uppercase tracking-tighter">{project.location}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow px-7 pt-6 pb-7 gap-4">
          <motion.h3
            dir="rtl"
            className="text-[1.55rem] md:text-[1.7rem] font-black leading-snug text-right"
            animate={{ color: hovered ? "#00E5FF" : "#FFFFFF", textShadow: hovered ? "0 0 30px rgba(0,229,255,0.4)" : "none" }}
            transition={{ duration: 0.4 }}
          >
            {project.tagline}
          </motion.h3>

          <p className="text-white/50 text-[13px] leading-[1.75] font-light">{project.description}</p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.map(tag => (
              <motion.span key={tag} className="text-[8px] font-mono px-3 py-1 rounded-full border uppercase tracking-widest"
                animate={{ borderColor: hovered ? "rgba(0,229,255,0.4)" : "rgba(0,229,255,0.18)", color: hovered ? "rgba(0,229,255,0.85)" : "rgba(255,255,255,0.4)", backgroundColor: hovered ? "rgba(0,229,255,0.06)" : "rgba(0,229,255,0.02)" }}
                transition={{ duration: 0.4 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="mt-auto pt-5 flex items-end justify-between" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div className="flex items-center gap-6">
              {project.stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <AnimatedStat value={stat.value} label={stat.label} />
                  {i < project.stats.length - 1 && (
                    <div className="h-8 w-px" style={{ background: "linear-gradient(to bottom,transparent,rgba(0,229,255,0.2),transparent)" }} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {!project.isComingSoon && (
              <motion.button className="flex items-center gap-2.5 group/btn" whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/35 group-hover/btn:text-cyan-400 transition-colors duration-300">Case Study</span>
                <motion.div className="w-8 h-8 rounded-full flex items-center justify-center border"
                  animate={{ borderColor: hovered ? "rgba(0,229,255,0.6)" : "rgba(255,255,255,0.12)", backgroundColor: hovered ? "rgba(0,229,255,0.1)" : "transparent" }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-3 h-3 text-white/40 group-hover/btn:text-cyan-400 transition-colors duration-300" />
                </motion.div>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Spectacular CTA Button ──────────────────────────────── */

const SpectacularButton = () => {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="relative" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="absolute -inset-[1px] rounded-full overflow-hidden">
        <motion.div className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2"
          style={{ background: "conic-gradient(from 0deg,transparent 0deg,rgba(0,229,255,0.0) 60deg,rgba(0,229,255,0.9) 180deg,rgba(0,229,255,0.0) 300deg,transparent 360deg)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: hovered ? 1.5 : 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      <motion.div className="absolute -inset-4 rounded-full pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0.4, background: hovered ? "radial-gradient(ellipse,rgba(0,229,255,0.18) 0%,transparent 70%)" : "radial-gradient(ellipse,rgba(0,229,255,0.06) 0%,transparent 70%)" }}
        transition={{ duration: 0.4 }}
      />
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

/* ─── Nav Arrow Button ────────────────────────────────────── */

const NavArrow = ({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) => {
  const [hov, setHov] = useState(false);
  const Icon = direction === "left" ? ChevronLeft : ChevronRight;
  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-14 h-14 rounded-full flex items-center justify-center shrink-0"
      style={{
        background: hov ? "rgba(0,229,255,0.18)" : "rgba(0,5,10,0.75)",
        border: hov ? "1.5px solid rgba(0,229,255,0.8)" : "1.5px solid rgba(0,229,255,0.35)",
        boxShadow: hov
          ? "0 0 28px rgba(0,229,255,0.5), inset 0 0 12px rgba(0,229,255,0.08)"
          : "0 0 10px rgba(0,229,255,0.15)",
        backdropFilter: "blur(12px)",
        transition: "background 0.25s, border 0.25s, box-shadow 0.25s",
      }}
      aria-label={direction === "left" ? "Previous project" : "Next project"}
    >
      <Icon size={22} style={{ color: hov ? "#00E5FF" : "rgba(0,229,255,0.75)" }} strokeWidth={2.5} />
    </motion.button>
  );
};

/* ─── Dot Indicator ──────────────────────────────────────── */

const DotIndicator = ({ total, active }: { total: number; active: number }) => (
  <div className="flex items-center gap-1.5">
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        animate={{
          width: i === active ? 20 : 6,
          opacity: i === active ? 1 : 0.3,
          backgroundColor: i === active ? "#00E5FF" : "rgba(0,229,255,0.5)",
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="h-1.5 rounded-full"
      />
    ))}
  </div>
);

/* ─── Main Section ───────────────────────────────────────── */

const SLIDE_DURATION = 5500; // ms per auto-advance

/* ─── Mobile Swipe Carousel ──────────────────────────────── */

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
};

const MobileSwipeCarousel = () => {
  const [idx, setIdx]       = useState(0);
  const [dir, setDir]       = useState(1);
  const touchStartX         = useRef(0);
  const project             = projects[idx];

  const goNext = () => { setDir(1);  setIdx(i => (i + 1) % TOTAL); };
  const goPrev = () => { setDir(-1); setIdx(i => (i - 1 + TOTAL) % TOTAL); };

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 45)       goNext();
    else if (diff < -45) goPrev();
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Sliding card area */}
      <div
        className="relative overflow-hidden rounded-2xl"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence custom={dir} mode="wait" initial={false}>
          <motion.div
            key={idx}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl overflow-hidden border border-white/[0.07] bg-[#010912]"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              {project.imagePath ? (
                <img
                  src={project.imagePath}
                  alt={project.tagline}
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#00111A] to-[#010912] flex items-center justify-center">
                  <project.icon className="w-14 h-14 text-cyan-400/20" strokeWidth={0.75} />
                </div>
              )}
              <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 40%, rgba(1,9,18,0.92) 100%)" }} />

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full backdrop-blur-md border border-[#00E5FF]/25 bg-[#010912]/70">
                  <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                  <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-cyan-300/90">{project.category}</span>
                </div>
              </div>

              {/* Location badge */}
              <div className="absolute top-3 right-3">
                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/[0.07]">
                  <Globe className="w-2.5 h-2.5 text-white/30" />
                  <span className="text-[8px] font-mono text-white/35 uppercase tracking-tighter">{project.location}</span>
                </div>
              </div>

              {/* Counter badge */}
              <div className="absolute bottom-3 right-3">
                <span className="text-[10px] font-mono text-white/25">{String(idx + 1).padStart(2,"0")} / {String(TOTAL).padStart(2,"0")}</span>
              </div>
            </div>

            {/* Content */}
            <div className="px-5 pt-5 pb-6 flex flex-col gap-3">
              <h3 className="text-xl font-black text-white leading-snug" dir="rtl">{project.tagline}</h3>
              <p className="text-white/45 text-[13px] leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-1.5">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[8px] font-mono px-2.5 py-1 rounded-full border border-[#00E5FF]/20 text-[#00E5FF]/60 uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-5 pt-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                {project.stats.map((stat, i) => (
                  <React.Fragment key={stat.label}>
                    <div className="flex flex-col">
                      <span className="text-xl font-bold text-[#00E5FF] font-mono">{stat.value}</span>
                      <span className="text-[9px] text-white/35 uppercase tracking-widest font-mono">{stat.label}</span>
                    </div>
                    {i < project.stats.length - 1 && (
                      <div className="h-8 w-px bg-[#00E5FF]/15" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot indicators + swipe hint */}
      <div className="flex flex-col items-center gap-2">
        <DotIndicator total={TOTAL} active={idx} />
        <p className="text-white/20 text-[9px] font-mono tracking-widest uppercase">← اسحب للتنقل →</p>
      </div>
    </div>
  );
};

/* ─── Main Section ───────────────────────────────────────── */

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const [centerIdx, setCenterIdx]   = useState(1);
  const [direction, setDirection]   = useState(1); // 1=forward, -1=backward
  const [carouselActive, setCarouselActive] = useState(false);

  /* ── Scroll spring ── */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const s = useSpring(scrollYProgress, { stiffness: 50, damping: 16, restDelta: 0.001 });

  /* Activate carousel 2s after cards enter viewport */
  const cardsInView = useInView(cardsRef, { once: true, margin: "-80px" });
  useEffect(() => {
    if (!cardsInView) return;
    const timer = setTimeout(() => setCarouselActive(true), 2000);
    return () => clearTimeout(timer);
  }, [cardsInView]);

  /* Auto-advance */
  useEffect(() => {
    if (!carouselActive) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCenterIdx(prev => (prev + 1) % TOTAL);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [carouselActive]);

  /* Manual nav */
  const goPrev = () => {
    setDirection(-1);
    setCenterIdx(prev => (prev - 1 + TOTAL) % TOTAL);
  };
  const goNext = () => {
    setDirection(1);
    setCenterIdx(prev => (prev + 1) % TOTAL);
  };

  const leftIdx   = (centerIdx - 1 + TOTAL) % TOTAL;
  const rightIdx  = (centerIdx + 1) % TOTAL;

  /* ── Scroll-driven initial reveal ── */
  const hdrO   = useTransform(s, [0.05, 0.18], [0, 1]);
  const hdrY   = useTransform(s, [0.05, 0.18], [50, 0]);
  const lineW  = useTransform(s, [0.05, 0.2], [0, 40]);
  const word0Y = useTransform(s, [0.05, 0.20], ["110%", "0%"]);
  const word1Y = useTransform(s, [0.08, 0.23], ["110%", "0%"]);

  const midO    = useTransform(s, [0.12, 0.28], [0, 1]);
  const midY    = useTransform(s, [0.12, 0.30], [180, 0]);
  const midSc   = useTransform(s, [0.12, 0.30], [0.72, 1]);
  const midRotX = useTransform(s, [0.12, 0.30], [30, 0]);

  const burstO = useTransform(s, [0.12, 0.2, 0.35], [0, 1, 0]);
  const burstS = useTransform(s, [0.12, 0.30], [0.3, 2.5]);

  const leftO   = useTransform(s, [0.26, 0.44], [0, 1]);
  const leftX   = useTransform(s, [0.26, 0.44], [-260, 0]);
  const leftRY  = useTransform(s, [0.26, 0.44], [-28, 0]);
  const leftSc  = useTransform(s, [0.26, 0.44], [0.82, 1]);

  const rightO  = useTransform(s, [0.26, 0.44], [0, 1]);
  const rightX  = useTransform(s, [0.26, 0.44], [260, 0]);
  const rightRY = useTransform(s, [0.26, 0.44], [28, 0]);
  const rightSc = useTransform(s, [0.26, 0.44], [0.82, 1]);

  const ctaO = useTransform(s, [0.46, 0.60], [0, 1]);
  const ctaY = useTransform(s, [0.46, 0.60], [30, 0]);

  const orb1Y = useTransform(s, [0, 1], ["-20%", "20%"]);
  const orb2Y = useTransform(s, [0, 1], ["15%", "-15%"]);


  return (
    <>
    {/* ── Mobile Portfolio ── */}
    <div className="md:hidden bg-[#010912] py-20 px-5 relative overflow-hidden">
      {/* Atmosphere */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(123,97,255,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative z-10 flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-[#00E5FF] font-mono text-[10px] tracking-[0.4em] uppercase">[ OUR IMPACT ]</p>
          <h2 className="text-4xl font-black text-white tracking-tight">
            Our <span className="bg-gradient-to-r from-[#00E5FF] to-white bg-clip-text text-transparent">Impact</span>
          </h2>
          <p dir="rtl" className="text-white/40 text-sm font-light max-w-xs">
            مشاريعنا كتثبت قوتنا. ماشي غير هدرة — هادي نتيحة.
          </p>
        </div>

        {/* Swipe Carousel */}
        <MobileSwipeCarousel />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex justify-center pt-4"
        >
          <a
            href="/start-project"
            className="flex items-center gap-2 px-7 py-3 rounded-full font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-95"
            style={{
              border: "1px solid rgba(0,229,255,0.4)",
              color: "#00E5FF",
              background: "rgba(0,229,255,0.06)",
            }}
          >
            ابدأ مشروعك الآن
            <ArrowRight size={13} />
          </a>
        </motion.div>
      </div>
    </div>

    {/* ── Desktop Portfolio ── */}
    <section ref={sectionRef} id="portfolio" className="relative bg-[#010912] overflow-hidden hidden md:block" style={{ minHeight: "185vh" }}>

      {/* Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div style={{ y: orb1Y }} className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px]">
          <div className="w-full h-full rounded-full bg-cyan-500/[0.07] blur-[130px]" />
        </motion.div>
        <motion.div style={{ y: orb2Y }} className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px]">
          <div className="w-full h-full rounded-full bg-indigo-600/[0.05] blur-[150px]" />
        </motion.div>
        <div className="absolute inset-0 opacity-[0.022]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px,rgba(0,229,255,1) 1px,transparent 0)`, backgroundSize: "40px 40px" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48 flex flex-col gap-12 md:gap-16 relative z-10">

        {/* Header */}
        <motion.div style={{ opacity: hdrO, y: hdrY }} className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <motion.div className="h-px bg-gradient-to-r from-transparent to-cyan-500/60" style={{ width: lineW }} />
            <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">Provenance &amp; Success</span>
            <motion.div className="h-px bg-gradient-to-l from-transparent to-cyan-500/60" style={{ width: lineW }} />
          </div>

          <div className="overflow-hidden flex gap-5">
            <motion.span className="block text-5xl md:text-8xl font-black tracking-tighter uppercase text-white" style={{ y: word0Y }}>
              Our
            </motion.span>
            <motion.span
              className="block text-5xl md:text-8xl font-black tracking-tighter uppercase"
              style={{ y: word1Y, backgroundImage: "linear-gradient(135deg,#00E5FF 0%,#ffffff 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              Impact
            </motion.span>
          </div>

          <p dir="rtl" className="text-white/40 text-lg md:text-xl font-light tracking-wide text-center max-w-xl">
            مشاريعنا كتثبت قوتنا. ماشي غير هدرة — هادي نتيحة.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div ref={cardsRef} className="relative" style={{ perspective: "1400px" }}>

          {/* Spotlight burst */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ opacity: burstO, scale: burstS, background: "radial-gradient(circle,rgba(0,229,255,0.18) 0%,rgba(0,229,255,0.05) 50%,transparent 70%)", filter: "blur(24px)" }}
          />

          {/* ── Phase 1: scroll-driven initial reveal (3 fixed projects) ── */}
          {!carouselActive && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <motion.div style={{ x: leftX, opacity: leftO, rotateY: leftRY, scale: leftSc, transformStyle: "preserve-3d" }}>
                <ProjectCard project={projects[0]} />
              </motion.div>
              <motion.div style={{ y: midY, opacity: midO, scale: midSc, rotateX: midRotX, transformStyle: "preserve-3d" }}>
                <ProjectCard project={projects[1]} />
              </motion.div>
              <motion.div style={{ x: rightX, opacity: rightO, rotateY: rightRY, scale: rightSc, transformStyle: "preserve-3d" }}>
                <ProjectCard project={projects[2]} />
              </motion.div>
            </div>
          )}

          {/* ── Phase 2: carousel (layoutId — cards slide between slots, no fade) ── */}
          {carouselActive && (
            <LayoutGroup id="portfolio-carousel">
              <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                <AnimatePresence mode="popLayout" initial={false}>
                  {[leftIdx, centerIdx, rightIdx].map((projIdx, slot) => (
                    <motion.div
                      key={projects[projIdx].id}
                      layoutId={`pf-card-${projects[projIdx].id}`}
                      layout="position"
                      initial={{ opacity: 0, scale: 0.94 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.25 }, scale: { duration: 0.25 } }}
                      className="relative"
                    >
                      <ProjectCard project={projects[projIdx]} />
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Left arrow — centered on boundary between col1 and col2 */}
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-1/3 -translate-x-1/2 z-40 pointer-events-auto">
                  <NavArrow direction="left" onClick={goPrev} />
                </div>
                {/* Right arrow — centered on boundary between col2 and col3 */}
                <div className="hidden md:block absolute top-1/2 -translate-y-1/2 left-2/3 -translate-x-1/2 z-40 pointer-events-auto">
                  <NavArrow direction="right" onClick={goNext} />
                </div>

                {/* Dot indicator — below grid, centered */}
                <div className="md:col-span-3 flex justify-center pt-2">
                  <DotIndicator total={TOTAL} active={centerIdx} />
                </div>
              </div>
            </LayoutGroup>
          )}
        </div>

        {/* CTA */}
        <motion.div style={{ opacity: ctaO, y: ctaY }} className="flex flex-col items-center gap-5 py-8">
          <p className="text-white/25 text-[10px] uppercase tracking-[0.3em] font-mono">Ready for similar results?</p>
          <SpectacularButton />
        </motion.div>

      </div>
    </section>
    </>
  );
}
