import { Award, Star, ThumbsUp, Medal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function Awards() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility based on intersection to trigger animation every time
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="container mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-bold mb-16">Awards & Recognitions</h2>

      <div className="flex flex-wrap justify-center gap-12">
        {[
          { Icon: Medal, text: "Government-approved IT Systems Partner" },
          { Icon: Award, text: "Digital Innovation Recognition" },
          { Icon: ThumbsUp, text: "ISO Certified" },
          { Icon: Star, text: "AI Solution Architecture Excellence" },
        ].map(({ Icon, text }, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-4 bg-white/5 border border-cyan-400/25 p-8 w-48 hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-700 transform group ${isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
              }`}
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center text-white overflow-hidden shadow-lg shadow-teal-500/30">
              <Icon
                size={32}
                className="transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]"
              />
            </div>
            <p className="font-semibold text-sm">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
