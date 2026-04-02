"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const targetVolume = 0.2; // Soft volume for a luxury background feel

    const { scrollY } = useScroll();
    const navBg = useTransform(scrollY, [100, 200], ["rgba(0, 0, 0, 0)", "rgba(0, 5, 10, 0.8)"]);
    const navBorder = useTransform(scrollY, [100, 200], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.05)"]);

    const fadeAudio = useCallback((startVol: number, endVol: number, duration: number, onComplete?: () => void) => {
        if (!audioRef.current) return;

        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

        const steps = 20;
        const stepTime = duration / steps;
        const volStep = (endVol - startVol) / steps;

        let currentStep = 0;
        audioRef.current.volume = Math.max(0, Math.min(1, startVol));

        if (startVol === 0 && endVol > 0) {
            audioRef.current.play().catch(() => {
                // In case autoplay is entirely blocked by the browser initially
                setIsPlaying(false);
            });
        }

        fadeIntervalRef.current = setInterval(() => {
            currentStep++;
            if (!audioRef.current) return;

            const nextVol = startVol + (volStep * currentStep);
            audioRef.current.volume = Math.max(0, Math.min(1, nextVol));

            if (currentStep >= steps) {
                if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
                if (endVol === 0) {
                    audioRef.current.pause();
                }
                onComplete?.();
            }
        }, stepTime);
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;

        audioRef.current = new Audio("/back-music/Simulated_Serenity.mp3");
        audioRef.current.loop = true; // Looping on the same page, but we'll kill it fully when navigating away.
        audioRef.current.volume = 0;

        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsPlaying(true);
                    fadeAudio(0, targetVolume, 2000); // 2s smooth fade in to make it soft
                })
                .catch(() => {
                    // Autoplay was prevented by browser (user has not interacted with the document yet)
                    setIsPlaying(false);
                });
        }

        const handleUnload = () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
            }
        };

        window.addEventListener("beforeunload", handleUnload);
        window.addEventListener("pagehide", handleUnload);

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
            window.removeEventListener("pagehide", handleUnload);
            if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = "";
                audioRef.current = null;
            }
        };
    }, [fadeAudio]);

    const toggleAudio = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            setIsPlaying(false);
            fadeAudio(audioRef.current.volume, 0, 800); // Smooth fade out
        } else {
            setIsPlaying(true);
            fadeAudio(audioRef.current.volume, targetVolume, 800); // Smooth fade in
        }
    };

    return (
        <motion.nav
            style={{ backgroundColor: navBg, borderColor: navBorder }}
            className="fixed top-0 left-0 w-full z-50 py-6 px-10 border-b transition-all duration-300 backdrop-blur-md"
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Wordmark */}
                <div className="text-xl font-bold tracking-[0.3em] uppercase group cursor-pointer">
                    Vortex <span className="text-[#00E5FF] group-hover:blur-[2px] transition-all">Digital</span>
                </div>

                {/* Action Controls */}
                <div className="flex items-center gap-6 md:gap-10">
                    {/* Audio Toggle */}
                    <motion.button
                        onClick={toggleAudio}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={isPlaying ? "Pause background music" : "Play background music"}
                        className={`flex items-center gap-3 px-4 py-2 rounded-full border transition-all duration-500 relative group overflow-hidden ${isPlaying
                                ? "border-[#00E5FF]/50 shadow-[0_0_15px_rgba(0,229,255,0.2)] bg-[#00E5FF]/5"
                                : "border-white/10 hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 hover:shadow-[0_0_10px_rgba(0,229,255,0.1)] bg-transparent"
                            }`}
                    >
                        <div className="flex gap-[3px] h-4 items-center justify-center w-4">
                            {[1, 2, 3, 4].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: isPlaying ? [4, 12, 6, 14, 4] : 4,
                                        opacity: isPlaying ? 1 : 0.4
                                    }}
                                    transition={{
                                        repeat: isPlaying ? Infinity : 0,
                                        duration: 0.8,
                                        delay: isPlaying ? i * 0.15 : 0,
                                        ease: "easeInOut"
                                    }}
                                    className={`w-[2px] rounded-full ${isPlaying ? "bg-[#00E5FF]" : "bg-white"}`}
                                    style={{ boxShadow: isPlaying ? "0 0 8px #00E5FF" : "none" }}
                                />
                            ))}
                        </div>
                        <span className={`text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 ${isPlaying ? "text-[#00E5FF] drop-shadow-[0_0_8px_#00E5FF]" : "text-white/60 group-hover:text-[#00E5FF]/80"
                            }`}>
                            {isPlaying ? "Audio On" : "Audio Off"}
                        </span>
                    </motion.button>

                    {/* Magnetic CTA */}
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="hidden md:block px-6 py-2 border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest hover:border-[#00E5FF] hover:bg-[#00E5FF] hover:text-black transition-all group"
                    >
                        Initiate Project
                    </motion.a>
                </div>
            </div>
        </motion.nav>
    );
}
