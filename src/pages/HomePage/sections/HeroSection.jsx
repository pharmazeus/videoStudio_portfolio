import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import HeroActionButtons from "../../../components/HeroActionButtons";
import { heroContent } from "../../../constants";

gsap.registerPlugin(useGSAP, ScrollToPlugin);

function HeroSection() {
  const [isHeroReady, setIsHeroReady] = useState(false);

  useGSAP(() => {
    if (typeof window === "undefined") {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    const tweens = [
      gsap.to(".figure-orange", {
        y: "-=30",
        rotation: "+=5",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      }),
      gsap.to(".figure-dark", {
        y: "+=20",
        rotation: "-=3",
        duration: 4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1,
      }),
    ];

    const onVisibilityChange = () => {
      if (document.hidden) {
        tweens.forEach((tween) => tween.pause());
      } else {
        tweens.forEach((tween) => tween.resume());
      }
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
      tweens.forEach((tween) => tween.kill());
    };
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setIsHeroReady(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const handleHeroPlayClick = () => {
    document
      .getElementById("services-overview")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="hero"
      className={`home-hero ${isHeroReady ? "home-hero-ready" : ""}`}
    >
      <div className="home-hero-glow" aria-hidden="true" />

      <div className="home-hero-stage relative mx-auto w-full max-w-[1280px] px-5 pb-10 pt-28 md:px-10 md:pb-16 md:pt-32 xl:px-20">
        <div className="home-hero-content relative flex flex-col justify-between py-6 md:min-h-[72vh] md:justify-center">
          <div className="home-hero-copy-shell relative z-30 pointer-events-none">
            <div className="home-hero-title-group">
              <h1
                className="home-hero-title"
                aria-label={`${heroContent.headline.intro} ${heroContent.headline.focus} ${heroContent.headline.outro}`}
              >
                <span className="home-hero-title-cluster home-hero-title-cluster-top">
                  <span className="home-hero-title-line">
                    {heroContent.headline.intro}
                  </span>
                  <span className="home-hero-title-line home-hero-title-line-accent">
                    {heroContent.headline.focus}
                  </span>
                </span>
                <span className="home-hero-title-cluster home-hero-title-cluster-bottom">
                  <span className="home-hero-title-line">
                    {heroContent.headline.outro}
                  </span>
                </span>
              </h1>
            </div>

            <div className="home-hero-lower-copy">
              <p className="home-hero-body">
                {heroContent.subheadline}
              </p>

              <HeroActionButtons />
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2">
            <button
              type="button"
              onClick={handleHeroPlayClick}
              aria-label="Scroll to services overview"
              className="figure-orange group pointer-events-auto absolute z-20 flex touch-manipulation items-center justify-center border border-white/20 bg-gradient-to-br from-[#E68A45] to-[#99531E] shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.5),inset_10px_10px_20px_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.5)] transition-[filter] duration-300 will-change-transform hover:brightness-110"
            >
              <div className="pointer-events-none absolute inset-0 rounded-[40px] bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:rounded-[60px]" />
              <div className="pointer-events-none flex h-12 w-12 items-center justify-center rounded-full border-[2px] border-[#FFEA00] bg-white/10 shadow-[0_0_15px_rgba(255,234,0,0.5),inset_0_0_10px_rgba(255,234,0,0.5)] backdrop-blur-md transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                <div className="ml-1 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-[#FFEA00] md:border-y-[10px] md:border-l-[16px]" />
              </div>
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2">
            <div
              aria-hidden="true"
              className="figure-dark pointer-events-none absolute bottom-0 left-0 h-[240px] w-[120px] translate-y-[100px] -rotate-[10deg] rounded-[30px] border border-white/10 bg-gradient-to-br from-[#2a2a2a] to-[#111] shadow-[inset_-5px_-5px_15px_rgba(0,0,0,0.8),inset_5px_5px_15px_rgba(255,255,255,0.1),0_15px_30px_rgba(0,0,0,0.6)] md:h-[360px] md:w-[180px] md:translate-y-[150px] md:rounded-[50px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
