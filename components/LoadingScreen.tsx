"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MIN_DISPLAY_MS = 2200; // guaranteed minimum visibility time

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const start = Date.now();
        let current = 0;
        let done = false;

        // Fill progress bar over ~2s
        const interval = setInterval(() => {
            // Slow at start, fast in middle, slow near end
            const remaining = 100 - current;
            const increment = Math.random() * 8 + (remaining > 30 ? 6 : 2);
            current = Math.min(current + increment, 98); // never auto-complete to 100
            setProgress(current);
        }, 80);

        // After minimum time, jump to 100 and hide
        const timer = setTimeout(() => {
            clearInterval(interval);
            setProgress(100);
            done = true;
            setTimeout(() => setVisible(false), 500);
        }, MIN_DISPLAY_MS);

        return () => {
            clearInterval(interval);
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#00050A]"
                    style={{ pointerEvents: "all" }}
                >
                    {/* Ambient glow */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.08) 0%, transparent 70%)",
                        }}
                    />

                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col items-center gap-4 mb-10"
                    >
                        <div
                            className="text-7xl font-bold bg-gradient-to-br from-white to-[#00E5FF] bg-clip-text text-transparent"
                            style={{ filter: "drop-shadow(0 0 30px rgba(0,229,255,0.5))" }}
                        >
                            V
                        </div>
                        <p className="text-[#00E5FF] font-mono text-[11px] tracking-[0.45em] uppercase">
                            Vortex Digital
                        </p>
                    </motion.div>

                    {/* Progress bar track */}
                    <div className="w-40 h-[1px] bg-white/[0.08] rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[#00E5FF] rounded-full origin-left"
                            style={{ boxShadow: "0 0 10px rgba(0,229,255,0.8)" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.08 }}
                        />
                    </div>

                    {/* Percentage label */}
                    <p className="mt-3 text-[9px] font-mono text-white/20 tracking-[0.3em]">
                        {Math.round(progress)}%
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
