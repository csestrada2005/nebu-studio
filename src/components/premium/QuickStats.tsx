import { useLanguage } from "@/contexts/LanguageContext";

const stats = [
  { value: "15+", labelEs: "Proyectos entregados", labelEn: "Projects delivered" },
  { value: "100%", labelEs: "Clientes satisfechos", labelEn: "Satisfied clients" },
  { value: "<24h", labelEs: "Tiempo de respuesta", labelEn: "Response time" },
];

export const QuickStats = () => {
  const { language } = useLanguage();

  return (
    <section className="py-14 sm:py-20 px-4 border-y border-border/30">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((stat, index) => (
            <div key={stat.labelEn} className="text-center">
              <p className="font-display text-2xl sm:text-4xl md:text-5xl mb-2">
                {stat.value}
              </p>
              <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">
                {language === "es" ? stat.labelEs : stat.labelEn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
