import SectionTitle from "../../../components/SectionTitle";
import { whyWorkWithMe } from "../../../constants";
import { homeIcons } from "../constants";

function WhyWorkSection() {
  return (
    <section id="why-work" className="home-section py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <SectionTitle
          eyebrow="Why Work With Me"
          title="Creative execution meets digital systems thinking"
        />
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {whyWorkWithMe.map((item) => {
            const Icon = homeIcons[item.icon];
            return (
              <article key={item.title} className="card-border rounded-xl p-5">
                {Icon && (
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-copper-50/30 bg-copper-50/5 text-copper-50">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                )}
                <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm text-white-50">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyWorkSection;
