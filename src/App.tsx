import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedBy from "./components/TrustedBy";
import Projects from "./components/Projects";
// import Services from "./components/Services"; // Old component, replaced by page
import ServicesWeProvide from "./components/ServicesWeProvide";
import WhyPartner from "./components/WhyPartner";
import Metrics from "./components/Metrics";
import CEOMessage from "./components/CEOMessage";
import Awards from "./components/Awards";
import Footer from "./components/Footer";
import "./index.css";

// Pages
import ServicesPage from "./pages/Services";
import ConsultationPage from "./pages/Consultation";
import PortfolioPage from "./pages/Portfolio";
import BlogPage from "./pages/Blog";
import BlogArticlePage from "./pages/BlogArticle";
import AboutUsPage from "./pages/AboutUs";
import CEOMessagePage from "./pages/CEOMessage";
import CulturePage from "./pages/Culture";
import ContactPage from "./pages/Contact";
import CaseStudyKeonextPage from "./pages/CaseStudyKeonext";
import CaseStudyBdaPage from "./pages/CaseStudyBda";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Page transition wrapper
function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div
      key={location.pathname}
      className="animate-page-transition"
    >
      {children}
    </div>
  );
}

const WEB3FORMS_ACCESS_KEY = "b4071e2f-08a4-4391-84b2-272ea2bb3ac2";

// Contact Form Section Component
function ContactFormSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const submissionData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: `Home page enquiry from ${formData.name}`,
      from_name: "Inventech Portal",
      _template: "basic",
      _ip_address: "false",
    };
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(submissionData),
      });
      const result = await response.json();
      if (result.success) {
        setShowSuccessModal(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        const errorMsg = result.message || "Something went wrong. Please try again later.";
        alert(`Submission Error: ${errorMsg}`);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error sending message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`pt-6 pb-20 md:pt-8 md:pb-28 ${
        isVisible ? "animate-slide-up-in" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Build the Future Together
          </h2>
          <p className="text-gray-300 text-lg">
            Ready to transform your business with cutting-edge technology?
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div
              className={isVisible ? "animate-field-slide-up" : "opacity-0 translate-y-8"}
              style={isVisible ? { animationDelay: "0.2s" } : {}}
            >
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-white/5 border border-cyan-400/25 text-white px-5 py-4 placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                required
              />
            </div>
            <div
              className={isVisible ? "animate-field-slide-up" : "opacity-0 translate-y-8"}
              style={isVisible ? { animationDelay: "0.45s" } : {}}
            >
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white/5 border border-cyan-400/25 text-white px-5 py-4 placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all"
                required
              />
            </div>
          </div>
          <div
            className={isVisible ? "animate-field-slide-up" : "opacity-0 translate-y-8"}
            style={isVisible ? { animationDelay: "0.7s" } : {}}
          >
            <textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full bg-white/5 border border-cyan-400/25 text-white px-5 py-4 placeholder-gray-400 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all resize-none"
              required
            />
          </div>
          <div
            className={isVisible ? "animate-field-slide-up" : "opacity-0 translate-y-8"}
            style={isVisible ? { animationDelay: "0.95s" } : {}}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white font-semibold py-4 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-400/30 border border-cyan-400/30 hover:border-cyan-400/60 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </div>
        </form>
      </div>

      {/* Success popup – same as Contact page */}
      {showSuccessModal &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md contact-success-overlay"
            onClick={() => setShowSuccessModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
          >
            <div
              className="contact-success-popup bg-navy-900 border border-cyan-400/30 rounded-2xl p-8 max-w-sm w-full shadow-2xl shadow-cyan-500/10 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-green-500/30">
                <Check className="w-10 h-10 text-green-400" strokeWidth={2.5} />
              </div>
              <h3 id="success-title" className="text-2xl font-bold text-white mb-2">Success!</h3>
              <p className="text-gray-300 mb-6">Your enquiry has been sent successfully. We'll get back to you soon.</p>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                OK
              </button>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}

function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Projects />
      <ServicesWeProvide />
      <WhyPartner />
      <Metrics />
      <CEOMessage />
      <Awards />
      <ContactFormSection />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-navy-900 text-white selection:bg-cyan-400 selection:text-navy-900 overflow-x-hidden relative">
        {/* Animated Background - Perfect Fit & Premium Clarity */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#020d0f]">
          <img
            src="/premium-tech-bg.jpg"
            alt="Premium Tech Background"
            className="w-full h-full object-cover scale-[1.15] animate-slow-drift opacity-75 mix-blend-screen saturate-[0.9] brightness-[0.95] contrast-125 transition-all duration-1000"
          />
          {/* Subtle depth and glow overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020d0f]/60 via-transparent to-[#020d0f]/80 z-[1]"></div>
          <div className="absolute inset-0 bg-teal-400/5 mix-blend-overlay z-[2]"></div>
        </div>

        <div className="relative z-10">
          <Navbar />
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/consulting" element={<ConsultationPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/article/:id" element={<BlogArticlePage />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/ceo-message" element={<CEOMessagePage />} />
              <Route path="/culture" element={<CulturePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/case-study/keonics" element={<CaseStudyKeonextPage />} />
              <Route path="/case-study/bda" element={<CaseStudyBdaPage />} />
            </Routes>
          </PageTransition>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
