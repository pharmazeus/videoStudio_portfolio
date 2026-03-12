import { Link, Navigate, useParams } from "react-router-dom";

import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";
import { caseStudies } from "../constants";

function CaseStudyPage() {
  const { slug } = useParams();
  const caseStudy = caseStudies.find((item) => item.slug === slug);

  if (!caseStudy) {
    return <Navigate to="/work" replace />;
  }

  const related = caseStudies
    .filter(
      (item) =>
        item.slug !== caseStudy.slug && item.category === caseStudy.category,
    )
    .slice(0, 2);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <Link to="/work" className="text-sm text-white-50 transition-colors hover:text-white">
          Back to Work
        </Link>

        <div className="mt-6 rounded-2xl border border-black-50 bg-black-100/70 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.16em] text-blue-50">
            {caseStudy.category} - {caseStudy.proofLevel}
          </p>
          <h1 className="mt-3 text-3xl font-semibold leading-tight md:text-5xl">
            {caseStudy.title}
          </h1>
          <p className="mt-4 max-w-3xl text-white-50 md:text-lg">
            {caseStudy.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <CTAButton to="/contact">Start a Project</CTAButton>
            <CTAButton href={caseStudy.media.youtubeUrl} variant="secondary">
              Watch Preview on YouTube
            </CTAButton>
          </div>
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

        <div className="mt-6 overflow-hidden rounded-xl border border-black-50 bg-black-100">
          <video
            className="h-[380px] w-full object-cover"
            controls
            preload="none"
            poster={caseStudy.media.poster}
            playsInline
          >
            <source src={caseStudy.media.previewSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
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
            <SectionTitle
              eyebrow="Related"
              title={`More ${caseStudy.category} projects`}
            />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
              {related.map((item) => (
                <article key={item.slug} className="card-border rounded-xl p-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-blue-50">
                    {item.category}
                  </p>
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
