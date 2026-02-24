import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sections = [
{ id: "hero", label: "Home" },
{ id: "services", label: "Services" },
{ id: "lab", label: "Design Lab" },
{ id: "process", label: "Process" },
{ id: "growth", label: "Impact" },
{ id: "contact", label: "Let's Talk" }];


export const SectionNav = () => {
  const [active, setActive] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(scrollY > 200);

      let current = sections[0].id;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 200;
          if (scrollY >= top) current = section.id;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible &&
      <motion.nav
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.4 }}
        className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3 items-end"
        aria-label="Section navigation">

          {sections.map((section) => {
          const isActive = active === section.id;
          return (
            <button
              key={section.id}
              onClick={() => scrollTo(section.id)}
              className="group flex items-center gap-2.5 cursor-pointer"
              aria-label={`Go to ${section.label}`}>

                {/* Label */}
                










                {/* Dot */}
                <motion.div
                className="rounded-full flex-shrink-0 transition-all duration-300"
                animate={{
                  width: isActive ? 24 : 5,
                  height: 5,
                  backgroundColor: isActive ?
                  "hsl(var(--primary))" :
                  "hsl(0 0% 100% / 0.25)"
                }} />

              </button>);

        })}
        </motion.nav>
      }
    </AnimatePresence>);

};