import { ArrowUpRight } from "lucide-react";

const links = [
  { label: "Servicios", href: "#servicios" },
  { label: "Trabajo", href: "#trabajo" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];

const socials = [
  { label: "LinkedIn", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "#" },
];

export const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 border-t border-border">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <a
              href="#"
              className="text-xl font-medium tracking-tight mb-4 inline-block"
            >
              studio<span className="text-accent">.</span>
            </a>
            <p className="text-muted-foreground text-sm max-w-xs">
              Diseño web con propósito. Creando experiencias digitales que
              convierten.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-medium mb-4">Navegación</p>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className="text-sm font-medium mb-4">Conecta</p>
            <ul className="space-y-3">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {social.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground">
            © {currentYear} studio. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacidad
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
