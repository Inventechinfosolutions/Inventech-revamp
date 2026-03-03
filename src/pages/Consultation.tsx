import WhyPartner from "../components/WhyPartner";
import {
  Cpu,
  Lightbulb,
  BarChart3,
  Workflow,
  Cloud,
  ShieldCheck,
  ShieldCheck as ShieldIcon,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function randomInRange(min: number, max: number, decimals = 0): number {
  const v = min + Math.random() * (max - min);
  return decimals ? Math.round(v * Math.pow(10, decimals)) / Math.pow(10, decimals) : Math.round(v);
}

export default function Consultation() {
  const proofRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [impact, setImpact] = useState({
    keonics: { efficiency: 65, faster: 3, accuracy: 99.5 },
    ksaad: { timeRed: 80, coverage: 95, compliance: 100 },
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [ctaVisible, setCtaVisible] = useState(false);

  // Proof of Impact: regenerate numbers every time section enters view (scroll up or down)
  useEffect(() => {
    const el = proofRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;

        // Start scrambling
        const interval = setInterval(() => {
          setImpact({
            keonics: {
              efficiency: randomInRange(10, 99),
              faster: randomInRange(1, 10),
              accuracy: randomInRange(80, 100, 1),
            },
            ksaad: {
              timeRed: randomInRange(10, 99),
              coverage: randomInRange(10, 99),
              compliance: randomInRange(80, 100),
            },
          });
        }, 100);

        // Stop after 2 seconds and set to constant values
        setTimeout(() => {
          clearInterval(interval);
          setImpact({
            keonics: { efficiency: 65, faster: 3, accuracy: 99.5 },
            ksaad: { timeRed: 80, coverage: 95, compliance: 100 },
          });
        }, 2000);
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Stepper: move fast left to right 1→2→3→4→1…
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentStep((prev) => (prev >= 3 ? 0 : prev + 1));
    }, 600);
    return () => clearInterval(id);
  }, []);

  // CTA Section animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCtaVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => observer.disconnect();
  }, []);
  /* Consulting Services We Provide */
  const keyOfferings = [
    {
      icon: <Cpu className="w-8 h-8 text-white" />,
      title: "AI Transformation Consulting",
      desc: "Reimagine operations with automation, ML, and scalable AI adoption",
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-white" />,
      title: "Product & Innovation Strategy",
      desc: "Turn ideas into profitable, scalable digital products",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-white" />,
      title: "Data & Market Intelligence",
      desc: "Deep analytics for customers, competitors, and market opportunities.",
    },
    {
      icon: <Workflow className="w-8 h-8 text-white" />,
      title: "Change Adoption & Automation",
      desc: "AI-driven workflows to boost efficiency and speed",
    },
    {
      icon: <Cloud className="w-8 h-8 text-white" />,
      title: "Cloud + Infrastructure Modernization",
      desc: "Secure, resilient, future-ready platforms",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      title: "Governance, Risk & Compliance with AI",
      desc: "Intelligent compliance automation for enterprise trust",
    },
  ];

  /* Managed IT & AI Transformation – 2nd picture (uncomment when needed)
  const managedIT = [
    {
      icon: <Database className="w-6 h-6 text-teal-400" />,
      title: "Production IT Operations (AIOps)",
      desc: "AI-driven monitoring and self-healing systems for proactive IT management.",
    },
    {
      icon: <Smartphone className="w-6 h-6 text-teal-400" />,
      title: "Smart IT Support Agents (GenAI)",
      desc: "AI-powered conversational agents for instant support and issue resolution.",
    },
    {
      icon: <Cloud className="w-6 h-6 text-teal-400" />,
      title: "Cloud Cost Optimization with AI",
      desc: "AI-driven insights to optimize cloud spending and resource utilization.",
    },
    {
      icon: <Settings className="w-6 h-6 text-teal-400" />,
      title: "Modernization of Legacy Systems",
      desc: "AI-powered migration and transformation of outdated IT infrastructure.",
    },
  ];
  */

  return (
    <div className="pt-24 pb-12 md:pt-32 md:pb-20 relative z-10">
      {/* Hero */}
      <section className="container mx-auto px-4 md:px-6 mb-12 md:mb-24 grid md:grid-cols-2 gap-8 md:gap-12 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 md:mb-8 leading-tight">
            Engineer the Future. Transform with <br />
            <span className="text-teal-400">Intelligent Consulting.</span>
          </h1>
          <p className="text-xl text-gray-300 mb-6 md:mb-10 leading-relaxed">
            We combine AI-driven foresight, product innovation, and strategy
            consulting to help enterprises build smarter, scalable, and
            future-ready business ecosystems.
          </p>
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-center md:items-start justify-center md:justify-start">
            <Link to="/contact" className="w-full md:w-auto text-center inline-block bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-8 py-3 font-bold transition-all shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30">
              Let's Transform Together
            </Link>
            <button className="w-full md:w-auto bg-transparent border border-teal-400/50 hover:border-teal-400 hover:bg-teal-400/10 text-white px-8 py-3 font-bold transition-all">
              View Case Studies
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="bg-gradient-to-br from-teal-500/10 to-transparent p-1 rounded-[2.5rem] border border-teal-500/20 backdrop-blur-sm">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
              alt="Consulting Team"
              className="rounded-[2.4rem] w-full object-cover shadow-2xl opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* Scrolling Banner */}
      <div className="py-6 bg-navy-900/80 border-y border-white/10 overflow-hidden backdrop-blur-sm">
        <div className="animate-scroll-banner flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-8">
              <span className="text-cyan-400 text-sm font-medium tracking-wider">Powered by Responsible AI</span>
              <span className="text-white/30">•</span>
              <span className="text-cyan-400 text-sm font-medium tracking-wider">Built for Scale</span>
              <span className="text-white/30">•</span>
              <span className="text-cyan-400 text-sm font-medium tracking-wider">Security First</span>
              <span className="text-white/30">•</span>
              <span className="text-cyan-400 text-sm font-medium tracking-wider">Future-Proof Engineering</span>
              <span className="text-white/30">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Why Partner (Reused) */}
      <WhyPartner />

      {/* Consulting Services We Provide */}
      <section className="container mx-auto px-6 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
          Consulting Services We Provide
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyOfferings.map((item, idx) => (
            <div
              key={idx}
              className="service-page-card bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all group backdrop-blur-xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-teal-500/20 group-hover:via-cyan-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0"></div>
              <div className="service-page-card-icon bg-gradient-to-br from-teal-600 to-cyan-600 w-16 h-16 flex items-center justify-center mb-8 shadow-lg shadow-teal-600/20 transition-all duration-300 relative z-10">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 group-hover:text-teal-300 transition-colors relative z-10">
                {item.title}
              </h3>
              <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors relative z-10">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proof of Impact */}
      <section ref={proofRef} className="container mx-auto px-4 md:px-6 bg-gradient-to-b from-white/5 to-transparent py-12 md:py-24 mb-12 md:mb-24 border-y border-white/5 backdrop-blur-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-10 md:mb-16">
            Proof of Impact
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-10 w-full max-w-6xl mx-auto">
            {/* Keonics Case – sharp edges */}
            <div className="service-page-card bg-white/5 p-5 md:p-8 border border-white/10 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="bg-teal-600/30 p-2 rounded-lg">
                  <Zap className="text-teal-400 w-5 h-5" />
                </div>
                <span className="font-bold text-white tracking-widest text-sm">
                  KEONICS
                </span>
              </div>
              <h3 className="text-white font-bold mb-4 md:mb-6">
                AI-Powered Training Ops Digitalization
              </h3>
              <div className="grid grid-cols-3 gap-4 md:gap-6 border-t border-white/10 pt-4 md:pt-6">
                <div className="flex flex-col items-center text-center min-h-[4rem]">
                  <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-1 tabular-nums">
                    {impact.keonics.efficiency}%
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Reduction in manual processing
                  </div>
                </div>
                <div className="flex flex-col items-center text-center min-h-[4rem]">
                  <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-1 tabular-nums">
                    {impact.keonics.faster}x
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Decision speed improved
                  </div>
                </div>
                <div className="flex flex-col items-center text-center min-h-[4rem]">
                  <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-1 tabular-nums">
                    {impact.keonics.accuracy}%
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Data Accuracy
                  </div>
                </div>
              </div>
            </div>

            {/* KSAAD Case – sharp edges */}
            <div className="service-page-card bg-white/5 p-5 md:p-8 border border-white/10 text-left relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="bg-teal-600/30 p-2 rounded-lg">
                  <ShieldIcon className="text-teal-400 w-5 h-5" />
                </div>
                <span className="font-bold text-white tracking-widest text-sm">
                  KSAAD
                </span>
              </div>
              <h3 className="text-white font-bold mb-4 md:mb-6">
                Intelligent Audit Automation for Gov
              </h3>
              <div className="grid grid-cols-3 gap-4 md:gap-6 border-t border-white/10 pt-4 md:pt-6">
                <div className="flex flex-col items-center text-center min-h-[4rem]">
                  <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-1 tabular-nums">
                    {impact.ksaad.timeRed}%
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Time Reduction
                  </div>
                </div>
                <div className="flex flex-col items-center text-center min-h-[4rem]">
                  <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-1 tabular-nums">
                    {impact.ksaad.coverage}%
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Accuracy improvement
                  </div>
                </div>
                <div className="flex flex-col items-center text-center min-h-[4rem]">
                  <div className="text-2xl md:text-3xl font-bold text-teal-400 mb-1 tabular-nums">
                    {impact.ksaad.compliance}%
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">
                    Compliance
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Explore Full Portfolio Button */}
          <div className="mt-8 md:mt-12">
            <Link to="/portfolio" className="inline-flex bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-8 py-3.5 font-bold transition-all shadow-lg shadow-teal-600/20 hover:shadow-teal-600/30 items-center gap-2 mx-auto group border border-teal-400/30 hover:border-teal-400">
              Explore Full Portfolio
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Steps – stepper runs when you scroll here; ball moves left to right; content cumulative */}
      <section className="container mx-auto px-6 pb-24 text-center">
        <h2 className="text-2xl font-bold text-white mb-16">
          Consulting Engagement Process
        </h2>
        <div className="relative flex flex-col md:flex-row justify-center gap-8 md:gap-0 items-center">
          {/* Track line + ball (position driven by currentStep) */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-2 z-0 px-12">
            <div className="relative w-full h-1 bg-gradient-to-r from-teal-600 via-teal-500/80 to-white/10 rounded-full top-1/2 -translate-y-1/2">
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-teal-500 shadow-lg shadow-teal-500/50 stepper-ball z-10 -translate-x-1/2 ${currentStep === 0 ? "stepper-ball-snap" : ""}`}
                style={{
                  left:
                    currentStep === 0
                      ? "0%"
                      : currentStep === 1
                        ? "33.333%"
                        : currentStep === 2
                          ? "66.666%"
                          : "calc(100% - 0.5rem)",
                }}
              />
            </div>
          </div>
          {[
            { title: "Discover & Diagnose", desc: "Understanding your current state and challenges" },
            { title: "Co-Innovate & Prototype", desc: "Collaborative solution design and rapid prototyping" },
            { title: "AI-Driven Implementation", desc: "Smart deployment with continuous optimization" },
            { title: "Scale & Optimize", desc: "Enterprise-wide rollout and performance tuning" }
          ].map((step, i) => (
            <div
              key={i}
              className="flex flex-col items-center flex-1 relative z-10 group"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold text-white mb-6 border-4 border-navy-900 transition-all shadow-lg ${i === currentStep
                  ? "bg-gradient-to-br from-teal-500 to-cyan-500 scale-110 shadow-teal-500/40 ring-2 ring-teal-400/60"
                  : "bg-gradient-to-br from-teal-600 to-cyan-600 group-hover:scale-105 shadow-teal-600/20"
                  }`}
              >
                {i + 1}
              </div>
              {/* Content: show when circle reaches this point; keep visible (don't erase when moving to next) */}
              <div
                className={`min-h-[72px] w-full max-w-[200px] text-center transition-opacity duration-500 ${currentStep >= i ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
              >
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-gray-400">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Dark Theme */}
      <section ref={ctaRef} className="container mx-auto px-6 pt-8 pb-4">
        <div 
          className={`bg-gradient-to-r from-white/5 to-transparent backdrop-blur-xl p-12 md:p-20 text-center relative overflow-hidden border border-white/10 border-teal-400/20 shadow-[0_0_0_1px_rgba(20,184,166,0.15),0_0_24px_rgba(20,184,166,0.08)] hover:border-teal-400/40 hover:shadow-[0_0_0_1px_rgba(20,184,166,0.25),0_0_32px_rgba(20,184,166,0.12)] transition-all duration-1000 ${
            ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Decorative blur effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 blur-[80px] rounded-full -z-10"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Ready to Transform with AI-Driven Strategy?
            </h2>
            <p className="text-gray-300 text-lg mb-6">
              Let's accelerate your journey to a smarter future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white px-8 py-3 font-semibold transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105">
                Schedule a Strategy Call
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
