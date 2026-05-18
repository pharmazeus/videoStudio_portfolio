import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useNavigate } from "react-router-dom";
import {
  Compass,
  Hammer,
  Package,
  PenTool,
  Rocket,
  Target,
  Workflow,
} from "lucide-react";

import CTAButton from "../components/CTAButton";
import HeroActionButtons from "../components/HeroActionButtons";
import PricingPackageCard from "../components/PricingPackageCard";
import SectionTitle from "../components/SectionTitle";
import VideoWorkCard from "../components/VideoWorkCard";
import FaqSection from "../sections/FaqSection";
import Testimonials from "../sections/Testimonials";
import {
  caseStudies,
  faqs,
  getFeaturedCaseStudies,
  heroContent,
  pricingPackages,
  processSteps,
  services,
  whyWorkWithMe,
} from "../constants";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

const homeIcons = {
  Workflow,
  Target,
  Package,
  Compass,
  PenTool,
  Hammer,
  Rocket,
};

const homeServiceOrder = [
  "video-editing",
  "video-production",
  "brand-content-growth",
  "web-development",
];

const servicePricingCategory = {
  "video-editing": "one-off-projects",
  "video-production": "one-off-projects",
  "brand-content-growth": "monthly-retainers",
  "web-development": "web-offers",
};

function ServiceCard({ item, index }) {
  const cardRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const navigate = useNavigate();
  const pricingCategory = servicePricingCategory[item.slug];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setHasEntered(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.15) return;
        setHasEntered(true);
        observer.unobserve(entry.target);
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handlePricesScroll = () => {
    if (!pricingCategory) return;
    navigate(`/pricing#${pricingCategory}`);
  };

  return (
    <article
      ref={cardRef}
      className={`home-service-card ${hasEntered ? "is-visible" : ""}`}
      style={{ "--service-card-delay": `${Math.min(index * 70, 210)}ms` }}
    >
      <div className="home-service-card-media">
        <img
          src={item.image}
          alt={item.imageAlt}
          className="home-service-card-image"
          loading="lazy"
          decoding="async"
        />
      </div>

      <div className="home-service-card-body">
        <div className="home-service-card-header">
          <p className="home-service-card-index">0{index + 1}</p>
          <h3 className="home-service-card-title">{item.title}</h3>
        </div>

        <p className="home-service-card-summary">{item.summary}</p>

        {pricingCategory ? (
          <div className="home-service-card-footer">
            <button
              type="button"
              className="home-service-card-prices-cta"
              onClick={handlePricesScroll}
            >
              See prices
            </button>
          </div>
        ) : null}
      </div>
    </article>
  );
}

