import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Search, Package, Navigation, CheckCircle2, MapPin, Plane } from "lucide-react";
import { cn } from "../lib/utils";

// Mock Data
const MOCK_TRACKING_DATA = {
  status: "In Transit",
  estimatedDelivery: "Oct 25, 2026",
  origin: "Dubai, UAE",
  destination: "London, UK",
  carrier: "Air Cargo Express",
  timeline: [
    { date: "Oct 23, 2026 - 08:30 AM", location: "Dubai Intl Airport (DXB)", status: "Departed Origin Facility", completed: true },
    { date: "Oct 22, 2026 - 15:45 PM", location: "Al Quoz Hub, Dubai", status: "Customs Cleared", completed: true },
    { date: "Oct 22, 2026 - 09:00 AM", location: "Al Quoz Hub, Dubai", status: "Processed at Hub", completed: true },
    { date: "Oct 21, 2026 - 14:20 PM", location: "Dubai, UAE", status: "Shipment Picked Up", completed: true },
  ]
};

export function Tracking() {
  const [trackingNumber, setTrackingNumber] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [result, setResult] = useState<typeof MOCK_TRACKING_DATA | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setResult(MOCK_TRACKING_DATA);
      setIsSearching(false);
    }, 800);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center bg-brand-light py-20 px-4">
      <div className="w-full max-w-3xl text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-brand-blue mb-4">Track Your Shipment</h1>
        <p className="text-slate-600">Enter your tracking number below to get real-time updates.</p>
      </div>

      <div className="w-full max-w-3xl bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 mb-8">
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <Input 
              className="pl-12 h-14 text-lg bg-slate-50 border-slate-200" 
              placeholder="Enter Tracking Number (e.g., CP-8475839)" 
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg" className="h-14 px-8 text-lg" disabled={isSearching}>
            {isSearching ? "Searching..." : "Track Now"}
          </Button>
        </form>
      </div>

      {result && (
        <div className="w-full max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            
            {/* Header Info */}
            <div className="bg-brand-blue p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-brand-orange text-sm font-semibold uppercase tracking-wider mb-1">Tracking Number</p>
                <p className="text-2xl font-mono">{trackingNumber || "CP-8475839"}</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 min-w-[200px]">
                <p className="text-slate-400 text-sm mb-1">Estimated Delivery</p>
                <p className="text-xl font-semibold text-white">{result.estimatedDelivery}</p>
              </div>
            </div>

            {/* Route Summary */}
            <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between text-brand-blue font-semibold">
               <div className="flex items-center gap-3">
                 <div className="bg-slate-100 p-2 rounded-full"><MapPin size={20} /></div>
                 <span>{result.origin}</span>
               </div>
               <div className="border-t-2 border-dashed border-slate-300 flex-grow mx-4 relative">
                 <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400" size={20} />
               </div>
               <div className="flex items-center gap-3">
                 <span>{result.destination}</span>
                 <div className="bg-slate-100 p-2 rounded-full"><Package size={20} /></div>
               </div>
            </div>

            {/* Timeline */}
            <div className="p-6 md:p-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-6 flex items-center gap-2">
                <Navigation size={20} className="text-brand-orange" />
                Tracking History
              </h3>
              
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[15px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                {result.timeline.map((event, index) => (
                  <div key={index} className="relative flex items-start justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div
                         className={cn(
                           "flex items-center justify-center w-8 h-8 rounded-full border-4 border-white shadow shrink-0 z-10 ml-0 md:mx-auto md:order-1",
                           event.completed ? "bg-brand-orange text-white" : "bg-slate-200 text-slate-400"
                         )}>
                      {event.completed && <CheckCircle2 size={16} />}
                    </div>
                    
                    <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] pl-4 md:pl-0 md:group-even:pr-8 md:group-odd:pl-8 md:text-right md:group-even:text-left">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between mb-1 gap-2 md:block">
                          <h4 className="font-bold text-slate-800">{event.status}</h4>
                          <span className="text-xs font-semibold text-slate-500 bg-slate-200/50 px-2 py-1 rounded inline-block w-fit">{event.date}</span>
                        </div>
                        <p className="text-sm text-slate-600 mt-2 flex items-center gap-1 md:justify-end md:group-even:justify-start">
                          <MapPin size={14} /> {event.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
