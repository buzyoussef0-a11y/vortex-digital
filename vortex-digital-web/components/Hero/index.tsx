"use client";

import VortexCanvas from "./VortexCanvas";
import ContentOverlays from "./ContentOverlays";

export default function Hero() {
    return (
        <section className="relative h-[500vh] w-full bg-[#00050A]">
            <VortexCanvas />
            <ContentOverlays />
        </section>
    );
}
