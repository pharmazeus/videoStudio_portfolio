import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import FaqSection from "./FaqSection";

const customItems = [
  {
    question: "Can we start with one shoot?",
    answer: "Yes. A focused shoot can become the first reusable content set.",
  },
  {
    question: "Do you handle websites too?",
    answer: "Yes. Website and content work can be scoped together.",
  },
];

function renderFaqSection(props = {}) {
  return render(
    <MemoryRouter>
      <FaqSection items={customItems} {...props} />
    </MemoryRouter>,
  );
}

describe("FaqSection", () => {
  it("renders the supplied heading, description, and FAQ questions", () => {
    renderFaqSection({
      title: "Project questions",
      description: "Answers before we shape the scope.",
    });

    expect(
      screen.getByRole("heading", { name: "Project questions" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Answers before we shape the scope."),
    ).toBeInTheDocument();

    customItems.forEach((item) => {
      expect(
        screen.getByRole("button", { name: item.question }),
      ).toBeInTheDocument();
    });
  });

  it("opens the first FAQ item by default", () => {
    renderFaqSection();

    const firstQuestion = screen.getByRole("button", {
      name: customItems[0].question,
    });
    const secondQuestion = screen.getByRole("button", {
      name: customItems[1].question,
    });

    expect(firstQuestion).toHaveAttribute("aria-expanded", "true");
    expect(secondQuestion).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(customItems[0].answer).closest("[role='region']"))
      .toHaveAttribute("aria-hidden", "false");
  });

  it("renders the configured CTA as a contact link", () => {
    renderFaqSection();

    const cta = screen.getByRole("link", { name: /scope my project/i });

    expect(cta).toHaveAttribute("href", "/contact");
  });

  it("toggles the active FAQ item when a question is clicked", () => {
    renderFaqSection();

    const firstQuestion = screen.getByRole("button", {
      name: customItems[0].question,
    });
    const secondQuestion = screen.getByRole("button", {
      name: customItems[1].question,
    });

    fireEvent.click(secondQuestion);

    expect(firstQuestion).toHaveAttribute("aria-expanded", "false");
    expect(secondQuestion).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(customItems[0].answer).closest("[role='region']"))
      .toHaveAttribute("aria-hidden", "true");
    expect(screen.getByText(customItems[1].answer).closest("[role='region']"))
      .toHaveAttribute("aria-hidden", "false");

    fireEvent.click(secondQuestion);

    expect(secondQuestion).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(customItems[1].answer).closest("[role='region']"))
      .toHaveAttribute("aria-hidden", "true");
  });

  it("uses supplied FAQ items instead of homepage-specific data", () => {
    renderFaqSection({
      items: [
        {
          question: "Custom question?",
          answer: "Custom answer.",
        },
      ],
    });

    expect(
      screen.getByRole("button", { name: "Custom question?" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: customItems[0].question }),
    ).not.toBeInTheDocument();
  });
});
