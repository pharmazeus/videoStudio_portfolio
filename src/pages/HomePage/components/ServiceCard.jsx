import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import CTAButton from "../../../components/CTAButton";
import ResponsiveImage from "../../../components/ResponsiveImage";
import { servicePricingCategory } from "../constants";

function ServiceCard({ item, index }) {
  const cardRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const navigate = useNavigate();
  const pricingCategory = servicePricingCategory[item.slug];

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setHasEntered(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.15) return;
        setHasEntered(true);
        observer.unobserve(entry.target);
      },
      {
        threshold: 0.15,
      },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  const handlePricesScroll = () => {
    if (!pricingCategory) return;
    navigate(`/pricing#${pricingCategory}`);
  };

  return (
    <article
      ref={cardRef}
      className={`home-service-card ${hasEntered ? "is-visible" : ""}`}
      style={{ "--service-card-delay": `${Math.min(index * 70, 210)}ms` }}
    >
      <div className="home-service-card-media">
        <ResponsiveImage
          src={item.image}
          alt={item.imageAlt}
          className="home-service-card-image"
          width="1280"
          height="800"
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1280px) 18rem, (min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="home-service-card-body">
        <div className="home-service-card-header">
          <p className="home-service-card-index">0{index + 1}</p>
          <h3 className="home-service-card-title">{item.title}</h3>
        </div>

        <p className="home-service-card-summary">{item.summary}</p>

        {pricingCategory ? (
          <div className="home-service-card-footer">
            <CTAButton
              variant="secondary"
              size="sm"
              className="home-service-card-prices-cta"
              onClick={handlePricesScroll}
            >
              See prices
            </CTAButton>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export default ServiceCard;
