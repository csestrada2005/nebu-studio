import { Rocket, Globe, ShoppingCart, Zap } from "lucide-react";

const services = [
  {
    icon: Rocket,
    title: "Landing Pages",
    description: "Páginas de aterrizaje diseñadas para maximizar conversiones y captar leads de forma efectiva.",
    benefits: ["Mayor conversión", "Diseño persuasivo", "A/B Testing"],
  },
  {
    icon: Globe,
    title: "Sitios Corporativos",
    description: "Presencia online profesional que transmite confianza y refleja los valores de tu marca.",
    benefits: ["Imagen profesional", "Multi-página", "Blog integrado"],
  },
  {
    icon: ShoppingCart,
    title: "Tiendas Online",
    description: "E-commerce completos y optimizados para vender tus productos las 24 horas del día.",
    benefits: ["Ventas 24/7", "Gestión fácil", "Pagos seguros"],
  },
];

export const Services = () => {
  return (
    <section id="servicios" className="py-24 bg-section-alt">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Servicios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Soluciones web para cada necesidad
          </h2>
          <p className="text-muted-foreground text-lg">
            Cada proyecto es único. Por eso ofrezco servicios personalizados que se adaptan a los objetivos específicos de tu negocio.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-2xl p-8 shadow-card hover:shadow-hover transition-all duration-300 border border-border hover:border-primary/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6">
                {service.description}
              </p>
              
              <ul className="space-y-2">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
