import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "#servicios", label: "Servicios" },
  { href: "#trabajo", label: "Trabajo" },
  { href: "#proceso", label: "Proceso" },
  { href: "#contacto", label: "Contacto" },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="container">
          <div
            className={`flex items-center justify-between px-6 py-4 transition-all duration-500 ${
              isScrolled
                ? "bg-background/80 backdrop-blur-xl rounded-full border border-border/50 shadow-sm"
                : ""
            }`}
          >
            <a
              href="#"
              className="text-lg font-medium tracking-tight hover:opacity-70 transition-opacity"
            >
              studio<span className="text-accent">.</span>
            </a>

            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors line-reveal"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#contacto"
              className="hidden md:flex items-center gap-2 text-sm font-medium px-5 py-2.5 bg-foreground text-background rounded-full hover:bg-foreground/90 transition-colors group"
            >
              Hablemos
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 -mr-2"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[100] bg-background transition-all duration-500 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="container h-full flex flex-col">
          <div className="flex items-center justify-between py-6 px-6">
            <a href="#" className="text-lg font-medium tracking-tight">
              studio<span className="text-accent">.</span>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 -mr-2"
              aria-label="Cerrar menú"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center gap-2 px-6">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-4xl font-serif italic text-foreground py-3 border-b border-border/30 transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-8"
                }`}
                style={{ transitionDelay: `${index * 75}ms` }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="py-8 px-6">
            <a
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-4 bg-foreground text-background rounded-full font-medium"
            >
              Comenzar proyecto
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
