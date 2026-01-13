import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// Import project mockups
import projectLaMesa from "@/assets/project-lamesa.png";
import projectRawPaw from "@/assets/project-rawpaw.png";
import projectBumba from "@/assets/project-bumba-1.png";

export const Hero = () => {
  const { language } = useLanguage();

  return (
    <section className="relative min-h-[100dvh] flex flex-col overflow-hidden bg-background">
      {/* Gradient background - vibrant colorful gradient */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* Top gradient mesh */}
        <div 
          className="absolute -top-[20%] left-0 right-0 h-[90%]"
          style={{
            background: `
              linear-gradient(180deg,
                rgba(255, 180, 200, 0.7) 0%,
                rgba(255, 200, 160, 0.6) 15%,
                rgba(255, 220, 140, 0.5) 30%,
                rgba(220, 255, 180, 0.35) 50%,
                rgba(180, 220, 255, 0.2) 70%,
                transparent 100%
              )
            `,
          }}
        />
        {/* Radial overlay for depth */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[200%] h-[70%]"
          style={{
            background: `radial-gradient(ellipse 50% 50% at 50% 10%, rgba(255, 140, 170, 0.6) 0%, transparent 60%)`,
          }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pt-20 pb-8 px-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Eyebrow - italic style */}
          <p className="font-display italic text-sm sm:text-base text-foreground/70 mb-4">
            {language === "es" ? "Tu web, en perfecta armonía." : "Your web, in perfect harmony."}
          </p>

          {/* Main headline */}
          <h1 className="font-display text-[clamp(2.5rem,10vw,5rem)] leading-[0.95] tracking-tight mb-5">
            {language === "es" ? (
              <>
                Diseño que<br />
                <span className="text-foreground">Convierte</span>
              </>
            ) : (
              <>
                Design that<br />
                <span className="text-foreground">Converts</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
            {language === "es" 
              ? "Creamos sitios web estratégicos para negocios que quieren destacar. Landing pages, e-commerce y más."
              : "We create strategic websites for businesses that want to stand out. Landing pages, e-commerce and more."}
          </p>

          {/* CTA Button - pill style with border */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-foreground text-background font-medium text-sm hover:bg-foreground/90 transition-colors group"
          >
            {language === "es" ? "Empezar proyecto" : "Start project"}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Floating mockups */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pb-8">
        <div className="flex justify-center items-end gap-3 sm:gap-6">
          {/* Left mockup */}
          <div className="w-[28%] max-w-[180px] transform -rotate-6 translate-y-4 opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <img 
                src={projectLaMesa} 
                alt="La Mesa project"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Center mockup - larger */}
          <div className="w-[40%] max-w-[260px] transform hover:-translate-y-2 transition-all duration-300 z-10">
            <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <img 
                src={projectBumba} 
                alt="Bumba project"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          {/* Right mockup */}
          <div className="w-[28%] max-w-[180px] transform rotate-6 translate-y-4 opacity-80 hover:opacity-100 hover:-translate-y-1 transition-all duration-300">
            <div className="aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <img 
                src={projectRawPaw} 
                alt="Raw Paw project"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
