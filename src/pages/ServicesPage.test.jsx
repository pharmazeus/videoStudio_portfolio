import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { services } from "../constants";
import ServicesPage from "./ServicesPage";

function renderServicesPage() {
  return render(
    <MemoryRouter initialEntries={["/services"]}>
      <ServicesPage />
    </MemoryRouter>,
  );
}

function getLinksTo(path) {
  return screen
    .getAllByRole("link")
    .filter((link) => link.getAttribute("href") === path);
}

describe("ServicesPage", () => {
  it("presents the redesign hero promise with contact and pricing paths", () => {
    renderServicesPage();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /services built around one digital system/i,
      }),
    ).toBeTruthy();
    expect(getLinksTo("/contact").length).toBeGreaterThan(0);
    expect(getLinksTo("/pricing").length).toBeGreaterThan(0);
  });

  it("renders every service title with its accessible story image", () => {
    renderServicesPage();

    services.forEach((service) => {
      expect(
        screen.getByRole("heading", { name: service.title }),
      ).toBeTruthy();

      expect(
        screen.getByRole("img", { name: service.storyImageAlt }),
      ).toHaveProperty("src", expect.stringContaining(service.storyImage));
    });
  });

  it("keeps the Web Development & Launch story anchored to the buyer decision", () => {
    renderServicesPage();

    const webDevelopmentHeading = screen.getByRole("heading", {
      name: "Web Development & Launch",
    });
    const webDevelopmentStory = webDevelopmentHeading.closest("article");

    expect(webDevelopmentStory).not.toBeNull();
    expect(within(webDevelopmentStory).getByText(
      /A launch path built around the buyer's next decision/i,
    )).toBeTruthy();
  });
});
