

## Fix All Blurry Text, Washed-Out Colors, and Low-Opacity Elements

### Problem
Many text elements, labels, and visual indicators across the site are either blurred during animation or permanently stuck at low opacity/washed-out colors, making them hard to read or invisible.

### Files to Modify

**1. `src/components/motion/ProcessSection.tsx`**
- Line 71: Remove `filter: "blur(6px)"` from header initial state
- Line 72: Remove `filter: "blur(0px)"` from whileInView (no longer needed)
- Line 120: Remove `filter: "blur(6px)"` from phase cards initial state
- Line 121: Remove `filter: "blur(0px)"` from phase cards whileInView
- Line 144: Change `text-muted-foreground/60` to `text-muted-foreground` on bullet text
- Line 168: Change `text-muted-foreground/60` to `text-muted-foreground` on desktop bullet text

**2. `src/components/motion/ServicesSection.tsx`**
- Line 114: Remove `filter: "blur(8px)"` from cardVariants hidden state
- Line 118: Remove `filter: "blur(0px)"` from cardVariants visible state
- Line 147: Remove `filter: "blur(6px)"` from header initial
- Line 148: Remove `filter: "blur(0px)"` from header whileInView
- Line 226: Change `text-muted-foreground group-hover:text-foreground/70` to `text-muted-foreground group-hover:text-foreground` on feature list items
- Line 233: Change `text-muted-foreground/40` to `text-muted-foreground/70` on "Best for" label
- Line 234: Change `text-foreground/60` to `text-foreground/80` on bestFor text

**3. `src/components/motion/DesignLab.tsx`**
- Line 142: Change `text-foreground/80` to `text-foreground` on GlassPopup paragraph
- Line 146: Change `text-muted-foreground/40` to `text-muted-foreground/70` on "Cuatre Design System" label
- Line 199: Change `text-muted-foreground/30` to `text-muted-foreground/60` on Tilt coordinates
- Line 223: Change `text-muted-foreground/20` to `text-muted-foreground/60` on "Scroll para morph"
- Line 249: Change `text-foreground/25` to `text-foreground/60` on RevealWipe "Project" labels
- Line 319: Change `text-foreground/50` to `text-foreground/80` on demo labels
- Line 320: Change `text-muted-foreground/30` to `text-muted-foreground/60` on demo descriptions
- Line 326: Change `text-muted-foreground/30 hover:text-primary/60` to `text-muted-foreground/60 hover:text-primary` on "Usar en mi proyecto" links

**4. `src/components/motion/ArchitectureDemo.tsx`**
- Line 72: Change `text-primary/70` to `text-primary` on "SaaS Dashboard" label
- Line 112: Change `text-muted-foreground/30` to `text-muted-foreground/60` on "app.tsx" tab label
- Line 124: Change `text-muted-foreground/20` to `text-muted-foreground/50` on line numbers

**5. `src/components/motion/FeaturedWork.tsx`**
- Line 58: Change the binary rain overlay animation from `opacity: [0.3, 0.5, 0.3]` to `opacity: [0.6, 1, 0.6]`
- Line 66: Change `text-muted-foreground/30` and animation `opacity: [0.3, 0.6, 0.3]` to `text-muted-foreground/60` and `opacity: [0.6, 1, 0.6]`
- Line 78: Change `text-muted-foreground/25` to `text-muted-foreground/60` on PrivacyBadge text
- Line 77: Change `text-muted-foreground/30` to `text-muted-foreground/60` on Shield icon
- Line 120: Change stats animation from `opacity: [0.5, 1, 0.5]` to `opacity: [0.8, 1, 0.8]`
- Line 122: Change `text-muted-foreground/40` to `text-muted-foreground/70` on "AOV Increase"
- Line 133: Change `text-muted-foreground/40` to `text-muted-foreground/70` on subtitle
- Line 138: Change `text-muted-foreground/60` to `text-muted-foreground/80` on stat text

