import { Readable } from "node:stream";

import { beforeEach, describe, expect, it, vi } from "vitest";

import { __resetRateLimit, handleContactRequest } from "./contact";

function createMockResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    end(value) {
      this.body = value;
    },
  };
}

const validBody = {
  name: "Vlad Maidanskyi",
  email: "lead@example.com",
  company: "Digital Systems Creator",
  projectType: "mixed-scope",
  message: "Need a system that connects content, the site, and a lead workflow.",
  service: "Mixed scope sprint",
  website: "",
};

describe("api/contact", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    __resetRateLimit();
  });

  it("returns 405 for non-POST requests", async () => {
    const res = createMockResponse();

    await handleContactRequest({ method: "GET" }, res);

    expect(res.statusCode).toBe(405);
    expect(JSON.parse(res.body)).toEqual({
      ok: false,
      error: "method_not_allowed",
    });
  });

  it("returns 400 for invalid payloads", async () => {
    const res = createMockResponse();

    await handleContactRequest(
      {
        method: "POST",
        body: { ...validBody, email: "bad-email" },
      },
      res,
    );

    expect(res.statusCode).toBe(400);
    expect(JSON.parse(res.body)).toEqual({
      ok: false,
      error: "validation",
    });
  });

  it("returns 500 when required env vars are missing", async () => {
    const res = createMockResponse();

    await handleContactRequest(
      {
        method: "POST",
        body: validBody,
      },
      res,
      {
        env: {},
      },
    );

    expect(res.statusCode).toBe(500);
    expect(JSON.parse(res.body)).toEqual({
      ok: false,
      error: "send_failed",
    });
  });

  it("returns 500 when Resend send fails", async () => {
    const res = createMockResponse();
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: vi.fn().mockResolvedValue("Unauthorized"),
    });

    await handleContactRequest(
      {
        method: "POST",
        body: validBody,
      },
      res,
      {
        env: {
          RESEND_API_KEY: "re_test",
          CONTACT_FROM_EMAIL: "contact@digital-systems-creator.com",
          CONTACT_TO_EMAIL: "vladmaidanskyi46@gmail.com",
        },
        fetchImpl,
      },
    );

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toBe(500);
    expect(JSON.parse(res.body)).toEqual({
      ok: false,
      error: "send_failed",
    });
  });

  it("returns 200 when the message is sent successfully", async () => {
    const res = createMockResponse();
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ id: "email_123" }),
    });

    await handleContactRequest(
      {
        method: "POST",
        body: JSON.stringify(validBody),
      },
      res,
      {
        env: {
          RESEND_API_KEY: "re_test",
          CONTACT_FROM_EMAIL: "contact@digital-systems-creator.com",
          CONTACT_TO_EMAIL: "vladmaidanskyi46@gmail.com",
        },
        fetchImpl,
      },
    );

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(fetchImpl).toHaveBeenCalledWith(
      "https://api.resend.com/emails",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: "Bearer re_test",
        }),
        body: expect.any(String),
      }),
    );
    const resendPayload = JSON.parse(fetchImpl.mock.calls[0][1].body);
    expect(resendPayload.from).toBe("contact@digital-systems-creator.com");
    expect(resendPayload.to).toEqual(["vladmaidanskyi46@gmail.com"]);
    expect(resendPayload.reply_to).toBe("lead@example.com");
    expect(resendPayload).not.toHaveProperty("replyTo");
    expect(resendPayload.html).toContain('href="mailto:lead%40example.com"');
    expect(resendPayload.text).toContain("Email: lead@example.com");
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual({ ok: true });
  });

  it("accepts raw request streams for local dev middleware", async () => {
    const res = createMockResponse();
    const streamRequest = Readable.from([JSON.stringify(validBody)]);
    streamRequest.method = "POST";
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ id: "email_456" }),
    });

    await handleContactRequest(streamRequest, res, {
      env: {
        RESEND_API_KEY: "re_test",
        CONTACT_FROM_EMAIL: "contact@digital-systems-creator.com",
        CONTACT_TO_EMAIL: "vladmaidanskyi46@gmail.com",
      },
      fetchImpl,
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual({ ok: true });
  });
});
