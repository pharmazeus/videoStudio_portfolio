import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import VideoPreviewCard from "./VideoPreviewCard";

const baseItem = {
  title: "Sample Reel",
  excerpt: "Short description",
  media: {
    poster: "/images/video-placeholder.svg",
    previewSrc: "",
    youtubeUrl: "https://youtube.com/shorts/ZHpGl9Aw-m8",
    orientation: "portrait",
  },
};

describe("VideoPreviewCard external href hardening", () => {
  it("keeps allowed YouTube destinations clickable", () => {
    render(<VideoPreviewCard item={baseItem} />);

    const link = screen.getByRole("link", {
      name: "Watch full video on YouTube: Sample Reel",
    });

    expect(link).toHaveAttribute(
      "href",
      "https://youtube.com/shorts/ZHpGl9Aw-m8",
    );
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders a non-clickable fallback when the link is rejected", () => {
    render(
      <VideoPreviewCard
        item={{
          ...baseItem,
          media: {
            ...baseItem.media,
            youtubeUrl: "javascript:alert(1)",
          },
        }}
      />,
    );

    const fallback = screen.getByText("Watch Full Video on YouTube").closest("div");

    expect(screen.queryByRole("link")).toBeNull();
    expect(fallback).toHaveAttribute("aria-disabled", "true");
  });
});
