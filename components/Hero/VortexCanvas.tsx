"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, MotionValue, useTransform } from "framer-motion";

// Desktop sequence
const DESKTOP_BASE  = '/images/ezgif-33b3c9ca929bfbc9-jpg/ezgif-7d8c322d6bd76eef-jpg/';
const DESKTOP_TOTAL = 162;

// Mobile sequence
const MOBILE_BASE   = '/images/ezgif-33b3c9ca929bfbc9-jpg/image%20scrool%20animation%20for%20phone/';
const MOBILE_TOTAL  = 154;

const FRAME_PREFIX = 'ezgif-frame-';

export default function VortexCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile once on mount
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const totalFrames = isMobile ? MOBILE_TOTAL : DESKTOP_TOTAL;
    const baseUrl     = isMobile ? MOBILE_BASE   : DESKTOP_BASE;

    // Smooth scroll → frame index
    const frameIndex = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);
    const smoothFrameIndex = useSpring(frameIndex, {
        stiffness: 300,
        damping: 30,
        restDelta: 0.001,
    });

    // Preload images whenever the active sequence changes
    useEffect(() => {
        let isMounted = true;
        setFirstFrameLoaded(false);
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = `${baseUrl}${FRAME_PREFIX}${i.toString().padStart(3, '0')}.jpg`;
            if (i === 1) {
                img.onload = () => { if (isMounted) setFirstFrameLoaded(true); };
            }
            loadedImages.push(img);
        }
        setImages(loadedImages);

        return () => { isMounted = false; };
    }, [baseUrl, totalFrames]);

    // Canvas drawing logic
    useEffect(() => {
        if (!canvasRef.current || images.length === 0 || !firstFrameLoaded) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const render = (index: number) => {
            const imgIndex = Math.floor(index) - 1;
            const img = images[Math.min(Math.max(imgIndex, 0), images.length - 1)];

            if (img && img.complete && img.naturalWidth > 0) {
                const dpr = window.devicePixelRatio || 1;
                const rect = canvas.getBoundingClientRect();
                
                // Adjust physical resolution to match display size and DPR
                const targetWidth = Math.floor(rect.width * dpr);
                const targetHeight = Math.floor(rect.height * dpr);

                if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
                    canvas.width = targetWidth;
                    canvas.height = targetHeight;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                // Manual Object-Cover implementation
                const canvasW = canvas.width;
                const canvasH = canvas.height;
                const imgW = img.naturalWidth;
                const imgH = img.naturalHeight;

                const canvasRatio = canvasW / canvasH;
                const imgRatio = imgW / imgH;

                let drawW, drawH, offsetX, offsetY;

                if (imgRatio > canvasRatio) {
                    // Image is wider than canvas viewport (relative to height)
                    drawH = canvasH;
                    drawW = canvasH * imgRatio;
                    offsetX = (canvasW - drawW) / 2;
                    offsetY = 0;
                } else {
                    // Image is taller than canvas viewport
                    drawW = canvasW;
                    drawH = canvasW / imgRatio;
                    offsetX = 0;
                    offsetY = (canvasH - drawH) / 2;
                }

                ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
            }
        };

        const unsubscribe = smoothFrameIndex.on("change", (latest) => {
            render(latest);
        });

        const handleResize = () => {
            requestAnimationFrame(() => {
                render(smoothFrameIndex.get());
            });
        };

        window.addEventListener("resize", handleResize);
        
        // Initial render
        requestAnimationFrame(() => {
            render(smoothFrameIndex.get());
        });

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [images, firstFrameLoaded, smoothFrameIndex]);

    return (
        <div className="absolute inset-0 z-0">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
            />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#00050A] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#00050A] to-transparent pointer-events-none" />
        </div>
    );
}
