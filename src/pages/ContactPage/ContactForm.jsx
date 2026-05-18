import { useActionState, useEffect, useState } from "react";

import { contactFormOptions } from "../../constants";
import { createContactFormState } from "../../lib/contactForm";
import Field from "./Field";
import { STATUS_MAP } from "./statusMap";
import SuccessToast from "./SuccessToast";
import { INITIAL_ACTION_STATE, submitContact } from "./submitContactAction";

const SUCCESS_TOAST_MESSAGE = "Sent — I'll reply soon.";

function ContactForm({ prefilledProjectType, selectedService, hasPricingPrefill }) {
  const [formState, setFormState] = useState(() =>
    createContactFormState(prefilledProjectType, selectedService),
  );
  const [fieldErrors, setFieldErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const [result, formAction, isPending] = useActionState(
    submitContact,
    INITIAL_ACTION_STATE,
  );

  useEffect(() => {
    if (result.status === "success" && result.fields) {
      setFormState(result.fields);
      setFieldErrors({});
      setShowToast(true);
      return;
    }
    if (result.status === "validation_error") {
      setFieldErrors(result.fieldErrors);
    }
  }, [result]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((s) => ({ ...s, [name]: value }));
    setFieldErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isPending) return;
    formAction({
      formState,
      selectedService,
      prefilledProjectType,
      hasPricingPrefill,
    });
  };

  const inlineStatus =
    result.status !== "success" ? STATUS_MAP[result.status] : null;

  return (
    <form
      id="contact-form"
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#121214]/60 p-6 backdrop-blur-xl shadow-[0_24px_56px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.08)] md:p-8"
    >
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_10%_10%,_rgba(212,134,93,0.12)_0%,_transparent_50%)]" />
      {selectedService ? (
        <div className="mb-5 rounded-xl border border-white/12 bg-white/[0.04] p-4 shadow-[0_18px_40px_rgba(0,0,0,0.16)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-copper-50">
            Selected from Pricing
          </p>
          <p className="mt-2 text-base font-semibold text-white md:text-lg">
            {selectedService}
          </p>
          <p className="mt-2 text-sm leading-6 text-white-50">
            The form is prefilled so you can keep moving without repeating the
            service you selected.
          </p>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Field
          name="name"
          label="Name"
          value={formState.name}
          onChange={handleChange}
          error={fieldErrors.name}
          required
          autoComplete="name"
          className=""
        />
        <Field
          name="email"
          label="Email"
          type="email"
          value={formState.email}
          onChange={handleChange}
          error={fieldErrors.email}
          required
          autoComplete="email"
          className=""
        />
        <Field
          name="company"
          label="Business / Brand"
          value={formState.company}
          onChange={handleChange}
          error={fieldErrors.company}
          autoComplete="organization"
        />
        <Field
          name="website"
          label="Website"
          value={formState.website}
          onChange={handleChange}
          hidden
        />
        <Field
          as="select"
          name="projectType"
          label="Project type"
          value={formState.projectType}
          onChange={handleChange}
          error={fieldErrors.projectType}
          required
        >
          {contactFormOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Field>
        <Field
          as="textarea"
          name="message"
          label="What are you trying to improve?"
          value={formState.message}
          onChange={handleChange}
          error={
            fieldErrors.message
              ? "Add at least 10 characters about what you want to improve."
              : undefined
          }
          required
          rows={6}
        />
      </div>

      <div className="relative mt-5">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-lg border border-white/70 bg-white px-5 py-3 font-semibold text-black transition-colors duration-300 hover:bg-black-50 hover:text-white disabled:cursor-wait disabled:opacity-75"
        >
          {isPending ? "Sending..." : "Start a Project"}
        </button>

        <SuccessToast
          show={showToast}
          message={SUCCESS_TOAST_MESSAGE}
          onDismiss={() => setShowToast(false)}
        />
      </div>

      {inlineStatus ? (
        <p
          className={`mt-4 rounded-xl border px-4 py-3 text-sm leading-6 ${inlineStatus.tone}`}
          role="status"
        >
          {inlineStatus.message}
        </p>
      ) : null}
    </form>
  );
}

export default ContactForm;
