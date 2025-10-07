import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "../components/TitleHeader";
import { testimonials } from "../constants";

gsap.registerPlugin(ScrollTrigger);

function Testimonials() {
  const [showReviews, setShowReviews] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  // Initial GSAP animations setup
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup - hide elements
      gsap.set([titleRef.current, buttonRef.current], { opacity: 0, y: 50 });
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Button animation when it appears
  useEffect(() => {
    if (isAtBottom && buttonRef.current) {
      gsap.to(buttonRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: "power2.out",
        delay: 0.3,
      });
    } else if (!isAtBottom && buttonRef.current) {
      gsap.to(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [isAtBottom]);

  // Cards animation when reviews are shown
  useEffect(() => {
    if (showReviews && cardsRef.current.length > 0) {
      gsap.to(cardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "easeInOut",
        stagger: 0.1,
        delay: 0.1,
      });
    }
  }, [showReviews]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;

          // Better mobile detection - trigger earlier on mobile
          const isMobile = window.innerWidth <= 768;
          const threshold = isMobile ? 200 : 150;
          const isNearBottom =
            scrollTop + windowHeight >= documentHeight - threshold;

          setIsAtBottom(isNearBottom);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleTriggerReviews = () => {
    setShowReviews(true);
    // Smooth scroll to testimonials section with better timing
    setTimeout(() => {
      document.getElementById("testimonials").scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 200);
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="section-padding flex-center min-h-screen"
    >
      <div ref={containerRef} className="w-full h-full md:px-20 px-5">
        <div ref={titleRef}>
          <TitleHeader
            title="What people say about us ?"
            sub="Client Feedback"
          />
        </div>

        {/* Trigger Button - Shows when user reaches bottom */}
        {isAtBottom && !showReviews && (
          <div className="flex-center mt-12 md:mt-16">
            <button
              ref={buttonRef}
              onClick={handleTriggerReviews}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold text-base md:text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95"
            >
              <span className="block md:hidden">View Reviews</span>
              <span className="hidden md:block">View Client Reviews</span>
            </button>
          </div>
        )}

        {/* Reviews Section with GSAP Animation */}
        <div className={`${showReviews ? "block" : "hidden"}`}>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 mt-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                ref={(el) => (cardsRef.current[index] = el)}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.imgPath}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {testimonial.mentions}
                    </p>
                  </div>
                </div>
                <p className="text-gray-200 leading-relaxed italic">
                  "{testimonial.review}"
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
