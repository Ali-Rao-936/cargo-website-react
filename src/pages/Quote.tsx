import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { CheckCircle2 } from "lucide-react";
import { cn } from "../lib/utils";
import {
  validateQuoteForm,
  type QuoteFormData,
  type QuoteFormErrors,
  type QuoteApiResponse,
} from "../lib/quoteValidation";

const EMPTY_FORM: QuoteFormData = {
  name: "", company: "", email: "", phone: "",
  pickup: "", destination: "",
  serviceType: "", weight: "", message: "",
};

type TouchedFields = Partial<Record<keyof QuoteFormErrors, boolean>>;

export function Quote() {
  const [formData, setFormData] = useState<QuoteFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<QuoteFormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleChange = (field: keyof QuoteFormData, value: string) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (touched[field as keyof QuoteFormErrors]) {
      const newErrors = validateQuoteForm(updated);
      setErrors((prev) => ({ ...prev, [field]: newErrors[field as keyof QuoteFormErrors] }));
    }
  };

  const handleBlur = (field: keyof QuoteFormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateQuoteForm(formData);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const allTouched: TouchedFields = {
      name: true, email: true, phone: true,
      pickup: true, destination: true, serviceType: true, weight: true,
    };
    setTouched(allTouched);

    const validationErrors = validateQuoteForm(formData);
    if (Object.values(validationErrors).some(Boolean)) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data: QuoteApiResponse = await res.json();
      if (data.ok) {
        setIsSubmitted(true);
      } else {
        setApiError(data.message);
      }
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData(EMPTY_FORM);
    setErrors({});
    setTouched({});
    setApiError(null);
  };

  const fieldError = (field: keyof QuoteFormErrors) =>
    touched[field] ? errors[field] : undefined;

  const inputClass = (field: keyof QuoteFormErrors) =>
    cn(fieldError(field) && "border-red-400 focus:ring-red-400");

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-brand-blue mb-2">Quote Requested!</h2>
          <p className="text-slate-600 mb-2">
            Thank you for reaching out. One of our logistics experts will review your details and get back to you with a quote within 24 hours.
          </p>
          <p className="text-slate-500 text-sm mb-8">
            A confirmation email has been sent to <strong>{formData.email}</strong>.
          </p>
          <Button onClick={handleReset} className="w-full">
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-20 px-4 bg-brand-light">
      <div className="container mx-auto max-w-4xl tracking-tight">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-blue mb-4">Get a Quick Quote</h1>
          <p className="text-slate-600 text-lg">Fill out the details below and we'll provide you with the best shipping rates.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12">
          <form onSubmit={handleSubmit} noValidate className="space-y-8">

            {/* Personal Details */}
            <div>
              <h3 className="text-lg font-semibold text-brand-blue mb-4 border-b border-slate-100 pb-2">1. Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    onBlur={() => handleBlur("name")}
                    placeholder="John Doe"
                    className={inputClass("name")}
                  />
                  {fieldError("name") && (
                    <p className="text-xs text-red-500">{fieldError("name")}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label htmlFor="company" className="text-sm font-medium text-slate-700">Company (Optional)</label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange("company", e.target.value)}
                    placeholder="Example LLC"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    placeholder="john@example.com"
                    className={inputClass("email")}
                  />
                  {fieldError("email") && (
                    <p className="text-xs text-red-500">{fieldError("email")}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    placeholder="+971 50 123 4567"
                    className={inputClass("phone")}
                  />
                  {fieldError("phone") && (
                    <p className="text-xs text-red-500">{fieldError("phone")}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipment Route */}
            <div>
              <h3 className="text-lg font-semibold text-brand-blue mb-4 border-b border-slate-100 pb-2">2. Route</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="pickup" className="text-sm font-medium text-slate-700">
                    Pickup Location (City, Country) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="pickup"
                    value={formData.pickup}
                    onChange={(e) => handleChange("pickup", e.target.value)}
                    onBlur={() => handleBlur("pickup")}
                    placeholder="Dubai, UAE"
                    className={inputClass("pickup")}
                  />
                  {fieldError("pickup") && (
                    <p className="text-xs text-red-500">{fieldError("pickup")}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label htmlFor="destination" className="text-sm font-medium text-slate-700">
                    Delivery Destination (City, Country) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="destination"
                    value={formData.destination}
                    onChange={(e) => handleChange("destination", e.target.value)}
                    onBlur={() => handleBlur("destination")}
                    placeholder="London, UK"
                    className={inputClass("destination")}
                  />
                  {fieldError("destination") && (
                    <p className="text-xs text-red-500">{fieldError("destination")}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipment Details */}
            <div>
              <h3 className="text-lg font-semibold text-brand-blue mb-4 border-b border-slate-100 pb-2">3. Shipment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-1">
                  <label htmlFor="type" className="text-sm font-medium text-slate-700">
                    Service Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="type"
                    value={formData.serviceType}
                    onChange={(e) => handleChange("serviceType", e.target.value)}
                    onBlur={() => handleBlur("serviceType")}
                    className={cn(
                      "flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent",
                      fieldError("serviceType") && "border-red-400 focus:ring-red-400"
                    )}
                  >
                    <option value="">Select Service...</option>
                    <option value="air">Air Freight</option>
                    <option value="sea">Sea Freight</option>
                    <option value="land">Land Transport</option>
                    <option value="door">Door-to-Door Delivery</option>
                  </select>
                  {fieldError("serviceType") && (
                    <p className="text-xs text-red-500">{fieldError("serviceType")}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label htmlFor="weight" className="text-sm font-medium text-slate-700">
                    Approx. Total Weight (kg) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="weight"
                    type="number"
                    min="0"
                    value={formData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    onBlur={() => handleBlur("weight")}
                    placeholder="150"
                    className={inputClass("weight")}
                  />
                  {fieldError("weight") && (
                    <p className="text-xs text-red-500">{fieldError("weight")}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">Additional Information / Dimensions</label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Please provide any specific requirements, dimensions (L x W x H), or nature of goods..."
                />
              </div>
            </div>

            {apiError && (
              <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm" role="alert">
                <strong className="font-semibold">Submission failed: </strong>{apiError}
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <Button type="submit" size="lg" className="w-full md:w-auto px-12" disabled={isLoading}>
                {isLoading ? "Sending..." : "Submit Request"}
              </Button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
