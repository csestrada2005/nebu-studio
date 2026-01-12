import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReveal } from "@/hooks/useAnimations";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext, type CarouselApi } from "@/components/ui/carousel";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

// Project images - using existing assets
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

interface Project {
  id: string;
  name: string;
  description: { es: string; en: string };
  fullDescription: { es: string; en: string };
  tags: string[];
  features: { es: string[]; en: string[] };
  image: string;
}

const projects: Project[] = [
  {
    id: "la-mesa",
    name: "La Mesa",
    description: {
      es: "Menú QR desde la mesa: explorar, personalizar, carrito, dividir cuenta y pago simulado sin descargar app.",
      en: "QR menu from the table: browse, customize, cart, split bill and simulated payment without downloading an app."
    },
    fullDescription: {
      es: "Sistema completo de menú digital para restaurantes. Los clientes escanean un QR, exploran el menú por categorías, personalizan sus pedidos y gestionan su cuenta — todo desde el navegador.",
      en: "Complete digital menu system for restaurants. Customers scan a QR, browse the menu by category, customize orders and manage their bill — all from the browser."
    },
    tags: ["QR Menu", "Mobile UX", "Checkout", "Split Bill"],
    features: {
      es: ["Menú por categorías", "Personalización de pedidos", "Carrito inteligente", "División de cuenta"],
      en: ["Menu by categories", "Order customization", "Smart cart", "Bill splitting"]
    },
    image: portfolio1
  },
  {
    id: "raw-paw",
    name: "Raw Paw",
    description: {
      es: "E-commerce local BARF en Puebla: cobertura por CP, recomendador con IA, suscripción y pedidos directos por WhatsApp.",
      en: "Local BARF e-commerce in Puebla: coverage by ZIP, AI recommender, subscription and direct WhatsApp orders."
    },
    fullDescription: {
      es: "Tienda online para comida natural para mascotas. Incluye verificación de cobertura de entrega, recomendador inteligente basado en el perfil de la mascota y sistema de suscripción mensual.",
      en: "Online store for natural pet food. Includes delivery coverage verification, smart recommender based on pet profile and monthly subscription system."
    },
    tags: ["E-commerce", "AI Recommender", "Subscription", "WhatsApp"],
    features: {
      es: ["Cobertura por código postal", "Recomendador IA", "Suscripción mensual", "Checkout multicanal"],
      en: ["Coverage by ZIP code", "AI Recommender", "Monthly subscription", "Multi-channel checkout"]
    },
    image: portfolio2
  },
  {
    id: "bumba",
    name: "BUM'BA",
    description: {
      es: "Tienda premium para suplemento en mints: packs, multi-moneda, reviews, animaciones y checkout integrado.",
      en: "Premium store for supplement mints: packs, multi-currency, reviews, animations and integrated checkout."
    },
    fullDescription: {
      es: "E-commerce de alta conversión para suplementos. Diseño premium con animaciones fluidas, soporte multi-moneda para ventas internacionales y sistema de reviews integrado.",
      en: "High-conversion e-commerce for supplements. Premium design with smooth animations, multi-currency support for international sales and integrated reviews system."
    },
    tags: ["Shopify", "Multi-Currency", "CRO", "Premium UI"],
    features: {
      es: ["Packs con ahorro", "Múltiples monedas", "Reviews verificados", "Checkout optimizado"],
      en: ["Packs with savings", "Multiple currencies", "Verified reviews", "Optimized checkout"]
    },
    image: portfolio3
  }
];

export const Projects = () => {
  const { t, language } = useLanguage();
  const { ref, isVisible } = useReveal();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section
      id="proyectos"
      ref={ref}
      className={`py-24 md:py-32 px-6 reveal ${isVisible ? "visible" : ""}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-primary bg-primary/10 rounded-full">
            {language === "es" ? "Portfolio" : "Portfolio"}
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl mb-4">
            {language === "es" ? "Proyectos seleccionados" : "Selected Projects"}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {language === "es" 
              ? "Algunos productos que hemos diseñado y construido end-to-end."
              : "Some products we've designed and built end-to-end."}
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {projects.map((project, index) => (
                <CarouselItem 
                  key={project.id} 
                  className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <ProjectCard 
                    project={project} 
                    language={language}
                    onViewDetails={() => setSelectedProject(project)}
                    index={index}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Desktop arrows */}
            <div className="hidden md:block">
              <CarouselPrevious 
                className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 h-12 w-12 glass border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all"
              />
              <CarouselNext 
                className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 h-12 w-12 glass border-border/50 hover:bg-primary/10 hover:border-primary/30 transition-all"
              />
            </div>
          </Carousel>

          {/* Mobile dots */}
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === current 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Mobile swipe hint */}
          <p className="text-center text-sm text-muted-foreground mt-4 md:hidden">
            {language === "es" ? "Desliza para ver más →" : "Swipe to see more →"}
          </p>
        </div>
      </div>

      {/* Project Detail Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="glass max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          {selectedProject && (
            <>
              {/* Modal Image */}
              <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>

              <div className="p-6 pt-4">
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl md:text-3xl">
                    {selectedProject.name}
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground text-base leading-relaxed mt-2">
                    {selectedProject.fullDescription[language]}
                  </DialogDescription>
                </DialogHeader>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <div className="mt-6">
                  <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">
                    {language === "es" ? "Características" : "Features"}
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.features[language].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  language: "es" | "en";
  onViewDetails: () => void;
  index: number;
}

const ProjectCard = ({ project, language, onViewDetails, index }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="group glass-card overflow-hidden h-full flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onViewDetails()}
      aria-label={`${language === "es" ? "Ver detalles de" : "View details of"} ${project.name}`}
      style={{
        transitionDelay: `${index * 50}ms`
      }}
    >
      {/* Image container with parallax */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {/* Skeleton loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted-foreground/10 animate-pulse" />
        )}
        
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
            isHovered ? "scale-110" : "scale-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          style={{
            transform: isHovered ? "scale(1.1) translateY(-8px)" : "scale(1)"
          }}
        />

        {/* Gradient overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-60"
          }`} 
        />

        {/* Glow effect on hover */}
        <div 
          className={`absolute inset-0 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          style={{
            background: "radial-gradient(circle at 50% 100%, hsl(var(--primary) / 0.15), transparent 70%)"
          }}
        />
      </div>

      {/* Content */}
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <h3 className="font-display text-xl md:text-2xl mb-2 group-hover:text-primary transition-colors duration-300">
          {project.name}
        </h3>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
          {project.description[language]}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2.5 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* View details button */}
        <button
          className={`inline-flex items-center gap-2 text-sm font-medium text-primary transition-all duration-300 ${
            isHovered ? "gap-3" : "gap-2"
          }`}
          aria-hidden="true"
          tabIndex={-1}
        >
          {language === "es" ? "Ver detalle" : "View details"}
          <ExternalLink className={`w-4 h-4 transition-transform duration-300 ${
            isHovered ? "translate-x-1" : ""
          }`} />
        </button>
      </div>
    </div>
  );
};
