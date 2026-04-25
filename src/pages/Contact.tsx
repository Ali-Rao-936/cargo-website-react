import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import {
  validateContactForm,
  type ContactFormData,
  type ContactFormErrors,
  type ContactApiResponse,
} from "../lib/contactValidation";

const EMPTY_FORM: ContactFormData = { name: "", email: "", subject: "", message: "" };

export function Contact() {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof ContactFormErrors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateContactForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setApiError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data: ContactApiResponse = await res.json();
      if (data.ok === true) {
        setIsSubmitted(true);
      } else if (data.ok === false) {
        setApiError(data.message);
      }
    } catch {
      setApiError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="bg-brand-blue py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Contact Us</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Have a question or need support? We're here to help you 24/7.
        </p>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-brand-blue mb-8">Get in Touch</h2>
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="bg-brand-orange/10 p-3 rounded-full text-brand-orange shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1">Head Office</h4>
                  <p className="text-slate-600">Al Quoz Industrial Area 2<br />Dubai, United Arab Emirates</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-orange/10 p-3 rounded-full text-brand-orange shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1">Phone</h4>
                  <p className="text-slate-600">+971 50 881 9829</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-orange/10 p-3 rounded-full text-brand-orange shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1">Email</h4>
                  <p className="text-slate-600">info@cargopeakuae.com<br />support@cargopeakuae.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-brand-orange/10 p-3 rounded-full text-brand-orange shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1">Business Hours</h4>
                  <p className="text-slate-600">Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 2:00 PM<br />Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=Al+Quoz+Industrial+Area+2,Dubai,UAE&output=embed"
                className="w-full h-64 border-0"
                loading="lazy"
                title="CargoPeak Office Location"
              />
            </div>
            <a
              href="https://maps.app.goo.gl/Nw4YXn5FQuVPrcPo6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-3 text-sm text-brand-blue hover:underline"
            >
              <MapPin size={14} />
              Get Directions
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-brand-blue mb-6">Send a Message</h3>
            {isSubmitted ? (
              <div className="bg-green-50 text-green-800 border border-green-200 p-6 rounded-xl text-center">
                <h4 className="font-bold text-lg mb-2">Message Sent!</h4>
                <p>Thank you for reaching out. We've sent a confirmation to your email and will get back to you within 24 hours.</p>
                <Button variant="outline" className="mt-6" onClick={() => { setIsSubmitted(false); setForm(EMPTY_FORM); }}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">Your Name</label>
                  <Input id="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                  <Input id="email" type="email" value={form.email} onChange={handleChange} placeholder="john@example.com" />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-1">
                  <label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</label>
                  <Input id="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" />
                  {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
                </div>
                <div className="space-y-1">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                  <Textarea id="message" value={form.message} onChange={handleChange} placeholder="Write your message here..." className="min-h-[150px]" />
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                </div>
                {apiError && (
                  <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">{apiError}</p>
                )}
                <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : <><Send className="w-4 h-4 mr-2" />Send Message</>}
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
