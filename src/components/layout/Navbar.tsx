import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, Menu, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";
import { useAuth } from "../../contexts/AuthContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
  { name: "Tracking", path: "/tracking" },
  { name: "Contact", path: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50 transition-all duration-300"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-brand-blue flex items-center justify-center rounded-lg">
              <Package size={24} className="text-white group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-brand-blue">CARGO<span className="text-brand-orange">PEAK</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm uppercase tracking-wider">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "hover:text-brand-blue transition-colors",
                  location.pathname === link.path ? "text-brand-orange" : "text-slate-900"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/quote">
              <Button variant="secondary" size="sm">
                Get a Quote
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <span className="text-[10px] text-slate-500 max-w-[120px] truncate normal-case tracking-normal font-normal">
                    {user.email}
                  </span>
                  <Button variant="ghost" size="sm" onClick={() => signOut()}>
                    Sign Out
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/auth?mode=signin">
                    <Button variant="ghost" size="sm">Sign In</Button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <Button variant="primary" size="sm">Sign Up</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-brand-blue p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100">
          <nav className="flex flex-col p-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "px-4 py-2 text-base font-medium transition-colors rounded-md hover:bg-slate-50",
                  location.pathname === link.path ? "text-brand-orange bg-orange-50" : "text-slate-600"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/quote" className="w-full">
              <Button variant="primary" className="w-full">Get a Quote</Button>
            </Link>
            {user ? (
              <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2 px-4">
                <span className="text-sm text-slate-500 truncate">{user.email}</span>
                <Button variant="ghost" size="sm" onClick={() => signOut()}>Sign Out</Button>
              </div>
            ) : (
              <div className="flex gap-3 border-t border-slate-100 pt-4 mt-2">
                <Link to="/auth?mode=signin" className="flex-1">
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/auth?mode=signup" className="flex-1">
                  <Button variant="primary" className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
