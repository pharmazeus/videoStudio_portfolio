import React from "react";
import { words_videos } from "../constants/index";
import Button from "../components/Button";
import HeroExperience from "../components/HeroModels/HeroExperience";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedCounter from "../components/AnimatedCounter";
// import heroVideoMp4Vertical from "/public/videos/HorizontalSpaceZoomInAndOutCreatorBgVideo.mp4";
import heroPoster from "/public/posters/horizontal/CinemaPosterHorizontal.png";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text, h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" },
    );
  });
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="absolute top-0 left-0 z-10">
        <img src={heroPoster} alt="background"></img>
      </div>
      \{/* Background layer */}
      {/* <div className="absolute inset-0 z-0">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroPoster}
          aria-hidden="true"
        >
          <source src={heroVideoMp4Vertical} type="video/mp4" />
        </video>
      </div> */}
      {/* Optional overlay to improve text contrast */}
      {/* Foreground content */}
      <div className="relative z-10 hero-layout">
        {/*LEFT : HERO CONTENT*/}
        <header className="flex flex-col justify-center md:w-full w-screen md:px-20 px-5">
          <div className="flex flex-col gap-7">
            <h1 className="hero-text mb-2 md:mb-4"> I turn ideas into</h1>
            <div className="hero-text pb-5">
              <span className="slide">
                <span className="wrapper">
                  {words_videos.map((word) => (
                    <span
                      key={word.text}
                      className="flex items-center md:gap-3 gap-1 pb-2"
                    >
                      <img
                        src={word.imgPath}
                        alt={word.text}
                        className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                      ></img>
                      <span>{word.text}</span>
                    </span>
                  ))}
                </span>
              </span>

              {/* <h1>Into real projects</h1>
              <h1>that Deliver Results</h1> */}
            </div>
            <p className="text-white-50 md:text-xl relative z-10 pointer-events-none ">
              From shooting to final frame — cinematic visuals designed to
              convert.
            </p>
            <Button
              className="md:w-80 md:h-16 w-60 h-12"
              text="See my work"
              id="button"
            />
          </div>
        </header>

        {/*RIGHT: 3D Model*/}
        <figure>
          <div className="hero-3d-layout">
            {/* <HeroExperience></HeroExperience> */}
          </div>
        </figure>
      </div>
      <AnimatedCounter />
    </section>
  );
};

export default Hero;
