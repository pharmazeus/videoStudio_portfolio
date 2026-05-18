import { useMemo } from "react";

import CTAButton from "../../../components/CTAButton";
import SectionTitle from "../../../components/SectionTitle";
import VideoWorkCard from "../../../components/VideoWorkCard";
import { caseStudies, getFeaturedCaseStudies } from "../../../constants";

function FeaturedWorkSection() {
  const featuredWork = useMemo(() => {
    const selected = getFeaturedCaseStudies(4).filter(
      (item) => item.slug !== "markham-house-reveal-ad",
    );
    const markhamReveal = caseStudies.find(
      (item) => item.slug === "markham-house-reveal-ad",
    );

    if (!markhamReveal) {
      return selected.slice(0, 4);
    }

    // Place markhamReveal as the 4th item (index 3)
    return [...selected.slice(0, 3), markhamReveal];
  }, []);

  return (
    <section id="featured-work" className="home-section py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <SectionTitle
          eyebrow="Featured Video Work"
          title="Selected cuts from the live video catalog"
          description="A first look at ad, tutorial, and showcase edits already live on YouTube, each backed by a fuller case-study breakdown."
        />

        <div className="mt-8 flex justify-center">
          <CTAButton to="/work" variant="secondary">
            View Full Work Catalog
          </CTAButton>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2">
          {featuredWork.map((item) => (
            <VideoWorkCard key={item.slug} item={item} variant="home" />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedWorkSection;
