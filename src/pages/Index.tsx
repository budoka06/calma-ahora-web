import Hero from "@/components/Hero";
import QuickAccess from "@/components/QuickAccess";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Diferenciadores from "@/components/Diferenciadores";
import Testimonios from "@/components/Testimonios";
import Science from "@/components/Science";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <QuickAccess />
      <About />
      <HowItWorks />
      <Benefits />
      <Diferenciadores />
      <Testimonios />
      <Science />
      <Footer />
    </div>
  );
};

export default Index;
