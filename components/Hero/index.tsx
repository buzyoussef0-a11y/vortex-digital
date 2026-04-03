"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import VortexCanvas from "./VortexCanvas";
import ContentOverlays from "./ContentOverlays";

export default function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    return (
        <section ref={containerRef} className="relative h-[500vh] w-full bg-[#00050A]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Hero Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1920&q=90"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00050A] via-[#00050A]/85 to-[#00050A]/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00050A] via-transparent to-transparent" />
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00E5FF]/[0.06] blur-[120px] rounded-full" />

                    {/* Large cyan aurora blob — top left */}
                    <div
                        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(0,229,255,0.04) 40%, transparent 70%)',
                            filter: 'blur(40px)',
                            animation: 'float-slow 8s ease-in-out infinite',
                        }}
                    />

                    {/* Purple aurora blob — bottom right */}
                    <div
                        className="absolute -bottom-20 -right-20 w-[600px] h-[500px] rounded-full"
                        style={{
                            background: 'radial-gradient(circle, rgba(123,97,255,0.1) 0%, rgba(123,97,255,0.03) 40%, transparent 70%)',
                            filter: 'blur(60px)',
                            animation: 'float-slow 10s ease-in-out infinite reverse',
                        }}
                    />

                    {/* Small intense cyan orb — center */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full"
                        style={{
                            background: 'radial-gradient(ellipse, rgba(0,229,255,0.08) 0%, transparent 70%)',
                            filter: 'blur(30px)',
                        }}
                    />
                </div>

                {/* Float animation keyframes */}
                <style>{`
                    @keyframes float-slow {
                        0%, 100% { transform: translateY(0px) scale(1); }
                        50% { transform: translateY(-30px) scale(1.05); }
                    }
                `}</style>
                <VortexCanvas scrollYProgress={scrollYProgress} />
                <ContentOverlays scrollYProgress={scrollYProgress} />
            </div>
        </section>
    );
}
