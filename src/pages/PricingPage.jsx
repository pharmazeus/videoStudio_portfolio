import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import CTAButton from "../components/CTAButton";
import PricingPackageCard from "../components/PricingPackageCard";
import SectionTitle from "../components/SectionTitle";
import { addOns, pricingCategories, pricingPackages } from "../constants";
import { formatFromPrice } from "../lib/formatPrice";

gsap.registerPlugin(ScrollTrigger);

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

function getMobileTabLabel(title) {
  return title.replace(" Services", "").replace(" Retainers", "");
}

function PricingPage() {
  const { hash } = useLocation();
  const rootRef = useRef(null);
  const categoryRefs = useRef({});
  const cardRefs = useRef({});
  const [activeCategory, setActiveCategory] = useState(
    pricingCategories[0]?.slug ?? null,
  );

  // Smooth-scroll to hash anchor on load.
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

  // GSAP ScrollTrigger entrance per category. Respect prefers-reduced-motion.
  useEffect(() => {
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      pricingCategories.forEach((category) => {
        const sectionEl = categoryRefs.current[category.slug];
        const cards = (cardRefs.current[category.slug] || []).filter(Boolean);
        if (!sectionEl || cards.length === 0) return;

        gsap.set(cards, { opacity: 0, y: 40 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Track active category for sticky mobile tabs.
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      return undefined;
    }

    const slugByEl = new Map();
    pricingCategories.forEach((category) => {
      const el = categoryRefs.current[category.slug];
      if (el) slugByEl.set(el, category.slug);
    });

    if (slugByEl.size === 0) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const slug = slugByEl.get(visible[0].target);
          if (slug) setActiveCategory(slug);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    slugByEl.forEach((_, el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="pricing-page relative isolate overflow-hidden py-12 md:py-16"
    >
      <div aria-hidden="true" className="pricing-page-glow pricing-page-glow-top" />
      <div aria-hidden="true" className="pricing-page-glow pricing-page-glow-middle" />
      <div aria-hidden="true" className="pricing-page-glow pricing-page-glow-bottom" />

      <div className="pricing-page-shell mx-auto box-border w-full max-w-[1280px] px-5 md:px-10 xl:px-16">
        <SectionTitle
          eyebrow="Pricing"
          title="Clear starting prices for websites, video, and brand content"
          description="These public starting rates are shown in CAD. Final quotes depend on scope, revisions, travel, complexity, and delivery timeline."
        />

        <nav
          aria-label="Pricing categories"
          className="pricing-mobile-tabs sticky top-16 z-30 md:hidden"
        >
          {pricingCategories.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="pricing-mobile-tab"
              aria-current={activeCategory === category.slug ? "true" : undefined}
            >
              {getMobileTabLabel(category.title)}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-14 md:space-y-16">
          {pricingCategories.map((category, categoryIndex) => {
            const items = pricingPackages.filter(
              (pkg) => pkg.category === category.slug,
            );

            if (items.length === 0) return null;

            // Reset the ref array for this category on each render so stale refs
            // from a previous render are not carried over.
            cardRefs.current[category.slug] = [];

            return (
              <div
                key={category.slug}
                id={category.slug}
                ref={(el) => {
                  categoryRefs.current[category.slug] = el;
                }}
                className="pricing-category-section scroll-mt-28"
              >
                <h2 className="text-2xl font-semibold md:text-3xl">{category.title}</h2>
                <p className="mt-2 max-w-3xl text-white-50">{category.description}</p>

                <div className="pricing-package-grid mt-6">
                  {items.map((item, index) => (
                    <div
                      key={item.slug}
                      ref={(el) => {
                        cardRefs.current[category.slug][index] = el;
                      }}
                      className="pricing-package-card-wrapper"
                    >
                      <PricingPackageCard
                        item={item}
                        ctaTo={createServiceSelectionPath(item)}
                        eager={categoryIndex === 0 && index < 2}
                      />
                    </div>
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
