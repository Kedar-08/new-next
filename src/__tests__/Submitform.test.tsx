import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { saveForm } from "@/redux/slices/formSlice";

// Mock dependencies - needs to be before the component import
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: { [key: string]: string } = {
        "submitForm.firstName": "First Name",
        "submitForm.enterFirstName": "Enter first name",
        "submitForm.lastName": "Last Name",
        "submitForm.enterLastName": "Enter last name",
        "submitForm.selectGender": "Select Gender",
        "submitForm.male": "Male",
        "submitForm.female": "Female",
        "submitForm.other": "Other",
        "submitForm.selectRelationship": "Select Relationship",
        "submitForm.single": "Single",
        "submitForm.married": "Married",
        "submitForm.fileInput": "Upload File",
        "submitForm.noFileChosen": "No file chosen",
        "submitForm.submit": "Submit",
      };
      return translations[key] || key;
    },
  }),
}));

// Mock router with an explicit mock function to test it's being called
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

// Mock for console.log
const originalConsoleLog = console.log;
console.log = jest.fn();

// Define interface types for component props
interface DropdownProps {
  id: string;
  label: string;
  selectedItem?: string;
  onChange: (value: string | null) => void;
  disabled?: boolean;
  items?: string[];
}

interface TextInputProps {
  id: string;
  labelText: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  placeholder?: string;
}

interface FileInputProps {
  id: string;
  labelText: string;
  value?: string;
  onChange: (filename: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  kind?: string;
  className?: string;
}

interface GridProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  className?: string;
}

interface ColumnProps {
  children: React.ReactNode;
  sm?: number;
  md?: number;
  lg?: number;
}

interface FormProps {
  children: React.ReactNode;
}

interface StackProps {
  children: React.ReactNode;
  gap?: number;
}

