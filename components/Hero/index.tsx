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
                <VortexCanvas scrollYProgress={scrollYProgress} />
                <ContentOverlays scrollYProgress={scrollYProgress} />
            </div>
        </section>
    );
}
