"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const Card = ({ title, description, accent }: { title: string; description: string; accent: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

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

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative h-96 w-72 rounded-xl glass p-8 flex flex-col justify-end gap-4 cursor-pointer group"
        >
            <div
                style={{ transform: "translateZ(75px)" }}
                className="absolute top-10 left-10 text-4xl opacity-20 transition-all group-hover:opacity-100 group-hover:scale-110"
            >
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#00E5FF]" />
                </div>
            </div>

            <div style={{ transform: "translateZ(50px)" }}>
                <h3 className="text-2xl font-bold uppercase tracking-tighter leading-none mb-2">
                    {title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                    {description}
                </p>
            </div>

            <div
                style={{ backgroundColor: accent, transform: "translateZ(20px)" }}
                className="absolute bottom-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
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
            />
            <Card
                title="AI Automation"
                description="Intelligent systems designed to handle the heavy lifting while you scale your empire."
                accent="#FFFFFF"
            />
            <Card
                title="Digital Identity"
                description="Exclusive brand architectures for the forward-thinking visionaries."
                accent="#00E5FF"
            />
        </section>
    );
}
