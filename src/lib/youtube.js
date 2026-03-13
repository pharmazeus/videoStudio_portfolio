export const VIDEO_PLACEHOLDER_SRC = "/images/video-placeholder.svg";

export function getYouTubeVideoId(url = "") {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");
    const segments = parsedUrl.pathname.split("/").filter(Boolean);

    if (host === "youtu.be") {
      return segments[0] ?? "";
    }

    if (host.endsWith("youtube.com")) {
      if (segments[0] === "shorts" || segments[0] === "embed") {
        return segments[1] ?? "";
      }

      if (segments[0] === "watch") {
        return parsedUrl.searchParams.get("v") ?? "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

export function getYouTubeThumbnailUrl(value = "") {
  const youtubeId = value.startsWith("http")
    ? getYouTubeVideoId(value)
    : value;

  if (!youtubeId) return VIDEO_PLACEHOLDER_SRC;

  return `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;
}

export function inferYouTubeOrientationFromUrl(url = "") {
  if (!url) return "landscape";

  try {
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace(/^www\./, "");
    const segments = parsedUrl.pathname.split("/").filter(Boolean);

    if (host.endsWith("youtube.com") && segments[0] === "shorts") {
      return "portrait";
    }

    if (host === "youtu.be") {
      return "landscape";
    }
  } catch {
    return "landscape";
  }

  return "landscape";
}
