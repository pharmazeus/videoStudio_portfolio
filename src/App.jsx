import LogoSection from "./sections/LogoSection";
import NavBar from "./components/NavBar";
import Hero from "./sections/Hero";
import ShowCaseSection from "./sections/ShowcaseSection";
import VideoShowcase from "./sections/VideoShowcase";

import FeatureCards from "./sections/FeatureCards";
import ExperienceSection from "./sections/ExperienceSection";
import TechStack from "./sections/TechStack";
import Testimonials from "./sections/Testimonials";

function App() {
  return (
    <>
      <NavBar />
      <Hero></Hero>
      <VideoShowcase />
      <ShowCaseSection />
      <LogoSection />
      <FeatureCards />
      <Testimonials />
    </>
  );
}

export default App;
