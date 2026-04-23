import { Plane, Ship, Truck, PackageCheck, Box } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

const allServices = [
  {
    id: "air-freight",
    icon: <Plane className="w-12 h-12 text-brand-orange" />,
    title: "Air Cargo Services",
    description: "When time is of the essence, our air freight services deliver. We offer expedited, standard, and deferred air shipping options globally.",
    benefits: ["Fastest transit times", "Global reach", "High security level", "Real-time tracking access"]
  },
  {
    id: "sea-freight",
    icon: <Ship className="w-12 h-12 text-brand-orange" />,
    title: "Sea Freight Services",
    description: "Ideal for large, heavy shipments. We handle FCL (Full Container Load) and LCL (Less than Container Load) across major shipping lanes.",
    benefits: ["Cost-effective for bulk", "Eco-friendly option", "Accommodates heavy/large goods", "Flexible scheduling"]
  },
  {
    id: "land-transport",
    icon: <Truck className="w-12 h-12 text-brand-orange" />,
    title: "Land Transportation",
    description: "Robust domestic and cross-border trucking throughout the GCC. Dedicated trucks, LTL, and specialized transport available.",
    benefits: ["Door-to-door flexibility", "Cross-border clearing", "GPS tracked vehicles", "Diverse fleet availability"]
  },
  {
    id: "door-to-door",
    icon: <PackageCheck className="w-12 h-12 text-brand-orange" />,
    title: "Door-to-Door Delivery",
    description: "Complete hands-off experience. We pick up from the source and deliver straight to the recipient's doorstep, managing all customs.",
    benefits: ["Ultimate convenience", "Single point of contact", "All-inclusive pricing", "Customs clearance included"]
  },
  {
    id: "packaging",
    icon: <Box className="w-12 h-12 text-brand-orange" />,
    title: "Professional Packaging",
    description: "Ensure your items survive the journey. We offer industrial, fragile, and standard packaging solutions using high-quality materials.",
    benefits: ["Damage prevention", "Compliance with transport rules", "Custom crating options", "Temperature controlled packing"]
  }
];

export function Services() {
  return (
    <div className="pb-24">
      {/* Page Header */}
      <div className="bg-brand-blue py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Our Services</h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto">
          Tailored logistics and cargo solutions to move your business forward.
        </p>
      </div>

      <div className="container mx-auto px-4 mt-16 max-w-5xl">
        <div className="space-y-16">
          {allServices.map((service, idx) => (
             <div 
               key={service.id} 
               className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 items-center`}
             >
                <div className="w-full md:w-1/2 bg-slate-100 rounded-3xl aspect-[4/3] flex items-center justify-center p-10 relative overflow-hidden group">
                   <div className="absolute inset-0 bg-brand-blue opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                   <div className="transform group-hover:scale-110 transition-transform duration-500">
                     {service.icon}
                     <div className="mt-4 w-24 h-24 mx-auto border-4 border-brand-orange/20 rounded-full flex items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 animate-[spin_10s_linear_infinite]"></div>
                   </div>
                </div>
                
                <div className="w-full md:w-1/2 space-y-6">
                  <h2 className="text-3xl font-bold text-brand-blue">{service.title}</h2>
                  <p className="text-lg text-slate-600 leading-relaxed">{service.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-3 uppercase tracking-wider text-sm">Key Benefits</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center space-x-2 text-slate-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-orange"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <Link to="/quote">
                      <Button variant="outline">Request Service</Button>
                    </Link>
                  </div>
                </div>
             </div>
          ))}
        </div>
      </div>
      
      {/* Footer CTA */}
      <div className="container mx-auto px-4 mt-24">
        <div className="bg-slate-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-10"><Plane size={200} /></div>
           <h3 className="text-3xl md:text-4xl font-bold mb-4 relative z-10">Unsure which service you need?</h3>
           <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto relative z-10">Our logistics experts are ready to analyze your requirements and suggest the most efficient solution.</p>
           <Link to="/contact" className="relative z-10">
             <Button size="lg" className="bg-brand-orange hover:bg-orange-600 text-white border-0">Contact Our Experts</Button>
           </Link>
        </div>
      </div>
    </div>
  );
}
