

## Multi-Section Visual Refinements

### 1. Design Lab Section

**File: `src/components/motion/DesignLab.tsx`**

- Remove the `SectionSeparator` red line divider between Design Lab and adjacent sections (handled in `Index.tsx` -- remove the separators around DesignLab)
- Change `<span className="text-primary">LAB</span>` to use `text-white` instead of `text-primary`
- **ElectroText**: Change lightning stroke color from red (`hsl(0, 100%...)`) to yellow (`hsl(50, 100%...)`), spark fill to yellow, glow to yellow, active letter color stays white
- **GlassPopup**: Change popup background to solid white (`hsl(0 0% 100%)`), text to black (`text-black`), labels to dark grey (`text-black/60`)
- **TiltObject**: Change the card background to solid white (`hsl(0 0% 100% / 0.9)`), SVG elements to black (`hsl(0 0% 0% / 0.4)`), highlight to black
- **ScrollMorphShapes**: Change shape backgrounds to solid white (`hsl(0 0% 100% / 0.9)`), borders to white
- **ArchitectureDemo** (`ArchitectureDemo.tsx`): Remove any blur. Make laptop screen background white with dark text/icons, laptop base white/light grey

**File: `src/pages/Index.tsx`**
- Remove the `<SectionSeparator />` components immediately before and after `<DesignLab />`

### 2. Process Section -- Remove Number Blur

**File: `src/components/motion/ProcessSection.tsx`**
- Line 167: Change `text-primary/20` to `text-primary` on phase numbers so they are fully visible, not blurred/faded

### 3. Growth Impact -- Scroll-Driven Charts

**File: `src/components/motion/GrowthImpact.tsx`**

- **LineChart**: Replace `isInView`-triggered `pathLength` animation with scroll-driven `useScroll`/`useTransform`. The chart container gets a ref, and `scrollYProgress` maps `[0, 1]` to `pathLength [0, 1]`. Points also fade in based on scroll progress.
- **BarChart**: Same approach -- each bar height animates from 0 to full based on scroll progress through the chart container. Remove any remaining blur (`filter` or `backdrop-blur`).
- Remove the blurred glow path (the `strokeWidth="6"` path with `0.3` opacity) from LineChart.

### 4. Revenue Simulator -- Thicker Borders, Right-Aligned

**File: `src/components/tools/ROICalculator.tsx`**
- Change border from `1px solid` to `3px solid` (thicker edges)
- In `GrowthImpact.tsx`, change the simulator wrapper from `max-w-4xl` (centered) to `max-w-4xl ml-auto` to push it to the right

### 5. All Possibilities Section -- Card Backgrounds and Reveal Animation

**File: `src/components/motion/FeaturedWork.tsx`**

- Change the `+15%` stat number color in "Headless Commerce Core" to red (`text-primary`)
- Add a black background to each card: wrap each card in a container with `bg-black` and padding
- Add a "black square cover" reveal animation: each card starts with a black overlay (`<motion.div>`) that slides down (`translateY: 0 -> 100%`) when the card scrolls into view, revealing the content underneath

### Technical Details

**Files to modify:**
1. `src/components/motion/DesignLab.tsx` -- white LAB text, yellow electro, white glass/tilt/morph elements
2. `src/components/motion/ArchitectureDemo.tsx` -- white laptop, no blur
3. `src/components/motion/ProcessSection.tsx` -- phase numbers full opacity
4. `src/components/motion/GrowthImpact.tsx` -- scroll-driven chart fills, simulator alignment
5. `src/components/tools/ROICalculator.tsx` -- thicker border
6. `src/components/motion/FeaturedWork.tsx` -- black card backgrounds, red number, black cover reveal
7. `src/pages/Index.tsx` -- remove SectionSeparator around DesignLab

