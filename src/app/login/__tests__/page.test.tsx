import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Login from "../page";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string): string => key, // ✅ Explicitly defined 'key' as 'string'
  }),
}));

describe("Login Page", () => {
  beforeEach(() => {
    // ✅ Mock localStorage
    global.localStorage = {
      setItem: jest.fn(),
      getItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    } as any;
  });

  it("renders the login page correctly", () => {
    render(<Login />);

    // Check if the login form is displayed
    expect(screen.getByText("auth.login.title")).toBeInTheDocument();
    expect(screen.getByLabelText("auth.login.full_name")).toBeInTheDocument();
    expect(screen.getByLabelText("auth.login.password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "auth.login.title" })
    ).toBeInTheDocument();
  });

  it("displays validation errors when submitting empty form", async () => {
    render(<Login />);

    fireEvent.click(screen.getByRole("button", { name: "auth.login.title" }));

    expect(
      screen.getByText("auth.login.full_name_required")
    ).toBeInTheDocument();
    expect(
      screen.getByText("auth.login.password_required")
    ).toBeInTheDocument();
  });

  it("stores user details and redirects on successful login", async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    render(<Login />);

    fireEvent.change(screen.getByLabelText("auth.login.full_name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("auth.login.password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "auth.login.title" }));

    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify({ fullName: "John Doe", password: "password123" })
    );

    // ✅ Wait for navigation
    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(push).toHaveBeenCalledWith("/profile/user/dashboard");
  });
});
