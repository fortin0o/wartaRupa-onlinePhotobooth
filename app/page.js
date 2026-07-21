import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import TemplatesSection from '@/components/landing/TemplatesSection';
import ShowcaseSection from '@/components/landing/ShowcaseSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import FAQSection from '@/components/landing/FAQSection';
import PricingSection from '@/components/landing/PricingSection';
import Footer from '@/components/landing/Footer';
import SmoothScroll from '@/components/landing/SmoothScroll';

export default function LandingPage() {
  return (
    <div className="bg-cream min-h-screen grain">
      <SmoothScroll />
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <TemplatesSection />
        <ShowcaseSection />
        <FeaturesSection />
        <FAQSection />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
}
