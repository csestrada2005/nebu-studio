import { useState } from "react";
import { Send, Mail, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission - will be replaced with actual email sending
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "¡Mensaje enviado!",
      description: "Te responderé en menos de 24 horas.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contacto" className="py-24">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-4">
              Contacto
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Listo para empezar tu proyecto?
            </h2>
            <p className="text-muted-foreground text-lg">
              Cuéntame sobre tu proyecto y te enviaré una propuesta personalizada en menos de 24 horas.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl p-8 shadow-card border border-border space-y-6"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />
                Nombre
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Tu nombre completo"
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                Mensaje
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Cuéntame sobre tu proyecto: qué tipo de web necesitas, objetivos, plazos..."
                required
                className="min-h-[150px] resize-none"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Enviando..."
              ) : (
                <>
                  Enviar mensaje
                  <Send className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Respuesta garantizada en menos de 24 horas
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
