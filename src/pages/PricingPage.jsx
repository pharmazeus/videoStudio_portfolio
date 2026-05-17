import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import CTAButton from "../components/CTAButton";
import PricingPackageCard from "../components/PricingPackageCard";
import SectionTitle from "../components/SectionTitle";
import { addOns, pricingCategories, pricingPackages } from "../constants";
import { formatFromPrice } from "../lib/formatPrice";

const pricingCategoryToProjectType = {
  "web-offers": "website",
  "monthly-retainers": "content",
  "one-off-projects": "video",
};

function createServiceSelectionPath(item) {
  const params = new URLSearchParams({
    projectType:
      pricingCategoryToProjectType[item.category] ?? "mixed-scope",
    service: item.name,
  });

  return `/contact?${params.toString()}`;
}

function PricingPage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.replace(/^#/, "");
    const target = document.getElementById(id);
    if (!target) return;
    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [hash]);

  return (
    <section className="pricing-page relative isolate overflow-hidden py-12 md:py-16">
      <div aria-hidden="true" className="pricing-page-glow pricing-page-glow-top" />
      <div aria-hidden="true" className="pricing-page-glow pricing-page-glow-middle" />
      <div aria-hidden="true" className="pricing-page-glow pricing-page-glow-bottom" />

      <div className="pricing-page-shell mx-auto box-border w-full max-w-[1280px] px-5 md:px-10 xl:px-16">
        <SectionTitle
          eyebrow="Pricing"
          title="Clear starting prices for websites, video, and brand content"
          description="These public starting rates are shown in CAD. Final quotes depend on scope, revisions, travel, complexity, and delivery timeline."
        />

        <div className="mt-10 space-y-14 md:space-y-16">
          {pricingCategories.map((category) => {
            const items = pricingPackages.filter(
              (pkg) => pkg.category === category.slug,
            );

            if (items.length === 0) return null;

            return (
              <div
                key={category.slug}
                id={category.slug}
                className="pricing-category-section scroll-mt-28"
              >
                <h2 className="text-2xl font-semibold md:text-3xl">{category.title}</h2>
                <p className="mt-2 max-w-3xl text-white-50">{category.description}</p>

                <div className="pricing-package-grid mt-6">
                  {items.map((item) => (
                    <PricingPackageCard
                      key={item.slug}
                      item={item}
                      ctaTo={createServiceSelectionPath(item)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold md:text-3xl">Add-ons</h2>
          <div className="pricing-addon-grid mt-6">
            {addOns.map((item) => (
              <article key={item.name} className="pricing-addon-card card-border">
                <h3 className="font-semibold text-white">{item.name}</h3>
                <p className="mt-2 text-sm leading-6 text-white-50">
                  {item.label
                    ? item.label
                    : item.customQuoteRequired
                      ? "Custom quote"
                      : formatFromPrice(item.startingPrice)}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="pricing-mixed-scope mt-14 rounded-[1.5rem] p-6 md:p-8">
          <h2 className="text-2xl font-semibold md:text-3xl">
            Need a website, video, and ongoing content in one scope?
          </h2>
          <p className="mt-3 max-w-3xl text-white-50">
            If your project spans web development, video production, and ongoing
            brand content, the cleanest route is a phased quote with clear
            priorities, deliverables, and timeline.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CTAButton to="/contact">Request a Quote</CTAButton>
            <CTAButton to="/contact" variant="secondary">
              Book a Call
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PricingPage;
