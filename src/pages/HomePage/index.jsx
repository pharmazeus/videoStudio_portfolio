import FaqSection from "../../sections/FaqSection";
import Testimonials from "../../sections/Testimonials";
import { faqs } from "../../constants";
import HeroSection from "./sections/HeroSection";
import ServicesOverviewSection from "./sections/ServicesOverviewSection";
import FeaturedWorkSection from "./sections/FeaturedWorkSection";
import WhyWorkSection from "./sections/WhyWorkSection";
import ProcessSection from "./sections/ProcessSection";
import PricingPreviewSection from "./sections/PricingPreviewSection";
import FinalCtaSection from "./sections/FinalCtaSection";

function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="homepage-atmosphere">
        <div aria-hidden="true" className="homepage-atmosphere-glow homepage-atmosphere-glow-top" />
        <div aria-hidden="true" className="homepage-atmosphere-glow homepage-atmosphere-glow-middle" />
        <div aria-hidden="true" className="homepage-atmosphere-glow homepage-atmosphere-glow-bottom" />
        <ServicesOverviewSection />
        <FeaturedWorkSection />
        <WhyWorkSection />
        <ProcessSection />
        <PricingPreviewSection />
        <div className="home-section">
          <Testimonials />
        </div>
        <FaqSection items={faqs} />
        <FinalCtaSection />
      </div>
    </>
  );
}

export default HomePage;
