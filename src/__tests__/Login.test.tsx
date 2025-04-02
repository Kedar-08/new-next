import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "@/app/login/page";
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

// Mock useTranslation from react-i18next
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key, 
  }),
}));

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

describe("Login Component", () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    // Clear all mocks before each test
    jest.clearAllMocks();
    mockLocalStorage.clear();
  });

  test("renders Login component", () => {
    render(<Login />);
    expect(
      screen.getByRole("heading", { name: "auth.login.title" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("auth.login.full_name")).toBeInTheDocument();
    expect(screen.getByLabelText("auth.login.password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "auth.login.title" })
    ).toBeInTheDocument();
  });

  test("shows validation errors when submitting empty form", async () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: "auth.login.title" })); // Submit button

    await waitFor(() => {
      expect(
        screen.getByText("auth.login.full_name_required")
      ).toBeInTheDocument();
      expect(
        screen.getByText("auth.login.password_required")
      ).toBeInTheDocument();
    });
  });

  test("shows password length validation error", async () => {
    render(<Login />);

    // Enter valid name but short password
    fireEvent.change(screen.getByLabelText("auth.login.full_name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("auth.login.password"), {
      target: { value: "12345" }, // Less than 6 characters
    });

    fireEvent.click(screen.getByRole("button", { name: "auth.login.title" }));

    await waitFor(() => {
      expect(
        screen.getByText("auth.login.password_min_length")
      ).toBeInTheDocument();
    });
  });

  test("logs in successfully and redirects", async () => {
    // Setup mocks
    const mockRouter = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Mock setTimeout
    jest.useFakeTimers();

    render(<Login />);

    // Fill form
    fireEvent.change(screen.getByLabelText("auth.login.full_name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("auth.login.password"), {
      target: { value: "password123" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: "auth.login.title" }));

    // Check success message
    await waitFor(() => {
      expect(screen.getByText("auth.login.success")).toBeInTheDocument();
    });

    // Verify localStorage was updated correctly
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify({
        fullName: "John Doe",
        password: "password123",
      })
    );

    // Fast-forward time to trigger redirect
    jest.advanceTimersByTime(500);

    // Verify redirect was called
    expect(mockRouter.push).toHaveBeenCalledWith("/profile/user/dashboard");

    // Clean up
    jest.useRealTimers();
  });

  test("shows error message when login fails", async () => {
    // Mock localStorage to throw an error
    localStorage.setItem = jest.fn(() => {
      throw new Error("Storage error");
    });

    render(<Login />);

    // Fill form
    fireEvent.change(screen.getByLabelText("auth.login.full_name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("auth.login.password"), {
      target: { value: "password123" },
    });

    // Submit form
    fireEvent.click(screen.getByRole("button", { name: "auth.login.title" }));

    // Check error message
    await waitFor(() => {
      expect(screen.getByText("auth.login.error")).toBeInTheDocument();
    });
  });

  test("input fields update correctly when typed", () => {
    render(<Login />);

    const fullNameInput = screen.getByLabelText("auth.login.full_name");
    const passwordInput = screen.getByLabelText("auth.login.password");

    // Type in the fullName field
    fireEvent.change(fullNameInput, { target: { value: "Jane Doe" } });
    expect(fullNameInput).toHaveValue("Jane Doe");

    // Type in the password field
    fireEvent.change(passwordInput, { target: { value: "secret123" } });
    expect(passwordInput).toHaveValue("secret123");
  });

  test("validation errors clear when fields are corrected", async () => {
    render(<Login />);

    // Submit empty form to trigger validation errors
    fireEvent.click(screen.getByRole("button", { name: "auth.login.title" }));

    await waitFor(() => {
      expect(
        screen.getByText("auth.login.full_name_required")
      ).toBeInTheDocument();
      expect(
        screen.getByText("auth.login.password_required")
      ).toBeInTheDocument();
    });

    // Fill in fields correctly
    fireEvent.change(screen.getByLabelText("auth.login.full_name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("auth.login.password"), {
      target: { value: "password123" },
    });

    // Wait for error messages to disappear after blur events
    fireEvent.blur(screen.getByLabelText("auth.login.full_name"));
    fireEvent.blur(screen.getByLabelText("auth.login.password"));

    // Submit form again
    fireEvent.click(screen.getByRole("button", { name: "auth.login.title" }));

    await waitFor(() => {
      expect(
        screen.queryByText("auth.login.full_name_required")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("auth.login.password_required")
      ).not.toBeInTheDocument();
    });
  });

  test("navigates to signup page when signup link is clicked", () => {
    render(<Login />);

    const signupLink = screen.getByRole("link", { name: "auth.signup.title" });
    expect(signupLink).toHaveAttribute("href", "/");
  });

  afterAll(() => {
    // Clean up all mocks
    jest.restoreAllMocks();
  });
});
