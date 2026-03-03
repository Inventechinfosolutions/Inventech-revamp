import { Cpu, Code, Palette, BarChart3, Shield, Cloud } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  {
    icon: <Cpu className="w-8 h-8 text-cyan-400" />,
    title: "AI & Emerging Tech",
    description:
      "Machine learning, automation, and cutting-edge AI solutions for business transformation.",
  },
  {
    icon: <Code className="w-8 h-8 text-cyan-400" />,
    title: "Software Development",
    description:
      "Custom web and mobile applications built with modern frameworks and best practices.",
  },
  {
    icon: <Palette className="w-8 h-8 text-cyan-400" />,
    title: "UI/UX Design",
    description:
      "User-centered design solutions that enhance engagement and drive conversions.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-cyan-400" />,
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights with advanced analytics and visualization.",
  },
  {
    icon: <Shield className="w-8 h-8 text-cyan-400" />,
    title: "Cyber Security",
    description:
      "Comprehensive security solutions to protect your digital assets and data.",
  },
  {
    icon: <Cloud className="w-8 h-8 text-cyan-400" />,
    title: "IT Outsourcing & Cloud",
    description:
      "Scalable cloud infrastructure and managed IT services for business continuity.",
  },
];

export default function ServicesWeProvide() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const wasInViewRef = useRef(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isInView = entry.isIntersecting;
          // Animate every time section *enters* view (scroll down or scroll up)
          if (isInView && !wasInViewRef.current) {
            setAnimationKey((k) => k + 1);
            setIsVisible(true);
          } else if (!isInView) {
            setIsVisible(false);
          }
          wasInViewRef.current = isInView;
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <section ref={sectionRef} className="py-16 container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Services We Provide
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Comprehensive technology solutions for modern businesses
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <div
            key={`${service.title}-${animationKey}`}
            className={`services-provide-card enhanced-partner-card bg-white/[0.06] border border-cyan-400/25 p-8 backdrop-blur-xl text-left group hover:bg-white/10 hover:border-cyan-400/50 relative overflow-hidden ${
              isVisible ? "services-provide-card-bottom-visible" : "services-provide-card-bottom-hidden"
            }`}
            style={isVisible ? { animationDelay: `${idx * 0.12}s` } : {}}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-sky-500/0 to-teal-500/0 group-hover:from-cyan-500/20 group-hover:via-sky-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0" />
            <div className="services-card-icon-wrapper bg-gradient-to-br from-cyan-500/20 to-teal-600/20 w-14 h-14 flex items-center justify-center border border-cyan-500/30 mb-6 relative z-10 transition-transform duration-300">
              {service.icon}
            </div>
            <h3 className="text-lg font-bold text-white mb-3 relative z-10">
              {service.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed relative z-10">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
