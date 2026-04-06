import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@/lib/utils";

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn("shrink-0", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className)}
    style={{
      background: orientation === "horizontal"
        ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), rgba(230,57,70,0.3), rgba(255,255,255,0.15), transparent)"
        : "linear-gradient(180deg, transparent, rgba(255,255,255,0.15), rgba(230,57,70,0.3), rgba(255,255,255,0.15), transparent)",
    }}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
