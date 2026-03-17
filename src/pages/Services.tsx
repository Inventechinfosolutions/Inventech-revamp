import {
  Cpu,
  Search,
  PenTool,
  Shield,
  Cloud,
  Wrench,
  Smartphone,
  Database,
  Settings,
  Landmark,
  Factory,
  Wallet,
  ShoppingBag,
  HeartPulse,
  Building2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Services() {
  const [heroVisible, setHeroVisible] = useState(false);
  const [servicesVisible, setServicesVisible] = useState(false);
  const [managedVisible, setManagedVisible] = useState(false);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [industriesVisible, setIndustriesVisible] = useState(false);
  const [useCasesVisible, setUseCasesVisible] = useState(false);
  const [testimonialsVisible, setTestimonialsVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  const techMarquee = ["React", "Angular", "Python", "Java", "Hadoop", "Azure", "AWS", "GCP", "TensorFlow"];
  
  const heroRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const managedRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers = [
      { ref: heroRef, setter: setHeroVisible },
      { ref: servicesRef, setter: setServicesVisible },
      { ref: managedRef, setter: setManagedVisible },
      { ref: bannerRef, setter: setBannerVisible },
      { ref: industriesRef, setter: setIndustriesVisible },
      { ref: useCasesRef, setter: setUseCasesVisible },
      { ref: testimonialsRef, setter: setTestimonialsVisible },
      { ref: ctaRef, setter: setCtaVisible },
    ];

    const observerInstances = observers.map(({ ref, setter }) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setter(entry.isIntersecting);
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -50px 0px",
        }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return { observer, ref };
    });

    return () => {
      observerInstances.forEach(({ observer, ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);
  /* Our Key Service Offerings */
  const serviceOfferings = [
    {
      icon: <Cpu className="w-8 h-8 text-white" />,
      title: "AI-Powered Product Engineering",
      desc: "Custom product, ML integration, automated workflows, and scalable architectures",
    },
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: "Intelligent Testing & DevOps Automation",
      desc: "Predictive defect detection, smart pipelines, zero-downtime releases",
    },
    {
      icon: <PenTool className="w-8 h-8 text-white" />,
      title: "AI-Enhanced UX & Digital Experience Design",
      desc: "Adaptive UI, personalization engines, behavior analytics",
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Cyber Defense & Zero-Trust Security",
      desc: "Threat prediction, anomaly detection, SOC automation",
    },
    {
      icon: <Cloud className="w-8 h-8 text-white" />,
      title: "Enterprise Cloud + Data Intelligence",
      desc: "AI dashboards, data lakes, forecasting models, BI insights",
    },
    {
      icon: <Wrench className="w-8 h-8 text-white" />,
      title: "Automation & Smart Workforce Platform",
      desc: "Self-healing systems, AI bots, process optimization",
    },
  ];

  const managedServices = [
    {
      icon: <Database className="w-6 h-6 text-cyan-400" />,
      title: "Predictive IT Operations (AIOps)",
      desc: "Proactive monitoring and automated healing.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-cyan-400" />,
      title: "Smart IT Support Agents (GenAI)",
      desc: "24/7 intelligent assistance and resolution.",
    },
    {
      icon: <Cloud className="w-6 h-6 text-cyan-400" />,
      title: "Cloud Cost Optimization with AI",
      desc: "Intelligent resource management and savings.",
    },
    {
      icon: <Settings className="w-6 h-6 text-cyan-400" />,
      title: "Modernization of Legacy Systems",
      desc: "Seamless transformation to modern architecture",
    },
  ];

  const industries = [
    { icon: <Landmark className="w-8 h-8 text-white" />, name: "Govt. Sector" },
    { icon: <Factory className="w-8 h-8 text-white" />, name: "Manufacturing" },
    { icon: <Wallet className="w-8 h-8 text-white" />, name: "FinTech" },
    { icon: <ShoppingBag className="w-8 h-8 text-white" />, name: "Retail" },
    { icon: <HeartPulse className="w-8 h-8 text-white" />, name: "Healthcare" },
    { icon: <Building2 className="w-8 h-8 text-white" />, name: "Smart Cities" },
  ];

  const aiUseCases = [
    {
      image: "/KITS Startup–Government Bridge.png",
      title: "Automated Auditing System for Public Sector",
      desc: "Streamlined compliance and audit processes with AI-powered analysis",
      project: "KSAAD Project",
      caseStudyPath: "/case-study/ksaad",
    },
    {
      image: "/keonics-project.png",
      title: "AI-Driven Training Management & Exam Platform",
      desc: "Intelligent learning paths and automated assessment systems",
      project: "KEONICS Project",
      caseStudyPath: "/case-study/keonics",
    },
    {
      image: "/ksaad-project.png",
      title: "Startup Synergy: Innovation & Problem Resolution Portal",
      desc: "AI-powered startup hub enabling collaboration, innovation, and growth across Karnataka's ecosystem.",
      project: "KITS",
      caseStudyPath: null as string | null,
    },
    {
      image: "/bda-grievance-portal.png",
      title: "Big Data Analytics & Grievance Management Portal",
      desc: "Web-based portal for SOP-based grievance handling with role-based workflows, SLA tracking, and audit trails.",
      project: "BDA Project",
      caseStudyPath: "/case-study/bda",
    },
  ];

  return (
    <div className="pt-20 pb-12 container mx-auto px-4 md:px-6 relative z-10">
      {/* Hero Section – full viewport so phrase is full screen, "Our Key Service Offerings" on next screen */}
      <section
        ref={heroRef}
        className="min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center px-4"
      >
        <span className={`text-lg md:text-xl text-teal-400 font-bold tracking-widest uppercase mb-5 block ${heroVisible ? "services-hero-tag-visible" : "services-hero-tag-hidden"}`}>
          Build Smarter Innovate Faster
        </span>
        <h1 className={`text-6xl md:text-8xl font-bold text-white mb-8 leading-tight ${heroVisible ? "services-hero-title-visible" : "services-hero-title-hidden"}`}>
          Turn Your Vision <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
            into AI-Driven Reality
          </span>
        </h1>
        <p className={`text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-10 ${heroVisible ? "services-hero-desc-visible" : "services-hero-desc-hidden"}`}>
          From AI automation to advanced analytics, we enable enterprises to unlock resilience, efficiency, and next-level user experiences.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link to="/contact" className={`inline-block bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-8 py-4 text-lg font-bold transition-all shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30 hover:scale-105 active:scale-95 ${
            heroVisible ? "services-button-left-visible" : "services-button-left-hidden"
          }`}>
            Let's Build Together
          </Link>
          <Link to="/portfolio" className={`inline-block bg-transparent border border-teal-400/50 hover:bg-teal-400/10 hover:border-teal-400 text-white px-8 py-4 text-lg font-bold transition-all backdrop-blur-md hover:scale-105 active:scale-95 ${
            heroVisible ? "services-button-right-visible" : "services-button-right-hidden"
          }`}>
            Explore Portfolio
          </Link>
        </div>
      </section>

      {/* Our Key Service Offerings */}
      <section ref={servicesRef} className="container mx-auto px-4 md:px-6 py-24">
        <h2 className={`text-3xl md:text-4xl font-bold text-white text-center mb-4 ${servicesVisible ? "services-section-title-visible" : "services-section-title-hidden"}`}>
          Our Key Service Offerings
        </h2>
        <p className={`text-gray-400 text-center mb-16 max-w-2xl mx-auto ${servicesVisible ? "services-section-title-visible" : "services-section-title-hidden"}`}>
          Intelligent solutions that transform your business.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {serviceOfferings.map((service, idx) => {
            const visibleClass = servicesVisible ? "service-card-fade-up-visible" : "service-card-fade-up-hidden";
            return (
              <div
                key={idx}
                className={`service-page-card enhanced-service-card bg-gradient-to-br from-white/3 to-transparent border border-white/10 border-teal-400/20 shadow-[0_0_0_1px_rgba(20,184,166,0.1),0_0_20px_rgba(20,184,166,0.06)] p-8 hover:bg-white/8 hover:border-teal-400/40 hover:shadow-[0_0_0_1px_rgba(20,184,166,0.2),0_0_24px_rgba(20,184,166,0.12)] transition-all group backdrop-blur-xl relative overflow-hidden ${visibleClass}`}
                style={servicesVisible ? { animationDelay: `${idx * 0.2}s` } as React.CSSProperties : {}}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-teal-500/20 group-hover:via-cyan-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0"></div>
                <div className="service-page-card-icon bg-gradient-to-br from-teal-600 to-cyan-600 w-16 h-16 flex items-center justify-center mb-8 shadow-lg shadow-teal-600/20 transition-all duration-300 relative z-10">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-300 transition-colors relative z-10">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors relative z-10">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Glassmorphic Banner – sharp edges */}
      <section ref={bannerRef} className="py-8 bg-white/3 border border-white/5 backdrop-blur-xl text-center mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-600/10 blur-[80px] rounded-full -z-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 blur-[80px] rounded-full -z-10"></div>
        
        <div className={`relative z-10 ${bannerVisible ? "services-banner-visible" : "services-banner-hidden"}`}>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Every solution we build learns, adapts, and evolves.
          </h3>
          <div className="mt-8 space-y-3">
            <div className="overflow-hidden">
              <div className="animate-scroll flex gap-8 md:gap-12 items-center py-2">
                {[...techMarquee, ...techMarquee].map((tech, idx) => (
                  <span key={idx} className="text-xs md:text-sm font-bold text-teal-400 uppercase tracking-widest opacity-90 whitespace-nowrap hover:text-teal-300 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="animate-scroll-reverse flex gap-8 md:gap-12 items-center py-2">
                {[...techMarquee, ...techMarquee].map((tech, idx) => (
                  <span key={`r-${idx}`} className="text-xs md:text-sm font-bold text-teal-400 uppercase tracking-widest opacity-90 whitespace-nowrap hover:text-teal-300 transition-colors">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-teal-600/5 mix-blend-overlay"></div>
      </section>

      {/* Managed IT & AI Transformation */}
      <section ref={managedRef} className="container mx-auto px-4 md:px-6 py-10 md:py-24 border-t border-white/5">
        <h2 className={`text-3xl md:text-4xl font-bold text-white text-center mb-2 md:mb-4 ${managedVisible ? "services-section-title-visible" : "services-section-title-hidden"}`}>
          Managed IT & AI Transformation
        </h2>
        <p className={`text-gray-400 text-center mb-8 md:mb-16 max-w-2xl mx-auto ${managedVisible ? "services-section-title-visible" : "services-section-title-hidden"}`}>
          We enable organizations to operate faster, smarter, safer — powered by automation and intelligence.
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {managedServices.map((item, idx) => (
            <div
              key={idx}
              className={`service-page-card bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all group backdrop-blur-xl relative overflow-hidden ${
                managedVisible ? "managed-card-visible" : "managed-card-hidden"
              }`}
              style={managedVisible ? { animationDelay: `${idx * 0.1}s` } : {}}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/0 to-cyan-500/0 group-hover:from-teal-500/10 group-hover:to-cyan-500/10 transition-all duration-500 pointer-events-none z-0"></div>
              <div className="service-page-card-icon bg-gradient-to-br from-teal-500/20 to-cyan-500/20 w-12 h-12 flex items-center justify-center mb-6 transition-all duration-300 relative z-10 shadow-lg shadow-teal-600/20">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-3 group-hover:text-teal-300 transition-colors relative z-10">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      

      {/* Our Expertise Across Industries */}
      <section ref={industriesRef} className="container mx-auto px-4 md:px-6 pt-8 pb-8 md:py-24 border-t border-white/5">
        <h2 className={`text-3xl md:text-4xl font-bold text-white text-center mb-6 md:mb-16 ${industriesVisible ? "services-section-title-visible" : "services-section-title-hidden"}`}>
          Our Expertise Across Industries
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {industries.map((industry, idx) => (
            <div
              key={idx}
              className={`industry-card flex flex-col items-center group cursor-pointer ${
                industriesVisible ? "industry-card-visible" : "industry-card-hidden"
              }`}
              style={industriesVisible ? { animationDelay: `${idx * 0.1}s` } : {}}
            >
              <div className="industry-card-icon w-20 h-20 bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center mb-4 shadow-lg shadow-teal-600/20 group-hover:shadow-teal-600/40 group-hover:scale-110 transition-all duration-300">
                {industry.icon}
              </div>
              <span className="text-gray-300 text-sm font-medium group-hover:text-teal-300 transition-colors">
                {industry.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured AI Use Cases */}
      <section ref={useCasesRef} className="container mx-auto px-4 md:px-6 pt-8 pb-10 md:py-24 border-t border-white/5">
        <h2 className={`text-3xl md:text-4xl font-bold text-white text-center mb-4 ${useCasesVisible ? "services-section-title-visible" : "services-section-title-hidden"}`}>
          Featured AI Use Cases
        </h2>
        <p className={`text-gray-400 text-center mb-16 max-w-2xl mx-auto ${useCasesVisible ? "services-section-title-visible" : "services-section-title-hidden"}`}>
          Real world impact we create today
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {aiUseCases.map((useCase, idx) => {
            const cardClass = `bg-gradient-to-br from-white/5 to-transparent border border-white/10 border-teal-400/20 shadow-[0_0_0_1px_rgba(20,184,166,0.1),0_0_20px_rgba(20,184,166,0.06)] overflow-hidden group hover:border-teal-400/40 hover:shadow-[0_0_0_1px_rgba(20,184,166,0.2),0_0_24px_rgba(20,184,166,0.12)] transition-all duration-500 ${
              useCasesVisible ? "usecase-card-visible" : "usecase-card-hidden"
            } ${useCase.caseStudyPath ? "cursor-pointer" : ""}`;
            const content = (
              <>
                <div className="h-48 overflow-hidden">
                  <img
                    src={useCase.image}
                    alt={useCase.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-teal-300 transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {useCase.desc}
                  </p>
                  <span className="text-teal-400 text-sm font-medium">
                    {useCase.project}
                  </span>
                </div>
              </>
            );
            return useCase.caseStudyPath ? (
              <Link
                key={idx}
                to={useCase.caseStudyPath}
                className={cardClass}
                style={useCasesVisible ? { animationDelay: `${idx * 0.15}s` } : {}}
              >
                {content}
              </Link>
            ) : (
              <div
                key={idx}
                className={cardClass}
                style={useCasesVisible ? { animationDelay: `${idx * 0.15}s` } : {}}
              >
                {content}
              </div>
            );
          })}
        </div>
        <div className={`text-center mt-8 md:mt-12 ${useCasesVisible ? "usecase-button-visible" : "usecase-button-hidden"}`}>
          <Link to="/portfolio#case-studies" className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-8 py-3 font-bold transition-all shadow-lg shadow-teal-600/20 hover:shadow-teal-600/30 hover:scale-105 active:scale-95">
            View Full Case Studies
          </Link>
        </div>
      </section>

      {/* What Our Clients Say */}
      <section ref={testimonialsRef} className="container mx-auto px-4 md:px-6 pt-6 pb-12 md:py-12 border-t border-white/5">
        <h2 className={`text-3xl md:text-4xl font-bold text-white text-center mb-16 ${testimonialsVisible ? "services-section-title-visible" : "services-section-title-hidden"}`}>
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto justify-items-center">
          {[
            {
              name: "Michael Waso",
              role: "CEO, Paperless Knowledge, Inc.",
              quote: "InvenTech has been a trusted partner delivering reliable, innovative technology solutions with strong execution and technical expertise.",
            },
            {
              name: "Robert Bieniek",
              role: "CEO, Customized Solutions Inc.",
              quote: "InvenTech has been a trusted partner for over a decade, delivering scalable infrastructure and application solutions with strong technical expertise and a consistent commitment to client success.",
            },
          ].map((testimonial, idx) => (
            <div
              key={idx}
              className={`bg-gradient-to-br from-white/5 to-transparent border border-white/10 border-teal-400/20 shadow-[0_0_0_1px_rgba(20,184,166,0.1),0_0_20px_rgba(20,184,166,0.06)] p-5 md:p-8 hover:border-teal-400/40 hover:shadow-[0_0_0_1px_rgba(20,184,166,0.2),0_0_24px_rgba(20,184,166,0.12)] transition-all duration-500 ${
                testimonialsVisible ? "usecase-card-visible" : "usecase-card-hidden"
              }`}
              style={testimonialsVisible ? { animationDelay: `${idx * 0.15}s` } : {}}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center mb-6 shadow-lg shadow-teal-600/20">
                <span className="text-white font-bold text-lg">{testimonial.name.charAt(0)}</span>
              </div>
              <h4 className="text-white font-bold mb-1">{testimonial.name}</h4>
              <p className="text-teal-400 text-sm mb-4">{testimonial.role}</p>
              <p className="text-gray-400 text-sm leading-relaxed italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Dark Theme */}
      <section ref={ctaRef} className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div 
          className={`bg-gradient-to-r from-white/5 to-transparent backdrop-blur-xl p-5 md:p-20 text-center relative overflow-hidden border border-white/10 border-teal-400/20 shadow-[0_0_0_1px_rgba(20,184,166,0.15),0_0_24px_rgba(20,184,166,0.08),0_25px_50px_-12px_rgba(0,0,0,0.25)] hover:border-teal-400/40 hover:shadow-[0_0_0_1px_rgba(20,184,166,0.25),0_0_32px_rgba(20,184,166,0.12),0_25px_50px_-12px_rgba(0,0,0,0.3)] transition-all duration-1000 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Decorative blur effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 blur-[80px] rounded-full -z-10"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4 md:mb-8">
              Let's automate your business and build intelligent products together.
            </h2>
            <Link to="/contact" className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white px-8 py-3 font-semibold transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105">
              Schedule Strategy Call
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
