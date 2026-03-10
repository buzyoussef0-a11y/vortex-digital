"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  Stethoscope, 
  Layers, 
  Globe, 
  ArrowRight, 
  Lock
} from "lucide-react";

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
}

const caseStudies: CaseStudy[] = [
  {
    id: "01",
    category: "Web Design + Booking System",
    location: "Azrou, Morocco",
    tagline: "كليينتا كيحجز بلا ما يتصل",
    description: "A premium dental clinic website with a fully automated online booking system. Patients can schedule appointments 24/7 — no phone calls, no friction.",
    tags: ["Next.js", "Booking System", "UI/UX", "Healthcare"],
    stats: [
      { value: "3", label: "Online Bookings" }, // Value handled as number for count-up
      { value: "100", label: "Mobile Optimized" },
    ],
    colorAccent: "#00E5FF",
    icon: Stethoscope,
  },
  {
    id: "02",
    category: "Agency Branding + Web",
    location: "Morocco",
    tagline: "الموقع اللي كتشوف فيه دابا",
    description: "The official Vortex Digital portfolio — built with Next.js 14, Framer Motion, and Lenis. Featuring 3D scroll animations, AI chat interface, and a futuristic design system engineered to close high-ticket clients.",
    tags: ["Next.js 14", "Framer Motion", "Lenis", "AI Chat"],
    stats: [
      { value: "800", label: "Scroll Depth" }, // Using 800 for '∞' placeholder in countup
      { value: "100", label: "Design Grade" }, // Using 100 for 'AAA'
    ],
    colorAccent: "#67F3FF",
    icon: Layers,
  },
  {
    id: "03",
    category: "AI Automation",
    location: "Morocco",
    tagline: "مشروع قادم — قيد التطوير",
    description: "An intelligent WhatsApp automation system for a local business — handling leads, follow-ups, and bookings entirely via AI in Arabic & French.",
    tags: ["AI", "WhatsApp", "Automation", "Arabic NLP"],
    stats: [
      { value: "24", label: "AI Active" },
      { value: "0", label: "Human Hours" },
    ],
    colorAccent: "#00A8BD",
    icon: Globe,
    isComingSoon: true,
  },
];

const CountUp = ({ value, label, isFirst }: { value: string, label: string, isFirst?: boolean }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const target = parseInt(value.replace(/\D/g, ''));
  const suffix = value.includes('+') ? '+' : value.includes('x') ? 'x' : value.includes('%') ? '%' : isFirst && value === "3" ? "x" : "";
  const prefix = isFirst && value === "3" ? "↑ " : "";

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  // Special formatting for unique labels
  const displayValue = label === "Scroll Depth" ? "∞" : label === "Design Grade" ? "AAA" : `${prefix}${count}${suffix}`;

  return (
    <div ref={ref} className="flex flex-col">
      <span className="text-2xl font-bold text-[#00E5FF]">
        {displayValue}
      </span>
      <span className="text-[10px] uppercase tracking-wider text-white/50">
        {label}
      </span>
    </div>
  );
};

const ProjectCard = ({ project, index }: { project: CaseStudy, index: number }) => {
  const isFeatured = index === 0;
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      x: !isFeatured ? (index === 1 ? 50 : -50) : 0
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0,
      transition: { duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      whileHover={{ y: -10 }}
      className={`relative group overflow-hidden rounded-2xl border border-[#00E5FF]/15 bg-[rgba(0,229,255,0.03)] backdrop-blur-md shadow-[0_0_40px_rgba(0,229,255,0.1)] ${
        isFeatured ? "col-span-1 md:col-span-2 h-[500px]" : "h-[400px]"
      }`}
    >
      {/* Top Gradient Border Line */}
      <div className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#00E5FF] to-transparent w-[30%] group-hover:w-full transition-all duration-700 ease-out" />
      
      {/* Featured Badge */}
      {isFeatured && (
        <div className="absolute top-6 left-6 z-30 px-3 py-1 bg-[#00E5FF] text-black text-[10px] font-bold tracking-widest uppercase rounded-sm">
          Featured
        </div>
      )}

      {/* Project Number */}
      <div className="absolute top-6 right-8 z-10 text-6xl font-bold text-white/[0.03] select-none">
        {project.id}
      </div>

      <div className={`p-8 h-full flex flex-col ${project.isComingSoon ? "opacity-65 relative" : ""}`}>
        {/* Header Meta */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
            {project.category}
          </span>
          <span className="text-[10px] font-mono text-white/50 tracking-widest uppercase">
            {project.location}
          </span>
        </div>

        {/* Icon/Visual Area */}
        <div className={`relative flex items-center justify-center bg-[#000810]/50 rounded-xl overflow-hidden mb-6 ${isFeatured ? "h-1/2" : "h-2/5"}`}>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(#00E5FF 0.5px, transparent 0.5px)", backgroundSize: "10px 10px" }} />
          <div className="absolute w-32 h-32 bg-[#00E5FF]/5 rounded-full blur-3xl" />
          <motion.div
            whileHover={{ scale: 1.15, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <project.icon size={64} className="text-[#00E5FF] relative z-10" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="mt-auto">
          <h3 className="text-xl font-bold text-white text-right mb-2" dir="rtl">
            {project.tagline}
          </h3>
          <p className="text-white/50 text-xs leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 text-[#00E5FF] text-[9px] font-medium tracking-tight">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats & CTA Section */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-6">
              {project.stats.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  <CountUp value={stat.value} label={stat.label} isFirst={i === 0} />
                  {i === 0 && <div className="h-8 w-px bg-[#00E5FF]/20" />}
                </React.Fragment>
              ))}
            </div>
            
            {!project.isComingSoon && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2 text-[#00E5FF] text-[10px] font-bold tracking-widest uppercase"
              >
                View Details <ArrowRight size={14} />
              </motion.div>
            )}
          </div>
        </div>

        {/* Coming Soon Overlay */}
        {project.isComingSoon && (
          <div className="absolute inset-x-8 inset-y-24 z-20 flex flex-col items-center justify-center backdrop-blur-[2px] rounded-xl">
             <div className="flex items-center gap-3 px-4 py-2 border border-[#00E5FF]/30 bg-black/40 rounded-lg shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                <Lock size={16} className="text-[#00E5FF]" />
                <span className="text-[10px] font-mono text-[#00E5FF] tracking-[0.2em] uppercase animate-pulse">
                  [ CLASSIFIED ]
                </span>
             </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="relative py-16 md:py-24 px-4 md:px-20 overflow-hidden bg-[#00050A]">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_20%_50%,rgba(0,229,255,0.05),transparent_70%)] pointer-events-none" />
      
      {/* Subtle Top Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-[#00E5FF]/10 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[#00E5FF] text-[10px] font-mono tracking-[0.4em] uppercase mb-4 block">
            [ CASE STUDIES ]
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Our Work
          </h2>
          <p className="text-white/50 text-xl font-medium" dir="rtl">
            مشاريع حقيقية. نتائج حقيقية.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {caseStudies.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
