import {
  CONTACT_API_ERRORS,
  createContactApiPayload,
  createContactFormState,
  validateContactPayload,
} from "../../lib/contactForm";

export async function submitContact({
  formState,
  selectedService,
  prefilledProjectType,
  hasPricingPrefill,
}) {
  const payload = createContactApiPayload(formState, selectedService);
  const validation = validateContactPayload(payload);

  if (!validation.isValid) {
    return {
      status: "validation_error",
      fieldErrors: validation.errors,
      fields: null,
    };
  }

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await response.json().catch(() => null);

    if (response.ok && body?.ok) {
      return {
        status: "success",
        fieldErrors: {},
        fields: createContactFormState(
          hasPricingPrefill ? prefilledProjectType : "mixed-scope",
          selectedService,
        ),
      };
    }

    if (body?.error === CONTACT_API_ERRORS.validation) {
      return {
        status: "validation_error",
        fieldErrors: { message: "Please check the highlighted fields and try again." },
        fields: null,
      };
    }

    if (body?.error === CONTACT_API_ERRORS.rateLimited) {
      return { status: "rate_limited", fieldErrors: {}, fields: null };
    }

    return { status: "send_failed", fieldErrors: {}, fields: null };
  } catch {
    return { status: "send_failed", fieldErrors: {}, fields: null };
  }
}

export const INITIAL_ACTION_STATE = {
  status: "idle",
  fieldErrors: {},
  fields: null,
};
