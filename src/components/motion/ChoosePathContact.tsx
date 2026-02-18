import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Check, AlertCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const paths = [
  {
    id: "website",
    label: "I need a website",
    context: "Website project",
    next: "Great. We'll start with a brand audit and build from your positioning.",
    prefill: "I'm looking for a premium website for my brand.",
  },
  {
    id: "landing",
    label: "I need a landing page",
    context: "Landing page project",
    next: "Perfect. A high-converting landing page, CRO-optimized from the first pixel.",
    prefill: "I need a high-converting landing page for my campaign or product.",
  },
  {
    id: "ecommerce",
    label: "I need an e-commerce store",
    context: "E-commerce project",
    next: "Let's build a store that converts browsers into buyers, not just a product list.",
    prefill: "I want to launch or upgrade my e-commerce store.",
  },
  {
    id: "system",
    label: "I need a system / CRM",
    context: "System / CRM project",
    next: "Efficiency is revenue. We'll map your ops and automate what shouldn't be manual.",
    prefill: "I need a custom CRM, portal, or automation system for my business.",
  },
  {
    id: "seo",
    label: "I need SEO",
    context: "SEO project",
    next: "Rankings take time. Strategy shouldn't. Let's build the foundation that compounds.",
    prefill: "I want to improve my SEO and search visibility.",
  },
];

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const ChoosePathContact = () => {
  const ref = useRef<HTMLElement>(null);
  const { toast } = useToast();

  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedPath = paths.find((p) => p.id === selected);

  const handleSelect = (id: string) => {
    const path = paths.find((p) => p.id === id);
    setSelected(id);
    if (path) setForm((f) => ({ ...f, message: path.prefill }));
    setErrors({});
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!isValidEmail(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          message: `[${selectedPath?.context || "General"}]\n\n${form.message.trim()}`,
        },
      });
      if (error) throw error;
      setIsSuccess(true);
      toast({ title: "Sent!", description: "We'll respond within 24 hours." });
      setTimeout(() => {
        setIsSuccess(false);
        setSelected(null);
        setForm({ name: "", email: "", message: "" });
      }, 3000);
    } catch {
      toast({ title: "Error", description: "Could not send. Try WhatsApp.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputCls = (field: string) =>
    `w-full h-12 px-4 rounded-lg text-sm bg-transparent border ${
      errors[field] ? "border-destructive" : "border-white/10"
    } focus:outline-none focus:border-primary/60 text-foreground placeholder:text-muted-foreground/50 transition-colors`;

  return (
    <section ref={ref} className="py-24 sm:py-32 relative overflow-hidden" id="contact">
      {/* Subtle ambient */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(circle, hsl(0 100% 50% / 0.05), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10 max-w-3xl">
        {/* Header */}
        <div className="mb-14">
          <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-4">Contact</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 leading-[0.95]">
            CHOOSE YOUR PATH.
          </h2>
          <p className="text-muted-foreground text-sm">
            Tell us what you need. We respond within 24 hours.
          </p>
        </div>

        {/* Path selector */}
        <div className="flex flex-col gap-2 mb-10">
          {paths.map((path, i) => (
            <motion.button
              key={path.id}
              onClick={() => handleSelect(path.id)}
              className={`group relative w-full text-left px-6 py-4 transition-all duration-300 overflow-hidden ${
                selected === path.id
                  ? "border border-primary/60 text-foreground"
                  : "border border-white/8 text-muted-foreground hover:border-white/20 hover:text-foreground"
              }`}
              style={{ borderRadius: 10 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
            >
              {/* Active fill */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: selected === path.id ? 1 : 0 }}
                style={{ background: "hsl(0 100% 50% / 0.06)" }}
              />

              <div className="relative flex items-center justify-between">
                <span className="font-display text-base sm:text-lg">{path.label}</span>
                <motion.div
                  animate={{ opacity: selected === path.id ? 1 : 0, x: selected === path.id ? 0 : -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <ArrowRight className="w-4 h-4 text-primary" />
                </motion.div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Next-step message + form */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
            >
              {/* Next step hint */}
              {selectedPath && (
                <div className="mb-8 flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {selectedPath.next}
                  </p>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your name *"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputCls("name")}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email *"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputCls("email")}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <textarea
                    placeholder="Describe your project *"
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputCls("message")} h-auto py-3 resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="group flex items-center gap-3 px-8 h-12 text-sm font-semibold disabled:opacity-70 transition-all"
                  style={{
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    borderRadius: 8,
                  }}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 30px hsl(0 100% 50% / 0.25)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSuccess ? (
                    <><Check className="w-4 h-4" /> Sent — talk soon</>
                  ) : isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Send <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></>
                  )}
                </motion.button>
              </form>

              {/* WhatsApp alt */}
              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1" style={{ background: "hsl(0 0% 100% / 0.08)" }} />
                <span className="text-[10px] font-mono tracking-wider text-muted-foreground/50">or</span>
                <div className="h-px flex-1" style={{ background: "hsl(0 0% 100% / 0.08)" }} />
              </div>
              <a
                href="https://wa.me/522213497090"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.638l4.707-1.398A11.953 11.953 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.586-.826-6.32-2.207l-.18-.146-3.065.91.853-3.143-.157-.187A9.949 9.949 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                Message us on WhatsApp
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
