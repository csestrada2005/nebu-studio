import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 animate-fade-in">
      <Button
        size="icon"
        variant="outline"
        onClick={scrollToTop}
        className="w-12 h-12 rounded-full shadow-card bg-card hover:bg-card"
        aria-label="Volver arriba"
      >
        <ArrowUp className="w-5 h-5" />
      </Button>
      
      <Button
        asChild
        className="rounded-full shadow-soft px-6"
      >
        <a href="#contacto">
          Contactar
        </a>
      </Button>
    </div>
  );
};
