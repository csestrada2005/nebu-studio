import { Search, Palette, Code, Gauge } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Descubrimiento",
    description: "Analizamos tu negocio, objetivos y competencia para definir la estrategia perfecta.",
  },
  {
    icon: Palette,
    number: "02",
    title: "Diseño",
    description: "Creo propuestas visuales únicas que reflejan tu marca y conectan con tu audiencia.",
  },
  {
    icon: Code,
    number: "03",
    title: "Desarrollo",
    description: "Construyo tu sitio con las mejores tecnologías para garantizar velocidad y seguridad.",
  },
  {
    icon: Gauge,
    number: "04",
    title: "Optimización",
    description: "Ajustamos y mejoramos continuamente para maximizar resultados y conversiones.",
  },
];

export const Process = () => {
  return (
    <section id="proceso" className="py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Proceso
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Cómo trabajo
          </h2>
          <p className="text-muted-foreground text-lg">
            Un proceso claro y transparente para que siempre sepas en qué punto está tu proyecto.
          </p>
        </div>

        <div className="relative">
          {/* Connection line - desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className="relative bg-card rounded-2xl p-8 shadow-card border border-border text-center"
              >
                {/* Step number badge */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 mt-2">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
