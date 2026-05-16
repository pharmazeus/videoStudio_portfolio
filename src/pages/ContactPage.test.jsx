import "@testing-library/jest-dom/vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import ContactPage from "./ContactPage";

function renderContactPage(initialEntry = "/contact") {
  return render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <ContactPage />
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
    const user = userEvent.setup();

    globalThis.fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ ok: true }),
    });

    renderContactPage();

    await user.type(screen.getByLabelText("Name"), filledForm.name);
    await user.type(screen.getByLabelText("Email"), filledForm.email);
    await user.type(screen.getByLabelText("Business / Brand"), filledForm.company);
    await user.type(
      screen.getByLabelText("What are you trying to improve?"),
      filledForm.message,
    );
    await user.click(screen.getByRole("button", { name: "Start a Project" }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledTimes(1);
    });

    expect(
      await screen.findByText(/Project request sent/i),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Business / Brand")).toHaveValue("");
    expect(screen.getByLabelText("What are you trying to improve?")).toHaveValue("");
  });

  it("keeps entered values on send failure and shows fallback contact options", async () => {
    const user = userEvent.setup();

    globalThis.fetch.mockResolvedValue({
      ok: false,
      json: vi.fn().mockResolvedValue({ ok: false, error: "send_failed" }),
    });

    renderContactPage();

    await user.type(screen.getByLabelText("Name"), filledForm.name);
    await user.type(screen.getByLabelText("Email"), filledForm.email);
    await user.type(
      screen.getByLabelText("What are you trying to improve?"),
      filledForm.message,
    );
    await user.click(screen.getByRole("button", { name: "Start a Project" }));

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
  });

  it("includes pricing-prefilled service context in the API payload", async () => {
    const user = userEvent.setup();

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

    await user.type(screen.getByLabelText("Name"), filledForm.name);
    await user.type(screen.getByLabelText("Email"), filledForm.email);
    await user.type(
      screen.getByLabelText("What are you trying to improve?"),
      "\nNeed this live in the next month.",
    );
    await user.click(screen.getByRole("button", { name: "Start a Project" }));

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
  });
});
