import { useState } from "react";

import ResponsiveImage from "../../../components/ResponsiveImage";
import { VIDEO_PLACEHOLDER_SRC } from "../../../lib/youtube.js";

function CaseStudyHeroMedia({ caseStudy }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const isPortrait = caseStudy.media.orientation === "portrait";
  const hasPreviewClip = Boolean(caseStudy.media.previewSrc) && !videoFailed;
  const posterSrc = caseStudy.media.poster || VIDEO_PLACEHOLDER_SRC;
  const assetClassName = isPortrait
    ? "h-[560px] w-full object-contain md:h-[680px]"
    : "h-[380px] w-full object-cover md:h-[480px]";

  return (
    <div className="relative bg-black">
      <div className={isPortrait ? "mx-auto w-full max-w-[420px]" : "w-full"}>
        {hasPreviewClip ? (
          <video
            className={assetClassName}
            controls
            preload="none"
            poster={posterSrc}
            playsInline
            onError={() => setVideoFailed(true)}
          >
            <source src={caseStudy.media.previewSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <ResponsiveImage
            src={posterSrc}
            alt={caseStudy.media.description}
            className={assetClassName}
            width={isPortrait ? "1080" : "1920"}
            height={isPortrait ? "1920" : "1080"}
            loading="lazy"
            decoding="async"
            sizes={isPortrait ? "(min-width: 768px) 420px, 100vw" : "100vw"}
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = VIDEO_PLACEHOLDER_SRC;
            }}
          />
        )}
      </div>

      <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white-50 backdrop-blur-sm md:left-6 md:top-6">
        {hasPreviewClip
          ? "Preview Clip"
          : caseStudy.media.previewSrc
            ? "Poster Fallback"
            : "Poster"}
      </div>
    </div>
  );
}

export default CaseStudyHeroMedia;
