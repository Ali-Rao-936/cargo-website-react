import { useState, useEffect, useRef } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { CheckCircle2, Phone, Mail } from "lucide-react";
import { Button } from "../components/ui/Button";

// ─── Image config ────────────────────────────────────────────────────────────
const HERO_IMAGES: Record<string, string> = {
  "saudi-arabia": "/images/cargo_saudi.jpg",
  "qatar":        "/images/cargo_qatar.jpg",
  "oman":         "/images/cargo_oman.jpg",
  "kuwait":       "/images/cargo_kuwait.jpg",
  "bahrain":      "/images/cargo_bahrain.jpg",
  "iraq":         "/images/cargo_iraq.jpg",
  "canada":       "/images/cargo_canada.jpg",
  "russia":       "/images/cargo_russia.jpg",
};

const GCC_SLUGS = new Set(["saudi-arabia", "qatar", "oman", "kuwait", "bahrain", "iraq"]);
const MID_GCC        = "/images/mid_gcc.png";
const MID_LONGHAUL   = "/images/mid_no_gcc.png";
const CAR_CARGO_IMG      = "/images/car_cargo.png";
const CONTACT_WIDGET_IMG = "/images/contact_widget.png";

// ─── FadeImg helper ──────────────────────────────────────────────────────────

function FadeImg({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // If the browser already has the image cached, onLoad won't fire — check here.
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => setLoaded(true)}
      className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
    />
  );
}

// ─── Page data ───────────────────────────────────────────────────────────────

type CountryData = {
  name: string;
  flag: string;
  intro: string;
};

const COUNTRIES: Record<string, CountryData> = {
  "saudi-arabia": {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    intro:
      "Saudi Arabia is the UAE's largest trade partner, with billions of dollars exchanged annually across all transport modes. Whether you're shipping commercial goods, household effects, or vehicles, CargoPeak provides fast, compliant, and cost-effective logistics between Dubai and the Kingdom.",
  },
  "qatar": {
    name: "Qatar",
    flag: "🇶🇦",
    intro:
      "Qatar's Vision 2030 has driven rapid growth in bilateral trade with the UAE, fueling strong demand for construction materials, furniture, and vehicle shipping. CargoPeak offers reliable freight to Doha and beyond, with experienced customs support at both ends.",
  },
  "oman": {
    name: "Oman",
    flag: "🇴🇲",
    intro:
      "Oman's growing expat community and strong ties with the UAE drive consistent demand for personal effects, household goods, and vehicle shipping. CargoPeak makes shipping to Oman straightforward and reliable via road, air, and sea.",
  },
  "kuwait": {
    name: "Kuwait",
    flag: "🇰🇼",
    intro:
      "Kuwait has one of the largest UAE expat communities in the GCC, generating consistent demand for personal effects, household goods, and commercial cargo. CargoPeak offers road, air, and sea freight between Dubai and Kuwait City with full customs clearance support.",
  },
  "bahrain": {
    name: "Bahrain",
    flag: "🇧🇭",
    intro:
      "Bahrain is part of a well-established GCC road freight corridor connected via the King Fahd Causeway. CargoPeak serves this active trade route with reliable road, air, and sea freight for both personal and commercial cargo.",
  },
  "iraq": {
    name: "Iraq",
    flag: "🇮🇶",
    intro:
      "Iraq is a significant commercial cargo destination from the UAE, with strong demand for construction equipment, consumer goods, and industrial supplies. CargoPeak's experienced team navigates Iraq's documentation-heavy customs environment to ensure timely, compliant deliveries.",
  },
  "canada": {
    name: "Canada",
    flag: "🇨🇦",
    intro:
      "Canada is a popular long-haul destination for the UAE's South Asian and Arab diaspora communities, with consistent demand for personal effects, household goods, and commercial cargo. CargoPeak offers air and sea freight from Dubai to major Canadian cities.",
  },
  "russia": {
    name: "Russia",
    flag: "🇷🇺",
    intro:
      "CargoPeak provides air and sea freight between Dubai and Russia, with a specialist team experienced in Russia's complex customs and documentation requirements. We handle commercial cargo and personal effects with full compliance support at both origin and destination.",
  },
};

const regularCargoTypes = [
  {
    title: "Commercial Cargo",
    description: "Business goods, machinery parts, electronics, and industrial supplies shipped with full commercial documentation.",
  },
  {
    title: "Personal Effects",
    description: "Clothing, documents, and non-commercial personal belongings packed and shipped with care.",
  },
  {
    title: "Household Furniture",
    description: "Sofas, beds, appliances, kitchen equipment, and packed household boxes for relocations.",
  },
  {
    title: "Auto Spare Parts",
    description: "Engine parts, body panels, and automotive accessories shipped with proper classification and documentation.",
  },
];

