import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

import { videoTypeMeta } from "../constants";
import { getSafeExternalLinkAttributes } from "../lib/safeExternalLink";
import { VIDEO_PLACEHOLDER_SRC } from "../lib/youtube.js";
import CTAButton from "./CTAButton";

function VideoWorkCardMedia({
  item,
  isLinked = true,
  showPreviewLabel = true,
  isNearViewport,
  onNearViewportChange,
}) {
  const mediaRef = useRef(null);
  const videoRef = useRef(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const hasPreviewClip = Boolean(item.media.previewSrc) && !videoFailed;
  const posterSrc = item.media.poster || VIDEO_PLACEHOLDER_SRC;
  const safeLink = isLinked
    ? getSafeExternalLinkAttributes(item.media.youtubeUrl)
    : null;
  const MediaTag = safeLink ? "a" : "div";

  useEffect(() => {
    if (!hasPreviewClip || !mediaRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        onNearViewportChange(entry.isIntersecting);
      },
      {
        rootMargin: "220px 0px",
        threshold: 0.25,
      },
    );

    observer.observe(mediaRef.current);
    return () => observer.disconnect();
  }, [hasPreviewClip, onNearViewportChange]);

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
    <MediaTag
      ref={mediaRef}
      href={safeLink?.href}
      target={safeLink?.target}
      rel={safeLink?.rel}
      aria-label={safeLink ? `Watch on YouTube: ${item.title}` : undefined}
      aria-disabled={safeLink ? undefined : "true"}
      className="video-work-media-shell focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-50/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <div className="video-work-media-frame">
        {hasPreviewClip ? (
          <video
            ref={videoRef}
            className="video-work-media-asset"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={posterSrc}
            onError={() => setVideoFailed(true)}
          >
            <source src={item.media.previewSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={posterSrc}
            alt={item.title}
            className="video-work-media-asset"
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = VIDEO_PLACEHOLDER_SRC;
            }}
          />
        )}
        <div className="video-work-media-overlay" aria-hidden="true" />
        {hasPreviewClip && showPreviewLabel ? (
          <div className="video-work-media-copy">
            <p className="video-work-media-label">Preview Clip</p>
          </div>
        ) : null}
      </div>
    </MediaTag>
  );
}

function VideoWorkCard({
  item,
  variant = "catalog",
  actionButtonClassName = "",
}) {
  const cardRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const isFeatured = variant === "featured";
  const isHomeFeatured = variant === "home";
  const articleClassName = `video-work-card ${
    isFeatured || isHomeFeatured ? "home-featured-card" : ""
  } ${hasEntered ? "is-visible" : ""}`.trim();
  const actionClassName = `min-w-0 justify-center ${
    isFeatured || isHomeFeatured ? "px-5 py-3 md:text-base" : ""
  } ${actionButtonClassName}`.trim();

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      setHasEntered(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.15) return;
        setHasEntered(true);
        observer.unobserve(entry.target);
      },
      {
        rootMargin: "0px",
        threshold: 0.15,
      },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article ref={cardRef} className={articleClassName}>
      <VideoWorkCardMedia
        item={item}
        isLinked={!isFeatured}
        showPreviewLabel={!isFeatured}
        isNearViewport={isNearViewport}
        onNearViewportChange={setIsNearViewport}
      />

      {isFeatured ? (
        <Link
          to={`/work/${item.slug}`}
          className="video-work-details-button"
          aria-label={`Open case study for ${item.title}`}
        >
          <span>Details</span>
          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={2} />
        </Link>
      ) : null}

      {isFeatured ? null : (
        <div className="video-work-card-body">
          <div className="video-work-card-copy">
            <div className="flex flex-wrap items-center gap-2">
              <span className="video-work-card-pill">
                {videoTypeMeta[item.videoType].singularLabel}
              </span>
              {item.series ? (
                <span className="video-work-card-pill video-work-card-pill-secondary">
                  {`${item.series.name} - Part ${item.series.part}`}
                </span>
              ) : null}
            </div>

            <div className="video-work-card-text">
              <h3 className="video-work-card-title">{item.title}</h3>
              <p className="video-work-card-excerpt">{item.excerpt}</p>
            </div>
          </div>

          <div className="video-work-card-actions">
            <CTAButton
              to={`/work/${item.slug}`}
              size="sm"
              className={actionClassName}
            >
              Open Case Study
            </CTAButton>
            <CTAButton
              href={item.media.youtubeUrl}
              variant="secondary"
              size="sm"
              className={actionClassName}
            >
              Watch on YouTube
            </CTAButton>
          </div>
        </div>
      )}
    </article>
  );
}

export default VideoWorkCard;
