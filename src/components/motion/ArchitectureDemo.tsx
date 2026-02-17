import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const METRICS = [
  { label: "Active Users", end: 1247, prefix: "", suffix: "" },
  { label: "Monthly Revenue", end: 483, prefix: "$", suffix: "K" },
  { label: "Uptime", end: 9997, prefix: "", suffix: "%", divisor: 100 },
];

const BAR_HEIGHTS = [65, 85, 45, 90, 70];

export const ArchitectureDemo = () => {
  const [phase, setPhase] = useState<"idle" | "refreshing" | "live">("idle");
  const [counts, setCounts] = useState([0, 0, 0]);
  const [hovered, setHovered] = useState(false);
  const animRef = useRef<number[]>([]);

  const animateCounters = useCallback(() => {
    if (phase === "refreshing") return;
    setPhase("refreshing");
    setCounts([0, 0, 0]);

    const duration = 1800;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);

      setCounts(METRICS.map((m) => Math.floor(eased * m.end)));

      if (progress < 1) {
        animRef.current[0] = requestAnimationFrame(tick);
      } else {
        setPhase("live");
      }
    };

    animRef.current[0] = requestAnimationFrame(tick);
  }, [phase]);

  useEffect(() => {
    return () => animRef.current.forEach(cancelAnimationFrame);
  }, []);

  const formatValue = (i: number, val: number) => {
    const m = METRICS[i];
    const display = m.divisor ? (val / m.divisor).toFixed(2) : val.toLocaleString();
    return `${m.prefix}${display}${m.suffix}`;
  };

  return (
    <div
      className="relative py-6 flex flex-col items-center min-h-[280px] select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dashboard card */}
      <div
        className="w-full max-w-sm mx-auto relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, hsl(222 40% 12% / 0.6), hsl(222 40% 8% / 0.4))",
          backdropFilter: "blur(20px)",
          border: "1px solid hsl(222 100% 65% / 0.1)",
          borderRadius: "1rem",
          padding: "20px",
          boxShadow: "0 12px 40px hsl(222 100% 10% / 0.4)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{ background: phase === "live" ? "hsl(163 56% 50%)" : "hsl(222 100% 65%)" }}
              animate={phase === "live" ? { boxShadow: ["0 0 0px hsl(163 56% 50% / 0)", "0 0 10px hsl(163 56% 50% / 0.6)", "0 0 0px hsl(163 56% 50% / 0)"] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[9px] tracking-[0.2em] uppercase text-muted-foreground/50 font-mono">
              {phase === "live" ? "Live" : phase === "refreshing" ? "Loading..." : "Dashboard"}
            </span>
          </div>
          <button
            onClick={animateCounters}
            disabled={phase === "refreshing"}
            className="text-[9px] tracking-[0.15em] uppercase font-mono px-3 py-1 rounded-full transition-all"
            style={{
              background: "hsl(222 100% 65% / 0.08)",
              border: "1px solid hsl(222 100% 65% / 0.15)",
              color: "hsl(222 100% 70%)",
              opacity: phase === "refreshing" ? 0.4 : 1,
              cursor: phase === "refreshing" ? "not-allowed" : "pointer",
            }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* Metric rows */}
        <div className="space-y-3 mb-5">
          {METRICS.map((metric, i) => (
            <div key={metric.label} className="flex items-center justify-between">
              <span className="text-[10px] font-mono tracking-wider text-muted-foreground/50">{metric.label}</span>
              <motion.span
                className="text-sm font-mono font-semibold"
                style={{ color: i === 0 ? "hsl(190 90% 60%)" : i === 1 ? "hsl(163 56% 55%)" : "hsl(270 80% 70%)" }}
                animate={phase === "live" ? { opacity: [1, 0.7, 1] } : {}}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                {phase === "idle" ? "—" : formatValue(i, counts[i])}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Separator */}
        <div className="h-px mb-4" style={{ background: "linear-gradient(90deg, transparent, hsl(222 100% 65% / 0.12), transparent)" }} />

        {/* Mini bar chart */}
        <div className="flex items-end gap-2 h-16 px-2">
          {BAR_HEIGHTS.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-sm"
              style={{
                background: `linear-gradient(to top, hsl(222 100% 65% / 0.3), hsl(222 100% 65% / 0.08))`,
                boxShadow: phase === "live" ? `0 0 8px hsl(222 100% 65% / 0.15)` : "none",
              }}
              initial={{ height: 0 }}
              animate={{
                height: phase !== "idle" ? `${h}%` : "4px",
              }}
              transition={{
                duration: 0.8,
                delay: phase === "refreshing" ? i * 0.1 : 0,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Chart label */}
        <p className="text-[8px] font-mono tracking-[0.2em] uppercase text-muted-foreground/25 mt-2 text-center">
          Weekly Growth
        </p>
      </div>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && phase === "live" && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute bottom-2 right-2 sm:right-4 max-w-[220px]"
            style={{
              background: "linear-gradient(135deg, hsl(222 40% 12% / 0.8), hsl(222 40% 8% / 0.6))",
              backdropFilter: "blur(20px)",
              border: "1px solid hsl(163 56% 45% / 0.15)",
              borderRadius: "1rem 1rem 1rem 0.25rem",
              padding: "12px 16px",
              boxShadow: "0 12px 40px hsl(222 100% 10% / 0.5)",
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[hsl(163_56%_45%)] animate-pulse" />
              <span className="text-[9px] tracking-[0.15em] uppercase text-[hsl(163_56%_55%)]">Multi-tenant</span>
            </div>
            <p className="text-xs text-foreground/70 leading-relaxed">
              Your clients see their own data. Multi-tenant. Secure.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click hint */}
      {phase === "idle" && (
        <motion.p
          className="absolute bottom-2 text-[9px] tracking-[0.2em] uppercase text-muted-foreground/25"
          animate={{ opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Click Refresh to see live data
        </motion.p>
      )}
    </div>
  );
};
