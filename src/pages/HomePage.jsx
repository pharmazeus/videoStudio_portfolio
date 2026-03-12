import { Link } from "react-router-dom";

import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";
import Testimonials from "../sections/Testimonials";
import {
  caseStudies,
  faqs,
  heroContent,
  pricingPackages,
  processSteps,
  services,
  valueStrip,
  whyWorkWithMe,
} from "../constants";
import { formatFromPrice } from "../lib/formatPrice";

function HomePage() {
  const featuredWork = caseStudies.filter((item) => item.featured).slice(0, 3);
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
            eyebrow="Featured Work"
            title="Selected proof across content, web, and systems"
            description="A curated set of projects that show practical digital execution across presentation and operations."
          />

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featuredWork.map((item) => (
              <article key={item.slug} className="card-border flex h-full flex-col rounded-xl">
                <div className="overflow-hidden rounded-t-xl border-b border-black-50">
                  <img
                    src={item.media.poster}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="h-56 w-full object-cover"
                  />
                </div>
                <div className="flex h-full flex-col p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-blue-50">
                    {item.category}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-white-50">{item.excerpt}</p>
                  <Link
                    to={`/work/${item.slug}`}
                    className="mt-5 inline-flex text-sm font-semibold text-white transition-colors hover:text-blue-50"
                  >
                    View Case Study
                  </Link>
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
