

## Fix Regression: Restore Previously Applied Changes

After reviewing all files, several changes that were previously applied have reverted or were never fully applied. Here is the full list of fixes:

### 1. ScrollRevealText -- Make Faster (src/components/motion/ScrollRevealText.tsx)

The "We build the engine..." text animation is still using the original slow scroll range. Changes needed:
- Tighten the scroll offset from `["start 0.85", "end 0.4"]` to `["start 0.9", "end 0.6"]` so words reveal faster
- Each word should paint in quickly (over a tighter progress band) and stay fully visible once revealed

### 2. AOV Blur in FeaturedWork (src/components/motion/FeaturedWork.tsx)

Line 138 has `textShadow: "0 0 40px hsl(0 100% 50% / 0.3)"` on the `+15%` stat text. This creates a red blur/glow effect. Fix:
- Remove the `style={{ textShadow: ... }}` from the `+15%` span so it's a clean solid red with no blur

### 3. DesignLab "Design" Text Color (src/components/motion/DesignLab.tsx)

Previous request was "make all text white except 'Design'". Currently both "DESIGN" and "LAB" are `text-white`. Fix:
- Change "DESIGN" to use `text-primary` (red) while keeping "LAB" as `text-white`

### Technical Summary

Files to modify:
1. `src/components/motion/ScrollRevealText.tsx` -- tighter scroll offset for faster word reveal
2. `src/components/motion/FeaturedWork.tsx` -- remove textShadow blur from +15% stat
3. `src/components/motion/DesignLab.tsx` -- change "DESIGN" text to `text-primary`

