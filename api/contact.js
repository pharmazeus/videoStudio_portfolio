import {
  CONTACT_API_ERRORS,
  buildContactEmail,
  validateContactPayload,
} from "../src/lib/contactForm.js";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const rateLimitBuckets = new Map();

function getClientIp(req) {
  const forwarded = req.headers?.["x-forwarded-for"];

  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }

  const realIp = req.headers?.["x-real-ip"];

  if (typeof realIp === "string" && realIp.length > 0) {
    return realIp;
  }

  return req.socket?.remoteAddress ?? "unknown";
}

export function checkRateLimit(ip, now = Date.now()) {
  const bucket = rateLimitBuckets.get(ip);

  if (!bucket || now >= bucket.resetAt) {
    rateLimitBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

function sendJson(res, statusCode, payload, extraHeaders) {
  if (extraHeaders && typeof res.setHeader === "function") {
    for (const [key, value] of Object.entries(extraHeaders)) {
      res.setHeader(key, value);
    }
  }

  if (typeof res.status === "function") {
    return res.status(statusCode).json(payload);
  }

  if (typeof res.setHeader === "function") {
    res.setHeader("Content-Type", "application/json");
  }

  res.statusCode = statusCode;
  const body = JSON.stringify(payload);

  if (typeof res.end === "function") {
    res.end(body);
  }

  return payload;
}

function parseRequestBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }

  if (typeof body === "object") {
    return body;
  }

  return {};
}

async function getRequestBody(req) {
  if (typeof req.body !== "undefined") {
    return parseRequestBody(req.body);
  }

  if (typeof req[Symbol.asyncIterator] === "function") {
    let rawBody = "";

    for await (const chunk of req) {
      rawBody += chunk.toString();
    }

    return parseRequestBody(rawBody);
  }

  return {};
}

export async function sendContactEmail(
  { apiKey, from, to, replyTo, subject, text, html },
  fetchImpl = fetch,
) {
  const response = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      text,
      html,
      reply_to: replyTo,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");

    throw new Error(
      `Resend send failed with status ${response.status}${errorText ? `: ${errorText}` : ""}`,
    );
  }

  const data = await response.json().catch(() => null);

  if (!data?.id) {
    throw new Error("Resend send failed: missing message id.");
  }

  return data;
}

export async function handleContactRequest(
  req,
  res,
  { env = globalThis.process?.env ?? {}, fetchImpl = fetch, now = Date.now() } = {},
) {
  if (req.method !== "POST") {
    return sendJson(res, 405, {
      ok: false,
      error: CONTACT_API_ERRORS.methodNotAllowed,
    });
  }

  const rate = checkRateLimit(getClientIp(req), now);

  if (!rate.allowed) {
    return sendJson(
      res,
      429,
      { ok: false, error: CONTACT_API_ERRORS.rateLimited },
      { "Retry-After": String(rate.retryAfterSeconds) },
    );
  }

  const validation = validateContactPayload(await getRequestBody(req));

  if (!validation.isValid) {
    return sendJson(res, 400, {
      ok: false,
      error: CONTACT_API_ERRORS.validation,
    });
  }

  const { RESEND_API_KEY, CONTACT_FROM_EMAIL, CONTACT_TO_EMAIL } = env;

  if (!RESEND_API_KEY || !CONTACT_FROM_EMAIL || !CONTACT_TO_EMAIL) {
    console.error("Contact form send failed: missing Resend environment config.", {
      hasApiKey: Boolean(RESEND_API_KEY),
      hasFromEmail: Boolean(CONTACT_FROM_EMAIL),
      hasToEmail: Boolean(CONTACT_TO_EMAIL),
    });

    return sendJson(res, 500, {
      ok: false,
      error: CONTACT_API_ERRORS.sendFailed,
    });
  }

  const email = buildContactEmail(validation.data);

  try {
    await sendContactEmail(
      {
        apiKey: RESEND_API_KEY,
        from: CONTACT_FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        replyTo: validation.data.email,
        subject: email.subject,
        text: email.text,
        html: email.html,
      },
      fetchImpl,
    );

    return sendJson(res, 200, { ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error?.message ?? "unknown error");

    return sendJson(res, 500, {
      ok: false,
      error: CONTACT_API_ERRORS.sendFailed,
    });
  }
}

export default async function handler(req, res) {
  return handleContactRequest(req, res);
}
