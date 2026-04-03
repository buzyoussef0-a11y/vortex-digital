"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * HeroLottie — Lottie animation slot for the Hero section.
 *
 * HOW TO USE:
 * 1. Place your .json animation file in /public/animations/hero-animation.json
 * 2. Install lottie-react: `npm install lottie-react`
 * 3. Uncomment the lottie-react import and <Lottie> tag below
 * 4. Delete the placeholder div
 */

// import Lottie from "lottie-react";
// import animationData from "../../public/animations/hero-animation.json";

interface HeroLottieProps {
  /** Controls the visibility / opacity of the slot */
  opacity?: number;
  /** CSS class passed from parent */
  className?: string;
}

const HeroLottie: React.FC<HeroLottieProps> = ({
  opacity = 1,
  className = "",
}) => {
  return (
    <motion.div
      style={{ opacity }}
      className={`relative flex items-center justify-center ${className}`}
    >
      {/* ─── LOTTIE ANIMATION ───────────────────────────────────────────── */}
      {/* When ready, delete the placeholder below and uncomment: */}
      {/*
      <Lottie
        animationData={animationData}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
      */}

      {/* ─── PLACEHOLDER (remove when Lottie is ready) ──────────────────── */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Outer ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute w-32 h-32 rounded-full border border-[#00E5FF]/20"
        />

        {/* Inner ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute w-20 h-20 rounded-full border border-[#00E5FF]/40"
        />

        {/* Center dot */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4 rounded-full bg-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.5)]"
        />

        {/* Orbit point */}
        <motion.div
          className="absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          style={{ width: 128, height: 128 }}
        >
          <div
            className="absolute w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_10px_rgba(0,229,255,0.8)]"
            style={{ top: 0, left: "50%", transform: "translate(-50%, -50%)" }}
          />
        </motion.div>

        {/* Label */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className="text-[9px] font-mono text-[#00E5FF]/60 tracking-[0.3em] uppercase">
            [ lottie slot ]
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroLottie;
