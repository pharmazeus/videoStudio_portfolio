import { useMemo } from "react";

import SectionTitle from "../../../components/SectionTitle";
import { services } from "../../../constants";
import ServiceCard from "../components/ServiceCard";
import { homeServiceOrder } from "../constants";

function ServicesOverviewSection() {
  const homeServices = useMemo(() => {
    const servicesBySlug = new Map(services.map((item) => [item.slug, item]));
    return homeServiceOrder
      .map((slug) => servicesBySlug.get(slug))
      .filter(Boolean);
  }, []);

  return (
    <section id="services-overview" className="home-section-band border-b border-black-50 py-14 md:py-20">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <SectionTitle
          eyebrow="Services"
          title="Video, brand content, and web/app builds working together"
          description="I help businesses capture attention, turn footage into useful assets, keep the brand active, and build the place where clients take action."
        />

        <div className="home-service-grid">
          {homeServices.map((item, index) => (
            <ServiceCard key={item.slug} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesOverviewSection;
