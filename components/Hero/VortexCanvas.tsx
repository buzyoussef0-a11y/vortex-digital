"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, MotionValue, useTransform } from "framer-motion";

// Desktop sequence
const DESKTOP_BASE  = '/images/vortex/';
const DESKTOP_TOTAL = 146;
const DESKTOP_PREFIX = 'frame_';

// Mobile sequence (< 768px)
const MOBILE_BASE   = '/images/mobile/';
const MOBILE_TOTAL  = 154;
const MOBILE_PREFIX = 'ezgif-frame-';

function getIsMobile() {
    if (typeof window === 'undefined') return false;
    return window.innerWidth < 768;
}

export default function VortexCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [ready, setReady] = useState(false);
    const [isMobile, setIsMobile] = useState(getIsMobile);

    const totalFrames = isMobile ? MOBILE_TOTAL : DESKTOP_TOTAL;
    const baseUrl     = isMobile ? MOBILE_BASE   : DESKTOP_BASE;
    const framePrefix = isMobile ? MOBILE_PREFIX : DESKTOP_PREFIX;

    // Smooth scroll → frame index
    const frameIndex      = useTransform(scrollYProgress, [0, 1], [1, totalFrames]);
    const smoothFrameIndex = useSpring(frameIndex, { stiffness: 300, damping: 30, restDelta: 0.001 });

    // Handle resize
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Preload images when sequence changes
    useEffect(() => {
        setReady(false);
        imagesRef.current = [];

        const loadedImages: HTMLImageElement[] = [];
        let firstLoaded = false;

        for (let i = 1; i <= totalFrames; i++) {
            const img = new Image();
            img.src = `${baseUrl}${framePrefix}${i.toString().padStart(3, '0')}.jpg`;
            if (i === 1) {
                img.onload = () => {
                    if (!firstLoaded) {
                        firstLoaded = true;
                        imagesRef.current = loadedImages;
                        setReady(true);
                    }
                };
                img.onerror = () => {
                    console.error('Failed to load frame 1 from:', img.src);
                };
            }
            loadedImages.push(img);
        }
    }, [baseUrl, totalFrames, framePrefix]);

    // Canvas drawing
    useEffect(() => {
        if (!ready || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const render = (index: number) => {
            const imgs = imagesRef.current;
            if (!imgs.length) return;

            const imgIndex = Math.min(Math.max(Math.floor(index) - 1, 0), imgs.length - 1);
            const img = imgs[imgIndex];
            if (!img || !img.complete || !img.naturalWidth) return;

            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            const targetW = Math.floor(rect.width  * dpr);
            const targetH = Math.floor(rect.height * dpr);

            if (canvas.width !== targetW || canvas.height !== targetH) {
                canvas.width  = targetW;
                canvas.height = targetH;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // object-cover
            const cW = canvas.width, cH = canvas.height;
            const iW = img.naturalWidth, iH = img.naturalHeight;
            const cR = cW / cH, iR = iW / iH;
            let dW: number, dH: number, oX: number, oY: number;

            if (iR > cR) {
                dH = cH; dW = cH * iR;
                oX = (cW - dW) / 2; oY = 0;
            } else {
                dW = cW; dH = cW / iR;
                oX = 0; oY = (cH - dH) / 2;
            }

            ctx.drawImage(img, oX, oY, dW, dH);
        };

        // Initial render
        requestAnimationFrame(() => render(smoothFrameIndex.get()));

        const unsub = smoothFrameIndex.on("change", render);

        const onResize = () => requestAnimationFrame(() => render(smoothFrameIndex.get()));
        window.addEventListener("resize", onResize);

        return () => {
            unsub();
            window.removeEventListener("resize", onResize);
        };
    }, [ready, smoothFrameIndex]);

    return (
        <div className="absolute inset-0 z-0">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#00050A] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#00050A] to-transparent pointer-events-none" />
        </div>
    );
}
