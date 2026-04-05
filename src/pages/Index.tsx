import { useEffect, useRef, useCallback } from "react";
import { Scale, Search, Globe, Settings, Zap, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";

/* ─── Scroll fade-in observer ─── */
function useScrollReveal() {
  const observed = useRef(new Set<Element>());

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const els = document.querySelectorAll(".fade-up");
    els.forEach((el) => {
      observed.current.add(el);
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);
}

/* ─── Smooth scroll ─── */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ═══════════════════════════════════════════════
   NAV
   ═══════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: "Servicios", id: "servicios" },
  { label: "Por qué NEBU", id: "porque" },
  { label: "Cómo trabajamos", id: "proceso" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNav = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => scrollToSection(id), 100);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-border ${
          scrolled ? "bg-background/95 backdrop-blur-sm" : "bg-background"
        }`}
      >
        <div className="container flex items-center justify-between h-16">
          {/* Wordmark */}
          <button onClick={() => scrollToSection("hero")} className="flex items-baseline gap-0">
            <span className="font-display text-xl text-foreground">NEBU</span>
            <span className="font-display text-xl text-primary ml-1">Studio</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <button
              onClick={() => handleNav("contacto")}
              className="text-sm px-5 py-2 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col bg-background transition-all duration-300 ${
          mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-5">
          <div className="flex items-baseline">
            <span className="font-display text-xl text-foreground">NEBU</span>
            <span className="font-display text-xl text-primary ml-1">Studio</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="w-10 h-10 flex items-center justify-center">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
          {[...NAV_LINKS, { label: "Contacto", id: "contacto" }].map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className="font-display text-3xl text-foreground py-4 text-left border-b border-border"
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16">
      {/* Subtle radial glow */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: "radial-gradient(circle at 80% 20%, hsl(355 78% 56% / 0.04), transparent 60%)",
        }}
      />

      <div className="container relative z-10">
        <p className="text-primary text-xs tracking-[0.2em] uppercase font-semibold mb-8 fade-up">
          Despachos de abogados
        </p>

        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground max-w-4xl mb-6 fade-up">
          Presencia digital que genera confianza.
          <br />
          Sistemas que escalan el despacho.
        </h1>

        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mb-10 fade-up">
          Construimos el sistema operativo digital de tu despacho.
          Desde tu sitio web hasta la automatización de procesos internos.
        </p>

        <div className="fade-up">
          <a
            href="mailto:j.cuatrecasas@nebustudio.com"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-[0.1em] font-semibold hover:brightness-110 transition-all"
          >
            Agenda una consulta
          </a>
          
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   WHY (Por qué importa)
   ═══════════════════════════════════════════════ */
const PAIN_POINTS = [
  {
    stat: "70%",
    label: "Sin presencia digital real",
    desc: "De los despachos en Puebla no tienen un sitio web profesional.",
  },
  {
    stat: "20+",
    label: "Llamadas por semana",
    desc: "Los clientes llaman constantemente para saber el estatus de su caso.",
  },
  {
    stat: "3x",
    label: "Clientes perdidos",
    desc: "Los despachos pierden prospectos por no dar seguimiento oportuno.",
  },
];

function WhySection() {
  return (
    <section id="porque" className="py-24 sm:py-32">
      <div className="container">
        <SectionTitle title="El problema" />

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mt-16">
          {/* Pain points */}
          <div className="space-y-10">
            {PAIN_POINTS.map((p, i) => (
              <div key={i} className="fade-up">
                <span className="font-display text-4xl sm:text-5xl text-primary">{p.stat}</span>
                <h3 className="font-display text-lg text-foreground mt-2">{p.label}</h3>
                <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* Result card */}
          <div className="fade-up flex items-start">
            <div className="bg-card border border-border p-8 sm:p-10 w-full">
              <h3 className="font-display text-xl sm:text-2xl text-foreground leading-snug">
                El resultado: talento legal de primer nivel, invisible en internet y sin sistemas para escalar.
              </h3>
              <p className="text-primary font-semibold mt-6 text-lg">Nosotros lo resolvemos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SERVICES
   ═══════════════════════════════════════════════ */
const SERVICES = [
  {
    icon: Scale,
    name: "Branding",
    desc: "Identidad visual que proyecta autoridad desde el primer contacto.",
  },
  {
    icon: Search,
    name: "SEO Local",
    desc: "Tu despacho en los primeros resultados cuando un cliente te busca en Puebla.",
  },
  {
    icon: Globe,
    name: "Diseño Web",
    desc: "Sitios profesionales optimizados para convertir visitas en consultas.",
  },
  {
    icon: Settings,
    name: "Software a Medida",
    desc: "Portales de cliente, CRM interno y sistemas operativos para tu despacho.",
  },
  {
    icon: Zap,
    name: "Automatización & IA",
    desc: "Procesos internos automatizados. Menos tiempo administrativo, más tiempo facturando.",
  },
];

function ServicesSection() {
  return (
    <section id="servicios" className="py-24 sm:py-32">
      <div className="container">
        <SectionTitle title="Lo que construimos" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="fade-up bg-card border border-border p-6 sm:p-8 hover:border-primary transition-colors group"
            >
              <s.icon className="w-6 h-6 text-muted-foreground mb-5 group-hover:text-primary transition-colors" />
              <h3 className="font-display text-lg text-foreground mb-2">{s.name}</h3>
              <p className="text-muted-foreground text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PROCESS
   ═══════════════════════════════════════════════ */
const STEPS = [
  { num: "01", name: "Diagnóstico", desc: "Analizamos tu situación actual sin costo." },
  { num: "02", name: "Propuesta", desc: "Te presentamos el sistema completo en 48 horas." },
  { num: "03", name: "Construcción", desc: "Desarrollamos con actualizaciones semanales." },
  { num: "04", name: "Activación", desc: "Entrega, capacitación y soporte continuo." },
];

function ProcessSection() {
  return (
    <section id="proceso" className="py-24 sm:py-32">
      <div className="container">
        <SectionTitle title="El proceso" />

        {/* Desktop: horizontal */}
        <div className="hidden md:grid grid-cols-4 gap-0 mt-16 relative">
          {/* Connecting line */}
          <div className="absolute top-8 left-[12.5%] right-[12.5%] h-px bg-border" />

          {STEPS.map((step, i) => (
            <div key={i} className="fade-up text-center relative">
              <span className="font-display text-3xl text-primary relative z-10 bg-background px-3 inline-block">
                {step.num}
              </span>
              <h3 className="font-display text-lg text-foreground mt-4">{step.name}</h3>
              <p className="text-muted-foreground text-sm mt-2 max-w-[200px] mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden mt-12 relative pl-8">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-3 w-px bg-border" />

          {STEPS.map((step, i) => (
            <div key={i} className="fade-up relative pb-10 last:pb-0">
              <div className="absolute left-[-22px] top-1 w-3 h-3 rounded-full bg-primary" />
              <span className="font-display text-2xl text-primary">{step.num}</span>
              <h3 className="font-display text-lg text-foreground mt-1">{step.name}</h3>
              <p className="text-muted-foreground text-sm mt-1">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════ */
function CtaSection() {
  return (
    <section id="contacto" className="py-24 sm:py-32 bg-card">
      <div className="container text-center">
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground max-w-2xl mx-auto fade-up">
          ¿Tu despacho debería ser más visible?
        </h2>

        <p className="text-muted-foreground text-base sm:text-lg mt-6 max-w-xl mx-auto fade-up">
          Hablamos 20 minutos. Sin compromiso. Te decimos exactamente qué necesita tu despacho.
        </p>

        <div className="mt-10 fade-up">
          <a
            href="mailto:j.cuatrecasas@nebustudio.com"
            className="inline-block bg-primary text-primary-foreground px-10 py-4 text-sm uppercase tracking-[0.1em] font-semibold hover:brightness-110 transition-all"
          >
            Agenda tu consulta gratuita
          </a>
        </div>

        <p className="text-muted-foreground text-sm mt-5 fade-up">
          O escríbenos directamente:{" "}
          <a href="mailto:j.cuatrecasas@nebustudio.com" className="text-foreground hover:text-primary transition-colors">
            j.cuatrecasas@nebustudio.com
          </a>
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="py-12">
      <div className="container">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="flex items-baseline">
              <span className="font-display text-lg text-foreground">NEBU</span>
              <span className="font-display text-lg text-primary ml-1">Studio</span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">El sistema operativo de tu despacho.</p>
          </div>

          <nav className="flex gap-6">
            {[
              { label: "Servicios", id: "servicios" },
              { label: "Contacto", id: "contacto" },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
          </nav>
        </div>

        <div className="border-t border-border mt-8 pt-6">
          <p className="text-muted-foreground text-xs">
            © 2026 NEBU Studio. Puebla, México.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Section title helper ─── */
function SectionTitle({ title }: { title: string }) {
  return (
    <div className="fade-up">
      <h2 className="font-display text-2xl sm:text-3xl text-foreground">{title}</h2>
      <div className="w-10 h-0.5 bg-primary mt-3" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   INDEX PAGE
   ═══════════════════════════════════════════════ */
const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <WhySection />
      <ServicesSection />
      <ProcessSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Index;
