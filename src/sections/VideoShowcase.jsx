import { useMemo } from "react";

import TitleHeader from "../components/TitleHeader";
import VideoPreviewCard from "../components/VideoPreviewCard";
import { caseStudies } from "../constants";

function VideoShowcase({ mode = "home", compactHeader = false }) {
  const isCatalogMode = mode === "catalog";

  const videos = useMemo(() => {
    const selected = caseStudies
      .filter((item) => item.workKind === "video")
      .sort((a, b) => {
        const featuredGap =
          (a.featuredRank ?? Number.MAX_SAFE_INTEGER) -
          (b.featuredRank ?? Number.MAX_SAFE_INTEGER);

        if (featuredGap !== 0) return featuredGap;
        return a.title.localeCompare(b.title);
      });

    return isCatalogMode ? selected : selected.slice(0, 6);
  }, [isCatalogMode]);

  return (
    <section
      id={isCatalogMode ? "video-catalog" : "video-showcase"}
      className={`section-padding flex-center ${compactHeader ? "pt-8 md:pt-12" : ""}`}
    >
      <div className="w-full h-full md:px-20 px-5">
        <div className="video-showcase-shell">
          <div className="video-showcase-gridline" aria-hidden="true" />
          <div className="video-showcase-header">
            <TitleHeader
              title={
                isCatalogMode ? "Video Catalog" : "Cinematic Reel Showcase"
              }
              sub={isCatalogMode ? "🎞️ Full Library" : "🎬 Featured Edits"}
            />
            <p className="text-white-50 md:text-xl text-center max-w-3xl">
              {isCatalogMode
                ? "Browse the full collection. Each card uses a YouTube thumbnail today and links directly to the published cut."
                : "A curated selection of branded edits with thumbnail previews and full-watch access on YouTube."}
            </p>
          </div>

          <div
            className={
              isCatalogMode
                ? "video-preview-grid video-preview-grid-catalog"
                : "video-preview-grid video-preview-grid-home"
            }
          >
            {videos.map((item) => (
              <VideoPreviewCard key={item.slug} item={item} mode={mode} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VideoShowcase;
