import { useState } from "react";
import { useInView } from "@/hooks/useAnimations";
import { Send, ArrowUpRight, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    toast({
      title: "Mensaje enviado",
      description: "Te responderé en menos de 24 horas.",
    });

    setTimeout(() => setIsSubmitted(false), 3000);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section
      id="contacto"
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 md:py-32"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left side - Text */}
          <div>
            <span
              className={`inline-block text-sm uppercase tracking-[0.2em] text-muted-foreground mb-4 ${
                isInView ? "animate-fade-up" : "opacity-0"
              }`}
            >
              Contacto
            </span>

            <h2
              className={`text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6 ${
                isInView ? "animate-fade-up animation-delay-100" : "opacity-0"
              }`}
            >
              ¿Listo para
              <span className="font-serif italic text-accent"> empezar</span>?
            </h2>

            <p
              className={`text-muted-foreground text-lg mb-8 ${
                isInView ? "animate-fade-up animation-delay-200" : "opacity-0"
              }`}
            >
              Cuéntame sobre tu proyecto. Respondo a todas las consultas en
              menos de 24 horas.
            </p>

            {/* Availability notice */}
            <div
              className={`inline-flex items-center gap-3 px-4 py-3 rounded-full bg-accent/10 border border-accent/20 ${
                isInView ? "animate-fade-up animation-delay-300" : "opacity-0"
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-sm">
                Disponible para nuevos proyectos
              </span>
            </div>

            {/* Contact info */}
            <div
              className={`mt-12 space-y-4 ${
                isInView ? "animate-fade-up animation-delay-400" : "opacity-0"
              }`}
            >
              <a
                href="mailto:hola@tudominio.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
              >
                hola@tudominio.com
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <p className="text-muted-foreground">Madrid, España</p>
            </div>
          </div>

          {/* Right side - Form */}
          <div
            className={`${
              isInView ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Nombre
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="¿Cómo te llamas?"
                  required
                  className="h-14 bg-card border-border rounded-xl px-5 focus:border-accent focus:ring-accent"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                  className="h-14 bg-card border-border rounded-xl px-5 focus:border-accent focus:ring-accent"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-medium text-muted-foreground"
                >
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Cuéntame sobre tu proyecto..."
                  required
                  className="min-h-[160px] bg-card border-border rounded-xl px-5 py-4 resize-none focus:border-accent focus:ring-accent"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className="w-full h-14 bg-foreground text-background rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-foreground/90 transition-all disabled:opacity-70"
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-5 h-5" />
                    Enviado
                  </>
                ) : isSubmitting ? (
                  <span className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                ) : (
                  <>
                    Enviar mensaje
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
