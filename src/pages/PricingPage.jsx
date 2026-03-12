import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";
import { addOns, pricingCategories, pricingPackages } from "../constants";
import { formatFromPrice, formatPrice } from "../lib/formatPrice";

function PricingPage() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <SectionTitle
          eyebrow="Pricing"
          title="Simple starting prices, scoped to real project needs"
          description="Public pricing is shown as starting at / from rates in CAD. Final quotes are based on scope, revisions, travel, complexity, and timeline."
        />

        <div className="mt-10 space-y-12">
          {pricingCategories.map((category) => {
            const items = pricingPackages.filter(
              (pkg) => pkg.category === category.slug,
            );

            if (items.length === 0) return null;

            return (
              <section key={category.slug}>
                <h2 className="text-2xl font-semibold md:text-3xl">{category.title}</h2>
                <p className="mt-2 text-white-50">{category.description}</p>

                <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {items.map((item) => (
                    <article
                      key={item.slug}
                      className={`rounded-xl p-5 ${
                        item.featured
                          ? "border border-white/30 bg-white/[0.04]"
                          : "card-border"
                      }`}
                    >
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="mt-3 text-lg font-medium text-white">
                        {formatFromPrice(item.startingPrice, item.currency)}
                      </p>

                      {item.priceRange ? (
                        <p className="mt-1 text-xs text-white-50">
                          Typical range: {formatPrice(item.priceRange[0], item.currency)} -{" "}
                          {formatPrice(item.priceRange[1], item.currency)}
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-white-50">Custom quote for scoped builds.</p>
                      )}

                      <ul className="mt-4 space-y-2 text-sm text-white-50">
                        {item.includes.map((point) => (
                          <li key={point}>- {point}</li>
                        ))}
                      </ul>

                      {item.customQuoteRequired ? (
                        <p className="mt-4 text-xs uppercase tracking-[0.12em] text-blue-50">
                          Custom scope required
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold md:text-3xl">Add-ons</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {addOns.map((item) => (
              <article key={item.name} className="card-border rounded-xl p-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="mt-2 text-sm text-white-50">
                  {item.label
                    ? item.label
                    : item.customQuoteRequired
                      ? "Custom quote"
                      : `${formatFromPrice(item.startingPrice)}`}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-12 rounded-xl border border-black-50 bg-black-100/60 p-6 md:p-8">
          <h2 className="text-2xl font-semibold md:text-3xl">Need a mixed scope?</h2>
          <p className="mt-3 max-w-3xl text-white-50">
            If your project combines content, website, and automation work, the best path is a scoped quote with clear phases.
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
