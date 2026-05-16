import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";
import { services } from "../constants";

function ServicesPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <SectionTitle
          eyebrow="Services"
          title="Web, video, and content that make the offer easier to understand."
          description="I help businesses turn scattered digital presence into a clear path: what you do, why it matters, what proof supports it, and how someone can take the next step."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article key={service.slug} className="card-border rounded-xl p-5 md:p-6">
              <h2 className="text-2xl font-semibold">{service.title}</h2>
              <p className="mt-3 text-sm text-white-50">{service.summary}</p>

              <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-blue-50">
                Includes
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-white-50">
                {service.deliverables.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>

              <h3 className="mt-5 text-sm font-semibold uppercase tracking-[0.12em] text-blue-50">
                Business impact
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-white-50">
                {service.outcomes.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-black-50 bg-black-100/60 p-6 md:p-8">
          <h2 className="text-2xl font-semibold md:text-3xl">
            One operator. Four practical ways to make the brand clearer.
          </h2>
          <p className="mt-4 max-w-3xl text-white-50">
            Websites turn attention into action, video editing sharpens the
            story, on-location filming gives the brand fresh material, and
            ongoing content keeps the presence consistent.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CTAButton to="/pricing">Request a Quote</CTAButton>
            <CTAButton to="/contact" variant="secondary">
              Start a Project
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesPage;
