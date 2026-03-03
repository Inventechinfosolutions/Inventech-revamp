import { Rocket, Rocket as InnovationFirst, Eye as Transparency, Users as Collaboration, ShieldCheck as EthicalAI, ArrowRight, Eye, Settings, Building2, Lightbulb } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function AboutUs() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [storyVisible, setStoryVisible] = useState(false);
  const [statValues, setStatValues] = useState<number[]>([0, 0, 0, 0]);
  const [statsDone, setStatsDone] = useState(false);
  const [visionVisible, setVisionVisible] = useState(false);
  const [timelineVisible, setTimelineVisible] = useState(false);
  const [timelineItemsVisible, setTimelineItemsVisible] = useState<number[]>([]);
  const [whyVisible, setWhyVisible] = useState(false);
  const [ceoVisible, setCeoVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const testimonials = [
    {
      name: "Vadiraj Karanam",
      designation: "Senior Technology Consultant",
      quote: "Being part of Inventech aligns strongly with my professional values and passion for building meaningful, scalable solutions. The culture of trust, innovation, and technical excellence makes this a place where I truly feel I belong. I'm proud to contribute to a team that consistently turns vision into impact.",
      image: "/Vadiraj.png",
    },
    {
      name: "Raghavendra Murthy",
      designation: "VP Infra services",
      quote: "Our Infrastructure Services practice is focused on delivering secure, scalable, and resilient technology foundations that enable business continuity and growth. We combine deep domain expertise, proven processes, and innovation to support our customers' evolving needs.",
      image: "/Raghavendra%20Murthy%201.png",
    },
    {
      name: "Sanjay B. Jain",
      designation: "Strategist & Implementation Consultant",
      quote: "Inventech demonstrates strong technical depth combined with a clear new age execution mindset. The team consistently brings practical, scalable solutions, especially in complex IT and AI environments, while maintaining a strong focus on quality, timelines, and long-term value.",
      image: "",
    },
    {
      name: "Harsha Arali",
      designation: "General Manager",
      quote: "\"My Journey from Sales Manager to GM within a decade at InvenTech was tenacious, I've seen the company evolve with technology and innovation while maintaining its core values.\" \"Our leaders don't just give directions — they inspire. Their support makes every challenge achievable.\"",
      image: "/harsha.png",
    },
  ];

  useEffect(() => {
    setImageError(false);
  }, [testimonialIndex]);

  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const visionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const whyRef = useRef<HTMLDivElement>(null);
  const ceoRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setHeroVisible(true);

    const observers = [
      { ref: storyRef, setter: setStoryVisible },
      { ref: visionRef, setter: setVisionVisible },
      { 
        ref: timelineRef, 
        setter: setTimelineVisible,
        onVisible: () => {
          // Sequential timeline animation
          const milestones = [0, 1, 2, 3, 4];
          milestones.forEach((index, i) => {
            setTimeout(() => {
              setTimelineItemsVisible((prev) => [...prev, index]);
            }, i * 400); // 400ms delay between each card
          });
        }
      },
      { ref: whyRef, setter: setWhyVisible },
      { ref: ceoRef, setter: setCeoVisible },
      { ref: ctaRef, setter: setCtaVisible },

    ];

    const observerInstances = observers.map(({ ref, setter, onVisible }) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setter(true);
              if (onVisible) {
                onVisible();
              }
            } else {
              // Reset timeline when out of view
              if (ref === timelineRef) {
                setTimelineItemsVisible([]);
              }
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: "0px 0px -40px 0px",
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

  // Count-up animation for stats: random delay per stat, then animate to target and stop
  const statTargets = [15, 100, 25, 10];
  useEffect(() => {
    if (!storyVisible || statsDone) return;
    const duration = 1800;
    const delays = statTargets.map(() => Math.random() * 400);
    let rafId: number;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const next = statTargets.map((target, i) => {
        const d = delays[i];
        if (elapsed < d) return 0;
        const t = Math.min((elapsed - d) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 2);
        return Math.floor(eased * target);
      });
      setStatValues(next);
      const allDone = next.every((v, i) => v >= statTargets[i]);
      if (allDone) {
        setStatValues(statTargets);
        setStatsDone(true);
        return;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [storyVisible, statsDone]);

  return (
    <div className="pt-24 pb-0 relative z-10" style={{marginTop: '-10px'}}>
      {/* Hero – phrase, text, buttons + picture on first screen. The Inventech Story on next scroll. */}
      <section
        ref={heroRef}
        className="min-h-[calc(100vh-5rem)] flex flex-col justify-center container mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className={`text-center md:text-left ${heroVisible ? "about-hero-text-visible" : "about-hero-text-hidden"}`}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 md:mb-6 leading-tight">
              15+ Years of <br />
              Innovation, & <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Impact.</span>
            </h1>
            <p className="text-base sm:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-xl md:max-w-none mx-auto md:mx-0">
              From IT consulting to AI-driven transformation — we empower enterprises and governments to build intelligent, scalable, and future-ready solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Link to="/contact#global-location" className="inline-block bg-white/5 border border-cyan-400/50 text-white px-8 py-4 font-bold hover:bg-cyan-400/10 hover:border-cyan-400 transition-all backdrop-blur-md active:scale-95 text-center">
                View Our Location
              </Link>
              <Link to="/portfolio" className="inline-block bg-white/5 border border-cyan-400/50 text-white px-8 py-4 font-bold hover:bg-cyan-400/10 hover:border-cyan-400 transition-all backdrop-blur-md active:scale-95 text-center">
                Meet our Leaders
              </Link>
            </div>
          </div>
          <div className={`flex justify-center relative ${heroVisible ? "about-hero-image-visible" : "about-hero-image-hidden"}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 blur-[100px] rounded-full animate-pulse-slow"></div>
            <div className="relative z-10 w-full max-w-md">
              <img
                src="/ai-software-v2.png"
                alt="Global Impact"
                className="w-full h-auto rounded-2xl border-4 border-white/10 shadow-2xl animate-enhanced-floating"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Inventech Story - decade stats: one column on mobile for alignment */}
      <section ref={storyRef} className="container mx-auto px-4 sm:px-6 mb-24 md:mb-32">
        <div className={`bg-white/3 border border-white/5 backdrop-blur-xl p-6 sm:p-12 ${storyVisible ? "about-story-visible" : "about-story-hidden"}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-4">
            The Inventech Story
          </h2>
          <p className="text-gray-300 text-center text-sm sm:text-base mb-8 md:mb-12 max-w-2xl mx-auto">
            Since 2010, Inventech has been at the forefront of digital transformation — from early IT infrastructure to building modern AI-powered ecosystems. Today, we help organizations reimagine workflows, decision-making, and scalability with advanced analytics, automation, and intelligent engineering.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-center">
            {[
              { label: "Years of Excellence", color: "text-teal-400" },
              { label: "Digital Transformations", color: "text-cyan-400" },
              { label: "Industry Verticals", color: "text-blue-400" },
              { label: "Government Partnerships", color: "text-teal-400" },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="min-w-0 bg-white/5 border border-white/10 p-4 sm:p-6 hover:bg-white/10 hover:border-cyan-400/30 transition-all group"
                style={storyVisible ? { animationDelay: `${idx * 0.1}s` } : {}}
              >
                <div className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 ${stat.color} group-hover:scale-110 transition-transform tabular-nums`}>
                  {statValues[idx]}+
                </div>
                <div className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section ref={visionRef} className="container mx-auto px-6 mb-32">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Vision */}
          <div className={`relative ${visionVisible ? "about-vision-visible" : "about-vision-hidden"}`}>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-teal-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="relative bg-white/3 border border-white/5 backdrop-blur-xl p-8 h-full">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Eye className="w-8 h-8 text-teal-400" /> Our Vision
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                To become a next-generation technology company that unifies GovTech, AI services, product IP, and talent-led delivery into one execution engine for digital modernization.
              </p>
              <div className="mt-8 overflow-hidden rounded-lg border border-white/10">
                <img
                  src="/ourvision.png"
                  alt="Vision"
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className={`relative mt-12 md:mt-0 ${visionVisible ? "about-mission-visible" : "about-mission-hidden"}`}>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow-delayed"></div>
            <div className="relative bg-white/3 border border-white/5 backdrop-blur-xl p-8 h-full">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <Rocket className="w-8 h-8 text-cyan-400" /> Our Mission
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg mb-6">
                To help governments and enterprises modernize faster and smarter by delivering AI-enabled solutions, productized platforms, and deployment-ready teams—while building reusable IP that scales across sectors.
              </p>
              <div className="mt-8 overflow-hidden rounded-lg border border-white/10">
                <img
                  src="/mission.png"
                  alt="Mission"
                  className="w-full h-64 object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline - mobile: single column left of line, animations work correctly */}
      <section ref={timelineRef} className="container mx-auto px-4 sm:px-6 mb-24 md:mb-32">
        <div className={`text-center mb-10 md:mb-16 ${timelineVisible ? "about-timeline-title-visible" : "about-timeline-title-hidden"}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            A Decade of Innovation and Impact
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mx-auto rounded-full"></div>
        </div>

        <div className="relative min-h-[800px]">
          {/* Static line background - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 w-0.5 h-full bg-gradient-to-b from-teal-400/20 via-cyan-400/20 to-teal-400/20 -translate-x-1/2"></div>
          
          {/* Animated line - hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 w-0.5 -translate-x-1/2 overflow-hidden" style={{ height: timelineVisible ? "100%" : "0%", transition: "height 2s ease-out" }}>
            <div className="w-full h-full bg-gradient-to-b from-teal-400 via-cyan-400 to-teal-400"></div>
          </div>
          
          
          {[
            { year: "2010", title: "Inception & Early Wins", desc: "Founded in Bangalore with a vision to deliver intelligent IT solutions.", side: "left", position: 0 },
            { year: "2014", title: "Global Expansion", desc: "Expanded into enterprise development and managed services.", side: "right", position: 25 },
            { year: "2018", title: "Platform Revolution", desc: "Opened offices in Hyderabad and the USA.", side: "left", position: 50 },
            { year: "2022", title: "AI Leadership", desc: "Introduced AI and automation-driven consulting solutions.", side: "right", position: 75 },
            { year: "Today", title: "Market Leader", desc: "Partnering with global enterprises to build the future with AI.", side: "left", highlight: true, position: 100 }
          ].map((milestone, idx) => {
            const isVisible = timelineItemsVisible.includes(idx);
            
            return (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:items-center justify-center md:justify-between mb-12 md:mb-16 relative"
                style={{ position: 'relative' }}
              >
                <div className={`w-full max-w-md mx-auto md:max-w-none md:mx-0 md:w-5/12 md:pr-0 ${milestone.side === "left" ? "md:text-right md:pr-8" : "md:pl-8 md:order-2"} ${isVisible ? milestone.side === "left" ? "about-timeline-card-left-visible" : "about-timeline-card-right-visible" : milestone.side === "left" ? "about-timeline-card-left-hidden" : "about-timeline-card-right-hidden"}`}>
                  <div className={`bg-white/5 border border-white/10 p-5 sm:p-6 backdrop-blur-xl hover:bg-white/10 hover:border-cyan-400/30 transition-all ${milestone.highlight ? "bg-gradient-to-br from-teal-600/20 to-cyan-600/20 border-cyan-400/50 md:scale-105" : ""}`}>
                    <div className={`text-2xl font-bold mb-2 ${milestone.highlight ? "text-cyan-400" : "text-teal-400"}`}>
                      {milestone.year}
                    </div>
                    <p className="text-sm text-gray-400">{milestone.desc}</p>
                  </div>
                </div>
                {/* Timeline dot - hidden on mobile */}
                <div className={`hidden md:block absolute left-1/2 -translate-x-1/2 w-6 h-6 ${milestone.highlight ? "w-8 h-8" : ""} ${isVisible ? milestone.highlight ? "bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-pulse" : "bg-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.6)]" : "bg-gray-600 opacity-30"} rounded-full border-4 border-navy-900 z-10 transition-all duration-500`} style={{ top: '50%' }}></div>
                <div className={`hidden md:block w-0 md:w-5/12 ${milestone.side === "right" ? "md:order-1" : ""}`}></div>
              </div>
            );
          })}
          
          {/* Moving dot - hidden on mobile */}
          {timelineVisible && timelineItemsVisible.length > 0 && (
            <div 
              className="hidden md:block absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-cyan-400 rounded-full border-4 border-navy-900 shadow-[0_0_20px_rgba(34,211,238,0.8)] z-20 about-timeline-dot-moving"
              style={{ 
                top: `${Math.min(((timelineItemsVisible[timelineItemsVisible.length - 1] + 1) / 4) * 100, 100)}%`,
                marginTop: '-16px',
                transition: 'top 0.4s ease-out'
              }}
            ></div>
          )}
        </div>
      </section>

      {/* Why Inventech? */}
      <section ref={whyRef} className="py-24 mb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(20,184,166,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(34,211,238,0.05),transparent_50%)]"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className={`mb-12 ${whyVisible ? "about-why-title-visible" : "about-why-title-hidden"}`}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Inventech?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Our core strengths that set us apart in the digital transformation landscape
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Settings, title: "AI-Infused Development", desc: "Empowering systems with predictive intelligence and automation.", color: "from-cyan-600 to-cyan-700" },
              { icon: Building2, title: "Proven Industry Expertise", desc: "Decades of experience across GovTech, Healthcare, and Enterprise sectors.", color: "from-teal-600 to-teal-700" },
              { icon: Lightbulb, title: "Human-Centric Design", desc: "Designing intuitive experiences that bridge tech and usability.", color: "from-cyan-700 to-teal-700" },
              { icon: Rocket, title: "Trusted Delivery", desc: "Precision, transparency, and measurable business impact.", color: "from-teal-700 to-cyan-800" },
            ].map((item, i) => (
              <div
                key={i}
                className={`bg-white/5 border border-white/10 p-8 backdrop-blur-xl hover:bg-white/10 hover:border-cyan-400/30 transition-all group ${whyVisible ? "about-why-card-visible" : "about-why-card-hidden"}`}
                style={whyVisible ? { animationDelay: `${i * 0.15}s` } : {}}
              >
                <div className={`bg-gradient-to-br ${item.color} w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Message - tablet: 2x2 grid for feature cards, contained layout */}
      <section ref={ceoRef} className="container mx-auto px-4 sm:px-6 mb-32">
        <div className={`text-center mb-10 md:mb-12 ${ceoVisible ? "about-ceo-title-visible" : "about-ceo-title-hidden"}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Driven by Expertise. United by Innovation.
          </h2>
          <p className="text-gray-300 text-base md:text-lg">
            Meet the visionary leaders who drive our mission forward
          </p>
        </div>
        <div className="relative max-w-5xl mx-auto px-0 md:px-4">
          {/* Left Arrow - less offset on tablet */}
          <button
            type="button"
            onClick={() => setTestimonialIndex((i) => (i + testimonials.length - 1) % testimonials.length)}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-4 lg:-translate-x-12 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
            aria-label="Previous testimonial"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Right Arrow */}
          <button
            type="button"
            onClick={() => setTestimonialIndex((i) => (i + 1) % testimonials.length)}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-4 lg:translate-x-12 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors z-10"
            aria-label="Next testimonial"
          >
            <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className={`bg-white/5 border border-white/10 backdrop-blur-xl p-6 md:p-10 lg:p-16 overflow-hidden ${ceoVisible ? "about-ceo-card-visible" : "about-ceo-card-hidden"}`}>
          <div className="flex flex-col items-center text-center mb-6 md:mb-8">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border border-cyan-400/50 overflow-hidden mb-4 md:mb-6 shadow-sm flex items-center justify-center bg-white/5">
              {testimonials[testimonialIndex].image && !imageError ? (
                <img
                  src={testimonials[testimonialIndex].image}
                  alt={testimonials[testimonialIndex].name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <span className="text-3xl md:text-4xl font-bold text-cyan-400/80">
                  {testimonials[testimonialIndex].name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6 max-w-2xl">
              {testimonials[testimonialIndex].quote}
            </p>
            <div>
              <div className="text-white font-bold text-lg md:text-xl mb-1">{testimonials[testimonialIndex].name}</div>
              <div className="text-cyan-400 font-semibold">{testimonials[testimonialIndex].designation}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-white/10">
            {[
              { icon: InnovationFirst, label: "Innovation First", desc: "Leading with cutting-edge solutions" },
              { icon: Transparency, label: "Transparency", desc: "Open communication and honest practices" },
              { icon: Collaboration, label: "Collaboration", desc: "Partnership-driven approach" },
              { icon: EthicalAI, label: "Ethical AI", desc: "Responsible technology development" },
            ].map((item, i) => (
              <div key={i} className="min-w-0 text-center">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <item.icon className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="text-sm text-white font-semibold mb-1">{item.label}</div>
                <div className="text-xs text-gray-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="container mx-auto px-6 pb-16">
        <div className={`bg-gradient-to-r from-white/5 to-transparent backdrop-blur-xl p-12 md:p-20 text-center relative overflow-hidden border border-white/10 shadow-2xl transition-all duration-1000 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Decorative blur effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full -z-10"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-600/10 blur-[80px] rounded-full -z-10"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Let's Build the Future Together.
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Partner with us to transform your digital vision into intelligent, scalable reality.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white px-8 py-3 font-semibold transition-all shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 mx-auto">
              Start Your AI Journey
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
