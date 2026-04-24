export interface QuoteFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  pickup: string;
  destination: string;
  serviceType: string;
  weight: string;
  message: string;
}

export interface QuoteFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  pickup?: string;
  destination?: string;
  serviceType?: string;
  weight?: string;
}

export interface QuoteApiSuccess {
  ok: true;
}

export interface QuoteApiError {
  ok: false;
  message: string;
}

export type QuoteApiResponse = QuoteApiSuccess | QuoteApiError;

const VALID_SERVICE_TYPES = ["air", "sea", "land", "door"];

export function validateQuoteForm(data: QuoteFormData): QuoteFormErrors {
  const errors: QuoteFormErrors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters (letters, spaces, hyphens, apostrophes only)";
  } else if (!/^[A-Za-z\s\-']+$/.test(data.name.trim())) {
    errors.name = "Name must be at least 2 characters (letters, spaces, hyphens, apostrophes only)";
  }

  if (!data.email || !data.email.trim()) {
    errors.email = "Please enter a valid email address";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  if (!data.phone || !data.phone.trim()) {
    errors.phone = "Please enter a valid phone number (e.g. +971 50 123 4567)";
  } else if (!/^\+?[\d\s\-().]{7,20}$/.test(data.phone.trim())) {
    errors.phone = "Please enter a valid phone number (e.g. +971 50 123 4567)";
  }

  if (!data.pickup || !data.pickup.trim()) {
    errors.pickup = "Please enter the pickup location";
  }

  if (!data.destination || !data.destination.trim()) {
    errors.destination = "Please enter the delivery destination";
  }

  if (!data.serviceType || !VALID_SERVICE_TYPES.includes(data.serviceType)) {
    errors.serviceType = "Please select a service type";
  }

  const w = parseFloat(data.weight);
  if (!data.weight || isNaN(w) || w <= 0) {
    errors.weight = "Please enter a valid weight greater than 0";
  }

  return errors;
}
