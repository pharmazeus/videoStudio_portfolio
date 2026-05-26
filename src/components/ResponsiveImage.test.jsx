import "@testing-library/jest-dom/vitest";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ResponsiveImage from "./ResponsiveImage";

describe("ResponsiveImage", () => {
  it("keeps the default JPEG responsive source behavior", () => {
    const { container } = render(
      <ResponsiveImage
        src="/posters/services/story-web-development.jpg"
        alt="Service poster"
        widths={[480, 640]}
        sizes="50vw"
      />,
    );

    const source = container.querySelector("source");
    const image = container.querySelector("img");

    expect(source).toHaveAttribute(
      "srcset",
      "/posters/services/story-web-development-480.jpg 480w, /posters/services/story-web-development-640.jpg 640w",
    );
    expect(source).toHaveAttribute("sizes", "50vw");
    expect(image).toHaveAttribute("src", "/posters/services/story-web-development.jpg");
    expect(image).toHaveAttribute("alt", "Service poster");
  });

  it("renders optional modern-format sources before the JPEG fallback", () => {
    const { container } = render(
      <ResponsiveImage
        src="/posters/services/story-web-development.jpg"
        alt="Service poster"
        widths={[480]}
        sources={[
          {
            type: "image/webp",
            format: "webp",
            widths: [480, 640],
          },
        ]}
      />,
    );

    const sources = container.querySelectorAll("source");

    expect(sources).toHaveLength(2);
    expect(sources[0]).toHaveAttribute("type", "image/webp");
    expect(sources[0]).toHaveAttribute(
      "srcset",
      "/posters/services/story-web-development-480.webp 480w, /posters/services/story-web-development-640.webp 640w",
    );
    expect(sources[1]).toHaveAttribute("type", "image/jpeg");
    expect(sources[1]).toHaveAttribute(
      "srcset",
      "/posters/services/story-web-development-480.jpg 480w",
    );
  });
});
