import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [count, setCount] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const duration = 2200;
    const startTime = Date.now();
    let raf: number;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quart
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * 100));

      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(onComplete, 800);
        }, 300);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, hsl(222 100% 65%) 0%, hsl(222 47% 9%) 100%)",
          }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Noise overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Corner labels */}
          <span className="absolute top-6 left-6 text-[10px] font-mono tracking-[0.2em] text-background/60 uppercase">
            Loading
          </span>
          <span className="absolute top-6 right-6 text-[10px] font-mono tracking-[0.2em] text-background/60 uppercase">
            Please Wait
          </span>
          <span className="absolute bottom-6 left-6 text-[10px] font-mono tracking-[0.2em] text-background/60 uppercase">
            Preparing Experience
          </span>
          <span className="absolute bottom-6 right-6 text-[10px] font-mono tracking-[0.2em] text-background/60 uppercase">
            Loading Assets…
          </span>

          {/* Counter */}
          <div className="relative">
            <span
              className="font-display text-[clamp(6rem,20vw,14rem)] leading-none tabular-nums"
              style={{ color: "hsl(222 47% 9%)" }}
            >
              {String(count).padStart(2, "0")}
            </span>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-[2px] bg-background/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-background/40 rounded-full transition-none"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
