import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Send,
  Linkedin,
  Twitter,
  ChevronDown,
  Check,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useLocation, Link } from "react-router-dom";

const CONTACT_SOCIAL_LINKS = [
  { id: "google", href: "https://maps.app.goo.gl/JETN7PRoGTP8uMU79", label: "Google Maps", Icon: Globe },
  { id: "linkedin", href: "https://www.linkedin.com/company/inventech-info-solutions/posts/?feedView=all", label: "LinkedIn", Icon: Linkedin },
  { id: "twitter", href: "https://twitter.com/InvenTechInfo", label: "Twitter", Icon: Twitter },
] as const;

const INQUIRY_OPTIONS = [
  { value: "general", label: "General Inquiry" },
  { value: "project", label: "Start a Project" },
  { value: "partnership", label: "Partnership Opportunity" },
  // { value: "careers", label: "Careers" },
] as const;

const WEB3FORMS_ACCESS_KEY = "b4071e2f-08a4-4391-84b2-272ea2bb3ac2";

export default function Contact() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [rotatingIcon, setRotatingIcon] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    inquiry: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const getInquiryLabel = (value: string) =>
    INQUIRY_OPTIONS.find((o) => o.value === value)?.label ?? "Select Inquiry Type";

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const selectInquiry = (value: string) => {
    setFormData((prev) => ({ ...prev, inquiry: value }));
    setIsDropdownOpen(false);
    if (errors.inquiry) setErrors((prev) => ({ ...prev, inquiry: "" }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name") {
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: lettersOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full Name is required";
    if (!formData.email.trim() || !validateEmail(formData.email))
      newErrors.email = "Please enter a valid work email";
    if (!formData.inquiry) newErrors.inquiry = "Please select an inquiry type";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    const submissionData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: formData.name,
      email: formData.email,
      company: formData.company || "N/A",
      phone: formData.phone || "N/A",
      "Inquiry Type": getInquiryLabel(formData.inquiry),
      message: formData.message,
      subject: `New Inquiry: ${getInquiryLabel(formData.inquiry)} from ${formData.name}`,
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
        setFormData({
          name: "",
          company: "",
          email: "",
          phone: "",
          inquiry: "",
          message: "",
        });
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

  const handleSocialClick = (id: string) => {
    setRotatingIcon(id);
    setTimeout(() => setRotatingIcon(null), 600);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setHeroVisible(true);
    if (location.hash) {
      const element = document.getElementById(location.hash.slice(1));
      if (element) {
        setTimeout(() => {
          const headerOffset = 120;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 100);
      }
    }
    const observers = [
      { ref: formRef, setter: setFormVisible },
      { ref: infoRef, setter: setInfoVisible },
      { ref: ctaRef, setter: setCtaVisible },
    ];
    const observerInstances = observers.map(({ ref, setter }) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setter(true);
          });
        },
        { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
      );
      if (ref.current) observer.observe(ref.current);
      return { observer, ref };
    });
    return () => {
      observerInstances.forEach(({ observer, ref }) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  return (
    <div className="relative z-10 pb-20">
      {/* Hero: full viewport, phrase big and centered */}
      <section
        ref={heroRef}
        className="min-h-[100vh] flex flex-col items-center justify-center text-center px-6 py-24 container mx-auto"
      >
        <div className={`${heroVisible ? "contact-hero-visible" : "contact-hero-hidden"}`}>
          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-8xl font-bold text-white mb-6 md:mb-8 leading-tight max-w-6xl mx-auto" >
            Let's Build the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
              Future Together
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            Partner with Inventech to create intelligent, scalable, and
            future-ready digital solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 sm:gap-6 mt-10 md:mt-12 max-w-sm sm:max-w-none mx-auto" >
            <button
              onClick={() => {
                const el = document.getElementById("contact-form");
                if (el) {
                  const headerOffset = 120;
                  const pos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                  window.scrollTo({ top: pos, behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-10 py-4 font-bold transition-all shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30 active:scale-95 hover:scale-105"
            >
              Get in Touch
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("contact-form");
                if (el) {
                  const headerOffset = 120;
                  const pos = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                  window.scrollTo({ top: pos, behavior: "smooth" });
                }
              }}
              className="w-full sm:w-auto border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 px-10 py-4 font-bold transition-all active:scale-95"
            >
              Book a Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid: Form + Contact Info */}
      <section className="container mx-auto px-6 mb-16 max-w-6xl pt-16 md:pt-24" style={{marginTop: '-120px'}}>
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Form Side - Get in Touch */}
          <div
            ref={formRef}
            id="contact-form"
            className={`bg-white/5 border border-white/10 p-8 md:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden group rounded-xl h-full ${formVisible ? "contact-form-visible" : "contact-form-hidden"}`}
          >
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-teal-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow-delayed" />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-teal-500/20 group-hover:via-cyan-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0" />

            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                Get in Touch
              </h2>
              <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors">
                Ready to transform your ideas into reality? Let's discuss your project.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="space-y-1">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full bg-navy-900/50 border p-3 text-white focus:ring-1 outline-none transition-all ${
                      errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : "border-white/10 focus:border-teal-500 focus:ring-teal-500/50"
                    }`}
                  />
                  {errors.name && <span className="text-red-400 text-sm">{errors.name}</span>}
                </div>
                <div className="space-y-1">
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-navy-900/50 border border-white/10 p-3 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-all outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="email"
                    name="email"
                    placeholder="Work Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full bg-navy-900/50 border p-3 text-white focus:ring-1 outline-none transition-all ${
                      errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : "border-white/10 focus:border-teal-500 focus:ring-teal-500/50"
                    }`}
                  />
                  {errors.email && <span className="text-red-400 text-sm">{errors.email}</span>}
                </div>
                <div className="space-y-1">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone (Optional)"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-navy-900/50 border border-white/10 p-3 text-white focus:border-teal-500 focus:ring-1 focus:ring-teal-500/50 transition-all outline-none"
                  />
                </div>

                <div className="space-y-1 relative" ref={dropdownRef}>
                  <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full bg-navy-900/50 border p-3 text-white cursor-pointer flex items-center justify-between transition-all outline-none ${
                      errors.inquiry ? "border-red-500" : "border-white/10 focus:border-teal-500"
                    }`}
                  >
                    <span className={formData.inquiry ? "text-white" : "text-gray-500"}>
                      {getInquiryLabel(formData.inquiry)}
                    </span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                  </div>
                  {isDropdownOpen && (
                    <div className="absolute z-20 mt-1 left-0 right-0 bg-navy-900 border border-white/10 shadow-xl rounded overflow-hidden">
                      {INQUIRY_OPTIONS.map((opt) => (
                        <div
                          key={opt.value}
                          onClick={() => selectInquiry(opt.value)}
                          className={`px-4 py-3 cursor-pointer flex items-center justify-between text-white hover:bg-cyan-500/20 transition-colors ${
                            formData.inquiry === opt.value ? "bg-cyan-500/20" : ""
                          }`}
                        >
                          {opt.label}
                          {formData.inquiry === opt.value && <Check className="w-4 h-4 text-cyan-400" />}
                        </div>
                      ))}
                    </div>
                  )}
                  {errors.inquiry && <span className="text-red-400 text-sm">{errors.inquiry}</span>}
                </div>

                <div className="space-y-1">
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full bg-navy-900/50 border p-3 text-white focus:ring-1 outline-none resize-none transition-all ${
                      errors.message ? "border-red-500 focus:border-red-500 focus:ring-red-500/50" : "border-white/10 focus:border-teal-500 focus:ring-teal-500/50"
                    }`}
                  />
                  {errors.message && <span className="text-red-400 text-sm">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-4 transition-all shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30 flex items-center justify-center gap-3 group active:scale-95 hover:scale-[1.02]"
                >
                  {isSubmitting ? "Sending..." : "Submit Inquiry"}{" "}
                  <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div
            ref={infoRef}
            className={`bg-white/5 border border-white/10 p-8 md:p-10 backdrop-blur-md shadow-2xl relative overflow-hidden group rounded-xl h-full ${infoVisible ? "contact-info-visible" : "contact-info-hidden"}`}
          >
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-teal-600/10 rounded-full blur-[100px] pointer-events-none animate-pulse-slow-delayed" />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-teal-500/20 group-hover:via-cyan-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0" />

            <div id="contact-info" className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                Contact <br /> Information
              </h2>

              <div className="space-y-6 mt-10">
                <div className="flex gap-4 items-start group/item">
                  <div className="contact-info-icon-wrap w-10 h-10 bg-cyan-500/20 rounded flex items-center justify-center border border-cyan-500/30 group-hover/item:bg-cyan-600 transition-all group-hover/item:scale-110 shrink-0">
                    <MapPin className="w-5 h-5 text-cyan-400 group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-0.5">Head Office</div>
                    <a
                      href="https://maps.app.goo.gl/JETN7PRoGTP8uMU79"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm font-medium leading-relaxed hover:text-cyan-400 transition-colors block"
                    >
                      2nd Floor, 292/D/2/56, 9th Main Rd, 4th Block, 5th Block, Jayanagar, Bengaluru, Karnataka 560041
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 items-center group/item">
                  <div className="contact-info-icon-wrap w-10 h-10 bg-cyan-500/20 rounded flex items-center justify-center border border-cyan-500/30 group-hover/item:bg-cyan-600 transition-all group-hover/item:scale-110 shrink-0">
                    <Phone className="w-5 h-5 text-cyan-400 group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-0.5">Phone</div>
                    <a href="tel:08026535959" className="text-white text-sm font-medium hover:text-cyan-400 transition-colors">
                      080 2653 5959
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 items-center group/item">
                  <div className="contact-info-icon-wrap w-10 h-10 bg-cyan-500/20 rounded flex items-center justify-center border border-cyan-500/30 group-hover/item:bg-cyan-600 transition-all group-hover/item:scale-110 shrink-0">
                    <Mail className="w-5 h-5 text-cyan-400 group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-0.5">Email</div>
                    <a href="mailto:contactus@inventechinfo.com" className="text-white text-sm font-medium hover:text-cyan-400 transition-colors">
                      contactus@inventechinfo.com
                    </a>
                  </div>
                </div>
                <div className="flex gap-4 items-center group/item">
                  <div className="contact-info-icon-wrap w-10 h-10 bg-cyan-500/20 rounded flex items-center justify-center border border-cyan-500/30 group-hover/item:bg-cyan-600 transition-all group-hover/item:scale-110 shrink-0">
                    <Globe className="w-5 h-5 text-cyan-400 group-hover/item:text-white transition-colors" />
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-0.5">Website</div>
                    <a
                      href="https://inventechinfo.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white text-sm font-medium hover:text-cyan-400 transition-colors"
                    >
                      inventechinfo.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-white/10 my-6" />

              <div className="text-center">
                <h3 className="text-cyan-400 font-bold mb-5 text-base tracking-wide">Social Media</h3>
                <div className="flex justify-center gap-5">
                  {CONTACT_SOCIAL_LINKS.map(({ id, href, label, Icon }) => (
                    <a
                      key={id}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={label}
                      onClick={() => handleSocialClick(id)}
                      className={`w-11 h-11 bg-cyan-900/30 rounded-full flex items-center justify-center border border-cyan-500/30 hover:bg-cyan-500 text-cyan-400 hover:text-white transition-all hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/50 cursor-pointer ${rotatingIcon === id ? "social-icon-rotate-on-click" : ""}`}
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Locations */}
      <section id="global-location" className="container mx-auto px-6 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
            GLOBAL LOCATIONS
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-4 animate-underline-slide" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { city: "Bangalore", img: "/Vidhanasoudha.jpeg" },
            { city: "Hyderabad", img: "/hyderabad.jpg" },
            { city: "USA", img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=800" },
          ].map((loc, idx) => (
            <div key={idx} className="relative h-72 group overflow-hidden border border-white/10 shadow-2xl rounded-xl">
              <img
                src={loc.img}
                alt={loc.city}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center pb-6 p-6">
                <h3 className="text-2xl font-bold text-white tracking-wider">{loc.city}</h3>
              </div>
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/50 transition-colors duration-300 rounded-xl" />
            </div>
          ))}
        </div>
      </section>

      {/* Global Presence Map */}
      <section className="container mx-auto px-6 mb-24 text-center">
        <div className="mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-white">GLOBAL PRESENCE</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-4 animate-underline-slide" />
        </div>
        <div className="max-w-5xl mx-auto h-[450px] border border-white/20 shadow-2xl shadow-cyan-500/10 rounded-xl overflow-hidden relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.776422283723!2d77.5812136750756!3d12.92208648738876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae159fe670b09b%3A0xc6b798d8e0cbfdcd!2sInvenTech%20Info%20Solutions%20Pvt%20Ltd.!5e0!3m2!1sen!2sin!4v1770287512471!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Inventech Office Location"
          />
        </div>
        <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 mx-auto mt-10" />
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="container mx-auto px-6 mb-20 text-center">
        <div className={`bg-white/5 border border-white/10 p-16 md:p-24 relative overflow-hidden backdrop-blur-xl group ${ctaVisible ? "contact-cta-visible" : "contact-cta-hidden"}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600/5 via-cyan-500/5 to-teal-600/5 mix-blend-overlay group-hover:from-teal-600/10 group-hover:via-cyan-500/10 group-hover:to-teal-600/10 transition-all duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-teal-500/10 group-hover:via-cyan-500/10 group-hover:to-teal-500/10 transition-all duration-500 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 group-hover:text-cyan-400 transition-colors">
              Looking to collaborate or join our AI-driven team?
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto group-hover:text-gray-200 transition-colors">
              Discover opportunities to grow with us or partner for innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 sm:gap-6 flex-wrap max-w-sm sm:max-w-none mx-auto">
              <Link
                to="/culture"
                className="w-full sm:w-auto text-center bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-10 py-4 font-bold transition-all shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30 active:scale-95"
              >
                Explore Careers
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto text-center border border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 text-white px-10 py-4 font-bold transition-all backdrop-blur-md active:scale-95"
              >
                Partner with Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success popup – rendered in document.body so it stays fixed on screen (no scroll) */}
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
    </div>
  );
}
