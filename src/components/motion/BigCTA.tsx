import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const BigCTA = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="cta">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 gradient-mesh opacity-60" aria-hidden="true" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl mb-6 leading-tight">
            EVERY SERIOUS BUSINESS NEEDS A SERIOUS{" "}
            <span className="text-primary">WEBSITE.</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-10 max-w-lg mx-auto leading-relaxed">
            Tell us what you're building. We'll respond with a clear plan, timeline, and a proposal you can actually execute.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#contact" className="btn-primary text-sm">
              Make it Real
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/522213497090"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-sm"
            >
              WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