const whyPoints = [
  "Expert Team",
  "On-Time Delivery",
  "Customs Clearance Support",
  "Real-Time Tracking",
];

// ─── Page component ──────────────────────────────────────────────────────────

export function CountryCargoPage() {
  const { country } = useParams<{ country: string }>();
  const data = COUNTRIES[country ?? ""];

  if (!data) return <Navigate to="/services" replace />;

  const heroImg   = HERO_IMAGES[country ?? ""] ?? HERO_IMAGES["saudi-arabia"];
  const midImg    = GCC_SLUGS.has(country ?? "") ? MID_GCC : MID_LONGHAUL;
  const midAlt    = GCC_SLUGS.has(country ?? "")
    ? "Road freight trucks at a UAE border crossing checkpoint"
    : "Cargo container ship in open ocean, aerial view";

  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-brand-blue text-center">
        <div className="max-w-3xl mx-auto pt-20 pb-10 px-4">
          <span className="text-6xl mb-6 block">{data.flag}</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Cargo to {data.name} from Dubai
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed mb-10">{data.intro}</p>
          
        </div>

        {/* Hero banner image */}
        <div className="w-full overflow-hidden">
          <FadeImg
            src={heroImg}
            alt={`Cargo to ${data.name} from Dubai — freight logistics`}
            className="w-full h-64 md:h-[500px] object-cover"
          />
        </div>
      </section>

      {/* ── Mid-page image ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="w-full overflow-hidden"
      >
        <FadeImg
          src={midImg}
          alt={midAlt}
          className="w-full h-56 md:h-[400px] object-cover"
        />
      </motion.div>

      {/* ── Cargo Types ──────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-brand-light">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-brand-blue mb-3">What Can We Ship?</h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              We handle a wide range of cargo types for both personal and commercial shipments to {data.name}.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Regular cargo type cards */}
            {regularCargoTypes.map((ct, idx) => (
              <motion.div
                key={ct.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (idx % 3) * 0.08 }}
                className="bg-white border border-slate-200 rounded-2xl p-5"
              >
                <h3 className="font-bold text-brand-blue mb-2">{ct.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{ct.description}</p>
              </motion.div>
            ))}

            {/* Car & Vehicle Shipping — wider card with image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.16 }}
              className="sm:col-span-2 lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row gap-4 overflow-hidden"
            >
              <div className="flex-1">
                <h3 className="font-bold text-brand-blue mb-2">Car & Vehicle Shipping</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Sedans, SUVs, motorcycles, and trucks shipped via RO-RO or enclosed container. Full
                  insurance, export documentation, and destination delivery coordination included.
                </p>
              </div>
              <div className="hidden md:block w-48 lg:w-64 flex-shrink-0 rounded-xl overflow-hidden">
                <FadeImg
                  src={CAR_CARGO_IMG}
                  alt="Car being loaded onto a RoRo vessel at Dubai port"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Contact Widget ───────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: contact info card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-brand-blue rounded-2xl p-8 flex flex-col gap-6"
          >
            <h2 className="text-2xl font-bold text-white">Ship with Confidence</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Our Dubai-based cargo specialists are ready to help you move your goods to {data.name}
              quickly, safely, and at competitive rates.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+971508819829"
                className="flex items-center gap-3 text-slate-200 hover:text-brand-orange transition-colors"
              >
                <Phone className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <span className="text-sm font-medium">+971 50 881 9829</span>
              </a>
              <a
                href="mailto:info@cargopeakuae.com"
                className="flex items-center gap-3 text-slate-200 hover:text-brand-orange transition-colors"
              >
                <Mail className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <span className="text-sm font-medium">info@cargopeakuae.com</span>
              </a>
            </div>
            <Link to="/quote" className="mt-2">
              <Button variant="primary" size="md">Get a Free Quote</Button>
            </Link>
          </motion.div>

          {/* Right: portrait image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl h-[350px] md:h-[478px]"
          >
            <FadeImg
              src={CONTACT_WIDGET_IMG}
              alt="Professional CargoPeak logistics specialist"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Why CargoPeak ────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-brand-blue py-14 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-white font-bold text-2xl mb-10 uppercase tracking-widest">
            Why Ship with CargoPeak
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {whyPoints.map((label) => (
              <div key={label} className="flex items-center gap-3">
                <CheckCircle2 className="w-7 h-7 text-brand-orange flex-shrink-0" />
                <span className="text-white font-semibold text-lg">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900 py-20 px-4 text-center"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get a Free Quote to {data.name}
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Speak with our cargo experts or request a tailored quote online in minutes.
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
