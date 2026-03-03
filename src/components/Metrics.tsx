import { useEffect, useRef, useState } from "react";

const metrics = [
  { value: "4M+", label: "Citizens impacted through GovTech systems", numeric: 4, suffix: "M+", multiplier: 1000000 },
  { value: "70%", label: "Operational efficiency improvement for clients", numeric: 70, suffix: "%", multiplier: 1 },
  { value: "30+", label: "Projects executed local & globally", numeric: 30, suffix: "+", multiplier: 1 },
  { value: "600+", label: "Skilled Talent Pool for Managed Service Offering", numeric: 600, suffix: "+", multiplier: 1 },
];

export default function Metrics() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [counters, setCounters] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationTimersRef = useRef<ReturnType<typeof setInterval>[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Clear any existing timers
            animationTimersRef.current.forEach(timer => clearInterval(timer));
            animationTimersRef.current = [];
            
            setIsVisible(false);
            // Reset counters
            setCounters([0, 0, 0, 0]);
            
            // Force re-render to restart animation
            setTimeout(() => {
              setAnimationKey(prev => prev + 1);
              setIsVisible(true);
              
              // Start counter animations for each metric
              metrics.forEach((metric, idx) => {
                const duration = 2000; // 2 seconds
                const steps = 60;
                const increment = metric.numeric / steps;
                const stepDuration = duration / steps;
                
                let currentStep = 0;
                const timer = setInterval(() => {
                  currentStep++;
                  setCounters(prev => {
                    const newCounters = [...prev];
                    const newValue = Math.min(increment * currentStep, metric.numeric);
                    newCounters[idx] = newValue;
                    return newCounters;
                  });
                  
                  if (currentStep >= steps) {
                    clearInterval(timer);
                    setCounters(prev => {
                      const newCounters = [...prev];
                      newCounters[idx] = metric.numeric;
                      return newCounters;
                    });
                    // Remove timer from ref
                    animationTimersRef.current = animationTimersRef.current.filter(t => t !== timer);
                  }
                }, stepDuration);
                
                animationTimersRef.current.push(timer);
              });
            }, 50);
          } else {
            setIsVisible(false);
            // Clear timers when section is not visible
            animationTimersRef.current.forEach(timer => clearInterval(timer));
            animationTimersRef.current = [];
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
      // Cleanup timers on unmount
      animationTimersRef.current.forEach(timer => clearInterval(timer));
      animationTimersRef.current = [];
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 container mx-auto px-6 relative z-10">
      <div className="text-center relative z-10 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Proof Through Metrics
        </h2>
        <p className="text-cyan-300 mb-16 opacity-90 text-lg">
          Measurable impact across digital transformation projects
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((metric, idx) => (
            <div
              key={`${idx}-${animationKey}`}
              className={`enhanced-metric-card p-8 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-xl border border-cyan-400/25 hover:bg-white/10 hover:border-cyan-400/50 transition-all group home-metric-card ${
                isVisible
                  ? idx < 2
                    ? "metric-card-left-visible"
                    : "metric-card-right-visible"
                  : "metric-card-center-hidden"
              }`}
              style={isVisible ? { animationDelay: `${idx * 0.15}s` } : {}}
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-sky-500/0 to-teal-500/0 group-hover:from-cyan-500/20 group-hover:via-sky-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0"></div>
              
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors relative z-10">
                {`${Math.floor(counters[idx])}${metric.suffix}`}
              </div>
              <div className="text-sm text-cyan-200 group-hover:text-cyan-100 transition-colors relative z-10">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
