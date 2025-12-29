import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María García",
    role: "CEO, Startup Tech",
    content: "La landing page que diseñó superó todas mis expectativas. Nuestra tasa de conversión aumentó un 150% en el primer mes.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Director, Clínica Dental",
    content: "Profesionalidad y comunicación excelente. Entendió perfectamente lo que necesitábamos y lo entregó antes del plazo.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Fundadora, E-commerce Moda",
    content: "Mi tienda online ahora es rápida, bonita y vende mucho más. La mejor inversión que he hecho para mi negocio.",
    rating: 5,
  },
];

const stats = [
  { value: "+50", label: "Clientes satisfechos" },
  { value: "+30", label: "Proyectos entregados" },
  { value: "5.0", label: "Valoración media" },
  { value: "3", label: "Años de experiencia" },
];

export const Testimonials = () => {
  return (
    <section id="testimonios" className="py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Testimonios
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Lo que dicen mis clientes
          </h2>
          <p className="text-muted-foreground text-lg">
            La satisfacción de mis clientes es mi mejor carta de presentación.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 bg-card rounded-2xl shadow-card border border-border"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-card rounded-2xl p-8 shadow-card border border-border relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>
              
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Client logos placeholder */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">
            Empresas que han confiado en mí
          </p>
          <div className="flex flex-wrap justify-center gap-8 opacity-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-24 h-12 bg-muted rounded-lg flex items-center justify-center"
              >
                <span className="text-xs text-muted-foreground">Logo {i}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
