"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Layers, Code2, Rocket } from "lucide-react";

interface Step {
    number: string;
    icon: React.ElementType;
    title: string;
    arabic: string;
    desc: string;
    duration: string;
}

const steps: Step[] = [
    {
        number: "01",
        icon: MessageSquare,
        title: "Discovery Call",
        arabic: "نفهم مشروعك مزيان",
        desc: "We start with a deep-dive session to understand your business, goals, audience, and what success looks like for you. No fluff — just clarity.",
        duration: "Day 1–2",
    },
    {
        number: "02",
        icon: Layers,
        title: "Strategy & Architecture",
        arabic: "نبنيو الخطة والهيكل",
        desc: "We map out the full system — wireframes, tech stack, automation flows, content structure. You approve everything before we write one line of code.",
        duration: "Day 3–5",
    },
    {
        number: "03",
        icon: Code2,
        title: "Build & Automate",
        arabic: "نخدمو بسرعة وبجودة عالية",
        desc: "Our team executes with precision. Design, development, and AI integration happen in parallel. You get progress updates daily.",
        duration: "Day 6–21",
    },
    {
        number: "04",
        icon: Rocket,
        title: "Launch & Scale",
        arabic: "نطلقو ونبقاو معاك",
        desc: "We deploy, test, and hand over. But we don't disappear — we provide post-launch support and optimization to make sure results keep growing.",
        duration: "Day 15+",
    },
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.18, delayChildren: 0.15 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
};

const floatAnimation = {
    y: [0, -6, 0],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
};

const ProcessSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section
            id="process"
            className="py-32 px-6 md:px-20 relative overflow-hidden"
            style={{ background: "linear-gradient(180deg, #00050A 0%, #000D1A 45%, #00050A 100%)" }}
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
                        "repeating-linear-gradient(60deg, rgba(0,229,255,0.025) 0px, rgba(0,229,255,0.025) 1px, transparent 1px, transparent 80px)",
                }}
            />

            <div className="max-w-6xl mx-auto relative z-10">

                {/* ── Section Header ── */}
                <div className="mb-24">
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[#00E5FF] font-mono tracking-widest uppercase mb-4"
                    >
                        [ HOW IT WORKS ]
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
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
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        dir="rtl"
                        className="text-zinc-500 text-xl md:text-2xl text-right"
                    >
                        من أول ما تتواصل معانا حتى تشوف النتيجة
                    </motion.p>
                </div>

                {/* ── Timeline ── */}
                <div ref={containerRef} className="relative">

                    {/* Vertical command spine */}
                    <div className="absolute left-[17px] top-0 w-[2px] h-full bg-white/[0.04] rounded-full overflow-hidden z-0">
                        <motion.div
                            initial={{ scaleY: 0 }}
                            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                            className="w-full h-full"
                            style={{
                                transformOrigin: "top",
                                background: "linear-gradient(to bottom, #00E5FF 0%, rgba(0,229,255,0.28) 65%, transparent 100%)",
                            }}
                        />
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="space-y-5 pl-[58px]"
                    >
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="relative group"
                                style={{ willChange: "transform, opacity, filter" }}
                            >
                                {/* Glowing spine node */}
                                <motion.div
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                    transition={{
                                        delay: 0.5 + index * 0.18,
                                        duration: 0.5,
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                    className="absolute -left-[47px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-[#00E5FF] bg-[#000D1A] z-10 flex items-center justify-center"
                                    style={{
                                        boxShadow: "0 0 14px rgba(0,229,255,0.75), 0 0 30px rgba(0,229,255,0.28)",
                                    }}
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                                </motion.div>

                                {/* ── Card ── */}
                                <div
                                    className="relative overflow-hidden rounded-2xl flex flex-col md:flex-row transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(0,229,255,0.13)]"
                                    style={{
                                        background:
                                            "linear-gradient(145deg, rgba(0,229,255,0.04) 0%, rgba(0,5,10,0.94) 55%, rgba(123,97,255,0.02) 100%)",
                                        border: "1px solid rgba(0,229,255,0.18)",
                                        backdropFilter: "blur(24px)",
                                        WebkitBackdropFilter: "blur(24px)",
                                    }}
                                >
                                    <div style={{position:'absolute',inset:0,background:'radial-gradient(ellipse at top left, rgba(0,229,255,0.15) 0%, transparent 60%)',pointerEvents:'none',borderRadius:'inherit'}} />
                                    <div style={{position:'absolute',inset:0,backgroundImage:'radial-gradient(rgba(0,229,255,0.15) 1px, transparent 1px)',backgroundSize:'20px 20px',opacity:0.6,pointerEvents:'none',borderRadius:'inherit'}} />
                                    {/* Top glow line */}
                                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent pointer-events-none" />

                                    {/* Hover border brightening overlay */}
                                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ border: "1px solid rgba(0,229,255,0.38)" }} />

                                    {/* Corner mark — top-left */}
                                    <div className="absolute top-4 left-4 pointer-events-none z-10">
                                        <div className="absolute top-0 left-0 w-5 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, rgba(0,229,255,0.6), transparent)" }} />
                                        <div className="absolute top-0 left-0 w-[2px] h-5 rounded-full" style={{ background: "linear-gradient(to bottom, rgba(0,229,255,0.6), transparent)" }} />
                                    </div>
                                    {/* Corner mark — bottom-right */}
                                    <div className="absolute bottom-4 right-4 pointer-events-none z-10">
                                        <div className="absolute bottom-0 right-0 w-5 h-[2px] rounded-full" style={{ background: "linear-gradient(to left, rgba(0,229,255,0.6), transparent)" }} />
                                        <div className="absolute bottom-0 right-0 w-[2px] h-5 rounded-full" style={{ background: "linear-gradient(to top, rgba(0,229,255,0.6), transparent)" }} />
                                    </div>

                                    {/* ── Left indicator panel ── */}
                                    <div className="relative md:w-[210px] shrink-0 p-6 md:p-8 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-center overflow-hidden border-b md:border-b-0 md:border-r border-[#00E5FF]/[0.08] gap-4 md:gap-6">

                                        {/* Watermark number */}
                                        <div
                                            className="absolute -top-3 -left-1 font-black font-mono leading-none select-none pointer-events-none"
                                            style={{
                                                fontSize: "100px",
                                                color: "rgba(0,229,255,0.055)",
                                                letterSpacing: "-0.05em",
                                            }}
                                        >
                                            {step.number}
                                        </div>

                                        {/* Icon with orbit ring */}
                                        <div className="relative z-10 flex-shrink-0">
                                            <motion.div
                                                animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
                                                transition={{ duration: 12 + index * 4, repeat: Infinity, ease: "linear" }}
                                                className="absolute rounded-full pointer-events-none"
                                                style={{
                                                    inset: "-10px",
                                                    border: "1px dashed rgba(0,229,255,0.2)",
                                                }}
                                            />
                                            <motion.div
                                                animate={floatAnimation}
                                                className="relative w-12 h-12 rounded-xl flex items-center justify-center text-[#00E5FF]"
                                                style={{
                                                    background: "linear-gradient(135deg, rgba(0,229,255,0.13), rgba(0,229,255,0.04))",
                                                    border: "1px solid rgba(0,229,255,0.28)",
                                                    boxShadow: "0 0 18px rgba(0,229,255,0.16), inset 0 1px 0 rgba(255,255,255,0.06)",
                                                }}
                                            >
                                                <step.icon size={22} />
                                            </motion.div>
                                        </div>

                                        {/* Duration badge with gradient border */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 6 }}
                                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ delay: 0.9 + index * 0.12 }}
                                            className="relative z-10 flex-shrink-0"
                                        >
                                            <div
                                                className="p-px rounded-full"
                                                style={{
                                                    background: "linear-gradient(90deg, rgba(0,229,255,0.5), rgba(0,229,255,0.12))",
                                                }}
                                            >
                                                <div className="px-3 py-1.5 rounded-full bg-[#000D1A] text-[#00E5FF] text-[10px] font-mono tracking-[0.12em] uppercase whitespace-nowrap">
                                                    {step.duration}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* ── Right content panel ── */}
                                    <div className="relative flex-1 p-7 md:p-10">
                                        {/* Top-right ambient glow */}
                                        <div
                                            className="absolute top-0 right-0 w-52 h-52 pointer-events-none"
                                            style={{
                                                background: "radial-gradient(circle at top right, rgba(0,229,255,0.07) 0%, transparent 60%)",
                                            }}
                                        />

                                                        <div className="relative z-10">
                                            {/* Title — last word in cyan */}
                                            <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight leading-tight">
                                                {(() => {
                                                    const words = step.title.split(" ");
                                                    const last = words[words.length - 1];
                                                    const rest = words.slice(0, -1).join(" ");
                                                    return (
                                                        <>
                                                            {rest && <span className="text-white">{rest} </span>}
                                                            <span
                                                                style={{
                                                                    color: "#00E5FF",
                                                                    filter: "drop-shadow(0 0 10px rgba(0,229,255,0.55))",
                                                                }}
                                                            >
                                                                {last}
                                                            </span>
                                                        </>
                                                    );
                                                })()}
                                            </h3>
                                            <p dir="rtl" className="text-[#00E5FF] text-base mb-5 font-semibold tracking-wide">
                                                {step.arabic}
                                            </p>
                                            <p
                                                className="text-white/65 text-[15px] leading-[1.85] pl-3"
                                                style={{
                                                    borderLeft: "2px solid rgba(0,229,255,0.2)",
                                                }}
                                            >
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
