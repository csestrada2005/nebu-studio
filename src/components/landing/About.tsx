import { CheckCircle2, MessageCircle, Zap, Target } from "lucide-react";

const values = [
  {
    icon: MessageCircle,
    title: "Comunicación clara",
    description: "Te mantendré informado en cada paso del proyecto.",
  },
  {
    icon: Zap,
    title: "Entrega rápida",
    description: "Cumplo los plazos acordados sin excepciones.",
  },
  {
    icon: Target,
    title: "Orientación a resultados",
    description: "Diseño pensando en tus objetivos de negocio.",
  },
];

export const About = () => {
  return (
    <section id="sobre-mi" className="py-24 bg-section-alt">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-muted to-muted/50 overflow-hidden shadow-card">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-6xl">👨‍💻</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Tu foto profesional aquí
                  </p>
                </div>
              </div>
            </div>
            
            {/* Experience badge */}
            <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground p-6 rounded-2xl shadow-soft">
              <p className="text-3xl font-bold">3+</p>
              <p className="text-sm opacity-90">Años de experiencia</p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
                Sobre mí
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Diseñador web apasionado por los resultados
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hola, soy [Tu Nombre]. Llevo más de 3 años ayudando a empresas y emprendedores a destacar online con sitios web que no solo se ven increíbles, sino que también convierten.
                </p>
                <p>
                  Mi enfoque combina diseño atractivo con estrategia de conversión. Cada proyecto que desarrollo está pensado para cumplir objetivos específicos: más leads, más ventas, más visibilidad.
                </p>
                <p>
                  Trabajo con un número limitado de clientes para poder dedicar a cada proyecto la atención que merece.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
