import { useEffect, useState } from "react";
import { Plane, Ship, Truck, PackageCheck, BarChart3, Clock, ShieldCheck, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { supabase } from "../lib/supabase";
import { cn } from "../lib/utils";

const services = [
  {
    icon: <Plane className="w-10 h-10 text-brand-orange" />,
    title: "Air Freight",
    description: "Fastest delivery for your urgent shipments worldwide. Reliable and secure air cargo solutions."
  },
  {
    icon: <Ship className="w-10 h-10 text-brand-orange" />,
    title: "Sea Freight",
    description: "Cost-effective shipping for large volumes. FCL and LCL options available across all major ports."
  },
  {
    icon: <Truck className="w-10 h-10 text-brand-orange" />,
    title: "Land Transport",
    description: "Comprehensive road freight network within the UAE and across the GCC for flexible deliveries."
  },
  {
    icon: <PackageCheck className="w-10 h-10 text-brand-orange" />,
    title: "Door-to-Door",
    description: "Hassle-free shipping from pickup to final delivery. We handle customs and paperwork."
  }
];

const stats = [
  { value: "15+", label: "Years Experience" },
  { value: "10k+", label: "Deliveries Monthly" },
  { value: "50+", label: "Countries Served" },
  { value: "99%", label: "On-Time Rate" },
];

export function Home() {
  const [avgStars, setAvgStars] = useState<number | null>(null);
  const [reviewCount, setReviewCount] = useState(0);

  useEffect(() => {
    supabase.from("ratings").select("stars").then(({ data }) => {
      if (data && data.length > 0) {
        setReviewCount(data.length);
        setAvgStars(data.reduce((sum, r) => sum + r.stars, 0) / data.length);
      }
    });
  }, []);

  return (
    <div className="flex flex-col w-full">
      
      {/* Hero Section - High Density Split Layout */}
      <section className="flex flex-col lg:flex-row min-h-[600px] border-b border-slate-200">
        
        {/* Left: Value Proposition */}
        <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white border-r border-slate-200">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue px-3 py-1 rounded-full text-xs font-bold mb-6 tracking-wide uppercase self-start border border-blue-100">
            <span className="w-2 h-2 bg-brand-blue rounded-full animate-pulse"></span>
            Global Logistics Partner in UAE
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.05] mb-6">
             Fast & Reliable<br/>Cargo Services<br/><span className="text-brand-blue">from UAE</span>
          </h1>
          <p className="text-lg text-slate-500 max-w-md mb-10 leading-relaxed font-medium">
            Providing seamless Air, Sea, and Land shipping solutions. We bridge the distance with precision, security, and unmatched speed.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="border-l-4 border-brand-orange pl-4">
              <div className="text-2xl font-black text-slate-900">15k+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Delivered Items</div>
            </div>
            <div className="border-l-4 border-brand-blue pl-4">
              <div className="text-2xl font-black text-slate-900">120+</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Countries</div>
            </div>
            <div className="border-l-4 border-brand-blue pl-4">
              <div className="text-2xl font-black text-slate-900">24/7</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Support</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to="/quote" className="w-full sm:w-auto">
              <Button size="lg" className="w-full">
                Calculate Cost
              </Button>
            </Link>
            <Link to="/tracking" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" className="w-full">
                Track Shipment
              </Button>
            </Link>
          </div>
        </div>

        {/* Right: Quick Actions Container */}
        <div className="w-full lg:w-2/5 flex flex-col p-8 md:p-12 gap-6 bg-slate-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex-1">
             <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-slate-900">
               <PackageCheck className="w-5 h-5 text-brand-orange" />
               Express Services
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {services.slice(0, 4).map((service, index) => (
                 <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between hover:border-brand-blue transition-colors">
                   <div className="w-10 h-10 bg-white text-brand-blue rounded flex items-center justify-center mb-3 shadow-sm">
                     {service.icon}
                   </div>
                   <div>
                     <div className="font-bold text-sm tracking-tight text-slate-900">{service.title}</div>
                     <div className="text-[10px] text-slate-500 leading-tight mt-1 font-medium">{service.description.substring(0, 45)}...</div>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-2xl text-left mb-16">
             <div className="inline-flex items-center gap-2 bg-orange-50 text-brand-orange px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-wide uppercase border border-orange-100">
               <span className="w-2 h-2 bg-brand-orange rounded-full"></span>
               Our Expertise
             </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">Comprehensive Cargo Solutions</h2>
            <p className="text-slate-500 text-lg font-medium">We offer end-to-end logistics services tailored to meet your specific timeline and budget requirements.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="group p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-brand-blue transition-all duration-300">
                <div className="mb-6 w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                 <div className="inline-flex items-center gap-2 bg-blue-50 text-brand-blue px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-wide uppercase border border-blue-100">
                   Why CargoPeak?
                 </div>
                <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-6">Built on Trust & Precision</h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed">
                  We don't just move cargo; we deliver promises. Our dedicated team ensures your shipments arrive safely, on time, and within budget, no matter the destination.
                </p>
              </div>
              
              <ul className="space-y-4">
                {[
                  { icon: <Clock className="w-5 h-5 text-brand-orange" />, title: "Speed & Efficiency", desc: "Optimized routing for the fastest delivery times." },
                  { icon: <ShieldCheck className="w-5 h-5 text-brand-orange" />, title: "Reliability & Security", desc: "Top-tier insurance and secure handling protocols." },
                  { icon: <BarChart3 className="w-5 h-5 text-brand-orange" />, title: "Real-time Tracking", desc: "Full visibility of your shipment at every stage." },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white border border-slate-200">
                    <div className="bg-orange-50 p-2 rounded-lg">{item.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-xs text-slate-500 font-medium">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                 {stats.map((stat, idx) => (
                   <div key={idx} className="bg-brand-blue p-8 rounded-2xl shadow-lg shadow-brand-blue/20 text-center flex flex-col items-center justify-center aspect-square text-white">
                     <span className="text-4xl md:text-5xl font-black mb-2">{stat.value}</span>
                     <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">{stat.label}</span>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Ratings Section */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold mb-4 tracking-wide uppercase border border-amber-100">
            <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            Customer Reviews
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
            What Our Customers Say
          </h2>
          {avgStars !== null ? (
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <Star
                    key={n}
                    className={cn(
                      "w-7 h-7",
                      n <= Math.round(avgStars) ? "text-amber-400 fill-amber-400" : "text-slate-200"
                    )}
                  />
                ))}
              </div>
              <p className="text-2xl font-black text-slate-900">
                {avgStars.toFixed(1)} <span className="text-slate-400 font-normal text-lg">/ 5</span>
              </p>
              <p className="text-sm text-slate-500">{reviewCount} {reviewCount === 1 ? "review" : "reviews"}</p>
            </div>
          ) : (
            <p className="text-slate-500 mb-8">Be the first to leave a review!</p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/ratings/add">
              <Button size="lg">Rate Us</Button>
            </Link>
            <Link to="/ratings">
              <Button variant="outline" size="lg">View All Reviews</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-orange">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Ship with Us?</h2>
          <p className="text-orange-100 text-xl max-w-2xl mx-auto mb-10">Get a competitive quote today and experience logistics excellence.</p>
          <Link to="/quote">
            <Button size="lg" className="bg-white text-brand-orange hover:bg-slate-50 font-bold text-lg px-10">
              Get Your Free Quote
            </Button>
          </Link>
        </div>
      </section>
      
    </div>
  );
}
