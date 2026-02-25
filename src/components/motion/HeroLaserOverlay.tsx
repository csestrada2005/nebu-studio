import { useRef, useEffect, useCallback } from "react";

/**
 * HeroLaserWipeOverlay — scroll-driven wipe covering hero TOP→BOTTOM.
 *
 * Architecture:
 * - IntersectionObserver gates the rAF loop (only runs when hero visible)
 * - Progress (0→1) computed from hero scroll position
 * - Lerp smoothing prevents jitter without adding perceptible lag
 * - All DOM updates via direct style manipulation — zero React state/re-renders
 * - Animates only transform, clip-path, opacity (compositor-friendly)
 * - Mobile: reduced glow, no box-shadow spread
 * - Reduced motion: simple opacity fade, no wipe
 */

const LERP_FACTOR = 0.14;
const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

export const HeroLaserOverlay = ({
  heroRef,
}: {
  heroRef: React.RefObject<HTMLElement | null>;
}) => {
  const wipeRef = useRef<HTMLDivElement>(null);
  const laserRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const isVisible = useRef(true);
  const currentProgress = useRef(0);
  const targetProgress = useRef(0);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Core update — called every rAF frame when hero is in view
  const tick = useCallback(() => {
    const hero = heroRef.current;
    if (!hero) {
      if (isVisible.current) rafId.current = requestAnimationFrame(tick);
      return;
    }

    const rect = hero.getBoundingClientRect();
    const heroH = rect.height;
    const scrolled = -rect.top;

    // Progress range: 5% → 75% of hero height
    const startPx = heroH * 0.05;
    const endPx = heroH * 0.75;
    const raw = Math.max(0, Math.min(1, (scrolled - startPx) / (endPx - startPx)));
    targetProgress.current = raw;

    // Lerp for smoothness
    const prev = currentProgress.current;
    const next = prev + (raw - prev) * LERP_FACTOR;
    // Snap to target if very close (avoid infinite lerp)
    const progress = Math.abs(raw - next) < 0.001 ? raw : next;
    currentProgress.current = progress;

    if (reducedMotion) {
      // Simple opacity fade
      if (rootRef.current) {
        rootRef.current.style.opacity = `${progress * 0.85}`;
      }
    } else {
      // Wipe overlay — clip from top
      if (wipeRef.current) {
        const bottomClip = (1 - progress) * 100;
        wipeRef.current.style.clipPath = `inset(0 0 ${bottomClip}% 0)`;
      }

      // Laser edge position + visibility
      if (laserRef.current) {
        const y = progress * 100;
        laserRef.current.style.transform = `translateY(${y}cqh) translateZ(0)`;
        // Fade in quickly at start, fade out near end
        const fadeIn = Math.min(1, progress * 15);
        const fadeOut = progress > 0.92 ? Math.max(0, 1 - (progress - 0.92) / 0.08) : 1;
        laserRef.current.style.opacity = `${fadeIn * fadeOut}`;
      }
    }

    if (isVisible.current) {
      rafId.current = requestAnimationFrame(tick);
    }
  }, [heroRef, reducedMotion]);

  // IntersectionObserver gates the rAF loop
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisible.current;
        isVisible.current = entry.isIntersecting;
        // Start loop when entering view
        if (entry.isIntersecting && !wasVisible) {
          rafId.current = requestAnimationFrame(tick);
        }
      },
      { rootMargin: "100px 0px 100px 0px" }
    );

    io.observe(hero);

    // Start immediately
    isVisible.current = true;
    rafId.current = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      isVisible.current = false;
      cancelAnimationFrame(rafId.current);
    };
  }, [heroRef, tick]);

  if (reducedMotion) {
    return (
      <div
        ref={rootRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 20,
          background: "hsl(var(--background))",
          opacity: 0,
          willChange: "opacity",
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 20, containerType: "size" }}
      aria-hidden="true"
    >
      {/* Wipe overlay — covers from top down */}
      <div
        ref={wipeRef}
        className="absolute inset-0"
        style={{
          background: "hsl(var(--background) / 0.92)",
          clipPath: "inset(0 0 100% 0)",
          willChange: "clip-path",
        }}
      />

      {/* Laser edge — positioned at wipe boundary */}
      <div
        ref={laserRef}
        className="absolute left-0 right-0"
        style={{
          height: 44,
          top: 0,
          marginTop: -22,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      >
        {/* Core laser line — 2px bright */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: 2,
            top: "50%",
            marginTop: -1,
            background: "hsl(var(--primary))",
            boxShadow: isMobile
              ? "0 0 8px 1px hsl(var(--primary) / 0.7)"
              : "0 0 6px 1px hsl(var(--primary) / 0.9), 0 0 18px 3px hsl(var(--primary) / 0.4), 0 0 32px 5px hsl(var(--primary) / 0.12)",
          }}
        />
        {/* Upper glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: isMobile ? 10 : 18,
            bottom: "50%",
            background: `linear-gradient(to top, hsl(var(--primary) / ${isMobile ? 0.15 : 0.25}), transparent)`,
          }}
        />
        {/* Lower glow */}
        <div
          className="absolute left-0 right-0"
          style={{
            height: isMobile ? 8 : 14,
            top: "50%",
            background: `linear-gradient(to bottom, hsl(var(--primary) / ${isMobile ? 0.1 : 0.18}), transparent)`,
          }}
        />
      </div>
    </div>
  );
};
