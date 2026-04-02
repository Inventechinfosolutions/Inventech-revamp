import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function CEOMessage() {
  const [isVisible, setIsVisible] = useState(false);
  const [, setAnimationKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(false);
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
    <section ref={sectionRef} className="py-8 md:py-16 container mx-auto px-6">
      <div className="bg-gradient-to-r from-white/5 to-transparent p-6 md:p-20 border border-cyan-400/25 relative overflow-hidden backdrop-blur-xl home-ceo-card hover:border-cyan-400/50 transition-colors">
        {/* Enhanced decorative blur */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/20 blur-[100px] rounded-full -z-10 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/15 blur-[100px] rounded-full -z-10 animate-pulse-slow-delayed"></div>

        {/* Heading: centered on desktop, left-aligned on mobile for readability */}
        <div className={`text-left md:text-center mb-6 md:mb-12 ${isVisible ? "ceo-text-visible" : "ceo-text-hidden"}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-8">
            A Message from Our CEO
          </h2>
          {/* Quote box */}
          <div className="px-0 md:px-8 py-4 mb-12 w-full max-w-4xl md:inline-block">
            <p className="text-lg md:text-xl text-white font-medium text-left md:text-center">
              InvenTech is entering a defining chapter—one that will set the tone for our next decade of growth, relevance, and global impact.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className={`${isVisible ? "ceo-text-visible" : "ceo-text-hidden"} text-left`}>
            <p className="text-gray-300 leading-relaxed mb-6 text-lg">
              Our aspiration is bold: to build toward a 100X growth trajectory over the next five years by scaling four strategic business units as one integrated execution engine—GovTech, AI IT Services & Solutions, Products (Scalable IP & Platforms), and IT Consulting & Talent Deployment.
            </p>
            <p className="text-gray-300 leading-relaxed mb-8 text-lg">
              Our mission has always been clear: to deliver intelligent, scalable, and ethical solutions that empower organizations to thrive in an increasingly complex digital landscape.
            </p>
            {/* Read More button: centered on mobile only */}
            <div className="flex justify-center md:justify-start md:text-left">
              <Link to="/ceo-message" className="inline-block border border-cyan-400 text-cyan-400 px-12 py-3 font-medium hover:bg-cyan-400/10 hover:border-cyan-300 transition-all active:scale-95">
                Read More
              </Link>
            </div>
          </div>
          <div className={`relative flex justify-center md:justify-end ${isVisible ? "ceo-image-visible" : "ceo-image-hidden"}`}>
            <div className="relative w-full max-w-[400px] aspect-[3/4] overflow-hidden border border-cyan-400/20 bg-navy-900/50 shadow-2xl group ceo-image-container home-ceo-image">
              {/* Enhanced gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 via-transparent to-transparent z-10 pointer-events-none"></div>
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-transparent group-hover:from-cyan-500/20 transition-all duration-500 z-10 pointer-events-none"></div>
              <img
                src="/ceo-new.png"
                alt="Kempe Gowda, Founder and CEO"
                className="absolute inset-0 z-0 h-full w-full object-cover origin-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  filter: "brightness(1.1) contrast(1.05) saturate(1.1)",
                  objectPosition: "center 28%",
                }}
              />
              <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
                <div className="text-white font-bold text-xl mb-1 group-hover:text-cyan-300 transition-colors">Kempe Gowda</div>
                <div className="text-cyan-400 text-sm group-hover:text-cyan-300 transition-colors">Founder & CEO</div>
              </div>
              {/* Animated border glow */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/30 transition-all duration-500 pointer-events-none z-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
