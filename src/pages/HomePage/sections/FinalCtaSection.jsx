import CTAButton from "../../../components/CTAButton";

function FinalCtaSection() {
  return (
    <section id="final-cta" className="home-section-band border-t border-black-50 py-14 md:py-20">
      <div className="mx-auto w-full max-w-[960px] px-5 text-center md:px-10">
        <h2 className="section-heading">
          Let's build the right digital system for your business.
        </h2>
        <p className="section-description mx-auto mt-4 max-w-2xl">
          Start with one priority or a mixed scope. The goal is practical execution that improves how your brand presents, launches, and operates.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <CTAButton to="/contact">Start a Project</CTAButton>
          <CTAButton to="/contact" variant="secondary">
            Request a Quote
          </CTAButton>
          <CTAButton to="/contact" variant="ghost">
            Book a Call
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

export default FinalCtaSection;
