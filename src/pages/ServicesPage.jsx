import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";
import { services } from "../constants";

function ServicesPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <SectionTitle
          eyebrow="Services"
          title="Services built around one digital system."
          description="I help businesses improve how they present, launch, and operate by combining content, websites, and automation into one execution layer."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
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
            One operator. Three mechanisms. One connected system.
          </h2>
          <p className="mt-4 max-w-3xl text-white-50">
            Content gets attention, websites turn that attention into action, and
            automation reduces friction in day-to-day execution.
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
