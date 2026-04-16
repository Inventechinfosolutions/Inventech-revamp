import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [insightsOpen, setInsightsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [servicesMobileOpen, setServicesMobileOpen] = useState(false);
  const [insightsMobileOpen, setInsightsMobileOpen] = useState(false);

  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setServicesOpen(false);
    setInsightsOpen(false);
    setServicesMobileOpen(false);
    setInsightsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) {
      setServicesMobileOpen(false);
      setInsightsMobileOpen(false);
    }
  }, [isOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-navy-900/90 backdrop-blur-md py-0.5" : "bg-transparent py-1"}`}
    >
      <div className="container mx-auto max-w-[1400px] px-8 flex items-center justify-between mt-0 mb-2 md:mt-[25px] md:mb-[10px]">

        {/* Logo - Zoomed and Cropped to show only text and hide watermark */}
        <Link
          to="/"
          className="relative flex items-center overflow-hidden h-10 w-72 group"
        >
          <img
            src="/inventech-logo.png"
            alt="InvenTech"
            className="h-12 w-auto object-contain brightness-125 saturate-150 contrast-110 drop-shadow-[0_0_6px_rgba(14,165,233,0.35)]"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-300">
          <Link
            to="/"
            className={`neon-underline hover:text-white transition-all pb-1 ${isActive("/") ? "text-white active" : ""
              }`}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              className={`neon-underline hover:text-white transition-all pb-1 flex items-center gap-1 bg-transparent border-none cursor-pointer text-inherit font-inherit ${isActive("/services") || isActive("/consulting") ? "text-white active" : ""
                }`}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-0 mt-0 pt-2 w-80 bg-navy-900/95 backdrop-blur-lg border border-cyan-400/30 shadow-xl overflow-hidden py-2 z-50 rounded-none">
                <Link
                  to="/services"
                  onClick={() => setServicesOpen(false)}
                  className="block px-4 py-3 hover:bg-white/10 transition-colors cursor-pointer border-none"
                >
                  <div>
                    <div className="text-white font-semibold">IT Services</div>
                    <div className="text-gray-400 text-xs">Consulting Services We Provide</div>
                  </div>
                </Link>
                <Link
                  to="/consulting"
                  onClick={() => setServicesOpen(false)}
                  className="block px-4 py-3 hover:bg-white/10 transition-colors cursor-pointer border-none"
                >
                  <div>
                    <div className="text-white font-semibold">IT Consultancy</div>
                    <div className="text-gray-400 text-xs">Key Offerings & Managed IT</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/portfolio"
            className={`neon-underline hover:text-white transition-all pb-1 ${isActive("/portfolio") ? "text-white active" : ""
              }`}
          >
            Portfolio
          </Link>

          <Link
            to="/blog"
            className={`neon-underline hover:text-white transition-all pb-1 ${isActive("/blog") ? "text-white active" : ""
              }`}
          >
            Blog
          </Link>

          {/* Insights Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setInsightsOpen(true)}
            onMouseLeave={() => setInsightsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setInsightsOpen((v) => !v)}
              className={`neon-underline hover:text-white transition-all pb-1 flex items-center gap-1 bg-transparent border-none cursor-pointer text-inherit font-inherit ${isActive("/about") || isActive("/ceo-message") || isActive("/culture")
                ? "text-white active"
                : ""
                }`}
              aria-expanded={insightsOpen}
              aria-haspopup="true"
            >
              Insights
              <ChevronDown className="w-4 h-4" />
            </button>

            {insightsOpen && (
              <div className="absolute top-full right-0 mt-0 pt-2 w-64 bg-navy-900/95 backdrop-blur-lg border border-cyan-400/30 overflow-hidden py-2 z-50 rounded-none">
                <Link
                  to="/about"
                  onClick={() => setInsightsOpen(false)}
                  className="block px-4 py-3 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="text-white font-semibold">About Us</div>
                  <div className="text-gray-400 text-xs">Our Story & Mission</div>
                </Link>
                <Link
                  to="/ceo-message"
                  onClick={() => setInsightsOpen(false)}
                  className="block px-4 py-3 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="text-white font-semibold">CEO Message</div>
                  <div className="text-gray-400 text-xs">Vision & Leadership</div>
                </Link>
                <Link
                  to="/culture"
                  onClick={() => setInsightsOpen(false)}
                  className="block px-4 py-3 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div className="text-white font-semibold">Culture & Events</div>
                  <div className="text-gray-400 text-xs">Life at InvenTech</div>
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/contact"
            onClick={() => {
              // Handle scroll to footer if on same page, or navigate to home then scroll
            }}
            className={`neon-underline hover:text-white transition-all pb-1 ${isActive("/contact") ? "text-white active" : ""
              }`}
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-navy-900/95 backdrop-blur-lg border-t border-white/10 p-6 md:hidden z-50">
          <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left font-medium text-sm hover:text-white transition-all ${isActive("/") ? "text-white" : "text-gray-400"
                }`}
            >
              Home
            </Link>

            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => setServicesMobileOpen((v) => !v)}
                className="flex items-center justify-between w-full text-left font-medium text-sm text-gray-400 hover:text-white transition-colors py-1"
                aria-expanded={servicesMobileOpen}
              >
                <span>Services</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${servicesMobileOpen ? "rotate-180" : ""}`} />
              </button>
              {servicesMobileOpen && (
                <div className="pl-3 border-l-2 border-white/10 flex flex-col gap-3 mt-2">
                  <Link
                    to="/services"
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    IT Services
                  </Link>
                  <Link
                    to="/consulting"
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    IT Consultancy
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/portfolio"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left font-medium text-sm hover:text-white transition-all ${isActive("/portfolio") ? "text-white" : "text-gray-400"
                }`}
            >
              Portfolio
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left font-medium text-sm hover:text-white transition-all ${isActive("/blog") ? "text-white" : "text-gray-400"
                }`}
            >
              Blog
            </Link>

            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => setInsightsMobileOpen((v) => !v)}
                className="flex items-center justify-between w-full text-left font-medium text-sm text-gray-400 hover:text-white transition-colors py-1"
                aria-expanded={insightsMobileOpen}
              >
                <span>Insights</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${insightsMobileOpen ? "rotate-180" : ""}`} />
              </button>
              {insightsMobileOpen && (
                <div className="pl-3 border-l-2 border-white/10 flex flex-col gap-3 mt-2">
                  <Link
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </Link>
                  <Link
                    to="/ceo-message"
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    CEO Message
                  </Link>
                  <Link
                    to="/culture"
                    onClick={() => setIsOpen(false)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Culture & Events
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left font-medium text-sm hover:text-white transition-all ${isActive("/contact") ? "text-white" : "text-gray-400"
                }`}
            >
              Contact Us
            </Link>
          </nav>
        </div>
      )}
    </nav>
  );
}
