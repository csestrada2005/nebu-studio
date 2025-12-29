import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Services } from "@/components/landing/Services";
import { Process } from "@/components/landing/Process";
import { Portfolio } from "@/components/landing/Portfolio";
import { Testimonials } from "@/components/landing/Testimonials";
import { Scarcity } from "@/components/landing/Scarcity";
import { About } from "@/components/landing/About";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";
import { FloatingCTA } from "@/components/landing/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Process />
        <Portfolio />
        <Testimonials />
        <Scarcity />
        <About />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
