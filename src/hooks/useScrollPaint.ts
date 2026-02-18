import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface ScrollPaintOptions {
  offsetIn?: string;
  offsetOut?: string;
  xDrift?: number;
  yDrift?: number;
}

interface ScrollPaintResult {
  ref: React.RefObject<HTMLDivElement>;
  style: {
    opacity: MotionValue<number>;
    x: MotionValue<number>;
    y: MotionValue<number>;
    scale: MotionValue<number>;
  };
}

export const useScrollPaint = (options: ScrollPaintOptions = {}): ScrollPaintResult => {
  const {
    xDrift = 30,
    yDrift = 40,
  } = options;

  const ref = useRef<HTMLDivElement>(null!);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "end 0.05"],
  });

  // Paint in: 0 → 0.3 of progress
  // Visible: 0.3 → 0.7
  // Vanish: 0.7 → 1.0
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [yDrift, 0, 0, -yDrift]);
  const x = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [xDrift, 0, 0, -xDrift * 0.5]);
  const scale = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.95, 1, 1, 0.97]);

  return { ref, style: { opacity, x, y, scale } };
};
