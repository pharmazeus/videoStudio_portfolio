import { useEffect, useRef, useState } from "react";

import { getSafeExternalLinkAttributes } from "../lib/safeExternalLink";
import { VIDEO_PLACEHOLDER_SRC } from "../lib/youtube.js";
import ResponsiveImage from "./ResponsiveImage";

function VideoPreviewCard({ item, mode = "home" }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const media = item.media ?? item;
  const hasPreviewClip = Boolean(media.previewSrc) && !videoFailed;
  const posterSrc = media.poster || VIDEO_PLACEHOLDER_SRC;
  const isPortrait = media.orientation === "portrait";
  const shouldRenderVideo = hasPreviewClip && isNearViewport;
  const safeLink = getSafeExternalLinkAttributes(media.youtubeUrl);
  const LinkTag = safeLink ? "a" : "div";
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
        {shouldRenderVideo ? (
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
          <ResponsiveImage
            src={posterSrc}
            alt={media.description ?? item.title}
            className={`w-full object-cover ${frameClassName}`}
            width={isPortrait ? "1080" : "1920"}
            height={isPortrait ? "1920" : "1080"}
            loading="lazy"
            decoding="async"
            sizes={mode === "catalog" ? "(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
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

      <LinkTag
        className="video-preview-cta"
        href={safeLink?.href}
        target={safeLink?.target}
        rel={safeLink?.rel}
        aria-label={safeLink ? `Watch full video on YouTube: ${item.title}` : undefined}
        aria-disabled={safeLink ? undefined : "true"}
      >
        <span>Watch Full Video on YouTube</span>
        <img src="/images/arrow-right.svg" alt="" aria-hidden="true" />
      </LinkTag>
    </article>
  );
}

export default VideoPreviewCard;
