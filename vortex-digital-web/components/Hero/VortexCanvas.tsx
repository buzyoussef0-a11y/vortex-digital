"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

const FRAME_COUNT = 146;

export default function VortexCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const { scrollYProgress } = useScroll();

    // Smooth scroll position for frame transition
    const frameIndex = useTransform(scrollYProgress, [0, 0.2], [1, FRAME_COUNT]);
    const smoothFrameIndex = useSpring(frameIndex, {
        stiffness: 300,
        damping: 30,
        restDelta: 0.001
    });

    // Preload images
    useEffect(() => {
        const loadedImages: HTMLImageElement[] = [];
        let loadedCount = 0;

        for (let i = 1; i <= FRAME_COUNT; i++) {
            const img = new Image();
            img.src = `/images/vortex/frame_${i.toString().padStart(3, '0')}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === FRAME_COUNT) {
                    setImages(loadedImages);
                }
            };
            loadedImages.push(img);
        }
    }, []);

    // Canvas drawing logic
    useEffect(() => {
        if (!canvasRef.current || images.length < FRAME_COUNT) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const render = (index: number) => {
            const imgIndex = Math.floor(index) - 1;
            const img = images[Math.min(Math.max(imgIndex, 0), FRAME_COUNT - 1)];

            if (img && canvasRef.current) {
                const { width, height } = canvasRef.current;
                const ratio = Math.max(width / img.width, height / img.height);
                const centerShiftX = (width - img.width * ratio) / 2;
                const centerShiftY = (height - img.height * ratio) / 2;

                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(
                    img,
                    0, 0, img.width, img.height,
                    centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
                );
            }
        };

        const unsubscribe = smoothFrameIndex.on("change", (latest) => {
            render(latest);
        });

        // Initial render
        render(1);

        // Handle resize
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
                canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
                render(smoothFrameIndex.get());
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [images, smoothFrameIndex]);

    return (
        <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#00050A]">
            <canvas
                ref={canvasRef}
                style={{ width: "100%", height: "100%" }}
                className="opacity-80 transition-opacity duration-1000"
            />
            <div className="absolute inset-0 hero-gradient pointer-events-none" />
        </div>
    );
}
