"use client";

import React from "react";
import { motion, useTransform, MotionValue } from "framer-motion";

export default function ContentOverlays({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {

    // Scroll indicator fades out quickly at the start
    const initialFadeOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

    // CTA block: invisible from 0→0.85, fades in from 0.85→1.0
    const ctaOpacity = useTransform(scrollYProgress, [0.85, 1.0], [0, 1]);

    // Section Opacities
    const s1Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [0, 1, 1, 0]);
    const s2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [0, 1, 1, 0]);
    const s3Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 0.98], [0, 1, 1, 0]);

    // Slide transforms for side panels
    const s1LeftX = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [-20, 0, 0, -20]);
    const s1RightX = useTransform(scrollYProgress, [0.1, 0.2, 0.3, 0.4], [20, 0, 0, 20]);

    const s2LeftX = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [-20, 0, 0, -20]);
    const s2RightX = useTransform(scrollYProgress, [0.4, 0.5, 0.6, 0.7], [20, 0, 0, 20]);

    const s3LeftX = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 0.98], [-20, 0, 0, -20]);
    const s3RightX = useTransform(scrollYProgress, [0.7, 0.8, 0.9, 0.98], [20, 0, 0, 20]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
            
            {/* --- SECTION 1 --- (Arabic - Top) */}
            <motion.div 
                style={{ opacity: s1Opacity, x: s1LeftX }}
                className="absolute left-6 md:left-24 top-[5%] text-left z-20"
                dir="rtl"
            >
                <h2 className="text-3xl md:text-5xl font-bold text-white tracking-normal mb-2 drop-shadow-lg">
                    رؤية <span className="text-[#00E5FF]">رقمية</span> متطورة
                </h2>
            </motion.div>
            <motion.div 
                style={{ opacity: s1Opacity, x: s1RightX }}
                className="absolute right-6 md:right-24 top-[5%] max-w-[280px] md:max-w-[350px] text-right z-20"
                dir="rtl"
            >
                <p className="text-sm md:text-lg text-gray-300 font-light leading-relaxed drop-shadow-md">
                    نصنع المستقبل عبر حلول ذكية تعتمد على الذكاء الاصطناعي لرفع كفاءة أعمالك.
                </p>
            </motion.div>

            {/* --- SECTION 2 --- */}
            <motion.div 
                style={{ opacity: s2Opacity, x: s2LeftX }}
                className="absolute left-6 md:left-16 top-1/3 md:top-1/2 -translate-y-1/2 max-w-[250px] md:max-w-[300px] text-left z-20"
            >
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-wider mb-2 drop-shadow-lg">
                    IMMERSIVE <span className="text-white/40">EXPERIENCE</span>
                </h2>
            </motion.div>
            <motion.div 
                style={{ opacity: s2Opacity, x: s2RightX }}
                className="absolute right-6 md:right-16 top-1/3 md:top-1/2 -translate-y-1/2 max-w-[250px] md:max-w-[300px] text-right z-20"
            >
                <p className="text-sm md:text-base text-gray-300 font-light tracking-wide drop-shadow-md">
                    DIGITAL IDENTITIES THAT CAPTURE ATTENTION AND COMMAND AUTHORITY.
                </p>
            </motion.div>

            {/* --- SECTION 3 --- */}
            <motion.div 
                style={{ opacity: s3Opacity, x: s3LeftX }}
                className="absolute left-6 md:left-16 top-1/3 md:top-1/2 -translate-y-1/2 max-w-[250px] md:max-w-[300px] text-left z-20"
            >
                <h2 className="text-2xl md:text-4xl font-bold text-white tracking-wider mb-2 drop-shadow-lg underline decoration-[#00E5FF]/50 underline-offset-8">
                    PEAK PERFORMANCE
                </h2>
            </motion.div>
            <motion.div 
                style={{ opacity: s3Opacity, x: s3RightX }}
                className="absolute right-6 md:right-16 top-1/3 md:top-1/2 -translate-y-1/2 max-w-[250px] md:max-w-[300px] text-right z-20"
            >
                <p className="text-sm md:text-base text-gray-300 font-light tracking-wide drop-shadow-md">
                    SCALE YOUR OPERATIONS WITH AI-DRIVEN EFFICIENCY AND PRECISION.
                </p>
            </motion.div>

            {/* Premium Scroll Indicator */}
            <motion.div
                style={{ opacity: initialFadeOpacity }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6"
            >
                <div className="relative h-20 w-[1px] bg-gradient-to-b from-transparent via-white/30 to-transparent">
                    <motion.div
                        animate={{ y: [-40, 40], opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    />
                </div>
                <div className="flex flex-col items-center gap-2">
                    <span className="text-[9px] font-extralight text-white/40 uppercase tracking-[0.5em]">
                        Scroll to discover
                    </span>
                    <div className="flex gap-2.5">
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                                className="w-[3px] h-[3px] rounded-full bg-white/40"
                            />
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Final CTA — appears at 85%+ scroll progress */}
            <motion.div
                style={{ opacity: ctaOpacity }}
                className="absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center text-center w-full max-w-md"
            >
                <p className="text-gray-300 tracking-[0.2em] text-[10px] md:text-xs uppercase mb-4">
                    The Future of Your Business, Automated
                </p>
                <a
                    href="#contact"
                    style={{ pointerEvents: "auto" }}
                    className="bg-[#00E5FF] text-black font-bold tracking-wide px-8 py-3 rounded-full shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-300"
                >
                    START YOUR PROJECT
                </a>
            </motion.div>
        </div>
    );
}
