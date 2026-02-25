/**
 * Shared motion constants — single source of truth for all animations.
 *
 * DURATION TIERS:
 *   micro    → 0.2s   (buttons, toggles, chevrons)
 *   fast     → 0.35s  (content swaps, accordion)
 *   reveal   → 0.55s  (section/element entrance)
 *   slow     → 0.8s   (ambient background shifts)
 *
 * EASING:
 *   premium  → [0.16, 1, 0.3, 1]  (ease-out with slight overshoot — all reveals)
 *   smooth   → [0.25, 1, 0.5, 1]  (softer ease-out — content transitions)
 *   micro    → "easeOut"            (quick UI interactions)
 *
 * SPRING:
 *   gentle   → stiffness 160, damping 22   (magnetic effects, cards)
 *   snappy   → stiffness 220, damping 24   (dial selectors, toggles)
 *
 * STAGGER:
 *   list     → 0.07s (70ms between items)
 *   grid     → 0.08s (80ms between grid cells)
 */

// ── Easings ──────────────────────────────────────────────────────────────────
export const EASE_PREMIUM: [number, number, number, number] = [0.16, 1, 0.3, 1];
export const EASE_SMOOTH: [number, number, number, number] = [0.25, 1, 0.5, 1];

// ── Durations (seconds) ─────────────────────────────────────────────────────
export const DUR = {
  micro: 0.2,
  fast: 0.35,
  reveal: 0.55,
  slow: 0.8,
} as const;

// ── Staggers (seconds) ──────────────────────────────────────────────────────
export const STAGGER = {
  list: 0.07,
  grid: 0.08,
} as const;

// ── Spring presets ──────────────────────────────────────────────────────────
export const SPRING = {
  gentle: { stiffness: 160, damping: 22 },
  snappy: { stiffness: 220, damping: 24 },
} as const;

// ── Reduced-motion–safe reveal helper ───────────────────────────────────────
export const revealProps = (reduced: boolean | null, delay = 0) => ({
  initial: reduced ? { opacity: 0 } : { opacity: 0, y: 18 },
  transition: {
    duration: reduced ? 0.25 : DUR.reveal,
    delay,
    ease: EASE_PREMIUM,
  },
});
