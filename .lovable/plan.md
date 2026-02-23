

## Plan: Fix Hero Animation, Upward Overlap Feel, and Single Red Line

### 1. Hero Glitch Animation — Full Screen + Auto-Scroll

**Problem**: The glitch animation elements are `absolute` inside the hero `<motion.section>` which has `overflow-hidden`. They only appear within the hero bounds.

**Fix**:
- Move the entire glitch/boot animation into a **`fixed inset-0 z-[9999]`** overlay that renders on top of the entire page (similar to how `HeroTransition` works).
- After the glitch animation completes (~1.8s), programmatically smooth-scroll the user down to the `BuildModes` section (the "What we build" area). Add an `id="build"` to `BuildModes` if it doesn't have one, then call `document.getElementById("build")?.scrollIntoView({ behavior: "smooth" })`.
- The animation still triggers once on first scroll/interaction and never re-triggers.

**Files**: `src/components/motion/HeroSection.tsx`

---

### 2. Upward Overlap Effect — Sections Slide Over Previous

**Problem**: Current `useScrollPaint` just fades/translates elements but doesn't create the visual illusion of sections overlapping upward.

**Fix**:
- Give each major section a **`position: relative`** with incrementing **`z-index`** (each section higher than the previous).
- Add a solid background to each section so it visually covers the section above as the user scrolls.
- Apply a subtle **negative top margin** (e.g., `-40px` to `-60px`) so sections slightly overlap the tail of the previous one, creating a "sliding over" sensation.
- Adjust `useScrollPaint` to keep the strong upward entry (from below) but remove the exit-upward animation so sections stay put once visible — the next section sliding over them creates the "going up" feel naturally.

**Files**: `src/hooks/useScrollPaint.ts`, `src/pages/Index.tsx` (wrapper divs with z-index + bg)

---

### 3. Single Red Line — Persistent Width on Scroll

**Problem**: Two lines exist; the line width follows `scrollYProgress` which goes 0 to 1 to 0, causing the line to disappear while still visible.

**Fix**:
- Revert to a **single red line** (remove the second line and center glow).
- Replace the symmetric `progress` curve with a **ratchet-style approach**:
  - Track a `committedWidth` state using `useMotionValueEvent` on `scrollYProgress`.
  - **Scrolling down**: the line grows from left to right, width increases and **stays** at its max reached value.
  - **Scrolling up**: the line shrinks back from where it was (right to left), resuming from its last position.
  - The line's width is driven by `scrollYProgress` mapped `[0, 1]` to `[0%, 100%]` but clamped so it only moves in the current scroll direction.
- Reduce separator height from `h-28` to `h-16` for a tighter single-line feel.

**Files**: `src/components/motion/SectionSeparator.tsx`

---

### Technical Summary

| File | Change |
|------|--------|
| `HeroSection.tsx` | Move glitch overlay to `fixed inset-0 z-[9999]`, add auto-scroll to `#build` after animation |
| `BuildModes.tsx` | Add `id="build"` to the section wrapper |
| `useScrollPaint.ts` | Remove exit-upward animation; sections stay once visible |
| `Index.tsx` | Wrap sections with incrementing z-index + bg + slight negative margin |
| `SectionSeparator.tsx` | Single line, directional grow/shrink that persists width |

