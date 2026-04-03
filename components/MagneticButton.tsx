"use client";

import React, { useRef, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  strength?: number; // 0–1 — how far it moves toward cursor (default 0.25)
  as?: "a" | "button";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  [key: string]: unknown;
}

/**
 * Wraps any element with a magnetic hover effect.
 * The element drifts toward the cursor within its bounding box.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  className = "",
  strength = 0.25,
  as,
  type,
  disabled,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.8 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = href ? "a" : "button";

  return (
    <motion.a
      // We use 'as any' here because motion generics are complex; the ref / href logic handles the actual tag
      {...(rest as any)}
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onMouseMove={handleMouseMove as any}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.a>
  );
}
