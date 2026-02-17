import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const services = [
  {
    title: "WEBSITES",
    subtitle: "High-converting",
    bullets: ["Custom design systems", "Conversion-optimized UX", "Performance-first builds"],
    geometry: "hex",
  },
  {
    title: "E-COMMERCE",
    subtitle: "Shopify & Custom",
    bullets: ["Product page optimization", "Checkout flow design", "Inventory integration"],
    geometry: "square",
  },
  {
    title: "SYSTEMS",
    subtitle: "CRM / Portals / Automations",
    bullets: ["Custom dashboards", "Workflow automation", "API integrations"],
    geometry: "circle",
  },
  {
    title: "LANDING PAGES",
    subtitle: "Campaign-ready",
    bullets: ["A/B test ready", "Lead capture flows", "Analytics integration"],
    geometry: "triangle",
  },
];

const GeometryIcon = ({ type, className = "" }: { type: string; className?: string }) => {
  return (
    <svg viewBox="0 0 40 40" className={`w-10 h-10 ${className}`} aria-hidden="true">
      {type === "hex" && (
        <polygon
          points="20,4 36,12 36,28 20,36 4,28 4,12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      )}
      {type === "square" && (
        <rect x="6" y="6" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1" />
      )}
      {type === "circle" && (
        <>
          <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
          <circle cx="20" cy="20" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
        </>
      )}
      {type === "triangle" && (
        <polygon points="20,4 36,36 4,36" fill="none" stroke="currentColor" strokeWidth="1" />
      )}
    </svg>
  );
};

export const ServicesSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="services">
      {/* Scanning bar effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent scan-bar" />
      </div>

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl mb-4">
            WHAT WE <span className="text-primary">BUILD</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md">
            Strategic digital products designed around your business goals.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative p-6 sm:p-8 rounded-lg border transition-all duration-300 hover:-translate-y-1 ${
                i % 3 === 0
                  ? "bg-card/60 border-border/40 hover:border-primary/30"
                  : "bg-secondary/30 border-border/30 hover:border-primary/30"
              }`}
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 rounded-lg bg-primary/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl mb-1 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground text-xs">{service.subtitle}</p>
                  </div>
                  <GeometryIcon
                    type={service.geometry}
                    className="text-primary/30 group-hover:text-primary/60 transition-colors group-hover:rotate-12 duration-500"
                  />
                </div>

                <ul className="space-y-2 mt-5">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-1 h-1 rounded-full bg-primary/50 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
