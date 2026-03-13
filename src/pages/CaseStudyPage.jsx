import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";
import { caseStudies, getCaseStudyBySlug, videoTypeMeta } from "../constants";
import { VIDEO_PLACEHOLDER_SRC } from "../lib/youtube.js";

function getRelatedCaseStudies(caseStudy) {
  const videoStudies = caseStudies.filter(
    (item) => item.workKind === "video" && item.slug !== caseStudy.slug,
  );

  const sameSeries = caseStudy.series
    ? videoStudies
        .filter((item) => item.series?.name === caseStudy.series.name)
        .sort((a, b) => (a.series?.part ?? 99) - (b.series?.part ?? 99))
    : [];

  const sameType = videoStudies
    .filter(
      (item) =>
        item.videoType === caseStudy.videoType &&
        item.series?.name !== caseStudy.series?.name,
    )
    .sort((a, b) => {
      const featuredGap =
        (a.featuredRank ?? Number.MAX_SAFE_INTEGER) -
        (b.featuredRank ?? Number.MAX_SAFE_INTEGER);

      if (featuredGap !== 0) return featuredGap;
      return a.title.localeCompare(b.title);
    });

  return [...sameSeries, ...sameType]
    .filter(
      (item, index, collection) =>
        collection.findIndex((candidate) => candidate.slug === item.slug) ===
        index,
    )
    .slice(0, 3);
}

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
          <img
            src={posterSrc}
            alt={caseStudy.media.description}
            className={assetClassName}
            loading="lazy"
            decoding="async"
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

function CaseStudyPage() {
  const { slug } = useParams();
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return <Navigate to="/work" replace />;
  }

  const related = getRelatedCaseStudies(caseStudy);
  const relatedTitle = caseStudy.series
    ? `More from ${caseStudy.series.name}`
    : `More ${videoTypeMeta[caseStudy.videoType].label.toLowerCase()}`;

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <Link
          to="/work"
          className="inline-flex items-center rounded-lg border border-white/70 bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-black-50 hover:text-white"
        >
          Back to Work
        </Link>

        <div className="mt-6 rounded-2xl border border-black-50 bg-black-100/70 p-6 md:p-8">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-black px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em] text-blue-50">
              {videoTypeMeta[caseStudy.videoType].singularLabel}
            </span>
            {caseStudy.series ? (
              <span className="rounded-full border border-white/10 bg-black px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white-50">
                {`${caseStudy.series.name} - Part ${caseStudy.series.part} of ${caseStudy.series.total}`}
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
            {caseStudy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-white-50 md:text-lg">
            {caseStudy.excerpt}
          </p>

          {caseStudy.proofNote ? (
            <p className="mt-4 text-sm font-medium text-blue-50">
              {caseStudy.proofNote}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <CTAButton to="/contact">Start a Project</CTAButton>
            <CTAButton href={caseStudy.media.youtubeUrl} variant="secondary">
              Watch on YouTube
            </CTAButton>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-black-50 bg-black-100">
          <CaseStudyHeroMedia caseStudy={caseStudy} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <article className="card-border rounded-xl p-5 md:p-6">
            <h2 className="text-2xl font-semibold">Challenge</h2>
            <p className="mt-3 text-white-50">{caseStudy.challenge}</p>
          </article>

          <article className="card-border rounded-xl p-5 md:p-6">
            <h2 className="text-2xl font-semibold">Solution</h2>
            <p className="mt-3 text-white-50">{caseStudy.solution}</p>
          </article>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <article className="card-border rounded-xl p-5 md:p-6">
            <h2 className="text-2xl font-semibold">Deliverables</h2>
            <ul className="mt-4 space-y-2 text-white-50">
              {caseStudy.deliverables.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>

          <article className="card-border rounded-xl p-5 md:p-6">
            <h2 className="text-2xl font-semibold">Outcomes</h2>
            <ul className="mt-4 space-y-2 text-white-50">
              {caseStudy.outcomes.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          </article>
        </div>

        {related.length > 0 ? (
          <div className="mt-12">
            <SectionTitle eyebrow="Related" title={relatedTitle} />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <article key={item.slug} className="card-border rounded-xl p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs uppercase tracking-[0.14em] text-blue-50">
                      {videoTypeMeta[item.videoType].singularLabel}
                    </p>
                    {item.series ? (
                      <p className="text-xs uppercase tracking-[0.14em] text-white-50">
                        {`Part ${item.series.part}`}
                      </p>
                    ) : null}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 text-sm text-white-50">{item.excerpt}</p>
                  <Link
                    to={`/work/${item.slug}`}
                    className="mt-4 inline-flex text-sm font-semibold text-white transition-colors hover:text-blue-50"
                  >
                    View Case Study
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default CaseStudyPage;
