import { useInView, useParallax } from "@/hooks/useAnimations";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-commerce de Moda",
    category: "Tienda Online",
    year: "2024",
    description: "Experiencia de compra premium con +200% de conversión",
  },
  {
    id: 2,
    title: "SaaS Platform",
    category: "Aplicación Web",
    year: "2024",
    description: "Dashboard intuitivo para gestión de equipos",
  },
  {
    id: 3,
    title: "Estudio Creativo",
    category: "Landing Page",
    year: "2023",
    description: "Portfolio interactivo con animaciones fluidas",
  },
];

export const WorkSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.05 });

  return (
    <section
      id="trabajo"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32 bg-muted/30"
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
              Trabajo selecto
            </span>
            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight ${
                isInView ? "animate-fade-up animation-delay-100" : "opacity-0"
              }`}
            >
              Proyectos
              <span className="font-serif italic text-accent"> recientes</span>
            </h2>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`mt-16 text-center ${
            isInView ? "animate-fade-up animation-delay-600" : "opacity-0"
          }`}
        >
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors line-reveal"
          >
            ¿Tienes un proyecto en mente?
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  isInView: boolean;
}

const ProjectCard = ({ project, index, isInView }: ProjectCardProps) => {
  const { ref, offset } = useParallax(0.1);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`group relative ${
        isInView ? "animate-fade-up" : "opacity-0"
      }`}
      style={{ animationDelay: `${(index + 2) * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-accent/20 transition-all duration-500 cursor-pointer hover-lift">
        {/* Image placeholder */}
        <div
          className="relative w-full lg:w-1/2 aspect-[16/10] rounded-xl bg-muted overflow-hidden"
          style={{ transform: `translateY(${offset * 0.5}px)` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-2xl">✦</span>
              </div>
              <p className="text-sm text-muted-foreground">Imagen del proyecto</p>
            </div>
          </div>

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span className="text-background font-medium flex items-center gap-2">
              Ver proyecto
              <ArrowUpRight className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs uppercase tracking-wider text-accent">
              {project.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {project.year}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-medium mb-3 group-hover:text-accent transition-colors">
            {project.title}
          </h3>

          <p className="text-muted-foreground">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
};
