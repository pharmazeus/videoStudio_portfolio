import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "../components/CTAButton";
import ResponsiveImage from "../components/ResponsiveImage";
import TitleHeader from "../components/TitleHeader";
import { longTermClients } from "../constants";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const [expandedClients, setExpandedClients] = useState({});

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);

      if (titleRef.current) {
        gsap.set(titleRef.current, { opacity: 0, y: 28 });
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      if (cards.length > 0) {
        gsap.set(cards, { opacity: 0, y: 32 });
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: cards[0],
            start: "top 88%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleClientNote = (company) => {
    setExpandedClients((current) => ({
      ...current,
      [company]: !current[company],
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding flex-center min-h-screen"
    >
      <div className="w-full h-full md:px-20 px-5">
        <div ref={titleRef}>
          <TitleHeader
            title="Partnerships built through repeat delivery."
            sub="Long-term Clients"
          />
        </div>

        <div>
          <div className="mx-auto mt-12 grid max-w-[56rem] grid-cols-1 gap-8 md:mt-16">
            {longTermClients.map((client, index) => {
              const noteContent = client.note ?? client.review;
              const isExpanded = Boolean(expandedClients[client.company]);
              const logoShellClassName = [
                "long-term-client-logo-shell",
                client.logoShellClassName,
              ]
                .filter(Boolean)
                .join(" ");
              const logoClassName = [
                "long-term-client-logo",
                client.logoClassName,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <article
                  key={client.company}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="long-term-client-card"
                >
                  <div className="long-term-client-card-header">
                    <div className={logoShellClassName}>
                      <ResponsiveImage
                        src={client.logoPath}
                        alt={`${client.company} logo`}
                        width="658"
                        height="524"
                        loading="lazy"
                        decoding="async"
                        className={logoClassName}
                        sizes="(min-width: 768px) 14rem, 12rem"
                      />
                    </div>

                    <div className="long-term-client-copy">
                      <p className="long-term-client-kicker">Client</p>
                      <h3 className="long-term-client-title">
                        {client.company}
                      </h3>
                      <p className="long-term-client-meta">
                        {client.relationshipLabel}
                      </p>
                    </div>
                  </div>

                  {noteContent || client.instagramUrl ? (
                    <div className="mt-6">
                      <div className="flex flex-wrap items-center gap-3">
                        {noteContent ? (
                          <CTAButton
                            onClick={() => toggleClientNote(client.company)}
                            variant="secondary"
                            size="sm"
                            aria-expanded={isExpanded}
                            className="long-term-client-note-button"
                          >
                            {isExpanded
                              ? "Hide Collaboration Note"
                              : "Show Collaboration Note"}
                          </CTAButton>
                        ) : null}

                        {client.instagramUrl ? (
                          <CTAButton
                            href={client.instagramUrl}
                            variant="secondary"
                            size="sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            See Instagram Profile
                          </CTAButton>
                        ) : null}
                      </div>

                      <div
                        className={`long-term-client-note-wrapper ${
                          isExpanded ? "is-open" : ""
                        }`}
                      >
                        <p className="long-term-client-note">
                          {noteContent}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
