"use client";

import { useEffect, useRef } from "react";
import { useSpring, MotionValue } from "framer-motion";

export default function VortexCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef  = useRef<HTMLVideoElement>(null);

    const smoothScroll = useSpring(scrollYProgress, { stiffness: 300, damping: 30, restDelta: 0.001 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const video  = videoRef.current;
        if (!canvas || !video) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const drawFrame = () => {
            if (video.readyState < 2) return;

            const dpr   = Math.min(window.devicePixelRatio || 1, 2);
            const rect  = canvas.getBoundingClientRect();
            const targetW = Math.floor(rect.width  * dpr);
            const targetH = Math.floor(rect.height * dpr);

            if (canvas.width !== targetW || canvas.height !== targetH) {
                canvas.width  = targetW;
                canvas.height = targetH;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // object-cover scaling
            const cW = canvas.width, cH = canvas.height;
            const iW = video.videoWidth, iH = video.videoHeight;
            if (!iW || !iH) return;

            const cR = cW / cH, iR = iW / iH;
            let dW: number, dH: number, oX: number, oY: number;
            if (iR > cR) {
                dH = cH; dW = cH * iR; oX = (cW - dW) / 2; oY = 0;
            } else {
                dW = cW; dH = cW / iR; oX = 0; oY = (cH - dH) / 2;
            }

            ctx.drawImage(video, oX, oY, dW, dH);
        };

        // Draw whenever video seeks to new frame
        video.addEventListener("seeked",      drawFrame);
        video.addEventListener("loadeddata",  drawFrame);

        // Map scroll → video time
        const unsub = smoothScroll.on("change", (val) => {
            if (video.duration) {
                video.currentTime = Math.min(val, 0.9999) * video.duration;
            }
        });

        const onResize = () => drawFrame();
        window.addEventListener("resize", onResize);

        return () => {
            unsub();
            video.removeEventListener("seeked",     drawFrame);
            video.removeEventListener("loadeddata", drawFrame);
            window.removeEventListener("resize",    onResize);
        };
    }, [smoothScroll]);

    return (
        <div className="absolute inset-0 z-0">
            {/* Hidden video — only used as pixel source for canvas */}
            <video
                ref={videoRef}
                src="/video/Web_panel_ai_chip_vortex_delpmaspu_.mp4"
                preload="auto"
                muted
                playsInline
                style={{ display: "none" }}
            />
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#00050A] to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#00050A] to-transparent pointer-events-none" />
        </div>
    );
}