function HomePage() {
  const [isHeroReady, setIsHeroReady] = useState(false);
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
  const pricingPreview = pricingPackages
    .filter((item) => item.category === "monthly-retainers")
    .slice(0, 3);
  const homeServices = useMemo(() => {
    const servicesBySlug = new Map(services.map((item) => [item.slug, item]));
    return homeServiceOrder
      .map((slug) => servicesBySlug.get(slug))
      .filter(Boolean);
  }, []);

  useGSAP(() => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const tweens = [
      gsap.to(".figure-orange", {
        y: "-=30",
        rotation: "+=5",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }),
      gsap.to(".figure-dark", {
        y: "+=20",
        rotation: "-=3",
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      }),
    ];

    const onVisibilityChange = () => {
      if (document.hidden) {
        tweens.forEach((tween) => tween.pause());
      } else {
        tweens.forEach((tween) => tween.resume());
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      tweens.forEach((tween) => tween.kill());
    };
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsHeroReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleHeroPlayClick = () => {
    document
      .getElementById("services-overview")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section
        id="hero"
        className={`home-hero ${isHeroReady ? "home-hero-ready" : ""}`}
      >
        <div className="home-hero-glow" aria-hidden="true" />

        <div className="home-hero-stage relative mx-auto w-full max-w-[1280px] px-5 pb-10 pt-28 md:px-10 md:pb-16 md:pt-32 xl:px-20">
          <div className="home-hero-content relative flex flex-col justify-between py-6 md:min-h-[72vh] md:justify-center">
            <div className="home-hero-copy-shell relative z-30 pointer-events-none">
              <div className="home-hero-title-group">
                <h1
                  className="home-hero-title"
                  aria-label={`${heroContent.headline.intro} ${heroContent.headline.focus} ${heroContent.headline.outro}`}
                >
                  <span className="home-hero-title-cluster home-hero-title-cluster-top">
                    <span className="home-hero-title-line">
                      {heroContent.headline.intro}
                    </span>
                    <span className="home-hero-title-line home-hero-title-line-accent">
                      {heroContent.headline.focus}
                    </span>
                  </span>
                  <span className="home-hero-title-cluster home-hero-title-cluster-bottom">
                    <span className="home-hero-title-line">
                      {heroContent.headline.outro}
                    </span>
                  </span>
                </h1>
              </div>

              <div className="home-hero-lower-copy">
                <p className="home-hero-body">
                  {heroContent.subheadline}
                </p>

                <HeroActionButtons />
              </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2">
              <button
                type="button"
                onClick={handleHeroPlayClick}
                aria-label="Scroll to services overview"
                className="figure-orange group pointer-events-auto absolute z-20 flex touch-manipulation items-center justify-center border border-white/20 bg-gradient-to-br from-[#E68A45] to-[#99531E] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),inset_10px_10px_20px_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.5)] transition-[filter] duration-300 will-change-transform hover:brightness-110"
              >
                <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:rounded-[60px]" />
                <div className="pointer-events-none flex h-12 w-12 items-center justify-center rounded-full border-[2px] border-[#FFEA00] bg-white/10 shadow-[0_0_15px_rgba(255,234,0,0.5),inset_0_0_10px_rgba(255,234,0,0.5)] backdrop-blur-md transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                  <div className="ml-1 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-[#FFEA00] md:border-y-[10px] md:border-l-[16px]" />
                </div>
              </button>
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2">
              <div
                aria-hidden="true"
                className="figure-dark pointer-events-none absolute bottom-0 left-0 h-[240px] w-[120px] translate-y-[100px] -rotate-[10deg] rounded-[30px] border border-white/10 bg-gradient-to-br from-[#2a2a2a] to-[#111] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.8),inset_5px_5px_15px_rgba(255,255,255,0.1),0_15px_30px_rgba(0,0,0,0.6)] md:h-[360px] md:w-[180px] md:translate-y-[150px] md:rounded-[50px]"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="homepage-atmosphere">
        <div aria-hidden="true" className="homepage-atmosphere-glow homepage-atmosphere-glow-top" />
        <div aria-hidden="true" className="homepage-atmosphere-glow homepage-atmosphere-glow-middle" />
        <div aria-hidden="true" className="homepage-atmosphere-glow homepage-atmosphere-glow-bottom" />

        <section id="services-overview" className="home-section-band border-b border-black-50 py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
            <SectionTitle
              eyebrow="Services"
              title="Video, brand content, and web/app builds working together"
              description="I help businesses capture attention, turn footage into useful assets, keep the brand active, and build the place where clients take action."
            />

            <div className="home-service-grid">
              {homeServices.map((item, index) => (
                <ServiceCard key={item.slug} item={item} index={index} />
              ))}
            </div>
          </div>
        </section>

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

        <section id="why-work" className="home-section py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
            <SectionTitle
              eyebrow="Why Work With Me"
              title="Creative execution meets digital systems thinking"
            />
            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
              {whyWorkWithMe.map((item) => {
                const Icon = homeIcons[item.icon];
                return (
                  <article key={item.title} className="card-border rounded-xl p-5">
                    {Icon && (
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-copper-50/30 bg-copper-50/5 text-copper-50">
                        <Icon size={20} strokeWidth={1.75} />
                      </span>
                    )}
                    <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm text-white-50">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="process" className="home-section-band border-y border-black-50 py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
            <SectionTitle
              eyebrow="Process"
              title="A focused build flow from scope to launch"
            />
            <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
              {processSteps.map((item) => {
                const Icon = homeIcons[item.icon];
                return (
                  <article key={item.step} className="card-border rounded-xl p-5">
                    <div className="flex items-center gap-3">
                      {Icon && (
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-copper-50/30 bg-copper-50/5 text-copper-50">
                          <Icon size={18} strokeWidth={1.75} />
                        </span>
                      )}
                      <p className="text-sm font-semibold text-blue-50">Step {item.step}</p>
                    </div>
                    <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                    <p className="mt-3 text-sm text-white-50">{item.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="pricing-preview" className="home-section-surface py-14 md:py-20">
          <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
            <SectionTitle
              eyebrow="Pricing Preview"
              title="Monthly retainers built for consistent content output"
              description="Start with a monthly content system, then scale into campaigns or standalone production as needed. Public pricing is shown in CAD and finalized around real scope."
            />

            <div className="pricing-package-grid home-pricing-preview-grid mt-10">
              {pricingPreview.map((item) => (
                <PricingPackageCard
                  key={item.slug}
                  item={item}
                  ctaTo="/pricing"
                  ctaLabel="See full pricing"
                  ctaSize="sm"
                  ctaClassName="home-pricing-preview-card-cta"
                />
              ))}
            </div>

            <div className="home-pricing-preview-callout">
              <p className="home-pricing-preview-callout-kicker">Also available</p>
              <h3 className="home-pricing-preview-callout-title">
                One-off services are available alongside retainers.
              </h3>
              <p className="home-pricing-preview-callout-body">
                If you need a campaign shoot, promo piece, social ad, or a
                tightly scoped production day instead of ongoing monthly work,
                the full pricing page includes focused one-off options built
                for launches, seasonal pushes, and standalone deliverables.
              </p>
              <div className="home-pricing-preview-callout-actions">
                <CTAButton to="/pricing" variant="secondary" size="sm">
                  See available services
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        <div className="home-section">
          <Testimonials />
        </div>

        <FaqSection items={faqs} />

        <section id="final-cta" className="home-section-band border-t border-black-50 py-14 md:py-20">
          <div className="mx-auto w-full max-w-[960px] px-5 text-center md:px-10">
            <h2 className="section-heading">
              Let's build the right digital system for your business.
            </h2>
            <p className="section-description mx-auto mt-4 max-w-2xl">
              Start with one priority or a mixed scope. The goal is practical execution that improves how your brand presents, launches, and operates.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <CTAButton to="/contact">Start a Project</CTAButton>
              <CTAButton to="/contact" variant="secondary">
                Request a Quote
              </CTAButton>
              <CTAButton to="/contact" variant="ghost">
                Book a Call
              </CTAButton>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
