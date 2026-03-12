import { useMemo, useState } from "react";

import CTAButton from "../components/CTAButton";
import SectionTitle from "../components/SectionTitle";
import {
  contactDetails,
  contactFormOptions,
  socialLinks,
} from "../constants";

const initialState = {
  name: "",
  email: "",
  company: "",
  projectType: "mixed-scope",
  message: "",
};

function ContactPage() {
  const [formState, setFormState] = useState(initialState);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const selectedProjectLabel = useMemo(() => {
    const selected = contactFormOptions.find(
      (item) => item.value === formState.projectType,
    );

    return selected?.label ?? "Mixed Scope";
  }, [formState.projectType]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subject = `${selectedProjectLabel} inquiry - ${formState.company || formState.name}`;
    const body = [
      `Name: ${formState.name}`,
      `Email: ${formState.email}`,
      `Business: ${formState.company || "Not provided"}`,
      `Project type: ${selectedProjectLabel}`,
      "",
      "Project details:",
      formState.message,
    ].join("\n");

    const mailto = `mailto:${contactDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;
    setIsSubmitted(true);
  };

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-10 xl:px-20">
        <SectionTitle
          eyebrow="Contact"
          title="Let's build the right digital system for your business."
          description="Tell me what you are trying to improve - content, website, workflow, or a combination - and I will help shape the right scope."
        />

        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_1fr]">
          <form
            id="contact-form"
            onSubmit={handleSubmit}
            className="card-border rounded-xl p-5 md:p-6"
          >
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="company">Business / Brand</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formState.company}
                  onChange={handleChange}
                  autoComplete="organization"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="projectType">Project type</label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formState.projectType}
                  onChange={handleChange}
                  className="w-full rounded-md bg-blue-100 px-4 py-4 text-sm text-white placeholder:text-blue-50 md:text-base"
                >
                  {contactFormOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="message">What are you trying to improve?</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formState.message}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-5 inline-flex items-center justify-center rounded-lg border border-white/70 bg-white px-5 py-3 font-semibold text-black transition-colors duration-300 hover:bg-black-50 hover:text-white"
            >
              Start a Project
            </button>

            {isSubmitted ? (
              <p className="mt-3 text-sm text-white-50">
                If your email app did not open, use the direct links on the right.
              </p>
            ) : null}
          </form>

          <aside className="space-y-5">
            <article className="card-border rounded-xl p-5 md:p-6">
              <h2 className="text-xl font-semibold">Quick actions</h2>
              <p className="mt-3 text-sm text-white-50">
                Choose the fastest path based on where you are in the process.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <CTAButton href={contactDetails.quoteMailto}>Request a Quote</CTAButton>
                <CTAButton href={contactDetails.bookingUrl} variant="secondary">
                  Book a Call
                </CTAButton>
              </div>
            </article>

            <article className="card-border rounded-xl p-5 md:p-6">
              <h2 className="text-xl font-semibold">Project scope types</h2>
              <ul className="mt-4 space-y-2 text-sm text-white-50">
                {contactFormOptions.map((option) => (
                  <li key={option.value}>- {option.label}</li>
                ))}
              </ul>
            </article>

            <article className="card-border rounded-xl p-5 md:p-6">
              <h2 className="text-xl font-semibold">Social links</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-black-50 bg-black-100 px-3 py-2 text-sm text-white-50 transition-colors hover:text-white"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default ContactPage;
