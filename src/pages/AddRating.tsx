import { useState } from "react";
import { Star } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { supabase } from "../lib/supabase";

interface FormData {
  name: string;
  subject: string;
  email_or_phone: string;
  comment: string;
}

const EMPTY_FORM: FormData = { name: "", subject: "", email_or_phone: "", comment: "" };

export function AddRating() {
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);

  function halfVal(e: React.MouseEvent<HTMLButtonElement>, n: number) {
    const rect = e.currentTarget.getBoundingClientRect();
    return e.clientX - rect.left < rect.width / 2 ? n - 0.5 : n;
  }

  function starFill(n: number, value: number): "full" | "half" | "empty" {
    if (value >= n) return "full";
    if (value >= n - 0.5) return "half";
    return "empty";
  }

  function StarIcon({ fill }: { fill: "full" | "half" | "empty" }) {
    if (fill === "full")
      return <Star className="w-8 h-8 text-amber-400 fill-amber-400 transition-colors" />;
    if (fill === "half")
      return (
        <span className="relative inline-block w-8 h-8">
          <Star className="w-8 h-8 text-slate-300" />
          <span className="absolute inset-0 w-1/2 overflow-hidden">
            <Star className="w-8 h-8 text-amber-400 fill-amber-400" />
          </span>
        </span>
      );
    return <Star className="w-8 h-8 text-slate-300 transition-colors" />;
  }
  const [errors, setErrors] = useState<{ email_or_phone?: string; stars?: string }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [apiError, setApiError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [id]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErrors: { email_or_phone?: string; stars?: string } = {};
    if (!form.email_or_phone.trim()) newErrors.email_or_phone = "Email or phone is required.";
    if (stars === 0) newErrors.stars = "Please select a star rating.";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setApiError("");
    try {
      const { error } = await supabase.from("ratings").insert({
        name: form.name.trim() || null,
        subject: form.subject.trim() || null,
        email_or_phone: form.email_or_phone.trim(),
        comment: form.comment.trim() || null,
        stars,
      });
      if (error) throw error;
      setIsSubmitted(true);
    } catch (err: unknown) {
      setApiError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="pb-24">
      <div className="bg-brand-blue py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Rate Our Service</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Share your experience and help us improve.
        </p>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-2xl">
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-2xl font-bold text-brand-blue mb-6">Leave a Review</h3>
          {isSubmitted ? (
            <div className="bg-green-50 text-green-800 border border-green-200 p-6 rounded-xl text-center">
              <h4 className="font-bold text-lg mb-2">Thank You!</h4>
              <p>Your review has been submitted. We appreciate your feedback.</p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => { setIsSubmitted(false); setForm(EMPTY_FORM); setStars(0); }}
              >
                Submit Another Review
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-1" onMouseLeave={() => setHovered(0)}>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onMouseMove={(e) => setHovered(halfVal(e, n))}
                      onClick={(e) => {
                        setStars(halfVal(e, n));
                        setErrors((prev) => ({ ...prev, stars: undefined }));
                      }}
                      className="p-1 focus:outline-none"
                    >
                      <StarIcon fill={starFill(n, hovered || stars)} />
                    </button>
                  ))}
                </div>
                {errors.stars && <p className="text-sm text-red-500">{errors.stars}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-slate-700">
                  Your Name <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <Input id="name" value={form.name} onChange={handleChange} placeholder="John Doe" />
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="text-sm font-medium text-slate-700">
                  Subject <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <Input id="subject" value={form.subject} onChange={handleChange} placeholder="e.g. Air Freight Service" />
              </div>

              <div className="space-y-1">
                <label htmlFor="email_or_phone" className="text-sm font-medium text-slate-700">
                  Email or Phone <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email_or_phone"
                  value={form.email_or_phone}
                  onChange={handleChange}
                  placeholder="john@example.com or +971 50 ..."
                />
                {errors.email_or_phone && <p className="text-sm text-red-500">{errors.email_or_phone}</p>}
              </div>

              <div className="space-y-1">
                <label htmlFor="comment" className="text-sm font-medium text-slate-700">
                  Comment <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <Textarea
                  id="comment"
                  value={form.comment}
                  onChange={handleChange}
                  placeholder="Tell us about your experience..."
                  className="min-h-[120px]"
                />
              </div>

              {apiError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">{apiError}</p>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Review"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
