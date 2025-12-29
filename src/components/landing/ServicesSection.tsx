import { useInView } from "@/hooks/useAnimations";
import { Layers, Palette, ShoppingBag, Zap } from "lucide-react";

const services = [
  {
    icon: Layers,
    number: "01",
    title: "Landing Pages",
    description:
      "Páginas de aterrizaje optimizadas para convertir visitantes en clientes. Diseño estratégico enfocado en resultados.",
  },
  {
    icon: Palette,
    number: "02",
    title: "Sitios Web",
    description:
      "Presencia digital que refleja la esencia de tu marca. Diseño único, navegación intuitiva y rendimiento excepcional.",
  },
  {
    icon: ShoppingBag,
    number: "03",
    title: "E-commerce",
    description:
      "Tiendas online diseñadas para vender. Experiencia de compra fluida que convierte visitantes en compradores.",
  },
  {
    icon: Zap,
    number: "04",
    title: "Optimización",
    description:
      "Mejora de sitios existentes. Velocidad, SEO y conversión para maximizar el potencial de tu web actual.",
  },
];

export const ServicesSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="servicios"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32"
    >
      <div className="container">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span
              className={`inline-block text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 ${
                isInView ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Servicios
            </span>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight ${
                isInView ? "animate-fade-up animation-delay-100" : "opacity-0"
              }`}
            >
              Lo que hago
              <span className="font-serif italic text-accent"> mejor</span>
            </h2>
          </div>
          <p
            className={`text-muted-foreground max-w-md md:text-right ${
              isInView ? "animate-fade-up animation-delay-200" : "opacity-0"
            }`}
          >
            Cada proyecto es único. Mi enfoque combina estrategia, diseño y
            tecnología para crear soluciones que funcionan.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative p-8 md:p-10 rounded-2xl border border-border bg-card/50 hover:bg-card hover:border-accent/20 transition-all duration-500 cursor-pointer hover-lift ${
                isInView
                  ? "animate-fade-up"
                  : "opacity-0"
              }`}
              style={{ animationDelay: `${(index + 2) * 100}ms` }}
            >
              {/* Number */}
              <span className="absolute top-8 right-8 text-sm text-muted-foreground/50 font-mono">
                {service.number}
              </span>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                <service.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-xl md:text-2xl font-medium mb-3 group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Hover line */}
              <div className="absolute bottom-0 left-8 right-8 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
