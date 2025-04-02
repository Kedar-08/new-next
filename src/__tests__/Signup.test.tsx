import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "@/app/signup/page";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

// Mock useTranslation from react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Returns key as translation
  }),
}));

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Signup Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test("renders Signup component", () => {
    render(<Signup />);
    expect(
      screen.getByRole("heading", { name: "auth.signup.title" })
    ).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", async () => {
    render(<Signup />);
    fireEvent.click(screen.getByRole("button", { name: "auth.signup.title" })); // Submit button

    await waitFor(() => {
      expect(
        screen.getByText("auth.signup.full_name_required")
      ).toBeInTheDocument();
      expect(
        screen.getByText("auth.signup.email_required")
      ).toBeInTheDocument();
      expect(
        screen.getByText("auth.signup.password_required")
      ).toBeInTheDocument();
    });
  });

  test("submits form successfully and redirects", async () => {
    // Setup mocks
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Mock fetch API
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1 }),
      })
    ) as jest.Mock;

    // Mock setTimeout
    jest.useFakeTimers();

    render(<Signup />);

    // Fill form
    fireEvent.change(screen.getByLabelText("auth.signup.full_name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("auth.signup.email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("auth.signup.password"), {
      target: { value: "password123" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: "auth.signup.title" }));

    // Check success message
    await waitFor(() => {
      expect(screen.getByText("auth.signup.success")).toBeInTheDocument();
    });

    // Verify fetch was called with correct data
    expect(global.fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "John Doe",
          email: "john@example.com",
          password: "password123",
        }),
      }
    );

    // Fast-forward time to trigger redirect
    jest.advanceTimersByTime(2000);

    // Verify redirect was called
    expect(mockRouter.push).toHaveBeenCalledWith("/login");

    // Clean up
    jest.useRealTimers();
  });

  test("shows error message when form submission fails", async () => {
    // Mock fetch to return error response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as jest.Mock;

    render(<Signup />);

    // Fill form
    fireEvent.change(screen.getByLabelText("auth.signup.full_name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("auth.signup.email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("auth.signup.password"), {
      target: { value: "password123" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: "auth.signup.title" }));

    // Check error message
    await waitFor(() => {
      expect(screen.getByText("auth.signup.failed")).toBeInTheDocument();
    });
  });

  test("shows error message when form submission throws an exception", async () => {
    // Mock fetch to throw an error
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Network error"))
    ) as jest.Mock;

    // Mock console.error to prevent error output during tests
    const originalConsoleError = console.error;
    console.error = jest.fn();

    render(<Signup />);

    // Fill form
    fireEvent.change(screen.getByLabelText("auth.signup.full_name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("auth.signup.email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("auth.signup.password"), {
      target: { value: "password123" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: "auth.signup.title" }));

    // Check error message
    await waitFor(() => {
      expect(screen.getByText("auth.signup.error")).toBeInTheDocument();
    });

    // Verify console.error was called
    expect(console.error).toHaveBeenCalled();

    // Clean up
    console.error = originalConsoleError;
  });

  afterAll(() => {
    // Clean up all mocks
    jest.restoreAllMocks();
    delete (global as any).fetch;
  });
});
