import { useMemo, useState } from "react";

import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";
import VideoWorkCard from "../components/VideoWorkCard";
import { caseStudies, videoCatalogFilters } from "../constants";

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
          title="Client work that shows the visible output"
          description="This catalog focuses on video work already live on YouTube. Each card opens a fuller case study and links to the published cut."
        />

        <div className="mt-8 rounded-xl border border-black-50 bg-black-100/60 p-5 md:flex md:items-center md:justify-between md:gap-6 md:p-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-blue-50">
              For recruiters
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white-50">
              Looking for the broader full-stack story behind the site? I keep
              that technical portfolio separate from the client-facing homepage.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <CTAButton to="/recruiters" variant="secondary" size="sm">
              View Recruiter Portfolio
            </CTAButton>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {videoCatalogFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeFilter === filter.id}
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
        <p className="mt-4 text-sm text-white-50" role="status">
          Showing {filteredStudies.length} {filteredStudies.length === 1 ? "video" : "videos"}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredStudies.map((item) => (
            <VideoWorkCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkPage;
