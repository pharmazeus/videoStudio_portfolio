import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CTAButton from "../components/CTAButton";
import TitleHeader from "../components/TitleHeader";
import { longTermClients } from "../constants";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const [showClients, setShowClients] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [expandedClients, setExpandedClients] = useState({});

  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef([]);

  // Initial GSAP animations setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide title and cards
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
      gsap.set(cardsRef.current, { opacity: 0, y: 80, scale: 0.8 });

      // Title animation on scroll
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse",
          },
        });
      }

      if (sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          onEnter: () => setIsButtonVisible(true),
          onEnterBack: () => setIsButtonVisible(true),
          onLeaveBack: () => setIsButtonVisible(false),
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Button animation when it appears
  useEffect(() => {
    if (isButtonVisible && !showClients && buttonRef.current) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
        delay: 0.1,
      });
    } else if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [isButtonVisible, showClients]);

  // Cards animation when clients are shown
  useEffect(() => {
    if (showClients && cardsRef.current.length > 0) {
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power2.inOut",
        stagger: 0.1,
        delay: 0.1,
      });
    }
  }, [showClients]);

  const handleTriggerClients = () => {
    setShowClients(true);

    setTimeout(() => {
      document.getElementById("testimonials").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);
  };

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

        {/* Trigger Button - Shows when user reaches bottom */}
        {isButtonVisible && !showClients && (
          <div className="flex-center mt-12 md:mt-16">
            <CTAButton
              ref={buttonRef}
              onClick={handleTriggerClients}
              size="lg"
              className="min-w-[14rem] md:min-w-[16rem]"
            >
              <span className="block md:hidden">View Clients</span>
              <span className="hidden md:block">View Long-term Clients</span>
            </CTAButton>
          </div>
        )}

        {/* Clients Section with GSAP Animation */}
        <div className={`${showClients ? "block" : "hidden"}`}>
          <div className="mx-auto mt-16 grid max-w-[56rem] grid-cols-1 gap-8">
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
                      <img
                        src={client.logoPath}
                        alt={`${client.company} logo`}
                        loading="lazy"
                        decoding="async"
                        className={logoClassName}
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

                  {noteContent ? (
                    <div className="mt-6">
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
