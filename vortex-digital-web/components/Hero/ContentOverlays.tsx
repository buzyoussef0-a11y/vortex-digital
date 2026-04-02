"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ContentOverlays() {
    const { scrollYProgress } = useScroll();

    // Reveal animations based on scroll progress
    const headlineOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const headlineY = useTransform(scrollYProgress, [0, 0.05], [0, -50]);

    const sublineOpacity = useTransform(scrollYProgress, [0.05, 0.1], [0, 1]);
    const sublineY = useTransform(scrollYProgress, [0.05, 0.1], [20, 0]);

    const coreOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
    const coreScale = useTransform(scrollYProgress, [0.1, 0.2], [0.95, 1]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col items-center justify-center p-6 md:p-20">
            {/* Starting Headline */}
            <motion.div
                style={{ opacity: headlineOpacity, y: headlineY }}
                className="flex flex-col items-center"
            >
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white text-center font-space-grotesk uppercase italic">
                    Vortex <span className="text-gradient">Digital</span>
                </h1>
                <p className="text-zinc-400 mt-4 text-xl md:text-2xl font-light tracking-widest uppercase">
                    Autonomous Development Agency
                </p>
            </motion.div>

            {/* Darija Subline */}
            <motion.div
                style={{ opacity: sublineOpacity, y: sublineY }}
                className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl text-center px-6"
            >
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 dir-rtl leading-relaxed">
                    كنبنيو ليك "سيستيم" ذكي كيجيب ليك الكليان 24/7 بلا ما تحرك أصبع.
                </h2>
                <p className="text-[#00E5FF] text-lg md:text-xl font-medium uppercase tracking-[0.2em]">
                    The Future of Your Business, Automated.
                </p>
            </motion.div>

            {/* Call to Action Reveal */}
            <motion.div
                style={{ opacity: coreOpacity, scale: coreScale }}
                className="absolute bottom-20 flex flex-col items-center gap-8"
            >
                <a
                    href="#contact"
                    className="group relative px-10 py-4 bg-white text-black font-bold uppercase tracking-widest overflow-hidden transition-colors hover:text-white pointer-events-auto"
                >
                    <span className="relative z-10">Start the Transformation →</span>
                    <div className="absolute inset-0 w-0 h-full bg-[#00E5FF] transition-all duration-300 group-hover:w-full" />
                </a>
            </motion.div>

            {/* Corner Accents */}
            <div className="absolute top-10 left-10 text-[10px] font-mono text-[#00E5FF]/40 tracking-widest uppercase hidden md:block">
                [ system.vortex_initiating ]
            </div>
            <div className="absolute top-10 right-10 text-[10px] font-mono text-[#00E5FF]/40 tracking-widest uppercase hidden md:block">
                [ user.authenticated ]
            </div>
        </div>
    );
}