**6. `src/components/motion/GrowthImpact.tsx`**
- Line 49: Change `text-muted-foreground/50` to `text-muted-foreground/80` on "Conversion Rate Over Time"
- Line 61: Remove the blurred glow path entirely (`filter="blur(4px)"` on line 61) -- this SVG filter blurs the chart line
- Line 80: Change `text-foreground/70` to `text-foreground` on current revenue value
- Line 85: Change `text-foreground/80` to `text-foreground` on "Current Revenue" AnimatedValue
- Line 99-100: Change `text-muted-foreground/50` to `text-muted-foreground/80` on both revenue labels
- Line 102: Change `text-muted-foreground/50` to `text-muted-foreground/80` on "Average Order Value"
- Line 149: Change revenue tagline color to full opacity
- Line 165: Change `text-muted-foreground/50` to `text-muted-foreground/70` on metric sub-text
- Line 199: Change `text-muted-foreground/30` to `text-muted-foreground/60` on disclaimer text

**7. `src/components/motion/LoadingScreen.tsx`**
- Line 67: Change `animate={{ opacity: 0.6, x: 0 }}` to `animate={{ opacity: 1, x: 0 }}`
- Line 69: Change `text-muted-foreground/60` to `text-muted-foreground`
- Line 70: Change `text-primary/50` to `text-primary`
- Line 98: Change `text-muted-foreground/30` to `text-muted-foreground/60`

**8. `src/components/motion/BigCTA.tsx`**
- Already reviewed; the EasterEgg.tsx has blur on reveal animation -- remove `filter: "blur(10px)"` from initial and `filter: "blur(0px)"` from animate in `src/components/motion/EasterEgg.tsx` (line 76-77)

**9. `src/components/motion/DramaticFooter.tsx`**
- Line 78: Change floating "+" crosses from `text-primary/10` to `text-primary/30` and animation opacity from `[0.1, 0.4, 0.1]` to `[0.3, 0.7, 0.3]`
- Line 87: Change `text-foreground/80` to `text-foreground` on statement headings
- Line 96: Change `text-foreground/10` to `text-foreground/30` on large "CUATRE" watermark
- Line 115: Change `text-muted-foreground/40` to `text-muted-foreground/60` on copyright

**10. `src/components/motion/CornerCrosses.tsx`**
- Line 18: Change `animate={{ opacity: 0.25, scale: 1 }}` to `animate={{ opacity: 0.6, scale: 1 }}`

**11. `src/components/motion/SectionTransition.tsx`**
- Line 69: Change `text-primary/60` to `text-primary` on "Transitioning" label
- Line 71: Change opacity animation from `[0, 0.7, 0.7, 0]` to `[0, 1, 1, 0]`
- Line 150: Change `text-primary/50` to `text-primary/80` on "Rendering" label
- Line 152: Change `animate={{ opacity: 0.7, y: 0 }}` to `animate={{ opacity: 1, y: 0 }}`
- Line 213-215: Change `text-primary/20` to `text-primary/50` and `animate={{ opacity: 0.4 }}` to `animate={{ opacity: 0.8 }}`
- Line 230: Change `text-foreground/40` to `text-foreground/70`
- Line 232: Change `animate={{ opacity: 0.7 }}` to `animate={{ opacity: 1 }}`

**12. `src/components/motion/ContactSection.tsx`**
- Line 56: Change `placeholder:text-muted-foreground/50` to `placeholder:text-muted-foreground/70`

**13. `src/components/motion/ROICalculator.tsx` (src/components/tools/ROICalculator.tsx)**
- Line 80: Change `text-muted-foreground/50` to `text-muted-foreground/80` on "Current Revenue" label
- Line 99: Change `text-muted-foreground/50` to `text-muted-foreground/80` on "Projected Value" label

### Summary
- Remove ALL `filter: "blur(...)"` from every initial/animate/whileInView state across all motion components
- Raise every `/20`, `/25`, `/30`, `/40` opacity modifier on visible text to at least `/60` or higher
- Raise every animated opacity target that caps below 1 (like `opacity: 0.6` or `opacity: 0.7`) to `1` for final visible state
- Keep decorative background elements (grids, glows, gradients) at their current low opacity since those are intentional ambient effects, not readable content

