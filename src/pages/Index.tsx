import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { useScrollRevealV2, useCountUp } from "@/hooks/useScrollRevealV2";

/* ─── Smooth scroll ─── */
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ─── Reduced motion check ─── */
function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return reduced;
}

/* ─── IntersectionObserver trigger hook ─── */
function useInViewOnce(opts: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold: 0.15, ...opts });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* ═══════════════════════════════════════════════
   ANIMATED SECTION SEPARATOR
   ═══════════════════════════════════════════════ */
function SectionSep() {
  const { ref, visible } = useInViewOnce();
  return (
    <div ref={ref} className="relative h-px w-full max-w-[1200px] mx-auto overflow-hidden">
      <div
        className="absolute inset-0 transition-all ease-out"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(230,57,70,0.35) 50%, transparent)",
          boxShadow: visible ? "0 0 10px rgba(230,57,70,0.3)" : "none",
          width: visible ? "100%" : "0%",
          transitionDuration: "1.2s",
          margin: "0 auto",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCROLL PROGRESS BAR — 3px with glow
   ═══════════════════════════════════════════════ */
function ScrollProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(() => {
        const h = document.body.scrollHeight - window.innerHeight;
        setPct(h > 0 ? (window.scrollY / h) * 100 : 0);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-[9999] h-[3px] w-full pointer-events-none">
      <div
        className="h-full bg-primary"
        style={{
          width: `${pct}%`,
          borderRadius: "0 2px 2px 0",
          boxShadow: "0 0 12px rgba(230,57,70,0.8), 0 0 24px rgba(230,57,70,0.4)",
          transition: "width 80ms linear",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   NAV — Reveal from top + link flip stagger
   ═══════════════════════════════════════════════ */
const NAV_LINKS = [
  { label: "Servicios", id: "servicios" },
  { label: "Por qué NEBU", id: "porque" },
  { label: "Cómo trabajamos", id: "proceso" },
  { label: "Contacto", id: "contacto" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setNavReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          background: scrolled ? "rgba(13,13,13,0.92)" : "rgba(13,13,13,0.7)",
          backdropFilter: "blur(40px) saturate(180%)",
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          borderBottom: scrolled ? "1px solid rgba(230,57,70,0.2)" : "1px solid rgba(255,255,255,0.10)",
          boxShadow: scrolled
            ? "inset 0 -1px 0 rgba(230,57,70,0.1), 0 4px 40px rgba(0,0,0,0.5)"
            : "inset 0 -1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.3)",
          transform: navReady ? "translateY(0)" : "translateY(-100%)",
          opacity: navReady ? 1 : 0,
          transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.7s ease, background 0.4s ease, border-bottom 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-5 flex items-center justify-between h-16">
          <button onClick={() => scrollToSection("hero")} className="flex items-baseline gap-0">
            <span className="font-display text-xl text-foreground font-bold">NEBU</span>
            <span className="font-display text-xl text-primary ml-1 font-bold">Studio</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.filter(l => l.id !== "contacto").map((link, i) => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group py-1"
                style={{
                  opacity: navReady ? 1 : 0,
                  transform: navReady ? "translateY(0)" : "translateY(-20px)",
                  transition: `opacity 0.4s ease ${500 + i * 80}ms, transform 0.4s ease ${500 + i * 80}ms, color 0.3s`,
                }}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300"
                  style={{ boxShadow: "0 0 8px rgba(230,57,70,0.6)" }} />
              </button>
            ))}
            <button
              onClick={() => handleNav("contacto")}
              className="cta-outline text-sm px-5 py-2 text-primary rounded-none"
              style={{
                opacity: navReady ? 1 : 0,
                transform: navReady ? "translateY(0)" : "translateY(-20px)",
                transition: `opacity 0.4s ease ${500 + 3 * 80}ms, transform 0.4s ease ${500 + 3 * 80}ms`,
              }}
            >
              Agendar consulta
            </button>
          </nav>

          <button onClick={() => setMobileOpen(true)} className="md:hidden w-10 h-10 flex items-center justify-center" aria-label="Abrir menú">
            <Menu className="w-5 h-5 text-foreground" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[100] flex flex-col bg-background transition-all duration-300 ${mobileOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}>
        <div className="flex items-center justify-between h-16 px-5">
          <div className="flex items-baseline">
            <span className="font-display text-xl text-foreground font-bold">NEBU</span>
            <span className="font-display text-xl text-primary ml-1 font-bold">Studio</span>
          </div>
          <button onClick={() => setMobileOpen(false)} className="w-10 h-10 flex items-center justify-center">
            <X className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
          {NAV_LINKS.map((link) => (
            <button key={link.id} onClick={() => handleNav(link.id)} className="font-display text-3xl text-foreground py-4 text-left border-b border-border">
              {link.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════════
   HERO — Text explosion + scramble tagline + spring CTA
   ═══════════════════════════════════════════════ */

/* Split text into animated chars */
function CharSplash({ text, className, delayBase = 0 }: { text: string; className?: string; delayBase?: number }) {
  const reduced = useReducedMotion();
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="inline-block hero-char-enter"
          style={{
            animationDelay: reduced ? "0ms" : `${delayBase + i * 60}ms`,
            display: char === " " ? "inline" : "inline-block",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

/* Word-by-word clip-path reveal */
function WordReveal({ text, className, delayBase = 800 }: { text: string; className?: string; delayBase?: number }) {
  const reduced = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <span
            className="inline-block hero-word-reveal"
            style={{
              animationDelay: reduced ? "0ms" : `${delayBase + i * 120}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

/* Scramble text effect */
function ScrambleText({ target, className, startDelay = 1600 }: { target: string; className?: string; startDelay?: number }) {
  const [display, setDisplay] = useState("");
  const reduced = useReducedMotion();
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    if (reduced) { setDisplay(target); return; }
    const startTimeout = setTimeout(() => {
      let resolved = 0;
      const interval = setInterval(() => {
        setDisplay(
          target.split("").map((c, i) => {
            if (i < resolved) return c;
            return chars[Math.floor(Math.random() * chars.length)];
          }).join("")
        );
        resolved++;
        if (resolved > target.length) clearInterval(interval);
      }, 1500 / target.length);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(startTimeout);
  }, [target, reduced, startDelay]);

  return <span className={className}>{display || "\u00A0"}</span>;
}

/* Shatter particles on CTA click */
function ShatterParticles({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const dist = 40 + Math.random() * 30;
        return (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary rounded-sm shatter-particle"
            style={{
              left: "50%",
              top: "50%",
              "--tx": `${Math.cos(angle) * dist}px`,
              "--ty": `${Math.sin(angle) * dist}px`,
              "--rot": `${Math.random() * 360}deg`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

/* Scroll indicator bounce arrow */
function ScrollIndicator() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-opacity duration-300"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        className="w-6 h-6 text-primary scroll-bounce-arrow">
        <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
      </svg>
    </div>
  );
}

function Hero() {
  const [shatter, setShatter] = useState(false);

  const handleCtaClick = () => {
    if (!shatter) {
      setShatter(true);
      setTimeout(() => setShatter(false), 700);
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1920&q=80" alt="" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(13,13,13,0.92) 50%, rgba(13,13,13,0.6) 100%)" }} />
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-60"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E63946' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient orb */}
      <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(230,57,70,0.08) 0%, transparent 70%)" }}
      />

      <div className="max-w-[1200px] mx-auto px-5 relative z-10 w-full">
        <div className="max-w-2xl">
          <p className="text-primary text-xs tracking-[0.2em] uppercase font-semibold mb-8 hero-fade-in" style={{ animationDelay: "0.1s" }}>
            Despachos de abogados
          </p>

          <h1 className="font-display text-4xl sm:text-5xl md:text-[56px] lg:text-[64px] text-foreground leading-[1.1] mb-2">
            <span className="block font-mono" style={{ color: "#F5F5F5" }}>
              <ScrambleText target="Presencia digital" />
            </span>
            <span className="block font-mono" style={{ color: "#F5F5F5" }}>
              <ScrambleText target="que genera" />
            </span>
            <span className="block font-mono" style={{ color: "#F5F5F5" }}>
              <ScrambleText target="confianza." />
            </span>
          </h1>

          {/* Red divider */}
          <div className="h-[2px] bg-primary line-expand my-6" style={{ animationDelay: "2.8s" }} />

          {/* Scramble tagline */}
          <p className="font-mono text-sm mb-8" style={{ color: "#E63946" }}>
            <ScrambleText target="El sistema operativo de tu despacho." />
          </p>

          {/* Subtitle */}
          <p className="text-muted-foreground text-base sm:text-lg max-w-lg mb-10 hero-fade-in" style={{ animationDelay: "2s" }}>
            Desde tu sitio web hasta la automatización de procesos internos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 relative">
            <div className="relative hero-cta-spring" style={{ animationDelay: "1.4s" }}>
              <a
                href="mailto:j.cuatrecasas@nebustudio.com"
                onClick={handleCtaClick}
                className="cta-shine inline-block bg-primary text-primary-foreground px-8 py-4 text-sm uppercase tracking-[0.1em] font-semibold text-center rounded-sm relative overflow-visible transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
                style={{ boxShadow: "0 4px 20px rgba(230,57,70,0.4)" }}
              >
                Agenda tu diagnóstico gratuito
              </a>
              <ShatterParticles active={shatter} />
            </div>
            <div className="hero-cta-spring" style={{ animationDelay: "1.6s" }}>
              <a
                href="https://wa.me/522213497090?text=Hola%2C%20me%20interesa%20conocer%20el%20sistema%20para%20mi%20despacho"
                target="_blank" rel="noopener noreferrer"
                className="cta-outline inline-block text-foreground px-8 py-4 text-sm uppercase tracking-[0.1em] font-semibold text-center hover:scale-[1.04] active:scale-[0.97] transition-transform"
              >
                Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}

/* ─── Trust bar ─── */
function TrustBar() {
  const items = ["Puebla, México", "Especialistas en el sector legal", "Respuesta en 24 horas", "Sin compromiso inicial"];
  return (
    <div className="relative z-10" style={{ background: "rgba(13,13,13,0.7)" }}>
      <div className="max-w-[1200px] mx-auto px-5 py-4 flex flex-wrap justify-center gap-x-12 gap-y-2">
        {items.map((item, i) => (
          <span key={i} className="text-xs text-muted-foreground uppercase tracking-[0.1em]">{item}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   WHY SECTION
   ═══════════════════════════════════════════════ */
const PAIN_POINTS = [
  { stat: "70%", label: "Sin presencia digital real", desc: "De los despachos en Puebla no tienen un sitio web profesional." },
  { stat: "20+", label: "Llamadas por semana", desc: "Los clientes llaman constantemente para saber el estatus de su caso." },
  { stat: "3x", label: "Clientes perdidos", desc: "Los despachos pierden prospectos por no dar seguimiento oportuno." },
];

function WhySection() {
  return (
    <section id="porque" className="py-24 sm:py-32 relative z-10">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionTitle title="El problema" />
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 mt-16">
          <div className="space-y-10">
            {PAIN_POINTS.map((p, i) => (
              <div key={i} data-reveal="left" data-delay={String(i + 1)}>
                <span className="font-display text-4xl sm:text-5xl text-primary"
                  style={{ textShadow: "0 0 30px rgba(230,57,70,0.4)" }}
                  data-count-target={p.stat} data-count-suffix={p.stat.includes("+") ? "+" : p.stat.includes("x") ? "x" : ""}>
                  0
                </span>
                <h3 className="font-display text-lg text-foreground mt-2">{p.label}</h3>
                <p className="text-muted-foreground text-sm mt-1">{p.desc}</p>
              </div>
            ))}
          </div>
          <div data-reveal="right" data-delay="2" className="flex items-start">
            <div className="relative w-full overflow-hidden glass-card p-0" style={{ borderRadius: "4px" }}>
              <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
                alt="Abogado trabajando" className="w-full h-[400px] object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-background/40" />
              <div className="absolute inset-y-0 left-0 w-[3px] bg-primary" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SERVICES — Diagonal slide in + rim light sweep
   ═══════════════════════════════════════════════ */
const SERVICES = [
  { num: "01", name: "Branding", desc: "Identidad visual que proyecta autoridad desde el primer contacto.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.77 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" /></svg> },
  { num: "02", name: "SEO Local", desc: "Tu despacho en los primeros resultados cuando un cliente te busca en Puebla.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" /></svg> },
  { num: "03", name: "Diseño Web", desc: "Sitios profesionales optimizados para convertir visitas en consultas.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></svg> },
  { num: "04", name: "Software a Medida", desc: "Portales de cliente, CRM interno y sistemas operativos para tu despacho.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg> },
  { num: "05", name: "Automatización & IA", desc: "Procesos internos automatizados. Menos tiempo administrativo, más tiempo facturando.",
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg> },
];

function ServiceCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const { ref, visible } = useInViewOnce({ threshold: 0.15 });
  const isEven = i % 2 === 0;
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="glass-card glass-card-featured p-7 relative overflow-hidden group service-card-rim"
      style={{
        borderTop: "1px solid rgba(230,57,70,0.3)",
        opacity: visible || reduced ? 1 : 0,
        transform: visible || reduced ? "none" : `translate(${isEven ? "-80px" : "80px"}, 30px)`,
        transition: `all 0.75s cubic-bezier(0.4,0,0.2,1) ${i * 120}ms`,
      }}
    >
      <span className="absolute top-4 right-5 font-display text-[64px] leading-none font-bold"
        style={{ color: "rgba(230,57,70,0.12)" }}>
        {s.num}
      </span>
      <div className="text-primary mb-5">{s.icon}</div>
      <h3 className="font-display text-lg text-foreground mb-2">{s.name}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
    </div>
  );
}

function ServicesSection() {
  return (
    <section id="servicios" className="py-24 sm:py-32 relative z-10">
      <div className="absolute right-[-150px] top-1/3 w-[500px] h-[500px] pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(230,57,70,0.06) 0%, transparent 70%)" }} />
      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        <SectionTitle title="Lo que construimos" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {SERVICES.map((s, i) => <ServiceCard key={i} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════ */
function AboutSection() {
  const differentiators = [
    "Equipo con experiencia exclusiva en el sector legal",
    "Sistema integrado: web + CRM + portal de cliente + IA",
    "Acompañamiento continuo, no solo entrega",
  ];

  return (
    <section className="py-24 sm:py-32 relative z-10" style={{ background: "rgba(13,13,13,0.75)" }}>
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid md:grid-cols-[40%_60%] gap-12 lg:gap-16 items-start">
          <div data-reveal="left">
            <div className="glass-card overflow-hidden p-0" style={{ borderRadius: "4px" }}>
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80"
                alt="Josep Cuatrecasas — CEO & Fundador" className="w-full h-[480px] object-cover" loading="lazy" />
            </div>
            <p className="text-muted-foreground text-xs mt-3 tracking-wide">Josep Cuatrecasas — CEO & Fundador</p>
          </div>
          <div data-reveal="right" data-delay="2">
            <h2 className="font-display text-3xl sm:text-4xl text-foreground leading-tight mb-6">
              Especialistas en despachos.<br />No en todo.
            </h2>
            <p className="text-muted-foreground text-base leading-[1.7] mb-8">
              NEBU Studio nació con una misión específica: ayudar a despachos de abogados en Puebla a competir en un mundo digital. No somos una agencia generalista. Conocemos los dolores del sector legal: los clientes que llaman 20 veces por semana, los prospectos que nunca regresan, la operación que no escala sin contratar más gente.
            </p>
            <ul className="space-y-4">
              {differentiators.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-0.5">✓</span>
                  <span className="text-foreground text-sm">{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   METRICS — 3D Flip In cards + CountUp
   ═══════════════════════════════════════════════ */
const METRICS = [
  { value: "70%", label: "De despachos en Puebla sin web profesional" },
  { value: "48h", label: "De diagnóstico digital gratuito a propuesta" },
  { value: "4x", label: "Más consultas para despachos con SEO local activo" },
  { value: "100%", label: "De proyectos con actualizaciones semanales" },
];

function MetricCard({ m, i }: { m: typeof METRICS[0]; i: number }) {
  const { ref, visible } = useInViewOnce({ threshold: 0.3 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="glass-card text-center py-8 px-4"
      style={{
        borderTop: "1px solid rgba(230,57,70,0.3)",
        perspective: "800px",
      }}
    >
      <div style={{
        opacity: visible || reduced ? 1 : 0,
        transform: visible || reduced ? "rotateX(0)" : "rotateX(90deg)",
        transformOrigin: "top center",
        transition: `all 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 150}ms`,
      }}>
        <span className="font-display text-4xl sm:text-[56px] text-primary font-bold leading-none"
          style={{ textShadow: "0 0 30px rgba(230,57,70,0.4)" }}
          data-count-target={m.value}
          data-count-suffix={m.value.includes("x") ? "x" : m.value.includes("h") ? "h" : ""}>
          0
        </span>
        <p className="text-muted-foreground text-[13px] mt-3 max-w-[160px] mx-auto leading-snug">{m.label}</p>
      </div>
    </div>
  );
}

function MetricsSection() {
  return (
    <section className="py-16 sm:py-20 relative z-10">
      <div className="max-w-[1200px] mx-auto px-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {METRICS.map((m, i) => <MetricCard key={i} m={m} i={i} />)}
        </div>
        <p data-reveal="up" className="text-center text-muted-foreground/60 text-sm italic mt-8">
          Estos números son el resultado de un sistema, no de suerte.
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TESTIMONIALS — Elastic spring + star fill
   ═══════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    quote: "Llevábamos 5 años invisibles en Google. A los 3 meses con NEBU, los clientes nos encuentran solos y ya no tenemos que explicar quiénes somos en cada llamada.",
    name: "Lic. Fernando Garza", role: "Socio — Despacho Corporativo, Puebla", initials: "FG",
  },
  {
    quote: "El portal de cliente redujo el 80% de las llamadas de seguimiento. Mi equipo ahora se enfoca en facturar, no en contestar el teléfono.",
    name: "Lic. Ana Mendoza", role: "Directora — Despacho Laboral, Cholula", initials: "AM",
  },
  {
    quote: "Proceso profesional, entregas puntuales y un equipo que realmente entiende cómo funciona un despacho. No es tecnología por tecnología, es tecnología para crecer.",
    name: "Lic. Roberto Vázquez", role: "Socio Fundador — Mercantil, Centro Puebla", initials: "RV",
  },
];

function AnimatedStars({ visible }: { visible: boolean }) {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="w-3.5 h-3.5 transition-colors duration-200"
          style={{
            color: visible ? "#E63946" : "transparent",
            transitionDelay: visible ? `${i * 100}ms` : "0ms",
          }}
          fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TestimonialCard({ t, i }: { t: typeof TESTIMONIALS[0]; i: number }) {
  const { ref, visible } = useInViewOnce({ threshold: 0.15 });
  const reduced = useReducedMotion();

  return (
    <div
      ref={ref}
      className="glass-card p-7"
      style={{
        borderLeft: "2px solid hsl(355 78% 56%)",
        borderRadius: "12px",
        opacity: visible || reduced ? 1 : 0,
        transform: visible || reduced ? "scale(1) translateY(0)" : "scale(0.7) translateY(40px)",
        transition: `all 0.8s cubic-bezier(.34,1.56,.64,1) ${i * 200}ms`,
      }}
    >
      <AnimatedStars visible={visible || reduced} />
      <p className="text-[15px] leading-[1.7] italic mb-5" style={{ color: "#C0C0C0" }}>
        "{t.quote}"
      </p>
      <div className="border-t border-border/30 pt-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-primary font-display text-sm font-semibold"
          style={{ background: "rgba(230,57,70,0.15)", border: "1px solid rgba(230,57,70,0.3)" }}>
          {t.initials}
        </div>
        <div>
          <p className="text-foreground text-sm font-medium">{t.name}</p>
          <p className="text-muted-foreground text-xs">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  return (
    <section className="py-24 sm:py-32 relative z-10" style={{ background: "rgba(10,10,10,0.8)" }}>
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[600px] h-[400px] pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.06) 0%, transparent 60%)" }} />
      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        <SectionTitle title="Lo que dicen los despachos" />
        <p data-reveal="up" className="text-muted-foreground text-base mt-4 mb-16">
          Abogados que ya digitalizaron su operación con NEBU
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, i) => <TestimonialCard key={i} t={t} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PROCESS — Typewriter titles + connecting lines
   ═══════════════════════════════════════════════ */
const STEPS = [
  { num: "01", name: "Diagnóstico", desc: "Reunión de 20 min sin compromiso. Solo escuchamos." },
  { num: "02", name: "Propuesta", desc: "Sistema completo adaptado a tu despacho en 48 horas." },
  { num: "03", name: "Construcción", desc: "Updates semanales. Tú ves el avance en tiempo real." },
  { num: "04", name: "Activación", desc: "Capacitación, soporte y retainer mensual opcional." },
];

function TypewriterText({ text, active }: { text: string; active: boolean }) {
  const [display, setDisplay] = useState("");
  const [showCursor, setShowCursor] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduced) { setDisplay(text); return; }
    setShowCursor(true);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplay(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => setShowCursor(false), 500);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [active, text, reduced]);

  return (
    <span>
      {display}
      {showCursor && <span className="typewriter-cursor">|</span>}
    </span>
  );
}

function ProcessStep({ step, i }: { step: typeof STEPS[0]; i: number }) {
  const { ref, visible } = useInViewOnce({ threshold: 0.3 });
  return (
    <div ref={ref} className="text-center relative">
      <div className="w-9 h-9 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center mx-auto relative z-10"
        style={{
          boxShadow: "0 0 20px rgba(230,57,70,0.4)",
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0)",
          transition: `all 0.5s cubic-bezier(.34,1.56,.64,1) ${i * 200}ms`,
        }}>
        {step.num}
      </div>
      <h3 className="font-display text-lg text-foreground mt-5">
        <TypewriterText text={step.name} active={visible} />
      </h3>
      <p className="text-muted-foreground text-xs mt-2 max-w-[200px] mx-auto leading-relaxed"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity 0.5s ease ${i * 200 + 400}ms`,
        }}>
        {step.desc}
      </p>
    </div>
  );
}

function ProcessSection() {
  const { ref: lineRef, visible: lineVisible } = useInViewOnce({ threshold: 0.3 });

  return (
    <section id="proceso" className="py-24 sm:py-32 relative z-10"
      style={{
        backgroundImage: "url(https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80)",
        backgroundSize: "cover", backgroundPosition: "center",
      }}>
      <div className="absolute inset-0 bg-background/[0.92]" />
      <div className="max-w-[1200px] mx-auto px-5 relative z-10">
        <SectionTitle title="El proceso" />

        {/* Desktop */}
        <div ref={lineRef} className="hidden md:grid grid-cols-4 gap-0 mt-16 relative">
          {/* Animated connecting line */}
          <div className="absolute top-[18px] left-[12.5%] right-[12.5%] h-[2px] overflow-hidden">
            <div
              className="h-full bg-primary"
              style={{
                width: lineVisible ? "100%" : "0%",
                transition: "width 0.8s ease",
                boxShadow: "0 0 8px rgba(230,57,70,0.4)",
              }}
            />
          </div>
          {STEPS.map((step, i) => <ProcessStep key={i} step={step} i={i} />)}
        </div>

        {/* Mobile */}
        <div className="md:hidden mt-12 relative pl-8">
          <div className="absolute top-0 bottom-0 left-[14px] w-px border-l border-dashed border-border" />
          {STEPS.map((step, i) => (
            <div key={i} data-reveal="left" data-delay={String(i + 1)} className="relative pb-10 last:pb-0">
              <div className="absolute left-[-22px] top-0 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center"
                style={{ boxShadow: "0 0 16px rgba(230,57,70,0.4)" }}>
                {step.num}
              </div>
              <h3 className="font-display text-lg text-foreground">{step.name}</h3>
              <p className="text-muted-foreground text-xs mt-1 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FAQ
   ═══════════════════════════════════════════════ */
const FAQS = [
  { q: "¿Cuánto tiempo tarda en verse el sitio web terminado?", a: "Entre 3 y 5 semanas dependiendo del paquete. Trabajamos con actualizaciones semanales para que puedas ver el avance desde la primera semana." },
  { q: "¿Necesito saber de tecnología para usar el sistema?", a: "No. Nos encargamos de todo el aspecto técnico. Tú recibes capacitación en el uso del portal y el CRM. Nuestro soporte está disponible de forma continua." },
  { q: "¿Qué pasa si ya tengo un sitio web?", a: "Lo analizamos sin costo. En la mayoría de los casos, el sitio existente tiene problemas de SEO, velocidad o conversión. Podemos migrarlo o construir uno nuevo según lo que convenga." },
  { q: "¿Trabajan solo con despachos?", a: "No. Aunque tenemos experiencia profunda en el sector legal, también desarrollamos proyectos de e-commerce, landing pages, software a medida, plataformas SaaS y más. Nos adaptamos a lo que tu negocio necesite." },
  { q: "¿Cuál es la inversión mínima para comenzar?", a: "Los proyectos inician desde $25,000 MXN con política de pago 50% anticipo y 50% contra entrega." },
];

function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="py-24 sm:py-32 relative z-10">
      <div className="max-w-[1200px] mx-auto px-5">
        <SectionTitle title="Preguntas frecuentes" />
        <div className="mt-16 max-w-3xl">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} data-reveal="up" data-delay={String(i + 1)}>
                <button onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left group">
                  <span className="text-foreground text-base pr-4">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? "200px" : "0", opacity: isOpen ? 1 : 0 }}>
                  <p className="text-muted-foreground text-sm leading-[1.7] pb-5">{faq.a}</p>
                </div>
                <div style={{ borderBottom: "1px solid #1A1A1A" }} />
              </div>
            );
          })}
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
    <section id="contacto" className="py-24 sm:py-32 relative z-10" style={{ background: "rgba(13,13,13,0.6)" }}>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(230,57,70,0.10) 0%, transparent 60%)" }} />
      <div className="max-w-[1200px] mx-auto px-5 text-center relative z-10">
        <h2 data-reveal="up" className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground max-w-2xl mx-auto">
          ¿Tu despacho debería ser más visible?
        </h2>
        <p data-reveal="up" style={{ transitionDelay: "100ms" }} className="text-muted-foreground text-base sm:text-lg mt-6 max-w-xl mx-auto">
          Hablamos 20 minutos. Sin compromiso. Te decimos exactamente qué necesita tu despacho.
        </p>
        <div data-reveal="up" style={{ transitionDelay: "200ms" }} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:j.cuatrecasas@nebustudio.com"
            className="cta-shine inline-block bg-primary text-primary-foreground px-10 py-4 text-sm uppercase tracking-[0.1em] font-semibold rounded-sm">
            Agenda tu diagnóstico gratuito
          </a>
          <a href="https://wa.me/522213497090?text=Hola%2C%20me%20interesa%20conocer%20el%20sistema%20para%20mi%20despacho"
            target="_blank" rel="noopener noreferrer"
            className="cta-outline inline-block text-foreground px-10 py-4 text-sm uppercase tracking-[0.1em] font-semibold">
            Escríbenos por WhatsApp
          </a>
        </div>
        <p data-reveal="up" style={{ transitionDelay: "300ms" }} className="text-muted-foreground/50 text-xs mt-6">
          Sin compromiso  ·  Respuesta en 24h  ·  Puebla, México
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
    <footer className="py-12 relative z-10">
      <div className="max-w-[1200px] mx-auto px-5">
        <div data-reveal="up" className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div>
            <div className="flex items-baseline">
              <span className="font-display text-lg text-foreground">NEBU</span>
              <span className="font-display text-lg text-primary ml-1">Studio</span>
            </div>
            <p className="text-muted-foreground text-sm mt-1">El sistema operativo de tu despacho.</p>
          </div>
          <nav className="flex gap-6">
            {[{ label: "Servicios", id: "servicios" }, { label: "Contacto", id: "contacto" }].map((link) => (
              <button key={link.id} onClick={() => scrollToSection(link.id)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link.label}</button>
            ))}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
          </nav>
        </div>
        <div data-reveal="up" className="text-muted-foreground text-xs mt-8 pt-6 border-t border-border space-y-2">
          <p>Puebla, Puebla, México · j.cuatrecasas@nebustudio.com · +52 221 349 7090</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">Aviso de privacidad</a>
            <a href="#" className="hover:text-foreground transition-colors">Términos</a>
          </div>
          <p className="pt-2">© 2026 NEBU Studio. Puebla, México.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Section title ─── */
function SectionTitle({ title }: { title: string }) {
  return (
    <div data-reveal="up">
      <h2 className="font-display text-2xl sm:text-3xl md:text-[40px] text-foreground">{title}</h2>
      <div className="w-10 h-0.5 bg-primary mt-3" />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   INDEX PAGE
   ═══════════════════════════════════════════════ */
const Index = () => {
  useScrollRevealV2();
  useCountUp();

  return (
    <div className="min-h-screen text-foreground relative" style={{ position: "relative", zIndex: 1 }}>
      <ScrollProgress />
      <Nav />
      <Hero />
      <TrustBar />
      <SectionSep />
      <WhySection />
      <SectionSep />
      <ServicesSection />
      <SectionSep />
      <AboutSection />
      <SectionSep />
      <MetricsSection />
      <SectionSep />
      <TestimonialsSection />
      <SectionSep />
      <ProcessSection />
      <SectionSep />
      <FaqSection />
      <SectionSep />
      <CtaSection />
      <Footer />
      
    </div>
  );
};

export default Index;
