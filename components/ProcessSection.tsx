"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { MessageSquare, Layers, Code2, Rocket } from "lucide-react";

interface Step {
  number: string;
  phase: string;
  icon: React.ElementType;
  titleMain: string;
  titleAccent: string;
  arabic: string;
  desc: string;
  duration: string;
}

const steps: Step[] = [
  {
    number: "01",
    phase: "PHASE ONE",
    icon: MessageSquare,
    titleMain: "Discovery",
    titleAccent: "Call",
    arabic: "نفهم مشروعك مزيان",
    desc: "We start with a deep-dive session to understand your business, goals, audience, and what success looks like for you. No fluff — just clarity.",
    duration: "Day 1–2",
  },
  {
    number: "02",
    phase: "PHASE TWO",
    icon: Layers,
    titleMain: "Strategy &",
    titleAccent: "Architecture",
    arabic: "نبنيو الخطة والهيكل",
    desc: "We map out the full system — wireframes, tech stack, automation flows, content structure. You approve everything before we write one line of code.",
    duration: "Day 3–5",
  },
  {
    number: "03",
    phase: "PHASE THREE",
    icon: Code2,
    titleMain: "Build &",
    titleAccent: "Automate",
    arabic: "نخدمو بسرعة وبجودة عالية",
    desc: "Our team executes with precision. Design, development, and AI integration happen in parallel. You get progress updates daily.",
    duration: "Day 6–21",
  },
  {
    number: "04",
    phase: "PHASE FOUR",
    icon: Rocket,
    titleMain: "Launch &",
    titleAccent: "Scale",
    arabic: "نطلقو ونبقاو معاك",
    desc: "We deploy, test, and hand over. But we don't disappear — we provide post-launch support and optimization to make sure results keep growing.",
    duration: "Day 15+",
  },
];

/* ─── Step Card ─────────────────────────────────────────── */

interface StepCardProps {
  step: Step;
  index: number;
  cardX: MotionValue<number>;
  cardOpacity: MotionValue<number>;
}

