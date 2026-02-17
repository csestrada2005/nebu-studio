import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const projects = [
  {
    name: "Project Alpha",
    tags: ["WEB", "UI/UX", "CRO"],
  },
  {
    name: "Project Beta",
    tags: ["ECOMMERCE", "SHOPIFY"],
  },
  {
    name: "Project Gamma",
    tags: ["LANDING PAGE", "CAMPAIGNS"],
  },
  {
    name: "Project Delta",
    tags: ["SYSTEM", "CRM", "PORTAL"],
  },
];

const FloatingGeometry = ({ index }: { index: number }) => {
  const shapes = [
    <rect key="r" x="2" y="2" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="0.5" transform="rotate(15 12 12)" />,
    <circle key="c" cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />,
    <polygon key="p" points="12,2 22,22 2,22" fill="none" stroke="currentColor" strokeWidth="0.5" />,
    <polygon key="h" points="12,2 21,7 21,17 12,22 3,17 3,7" fill="none" stroke="currentColor" strokeWidth="0.5" />,
  ];
  return (
    <svg viewBox="0 0 24 24" className="w-16 h-16 text-primary/15 absolute" aria-hidden="true"
      style={{
        top: `${10 + (index * 20) % 60}%`,
        right: `${5 + (index * 15) % 30}%`,
        transform: `rotate(${index * 30}deg)`,
      }}
    >
      {shapes[index % shapes.length]}
    </svg>
  );
};

export const FeaturedWork = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      ref={ref}
      className="py-24 sm:py-32 relative"
      id="work"
      style={{
        background: "linear-gradient(180deg, hsl(222 47% 9%), hsl(222 47% 11%), hsl(222 47% 9%))",
      }}
    >
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl mb-16"
        >
          FEATURED <span className="text-primary">WORK</span>
        </motion.h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ y: i % 2 === 0 ? y1 : y2 }}
              className="group relative overflow-hidden rounded-lg border border-border/30 hover:border-primary/30 transition-colors"
            >
              {/* Image placeholder with shimmer */}
              <div className="relative aspect-[16/10] bg-card/60 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-card/50" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/5 to-transparent"
                    style={{ animation: "shimmer 3s infinite" }}
                  />
                </div>

                {/* Floating geometry */}
                <FloatingGeometry index={i} />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-xs font-medium tracking-wider uppercase text-muted-foreground">
                    View Case Study →
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-base mb-2">{project.name}</h3>
                <div className="flex gap-2 flex-wrap">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] tracking-wider uppercase text-muted-foreground border border-border/40 rounded px-2 py-0.5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
