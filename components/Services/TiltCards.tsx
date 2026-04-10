"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Card = ({ title, description, accent, videoSrc }: { title: string; description: string; accent: string; videoSrc: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const videoRef = useRef<HTMLVideoElement>(null);
    const cardRef = useRef<HTMLDivElement | null>(null);

    // Preload video 400px before card enters viewport, play when visible
    useEffect(() => {
        const card = cardRef.current;
        const video = videoRef.current;
        if (!card || !video) return;

        let playing = false;

        // First observer: start loading early (400px before viewport)
        const preloadObs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                video.load();
                preloadObs.disconnect();
            }
        }, { rootMargin: "400px 0px", threshold: 0 });

        // Second observer: play when card actually visible
        const playObs = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && !playing) {
                playing = true;
                video.play().catch(() => {});
                playObs.disconnect();
            }
        }, { threshold: 0.1 });

        preloadObs.observe(card);
        playObs.observe(card);
        return () => { preloadObs.disconnect(); playObs.disconnect(); };
    }, []);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = (mouseX / width) - 0.5;
        const yPct = (mouseY / height) - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    // Split title: first word(s) white, last word cyan
    const titleWords = title.split(" ");
    const titleLastWord = titleWords[titleWords.length - 1];
    const titleFirstWords = titleWords.slice(0, -1).join(" ");

    return (
        <motion.div
            ref={(el) => { cardRef.current = el as HTMLDivElement | null; }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative h-96 w-72 rounded-xl glass p-8 flex flex-col justify-end gap-4 cursor-pointer group overflow-hidden border border-[rgba(0,229,255,0.25)] hover:border-[rgba(0,229,255,0.5)] hover:shadow-[0_0_30px_rgba(0,229,255,0.18)] transition-all duration-300"
        >
            {/* Cyan ambient glow — top of card behind video */}
            <div
                className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none z-[1]"
                style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,229,255,0.10) 0%, transparent 70%)" }}
            />

            {/* Corner accents — top-left */}
            <div className="absolute top-3.5 left-3.5 pointer-events-none z-20">
                <div className="absolute top-0 left-0 w-5 h-[2px] rounded-full" style={{ background: "linear-gradient(to right, #00E5FF, transparent)", boxShadow: "0 0 5px rgba(0,229,255,0.7)" }} />
                <div className="absolute top-0 left-0 w-[2px] h-5 rounded-full" style={{ background: "linear-gradient(to bottom, #00E5FF, transparent)", boxShadow: "0 0 5px rgba(0,229,255,0.7)" }} />
            </div>
            {/* Corner accents — bottom-right */}
            <div className="absolute bottom-3.5 right-3.5 pointer-events-none z-20">
                <div className="absolute bottom-0 right-0 w-5 h-[2px] rounded-full" style={{ background: "linear-gradient(to left, #00E5FF, transparent)", boxShadow: "0 0 5px rgba(0,229,255,0.7)" }} />
                <div className="absolute bottom-0 right-0 w-[2px] h-5 rounded-full" style={{ background: "linear-gradient(to top, #00E5FF, transparent)", boxShadow: "0 0 5px rgba(0,229,255,0.7)" }} />
            </div>

            <video
                ref={videoRef}
                src={videoSrc}
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-50"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#00050A] via-[#00050A]/80 to-transparent z-0" />

            {/* Extra dark gradient specifically behind the text area */}
            <div
                className="absolute inset-x-0 bottom-0 h-44 pointer-events-none z-[5]"
                style={{ background: "linear-gradient(to top, rgba(0,5,10,0.97) 0%, rgba(0,5,10,0.75) 50%, transparent 100%)" }}
            />

            <div
                style={{ transform: "translateZ(75px)" }}
                className="absolute top-10 left-10 text-4xl opacity-20 transition-all group-hover:opacity-100 group-hover:scale-110 z-10"
            >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                </div>
            </div>

            <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2.5">
                    {titleFirstWords && (
                        <span className="text-white">{titleFirstWords} </span>
                    )}
                    <span style={{ color: "#00E5FF", textShadow: "0 0 18px rgba(0,229,255,0.65)" }}>
                        {titleLastWord}
                    </span>
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                    {description}
                </p>
            </div>

            <div
                style={{ backgroundColor: accent, transform: "translateZ(20px)" }}
                className="absolute bottom-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left z-10"
            />
        </motion.div>
    );
};

export default function Services() {
    return (
        <section className="py-20 flex flex-wrap justify-center gap-10 bg-[#00050A] perspective-1000">
            <Card
                title="Premium Design"
                description="Crafting high-end immersive experiences that define luxury in the digital age."
                accent="#00E5FF"
                videoSrc="/video/Glass_panels_floating_in_void_bc8ff65000.mp4"
            />
            <Card
                title="AI Automation"
                description="Intelligent systems designed to handle the heavy lifting while you scale your empire."
                accent="#FFFFFF"
                videoSrc="/video/Microchip_core_glowing_data_bursts_c78ba8da6f.mp4"
            />
            <Card
                title="Web Experience"
                description="Premium websites engineered for impact — scroll animations, 3D, and conversion-focused design."
                accent="#00E5FF"
                videoSrc="/video/Abstract_emblem_forming_in_space_e001b56b92.mp4"
            />
        </section>
    );
}
