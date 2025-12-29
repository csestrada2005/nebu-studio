import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const benefits = [
  "Páginas optimizadas para conversión",
  "Diseño 100% responsive",
  "Carga ultra rápida",
];

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-background to-background -z-10" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full animate-fade-up">
                +50 clientes confían en mí
              </span>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance animate-fade-up animation-delay-100">
                Diseño landing pages y sitios web que{" "}
                <span className="text-primary">convierten visitantes en clientes</span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl animate-fade-up animation-delay-200">
                Páginas web rápidas, optimizadas para SEO y diseñadas a medida para hacer crecer tu negocio online.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-300">
              <Button size="lg" asChild className="group">
                <a href="#contacto">
                  Solicitar propuesta gratuita
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#portafolio">Ver proyectos</a>
              </Button>
            </div>

            <ul className="flex flex-col sm:flex-row gap-4 sm:gap-6 animate-fade-up animation-delay-400">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero Image Placeholder */}
          <div className="relative animate-fade-up animation-delay-200">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-muted to-muted/50 overflow-hidden shadow-card">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Tu foto profesional aquí
                  </p>
                </div>
              </div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-4 -left-4 bg-card p-4 rounded-xl shadow-card border border-border animate-fade-up animation-delay-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold">30+</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Proyectos</p>
                  <p className="text-xs text-muted-foreground">entregados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
