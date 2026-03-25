const ALLOWED_HTTPS_HOSTS = [
  "youtube.com",
  "youtu.be",
  "instagram.com",
  "linkedin.com",
  "t.me",
  "telegram.me",
];

const ALLOWED_MAILTO_RECIPIENTS = new Set([
  "vladmaidanskyi46@gmail.com",
]);

const ALLOWED_MAILTO_PARAMS = new Set(["subject", "body", "cc", "bcc"]);

function isAllowedHttpsHost(hostname = "") {
  const normalizedHost = hostname.toLowerCase().replace(/\.$/, "");

  return ALLOWED_HTTPS_HOSTS.some(
    (allowedHost) =>
      normalizedHost === allowedHost ||
      normalizedHost.endsWith(`.${allowedHost}`),
  );
}

function isAllowedMailtoHref(parsedUrl) {
  const recipients = parsedUrl.pathname
    .split(",")
    .map((recipient) => decodeURIComponent(recipient).trim().toLowerCase())
    .filter(Boolean);

  if (
    recipients.length === 0 ||
    recipients.some((recipient) => !ALLOWED_MAILTO_RECIPIENTS.has(recipient))
  ) {
    return false;
  }

  const params = Array.from(parsedUrl.searchParams.keys());

  return params.every((key) => ALLOWED_MAILTO_PARAMS.has(key));
}

export function getSafeExternalHref(value = "") {
  if (typeof value !== "string") return null;

  const trimmedValue = value.trim();

  if (!trimmedValue || /[\r\n]/.test(trimmedValue)) {
    return null;
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(trimmedValue);
  } catch {
    return null;
  }

  if (parsedUrl.protocol === "https:" && isAllowedHttpsHost(parsedUrl.hostname)) {
    return parsedUrl.toString();
  }

  if (parsedUrl.protocol === "mailto:" && isAllowedMailtoHref(parsedUrl)) {
    return trimmedValue;
  }

  return null;
}

export function getSafeExternalLinkAttributes(value = "") {
  const safeHref = getSafeExternalHref(value);

  if (!safeHref) {
    return null;
  }

  return safeHref.startsWith("https://")
    ? {
        href: safeHref,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {
        href: safeHref,
        target: undefined,
        rel: undefined,
      };
}
