import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const phases = [
  {
    id: "discovery",
    title: "DISCOVERY",
    bullets: ["Stakeholder interviews", "Competitive analysis", "Goal definition"],
  },
  {
    id: "strategy",
    title: "STRATEGY",
    bullets: ["User journey mapping", "Content architecture", "Conversion planning"],
  },
  {
    id: "design",
    title: "DESIGN",
    bullets: ["Visual direction", "High-fidelity mockups", "Prototype review"],
  },
  {
    id: "build",
    title: "BUILD",
    bullets: ["Development", "Animations", "Integrations"],
  },
  {
    id: "polish",
    title: "POLISH",
    bullets: ["QA testing", "Performance tuning", "Copy refinement"],
  },
  {
    id: "launch",
    title: "LAUNCH",
    bullets: ["Deployment", "Analytics setup", "Handoff documentation"],
  },
];

export const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [viewMode, setViewMode] = useState<"timeline" | "grid">("timeline");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 relative" id="process">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">
            A PROCESS THAT <span className="text-primary">SHIPS.</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mb-6">
            You don't need everything figured out. We structure, design, build, and launch with speed and clarity.
          </p>
          <div className="flex gap-3 items-center">
            <a href="#contact" className="btn-primary text-sm">Schedule Call</a>
            <button
              onClick={() => setViewMode(viewMode === "timeline" ? "grid" : "timeline")}
              className="btn-ghost text-xs px-4 py-2"
            >
              {viewMode === "timeline" ? "Grid View" : "Timeline View"}
            </button>
          </div>
        </motion.div>

        {viewMode === "timeline" ? (
          /* Timeline View */
          <div className="relative mt-16">
            {/* Animated progress line */}
            <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px bg-border/30">
              <motion.div
                className="absolute top-0 left-0 w-full bg-primary"
                style={{ height: lineHeight }}
              />
            </div>

            <div className="space-y-6">
              {phases.map((phase, i) => (
                <motion.div
                  key={phase.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className={`relative flex gap-6 sm:gap-8 group ${
                    i % 2 === 0 ? "" : ""
                  }`}
                >
                  {/* Circle indicator */}
                  <div className="relative z-10 flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-border/50 bg-background flex items-center justify-center group-hover:border-primary/60 transition-colors">
                    <span className="font-display text-[10px] text-muted-foreground group-hover:text-primary transition-colors">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Card */}
                  <div
                    className={`flex-1 p-5 sm:p-6 rounded-lg border transition-all duration-300 group-hover:-translate-y-0.5 ${
                      i === 3
                        ? "bg-primary/10 border-primary/30"
                        : "bg-card/40 border-border/30 group-hover:border-primary/20"
                    }`}
                  >
                    <h3 className="font-display text-base sm:text-lg mb-3 group-hover:text-primary transition-colors">
                      {phase.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {phase.bullets.map((bullet) => (
                        <span key={bullet} className="text-muted-foreground text-xs">
                          {bullet}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          /* Grid View */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-16">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`p-5 rounded-lg border transition-all hover:border-primary/30 ${
                  i === 3 ? "bg-primary/10 border-primary/30" : "bg-card/40 border-border/30"
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-display text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-sm">{phase.title}</h3>
                </div>
                <div className="space-y-1">
                  {phase.bullets.map((b) => (
                    <p key={b} className="text-muted-foreground text-xs">{b}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
