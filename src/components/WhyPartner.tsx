import { ShieldCheck, TrendingUp, Users, Cpu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const reasons = [
  {
    icon: <Cpu size={24} />,
    title: "AI-Powered Strategic Expertise",
    desc: "Predict trends, reduce risks, and make smarter business decisions with real-time market intelligence.",
  },
  {
    icon: <ShieldCheck size={24} />,
    title: "Industry-Proven Technology Leadership",
    desc: "Powered by 15+ years delivering outcomes for government and enterprise sectors.",
  },
  {
    icon: <Users size={24} />,
    title: "Human + Machine Intelligence",
    desc: "Consultants embedded with AI decision systems for aligned, adaptive growth.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Impact At Scale",
    desc: "From experimentation to enterprise rollout, we deliver measurable transformation.",
  },
];

export default function WhyPartner() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false);
            // Force re-render to restart animation
            setTimeout(() => {
              setAnimationKey(prev => prev + 1);
              setIsVisible(true);
            }, 50);
          } else {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Why Partner With Us
        </h2>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {reasons.map((item, idx) => (
          <div
            key={`${idx}-${animationKey}`}
            className={`enhanced-partner-card bg-white/2 border border-cyan-400/25 p-8 hover:bg-white/5 hover:border-cyan-400/50 transition-all text-left group backdrop-blur-xl relative overflow-hidden home-partner-card ${
              isVisible
                ? "partner-card-left-visible"
                : "partner-card-left-hidden"
            }`}
            style={isVisible ? { animationDelay: `${idx * 0.3}s` } : {}}
          >
            {/* Animated gradient border on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-sky-500/0 to-teal-500/0 group-hover:from-cyan-500/20 group-hover:via-sky-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0"></div>
            
            <div className="bg-gradient-to-br from-cyan-500/20 to-teal-600/20 w-12 h-12 flex items-center justify-center text-cyan-300 mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-cyan-500/20 border border-cyan-500/30 relative z-10 home-partner-icon">
              <div className="group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                {item.icon}
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-4 leading-tight group-hover:text-cyan-300 transition-colors relative z-10">
              {item.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors relative z-10">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
