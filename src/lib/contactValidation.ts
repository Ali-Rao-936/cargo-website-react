export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactFormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export interface ContactApiSuccess {
  ok: true;
}

export interface ContactApiError {
  ok: false;
  message: string;
}

export type ContactApiResponse = ContactApiSuccess | ContactApiError;

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.name || data.name.trim().length < 2 || !/^[A-Za-z\s\-']+$/.test(data.name.trim())) {
    errors.name = "Name must be at least 2 characters (letters only)";
  }

  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.subject || data.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return errors;
}
