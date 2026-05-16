import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";
import { recruiterPortfolio, socialLinks } from "../constants";
import { getSafeExternalLinkAttributes } from "../lib/safeExternalLink";

const linkedInLink = socialLinks.find((item) => item.label === "LinkedIn");
const linkedInAttributes = linkedInLink
  ? getSafeExternalLinkAttributes(linkedInLink.href)
  : null;

function RecruiterPortfolioPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1180px] px-5 md:px-10 xl:px-16">
        <SectionTitle
          eyebrow={recruiterPortfolio.hero.eyebrow}
          title={recruiterPortfolio.hero.title}
          description={recruiterPortfolio.hero.description}
        />

        <div className="mt-8 flex flex-wrap gap-3">
          <CTAButton to="/work">Review Client Work</CTAButton>
          <CTAButton to="/contact" variant="secondary">
            Contact Me
          </CTAButton>
          {linkedInAttributes ? (
            <a
              href={linkedInAttributes.href}
              target={linkedInAttributes.target}
              rel={linkedInAttributes.rel}
              className="rounded-full border border-black-50 px-5 py-3 text-sm font-semibold text-white-50 transition-colors hover:border-white/50 hover:text-white"
            >
              LinkedIn
            </a>
          ) : null}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {recruiterPortfolio.technicalHighlights.map((item) => (
            <article key={item.title} className="card-border rounded-xl p-5 md:p-6">
              <h2 className="text-2xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white-50">
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {recruiterPortfolio.capabilityGroups.map((group) => (
            <article key={group.title} className="card-border rounded-xl p-5 md:p-6">
              <h2 className="text-xl font-semibold">{group.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-white-50">
                {group.items.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <article className="mt-12 rounded-xl border border-black-50 bg-black-100/60 p-6 md:p-8">
          <h2 className="text-2xl font-semibold md:text-3xl">
            What this portfolio is meant to prove
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-white-50 md:text-base">
            {recruiterPortfolio.evidence.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

export default RecruiterPortfolioPage;
