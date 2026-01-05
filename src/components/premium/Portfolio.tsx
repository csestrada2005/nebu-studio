import { useState, useCallback } from "react";
import { useReveal } from "@/hooks/useAnimations";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

import useEmblaCarousel from "embla-carousel-react";

// Landing Page images
import landing1 from "@/assets/example-landing-1.jpg";
import landing2 from "@/assets/example-landing-2.jpg";
import landing3 from "@/assets/example-landing-3.jpg";

// Website images
import web1 from "@/assets/example-web-1.jpg";
import web2 from "@/assets/example-web-2.jpg";
import web3 from "@/assets/example-web-3.jpg";

// E-commerce images
import ecommerce1 from "@/assets/example-ecommerce-1.jpg";
import ecommerce2 from "@/assets/example-ecommerce-2.jpg";
import ecommerce3 from "@/assets/example-ecommerce-3.jpg";

interface Example {
  id: number;
  title: string;
  category: string;
  description: string;
  features: string[];
  benefits: { value: string; label: string }[];
  images: string[];
}

const examples: Example[] = [
  {
    id: 1,
    title: "Landing Page",
    category: "Captación",
    description: "Páginas de aterrizaje diseñadas para convertir visitantes en clientes. Perfectas para campañas de marketing, lanzamientos de productos o servicios específicos.",
    features: [
      "Diseño enfocado en conversión",
      "Formularios optimizados",
      "Llamadas a la acción claras",
      "Carga ultra-rápida"
    ],
    benefits: [
      { value: "Alta", label: "Conversión" },
      { value: "<2s", label: "Velocidad" },
      { value: "100%", label: "Responsive" },
    ],
    images: [landing1, landing2, landing3],
  },
  {
    id: 2,
    title: "Sitio Web",
    category: "Presencia digital",
    description: "Sitios web corporativos completos que representan tu marca profesionalmente. Incluyen múltiples páginas, blog y formularios de contacto.",
    features: [
      "Diseño profesional",
      "SEO optimizado",
      "Gestión de contenido",
      "Integración de redes"
    ],
    benefits: [
      { value: "SEO", label: "Optimizado" },
      { value: "Multi", label: "Páginas" },
      { value: "Blog", label: "Integrado" },
    ],
    images: [web1, web2, web3],
  },
  {
    id: 3,
    title: "E-commerce",
    category: "Tienda online",
    description: "Tiendas online completas con carrito de compras, pasarela de pagos y gestión de inventario. Todo lo que necesitas para vender online.",
    features: [
      "Carrito de compras",
      "Pagos seguros",
      "Gestión de productos",
      "Panel de administración"
    ],
    benefits: [
      { value: "Pagos", label: "Integrados" },
      { value: "Stock", label: "Automático" },
      { value: "24/7", label: "Ventas" },
    ],
    images: [ecommerce1, ecommerce2, ecommerce3],
  },
];

const ProjectCarousel = ({ images, title, t }: { images: string[]; title: string; t: (key: string) => string }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Subscribe to select event
  useState(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  });

  if (images.length === 1) {
    return (
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
        <img
          src={images[0]}
          alt={`${title} - Preview`}
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Carousel container */}
      <div className="overflow-hidden rounded-xl" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="aspect-[16/10] overflow-hidden bg-muted">
                <img
                  src={image}
                  alt={`${title} - ${index + 1}`}
                  className="w-full h-full object-cover object-top transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows - visible on desktop hover */}
      <button
        onClick={scrollPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
        aria-label={t("portfolio.prev")}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 backdrop-blur-sm border border-border shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-background"
        aria-label={t("portfolio.next")}
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "bg-accent w-6"
                : "bg-background/60 hover:bg-background/80"
            }`}
            aria-label={`${t("portfolio.goto")} ${index + 1}`}
          />
        ))}
      </div>

      {/* Mobile swipe hint - only shows briefly */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-xs text-background/70 bg-foreground/50 px-3 py-1 rounded-full sm:hidden animate-fade-in">
        {t("portfolio.swipe")}
      </div>
    </div>
  );
};

export const Portfolio = () => {
  const { ref, isVisible } = useReveal();
  const { t } = useLanguage();

  return (
    <section id="trabajo" ref={ref as React.RefObject<HTMLElement>} className="py-16 sm:py-24 md:py-32 bg-muted/30">
      <div className="container px-5 sm:px-6">
        {/* Header */}
        <div className="max-w-2xl mb-10 sm:mb-16">
          <p className={`text-accent font-medium mb-3 text-sm tracking-wide uppercase transition-all duration-600 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            Lo que podemos crear
          </p>
          <h2 className={`font-display text-3xl sm:text-4xl md:text-5xl mb-4 transition-all duration-600 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Soluciones para cada necesidad
          </h2>
          <p className={`text-muted-foreground text-base sm:text-lg transition-all duration-600 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            Desde páginas de captación hasta tiendas online completas, creamos la solución perfecta para tu negocio.
          </p>
        </div>

        {/* Examples Grid - 3 columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {examples.map((example, index) => (
            <article
              key={example.id}
              className={`bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              {/* Image / Carousel */}
              <div className="p-3 sm:p-4">
                <ProjectCarousel images={example.images} title={example.title} t={t} />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5">
                {/* Badge + Title */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider px-2 py-0.5 bg-accent/10 rounded-full">
                    {example.category}
                  </span>
                </div>
                
                <h3 className="font-display text-xl sm:text-2xl mb-2">
                  {example.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
                  {example.description}
                </p>

                {/* Features chips */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {example.features.map((feature, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded-full bg-muted text-foreground/80 font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Benefits block with staggered animations */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                  {example.benefits.map((benefit, i) => (
                    <div 
                      key={i} 
                      className={`text-center transition-all duration-500 ${
                        isVisible 
                          ? "opacity-100 translate-y-0 scale-100" 
                          : "opacity-0 translate-y-4 scale-95"
                      }`}
                      style={{ transitionDelay: `${(index * 150) + (i * 100) + 400}ms` }}
                    >
                      <p className="text-sm sm:text-base font-bold text-accent">{benefit.value}</p>
                      <p className="text-[10px] sm:text-xs text-muted-foreground">{benefit.label}</p>
                    </div>
                  ))}
                </div>

              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-10 sm:mt-14 text-center transition-all duration-600 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente? <span className="text-accent font-medium">Cuéntanos tu idea</span> y encontraremos la mejor solución para ti.
          </p>
        </div>
      </div>
    </section>
  );
};
