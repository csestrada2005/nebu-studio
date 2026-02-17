export const MarqueeTicker = () => {
  const text = "AVAILABLE FOR NEW PROJECTS — ECOMMERCE — LANDING PAGES — SYSTEMS — CRO — ";
  const repeated = text.repeat(4);

  return (
    <section className="py-6 border-y border-border/30 overflow-hidden relative" aria-label="Marquee">
      {/* Primary marquee */}
      <div className="flex whitespace-nowrap animate-marquee">
        <span className="text-muted-foreground/40 text-sm tracking-[0.15em] uppercase font-medium">
          {repeated}
        </span>
        <span className="text-muted-foreground/40 text-sm tracking-[0.15em] uppercase font-medium">
          {repeated}
        </span>
      </div>

      {/* Reverse layer behind */}
      <div className="flex whitespace-nowrap animate-marquee-reverse mt-2 opacity-30">
        <span className="text-muted-foreground/20 text-[10px] tracking-[0.2em] uppercase">
          {repeated}
        </span>
        <span className="text-muted-foreground/20 text-[10px] tracking-[0.2em] uppercase">
          {repeated}
        </span>
      </div>
    </section>
  );
};
