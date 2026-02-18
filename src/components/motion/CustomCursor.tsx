import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

interface CustomCursorProps {
  containerRef: React.RefObject<HTMLElement>;
}

export const CustomCursor = ({ containerRef }: CustomCursorProps) => {
  const [visible, setVisible] = useState(false);

  // Glow follows with smooth lag
  const glowX = useSpring(0, { stiffness: 120, damping: 22, mass: 0.8 });
  const glowY = useSpring(0, { stiffness: 120, damping: 22, mass: 0.8 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      glowX.set(e.clientX);
      glowY.set(e.clientY);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [containerRef, glowX, glowY]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      {/* Subtle red ambient glow — floats behind cursor */}
      <motion.div
        className="fixed top-0 left-0 rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          width: 180,
          height: 180,
          background:
            "radial-gradient(circle, hsl(0 88% 40% / 0.13) 0%, hsl(0 88% 40% / 0.05) 45%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
    </div>
  );
};

