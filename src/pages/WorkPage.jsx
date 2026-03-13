import { useEffect, useMemo, useRef, useState } from "react";

import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";
import {
  caseStudies,
  videoCatalogFilters,
  videoTypeMeta,
} from "../constants";
import { VIDEO_PLACEHOLDER_SRC } from "../lib/youtube.js";

function WorkCardMedia({ item }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const hasPreviewClip = Boolean(item.media.previewSrc) && !videoFailed;
  const posterSrc = item.media.poster || VIDEO_PLACEHOLDER_SRC;

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
    <a
      ref={cardRef}
      href={item.media.youtubeUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch on YouTube: ${item.title}`}
      className="video-work-media-shell block cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-50/80 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
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
        {hasPreviewClip ? (
          <div className="video-work-media-copy">
            <p className="video-work-media-label">Preview Clip</p>
          </div>
        ) : null}
      </div>
    </a>
  );
}

function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const videoStudies = useMemo(
    () => caseStudies.filter((item) => item.workKind === "video"),
    [],
  );

  const filteredStudies = useMemo(() => {
    if (activeFilter === "all") return videoStudies;

    return videoStudies.filter((item) => item.videoType === activeFilter);
  }, [activeFilter, videoStudies]);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <SectionTitle
          eyebrow="Video Work"
          title="A working catalog of ads, tutorials, and showcase edits"
          description="This first release focuses on video work already live on YouTube. Each card opens a fuller case study and links to the published cut."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {videoCatalogFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                activeFilter === filter.id
                  ? "border-white bg-white text-black"
                  : "border-black-50 bg-black-100 text-white-50 hover:text-white"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredStudies.map((item) => (
            <article key={item.slug} className="video-work-card card-border">
              <WorkCardMedia item={item} />

              <div className="video-work-card-body">
                <div className="video-work-card-copy">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-white/10 bg-black px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-blue-50">
                      {videoTypeMeta[item.videoType].singularLabel}
                    </span>
                    {item.series ? (
                      <span className="rounded-full border border-white/10 bg-black px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white-50">
                        {`${item.series.name} - Part ${item.series.part}`}
                      </span>
                    ) : null}
                  </div>

                  <div className="video-work-card-text">
                    <h3 className="video-work-card-title">
                      {item.title}
                    </h3>
                    <p className="video-work-card-excerpt">
                      {item.excerpt}
                    </p>
                  </div>
                </div>

                <div className="video-work-card-actions">
                  <CTAButton
                    to={`/work/${item.slug}`}
                    size="sm"
                    className="min-w-0 justify-center"
                  >
                    Open Case Study
                  </CTAButton>
                  <CTAButton
                    href={item.media.youtubeUrl}
                    variant="secondary"
                    size="sm"
                    className="min-w-0 justify-center"
                  >
                    Watch on YouTube
                  </CTAButton>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkPage;
