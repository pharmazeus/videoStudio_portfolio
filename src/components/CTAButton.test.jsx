import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CTAButton from "./CTAButton";

describe("CTAButton external href hardening", () => {
  it("renders allowed external links as anchors with safe attrs", () => {
    render(
      <CTAButton href="https://www.youtube.com/watch?v=abc123">
        Watch on YouTube
      </CTAButton>,
    );

    const link = screen.getByRole("link", { name: "Watch on YouTube" });

    expect(link).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=abc123",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("degrades invalid external links to a disabled text element", () => {
    render(<CTAButton href="javascript:alert(1)">Unsafe Link</CTAButton>);

    const fallback = screen.getByText("Unsafe Link");

    expect(fallback.tagName).toBe("SPAN");
    expect(fallback.closest("a")).toBeNull();
    expect(fallback).toHaveAttribute("aria-disabled", "true");
  });
});
