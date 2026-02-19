import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const menuLinks = [
  { label: "Home", id: "hero" },
  { label: "What We Build", id: "modes" },
  { label: "Design Lab", id: "lab" },
  { label: "How We Work", id: "process" },
  { label: "Results", id: "growth" },
  { label: "Our Projects", id: "work" },
  { label: "Standards", id: "standards" },
  { label: "Contact", id: "contact" },
];

export const TopMenu = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* Top bar */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 sm:px-8"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        style={{
          height: 56,
          background: scrolled
            ? "hsl(var(--background) / 0.7)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px) saturate(1.4)" : "none",
          borderBottom: scrolled
            ? "1px solid hsl(0 0% 100% / 0.06)"
            : "1px solid transparent",
          transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        }}
      >
        <span className="font-display text-sm tracking-[0.15em] text-foreground">
          NEBU STUDIO
        </span>

        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-[18px] h-[18px] text-foreground" />
        </button>
      </motion.header>

      {/* Fullscreen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[100] flex flex-col"
            style={{
              background: "hsl(var(--background) / 0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-8" style={{ height: 56 }}>
              <span className="font-display text-sm tracking-[0.15em] text-foreground">
                NEBU STUDIO
              </span>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-primary/10 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-[18px] h-[18px] text-foreground" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 gap-0">
              {menuLinks.map((link, i) => (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group text-left font-display text-2xl sm:text-4xl md:text-5xl py-3 sm:py-4 border-b flex items-center justify-between hover:text-primary transition-colors duration-300"
                  style={{ borderColor: "hsl(0 0% 100% / 0.07)" }}
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] font-mono tracking-[0.2em] text-muted-foreground/40 group-hover:text-primary/60 transition-colors">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Bottom CTA */}
            <motion.div
              className="px-8 sm:px-12 pb-8 safe-bottom"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <button
                onClick={() => scrollTo("contact")}
                className="btn-primary w-full py-4 text-center text-sm"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
