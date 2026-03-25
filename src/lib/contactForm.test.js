import { describe, expect, it } from "vitest";

import {
  buildContactEmail,
  createContactApiPayload,
  createContactFormState,
  createSelectedServiceMessage,
  getContactProjectTypeLabel,
  resolveProjectType,
  validateContactPayload,
} from "./contactForm";

describe("contact form helpers", () => {
  it("creates a prefilled service message", () => {
    expect(createSelectedServiceMessage("Landing Page Sprint")).toContain(
      "Selected service: Landing Page Sprint",
    );
  });

  it("resolves invalid project types to mixed scope", () => {
    expect(resolveProjectType("unknown")).toBe("mixed-scope");
    expect(resolveProjectType("website")).toBe("website");
  });

  it("creates the default form state with optional service context", () => {
    expect(createContactFormState("website", "Landing Page Sprint")).toEqual({
      name: "",
      email: "",
      company: "",
      projectType: "website",
      message: createSelectedServiceMessage("Landing Page Sprint"),
      website: "",
    });
  });

  it("validates a valid payload", () => {
    const result = validateContactPayload({
      name: "Vlad",
      email: "vlad@example.com",
      company: "Digital Systems Creator",
      projectType: "automation",
      message: "Need a workflow that qualifies leads before I answer manually.",
      service: "Lead flow design",
      website: "",
    });

    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
    expect(result.data.email).toBe("vlad@example.com");
  });

  it("rejects invalid emails and missing project types", () => {
    const result = validateContactPayload({
      name: "V",
      email: "not-an-email",
      projectType: "invalid",
      message: "short",
      website: "",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      projectType: expect.any(String),
      message: expect.any(String),
    });
  });

  it("rejects honeypot submissions and over-limit fields", () => {
    const result = validateContactPayload({
      name: "Valid Name",
      email: "lead@example.com",
      company: "A".repeat(161),
      projectType: "content",
      message: "A".repeat(20),
      service: "B".repeat(161),
      website: "spam.example",
    });

    expect(result.isValid).toBe(false);
    expect(result.errors).toMatchObject({
      company: expect.any(String),
      service: expect.any(String),
      website: expect.any(String),
    });
  });

  it("builds an outbound email with selected pricing service context", () => {
    const email = buildContactEmail({
      name: "Vlad",
      email: "lead@example.com",
      company: "Creator Studio",
      projectType: "website",
      message: "Need a conversion-focused site refresh for local clinics.",
      service: "Website refresh package",
    });

    expect(getContactProjectTypeLabel("website")).toBe("Website");
    expect(email.subject).toBe("Website inquiry - Creator Studio");
    expect(email.text).toContain("Selected service: Website refresh package");
    expect(email.text).toContain("Email: lead@example.com");
    expect(email.html).toContain('href="mailto:lead%40example.com"');
    expect(email.html).toContain(">lead@example.com</a>");
    expect(email.text).toContain("Project details:");
  });

  it("creates the API payload from form state and pricing selection", () => {
    expect(
      createContactApiPayload(
        {
          name: "Vlad",
          email: "lead@example.com",
          company: "",
          projectType: "content",
          message: "Need help with short-form content.",
          website: "",
        },
        "Monthly retainer",
      ),
    ).toEqual({
      name: "Vlad",
      email: "lead@example.com",
      company: "",
      projectType: "content",
      message: "Need help with short-form content.",
      service: "Monthly retainer",
      website: "",
    });
  });
});
