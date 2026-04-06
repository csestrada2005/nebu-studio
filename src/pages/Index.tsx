import { useState, useEffect, useRef, type ReactNode } from "react";
import { Phone, Search, TrendingDown, Check, Lock, Gift, Zap, CreditCard } from "lucide-react";

/* ═══════════════════════════════════════════════
   DESIGN TOKENS
   ═══════════════════════════════════════════════ */
const glass = {
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(24px)",
  WebkitBackdropFilter: "blur(24px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.4)",
} as const;

const glowLine = "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), rgba(230,57,70,0.3), rgba(255,255,255,0.15), transparent)";

const textGlow = {
  h1: { color: "#FFFFFF", textShadow: "0 0 60px rgba(255,255,255,0.25), 0 0 120px rgba(255,255,255,0.1)" },
  h2: { color: "#F5F5F5", textShadow: "0 0 40px rgba(255,255,255,0.15)" },
  red: { color: "#E63946", textShadow: "0 0 30px rgba(230,57,70,0.6), 0 0 60px rgba(230,57,70,0.3)" },
};

const btnPrimary: React.CSSProperties = {
  background: "linear-gradient(135deg, #E63946, #c0303b)",
  border: "1px solid rgba(255,255,255,0.15)",
  borderRadius: "12px",
  padding: "16px 40px",
  fontWeight: 600,
  color: "#fff",
  boxShadow: "0 0 30px rgba(230,57,70,0.4), 0 0 60px rgba(230,57,70,0.2)",
  cursor: "pointer",
  transition: "box-shadow 0.3s ease, transform 0.2s ease",
  fontSize: "15px",
  letterSpacing: "0.01em",
};

const btnGhost: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(255,255,255,0.7)",
  borderRadius: "12px",
  padding: "10px 24px",
  fontWeight: 600,
  fontSize: "13px",
  cursor: "pointer",
  transition: "border-color 0.3s ease",
};

/* ═══════════════════════════════════════════════
   SCROLL REVEAL HOOK
   ═══════════════════════════════════════════════ */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, style: {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(30px)",
    transition: "opacity 0.6s ease, transform 0.6s ease",
  } as React.CSSProperties };
}

/* ═══════════════════════════════════════════════
   GLOWING DIVIDER
   ═══════════════════════════════════════════════ */
function GlowDivider({ className = "" }: { className?: string }) {
  return <div className={className} style={{ height: 1, background: glowLine, width: "100%" }} />;
}

