import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface DiagnosticFormModalProps {
  open: boolean;
  onClose: () => void;
}

export const DiagnosticFormModal = ({ open, onClose }: DiagnosticFormModalProps) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Por favor llena todos los campos obligatorios.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Por favor ingresa un email válido.");
      return;
    }

    setSending(true);
    try {
      const { error: fnError } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: form.name.trim(),
          email: form.email.trim(),
          message: `📞 Teléfono: ${form.phone || "No proporcionado"}\n\n${form.message.trim()}`,
        },
      });

      if (fnError) throw fnError;
      setSent(true);
    } catch (err: any) {
      setError("Hubo un error al enviar. Intenta de nuevo.");
      console.error(err);
    } finally {
      setSending(false);
    }
  }, [form]);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setForm({ name: "", email: "", phone: "", message: "" });
      setSent(false);
      setError("");
    }, 300);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-2xl"
            style={{
              background: "rgba(51, 51, 51, 0.65)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 24px 80px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors z-10"
              aria-label="Cerrar"
            >
              <X className="w-4 h-4 text-foreground/60" />
            </button>

            <div className="p-6 sm:p-8">
              {sent ? (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(194,42,41,0.15)" }}>
                    <Send className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl text-foreground mb-2">¡Mensaje enviado!</h3>
                  <p className="text-sm text-muted-foreground">
                    Nos pondremos en contacto contigo en menos de 24 horas.
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-6 px-6 py-2 text-xs uppercase tracking-[0.1em] font-semibold rounded-md text-foreground border border-white/15 hover:bg-white/5 transition-colors"
                  >
                    Cerrar
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-primary mb-2">
                      Diagnóstico gratuito
                    </p>
                    <h3 className="font-display text-xl sm:text-2xl text-foreground leading-tight">
                      Agenda tu consulta
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      Cuéntanos sobre tu despacho y te contactaremos en 24h.
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-1.5 block">
                        Nombre *
                      </label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tu nombre completo"
                        maxLength={100}
                        className="w-full px-4 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:ring-1 focus:ring-primary/50"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-1.5 block">
                        Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        maxLength={255}
                        className="w-full px-4 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:ring-1 focus:ring-primary/50"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-1.5 block">
                        Teléfono
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+52 221 000 0000"
                        maxLength={20}
                        className="w-full px-4 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all focus:ring-1 focus:ring-primary/50"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-foreground mb-1.5 block">
                        Mensaje *
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Cuéntanos sobre tu despacho y qué necesitas..."
                        rows={3}
                        maxLength={1000}
                        className="w-full px-4 py-2.5 rounded-lg text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all resize-none focus:ring-1 focus:ring-primary/50"
                        style={{
                          background: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-red-400">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={sending}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm uppercase tracking-[0.1em] font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
                      style={{
                        background: "hsl(0 65% 46%)",
                        color: "hsl(48 8% 88%)",
                        boxShadow: "0 4px 20px rgba(194,42,41,0.3)",
                      }}
                    >
                      {sending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Enviar solicitud
                        </>
                      )}
                    </button>

                    <p className="text-[10px] text-muted-foreground/50 text-center">
                      Sin compromiso · Respuesta en 24h
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
