/**
 * FeaturedWork — "Our Work" floating circle gallery
 *
 * 6 projects as floating circles. Click expands circle → rectangle showing full image.
 */

import { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { X } from "lucide-react";

import workPapachoa from "@/assets/work-papachoa.png";
import workBazar from "@/assets/work-bazar.png";
import workJewelry from "@/assets/work-jewelry.png";
import workRawpaw from "@/assets/work-rawpaw.png";
import workSystem from "@/assets/work-system.png";
import workArmahas from "@/assets/work-armahas.png";

const PROJECTS = [
  { id: "papachoa", title: "Papachoa", image: workPapachoa },
  { id: "bazar", title: "Bazar Centenario", image: workBazar },
  { id: "jewelry", title: "Joyería Centenario", image: workJewelry },
  { id: "rawpaw", title: "Raw Paw", image: workRawpaw },
  { id: "system", title: "Custom System", image: workSystem },
  { id: "armahas", title: "Armahas", image: workArmahas },
];

type Project = (typeof PROJECTS)[number];

// Floating positions for each circle — spread across the section
const POSITIONS = [
  { top: "8%", left: "15%" },
  { top: "5%", left: "58%" },
  { top: "38%", left: "35%" },
  { top: "35%", left: "72%" },
  { top: "65%", left: "16%" },
  { top: "62%", left: "60%" },
];

// ── Floating Circle ──────────────────────────────────────────────────────────
const FloatingCircle = ({
  project,
  position,
  index,
  onOpen,
}: {
  project: Project;
  position: { top: string; left: string };
  index: number;
  onOpen: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="absolute cursor-pointer group"
      style={{ top: position.top, left: position.left }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.7 }
      }
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 1, 0.5, 1],
      }}
      onClick={onOpen}
    >
      {/* Floating animation */}
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3 + index * 0.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center"
      >
        {/* Circle image */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300 relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 rounded-full bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />
        </div>

        {/* Title below */}
        <motion.span
          className="mt-3 text-xs sm:text-sm font-display text-foreground/70 group-hover:text-primary transition-colors duration-300 text-center whitespace-nowrap"
        >
          {project.title}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

// ── Expanded View (circle → rectangle) ───────────────────────────────────────
const ExpandedView = ({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 cursor-pointer"
        style={{
          background: "hsl(0 0% 4% / 0.92)",
          backdropFilter: "blur(12px)",
        }}
        onClick={onClose}
      />

      {/* Image container — scale-based morph */}
      <motion.div
        className="relative z-10 w-[90vw] max-w-[1000px] overflow-hidden"
        style={{ aspectRatio: "16/10" }}
        initial={{ scale: 0.15, borderRadius: "50%", opacity: 0 }}
        animate={{ scale: 1, borderRadius: "12px", opacity: 1 }}
        exit={{ scale: 0.15, borderRadius: "50%", opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {/* Close button */}
        <motion.button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-3 right-3 z-20 w-9 h-9 flex items-center justify-center rounded-full"
          style={{ background: "hsl(0 0% 0% / 0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.1 }}
        >
          <X className="w-4 h-4 text-white" />
        </motion.button>

        {/* Image */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Title */}
      <motion.p
        className="absolute bottom-8 font-display text-xl sm:text-2xl text-white/80 z-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 12 }}
        transition={{ delay: 0.35, duration: 0.3 }}
      >
        {project.title}
      </motion.p>
    </motion.div>
  );
};

// ── Main Export ───────────────────────────────────────────────────────────────
export const FeaturedWork = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <>
      <section
        ref={ref}
        className="py-24 sm:py-32 relative overflow-hidden"
        id="work"
        style={{ minHeight: "100vh" }}
      >
        <div className="container relative z-10">
          {/* Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
              Our <span className="text-primary">Work.</span>
            </h2>
          </motion.div>
        </div>

        {/* Floating circles area */}
        <div className="relative w-full" style={{ height: "clamp(500px, 70vh, 800px)" }}>
          {PROJECTS.map((project, i) => (
            <FloatingCircle
              key={project.id}
              project={project}
              position={POSITIONS[i]}
              index={i}
              onOpen={() => setActiveProject(project)}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="container relative z-10">
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="text-sm text-muted-foreground">
              Want yours next?{" "}
              <a
                href="#contact"
                className="font-display text-foreground hover:text-primary transition-colors duration-200 underline underline-offset-4"
              >
                Let's talk.
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Expanded overlay — portal to avoid ancestor transforms breaking fixed positioning */}
      {createPortal(
        <AnimatePresence>
          {activeProject && (
            <ExpandedView
              key={activeProject.id}
              project={activeProject}
              onClose={() => setActiveProject(null)}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
