import CTAButton from "../components/CTAButton";
import ResponsiveImage from "../components/ResponsiveImage";
import { services } from "../constants";

const servicePricingCategory = {
  "video-editing": "one-off-projects",
  "video-production": "one-off-projects",
  "brand-content-growth": "monthly-retainers",
  "web-development": "web-offers",
};

const projectTypeByService = {
  "web-development": "website",
  "video-editing": "video",
  "video-production": "video",
  "brand-content-growth": "content",
};

const systemCards = [
  {
    label: "01",
    title: "Clarify the offer",
    body: "Make the service, proof, and next step easier for a visitor to understand.",
  },
  {
    label: "02",
    title: "Create useful assets",
    body: "Turn footage, pages, and content ideas into material that can support real sales conversations.",
  },
  {
    label: "03",
    title: "Keep the path active",
    body: "Connect launches, edits, shoots, and content rhythm so the brand keeps moving after one project.",
  },
];

const serviceStoryImageWidths = [480, 640, 960];

function createContactPath(service) {
  const params = new URLSearchParams({
    projectType: projectTypeByService[service.slug] ?? "mixed-scope",
    service: service.title,
  });

  return `/contact?${params.toString()}`;
}

function ServicesPage() {
  const serviceCount = services.length.toString().padStart(2, "0");

  return (
    <div className="services-page">
      <section className="services-hero">
        <div className="services-hero-grid">
          <div className="services-hero-copy">
            <p className="section-eyebrow">Services</p>
            <h1 className="section-heading mt-4">
              Services built around one digital system.
            </h1>
            <p className="section-description mt-5 max-w-3xl">
              Websites, editing, filming, and content systems work better when
              they point to the same story: what you do, why it matters, what
              proof supports it, and how a client takes the next step.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CTAButton to="/contact">Start a Project</CTAButton>
              <CTAButton to="/pricing" variant="secondary">
                View Pricing
              </CTAButton>
            </div>
          </div>

          <aside className="services-hero-panel" aria-label="Services overview">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper-50">
              Connected offers
            </p>
            <p className="mt-6 text-6xl font-semibold leading-none text-white md:text-7xl">
              {serviceCount}
            </p>
            <p className="mt-4 text-lg font-semibold text-white">
              Practical ways to improve how the brand presents, launches, and
              stays visible.
            </p>
            <p className="mt-4 text-sm leading-7 text-white-50">
              Start with one priority or combine services into a focused
              launch path. The work stays grounded in assets a business can
              actually use.
            </p>
          </aside>
        </div>
      </section>

      <section className="services-system-band" aria-labelledby="services-system-title">
        <div className="max-w-3xl">
          <p className="section-eyebrow">How it connects</p>
          <h2 id="services-system-title" className="section-heading mt-4">
            One clear path from attention to inquiry.
          </h2>
        </div>
        <div className="services-system-grid mt-8">
          {systemCards.map((item) => (
            <article key={item.title} className="services-system-card">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-copper-50">
                {item.label}
              </p>
              <h3 className="mt-5 text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-white-50">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="services-story-list" aria-label="Service details">
        {services.map((service, index) => {
          const pricingCategory = servicePricingCategory[service.slug];

          return (
            <article
              key={service.slug}
              className={`services-story-card ${index % 2 === 1 ? "is-reversed" : ""}`}
            >
              <div className="services-story-intro">
                <p className="services-story-kicker">0{index + 1} / {service.title}</p>
                <h2 className="services-story-title">{service.title}</h2>
                <p className="services-story-lede">{service.storyHeadline}</p>
              </div>

              <div className="services-story-media">
                <ResponsiveImage
                  src={service.storyImage}
                  alt={service.storyImageAlt}
                  className="services-story-image"
                  width="1586"
                  height="992"
                  widths={serviceStoryImageWidths}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index === 0 ? "high" : "auto"}
                  sizes="(min-width: 1280px) 560px, (min-width: 1024px) 52vw, 100vw"
                />
              </div>

              <div className="services-story-details">
                <p className="services-story-body">{service.storyBody}</p>

                <div className="services-story-meta">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-50">
                    Process
                  </p>
                  <ol className="services-story-list-block">
                    {service.storySteps.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </div>

                <div className="mt-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-50">
                      Key outputs
                    </p>
                    <ul className="services-story-list-block">
                      {service.deliverables.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="services-proof-chips" aria-label={`${service.title} impact`}>
                  {service.proofPoints.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>

                <div className="services-story-actions mt-7 flex flex-wrap gap-3">
                  <CTAButton to={createContactPath(service)} size="sm">
                    {service.ctaLabel}
                  </CTAButton>
                  {pricingCategory ? (
                    <CTAButton to={`/pricing#${pricingCategory}`} variant="secondary" size="sm">
                      See pricing
                    </CTAButton>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="services-final-cta" aria-labelledby="services-final-title">
        <div className="relative z-10 max-w-3xl">
          <p className="section-eyebrow">Start with the clearest next move</p>
          <h2 id="services-final-title" className="section-heading mt-4">
            Let's shape the service path around what your client needs to understand first.
          </h2>
          <p className="section-description mt-4">
            Bring one priority, a rough idea, or a mixed scope. The first step
            is turning it into a practical plan with the right assets.
          </p>
        </div>
        <div className="relative z-10 flex flex-wrap gap-3">
          <CTAButton to="/contact">
            Start a Project
          </CTAButton>
          <CTAButton to="/pricing" variant="secondary">
            View Pricing
          </CTAButton>
        </div>
      </section>
    </div>
  );
}

export default ServicesPage;
