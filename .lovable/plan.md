

## Remove Black Flash After Hero Section

### Problem
The `HeroTransition` component renders a full-screen fixed overlay that turns the screen near-black for ~850ms when the user scrolls past the hero. This creates an unpleasant black flash.

### Solution
Remove the `HeroTransition` component entirely.

### Changes

**1. `src/pages/Index.tsx`**
- Remove the `HeroTransition` import
- Remove the `<HeroTransition />` JSX element from the render

No other files need changes. The `HeroTransition.tsx` file can remain in the codebase (unused) or be deleted — removing the usage is sufficient to fix the issue.

