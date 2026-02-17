import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const budgetOptions = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
];

export const ContactSection = () => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
          message: `${form.message.trim()}\n\nPhone: ${form.phone || "N/A"}\nBudget: ${form.budget || "N/A"}`,
        },
      });
      if (error) throw error;

      setIsSuccess(true);
      toast({ title: "Sent!", description: "We'll respond soon." });
      setTimeout(() => setIsSuccess(false), 3000);
      setForm({ name: "", email: "", phone: "", budget: "", message: "" });
      setErrors({});
    } catch {
      toast({ title: "Error", description: "Could not send. Try WhatsApp.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full h-12 px-4 glass-input rounded-lg text-sm bg-card/40 border ${
      errors[field] ? "border-destructive" : "border-border/40"
    } focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 text-foreground placeholder:text-muted-foreground/50`;

  return (
    <section ref={ref} className="py-24 sm:py-32" id="contact">
      <div className="container max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl mb-3">
            LET'S <span className="text-primary">TALK.</span>
          </h2>
          <p className="text-muted-foreground text-sm">
            Tell us about your project. We respond within 24 hours.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <input
              type="text"
              placeholder="Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={inputClass("name")}
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
              className={inputClass("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.email}
              </p>
            )}
          </div>

          <input
            type="tel"
            placeholder="WhatsApp / Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputClass("")}
          />

          <select
            value={form.budget}
            onChange={(e) => setForm({ ...form, budget: e.target.value })}
            className={`${inputClass("")} appearance-none`}
          >
            <option value="">Budget (optional)</option>
            {budgetOptions.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>

          <div>
            <textarea
              placeholder="Project description *"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={`${inputClass("message")} h-auto py-3 resize-none`}
            />
            {errors.message && (
              <p className="mt-1 text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {errors.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className="btn-primary w-full h-12 text-sm disabled:opacity-70"
          >
            {isSuccess ? (
              <>
                <Check className="w-4 h-4" /> Sent
              </>
            ) : isSubmitting ? (
              <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                Send <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
};
