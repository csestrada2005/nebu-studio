import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Footer } from "@/components/premium/Footer";

/* ─── InView hook ─── */
function useInViewOnce(opts: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, opts);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const fadeUp = (visible: boolean, delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

/* ─── HERO ─── */
const Hero = () => {
  const { ref, visible } = useInViewOnce({ threshold: 0.15 });
  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-center justify-center px-4 pt-24 pb-16">
      <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <motion.span
          {...fadeUp(visible)}
          className="inline-block px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Oferta exclusiva — Solo aquí
        </motion.span>

        <motion.h1
          {...fadeUp(visible, 0.1)}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight"
          style={{ color: "#fff", textShadow: "0 0 40px rgba(255,255,255,0.15)" }}
        >
          Tu PDF ya está en camino...
        </motion.h1>

        <motion.p
          {...fadeUp(visible, 0.2)}
          className="text-lg sm:text-xl font-semibold"
          style={{ color: "hsl(var(--primary))", textShadow: "0 0 30px rgba(194,42,41,0.4)" }}
        >
          Pero antes de que lo abras, esto te va a interesar.
        </motion.p>

        <motion.p
          {...fadeUp(visible, 0.3)}
          className="text-sm sm:text-base max-w-lg"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Lo que acabas de descargar explica el problema. Lo que viene abajo lo resuelve.
        </motion.p>
      </div>
    </section>
  );
};

/* ─── PRODUCT ─── */
const ProductSection = () => {
  const { ref, visible } = useInViewOnce({ threshold: 0.1 });
  const bullets = [
    "Automatizaciones listas para instalar en tu despacho",
    "PDFs de ventas y scripts para conseguir clientes",
    "Templates de follow-up y onboarding de clientes",
    "Sistema de seguimiento de casos sin software caro",
  ];

  return (
    <section ref={ref} className="px-4 py-16 sm:py-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        {/* Left */}
        <div className="flex flex-col gap-6">
          <motion.span
            {...fadeUp(visible)}
            className="text-[11px] font-bold tracking-[0.2em] uppercase"
            style={{ color: "hsl(var(--primary))" }}
          >
            El sistema completo
          </motion.span>

          <motion.h2
            {...fadeUp(visible, 0.05)}
            className="font-display text-2xl sm:text-3xl md:text-4xl font-bold leading-tight"
            style={{ color: "#fff", textShadow: "0 0 30px rgba(255,255,255,0.1)" }}
          >
            Todo lo que necesita tu despacho para crecer sin contratar más gente
          </motion.h2>

          <ul className="flex flex-col gap-3 mt-2">
            {bullets.map((b, i) => (
              <motion.li
                key={i}
                {...fadeUp(visible, 0.1 + i * 0.06)}
                className="flex items-start gap-3 text-sm sm:text-base"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                <span
                  className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(194,42,41,0.15)",
                    boxShadow: "0 0 12px rgba(194,42,41,0.3)",
                  }}
                >
                  <Check className="w-3 h-3" style={{ color: "hsl(var(--primary))" }} />
                </span>
                {b}
              </motion.li>
            ))}
          </ul>

          {/* Price card */}
          <motion.div
            {...fadeUp(visible, 0.4)}
            className="rounded-xl p-6 mt-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(24px)",
            }}
          >
            <p className="text-sm line-through" style={{ color: "rgba(255,255,255,0.3)" }}>
              $2,997 MXN
            </p>
            <p
              className="font-display text-4xl sm:text-5xl font-bold mt-1"
              style={{ color: "#fff", textShadow: "0 0 40px rgba(255,255,255,0.2)" }}
            >
              $997 MXN
            </p>
            <span
              className="inline-block mt-3 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase"
              style={{
                background: "rgba(194,42,41,0.15)",
                color: "hsl(var(--primary))",
                border: "1px solid rgba(194,42,41,0.2)",
              }}
            >
              Oferta válida solo en esta página
            </span>
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeUp(visible, 0.5)} className="flex flex-col gap-2 mt-2">
            <button
              onClick={() => console.log("compra iniciada")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm transition-all duration-300 hover:scale-[1.03] active:scale-95"
              style={{
                background: "hsl(var(--primary))",
                color: "#fff",
                boxShadow: "0 0 30px rgba(194,42,41,0.4), 0 4px 20px rgba(194,42,41,0.25)",
              }}
            >
              Quiero el sistema completo →
            </button>
            <p className="text-[11px] text-center sm:text-left" style={{ color: "rgba(255,255,255,0.3)" }}>
              Pago único. Acceso inmediato. Sin suscripción.
            </p>
          </motion.div>
        </div>

        {/* Right — Product mockup */}
        <motion.div {...fadeUp(visible, 0.25)} className="flex justify-center lg:justify-end">
          <div
            className="relative w-full max-w-sm rounded-2xl p-6 flex flex-col gap-4"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(24px)",
              boxShadow: "0 0 60px rgba(194,42,41,0.08)",
            }}
          >
            <h3
              className="font-display text-lg font-bold text-center"
              style={{ color: "#fff", textShadow: "0 0 20px rgba(255,255,255,0.08)" }}
            >
              Sistema Digital para Despachos
            </h3>

            {["Automatizaciones", "PDFs de ventas", "Templates operativos"].map((label, i) => (
              <div
                key={i}
                className="rounded-lg px-4 py-3 text-sm font-medium"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderLeft: "3px solid hsl(var(--primary))",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderLeftColor: "hsl(var(--primary))",
                  color: "rgba(255,255,255,0.8)",
                }}
              >
                {label}
              </div>
            ))}

            {/* Subtle glow behind */}
            <div
              className="absolute -inset-4 -z-10 rounded-3xl"
              style={{
                background: "radial-gradient(ellipse at center, rgba(194,42,41,0.08) 0%, transparent 70%)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ─── URGENCY BAR ─── */
const UrgencyBar = () => {
  const { ref, visible } = useInViewOnce({ threshold: 0.3 });
  return (
    <section ref={ref} className="px-4 py-12 sm:py-16">
      <motion.div
        {...fadeUp(visible)}
        className="max-w-3xl mx-auto rounded-xl px-6 py-8 text-center flex flex-col items-center gap-4"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.06)",
          backdropFilter: "blur(24px)",
        }}
      >
        <div className="flex items-center gap-3">
          <span
            className="w-2.5 h-2.5 rounded-full animate-pulse"
            style={{ background: "hsl(var(--primary))", boxShadow: "0 0 12px rgba(194,42,41,0.5)" }}
          />
          <p className="text-sm sm:text-base font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
            Esta oferta desaparece cuando cierres esta página
          </p>
        </div>

        <button
          onClick={() => window.history.back()}
          className="text-[11px] mt-2 transition-colors hover:text-white/40"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          No gracias, solo me quedo con el PDF gratis
        </button>
      </motion.div>
    </section>
  );
};

/* ─── PAGE ─── */
const ProductosDigitales = () => {
  return (
    <LanguageProvider>
      <div className="relative min-h-screen" style={{ background: "#030303" }}>
        <Hero />
        <ProductSection />
        <UrgencyBar />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default ProductosDigitales;
