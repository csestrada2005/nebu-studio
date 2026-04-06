import { useRef, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface GlassTiltCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  maxTilt?: number;
}

export const GlassTiltCard = ({
  children,
  className = "",
  glowColor = "rgba(230,57,70,0.15)",
  maxTilt = 12,
}: GlassTiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const prefersReduced = useReducedMotion();

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (prefersReduced) return;
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setTilt({
        rotateX: (0.5 - y) * maxTilt,
        rotateY: (x - 0.5) * maxTilt,
      });
      setGlare({ x: x * 100, y: y * 100, opacity: 0.18 });
    },
    [maxTilt, prefersReduced]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
    >
      {/* Glass border */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-10"
        style={{
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `0 8px 32px -8px ${glowColor}, inset 0 1px 0 rgba(255,255,255,0.06)`,
        }}
      />

      {/* Light glare overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300"
        style={{
          opacity: glare.opacity,
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
};
