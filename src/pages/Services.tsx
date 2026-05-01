import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Plane, Ship, Truck, Home, PackageOpen, Package,
  FileCheck2, Building2, Zap, Car, Cog, ShoppingCart,
  CheckCircle2, ChevronDown, ArrowRight,
} from "lucide-react";
import { Button } from "../components/ui/Button";

const services = [
  {
    icon: Plane,
    title: "Air Cargo Services",
    description:
      "Fast and reliable international air freight for time-sensitive shipments. We offer expedited, standard, and deferred options with real-time tracking to all major global destinations.",
  },
  {
    icon: Ship,
    title: "Sea Cargo Services (FCL & LCL)",
    description:
      "Cost-effective ocean freight for bulk and oversized cargo. We handle Full Container Load (FCL) and Less than Container Load (LCL) shipments across major global shipping lanes.",
  },
  {
    icon: Truck,
    title: "Road Cargo (GCC Countries)",
    description:
      "Comprehensive road freight across the UAE, Saudi Arabia, Oman, Kuwait, Bahrain, and Qatar. GPS-tracked vehicles, cross-border clearance, and FTL/LTL options available.",
  },
  {
    icon: Home,
    title: "Door-to-Door Cargo",
    description:
      "End-to-end logistics from pickup to final delivery with zero hassle. We manage collection, customs clearance, and doorstep delivery under a single all-inclusive price.",
  },
  {
    icon: PackageOpen,
    title: "Packing & Relocation",
    description:
      "Professional packing using industry-grade materials to protect your belongings in transit. We handle residential relocations, office moves, and custom crating for fragile items.",
  },
  {
    icon: Package,
    title: "Personal & Commercial Cargo",
    description:
      "Whether you're sending personal effects or commercial goods, we offer flexible solutions tailored to individual and business shipping needs across the UAE and beyond.",
  },
  {
    icon: FileCheck2,
    title: "Customs Clearance",
    description:
      "Expert customs brokerage ensuring your shipments comply with UAE and international trade regulations. We handle documentation, duties, and liaise directly with customs authorities.",
  },
  {
    icon: Building2,
    title: "Warehouse & Storage",
    description:
      "Secure short-term and long-term storage in Dubai. Climate-controlled options for temperature-sensitive goods, with full inventory management and pick-and-pack services.",
  },
  {
    icon: Zap,
    title: "Express & Urgent Cargo",
    description:
      "When every hour matters, our express service prioritizes your shipment at every stage. Same-day and next-day delivery options available within the UAE.",
  },
  {
    icon: Car,
    title: "Vehicle & Car Shipping",
    description:
      "Safe and insured vehicle transport locally and internationally. We handle sedans, SUVs, motorcycles, and heavy vehicles via RO-RO and container shipping.",
  },
  {
    icon: Cog,
    title: "Project & Heavy Equipment Logistics",
    description:
      "Specialized logistics for construction machinery, industrial equipment, and oversized cargo. We coordinate permits, escorts, and heavy-lift transport for complex projects.",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce Cargo & Fulfillment",
    description:
      "Complete fulfillment for online sellers — storage, order picking, packing, and last-mile delivery to your customers across the UAE and GCC.",
  },
];

const trustBadges = [
  "Expert Team",
  "On-Time Delivery",
  "Competitive Rates",
  "Free Quote",
];

