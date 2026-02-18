import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const standards = [
  {
    id: "mobile",
    label: "Mobile-First",
    desc: "Every element is designed for thumb-first interaction before scaling up.",
  },
  {
    id: "speed",
    label: "Speed & Performance",
    desc: "Sub-2s load times, optimized assets, Core Web Vitals in the green.",
  },
  {
    id: "cro",
    label: "CRO Foundations",
    desc: "Hierarchy, trust signals, and friction removal baked into every layout.",
  },
  {
    id: "analytics",
    label: "Analytics Tracking",
    desc: "Events, funnels, and heatmaps configured from day one.",
  },
  {
    id: "seo",
    label: "SEO Baseline",
    desc: "Semantic HTML, meta structure, schema markup, and crawlability.",
  },
  {
    id: "handoff",
    label: "Clean Handoff",
    desc: "You get the keys. Full documentation, zero black boxes.",
  },
];

export const StandardsSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="standards">
      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          className="mb-16 sm:mb-20 max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-4">
            Standards
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-5">
            THINGS WE DON'T{" "}
            <span className="text-primary">NEGOTIATE ON.</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
            These aren't features you unlock on a higher tier. They're the baseline — 
            the floor, not the ceiling.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ border: "1px solid hsl(0 0% 100% / 0.07)" }}>
          {standards.map((item, i) => (
            <motion.div
              key={item.id}
              className="group relative p-7 sm:p-8 hover:bg-primary/[0.04] transition-colors duration-300"
              style={{ borderRight: "1px solid hsl(0 0% 100% / 0.07)", borderBottom: "1px solid hsl(0 0% 100% / 0.07)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              {/* Number */}
              <span className="block font-mono text-[10px] tracking-[0.25em] text-primary/40 mb-4 group-hover:text-primary/70 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Label */}
              <h3 className="font-display text-lg sm:text-xl mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {item.label}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-0 h-px bg-primary"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                style={{ transformOrigin: "left", width: "100%" }}
                transition={{ duration: 0.35 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
