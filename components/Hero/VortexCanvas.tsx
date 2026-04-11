"use client";

import { useEffect, useRef } from "react";
import { MotionValue } from "framer-motion";

export default function VortexCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const videoRef  = useRef<HTMLVideoElement>(null);
    const rafRef    = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const video  = videoRef.current;
        if (!canvas || !video) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const resize = () => {
            const dpr  = Math.min(window.devicePixelRatio || 1, 2);
            const rect = canvas.getBoundingClientRect();
            const w    = Math.floor(rect.width  * dpr);
            const h    = Math.floor(rect.height * dpr);
            if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
                canvas.width  = w;
                canvas.height = h;
            }
        };

        const draw = () => {
            if (video.readyState < 2) return;
            resize();
            const cW = canvas.width, cH = canvas.height;
            if (!cW || !cH) return;
            const vW = video.videoWidth, vH = video.videoHeight;
            if (!vW || !vH) return;

            // object-cover
            const cr = cW / cH, ir = vW / vH;
            let dW: number, dH: number, oX: number, oY: number;
            if (ir > cr) { dH = cH; dW = cH * ir; oX = (cW - dW) / 2; oY = 0; }
            else         { dW = cW; dH = cW / ir; oX = 0; oY = (cH - dH) / 2; }

            ctx.clearRect(0, 0, cW, cH);
            ctx.drawImage(video, oX, oY, dW, dH);
        };

        // RAF loop — draws every frame
        const loop = () => { draw(); rafRef.current = requestAnimationFrame(loop); };
        rafRef.current = requestAnimationFrame(loop);

        // Direct scroll → video time (no spring, instant response)
        const unsub = scrollYProgress.on("change", (val) => {
            if (video.duration && video.readyState >= 2) {
                video.currentTime = Math.min(Math.max(val, 0), 0.9999) * video.duration;
            }
        });

        window.addEventListener("resize", resize);

        return () => {
            cancelAnimationFrame(rafRef.current);
            unsub();
            window.removeEventListener("resize", resize);
        };
    }, [scrollYProgress]);

    return (
        <div className="absolute inset-0 z-0">
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
