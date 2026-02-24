import { useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const steps = [
  { id: "audit", number: "01", title: "Audit & Strategy", desc: "We dissect your market, audience, and competitors to build on real insight." },
  { id: "ux", number: "02", title: "UX Structure", desc: "Information architecture designed for how users actually think and move." },
  { id: "design", number: "03", title: "Design System", desc: "A premium visual identity built for consistency, speed, and brand authority." },
  { id: "build", number: "04", title: "Build & Integrations", desc: "Clean code, fluid motion, and every integration you need — shipped fast." },
  { id: "launch", number: "05", title: "Launch & Optimize", desc: "We track, test, and improve what matters after go-live." },
];

export const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(Math.floor(v * steps.length), steps.length - 1);
    setActiveIndex(idx);
  });

  return (
    <div ref={containerRef} style={{ height: `${steps.length * 80}vh` }} id="process">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Always-visible title */}
        <div className="absolute top-12 left-0 right-0 flex justify-center z-10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-primary">
            How we work.
          </h2>
        </div>

        {/* Active step — no overlap, instant swap */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <span className="font-mono text-[11px] tracking-[0.3em] text-primary mb-4">
            {steps[activeIndex].number}
          </span>
          <h3 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground text-center leading-none mb-4">
            {steps[activeIndex].title}
          </h3>
          <p className="text-muted-foreground text-sm sm:text-base max-w-md text-center leading-relaxed">
            {steps[activeIndex].desc}
          </p>
        </div>

        {/* Progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
          {steps.map((step, i) => (
            <div
              key={step.id}
              className={`w-2 h-2 rounded-full bg-primary transition-all duration-200 ${
                i === activeIndex ? "opacity-100 scale-125" : "opacity-25 scale-75"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