const faqs = [
  {
    question: "What international destinations do you ship to?",
    answer:
      "We ship to over 150 countries worldwide, with established routes across the Middle East, Asia, Europe, Africa, and the Americas. Our team has deep expertise in UAE customs and international trade regulations, ensuring smooth delivery to any destination.",
  },
  {
    question: "How long does customs clearance take in Dubai?",
    answer:
      "Standard customs clearance in Dubai typically takes 1–3 business days for properly documented shipments. Clearance time depends on the type of goods, country of origin, and completeness of documentation. Our customs team proactively prepares all paperwork to minimize delays.",
  },
  {
    question: "Can you ship my car or motorcycle internationally?",
    answer:
      "Yes, we specialize in international vehicle shipping using both RO-RO (Roll-on Roll-off) and container methods. We handle all export documentation, customs formalities, and coordinate with receiving agents at the destination country. Your vehicle is fully insured throughout transit.",
  },
  {
    question: "Do you offer packing materials and professional packing?",
    answer:
      "Absolutely. Our professional packing team uses high-quality materials including double-walled cartons, bubble wrap, foam padding, and custom wooden crates for fragile or high-value items. We also offer wardrobe boxes, mattress bags, and electronics packaging for household moves.",
  },
  {
    question: "How does your e-commerce fulfillment service work?",
    answer:
      "We receive your inventory at our Dubai warehouse, store it securely, and fulfill orders on your behalf. When an order is placed, our team picks, packs, and ships directly to your customer. We provide tracking updates at every step and can integrate with major e-commerce platforms.",
  },
];

const destinations = [
  { flag: "🇸🇦", name: "Saudi Arabia", slug: "saudi-arabia" },
  { flag: "🇶🇦", name: "Qatar",        slug: "qatar" },
  { flag: "🇴🇲", name: "Oman",         slug: "oman" },
  { flag: "🇰🇼", name: "Kuwait",       slug: "kuwait" },
  { flag: "🇧🇭", name: "Bahrain",      slug: "bahrain" },
  { flag: "🇮🇶", name: "Iraq",         slug: "iraq" },
  { flag: "🇨🇦", name: "Canada",       slug: "canada" },
  { flag: "🇷🇺", name: "Russia",       slug: "russia" },
];

export function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-brand-blue py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Our Cargo & Shipping Services
          </h1>
          <p className="text-slate-300 text-lg mb-10 leading-relaxed">
            Dubai's trusted logistics partner for air, sea, and road cargo across the UAE and GCC.
            Reliable. Competitive. On time.
          </p>
          <Link to="/quote">
            <Button variant="primary" size="lg">Get a Free Quote</Button>
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">What We Offer</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              From urgent air freight to full-service warehousing — we cover every leg of your supply chain.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: (idx % 3) * 0.1 }}
                  className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 hover:border-brand-orange transition-all duration-300 group"
                >
                  <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-orange/10 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-brand-orange" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-blue mb-2">{service.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us Strip */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-brand-blue py-14 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-white font-bold text-2xl mb-10 uppercase tracking-widest">
            Why Choose CargoPeak
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {trustBadges.map((label) => (
              <div key={label} className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-brand-orange flex-shrink-0" />
                <span className="text-white font-semibold text-lg">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-brand-light">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500">
              Everything you need to know about shipping with CargoPeak.
            </p>
          </motion.div>

          <div className="border-t border-slate-200">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-slate-200">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                >
                  <span className="font-semibold text-brand-blue text-base">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-orange flex-shrink-0 transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="pb-5 text-slate-600 text-sm leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links — Country Destinations */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-brand-blue mb-4">
              Ship to Any Destination
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Explore our dedicated cargo routes from Dubai to top destinations across the GCC and beyond.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {destinations.map((dest, idx) => (
              <motion.div
                key={dest.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: (idx % 4) * 0.08 }}
              >
                <Link
                  to={`/services/cargo-to/${dest.slug}`}
                  className="flex flex-col gap-3 bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-lg hover:-translate-y-1 hover:border-brand-orange transition-all duration-300 group"
                >
                  <span className="text-4xl">{dest.flag}</span>
                  <div className="flex-1">
                    <p className="font-bold text-brand-blue text-base">{dest.name}</p>
                    <p className="text-slate-400 text-xs mt-1">Fast & reliable cargo from Dubai</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900 py-20 px-4 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Ship with CargoPeak?
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Get a free quote today or speak directly with our cargo experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+971508819829">
              <Button variant="primary" size="lg">Call Now</Button>
            </a>
            <Link to="/quote">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white bg-transparent hover:bg-white/10 hover:text-white"
              >
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
