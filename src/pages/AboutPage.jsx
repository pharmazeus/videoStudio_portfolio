import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";

const targetClients = [
  "Local service businesses",
  "Construction and trades businesses",
  "Real estate / property / architecture-adjacent businesses",
  "Founders and personal brands",
  "Small teams that need sharper digital presence without hiring a full agency",
];

function AboutPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1080px] px-5 md:px-10">
        <SectionTitle
          eyebrow="About"
          title="Creative execution meets digital systems thinking."
          description="I work at the intersection of creative production and digital execution. My focus is helping brands build stronger digital presence through content, websites, and systems that are actually useful in day-to-day business."
        />

        <article className="card-border mt-8 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Positioning</h2>
          <p className="mt-4 text-white-50">
            I am not trying to be a full agency. I build focused digital systems that help businesses look sharper, launch faster, and reduce friction.
          </p>
        </article>

        <article className="card-border mt-6 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold">Best-fit clients</h2>
          <ul className="mt-4 space-y-2 text-white-50">
            {targetClients.map((client) => (
              <li key={client}>- {client}</li>
            ))}
          </ul>
        </article>

        <div className="card-border mt-6 rounded-xl p-6 md:p-8">
          <h2 className="text-2xl font-semibold">How I work</h2>
          <p className="mt-3 text-white-50">
            Projects stay commercially readable: plain language, clear scope,
            practical delivery. The objective is better presentation and smoother
            execution, not complexity for its own sake.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CTAButton to="/work">See Selected Work</CTAButton>
            <CTAButton to="/contact" variant="secondary">
              Start a Project
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;
