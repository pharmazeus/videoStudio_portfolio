import LogoSection from "./sections/LogoSection";
import NavBar from "./components/NavBar";
import Hero from "./sections/Hero";
import ShowCaseSection from "./sections/ShowCaseSection";
import FeatureCards from "./sections/FeatureCards";
import ExperienceSection from "./sections/ExperienceSection";
import TechStack from "./sections/TechStack";
import Testimonials from "./sections/Testimonials";

function App() {
  return (
    <>
      <NavBar />
      <Hero></Hero>
      <ShowCaseSection />
      <LogoSection />
      <FeatureCards />
      <ExperienceSection />

      <Testimonials />
    </>
  );
}

export default App;
