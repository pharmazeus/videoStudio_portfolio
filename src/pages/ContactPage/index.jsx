import { useSearchParams } from "react-router-dom";

import SectionTitle from "../../components/SectionTitle";
import { resolveProjectType } from "../../lib/contactForm";
import ContactForm from "./ContactForm";
import ContactSidebar from "./ContactSidebar";

function ContactPage() {
  const [searchParams] = useSearchParams();

  const projectTypeParam = searchParams.get("projectType");
  const selectedService = searchParams.get("service")?.trim() ?? "";
  const hasPricingPrefill = Boolean(projectTypeParam || selectedService);
  const prefilledProjectType = resolveProjectType(projectTypeParam);
  const formKey = `${prefilledProjectType}:${selectedService}`;

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <SectionTitle
          eyebrow="Contact"
          title="Let's build the right digital system for your business."
          description="Tell me what you are trying to improve - content, website, workflow, or a combination - and I will help shape the right scope."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_1fr]">
          <ContactForm
            key={formKey}
            prefilledProjectType={prefilledProjectType}
            selectedService={selectedService}
            hasPricingPrefill={hasPricingPrefill}
          />
          <ContactSidebar />
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
