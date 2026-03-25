import { contactFormOptions } from "./contactConfig.js";

export const CONTACT_API_ERRORS = {
  validation: "validation",
  methodNotAllowed: "method_not_allowed",
  sendFailed: "send_failed",
};

const CONTACT_PROJECT_TYPE_LABELS = new Map(
  contactFormOptions.map((option) => [option.value, option.label]),
);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeString(value) {
  return typeof value === "string" ? value.trim() : "";
}

function hasLengthWithinRange(value, minimum, maximum) {
  return value.length >= minimum && value.length <= maximum;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function getContactProjectTypeLabel(value) {
  return CONTACT_PROJECT_TYPE_LABELS.get(value) ?? "Mixed Scope";
}

export function resolveProjectType(value) {
  return CONTACT_PROJECT_TYPE_LABELS.has(value) ? value : "mixed-scope";
}

export function createSelectedServiceMessage(serviceName) {
  return [
    `Selected service: ${serviceName}`,
    "Primary goal:",
    "Timeline:",
    "Anything already in place:",
  ].join("\n");
}

export function createContactFormState(projectType = "mixed-scope", service = "") {
  return {
    name: "",
    email: "",
    company: "",
    projectType: resolveProjectType(projectType),
    message: service ? createSelectedServiceMessage(service) : "",
    website: "",
  };
}

export function normalizeContactPayload(input = {}) {
  return {
    name: normalizeString(input.name),
    email: normalizeString(input.email).toLowerCase(),
    company: normalizeString(input.company),
    projectType: normalizeString(input.projectType),
    message: normalizeString(input.message),
    service: normalizeString(input.service),
    website: normalizeString(input.website),
  };
}

export function validateContactPayload(input = {}) {
  const data = normalizeContactPayload(input);
  const errors = {};

  if (!hasLengthWithinRange(data.name, 2, 120)) {
    errors.name = "Name must be between 2 and 120 characters.";
  }

  if (
    !hasLengthWithinRange(data.email, 3, 160) ||
    !EMAIL_PATTERN.test(data.email)
  ) {
    errors.email = "Enter a valid email address.";
  }

  if (data.company && !hasLengthWithinRange(data.company, 1, 160)) {
    errors.company = "Business / Brand must be 160 characters or fewer.";
  }

  if (!CONTACT_PROJECT_TYPE_LABELS.has(data.projectType)) {
    errors.projectType = "Choose a valid project type.";
  }

  if (!hasLengthWithinRange(data.message, 10, 4000)) {
    errors.message = "Project details must be between 10 and 4000 characters.";
  }

  if (data.service && !hasLengthWithinRange(data.service, 1, 160)) {
    errors.service = "Selected service must be 160 characters or fewer.";
  }

  if (data.website) {
    errors.website = "Spam detection triggered.";
  }

  return {
    data,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

export function buildContactEmail(payload) {
  const projectTypeLabel = getContactProjectTypeLabel(payload.projectType);
  const subject = `${projectTypeLabel} inquiry - ${payload.company || payload.name}`;
  const text = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Business: ${payload.company || "Not provided"}`,
    `Project type: ${projectTypeLabel}`,
    ...(payload.service ? [`Selected service: ${payload.service}`] : []),
    "",
    "Project details:",
    payload.message,
  ].join("\n");
  const safeName = escapeHtml(payload.name);
  const safeEmail = escapeHtml(payload.email);
  const safeEmailHref = encodeURIComponent(payload.email);
  const safeCompany = escapeHtml(payload.company || "Not provided");
  const safeProjectTypeLabel = escapeHtml(projectTypeLabel);
  const safeService = payload.service ? escapeHtml(payload.service) : "";
  const safeMessage = escapeHtml(payload.message).replaceAll("\n", "<br />");
  const html = [
    "<div style=\"font-family: Mona Sans, Arial, sans-serif; color: #f5f7fa; background: #0e0e10; padding: 24px;\">",
    "<div style=\"max-width: 720px; margin: 0 auto; border: 1px solid rgba(255,255,255,0.08); border-radius: 18px; padding: 24px; background: #141418;\">",
    `<p style="margin: 0 0 12px; color: #d4865d; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase;">New contact request</p>`,
    `<p style="margin: 0 0 10px;"><strong>Name:</strong> ${safeName}</p>`,
    `<p style="margin: 0 0 10px;"><strong>Email:</strong> <a href="mailto:${safeEmailHref}" style="color: #d9ecff;">${safeEmail}</a></p>`,
    `<p style="margin: 0 0 10px;"><strong>Business:</strong> ${safeCompany}</p>`,
    `<p style="margin: 0 0 10px;"><strong>Project type:</strong> ${safeProjectTypeLabel}</p>`,
    ...(safeService
      ? [
          `<p style="margin: 0 0 10px;"><strong>Selected service:</strong> ${safeService}</p>`,
        ]
      : []),
    "<div style=\"margin-top: 18px; padding-top: 18px; border-top: 1px solid rgba(255,255,255,0.08);\">",
    "<p style=\"margin: 0 0 10px;\"><strong>Project details:</strong></p>",
    `<p style="margin: 0; line-height: 1.7; color: #d9ecff;">${safeMessage}</p>`,
    "</div>",
    "</div>",
    "</div>",
  ].join("");

  return {
    projectTypeLabel,
    subject,
    text,
    html,
  };
}

export function createContactApiPayload(formState, selectedService = "") {
  return {
    name: formState.name,
    email: formState.email,
    company: formState.company,
    projectType: formState.projectType,
    message: formState.message,
    service: selectedService,
    website: formState.website,
  };
}
