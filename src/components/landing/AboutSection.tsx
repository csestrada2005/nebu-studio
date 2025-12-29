import { useInView } from "@/hooks/useAnimations";
import { ArrowUpRight } from "lucide-react";

export const AboutSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 bg-foreground text-background overflow-hidden"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <div
            className={`relative ${
              isInView ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <div className="aspect-[4/5] rounded-2xl bg-background/10 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-5xl">👋</span>
                  </div>
                  <p className="text-background/60 text-sm">
                    Tu foto aquí
                  </p>
                </div>
              </div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-accent/30 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <span
              className={`inline-block text-sm uppercase tracking-[0.2em] text-background/60 mb-4 ${
                isInView ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Sobre mí
            </span>

            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-8 ${
                isInView ? "animate-fade-up animation-delay-100" : "opacity-0"
              }`}
            >
              Diseñador enfocado en
              <span className="font-serif italic text-accent"> resultados</span>
            </h2>

            <div
              className={`space-y-4 text-background/70 mb-8 ${
                isInView ? "animate-fade-up animation-delay-200" : "opacity-0"
              }`}
            >
              <p>
                Hola, soy [Tu Nombre]. Llevo más de 3 años ayudando a empresas y
                emprendedores a destacar en el mundo digital.
              </p>
              <p>
                Mi filosofía es simple: cada pixel debe tener un propósito. No
                diseño solo para que se vea bonito, diseño para que funcione y
                genere resultados.
              </p>
              <p>
                Trabajo con un número limitado de proyectos para poder dedicar a
                cada uno la atención que merece.
              </p>
            </div>

            {/* Stats */}
            <div
              className={`grid grid-cols-3 gap-8 pt-8 border-t border-background/10 ${
                isInView ? "animate-fade-up animation-delay-300" : "opacity-0"
              }`}
            >
              {[
                { value: "+50", label: "Proyectos" },
                { value: "3+", label: "Años" },
                { value: "100%", label: "Satisfacción" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl md:text-3xl font-medium text-accent mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-background/50">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
