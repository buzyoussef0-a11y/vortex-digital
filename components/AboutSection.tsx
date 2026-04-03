"use client";

import React from "react";
import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

const stats = [
    { value: 15, suffix: "+", label: "Projects Delivered" },
    { value: 3, suffix: "x", label: "Avg. ROI Increase" },
    { value: 24, suffix: "/7", label: "AI Systems Running" },
];

const StatCounter = ({ value, suffix, label }: { value: number; suffix: string; label: string }) => {
    const { ref, count } = useCountUp({ end: value, duration: 2000 });

    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className="flex flex-col items-center md:items-start p-6 rounded-xl border border-[#00E5FF]/10 bg-white/[0.01] backdrop-blur-sm relative group overflow-hidden">
            {/* Individual stat glow hover effect */}
            <div className="absolute inset-0 bg-[#00E5FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-baseline relative z-10">
                <span className="text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]">{count}</span>
                <span className="text-[#00E5FF]/60 text-2xl ml-1">{suffix}</span>
            </div>
            <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest font-mono relative z-10">
                {label}
            </p>
            
            {/* Stat border glow indicator */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
        </div>
    );
};

const AboutSection = () => {

    return (
        <section id="about" className="py-24 px-6 md:px-20 relative overflow-hidden bg-[#00050A]">
            {/* Ambient glows */}
            <div className="absolute top-10 right-10 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)', filter: 'blur(80px)' }} />
            <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.07) 0%, transparent 70%)', filter: 'blur(90px)' }} />
            {/* Grid texture */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,229,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.5) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-20 text-center">
                    <motion.p
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[#00E5FF] font-mono tracking-widest uppercase mb-4"
                    >
                        [ WHO WE ARE ]
                    </motion.p>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-7xl font-bold mb-4"
                    >
                        <span className="text-white">About </span>
                        <span className="text-[#00E5FF] drop-shadow-[0_0_25px_rgba(0,229,255,0.35)]">Vortex</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left Panel: Visuals & Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                        style={{ willChange: "transform, opacity, filter" }}
                        className="relative"
                    >
                        <div className="aspect-square rounded-3xl border border-[#00E5FF]/30 bg-white/[0.02] backdrop-blur-3xl flex items-center justify-center relative overflow-hidden group">
                            {/* Removed Doctor Image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF]/10 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#00050A]/90 to-transparent" />
                            
                            {/* Radial Glow behind V */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="w-1/2 h-1/2 rounded-full bg-[#00E5FF]/15 blur-[60px]" />
                            </div>

                            {/* Rotating Hexagon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-[280px] h-[320px] md:w-[350px] md:h-[400px] border-2 border-[#00E5FF]/30 hexagon-rotate opacity-60" />
                            </div>

                            {/* Center Logo/Icon */}
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="text-9xl font-bold bg-gradient-to-br from-white to-[#00E5FF] bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,229,255,0.5)]">
                                    V
                                </div>
                                <div className="w-16 h-[2px] bg-[#00E5FF]/60 mt-4 animate-pulse" />
                            </div>

                            {/* Floating Particles */}
                            <div className="absolute inset-0 pointer-events-none">
                                <motion.div 
                                    animate={{ y: [0, -20, 0], x: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-1/4 left-1/4 w-1.5 h-1.5 rounded-full bg-[#00E5FF]" 
                                />
                                <motion.div 
                                    animate={{ y: [0, 25, 0], x: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                    className="absolute bottom-1/3 right-1/4 w-1 h-1 rounded-full bg-[#00E5FF]" 
                                />
                                <motion.div 
                                    animate={{ y: [0, -15, 0], x: [0, -10, 0], opacity: [0.4, 0.7, 0.4] }}
                                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                                    className="absolute top-1/3 right-1/3 w-1.2 h-1.2 rounded-full bg-[#00E5FF]" 
                                />
                            </div>

                            {/* Decorative Glows */}
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#00E5FF]/5 to-transparent pointer-events-none" />
                            {/* Bottom ambient glow */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/3 rounded-full pointer-events-none"
                                style={{ background: 'radial-gradient(ellipse, rgba(0,229,255,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />
                            {/* Top border glow line */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#00E5FF]/60 to-transparent shadow-[0_0_10px_rgba(0,229,255,0.5)]" />
                        </div>

                        {/* Stats Overlay */}
                        <div className="relative grid grid-cols-3 gap-6 mt-12 bg-[#00E5FF]/[0.035] border border-[#00E5FF]/20 p-10 rounded-2xl backdrop-blur-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                            {/* Top border glow line */}
                            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00E5FF]/50 to-transparent" />
                            {/* Vertical separators */}

                            {stats.map((stat, i) => (
                                <StatCounter key={i} {...stat} />
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Panel: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
                        whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                        style={{ willChange: "transform, opacity, filter" }}
                        className="flex flex-col"
                    >
                        <h3 dir="rtl" className="text-3xl md:text-5xl font-bold text-white mb-8 text-right leading-tight">
                            نحن مش أجنسي عادية — <br />
                            <span className="text-[#00E5FF]">نحن بناة أنظمة رقمية</span>
                        </h3>

                        <div className="space-y-6 text-white/65 text-lg leading-relaxed">
                            <p>
                                Vortex Digital was built on one belief: Moroccan businesses deserve world-class digital infrastructure. Not templates. Not shortcuts. Real systems that generate real results.
                            </p>
                            <p>
                                We combine premium design, cutting-edge AI automation, and deep market knowledge to give our clients an unfair advantage in the digital space.
                            </p>
                        </div>

                        <p dir="rtl" className="text-white font-bold text-xl mt-10 mb-8 tracking-tight text-right">
                            كل مشروع كنخدمو — كنخدموه كأنه ديالنا حنا
                        </p>

                        <div className="flex flex-wrap gap-4 mb-10 justify-end">
                            <span className="px-4 py-1.5 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/5 text-[#00E5FF] text-xs font-mono uppercase tracking-widest">
                                🇲🇦 Morocco-Based
                            </span>
                            <span className="px-4 py-1.5 rounded-full border border-[#00E5FF]/30 bg-[#00E5FF]/5 text-[#00E5FF] text-xs font-mono uppercase tracking-widest">
                                🌐 Global Standards
                            </span>
                        </div>

                        <a
                            href="#contact"
                            className="group inline-flex items-center gap-2 text-[#00E5FF] font-bold text-sm uppercase tracking-widest self-end"
                        >
                            Meet the founder
                            <span className="w-12 h-[1px] bg-[#00E5FF]/40 group-hover:w-20 transition-all duration-500" />
                            <span className="text-xl group-hover:translate-x-1 transition-transform duration-300">→</span>
                        </a>
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
        .hexagon-rotate {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
          animation: rotateHex 20s linear infinite;
        }

        @keyframes rotateHex {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
        </section>
    );
};

export default AboutSection;
