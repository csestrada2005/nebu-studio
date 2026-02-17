import { useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";
import { GeometryCanvas } from "@/components/motion/GeometryCanvas";
import { motion } from "framer-motion";

export const HeroSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 100,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 100,
    });
  }, []);

  return (
    <section
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      id="hero"
    >
      {/* Background */}
      <div className="absolute inset-0 grid-bg" aria-hidden="true" />
      <div
        className="absolute top-0 left-0 right-0 h-[70%] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, hsl(222 100% 65% / 0.08), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center min-h-[100dvh] py-24">
          {/* Left: Copy */}
          <div className="relative">
            {/* Vertical divider on desktop */}
            <div className="hidden lg:block absolute -right-2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-border to-transparent" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-muted-foreground text-xs tracking-[0.2em] uppercase mb-6 font-medium"
            >
              Web Design & Development Studio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95] mb-6"
            >
              BUILD YOUR
              <br />
              NEXT WEBSITE
              <br />
              <span className="text-primary">LIKE A PRODUCT.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-muted-foreground text-sm sm:text-base max-w-md mb-8 leading-relaxed"
            >
              Cuatre designs and builds high-converting websites, e-commerce, and lightweight systems for SMBs. Fast delivery. Clear process. Real results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <a href="#contact" className="btn-primary text-sm">
                Get a Proposal
                <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#work" className="btn-ghost text-sm">
                View Work
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-muted-foreground/60 text-[11px] tracking-wide"
            >
              15-day delivery available • Mobile-first • CRO-focused
            </motion.p>
          </div>

          {/* Right: Canvas */}
          <div className="relative h-[400px] lg:h-[500px]">
            <GeometryCanvas mouseX={mousePos.x} mouseY={mousePos.y} />

            {/* Central glow */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, hsl(222 100% 65% / 0.12), transparent 70%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
