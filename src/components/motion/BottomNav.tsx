import { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export const BottomNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show nav after hero
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  return (
    <>
      {/* Bottom bar */}
      <nav
        className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
        aria-label="Main navigation"
      >
        <div className="glass-nav rounded-full px-3 py-2 flex items-center gap-2 shadow-lg shadow-background/50">
          {/* Menu */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-secondary/50 transition-colors text-sm font-medium"
            aria-label="Open menu"
          >
            <Menu className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Menu</span>
          </button>

          {/* Logo */}
          <a href="#hero" className="font-display text-sm px-3">
            CUATRE
          </a>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors"
          >
            Contact
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </nav>

      {/* Full-screen menu overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5">
              <span className="font-display text-lg">CUATRE</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary/50 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  className="group font-display text-3xl sm:text-4xl py-3 border-b border-border/20 flex items-center justify-between hover:text-primary transition-colors"
                >
                  {link.label}
                  <span className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </nav>

            {/* Bottom */}
            <div className="px-8 pb-8 safe-bottom">
              <a
                href="#contact"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary w-full py-4 text-center text-sm"
              >
                Start a Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
