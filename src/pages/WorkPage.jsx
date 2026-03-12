import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import SectionTitle from "../components/SectionTitle";
import { caseStudies } from "../constants";

function WorkPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filters = useMemo(
    () => ["All", ...new Set(caseStudies.map((item) => item.category))],
    [],
  );

  const filteredStudies = useMemo(() => {
    if (activeFilter === "All") return caseStudies;
    return caseStudies.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <SectionTitle
          eyebrow="Work"
          title="Selected Work"
          description="A curated set of projects across content, web, and systems - chosen to show how digital execution can improve both presentation and operations."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                activeFilter === filter
                  ? "border-white bg-white text-black"
                  : "border-black-50 bg-black-100 text-white-50 hover:text-white"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredStudies.map((item) => (
            <article key={item.slug} className="card-border flex h-full flex-col rounded-xl">
              <img
                src={item.media.poster}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="h-56 w-full rounded-t-xl object-cover"
              />
              <div className="flex h-full flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-blue-50">
                    {item.category}
                  </p>
                  <p className="text-xs text-white-50">{item.proofLevel}</p>
                </div>
                <h3 className="mt-2 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-white-50">{item.excerpt}</p>
                <ul className="mt-4 space-y-1 text-sm text-white-50">
                  {item.outcomes.slice(0, 2).map((outcome) => (
                    <li key={outcome}>- {outcome}</li>
                  ))}
                </ul>
                <Link
                  to={`/work/${item.slug}`}
                  className="mt-5 inline-flex text-sm font-semibold text-white transition-colors hover:text-blue-50"
                >
                  Open Case Study
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkPage;
