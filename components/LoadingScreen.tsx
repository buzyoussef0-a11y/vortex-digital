"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Simulate progressive loading tied to actual page readiness
        let current = 0;
        const interval = setInterval(() => {
            current += Math.random() * 18 + 6;
            if (current >= 100) {
                current = 100;
                clearInterval(interval);
                // Wait for DOM to be interactive then hide
                setTimeout(() => setVisible(false), 400);
            }
            setProgress(Math.min(current, 100));
        }, 120);

        // Also hide when window fully loads
        const onLoad = () => {
            setProgress(100);
            setTimeout(() => setVisible(false), 400);
        };
        window.addEventListener("load", onLoad);

        return () => {
            clearInterval(interval);
            window.removeEventListener("load", onLoad);
        };
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    key="loader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#00050A]"
                >
                    {/* Background glow */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,229,255,0.07) 0%, transparent 70%)",
                        }}
                    />

                    {/* Logo + name */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col items-center gap-4 mb-12"
                    >
                        {/* V letter */}
                        <div className="text-6xl font-bold bg-gradient-to-br from-white to-[#00E5FF] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,229,255,0.5)]">
                            V
                        </div>
                        <p className="text-[#00E5FF] font-mono text-xs tracking-[0.4em] uppercase">
                            Vortex Digital
                        </p>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="w-48 h-[1px] bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-[#00E5FF] rounded-full"
                            style={{ boxShadow: "0 0 8px rgba(0,229,255,0.7)" }}
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 0.1 }}
                        />
                    </div>

                    {/* Percentage */}
                    <motion.p
                        className="mt-3 text-[10px] font-mono text-white/30 tracking-widest"
                        animate={{ opacity: [0.4, 0.8, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        {Math.round(progress)}%
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
