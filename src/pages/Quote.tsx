import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { CheckCircle2 } from "lucide-react";

export function Quote() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle form submission would go here
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-20 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 max-w-md w-full text-center">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-brand-blue mb-2">Quote Requested!</h2>
          <p className="text-slate-600 mb-8">
            Thank you for reaching out. One of our logistics experts will review your details and get back to you with a quote within 24 hours.
          </p>
          <Button onClick={() => setIsSubmitted(false)} className="w-full">
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
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Personal Details */}
            <div>
              <h3 className="text-lg font-semibold text-brand-blue mb-4 border-b border-slate-100 pb-2">1. Your Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                  <Input id="name" required placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-slate-700">Company (Optional)</label>
                  <Input id="company" placeholder="Example LLC" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                  <Input id="email" type="email" required placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</label>
                  <Input id="phone" type="tel" required placeholder="+971 50 123 4567" />
                </div>
              </div>
            </div>

            {/* Shipment Route */}
            <div>
              <h3 className="text-lg font-semibold text-brand-blue mb-4 border-b border-slate-100 pb-2">2. Route</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="pickup" className="text-sm font-medium text-slate-700">Pickup Location (City, Country)</label>
                  <Input id="pickup" required placeholder="Dubai, UAE" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="destination" className="text-sm font-medium text-slate-700">Delivery Destination (City, Country)</label>
                  <Input id="destination" required placeholder="London, UK" />
                </div>
              </div>
            </div>

            {/* Shipment Details */}
            <div>
              <h3 className="text-lg font-semibold text-brand-blue mb-4 border-b border-slate-100 pb-2">3. Shipment Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-medium text-slate-700">Service Type</label>
                  <select 
                    id="type" 
                    className="flex h-12 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    required
                  >
                    <option value="">Select Service...</option>
                    <option value="air">Air Freight</option>
                    <option value="sea">Sea Freight</option>
                    <option value="land">Land Transport</option>
                    <option value="door">Door-to-Door Delivery</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="weight" className="text-sm font-medium text-slate-700">Approx. Total Weight (kg)</label>
                  <Input id="weight" type="number" required placeholder="150" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700">Additional Information / Dimensions</label>
                <Textarea 
                  id="message" 
                  placeholder="Please provide any specific requirements, dimensions (L x W x H), or nature of goods..." 
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <Button type="submit" size="lg" className="w-full md:w-auto px-12">
                Submit Request
              </Button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
