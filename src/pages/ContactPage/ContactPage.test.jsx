import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ContactPage from "./index";

function LocationProbe() {
  const location = useLocation();

  return (
    <span data-testid="current-location">
      {location.pathname}
      {location.search}
    </span>
  );
}

function renderContactPage(initialEntry = "/contact") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ContactPage />
      <LocationProbe />
    </MemoryRouter>,
  );
}

const filledForm = {
  name: "Vlad",
  email: "lead@example.com",
  company: "Digital Systems Creator",
  message: "Need help connecting content, site updates, and a lead workflow.",
};

describe("ContactPage", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("submits successfully and clears user-entered values", async () => {
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ ok: true }),
    });

    renderContactPage();

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: filledForm.name },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: filledForm.email },
    });
    fireEvent.change(screen.getByLabelText("Business / Brand"), {
      target: { value: filledForm.company },
    });
    fireEvent.change(screen.getByLabelText("What are you trying to improve?"), {
      target: { value: filledForm.message },
    });
    fireEvent.click(screen.getByRole("button", { name: "Start a Project" }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Message sent. I'll reply soon.",
    );
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Business / Brand")).toHaveValue("");
    expect(screen.getByLabelText("What are you trying to improve?")).toHaveValue("");
    expect(screen.getByTestId("current-location")).toHaveTextContent("/contact");
  });

  it("keeps entered values on send failure and shows fallback contact options", async () => {
    globalThis.fetch.mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ ok: false, error: "send_failed" }),
    });

    renderContactPage();

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: filledForm.name },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: filledForm.email },
    });
    fireEvent.change(screen.getByLabelText("What are you trying to improve?"), {
      target: { value: filledForm.message },
    });
    fireEvent.click(screen.getByRole("button", { name: "Start a Project" }));

    expect(
      await screen.findByText(/The form could not send right now/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue(filledForm.name);
    expect(screen.getByLabelText("Email")).toHaveValue(filledForm.email);
    expect(
      screen.getByLabelText("What are you trying to improve?"),
    ).toHaveValue(filledForm.message);
    expect(screen.getByRole("link", { name: "Email Directly" })).toHaveAttribute(
      "href",
      "mailto:vladmaidanskyi46@gmail.com",
    );
    expect(
      screen
        .getAllByRole("link", { name: "Telegram" })
        .some((link) => link.getAttribute("href") === "https://t.me/pharmazeus"),
    ).toBe(true);
    expect(screen.getByTestId("current-location")).toHaveTextContent("/contact");
  });

  it("includes pricing-prefilled service context in the API payload", async () => {
    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ ok: true }),
    });

    renderContactPage(
      "/contact?projectType=website&service=Landing%20Page%20Sprint",
    );

    expect(screen.getByDisplayValue("Website")).toBeInTheDocument();
    expect(screen.getByText("Landing Page Sprint")).toBeInTheDocument();
    expect(screen.getByLabelText("What are you trying to improve?").value).toContain(
      "Selected service: Landing Page Sprint",
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: filledForm.name },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: filledForm.email },
    });
    fireEvent.change(screen.getByLabelText("What are you trying to improve?"), {
      target: {
        value: `${screen.getByLabelText("What are you trying to improve?").value}
Need this live in the next month.`,
      },
    });
    fireEvent.click(screen.getByRole("button", { name: "Start a Project" }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledWith(
        "/api/contact",
        expect.objectContaining({
          method: "POST",
          body: expect.any(String),
        }),
      );
    });

    const [, request] = globalThis.fetch.mock.calls[0];
    const parsedBody = JSON.parse(request.body);

    expect(parsedBody.projectType).toBe("website");
    expect(parsedBody.service).toBe("Landing Page Sprint");
    expect(parsedBody.message).toContain("Selected service: Landing Page Sprint");
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Message sent. I'll reply soon.",
    );
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(
      screen.getByLabelText("What are you trying to improve?").value,
    ).toContain("Selected service: Landing Page Sprint");
    expect(screen.getByTestId("current-location")).toHaveTextContent(
      "/contact?projectType=website&service=Landing%20Page%20Sprint",
    );
  });
});