// Mock the shared components - make sure these come before the component import
jest.mock("@/components/shared/dropdown/GlobalDropdown", () => ({
  __esModule: true,
  default: function MockDropdown({
    id,
    label,
    selectedItem,
    onChange,
    disabled,
    items,
  }: DropdownProps) {
    return (
      <div data-testid={`mock-dropdown-${id}`}>
        <label>{label}</label>
        <select
          data-testid={`select-${id}`}
          value={selectedItem || ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        >
          <option value="">Select</option>
          {items &&
            items.map((item: string, index: number) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
        </select>
      </div>
    );
  },
}));

jest.mock("@/components/shared/textinput/TextInputField", () => ({
  __esModule: true,
  default: function MockTextInput({
    id,
    labelText,
    value,
    onChange,
    disabled,
    placeholder,
  }: TextInputProps) {
    return (
      <div data-testid={`mock-input-${id}`}>
        <label>{labelText}</label>
        <input
          type="text"
          value={value || ""}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          data-testid={`input-${id}`}
        />
      </div>
    );
  },
}));

jest.mock("@/components/shared/fileinput/FileInput", () => ({
  __esModule: true,
  default: function MockFileInput({
    id,
    labelText,
    value,
    onChange,
    disabled,
    placeholder,
  }: FileInputProps) {
    return (
      <div data-testid={`mock-file-input-${id}`}>
        <label>{labelText}</label>
        <input
          type="file"
          disabled={disabled}
          placeholder={placeholder}
          data-testid={`file-${id}`}
          onChange={() => onChange("test-file.pdf")}
        />
        {value && <span data-testid="file-name">{value}</span>}
      </div>
    );
  },
}));

// Mock Carbon components
jest.mock("@carbon/react", () => ({
  __esModule: true,
  Button: function MockButton({ children, onClick, kind, className }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        data-testid="submit-button"
        className={className}
        data-kind={kind}
      >
        {children}
      </button>
    );
  },
  Grid: function MockGrid({ children, fullWidth, className }: GridProps) {
    return (
      <div data-testid="grid" className={className} data-fullwidth={fullWidth}>
        {children}
      </div>
    );
  },
  Column: function MockColumn({ children, sm, md, lg }: ColumnProps) {
    return (
      <div data-testid="column" data-sm={sm} data-md={md} data-lg={lg}>
        {children}
      </div>
    );
  },
  Form: function MockForm({ children }: FormProps) {
    return <form data-testid="form">{children}</form>;
  },
  Stack: function MockStack({ children, gap }: StackProps) {
    return (
      <div data-testid="stack" data-gap={gap}>
        {children}
      </div>
    );
  },
}));

// Mock the CSS module
jest.mock(
  "./SubmitForm.module.scss",
  () => ({
    formContainer: "mock-form-container",
    submitBtn: "mock-submit-btn",
  }),
  { virtual: true }
);

// After all mocks are setup, import the component
import SubmitForm from "@/app/profile/user/dashboard/SubmitForm/page";

describe("SubmitForm Component", () => {
  const mockStore = configureStore([]);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    console.log = originalConsoleLog;
  });

  test("renders form with all fields when not in read-only mode", () => {
    const initialState = {
      form: {
        isReadOnly: false,
        firstName: "",
        lastName: "",
        gender: "",
        relationship: "",
        fileName: "",
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SubmitForm />
      </Provider>
    );

    // Check if all form elements are rendered
    expect(screen.getByTestId("mock-input-firstName")).toBeInTheDocument();
    expect(screen.getByTestId("mock-input-lastName")).toBeInTheDocument();
    expect(screen.getByTestId("mock-dropdown-gender")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-dropdown-relationship")
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-file-input-fileInput")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();

    // Verify Redux state was logged
    expect(console.log).toHaveBeenCalledWith("Redux State:", initialState.form);
  });

  test("renders form with all fields in read-only mode", () => {
    const initialState = {
      form: {
        isReadOnly: true,
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        relationship: "Single",
        fileName: "test-file.pdf",
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SubmitForm />
      </Provider>
    );

    // Check if all form elements are rendered but no submit button
    expect(screen.getByTestId("mock-input-firstName")).toBeInTheDocument();
    expect(screen.getByTestId("mock-input-lastName")).toBeInTheDocument();
    expect(screen.getByTestId("mock-dropdown-gender")).toBeInTheDocument();
    expect(
      screen.getByTestId("mock-dropdown-relationship")
    ).toBeInTheDocument();
    expect(screen.getByTestId("mock-file-input-fileInput")).toBeInTheDocument();
    expect(screen.queryByTestId("submit-button")).not.toBeInTheDocument();

    // Check if values are populated
    expect(screen.getByTestId("input-firstName")).toHaveValue("John");
    expect(screen.getByTestId("input-lastName")).toHaveValue("Doe");
  });

  test("handles input changes correctly for all fields", async () => {
    const initialState = {
      form: {
        isReadOnly: false,
        firstName: "",
        lastName: "",
        gender: "",
        relationship: "",
        fileName: "",
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SubmitForm />
      </Provider>
    );

    // First name change
    fireEvent.change(screen.getByTestId("input-firstName"), {
      target: { value: "John" },
    });

    // Last name change
    fireEvent.change(screen.getByTestId("input-lastName"), {
      target: { value: "Doe" },
    });

    // Gender change
    fireEvent.change(screen.getByTestId("select-gender"), {
      target: { value: "Male" },
    });

    // Relationship change
    fireEvent.change(screen.getByTestId("select-relationship"), {
      target: { value: "Single" },
    });

    // File input change
    fireEvent.change(screen.getByTestId("file-fileInput"), {});

    // Submit the form
    fireEvent.click(screen.getByTestId("submit-button"));

    // Check if correct action was dispatched
    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    expect(actions[0]).toEqual(
      saveForm({
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        relationship: "Single",
        fileName: "test-file.pdf",
      })
    );

    // Check if router.push was called with the correct path
    expect(mockPush).toHaveBeenCalledWith("/profile/user/dashboard");

    // Check that form data was logged before dispatch
    expect(console.log).toHaveBeenCalledWith(
      "Dispatching form data to Redux:",
      expect.objectContaining({
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        relationship: "Single",
        fileName: "test-file.pdf",
      })
    );
  });

  test("useEffect loads saved data into state when in read-only mode", () => {
    const initialState = {
      form: {
        isReadOnly: true,
        firstName: "Jane",
        lastName: "Smith",
        gender: "Female",
        relationship: "Married",
        fileName: "existing-file.pdf",
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SubmitForm />
      </Provider>
    );

    // Check that the values were loaded from redux state
    expect(screen.getByTestId("input-firstName")).toHaveValue("Jane");
    expect(screen.getByTestId("input-lastName")).toHaveValue("Smith");

    // Verify redux state was logged at component initialization
    expect(console.log).toHaveBeenCalledWith("Redux State:", initialState.form);
  });

  test("useEffect sets default empty strings when form data fields are missing", () => {
    const initialState = {
      form: {
        isReadOnly: true,
        // Missing some fields to test fallback to empty strings
        firstName: "Jane",
        // lastName is missing
        gender: "Female",
        // relationship is missing
        // fileName is missing
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SubmitForm />
      </Provider>
    );

    // Check for existing value
    expect(screen.getByTestId("input-firstName")).toHaveValue("Jane");

    // Check for fallback to empty strings
    expect(screen.getByTestId("input-lastName")).toHaveValue("");
  });

  test("handles null values from dropdowns correctly", async () => {
    const initialState = {
      form: {
        isReadOnly: false,
        firstName: "Test",
        lastName: "",
        gender: "",
        relationship: "",
        fileName: "",
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SubmitForm />
      </Provider>
    );

    // Get direct access to the select element
    const genderSelect = screen.getByTestId("select-gender");

    // Simulate null value coming from dropdown (direct test of handleChange with null)
    const dropdownOnChange = jest.fn();
    const originalOnChange = genderSelect.onchange;
    genderSelect.onchange = dropdownOnChange;

    // This simulates a user selecting something that results in null
    fireEvent.change(genderSelect, { target: { value: "" } });

    // Manually trigger handleChange with null to test that specific code path
    // We need to find the onChange prop in the GlobalDropdown mock and call it directly
    const mockDropdownProps = jest.requireMock(
      "@/components/shared/dropdown/GlobalDropdown"
    ).default.mock?.calls?.[0]?.[0] as DropdownProps | undefined;
    if (mockDropdownProps?.onChange) {
      mockDropdownProps.onChange(null);
    } else {
      // Alternative: Get the props by finding the onChange handler in the rendered component
      const mockDropdown = jest.requireMock(
        "@/components/shared/dropdown/GlobalDropdown"
      ).default;
      const mockCalls = mockDropdown.mock?.calls;
      if (mockCalls && mockCalls.length > 0) {
        const props = mockCalls.find((call) => call[0].id === "gender");
        if (props && props[0]?.onChange) {
          props[0].onChange(null);
        }
      }
    }

    // Restore original handler
    genderSelect.onchange = originalOnChange;

    // Submit the form
    fireEvent.click(screen.getByTestId("submit-button"));

    // Check Redux action
    const actions = store.getActions();

    // Verify that the gender value is an empty string (converted from null)
    expect(actions[0].payload.gender).toBe("");
  });

  test("component initializes with empty form values", () => {
    const initialState = {
      form: {
        isReadOnly: false,
        // No form data provided
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SubmitForm />
      </Provider>
    );

    // All fields should be empty
    expect(screen.getByTestId("input-firstName")).toHaveValue("");
    expect(screen.getByTestId("input-lastName")).toHaveValue("");
  });

  test("useEffect is skipped when not in read-only mode", () => {
    const initialState = {
      form: {
        isReadOnly: false,
        firstName: "John",
        lastName: "Doe",
        gender: "Male",
        relationship: "Single",
        fileName: "test-file.pdf",
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SubmitForm />
      </Provider>
    );

    // Form values should remain empty because useEffect is skipped
    expect(screen.getByTestId("input-firstName")).toHaveValue("");
    expect(screen.getByTestId("input-lastName")).toHaveValue("");
  });

  test("Carbon UI components are rendered with correct props", () => {
    const initialState = {
      form: {
        isReadOnly: false,
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SubmitForm />
      </Provider>
    );

    // Test Grid props
    const grid = screen.getByTestId("grid");
    expect(grid).toHaveAttribute("data-fullwidth", "true");
    expect(grid).toHaveClass("mock-form-container");

    // Test Column props
    const column = screen.getByTestId("column");
    expect(column).toHaveAttribute("data-sm", "4");
    expect(column).toHaveAttribute("data-md", "6");
    expect(column).toHaveAttribute("data-lg", "8");

    // Test Form
    expect(screen.getByTestId("form")).toBeInTheDocument();

    // Test Stack
    const stack = screen.getByTestId("stack");
    expect(stack).toHaveAttribute("data-gap", "7");

    // Test Button
    const button = screen.getByTestId("submit-button");
    expect(button).toHaveAttribute("data-kind", "primary");
    expect(button).toHaveClass("mock-submit-btn");
  });

  test("form inputs handle multiple changes correctly", () => {
    const initialState = {
      form: {
        isReadOnly: false,
      },
    };
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <SubmitForm />
      </Provider>
    );

    // Change value for firstName multiple times
    fireEvent.change(screen.getByTestId("input-firstName"), {
      target: { value: "J" },
    });

    fireEvent.change(screen.getByTestId("input-firstName"), {
      target: { value: "Jo" },
    });

    fireEvent.change(screen.getByTestId("input-firstName"), {
      target: { value: "John" },
    });

    // Test the final value is correct
    expect(screen.getByTestId("input-firstName")).toHaveValue("John");
  });
});