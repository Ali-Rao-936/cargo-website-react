import { Link } from "react-router-dom";
import { Package, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-blue-950 text-white px-8 py-16 flex flex-col justify-between">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-white/10 flex items-center justify-center rounded-lg">
                <Package size={24} className="text-white group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">CARGO<span className="text-brand-orange">PEAK</span></span>
            </Link>
            <p className="text-sm leading-relaxed">
              Fast & Reliable Cargo Services from UAE. We provide air, sea, and land shipping solutions you can trust, delivered with speed and security.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-orange transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-brand-orange transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-brand-orange transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-brand-orange transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-bold text-blue-300 uppercase tracking-tighter mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link to="/about" className="hover:text-brand-orange transition-colors">About Us</Link></li>
              <li><Link to="/services" className="hover:text-brand-orange transition-colors">Our Services</Link></li>
              <li><Link to="/tracking" className="hover:text-brand-orange transition-colors">Track Shipment</Link></li>
              <li><Link to="/quote" className="hover:text-brand-orange transition-colors">Get a Quote</Link></li>
              <li><Link to="/contact" className="hover:text-brand-orange transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-[10px] font-bold text-blue-300 uppercase tracking-tighter mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm font-semibold">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-brand-orange shrink-0 mt-0.5" />
                <span>Al Quoz Industrial Area 2,<br />Dubai, United Arab Emirates</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-brand-orange shrink-0" />
                <span>+971 50 881 9829</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-brand-orange shrink-0" />
                <span>info@cargopeakuae.com</span>
              </li>
            </ul>
          </div>

          {/* Trust Badge */}
          <div>
            <h3 className="text-[10px] font-bold text-blue-300 uppercase tracking-tighter mb-4">Why Trust Us?</h3>
            <div className="bg-white/5 p-6 rounded-lg text-center">
               <ShieldCheck size={32} className="text-white mb-2 mx-auto" />
               <h4 className="text-white font-bold text-xl mb-1">15+ Years</h4>
               <p className="text-[10px] font-bold text-blue-300 uppercase">Of Excellence</p>
            </div>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-slate-700/50 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>&copy; {new Date().getFullYear()} CargoPeak Services. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