const StepCard = ({ step, index, cardX, cardOpacity }: StepCardProps) => {
  const [hovered, setHovered] = useState(false);
  const Icon = step.icon;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      style={{ x: cardX, opacity: cardOpacity }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
      className="relative"
    >
      {/* Outer hover glow */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        animate={{
          boxShadow: hovered
            ? "0 0 60px rgba(0,229,255,0.18), 0 0 120px rgba(0,229,255,0.07)"
            : "0 0 0px rgba(0,229,255,0)",
        }}
        transition={{ duration: 0.45 }}
      />

      {/* Card body */}
      <div
        className="relative overflow-hidden rounded-2xl flex flex-col md:flex-row"
        style={{
          background: isEven
            ? "linear-gradient(145deg, rgba(0,229,255,0.05) 0%, rgba(0,5,10,0.97) 55%, rgba(0,229,255,0.02) 100%)"
            : "linear-gradient(145deg, rgba(123,97,255,0.05) 0%, rgba(0,5,10,0.97) 55%, rgba(0,229,255,0.02) 100%)",
          border: "1px solid rgba(0,229,255,0.12)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          transition: "border-color 0.4s",
        }}
      >
        {/* Top glow line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/35 to-transparent pointer-events-none" />

        {/* Animated border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            borderColor: hovered ? "rgba(0,229,255,0.32)" : "rgba(0,229,255,0.0)",
          }}
          style={{ border: "1px solid" }}
          transition={{ duration: 0.4 }}
        />

        {/* Dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            backgroundImage: "radial-gradient(rgba(0,229,255,0.1) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.4,
            maskImage: "radial-gradient(ellipse 60% 60% at 0% 50%, black 0%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 0% 50%, black 0%, transparent 100%)",
          }}
        />

        {/* Corner brackets */}
        <div className="absolute top-4 left-4 pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-5 h-[2px] rounded-full bg-gradient-to-r from-[#00E5FF]/55 to-transparent" />
          <div className="absolute top-0 left-0 w-[2px] h-5 rounded-full bg-gradient-to-b from-[#00E5FF]/55 to-transparent" />
        </div>
        <div className="absolute bottom-4 right-4 pointer-events-none z-10">
          <div className="absolute bottom-0 right-0 w-5 h-[2px] rounded-full bg-gradient-to-l from-[#00E5FF]/55 to-transparent" />
          <div className="absolute bottom-0 right-0 w-[2px] h-5 rounded-full bg-gradient-to-t from-[#00E5FF]/55 to-transparent" />
        </div>

        {/* ── Left panel ── */}
        <div className="relative md:w-[230px] shrink-0 p-6 md:p-8 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center gap-4 md:gap-8 border-b md:border-b-0 md:border-r border-[#00E5FF]/[0.07] overflow-hidden">

          {/* Giant watermark number */}
          <div
            className="absolute -top-5 -left-3 font-black font-mono leading-none select-none pointer-events-none"
            style={{
              fontSize: "120px",
              color: "rgba(0,229,255,0.048)",
              letterSpacing: "-0.04em",
            }}
          >
            {step.number}
          </div>

          {/* Phase label */}
          <span className="absolute top-5 left-6 text-[8px] font-mono tracking-[0.25em] text-[#00E5FF]/30 uppercase z-10">
            {step.phase}
          </span>

          {/* Icon with dual orbit rings */}
          <div className="relative z-10 flex-shrink-0 mt-8 md:mt-0">
            {/* Outer dashed orbit */}
            <motion.div
              animate={{ rotate: isEven ? 360 : -360 }}
              transition={{ duration: 18 + index * 3, repeat: Infinity, ease: "linear" }}
              className="absolute pointer-events-none rounded-full"
              style={{ inset: "-18px", border: "1px dashed rgba(0,229,255,0.13)" }}
            />
            {/* Inner dashed orbit */}
            <motion.div
              animate={{ rotate: isEven ? -240 : 240 }}
              transition={{ duration: 11 + index * 2, repeat: Infinity, ease: "linear" }}
              className="absolute pointer-events-none rounded-full"
              style={{ inset: "-9px", border: "1px dashed rgba(0,229,255,0.22)" }}
            />

            {/* Icon box */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3 + index * 0.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-14 h-14 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,255,0.14), rgba(0,229,255,0.04))",
                border: "1px solid rgba(0,229,255,0.28)",
                boxShadow: hovered
                  ? "0 0 30px rgba(0,229,255,0.38), inset 0 1px 0 rgba(255,255,255,0.09)"
                  : "0 0 16px rgba(0,229,255,0.14), inset 0 1px 0 rgba(255,255,255,0.05)",
                transition: "box-shadow 0.4s",
              }}
            >
              <Icon size={24} className="text-[#00E5FF]" />
            </motion.div>
          </div>

          {/* Duration badge */}
          <div className="relative z-10 flex-shrink-0">
            <div
              className="p-px rounded-full"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,255,0.5), rgba(0,229,255,0.08))",
              }}
            >
              <div className="px-4 py-2 rounded-full bg-[#000D1A] flex items-center gap-2">
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="text-[#00E5FF] text-[10px] font-mono tracking-[0.15em] uppercase whitespace-nowrap">
                  {step.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right content panel ── */}
        <div className="relative flex-1 p-7 md:p-10 md:pl-12">
          {/* Ambient corner glow */}
          <div
            className="absolute top-0 right-0 w-72 h-full pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at top right, rgba(0,229,255,0.055) 0%, transparent 60%)",
            }}
          />

          <div className="relative z-10">
            {/* Title */}
            <h3 className="text-2xl md:text-[1.85rem] font-bold mb-2 tracking-tight leading-tight">
              <span className="text-white">{step.titleMain} </span>
              <motion.span
                animate={{
                  textShadow: hovered
                    ? "0 0 28px rgba(0,229,255,0.8)"
                    : "0 0 12px rgba(0,229,255,0.38)",
                }}
                style={{ color: "#00E5FF" }}
                transition={{ duration: 0.4 }}
              >
                {step.titleAccent}
              </motion.span>
            </h3>

            {/* Arabic subtitle */}
            <p dir="rtl" className="text-[#00E5FF]/60 text-base mb-6 font-medium tracking-wide">
              {step.arabic}
            </p>

            {/* Description */}
            <p
              className="text-white/58 text-[15px] leading-[1.9] pl-4"
              style={{ borderLeft: "2px solid rgba(0,229,255,0.2)" }}
            >
              {step.desc}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ─── Section ────────────────────────────────────────────── */

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Single spring driving all transforms
  const s = useSpring(scrollYProgress, { stiffness: 45, damping: 14, restDelta: 0.001 });

  // ── Header ──────────────────────────────────────────────
  const labelO = useTransform(s, [0.03, 0.12], [0, 1]);
  const labelX = useTransform(s, [0.03, 0.12], [-30, 0]);
  const headingO = useTransform(s, [0.06, 0.17], [0, 1]);
  const headingY = useTransform(s, [0.06, 0.17], [50, 0]);
  const subO    = useTransform(s, [0.10, 0.19], [0, 1]);

  // ── Spine fill ──────────────────────────────────────────
  const spineScaleY = useTransform(s, [0.15, 0.78], [0, 1]);

  // ── Card reveals — alternating left / right ─────────────
  const c0X = useTransform(s, [0.14, 0.28], [-90, 0]);
  const c0O = useTransform(s, [0.14, 0.28], [0, 1]);

  const c1X = useTransform(s, [0.29, 0.43], [90, 0]);
  const c1O = useTransform(s, [0.29, 0.43], [0, 1]);

  const c2X = useTransform(s, [0.44, 0.58], [-90, 0]);
  const c2O = useTransform(s, [0.44, 0.58], [0, 1]);

  const c3X = useTransform(s, [0.59, 0.73], [90, 0]);
  const c3O = useTransform(s, [0.59, 0.73], [0, 1]);

  const cardTransforms = [
    { x: c0X, opacity: c0O },
    { x: c1X, opacity: c1O },
    { x: c2X, opacity: c2O },
    { x: c3X, opacity: c3O },
  ];

  // ── Spine node opacities ────────────────────────────────
  const node0O = useTransform(s, [0.14, 0.22], [0, 1]);
  const node1O = useTransform(s, [0.29, 0.37], [0, 1]);
  const node2O = useTransform(s, [0.44, 0.52], [0, 1]);
  const node3O = useTransform(s, [0.59, 0.67], [0, 1]);
  const nodeOpacities = [node0O, node1O, node2O, node3O];

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        minHeight: "200vh",
        background: "linear-gradient(180deg, #00050A 0%, #000D1A 45%, #00050A 100%)",
      }}
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/15 to-transparent pointer-events-none" />

      {/* Ambient glows */}
      <div
        className="absolute top-1/4 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,229,255,0.055) 0%, transparent 65%)" }}
      />
      <div
        className="absolute bottom-1/4 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(123,97,255,0.07) 0%, transparent 65%)" }}
      />

      {/* Diagonal scanline texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(60deg, rgba(0,229,255,0.018) 0px, rgba(0,229,255,0.018) 1px, transparent 1px, transparent 80px)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-20 pt-32 pb-24 relative z-10">

        {/* ── Section Header ── */}
        <div className="mb-20">
          <motion.p
            style={{ opacity: labelO, x: labelX }}
            className="text-[#00E5FF] font-mono text-xs tracking-[0.3em] uppercase mb-4"
          >
            [ HOW IT WORKS ]
          </motion.p>

          <motion.h2
            style={{ opacity: headingO, y: headingY }}
            className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight leading-none"
          >
            Our{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #ffffff 0%, #00E5FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Process
            </span>
          </motion.h2>

          <motion.p
            style={{ opacity: subO }}
            dir="rtl"
            className="text-zinc-500 text-xl md:text-2xl text-right"
          >
            من أول ما تتواصل معانا حتى تشوف النتيجة
          </motion.p>
        </div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Vertical command spine */}
          <div className="absolute left-[17px] top-0 w-[2px] h-full bg-white/[0.04] rounded-full overflow-hidden z-0">
            <motion.div
              style={{
                scaleY: spineScaleY,
                transformOrigin: "top",
                background: "linear-gradient(to bottom, #00E5FF 0%, rgba(0,229,255,0.28) 65%, transparent 100%)",
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <div className="space-y-6 pl-[58px]">
            {steps.map((step, index) => (
              <div key={index} className="relative">

                {/* Spine node — fades in with its card */}
                <motion.div
                  style={{ opacity: nodeOpacities[index] }}
                  className="absolute -left-[47px] top-1/2 -translate-y-1/2 z-10"
                >
                  <div
                    className="w-4 h-4 rounded-full border-2 border-[#00E5FF] bg-[#000D1A] flex items-center justify-center"
                    style={{
                      boxShadow: "0 0 14px rgba(0,229,255,0.8), 0 0 32px rgba(0,229,255,0.3)",
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                  </div>
                </motion.div>

                <StepCard
                  step={step}
                  index={index}
                  cardX={cardTransforms[index].x}
                  cardOpacity={cardTransforms[index].opacity}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
