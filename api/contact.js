import {
  CONTACT_API_ERRORS,
  buildContactEmail,
  validateContactPayload,
} from "../src/lib/contactForm";

function sendJson(res, statusCode, payload) {
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
  { env = globalThis.process?.env ?? {}, fetchImpl = fetch } = {},
) {
  if (req.method !== "POST") {
    return sendJson(res, 405, {
      ok: false,
      error: CONTACT_API_ERRORS.methodNotAllowed,
    });
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
    console.error("Contact form send failed: missing Resend environment config.");

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
    console.error("Contact form send failed.", error);

    return sendJson(res, 500, {
      ok: false,
      error: CONTACT_API_ERRORS.sendFailed,
    });
  }
}

export default async function handler(req, res) {
  return handleContactRequest(req, res);
}
