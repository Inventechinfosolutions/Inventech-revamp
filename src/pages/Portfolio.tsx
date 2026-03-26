import TrustedBy from "../components/TrustedBy";
import Awards from "../components/Awards";
import { Award, Star, ThumbsUp, Medal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Portfolio() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [caseStudiesVisible, setCaseStudiesVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [metricsVisible, setMetricsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const heroRef = useRef<HTMLDivElement>(null);
  const caseStudiesRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeroVisible(true);

    const isMobile = () => window.matchMedia("(max-width: 767px)").matches;
    if (isMobile()) {
      const t = setTimeout(() => {
        setCaseStudiesVisible(true);
      }, 400);
      return () => clearTimeout(t);
    }
  }, []);

  useEffect(() => {
    const caseStudiesObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCaseStudiesVisible(false);
            setTimeout(() => {
              setAnimationKey(prev => prev + 1);
              setCaseStudiesVisible(true);
            }, 50);
          } else {
            setCaseStudiesVisible(false);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -20px 0px",
      }
    );

    const ctaObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCtaVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    const metricsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setMetricsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (caseStudiesRef.current) {
      caseStudiesObserver.observe(caseStudiesRef.current);
    }

    if (ctaRef.current) {
      ctaObserver.observe(ctaRef.current);
    }

    if (metricsRef.current) {
      metricsObserver.observe(metricsRef.current);
    }

    return () => {
      if (caseStudiesRef.current) {
        caseStudiesObserver.unobserve(caseStudiesRef.current);
      }
      if (ctaRef.current) {
        ctaObserver.unobserve(ctaRef.current);
      }
      if (metricsRef.current) {
        metricsObserver.unobserve(metricsRef.current);
      }
    };
  }, []);
  const caseStudies = [
    {
      title: "KEONICS Marketplace Procurement",
      category: "KEONICS",
      desc: "Built an AI-powered platform to centralize procurement, boosting transparency, speed, and innovation in government operations.",
      stats: ["75% Reduction in manual processing"],
      image: "/keonics-project.png",
      caseStudyPath: "/case-study/keonics",
    },
    {
      title: "Web-Based Human Resource Management System",
      category: "IEBA",
      desc: "AI-enabled HR automation boosting accuracy, efficiency, and workforce intelligence.",
      stats: ["60% efficiency boost"],
      image: "/ieba-workforce-management-hub-card.png",
      caseStudyPath: null as string | null,
    },
    {
      title: "BDA - Grievance Management Portal",
      category: "BDA",
      desc: "Web-based portal for SOP-based grievance handling with role-based workflows, SLA tracking, and audit trails for transparent citizen services.",
      stats: ["Faster grievance resolution & full audit trail"],
      image: "/bda-grievance-portal.png",
      caseStudyPath: "/case-study/bda",
    },
    {
      title: "KSAAD Audit & Accounts Dashboard",
      category: "KSAAAD",
      desc: "Designed a secure, AI-enabled audit system that simplifies data management and enhances accuracy.",
      stats: ["80% Time reduction"],
      image: "/ksaad-project.png",
      caseStudyPath: "/case-study/ksaad",
      imagePosition: "center 35%",
    },
    {
      title: "Startup Synergy: Innovation & Problem Resolution Portal",
      category: "KITS",
      desc: "AI-powered startup hub enabling collaboration, innovation, and growth across Karnataka's ecosystem.",
      stats: ["500+ startups active participation"],
      image: "/KITS Startup–Government Bridge.png",
      caseStudyPath: null as string | null,
    },
  ];

  return (
    <div className="pt-24 pb-12 relative z-10">
      {/* Hero – full viewport on desktop; shorter on mobile so case studies are in reach */}
      <section
        ref={heroRef}
        className="min-h-[60vh] md:min-h-[calc(100vh-5rem)] flex flex-col justify-center items-center text-center px-6"
      >
        <h1 className={`text-6xl md:text-8xl font-bold text-white mb-6 leading-tight ${heroVisible ? "portfolio-hero-title-visible" : "portfolio-hero-title-hidden"}`}>
          Where Innovation Becomes <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Intelligent Reality
          </span>
        </h1>
        <p className={`text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 ${heroVisible ? "portfolio-hero-desc-visible" : "portfolio-hero-desc-hidden"}`}>
          Explore how we build smarter digital ecosystems using AI,
          automation, and engineering excellence that drive measurable
          business outcomes.
        </p>
        <div className={`flex justify-center gap-6 mb-0 ${heroVisible ? "portfolio-hero-buttons-visible" : "portfolio-hero-buttons-hidden"}`}>
          <Link to="/contact#contact-form" className="inline-block bg-transparent border border-cyan-400/50 text-white px-8 py-4 text-lg font-bold transition-all hover:bg-cyan-400/10 hover:border-cyan-400 hover:scale-105 active:scale-95">
            Work With Us
          </Link>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section ref={caseStudiesRef} id="case-studies" className="container mx-auto px-6 pt-10 md:pt-0 mb-10">
        <div className={`text-center mb-8 ${caseStudiesVisible ? "portfolio-section-title-visible" : "portfolio-section-title-hidden"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Smart Case Studies
          </h2>
          <p className="text-gray-300 text-lg">
            AI-powered solutions delivering measurable results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {caseStudies.map((study, idx) => {
            const cardContent = (
              <div
                className={`enhanced-portfolio-card bg-white/3 border border-white/15 overflow-hidden hover:bg-white/8 hover:border-cyan-400/25 transition-all group backdrop-blur-xl relative h-full flex flex-col ${caseStudiesVisible ? "portfolio-card-visible" : "portfolio-card-hidden"
                  } ${study.caseStudyPath ? "cursor-pointer" : ""}`}
                style={caseStudiesVisible ? { animationDelay: `${idx * 0.15}s` } : {}}
              >
                {/* Animated gradient border on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-sky-500/0 to-teal-500/0 group-hover:from-cyan-500/20 group-hover:via-sky-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0"></div>

                <div className="h-64 overflow-hidden relative group/img">
                  {/* Glow effect on image */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-transparent group-hover/img:from-cyan-500/10 transition-all duration-500 z-10 pointer-events-none"></div>
                  <img
                    src={study.image}
                    alt={study.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700 relative z-0"
                    style={{ objectPosition: (study as { imagePosition?: string }).imagePosition ?? "center center" }}
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-2 text-xs font-bold text-cyan-300 border border-cyan-400/30 shadow-lg shadow-cyan-400/20 z-20 group-hover:scale-110 transition-transform">
                    {study.category}
                  </div>
                </div>
                <div className="p-8 relative z-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-300 transition-colors duration-300">
                    {study.title}
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {study.desc}
                  </p>
                  <div className="border-t border-white/10 pt-6 mt-auto">
                    <span className="text-xl font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300">
                      {study.stats[0]}
                    </span>
                  </div>
                </div>
              </div>
            );
            return study.caseStudyPath ? (
              <Link key={`${idx}-${animationKey}`} to={study.caseStudyPath} className="block h-full">
                {cardContent}
              </Link>
            ) : (
              <div key={`${idx}-${animationKey}`} className="block h-full">
                {cardContent}
              </div>
            );
          })}
        </div>
      </section>

      {/* Proof Through Metrics - Dark Theme */}
      <section ref={metricsRef} className="py-20 bg-gradient-to-b from-white/5 to-transparent border-y border-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-4 transition-all duration-700 ${metricsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Proof Through Metrics
          </h2>
          <p className={`text-gray-400 text-lg mb-12 transition-all duration-700 delay-100 ${metricsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Measurable impact across digital transformation projects
          </p>
          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { value: "4M+", label: "Citizens impacted through GovTech systems" },
              { value: "70%", label: "Operational efficiency improvement for clients" },
              { value: "15+", label: "AI-driven enterprise platforms built" },
              { value: "10+", label: "Years of trusted digital transformation" },
            ].map((metric, idx) => (
              <div
                key={idx}
                className={`bg-white/5 backdrop-blur-sm p-8 border border-white/15 hover:border-cyan-400/25 hover:bg-white/10 transition-all duration-500 group ${metricsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                style={{ transitionDelay: `${200 + idx * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold text-teal-400 mb-3 group-hover:text-cyan-400 transition-colors">{metric.value}</div>
                <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted by Leading Organizations - logo carousel only */}
      <section className="py-8">
        <TrustedBy />
      </section>

      {/* Our PSU Clients */}
      <section className="container mx-auto px-6 py-8 md:py-10 border-t border-white/5">
        <h3 className="text-lg md:text-xl font-semibold text-cyan-400 mb-6 text-center uppercase tracking-wide drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
          Our PSU Clients
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto list-none">
          {[
            "Department of Collegiate Education, Government of Karnataka",
            "Department of Telecommunications",
            "Department of Tourism, Karnataka",
            "CA.gov",
            "K-tech",
            "Advanced Centre for Integrated Water Resources Management, Government of Karnataka",
            "Department of Youth Empowerment and Sports, Government of Karnataka",
            "Karnataka School Examination and Assessment Board",
            "Karnataka State Electronics Development Corporation Limited (KEONICS)",
            "Karnataka State Audit And Accounts Department, Government of Karnataka",
          ].map((name, idx) => (
            <li
              key={idx}
              className="group flex items-center gap-4 py-3 pl-5 pr-4 bg-white/5 rounded-r-lg border-l-4 border-cyan-400/80 hover:border-cyan-400 hover:bg-white/8 transition-all"
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-cyan-400/20 flex items-center justify-center text-cyan-400 text-xs font-bold">
                {idx + 1}
              </span>
              <span className="text-gray-300 text-sm">{name}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Awards (Reused) */}
      <Awards
        items={[
          { Icon: Medal, text: "ISO Certified" },
          { Icon: Award, text: "CMMI Certified" },
          { Icon: ThumbsUp, text: "Top Performer Award" },
          { Icon: Star, text: "Star Partner Recognition" },
        ]}
      />

      {/* CTA */}
      <section ref={ctaRef} className="container mx-auto px-6 py-10">
        <div className={`bg-white/3 border border-white/5 p-12 md:p-20 text-center relative overflow-hidden backdrop-blur-2xl ${ctaVisible ? "portfolio-cta-visible" : "portfolio-cta-hidden"
          }`}>
          <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 blur-[120px] rounded-full -z-10 animate-pulse-slow"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -z-10 animate-pulse-slow-delayed"></div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Let's Build the Next <br /> Case Study Together
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-10 text-xl leading-relaxed">
              Ready to transform your business with intelligent solutions? Let's
              create something extraordinary.
            </p>
            <Link to="/contact" className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-10 py-4 font-bold hover:from-teal-500 hover:to-cyan-500 transition-all shadow-xl hover:shadow-cyan-400/30 hover:scale-105 active:scale-95 text-lg">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
