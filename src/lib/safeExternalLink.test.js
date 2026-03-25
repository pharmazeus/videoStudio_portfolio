import { describe, expect, it } from "vitest";

import {
  getSafeExternalHref,
  getSafeExternalLinkAttributes,
} from "./safeExternalLink";

describe("getSafeExternalHref", () => {
  it("accepts allowed https hosts", () => {
    expect(
      getSafeExternalHref("https://www.youtube.com/watch?v=abc123"),
    ).toBe("https://www.youtube.com/watch?v=abc123");
    expect(
      getSafeExternalHref("https://www.instagram.com/pharma.zeus"),
    ).toBe("https://www.instagram.com/pharma.zeus");
  });

  it("accepts approved mailto links", () => {
    expect(
      getSafeExternalHref(
        "mailto:vladmaidanskyi46@gmail.com?subject=Request%20a%20Quote",
      ),
    ).toBe(
      "mailto:vladmaidanskyi46@gmail.com?subject=Request%20a%20Quote",
    );
  });

  it("accepts approved Telegram links", () => {
    expect(getSafeExternalHref("https://t.me/pharmazeus")).toBe(
      "https://t.me/pharmazeus",
    );
  });

  it("rejects unknown hosts and insecure protocols", () => {
    expect(getSafeExternalHref("https://example.com")).toBeNull();
    expect(getSafeExternalHref("http://www.youtube.com/watch?v=abc123")).toBeNull();
    expect(getSafeExternalHref("javascript:alert(1)")).toBeNull();
    expect(getSafeExternalHref("data:text/html,<script>alert(1)</script>")).toBeNull();
  });

  it("rejects malformed values and unapproved mailto recipients", () => {
    expect(getSafeExternalHref("not-a-url")).toBeNull();
    expect(getSafeExternalHref("mailto:test@example.com")).toBeNull();
    expect(
      getSafeExternalHref(
        "mailto:vladmaidanskyi46@gmail.com?attach=/tmp/private.pdf",
      ),
    ).toBeNull();
    expect(getSafeExternalHref("https://telegram.example.com/pharmazeus")).toBeNull();
  });
});

describe("getSafeExternalLinkAttributes", () => {
  it("returns blank-target attributes for allowed https links", () => {
    expect(
      getSafeExternalLinkAttributes("https://www.linkedin.com/in/example/"),
    ).toEqual({
      href: "https://www.linkedin.com/in/example/",
      target: "_blank",
      rel: "noopener noreferrer",
    });
  });

  it("returns mailto attributes without blank-target behavior", () => {
    expect(
      getSafeExternalLinkAttributes("mailto:vladmaidanskyi46@gmail.com"),
    ).toEqual({
      href: "mailto:vladmaidanskyi46@gmail.com",
      target: undefined,
      rel: undefined,
    });
  });
});
