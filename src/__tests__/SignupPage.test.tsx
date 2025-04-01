import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Signup from "../app/signup/page";
import { Formik } from "formik";
import { act } from "react-dom/test-utils";

// Mocking next/navigation for router
jest.mock("next/navigation", () => {
  const mockPush = jest.fn(); // Define mockPush here

  return {
    useRouter: jest.fn().mockReturnValue({
      push: mockPush,
    }),
  };
});

describe("Signup Component", () => {
  it("should handle text input change for username", async () => {
    const { getByLabelText } = render(<Signup />);
    const usernameInput = getByLabelText("Username");

    await act(async () => {
      fireEvent.change(usernameInput, { target: { value: "testUser" } });
    });

    expect(usernameInput).toHaveValue("testUser");
  });
  // test("renders form fields and validates inputs", async () => {
  //   render(<Signup />);

  //   // Check if form fields are rendered
  //   expect(screen.getByLabelText("auth.signup.full_name")).toBeInTheDocument();
  //   expect(screen.getByLabelText("auth.signup.email")).toBeInTheDocument();
  //   expect(screen.getByLabelText("auth.signup.password")).toBeInTheDocument();

  //   // Simulate user typing invalid input and submitting form
  //   const fullNameInput = screen.getByLabelText(
  //     "auth.signup.full_name"
  //   ) as HTMLInputElement;
  //   const emailInput = screen.getByLabelText(
  //     "auth.signup.email"
  //   ) as HTMLInputElement;
  //   const passwordInput = screen.getByLabelText(
  //     "auth.signup.password"
  //   ) as HTMLInputElement;
  //   const submitButton = screen.getByRole("button", {
  //     name: "auth.signup.title",
  //   });

  //   // Trigger validation by submitting without filling the fields
  //   fireEvent.submit(submitButton);

  //   // Wait for validation errors
  //   await waitFor(() => {
  //     expect(
  //       screen.getByText("auth.signup.full_name_required")
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByText("auth.signup.email_required")
  //     ).toBeInTheDocument();
  //     expect(
  //       screen.getByText("auth.signup.password_required")
  //     ).toBeInTheDocument();
  //   });

  //   // Fill in the inputs with valid data
  //   fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
  //   fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
  //   fireEvent.change(passwordInput, { target: { value: "password123" } });

  //   // Submit the form
  //   await act(async () => {
  //     fireEvent.submit(submitButton);
  //   });

  //   // Check that the submit function was called and that validation errors are gone
  //   await waitFor(() => {
  //     expect(screen.queryByText("auth.signup.full_name_required")).toBeNull();
  //     expect(screen.queryByText("auth.signup.email_required")).toBeNull();
  //     expect(screen.queryByText("auth.signup.password_required")).toBeNull();
  //   });

  //   // Simulate the network request to check if success message appears
  //   expect(screen.getByText("auth.signup.success")).toBeInTheDocument();
  // });
});
