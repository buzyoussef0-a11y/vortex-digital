import { useEffect, useState, useRef } from "react";
import { useInView } from "framer-motion";

interface UseCountUpOptions {
  end: number;
  duration?: number;
  start?: number;
}

/**
 * Animates a number from `start` to `end` over `duration` ms,
 * triggered once when the returned `ref` enters the viewport.
 */
export function useCountUp({ end, duration = 2000, start = 0 }: UseCountUpOptions) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Cubic ease-out: starts fast, decelerates at the end
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(start + (end - start) * eased));

      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animFrame);
  }, [isInView, end, start, duration]);

  return { ref, count };
}
