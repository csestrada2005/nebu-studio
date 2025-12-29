import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useMousePosition } from "@/hooks/useAnimations";

export const HeroSection = () => {
  const mouse = useMousePosition();

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 overflow-hidden noise-overlay">
      {/* Floating shapes */}
      <div
        className="absolute top-1/4 right-[15%] w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float"
        style={{
          transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 left-[10%] w-48 h-48 bg-muted/50 rounded-full blur-2xl animate-float animation-delay-300"
        style={{
          transform: `translate(${mouse.x * -15}px, ${mouse.y * -15}px)`,
        }}
      />

      <div className="container relative">
        <div className="max-w-5xl">
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-8 animate-fade-up">
            <span className="w-12 h-px bg-accent" />
            <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Diseño web con propósito
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-[clamp(2.5rem,8vw,6rem)] leading-[0.95] font-medium tracking-tight mb-8">
            <span className="block animate-fade-up animation-delay-100">
              Creo experiencias
            </span>
            <span className="block animate-fade-up animation-delay-200">
              digitales que
            </span>
            <span className="block font-serif italic text-accent animate-fade-up animation-delay-300">
              convierten.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 animate-fade-up animation-delay-400">
            Landing pages, sitios web y tiendas online diseñados para destacar
            y generar resultados reales.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-up animation-delay-500">
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all"
            >
              Empezar un proyecto
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
            <a
              href="#trabajo"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 border border-border rounded-full font-medium hover:bg-muted/50 transition-all"
            >
              Ver trabajos
              <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-fade-up animation-delay-700">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Scroll
          </span>
          <div className="w-px h-12 bg-border relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-foreground animate-[bounce_2s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};
