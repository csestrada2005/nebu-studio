import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "E-commerce de Moda",
    category: "Tienda Online",
    description: "Tienda online con +200% de aumento en conversiones",
    image: null,
  },
  {
    title: "SaaS Dashboard",
    category: "Aplicación Web",
    description: "Panel de control para gestión de proyectos",
    image: null,
  },
  {
    title: "Clínica Dental",
    category: "Sitio Corporativo",
    description: "Web corporativa con sistema de citas online",
    image: null,
  },
  {
    title: "Startup Tech",
    category: "Landing Page",
    description: "Landing de captación con 45% de conversión",
    image: null,
  },
];

export const Portfolio = () => {
  return (
    <section id="portafolio" className="py-24 bg-section-alt">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
            Portafolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Proyectos destacados
          </h2>
          <p className="text-muted-foreground text-lg">
            Algunos de los trabajos que he realizado para clientes de diferentes sectores.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className="group relative bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 border border-border"
            >
              {/* Image placeholder */}
              <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="text-2xl">🖼️</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Captura del proyecto
                    </p>
                  </div>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button variant="secondary" size="sm" className="gap-2">
                    Ver proyecto <ExternalLink className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <span className="text-xs font-medium text-primary uppercase tracking-wider">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold text-foreground mt-2 mb-2">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver más proyectos
          </Button>
        </div>
      </div>
    </section>
  );
};
