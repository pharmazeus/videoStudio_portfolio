import { useEffect, useRef, useState } from "react";

function VideoPreviewCard({ item, mode = "home" }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewportMode = () => setIsMobile(mediaQuery.matches);
    syncViewportMode();

    mediaQuery.addEventListener("change", syncViewportMode);
    return () => mediaQuery.removeEventListener("change", syncViewportMode);
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      {
        rootMargin: "220px 0px",
        threshold: 0.25,
      },
    );

    observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isMobile || !isNearViewport) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }, [isNearViewport, isMobile]);

  return (
    <article
      ref={cardRef}
      className={`video-preview-card ${mode === "catalog" ? "video-preview-card-catalog" : ""}`}
    >
      <div className="video-preview-frame">
        <video
          ref={videoRef}
          className={`w-full object-cover ${mode === "catalog" ? "h-52 md:h-48 xl:h-44" : "h-56 md:h-52 xl:h-56"}`}
          controls
          muted
          loop
          playsInline
          preload="none"
          poster={item.poster}
        >
          <source src={item.previewSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="video-preview-copy">
        <h3>{item.title}</h3>
        {item.details && <p>{item.details}</p>}
      </div>

      <a
        className="video-preview-cta"
        href={item.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch full video on YouTube: ${item.title}`}
      >
        <span>Watch Full Video on YouTube</span>
        <img src="/images/arrow-right.svg" alt="" aria-hidden="true" />
      </a>
    </article>
  );
}

export default VideoPreviewCard;
