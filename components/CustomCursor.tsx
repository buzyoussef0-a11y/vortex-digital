"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Dot position — raw, no lag
  const dotX = useMotionValue(0);
  const dotY = useMotionValue(0);

  // Ring position — smooth lerp spring
  const ringXRaw = useMotionValue(0);
  const ringYRaw = useMotionValue(0);
  const ringX = useSpring(ringXRaw, { stiffness: 120, damping: 18, mass: 0.5 });
  const ringY = useSpring(ringYRaw, { stiffness: 120, damping: 18, mass: 0.5 });

  useEffect(() => {
    // Detect touch device — hide custom cursor
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouch(true);
      return;
    }

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      ringXRaw.set(e.clientX);
      ringYRaw.set(e.clientY);

      const target = e.target as HTMLElement;
      const isPointer =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.style.cursor === "pointer" ||
        window.getComputedStyle(target).cursor === "pointer";

      const isTextInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT";

      if (isPointer) setCursorType("pointer");
      else if (isTextInput) setCursorType("text");
      else setCursorType("default");
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [dotX, dotY, ringXRaw, ringYRaw]);

  if (isTouch) return null;

  const ringSize = cursorType === "pointer" ? 48 : isClicking ? 20 : 36;
  const ringOpacity = cursorType === "pointer" ? 0.6 : 0.35;
  const ringBorder = cursorType === "text" ? "dashed" : "solid";

  return (
    <>
      {/* Main dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.5 : 1,
        }}
        transition={{ opacity: { duration: 0.2 }, scale: { type: "spring", stiffness: 400, damping: 20 } }}
      >
        <div
          className="rounded-full bg-[#00E5FF]"
          style={{
            width: 8,
            height: 8,
            marginLeft: -4,
            marginTop: -4,
            boxShadow: "0 0 10px rgba(0,229,255,0.8)",
          }}
        />
      </motion.div>

      {/* Trailing ring */}
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
        animate={{
          opacity: isVisible ? ringOpacity : 0,
          width: ringSize,
          height: ringSize,
        }}
        transition={{
          opacity: { duration: 0.2 },
          width: { type: "spring", stiffness: 300, damping: 25 },
          height: { type: "spring", stiffness: 300, damping: 25 },
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            marginLeft: `-${ringSize / 2}px`,
            marginTop: `-${ringSize / 2}px`,
            borderRadius: "50%",
            border: `1.5px ${ringBorder} rgba(0,229,255,0.9)`,
          }}
        />
      </motion.div>
    </>
  );
}
