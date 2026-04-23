import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Textarea } from "../components/ui/Textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export function Contact() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
  };

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
                  <p className="text-slate-600">Al Quoz Industrial Area 3<br />P.O. Box 12345<br />Dubai, United Arab Emirates</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-brand-orange/10 p-3 rounded-full text-brand-orange shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1">Phone</h4>
                  <p className="text-slate-600">+971 50 123 4567<br />+971 4 123 4567 (Landline)</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-brand-orange/10 p-3 rounded-full text-brand-orange shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg mb-1">Email</h4>
                  <p className="text-slate-600">info@cargopeak.ae<br />support@cargopeak.ae</p>
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

            {/* Map Placeholder */}
            <div className="bg-slate-200 rounded-2xl h-64 w-full flex items-center justify-center overflow-hidden relative">
               <div className="absolute inset-0 opacity-10 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Dubai&zoom=10&size=600x300&maptype=roadmap')] bg-cover bg-center"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm text-center">
                   <MapPin className="text-brand-orange mx-auto mb-2" />
                   <p className="font-semibold text-brand-blue">Interactive Map Unavailable in Preview</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100">
            <h3 className="text-2xl font-bold text-brand-blue mb-6">Send a Message</h3>
            {isSent ? (
               <div className="bg-green-50 text-green-800 border border-green-200 p-6 rounded-xl text-center">
                 <h4 className="font-bold text-lg mb-2">Message Sent!</h4>
                 <p>Thank you for contacting us. We will get back to you shortly.</p>
                 <Button variant="outline" className="mt-6" onClick={() => setIsSent(false)}>Send Another Message</Button>
               </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700">Your Name</label>
                  <Input id="name" required placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                  <Input id="email" type="email" required placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-slate-700">Subject</label>
                  <Input id="subject" required placeholder="How can we help?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                  <Textarea id="message" required placeholder="Write your message here..." className="min-h-[150px]" />
                </div>
                <Button type="submit" size="lg" className="w-full">
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
