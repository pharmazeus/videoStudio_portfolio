import { useEffect, useRef, useState } from "react";

import { VIDEO_PLACEHOLDER_SRC } from "../lib/youtube.js";

function VideoPreviewCard({ item, mode = "home" }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const media = item.media ?? item;
  const hasPreviewClip = Boolean(media.previewSrc) && !videoFailed;
  const posterSrc = media.poster || VIDEO_PLACEHOLDER_SRC;
  const isPortrait = media.orientation === "portrait";
  const frameClassName =
    mode === "catalog"
      ? isPortrait
        ? "aspect-[4/5] md:aspect-[3/4] xl:aspect-[4/5]"
        : "aspect-video"
      : "h-56 md:h-52 xl:h-56";
  useEffect(() => {
    if (!hasPreviewClip || !cardRef.current) return;

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
  }, [hasPreviewClip]);

  useEffect(() => {
    if (!hasPreviewClip) return;

    const video = videoRef.current;
    if (!video) return;

    if (!isNearViewport) {
      video.pause();
      return;
    }

    const playPromise = video.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  }, [hasPreviewClip, isNearViewport]);

  return (
    <article
      ref={cardRef}
      className={`video-preview-card ${mode === "catalog" ? "video-preview-card-catalog" : ""}`}
    >
      <div className="video-preview-frame">
        {hasPreviewClip ? (
          <video
            ref={videoRef}
            className={`w-full object-cover ${frameClassName}`}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={posterSrc}
            onError={() => setVideoFailed(true)}
          >
            <source src={media.previewSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={posterSrc}
            alt={media.description ?? item.title}
            className={`w-full object-cover ${frameClassName}`}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = VIDEO_PLACEHOLDER_SRC;
            }}
          />
        )}
      </div>

      <div className="video-preview-copy">
        <h3>{item.title}</h3>
        {(item.excerpt ?? item.details) && <p>{item.excerpt ?? item.details}</p>}
      </div>

      <a
        className="video-preview-cta"
        href={media.youtubeUrl}
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
