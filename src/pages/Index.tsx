import { Navigation } from "@/components/landing/Navigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { WorkSection } from "@/components/landing/WorkSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { FooterSection } from "@/components/landing/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <WorkSection />
        <ProcessSection />
        <AboutSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
};

export default Index;
