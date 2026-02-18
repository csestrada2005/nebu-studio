import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";

/* ── A: Magnetic cursor / hover distortion on text ── */
const MagneticText = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const words = "PULL ME APART".split(" ");

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={containerRef}
      className="py-10 flex flex-wrap gap-3 sm:gap-5 items-center justify-center min-h-[140px] cursor-none"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {words.map((word, wi) => {
        const wordX = (wi + 0.5) * (320 / words.length);
        const wordY = 70;
        const dx = hovering ? mouse.x - wordX : 0;
        const dy = hovering ? mouse.y - wordY : 0;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const strength = Math.max(0, 1 - dist / 160);
        const pushX = dx * strength * -0.35;
        const pushY = dy * strength * -0.35;

        return (
          <motion.span
            key={wi}
            className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground"
            animate={{ x: pushX, y: pushY, color: strength > 0.3 ? "hsl(0 100% 50%)" : "hsl(0 0% 100%)" }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ── B: Kinetic typography that assembles on scroll ── */
const KineticAssemble = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });
  const letters = "ASSEMBLED".split("");

  return (
    <div ref={ref} className="py-10 flex items-center justify-center min-h-[140px]">
      <div className="flex gap-1 sm:gap-2">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            className="font-display text-3xl sm:text-5xl md:text-6xl"
            initial={{ opacity: 0, y: 60, rotateX: -90, scale: 0.5 }}
            animate={
              isInView
                ? { opacity: 1, y: 0, rotateX: 0, scale: 1, color: "hsl(0 100% 50%)" }
                : { opacity: 0, y: 60, rotateX: -90, scale: 0.5, color: "hsl(0 0% 100%)" }
            }
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 1, 0.5, 1] }}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

/* ── C: Glass card morphs (borderless) ── */
const GlassMorph = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });

  return (
    <div ref={ref} className="py-10 flex items-center justify-center min-h-[180px]" style={{ perspective: 1000 }}>
      <AnimatePresence mode="wait">
        {isInView && (
          <motion.div
            key="glass"
            initial={{ opacity: 0, scale: 0.7, rotateY: -40, y: 30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ type: "spring", damping: 20, stiffness: 200 }}
            className="w-64 p-6"
            style={{
              background: "hsl(0 0% 100% / 0.07)",
              backdropFilter: "blur(20px)",
              borderRadius: 20,
              boxShadow: "0 0 0 1px hsl(0 0% 100% / 0.08), 0 20px 60px -15px hsl(0 0% 0% / 0.4), inset 0 1px 0 hsl(0 0% 100% / 0.12)",
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full bg-primary mb-4 animate-pulse" />
            <p className="font-display text-sm text-foreground mb-2">Glass Morphism</p>
            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Backdrop blur + layered transparency. No hard borders.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── D: 3D parallax depth background ── */
const ParallaxDepth = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    });
  };

  const layers = [
    { depth: 0.8, size: 120, opacity: 0.08, x: 50, y: 45 },
    { depth: 0.5, size: 70, opacity: 0.12, x: 25, y: 60 },
    { depth: 0.3, size: 50, opacity: 0.18, x: 75, y: 30 },
    { depth: 0.15, size: 30, opacity: 0.3, x: 55, y: 55 },
  ];

  return (
    <div
      ref={ref}
      className="py-10 flex items-center justify-center min-h-[180px] relative overflow-hidden cursor-crosshair"
      onMouseMove={handleMove}
    >
      {layers.map((l, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ width: l.size, height: l.size, left: `${l.x}%`, top: `${l.y}%`, background: `hsl(0 100% 50% / ${l.opacity})` }}
          animate={{ x: mouse.x * l.depth * -20, y: mouse.y * l.depth * -15 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      ))}
      <p className="font-display text-base text-muted-foreground/60 z-10 select-none">Move cursor</p>
    </div>
  );
};

/* ── E: Reveal-on-scroll image mask (liquid wipe) ── */
const LiquidReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-40px" });

  const panels = [
    { bg: "hsl(0 0% 12%)", label: "Papachoa" },
    { bg: "hsl(0 0% 9%)", label: "Raw Paw" },
    { bg: "hsl(0 0% 11%)", label: "Jewelry" },
  ];

  return (
    <div ref={ref} className="py-10 flex items-center justify-center gap-3 min-h-[180px]">
      {panels.map((panel, i) => (
        <motion.div
          key={i}
          className="relative flex items-end justify-start p-3 overflow-hidden"
          style={{ width: 80, height: 110, borderRadius: 12, background: panel.bg }}
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={
            isInView
              ? { clipPath: "inset(0% 0% 0% 0%)" }
              : { clipPath: "inset(100% 0% 0% 0%)" }
          }
          transition={{ duration: 0.9, delay: i * 0.15, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(0 0% 0% / 0.6), transparent 60%)" }} />
          <span className="relative text-[9px] font-mono tracking-wider text-white/70">{panel.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

/* ── F: Spotlight cursor effect ── */
const SpotlightEffect = () => {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      ref={ref}
      className="py-10 flex items-center justify-center min-h-[180px] relative overflow-hidden cursor-none"
      onMouseMove={handleMove}
      style={{ background: "hsl(0 0% 4%)", borderRadius: 16 }}
    >
      {/* Spotlight */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, hsl(0 100% 50% / 0.15) 0%, transparent 70%)",
          left: `${mouse.x}%`,
          top: `${mouse.y}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{ left: `${mouse.x}%`, top: `${mouse.y}%` }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
      />

      {/* Text that gets illuminated */}
      <div className="relative z-10 text-center">
        <p className="font-display text-2xl sm:text-3xl text-white/20 leading-tight">
          LIGHT<br />FOLLOWS<br />YOU
        </p>
      </div>
    </div>
  );
};

/* ── Demo config ── */
const demos = [
  { id: "magnetic", label: "MAGNETIC TEXT", desc: "Hover distortion", component: MagneticText },
  { id: "kinetic", label: "KINETIC TYPE", desc: "Scroll assembly", component: KineticAssemble },
  { id: "glass", label: "GLASS MORPH", desc: "No hard borders", component: GlassMorph },
  { id: "parallax", label: "3D PARALLAX", desc: "Depth on cursor", component: ParallaxDepth },
  { id: "reveal", label: "LIQUID REVEAL", desc: "Ink-wipe scroll", component: LiquidReveal },
  { id: "spotlight", label: "SPOTLIGHT", desc: "Cursor light", component: SpotlightEffect },
];

/* ── Main Section ── */
export const DesignLab = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const redOpacity = useTransform(scrollYProgress, [0.05, 0.25, 0.75, 0.95], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden" id="lab">
      {/* Scroll-driven red background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: "hsl(0 100% 50%)", opacity: redOpacity }}
        aria-hidden="true"
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, hsl(0 100% 20% / 0.4) 100%)",
          opacity: redOpacity,
        }}
        aria-hidden="true"
      />

      <div className="container relative z-10 py-32 sm:py-40">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-24 sm:mb-32"
        >
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-5">
            <span className="text-primary">DESIGN</span> <span className="text-white">LAB</span>
          </h2>
          <p className="text-white/70 text-sm max-w-md leading-relaxed">
            Six live interaction demos. Every effect is possible on your project.
          </p>
        </motion.div>

        {/* Flowing demo layout — no grid boxes */}
        <div className="space-y-20 sm:space-y-24">
          {/* Row 1: 2-col */}
          <div className="grid md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
            {demos.slice(0, 2).map((demo, i) => {
              const DemoComponent = demo.component;
              return (
                <motion.div
                  key={demo.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-white/80">{demo.label}</span>
                    <div className="h-px flex-1" style={{ background: "hsl(0 0% 100% / 0.12)" }} />
                    <span className="text-[9px] text-white/40 tracking-wider">{demo.desc}</span>
                  </div>
                  <DemoComponent />
                </motion.div>
              );
            })}
          </div>

          {/* Row 2: full width + narrow */}
          <div className="grid md:grid-cols-5 gap-12 sm:gap-16">
            {demos.slice(2, 4).map((demo, i) => {
              const DemoComponent = demo.component;
              return (
                <motion.div
                  key={demo.id}
                  className={i === 0 ? "md:col-span-2" : "md:col-span-3"}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-white/80">{demo.label}</span>
                    <div className="h-px flex-1" style={{ background: "hsl(0 0% 100% / 0.12)" }} />
                    <span className="text-[9px] text-white/40 tracking-wider">{demo.desc}</span>
                  </div>
                  <DemoComponent />
                </motion.div>
              );
            })}
          </div>

          {/* Row 3: 2-col */}
          <div className="grid md:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
            {demos.slice(4, 6).map((demo, i) => {
              const DemoComponent = demo.component;
              return (
                <motion.div
                  key={demo.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.65, delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] font-mono tracking-[0.25em] text-white/80">{demo.label}</span>
                    <div className="h-px flex-1" style={{ background: "hsl(0 0% 100% / 0.12)" }} />
                    <span className="text-[9px] text-white/40 tracking-wider">{demo.desc}</span>
                  </div>
                  <DemoComponent />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
