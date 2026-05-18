import { useEffect, useId, useMemo, useState } from "react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";

import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";

const defaultCta = {
  eyebrow: "Not sure what fits your project?",
  body: "Send a quick brief and I will suggest the best starting point.",
  label: "Scope my project",
  to: "/contact",
};

function getInitialOpenIndex(items, defaultOpenIndex) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return defaultOpenIndex >= 0 && defaultOpenIndex < items.length
    ? defaultOpenIndex
    : null;
}

function FaqSection({
  items = [],
  eyebrow = "FAQ / Before We Start",
  title = "Common questions before we scope",
  description = "Quick answers about services, pricing, timelines, and how projects usually start.",
  defaultOpenIndex = 0,
  cta = defaultCta,
}) {
  const sectionId = useId();
  const faqItems = useMemo(() => items.filter(Boolean), [items]);
  const [openIndex, setOpenIndex] = useState(() =>
    getInitialOpenIndex(faqItems, defaultOpenIndex),
  );
  const ctaConfig = { ...defaultCta, ...cta };

  useEffect(() => {
    setOpenIndex((current) => {
      if (current !== null && current < faqItems.length) {
        return current;
      }

      return getInitialOpenIndex(faqItems, defaultOpenIndex);
    });
  }, [defaultOpenIndex, faqItems]);

  const handleToggle = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  if (faqItems.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="home-faq-section home-section py-14 md:py-20">
      <div className="home-faq-shell">
        <div className="home-faq-frame">
          <SectionTitle
            eyebrow={eyebrow}
            title={title}
            description={description}
            className="home-faq-title"
          />

          <div className="home-faq-list">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `${sectionId}-panel-${index}`;
              const buttonId = `${sectionId}-button-${index}`;

              return (
                <article
                  key={item.question}
                  className="home-faq-item"
                  data-state={isOpen ? "open" : "closed"}
                >
                  <h3 className="home-faq-question-heading">
                    <button
                      id={buttonId}
                      type="button"
                      className="home-faq-question"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => handleToggle(index)}
                    >
                      <span>{item.question}</span>
                      <span className="home-faq-chevron" aria-hidden="true">
                        <ChevronDown size={22} strokeWidth={1.9} />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!isOpen}
                    className="home-faq-answer-shell"
                  >
                    <div className="home-faq-answer-inner">
                      <p className="home-faq-answer">{item.answer}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="home-faq-cta" aria-label={ctaConfig.eyebrow}>
            <span className="home-faq-cta-icon" aria-hidden="true">
              <Sparkles size={25} strokeWidth={1.6} />
            </span>
            <div className="home-faq-cta-copy">
              <h3>{ctaConfig.eyebrow}</h3>
              <p>{ctaConfig.body}</p>
            </div>
            <CTAButton
              to={ctaConfig.to}
              variant="secondary"
              size="lg"
              className="home-faq-cta-button"
            >
              <span>{ctaConfig.label}</span>
              <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
            </CTAButton>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;
