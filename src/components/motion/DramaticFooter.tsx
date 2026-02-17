import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const statements = [
  "BUILT FOR CONVERSION",
  "DESIGN WITH CLARITY",
  "CODE WITH DISCIPLINE",
  "SHIP FAST",
  "IMPROVE ALWAYS",
];

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const DramaticFooter = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      ref={ref}
      className="relative overflow-hidden pt-20 pb-10"
      style={{ background: "hsl(225 50% 3%)" }}
    >
      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Floating plus signs */}
      {[...Array(8)].map((_, i) => (
        <span
          key={i}
          className="absolute text-primary/10 font-light float-plus select-none pointer-events-none"
          style={{
            fontSize: `${16 + (i * 8)}px`,
            left: `${10 + (i * 12) % 80}%`,
            top: `${5 + (i * 15) % 70}%`,
            animationDelay: `${i * 0.8}s`,
          }}
          aria-hidden="true"
        >
          +
        </span>
      ))}

      <div className="container relative z-10">
        {/* Animated statements */}
        <div className="space-y-3 mb-20">
          {statements.map((statement, i) => (
            <motion.div
              key={statement}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="text-primary text-lg">+</span>
              <h3 className="font-display text-lg sm:text-2xl md:text-3xl text-foreground/80">
                {statement}
              </h3>
            </motion.div>
          ))}
        </div>

        {/* Fluid blob */}
        <div className="relative h-40 sm:h-56 mb-16 flex items-center justify-center">
          <div
            className="w-48 h-48 sm:w-64 sm:h-64 blob-morph opacity-50"
            style={{
              background: "linear-gradient(135deg, hsl(222 100% 65% / 0.3), hsl(163 56% 28% / 0.2), hsl(222 47% 15% / 0.4))",
              filter: "blur(40px)",
            }}
          />
        </div>

        {/* Bottom section */}
        <div className="border-t border-border/20 pt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
            {/* Wordmark */}
            <div>
              <h2 className="font-display text-4xl sm:text-5xl mb-2">CUATRE</h2>
              <p className="text-muted-foreground text-xs tracking-wider">
                Web Design • E-commerce • Systems
              </p>
            </div>

            {/* Links */}
            <nav className="flex gap-6" aria-label="Footer navigation">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <p className="text-center text-muted-foreground/40 text-[10px] mt-10 tracking-wider">
            © {new Date().getFullYear()} CUATRE. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
};
