import { useEffect, useRef, useState } from "react";
import {
  Building2,
  Stethoscope,
  GraduationCap,
  ShoppingCart,
  Factory,
  Landmark,
  Plane,
  Cpu,
  Leaf,
  Truck,
  Radio,
  ShieldCheck,
} from "lucide-react";

interface Industry {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const industries: Industry[] = [
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Real Estate",
    description: "Smart property management and digital transformation solutions for modern real estate enterprises.",
  },
  {
    icon: <Stethoscope className="w-8 h-8" />,
    title: "Healthcare",
    description: "HIPAA-compliant healthcare IT solutions, telemedicine platforms, and patient management systems.",
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: "Education",
    description: "E-learning platforms, student information systems, and digital campus solutions.",
  },
  {
    icon: <ShoppingCart className="w-8 h-8" />,
    title: "Retail & E-commerce",
    description: "Omnichannel retail solutions, inventory management, and personalized customer experiences.",
  },
  {
    icon: <Factory className="w-8 h-8" />,
    title: "Manufacturing",
    description: "Industry 4.0 solutions, IoT integration, and smart factory automation systems.",
  },
  {
    icon: <Landmark className="w-8 h-8" />,
    title: "Banking & Finance",
    description: "Secure fintech solutions, digital banking platforms, and fraud detection systems.",
  },
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Travel & Hospitality",
    description: "Booking engines, property management systems, and customer loyalty platforms.",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Technology",
    description: "Cloud infrastructure, DevOps solutions, and enterprise software development.",
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Energy & Utilities",
    description: "Smart grid solutions, energy management systems, and sustainability platforms.",
  },
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Logistics & Supply Chain",
    description: "Fleet management, warehouse automation, and end-to-end supply chain visibility.",
  },
  {
    icon: <Radio className="w-8 h-8" />,
    title: "Media & Entertainment",
    description: "Content management, streaming platforms, and digital asset management solutions.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Government & Public Sector",
    description: "Digital governance solutions, citizen services, and secure public infrastructure.",
  },
];

function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 p-6 transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] hover:-translate-y-1 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/0 to-cyan-400/0 group-hover:from-cyan-400/5 group-hover:to-cyan-400/[0.02] transition-all duration-500 pointer-events-none" />
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/50 transition-all duration-500" />
      
      {/* Icon container */}
      <div className="relative mb-4">
        <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-cyan-400/20 to-cyan-400/5 border border-cyan-400/30 text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-400/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
          {industry.icon}
        </div>
        {/* Icon glow */}
        <div className="absolute inset-0 w-14 h-14 bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
        {industry.title}
      </h3>
      <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
        {industry.description}
      </p>

      {/* Bottom corner accent */}
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-cyan-400/0 group-hover:border-cyan-400/30 transition-all duration-500" />
    </div>
  );
}

export default function IndustryCards() {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 xl:px-12 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-medium tracking-wider text-cyan-400 uppercase bg-cyan-400/10 border border-cyan-400/20">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Industries We <span className="text-cyan-400">Serve</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
            We deliver cutting-edge technology solutions across diverse industries, 
            helping businesses transform and thrive in the digital age.
          </p>
          {/* Decorative line */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan-400/50" />
            <div className="w-2 h-2 bg-cyan-400/50 rotate-45" />
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan-400/50" />
          </div>
        </div>

        {/* Industry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {industries.map((industry, index) => (
            <IndustryCard key={industry.title} industry={industry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