/* ═══════════════════════════════════════════════
   BACKGROUND ORBS
   ═══════════════════════════════════════════════ */
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0" aria-hidden>
      <div className="absolute" style={{ top: "-5%", left: "-10%", width: 600, height: 600, borderRadius: "50%", background: "rgba(230,57,70,0.08)", filter: "blur(120px)" }} />
      <div className="absolute" style={{ top: "30%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.04)", filter: "blur(100px)" }} />
      <div className="absolute" style={{ bottom: "5%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "rgba(230,57,70,0.05)", filter: "blur(150px)" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   NAVBAR
   ═══════════════════════════════════════════════ */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(3,3,3,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.1)", boxShadow: "0 1px 0 rgba(255,255,255,0.05)" }}>
      <div className="max-w-[1100px] mx-auto px-5 h-16 flex items-center justify-between">
        <span className="text-white font-bold text-lg tracking-tight">
          NEBU<span style={{ color: "#E63946" }}>.</span>
        </span>
        <a href="#hero" style={btnGhost} className="hover:border-white/20 no-underline">
          Descargar gratis
        </a>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════ */
function HeroSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email });
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: "14px 18px",
    color: "#fff",
    fontSize: 15,
    outline: "none",
    width: "100%",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  };

  const badges = [
    { icon: <Gift size={14} />, text: "Gratis para siempre" },
    { icon: <Zap size={14} />, text: "Acceso inmediato" },
    { icon: <CreditCard size={14} />, text: "Sin tarjeta requerida" },
  ];

  return (
    <section id="hero" className="relative z-10 pt-32 lg:pt-44 pb-20 lg:pb-32 px-5">
      <div className="max-w-[720px] mx-auto text-center">
        {/* Pill badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-5 py-2" style={{ ...glass, borderRadius: 999, borderLeft: "3px solid #E63946" }}>
          <span style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: 600, letterSpacing: "0.05em", textShadow: "0 0 20px rgba(255,255,255,0.15)" }}>
            Sistema Digital para Despachos
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-[40px] lg:text-[64px] font-bold leading-[1.1] tracking-[-0.03em] mb-6" style={textGlow.h1}>
          El sistema que usan los despachos para conseguir{" "}
          <span style={textGlow.red}>más clientes</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base lg:text-lg mb-12 max-w-[560px] mx-auto" style={{ color: "rgba(255,255,255,0.55)" }}>
          Descarga gratis el PDF de diagnóstico. En menos de 5 minutos sabrás exactamente qué le falta a tu despacho.
        </p>

        {/* Form card */}
        <form onSubmit={handleSubmit} className="p-8 lg:p-12 mb-8" style={{ ...glass, borderRadius: 20 }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input
              type="text" placeholder="Tu nombre" value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(230,57,70,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(230,57,70,0.1)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
            />
            <input
              type="email" placeholder="tu@correo.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(230,57,70,0.5)"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(230,57,70,0.1)"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
          <button
            type="submit"
            className="w-full hover:shadow-[0_0_50px_rgba(230,57,70,0.6)] active:scale-[0.97]"
            style={btnPrimary}
          >
            Quiero el PDF gratuito →
          </button>
          <p className="flex items-center justify-center gap-1.5 mt-4" style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
            <Lock size={12} /> Sin spam. Tus datos están seguros.
          </p>
        </form>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3">
          {badges.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-4 py-2" style={{ ...glass, borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>
              {b.icon} {b.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PROBLEM SECTION
   ═══════════════════════════════════════════════ */
function ProblemSection() {
  const rev = useReveal<HTMLDivElement>();
  const problems = [
    { icon: <Phone size={28} />, title: "Clientes que llaman 20 veces por semana", body: "Preguntando por el estatus de su caso porque no tienen dónde consultarlo." },
    { icon: <Search size={28} />, title: "Tu despacho no aparece en Google", body: "Cuando buscan tu especialidad en Puebla, tus competidores aparecen primero." },
    { icon: <TrendingDown size={28} />, title: "No puedes escalar sin contratar más", body: "Tu operación depende de personas, no de sistemas. Cada cliente nuevo es más carga." },
  ];

  return (
    <section className="relative z-10 py-20 lg:py-32 px-5">
      <div ref={rev.ref} style={rev.style} className="max-w-[1100px] mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[30px] lg:text-[42px] font-semibold tracking-[-0.02em] mb-4" style={textGlow.h2}>
            ¿Reconoces esto?
          </h2>
          <p className="text-sm lg:text-base" style={textGlow.red}>
            El 70% de los despachos en Puebla tiene estos problemas
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div key={i} className="p-8 lg:p-12 relative" style={{ ...glass, boxShadow: `${glass.boxShadow}, -8px 8px 30px rgba(230,57,70,0.08)` }}>
              <div className="mb-6" style={{ color: "#E63946", filter: "drop-shadow(0 0 12px rgba(230,57,70,0.5))" }}>{p.icon}</div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "#fff", textShadow: "0 0 20px rgba(255,255,255,0.1)" }}>{p.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.7 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SOLUTION / LEAD MAGNET SECTION
   ═══════════════════════════════════════════════ */
function SolutionSection() {
  const rev = useReveal<HTMLDivElement>();
  const bullets = [
    "Por qué el 70% de los sitios web de despachos no convierte",
    "El sistema de 5 capas que usan los mejores despachos",
    "Cómo aparecer primero en Google sin pagar publicidad",
    "El error #1 que espanta a los clientes empresariales",
  ];

  return (
    <section className="relative z-10 py-20 lg:py-32 px-5">
      <GlowDivider className="max-w-[1100px] mx-auto mb-20 lg:mb-32" />
      <div ref={rev.ref} style={rev.style} className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left */}
        <div>
          <span className="inline-block text-[11px] font-semibold tracking-[0.1em] uppercase mb-6" style={textGlow.red}>
            Lo que vas a descargar
          </span>
          <h2 className="text-[30px] lg:text-[42px] font-semibold tracking-[-0.02em] leading-[1.15] mb-8" style={textGlow.h2}>
            El PDF que todo despacho necesita leer antes de invertir en digital
          </h2>
          <ul className="space-y-5 mb-10">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <Check size={18} className="mt-0.5 shrink-0" style={{ color: "#E63946", filter: "drop-shadow(0 0 8px rgba(230,57,70,0.5))" }} />
                <span style={{ color: "rgba(255,255,255,0.7)", fontSize: 16 }}>{b}</span>
              </li>
            ))}
          </ul>
          <a href="#hero" className="inline-block no-underline hover:shadow-[0_0_50px_rgba(230,57,70,0.6)] active:scale-[0.97]" style={btnPrimary}>
            Descargarlo ahora — es gratis
          </a>
        </div>

        {/* Right — PDF mockup */}
        <div className="flex justify-center">
          <div className="relative" style={{ transform: "rotate(-3deg)" }}>
            {/* Glow behind */}
            <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(circle, rgba(230,57,70,0.15) 0%, transparent 70%)", transform: "scale(1.3)", filter: "blur(40px)" }} />
            <div className="w-[280px] sm:w-[320px] relative overflow-hidden" style={{ ...glass, borderRadius: 16, boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
              {/* Red top stripe */}
              <div style={{ height: 6, background: "linear-gradient(90deg, #E63946, #c0303b)" }} />
              {/* Content */}
              <div className="p-8 lg:p-10">
                {/* Faint grid lines */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <span className="block text-[11px] font-semibold tracking-[0.1em] uppercase mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>NEBU Studio</span>
                <h3 className="text-xl font-bold leading-tight mb-4" style={{ color: "#fff", textShadow: "0 0 20px rgba(255,255,255,0.1)" }}>
                  Diagnóstico Digital para Despachos
                </h3>
                <div className="space-y-2 mb-8">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.06)", width: `${100 - i * 15}%` }} />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold" style={{ background: "#E63946", color: "#fff" }}>N</div>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 11 }}>PDF gratuito · 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SOCIAL PROOF / TRUST BAR
   ═══════════════════════════════════════════════ */
function SocialProofSection() {
  const rev = useReveal<HTMLDivElement>();
  const stats = [
    { num: "70%", label: "sin web funcional" },
    { num: "40%", label: "sin presencia en Google" },
    { num: "+14%", label: "crecimiento sector legal anual" },
  ];

  return (
    <section className="relative z-10 py-20 lg:py-32 px-5">
      <GlowDivider className="max-w-[1100px] mx-auto mb-20 lg:mb-32" />
      <div ref={rev.ref} style={rev.style} className="max-w-[900px] mx-auto text-center">
        <div style={{ ...glass, borderRadius: 20, padding: "48px 32px" }}>
          <h2 className="text-[60px] lg:text-[80px] font-bold tracking-[-0.03em] leading-none mb-4" style={textGlow.red}>
            400+
          </h2>
          <p className="text-base lg:text-lg mb-10" style={{ color: "rgba(255,255,255,0.55)" }}>
            despachos en Puebla sin presencia digital real
          </p>
          <GlowDivider className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((s, i) => (
              <div key={i}>
                <span className="block text-2xl lg:text-3xl font-bold mb-1" style={{ color: "#fff", textShadow: "0 0 30px rgba(255,255,255,0.15)" }}>{s.num}</span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECOND CTA
   ═══════════════════════════════════════════════ */
function SecondCTA() {
  const rev = useReveal<HTMLDivElement>();
  const badges = [
    { icon: <Gift size={14} />, text: "Gratis para siempre" },
    { icon: <Zap size={14} />, text: "Acceso inmediato" },
    { icon: <CreditCard size={14} />, text: "Sin tarjeta requerida" },
  ];

  return (
    <section className="relative z-10 py-20 lg:py-32 px-5">
      <GlowDivider className="max-w-[1100px] mx-auto mb-20 lg:mb-32" />
      <div ref={rev.ref} style={rev.style} className="max-w-[700px] mx-auto text-center">
        <h2 className="text-[30px] lg:text-[42px] font-semibold tracking-[-0.02em] leading-[1.15] mb-6" style={{ ...textGlow.h2, textShadow: "0 0 60px rgba(255,255,255,0.25), 0 0 120px rgba(255,255,255,0.1)" }}>
          ¿Listo para ver qué le falta a tu despacho?
        </h2>
        <p className="mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>
          Toma 5 minutos. Sin costo. Sin compromiso.
        </p>
        <a href="#hero" className="inline-block no-underline hover:shadow-[0_0_50px_rgba(230,57,70,0.6)] active:scale-[0.97] mb-10" style={{ ...btnPrimary, boxShadow: "0 0 40px rgba(230,57,70,0.5), 0 0 80px rgba(230,57,70,0.25)" }}>
          Quiero el PDF gratuito →
        </a>
        <div className="flex flex-wrap justify-center gap-3">
          {badges.map((b, i) => (
            <span key={i} className="inline-flex items-center gap-2 px-4 py-2" style={{ ...glass, borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" as const }}>
              {b.icon} {b.text}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="relative z-10 mt-12">
      <GlowDivider />
      <div style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}>
        <div className="max-w-[1100px] mx-auto px-5 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            <span className="font-bold text-white">NEBU</span><span style={{ color: "#E63946" }}>.</span> Studio © 2026
          </span>
          <a href="https://nebu.studio" target="_blank" rel="noopener noreferrer" className="no-underline hover:underline" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>
            nebu.studio
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */
export default function Index() {
  return (
    <>
      <BackgroundOrbs />
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <SocialProofSection />
        <SecondCTA />
      </main>
      <Footer />
    </>
  );
}
