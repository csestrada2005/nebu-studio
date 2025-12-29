import { useInView } from "@/hooks/useAnimations";

const steps = [
  {
    number: "01",
    title: "Descubrimiento",
    description:
      "Conversamos sobre tus objetivos, audiencia y visión. Entiendo tu negocio para diseñar con propósito.",
  },
  {
    number: "02",
    title: "Estrategia",
    description:
      "Defino la estructura, flujos y funcionalidades. Cada decisión orientada a resultados.",
  },
  {
    number: "03",
    title: "Diseño",
    description:
      "Creo propuestas visuales únicas. Iteramos juntos hasta lograr exactamente lo que imaginas.",
  },
  {
    number: "04",
    title: "Desarrollo",
    description:
      "Construyo tu sitio con tecnología moderna. Rápido, seguro y preparado para escalar.",
  },
  {
    number: "05",
    title: "Lanzamiento",
    description:
      "Publicamos y monitorizamos. Te acompaño en el proceso de mejora continua.",
  },
];

export const ProcessSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="proceso"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32"
    >
      <div className="container">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span
            className={`inline-block text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 ${
              isInView ? "animate-fade-up" : "opacity-0"
            }`}
          >
            Proceso
          </span>
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6 ${
              isInView ? "animate-fade-up animation-delay-100" : "opacity-0"
            }`}
          >
            Cómo trabajo
            <span className="font-serif italic text-accent"> contigo</span>
          </h2>
          <p
            className={`text-muted-foreground text-lg ${
              isInView ? "animate-fade-up animation-delay-200" : "opacity-0"
            }`}
          >
            Un proceso claro y colaborativo. Tú siempre en el centro de las
            decisiones.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-0">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className={`relative pl-12 md:pl-24 pb-12 last:pb-0 ${
                  isInView ? "animate-fade-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                {/* Number dot */}
                <div className="absolute left-0 md:left-4 top-0 w-8 h-8 rounded-full bg-background border-2 border-border flex items-center justify-center text-xs font-mono text-muted-foreground z-10">
                  {step.number}
                </div>

                {/* Connecting line highlight */}
                {index < steps.length - 1 && (
                  <div className="absolute left-4 md:left-8 top-8 w-px h-full bg-accent/20 hidden md:block" />
                )}

                {/* Content */}
                <div className="group">
                  <h3 className="text-xl md:text-2xl font-medium mb-2 group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground max-w-xl">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
