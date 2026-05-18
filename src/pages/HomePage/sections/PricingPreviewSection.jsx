import CTAButton from "../../../components/CTAButton";
import PricingPackageCard from "../../../components/PricingPackageCard";
import SectionTitle from "../../../components/SectionTitle";
import { pricingPackages } from "../../../constants";

function PricingPreviewSection() {
  const pricingPreview = pricingPackages
    .filter((item) => item.category === "monthly-retainers")
    .slice(0, 3);

  return (
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
  );
}

export default PricingPreviewSection;
