import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from "@/app/signup/page";
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() })
}));  

beforeAll(() => {
  i18next.init({
    lng: 'en',
    resources: {
      en: {
        translation: {
          "auth.signup.full_name_required": "Full name is required",
          "auth.signup.invalid_email": "Invalid email",
          "auth.signup.email_required": "Email is required",
          "auth.signup.password_min_length": "Password must be at least 6 characters",
          "auth.signup.password_required": "Password is required",
          "auth.signup.success": "Signed up successfully",
          "auth.signup.failed": "Signup failed",
          "auth.signup.error": "An error occurred",
          "auth.signup.title": "Sign Up",
          "auth.signup.full_name": "Full Name",
          "auth.signup.email": "Email",
          "auth.signup.password": "Password",
          "auth.signup.enter_full_name": "Enter full name",
          "auth.signup.enter_email": "Enter email",
          "auth.signup.enter_password": "Enter password",
          "auth.signup.already_have_account": "Already have an account?",
          "auth.login.title": "Login",
          "common.app_name": "My App",
        },
      },
    },
  });
});

afterEach(() => {
  jest.resetAllMocks(); 
});

describe('Signup Component', () => {
  it('renders the signup form correctly', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <Signup />
      </I18nextProvider>
    );

    expect(screen.getByLabelText('auth.signup.full_name')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.signup.email')).toBeInTheDocument();
    expect(screen.getByLabelText('auth.signup.password')).toBeInTheDocument();
    expect(screen.getByText('auth.signup.title')).toBeInTheDocument();
  });

  it('shows validation errors when form fields are empty', async () => {
    render(
      <I18nextProvider i18n={i18next}>
        <Signup />
      </I18nextProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('auth.signup.full_name_required')).toBeInTheDocument();
      expect(screen.getByText('auth.signup.email_required')).toBeInTheDocument();
      expect(screen.getByText('auth.signup.password_required')).toBeInTheDocument();
    });
  });

  it('displays success message after successful signup', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: true });

    render(
      <I18nextProvider i18n={i18next}>
        <Signup />
      </I18nextProvider>
    );

    fireEvent.change(screen.getByLabelText('auth.signup.full_name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('auth.signup.email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText('auth.signup.password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('auth.signup.success')).toBeInTheDocument();
    });
  });

  it('displays error message on failed signup', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({ ok: false });

    render(
      <I18nextProvider i18n={i18next}>
        <Signup />
      </I18nextProvider>
    );

    fireEvent.change(screen.getByLabelText('auth.signup.full_name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('auth.signup.email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText('auth.signup.password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('auth.signup.failed')).toBeInTheDocument();
    });
  });

  it('displays error message when fetch fails', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('Fetch failed'));

    render(
      <I18nextProvider i18n={i18next}>
        <Signup />
      </I18nextProvider>
    );

    fireEvent.change(screen.getByLabelText('auth.signup.full_name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('auth.signup.email'), {
      target: { value: 'john.doe@example.com' },
    });
    fireEvent.change(screen.getByLabelText('auth.signup.password'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByText('auth.signup.error')).toBeInTheDocument();
    });
  });

  // Explicitly check that useRouter mock was called (optional)
  it('calls useRouter mock', () => {
    render(
      <I18nextProvider i18n={i18next}>
        <Signup />
      </I18nextProvider>
    );
    expect(useRouter).toHaveBeenCalled();
  });
});
