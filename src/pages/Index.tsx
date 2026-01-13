import { LanguageProvider } from "@/contexts/LanguageContext";
import { Header } from "@/components/premium/Header";
import { Hero } from "@/components/premium/Hero";
import { QuickStats } from "@/components/premium/QuickStats";
import { Services } from "@/components/premium/Services";
import { Projects } from "@/components/premium/Projects";
import { Footer } from "@/components/premium/Footer";
import { FloatingButtons } from "@/components/premium/FloatingButtons";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen relative bg-background">
        {/* Content */}
        <Header />
        <main>
          <Hero />
          <QuickStats />
          <Services />
          <Projects />
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    </LanguageProvider>
  );
};

export default Index;
