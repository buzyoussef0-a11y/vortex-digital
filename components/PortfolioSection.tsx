"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Layers,
  Globe,
  ArrowRight,
  Lock,
  Building2,
} from "lucide-react";
import { useCountUp } from "@/hooks/useCountUp";

// --- Types ---

interface Stat {
  value: string;
  label: string;
}

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

// --- Data ---

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

// --- AnimatedStat ---

const AnimatedStat = ({ value, label }: { value: string; label: string }) => {
  const match = value.match(/\d+/);
  const numericEnd = match ? parseInt(match[0]) : null;

  const { ref, count } = useCountUp({
    end: numericEnd ?? 0,
    duration: 1500,
    start: 0,
  });

  const displayValue =
    numericEnd !== null ? value.replace(match![0], count.toString()) : value;

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col">
      <span className="text-2xl font-bold bg-gradient-to-r from-[#00E5FF] to-white bg-clip-text text-transparent font-space-grotesk">
        {displayValue}
      </span>
      <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
        {label}
      </span>
    </div>
  );
};

// --- ProjectCard ---

const ProjectCard = ({
  project,
  index,
}: {
  project: CaseStudy;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.21, 1.02, 0.47, 0.98] }}
      whileHover="hover"
      className="relative group overflow-hidden rounded-3xl border border-[#00E5FF]/25 bg-[#00E5FF]/[0.05] backdrop-blur-2xl transition-all duration-700 hover:border-cyan-500/50 hover:shadow-[0_0_40px_rgba(0,229,255,0.22)] flex flex-col"
    >
      {/* Top glowing line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent z-10 pointer-events-none" />

      {/* Animated shimmer on hover */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-[-1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent blur-sm transform -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-in-out" />
      </div>

      {/* Background Project Number */}
      <div className="absolute top-4 right-8 text-[120px] font-black font-mono text-white/[0.03] select-none pointer-events-none leading-none z-0">
        {project.id}
      </div>

      {/* Card Glows */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-cyan-500/10 blur-[80px] rounded-full group-hover:bg-cyan-500/18 transition-colors duration-700 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-500/6 blur-[100px] rounded-full group-hover:bg-cyan-500/12 transition-colors duration-700 pointer-events-none" />

      {/* Visual Workspace */}
      <div className="relative overflow-hidden h-[220px] w-full">
        {project.imagePath ? (
          <img
            src={project.imagePath}
            alt={project.tagline}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ transition: "transform 0.6s ease" }}
          />
        ) : (
          <div className="w-full h-full bg-[#00050A] flex items-center justify-center p-12">
            <div className="absolute inset-0 opacity-[0.03] pattern-grid-cyan" />
            <motion.div
              variants={{ hover: { scale: 1.1, rotate: 5 } }}
              className="relative z-10"
            >
              <project.icon className="w-20 h-20 text-cyan-500/20" strokeWidth={0.5} />
            </motion.div>
          </div>
        )}

        {/* Visual Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000810] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-[#000810]/10 mix-blend-overlay" />

        {/* Labels overlay */}
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-cyan-400/80">
              {project.category}
            </span>
          </div>
          <div className="flex items-center gap-2 px-2 py-1 rounded bg-white/5 border border-white/5 backdrop-blur-md">
            <Globe className="w-3 h-3 text-white/30" />
            <span className="text-[9px] font-mono text-white/40 uppercase tracking-tighter">{project.location}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col flex-grow p-8">
        <div className="flex flex-col gap-4">
          <h3
            dir="rtl"
            className="text-2xl md:text-3xl font-black text-white text-right leading-tight group-hover:text-cyan-400 transition-colors duration-500"
          >
            {project.tagline}
          </h3>

          <p className="text-white/60 text-sm leading-relaxed max-w-[90%]">
            {project.description}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-mono px-2.5 py-1 rounded-md bg-[#00E5FF]/[0.06] border border-[#00E5FF]/25 text-white/50 uppercase tracking-wider group-hover:border-cyan-500/40 group-hover:text-white/70 transition-all duration-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats & CTA */}
        <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {project.stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                <AnimatedStat value={stat.value} label={stat.label} />
                {i < project.stats.length - 1 && (
                  <div className="h-6 w-px bg-white/5" />
                )}
              </React.Fragment>
            ))}
          </div>

          {!project.isComingSoon && (
            <motion.button
              variants={{
                initial: { x: 0 },
                hover: { x: 4 },
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest hover:bg-cyan-500/20 transition-all duration-300"
            >
              Case Study <ArrowRight className="w-3 h-3" />
            </motion.button>
          )}
        </div>
      </div>

      {/* Classified Overlay for Project 03 */}
      {project.isComingSoon && (
        <div className="absolute inset-0 z-40 flex items-center justify-center">
          <div className="absolute inset-0 bg-[#00050A]/60 backdrop-blur-[6px]" />
          
          {/* Animated Scanline */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent animate-scan" />
          </div>

          <div className="relative flex flex-col items-center gap-6">
            <div className="p-5 rounded-full bg-[#000810] border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <Lock className="w-8 h-8 text-cyan-500 animate-pulse" />
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <span className="text-xl font-mono font-bold text-cyan-500 tracking-[0.5em] uppercase mb-1">
                CLASSIFIED
              </span>
              <div className="h-px w-24 bg-cyan-500/30 mb-4" />
              <p className="text-cyan-500/60 font-mono text-[10px] max-w-[200px] leading-relaxed uppercase tracking-widest">
                Deep-tech automation in development. Client anonymity guaranteed.
              </p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

// --- Section ---

export default function PortfolioSection() {
  return (
    <section
      id="portfolio"
      className="relative py-24 md:py-40 px-4 sm:px-6 lg:px-8 bg-[#010912] overflow-hidden"
    >
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Main Ambient Glows */}
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full" />
        
        {/* High-frequency dots grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 229, 255, 1) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} 
        />
        
        {/* Subtle Horizontal Scanlines */}
        <div className="absolute inset-0 opacity-[0.02] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none" style={{ backgroundSize: '100% 2px, 3px 100%' }} />

        {/* Cyan orb — top right */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        {/* Purple orb — bottom left */}
        <div className="absolute bottom-20 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.05) 0%, transparent 70%)', filter: 'blur(50px)' }} />

        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-20 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-cyan-500/50" />
            <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase">
              Provenance & Success
            </span>
            <div className="h-px w-8 bg-cyan-500/50" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-8xl font-black text-white text-center tracking-tighter mb-8 uppercase"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-white">Impact</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            dir="rtl"
            className="text-white/40 text-lg md:text-2xl font-light tracking-wide text-center max-w-2xl"
          >
            مشاريعنا كتثبت قوتنا. ماشي غير هدرة — هادي نتيحة.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Global Footer CTA for Portfolio */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 flex flex-col items-center gap-6"
        >
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-md flex flex-col items-center">
            <p className="text-white/30 text-[10px] uppercase tracking-[0.2em] mb-4">Ready for similar results?</p>
            <button className="group relative px-8 py-3 bg-white text-black font-black text-xs uppercase tracking-widest overflow-hidden">
               <span className="relative z-10">Start Your project</span>
               <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
