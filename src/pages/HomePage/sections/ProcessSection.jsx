import SectionTitle from "../../../components/SectionTitle";
import { processSteps } from "../../../constants";
import { homeIcons } from "../constants";

function ProcessSection() {
  return (
    <section id="process" className="home-section-band border-y border-black-50 py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <SectionTitle
          eyebrow="Process"
          title="A focused build flow from scope to launch"
        />
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((item) => {
            const Icon = homeIcons[item.icon];
            return (
              <article key={item.step} className="card-border rounded-xl p-5">
                <div className="flex items-center gap-3">
                  {Icon && (
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-copper-50/30 bg-copper-50/5 text-copper-50">
                      <Icon size={18} strokeWidth={1.75} />
                    </span>
                  )}
                  <p className="text-sm font-semibold text-blue-50">Step {item.step}</p>
                </div>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-white-50">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
