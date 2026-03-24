import { Check, Flame } from "lucide-react";

import CTAButton from "./CTAButton";
import { formatFromPrice, formatPrice } from "../lib/formatPrice";

const billingTypeLabels = {
  monthly: "Monthly retainer",
  "one-off": "One-off project",
  project: "Project scope",
};

function getPriceRangeLabel(item) {
  if (!item.priceRange) {
    return "Custom quote for scoped builds.";
  }

  return `Typical range: ${formatPrice(item.priceRange[0], item.currency)} - ${formatPrice(
    item.priceRange[1],
    item.currency,
  )}`;
}

function PricingPackageCard({ item, ctaTo, ctaLabel = "Select service" }) {
  return (
    <article
      className={`pricing-package-card ${item.featured ? "is-featured" : ""}`}
    >
      <div className="pricing-package-card-inner">
        <header className="pricing-package-card-header">
          <div className="pricing-package-card-topline">
            <p className="pricing-package-card-kicker">
              {billingTypeLabels[item.billingType] ?? "Project scope"}
            </p>
            {item.featured ? (
              <span className="pricing-package-card-badge">
                <Flame aria-hidden="true" size={14} />
                Recommended
              </span>
            ) : null}
          </div>

          <h3 className="pricing-package-card-title">{item.name}</h3>
        </header>

        <div className="pricing-package-card-price-block">
          <p className="pricing-package-card-price">
            {formatFromPrice(item.startingPrice, item.currency)}
          </p>
          <p className="pricing-package-card-range">{getPriceRangeLabel(item)}</p>
        </div>

        <div className="pricing-package-card-divider" aria-hidden="true" />

        <ul className="pricing-package-card-list">
          {item.includes.map((point) => (
            <li key={point} className="pricing-package-card-list-item">
              <Check aria-hidden="true" className="pricing-package-card-check" size={16} />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {item.customQuoteRequired ? (
          <p className="pricing-package-card-note">Custom scope required</p>
        ) : null}

        <div className="pricing-package-card-footer">
          <CTAButton
            to={ctaTo}
            variant="secondary"
            className="pricing-package-card-cta"
          >
            {ctaLabel}
          </CTAButton>
        </div>
      </div>
    </article>
  );
}

export default PricingPackageCard;
