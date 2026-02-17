export const StatsStrip = () => {
  const stats = [
    "Avg delivery: 15 days",
    "Conversion-first",
    "Mobile-first",
    "SEO-ready",
  ];

  return (
    <section className="py-10 border-b border-border/30">
      <div className="container">
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
          {stats.map((stat) => (
            <div key={stat} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-muted-foreground text-xs tracking-wide uppercase font-medium">
                {stat}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
