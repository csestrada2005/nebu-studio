import { Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Scarcity = () => {
  return (
    <section className="py-12 bg-primary">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-primary-foreground">
            <div className="w-12 h-12 rounded-full bg-primary-foreground/10 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="font-semibold text-lg">
                Disponibilidad limitada
              </p>
              <p className="text-primary-foreground/80 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Actualmente acepto solo 3 proyectos nuevos al mes
              </p>
            </div>
          </div>
          
          <Button
            variant="secondary"
            size="lg"
            asChild
            className="whitespace-nowrap"
          >
            <a href="#contacto">Reservar mi plaza</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
