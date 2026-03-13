import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";
import Testimonials from "../sections/Testimonials";
import {
  caseStudies,
  faqs,
  getFeaturedCaseStudies,
  heroContent,
  pricingPackages,
  processSteps,
  services,
  valueStrip,
  videoTypeMeta,
  whyWorkWithMe,
} from "../constants";
import { formatFromPrice } from "../lib/formatPrice";
import { VIDEO_PLACEHOLDER_SRC } from "../lib/youtube.js";

function FeaturedVideoMedia({ item }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const hasPreviewClip = Boolean(item.media.previewSrc) && !videoFailed;
  const posterSrc = item.media.poster || VIDEO_PLACEHOLDER_SRC;

  useEffect(() => {
    if (!hasPreviewClip || !cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      {
        rootMargin: "220px 0px",
        threshold: 0.25,
      },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [hasPreviewClip]);

  useEffect(() => {
    if (!hasPreviewClip) return;

    const video = videoRef.current;
    if (!video) return;

    if (!isNearViewport) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }, [hasPreviewClip, isNearViewport]);

  return (
    <a
      ref={cardRef}
      href={item.media.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch on YouTube: ${item.title}`}
      className="video-work-media-shell block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-50/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <div className="video-work-media-frame">
        {hasPreviewClip ? (
          <video
            ref={videoRef}
            className="video-work-media-asset"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={posterSrc}
            onError={() => setVideoFailed(true)}
          >
            <source src={item.media.previewSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={posterSrc}
            alt={item.title}
            loading="lazy"
            decoding="async"
            className="video-work-media-asset"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = VIDEO_PLACEHOLDER_SRC;
            }}
          />
        )}
        <div className="video-work-media-overlay" aria-hidden="true" />
        {hasPreviewClip ? (
          <div className="video-work-media-copy">
            <p className="video-work-media-label">Preview Clip</p>
          </div>
        ) : null}
      </div>
    </a>
  );
}

function HomePage() {
  const featuredWork = useMemo(() => {
    const selected = getFeaturedCaseStudies(4).filter(
      (item) => item.slug !== "ai-reveal-ad-house-in-markham",
    );
    const aiReveal = caseStudies.find(
      (item) => item.slug === "ai-reveal-ad-house-in-markham",
    );

    if (!aiReveal) {
      return selected.slice(0, 4);
    }

    return [aiReveal, ...selected].slice(0, 4);
  }, []);
  const pricingPreview = pricingPackages
    .filter((item) => item.category === "monthly-retainers")
    .slice(0, 3);

  return (
    <>
      <section id="hero" className="relative overflow-hidden border-b border-black-50">
        <picture className="pointer-events-none absolute inset-0 block h-full w-full select-none">
          <source
            media="(min-width: 1024px)"
            type="image/webp"
            srcSet="/posters/at_cinema/at_cinema_1920webp.webp"
          />
          <source
            media="(min-width: 768px)"
            type="image/webp"
            srcSet="/posters/at_cinema/at_cinema_1440webp.webp"
          />
          <source
            type="image/webp"
            srcSet="/posters/at_cinema/960_alt/960_cinema.webp"
          />
          <img
            src="/posters/at_cinema/960_alt/960_cinema.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center"
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
        <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1280px] px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32 xl:px-20">
          <div className="flex min-h-[64vh] flex-col justify-between lg:min-h-[58vh] lg:justify-center">
            <div className="max-w-3xl">
              <p className="inline-flex rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs uppercase tracking-[0.16em] text-white-50">
                Digital Systems Creator
              </p>
              <h1 className="mt-4 text-4xl font-semibold leading-tight text-white md:text-6xl">
                {heroContent.headline}
              </h1>
              <p className="mt-5 max-w-2xl text-base text-white-50 md:text-xl">
                {heroContent.subheadline}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 md:gap-4">
              <CTAButton to={heroContent.primaryCta.path}>
                {heroContent.primaryCta.label}
              </CTAButton>
              <CTAButton to={heroContent.secondaryCta.path} variant="secondary">
                {heroContent.secondaryCta.label}
              </CTAButton>
            </div>
          </div>
        </div>
      </section>

      <section id="value-strip" className="border-b border-black-50 bg-black-100/50">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-4 px-5 py-8 md:grid-cols-3 md:px-10 xl:px-20">
          {valueStrip.map((item) => (
            <div key={item} className="card-border rounded-xl p-4 text-sm text-white-50">
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="featured-work" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
          <SectionTitle
            eyebrow="Featured Video Work"
            title="Selected cuts from the live video catalog"
            description="A first look at ad, tutorial, and showcase edits already live on YouTube, each backed by a fuller case-study breakdown."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {featuredWork.map((item) => (
              <article key={item.slug} className="video-work-card card-border">
                <FeaturedVideoMedia item={item} />
                <div className="video-work-card-body">
                  <div className="video-work-card-copy">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full border border-white/10 bg-black px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-blue-50">
                        {videoTypeMeta[item.videoType].singularLabel}
                      </span>
                      {item.series ? (
                        <span className="rounded-full border border-white/10 bg-black px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white-50">
                          {`${item.series.name} - Part ${item.series.part}`}
                        </span>
                      ) : null}
                    </div>

                    <div className="video-work-card-text">
                      <h3 className="video-work-card-title">
                        {item.title}
                      </h3>
                      <p className="video-work-card-excerpt">
                        {item.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="video-work-card-actions">
                    <CTAButton
                      to={`/work/${item.slug}`}
                      size="sm"
                      className="min-w-0 justify-center"
                    >
                      Open Case Study
                    </CTAButton>
                    <CTAButton
                      href={item.media.youtubeUrl}
                      variant="secondary"
                      size="sm"
                      className="min-w-0 justify-center"
                    >
                      Watch on YouTube
                    </CTAButton>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="services-overview" className="border-y border-black-50 bg-black-100/40 py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
          <SectionTitle
            eyebrow="Services"
            title="Three connected layers of one digital system"
            description="Content, web, and automation are delivered as one execution model, not separate career tracks."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {services.map((item) => (
              <article key={item.slug} className="card-border rounded-xl p-5">
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-white-50">{item.summary}</p>
                <ul className="mt-5 space-y-2 text-sm text-white-50">
                  {item.deliverables.slice(0, 3).map((point) => (
                    <li key={point}>- {point}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="why-work" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
          <SectionTitle
            eyebrow="Why Work With Me"
            title="Creative execution meets digital systems thinking"
          />
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {whyWorkWithMe.map((item) => (
              <article key={item.title} className="card-border rounded-xl p-5">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-white-50">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="border-y border-black-50 bg-black-100/40 py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
          <SectionTitle
            eyebrow="Process"
            title="A focused build flow from scope to launch"
          />
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((item) => (
              <article key={item.step} className="card-border rounded-xl p-5">
                <p className="text-sm font-semibold text-blue-50">Step {item.step}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-white-50">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing-preview" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
          <SectionTitle
            eyebrow="Pricing Preview"
            title="Simple starting points for monthly content"
            description="Public pricing is shown as starting prices in CAD. Final quotes are scoped to project reality."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {pricingPreview.map((item) => (
              <article
                key={item.slug}
                className={`rounded-xl p-5 ${
                  item.featured
                    ? "border border-white/30 bg-white/[0.04]"
                    : "card-border"
                }`}
              >
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="mt-2 text-lg text-white">{formatFromPrice(item.startingPrice)}</p>
                <p className="mt-3 text-xs uppercase tracking-[0.12em] text-white-50">
                  {item.billingType}
                </p>
                <Link
                  to="/pricing"
                  className="mt-5 inline-flex text-sm font-semibold text-white transition-colors hover:text-blue-50"
                >
                  See Full Pricing
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      <section id="faq" className="py-14 md:py-20">
        <div className="mx-auto w-full max-w-[960px] px-5 md:px-10">
          <SectionTitle eyebrow="FAQ" title="Common questions before we scope" />
          <div className="mt-8 space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="card-border rounded-xl p-4">
                <summary className="cursor-pointer text-base font-semibold text-white">
                  {item.question}
                </summary>
                <p className="mt-3 text-sm text-white-50">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="final-cta" className="border-t border-black-50 bg-black-100/40 py-14 md:py-20">
        <div className="mx-auto w-full max-w-[960px] px-5 text-center md:px-10">
          <h2 className="text-3xl font-semibold md:text-5xl">
            Let's build the right digital system for your business.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-white-50">
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
    </>
  );
}

export default HomePage;
