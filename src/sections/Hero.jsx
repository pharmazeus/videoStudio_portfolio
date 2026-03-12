import React, { useEffect, useRef, useState } from "react";
import { words_videos } from "../constants/index";
import Button from "../components/Button";
import HeroExperience from "../components/HeroModels/HeroExperience";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedCounter from "../components/AnimatedCounter";
// import heroVideoMp4Vertical from "/public/videos/HorizontalSpaceZoomInAndOutCreatorBgVideo.mp4";

const Hero = () => {
  const [isBgLoaded, setIsBgLoaded] = useState(false);
  const bgImageRef = useRef(null);
  const loopedVideoWords = [...words_videos, words_videos[0]];

  useEffect(() => {
    if (bgImageRef.current?.complete) {
      const rafId = requestAnimationFrame(() => setIsBgLoaded(true));
      return () => cancelAnimationFrame(rafId);
    }
  }, []);

  const handleBgLoad = () => {
    requestAnimationFrame(() => setIsBgLoaded(true));
  };

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text, h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" },
    );
  });
  return (
    <section id="hero" className="relative overflow-hidden">
      {/* Background */}
      <div
        className={`absolute inset-0 z-0 pointer-events-none select-none transition-opacity duration-[1600ms] ease-out motion-reduce:transition-none motion-reduce:duration-200 ${
          isBgLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <picture className="block h-full w-full">
          <source
            media="(min-width: 1024px)"
            type="image/webp"
            srcSet="/posters/at_cinema/at_cinema_1920webp.webp"
          />
          <source
            media="(min-width: 768px)"
            type="image/webp"
            srcSet="/posters/at_cinema/at_cinema_1440webp.webp"
          />
          <source
            type="image/webp"
            srcSet="/posters/at_cinema/960_alt/960_cinema.webp"
          />
          <img
            src="/posters/at_cinema/960_alt/960_cinema.jpg"
            srcSet="/posters/at_cinema/960_alt/960_cinema.jpg 960w, /posters/at_cinema/at_cinema_1440jpeg.jpg 1440w, /posters/at_cinema/at_cinema_1920jpeg.jpg 1920w"
            sizes="100vw"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            decoding="async"
            loading="eager"
            onLoad={handleBgLoad}
            ref={bgImageRef}
            className="h-full w-full object-cover object-center"
          />
        </picture>
        <div
          aria-hidden="true"
          className="hero-bg-contrast absolute inset-0 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hero-bg-vignette absolute inset-0 pointer-events-none"
        />
        {/* optional overlay for readability */}
      </div>
      {/* Foreground content */}
      <div className="relative z-10 hero-layout">
        {/*LEFT : HERO CONTENT*/}
        <header className="flex h-full flex-col justify-start md:justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex h-full flex-col md:h-auto">
            <h1 className="hero-text mb-2 md:mb-4"> I turn ideas into</h1>
            <div className="hero-text pb-5 h-[48px] md:h-[78px]">
              <span className="slide">
                <span className="wrapper">
                  {loopedVideoWords.map((word, index) => {
                    const isClone = index === words_videos.length;

                    return (
                      <span
                        key={`${word.text}-${isClone ? "clone" : "base"}`}
                        className="word-rotator-row flex items-center md:gap-3 gap-1"
                        aria-hidden={isClone}
                      >
                        <img
                          src={word.imgPath}
                          alt={isClone ? "" : word.text}
                          className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                        ></img>
                        <span>{word.text}</span>
                      </span>
                    );
                  })}
                </span>
              </span>

              {/* <h1>Into real projects</h1>
              <h1>that Deliver Results</h1> */}
            </div>

            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
              From shooting to final frame — cinematic visuals designed to
              convert.
            </p>

            <Button
              className="md:w-80 md:h-16 w-60 h-12 mt-auto pb-32 md:mt-0 md:pb-0 md:pt-6"
              text="See my work"
              id="work"
            />
          </div>
        </header>

        {/*RIGHT: 3D Model*/}
        {/* <figure>
          <div className="hero-3d-layout"> */}
        {/* <HeroExperience></HeroExperience> */}
        {/* </div>
        </figure> */}
      </div>
    </section>
  );
};

export default Hero;
