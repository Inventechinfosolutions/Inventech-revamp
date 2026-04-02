import {
  Briefcase,
  Cpu,
  Cloud,
  Landmark,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function CEOMessage() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [introVisible, setIntroVisible] = useState(false);
  const [strategyVisible, setStrategyVisible] = useState(false);
  const [unitsVisible, setUnitsVisible] = useState(false);
  const [stakeholdersVisible, setStakeholdersVisible] = useState(false);
  const [roadmapVisible, setRoadmapVisible] = useState(false);
  const [commitmentVisible, setCommitmentVisible] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const strategyRef = useRef<HTMLDivElement>(null);
  const unitsRef = useRef<HTMLDivElement>(null);
  const stakeholdersRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const commitmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeroVisible(true);

    const observers = [
      { ref: introRef, setter: setIntroVisible },
      { ref: strategyRef, setter: setStrategyVisible },
      { ref: unitsRef, setter: setUnitsVisible },
      { ref: stakeholdersRef, setter: setStakeholdersVisible },
      { ref: roadmapRef, setter: setRoadmapVisible },
      { ref: commitmentRef, setter: setCommitmentVisible },
    ];

    const observerInstances = observers.map(({ ref, setter }) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setter(true);
            }
          });
        },
        {
          threshold: 0.2,
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
  const businessUnits = [
    {
      icon: <Landmark className="w-6 h-6 text-teal-400" />,
      title: "GovTech",
      desc: "Secure, compliant modernization for government and regulated ecosystems—where trust and accountability are non-negotiable.",
    },
    {
      icon: <Cpu className="w-6 h-6 text-cyan-400" />,
      title: "AI IT Services & Solutions",
      desc: "Practical AI enablement—automation, analytics, AI integration, and operational workflows that improve productivity and decision-making.",
    },
    {
      icon: <Cloud className="w-6 h-6 text-teal-400" />,
      title: "Products (Scalable IP & Platforms)",
      desc: "Reusable IP that converts delivery excellence into platforms, accelerators, and productized offerings that scale beyond one-off projects.",
    },
    {
      icon: <Briefcase className="w-6 h-6 text-cyan-400" />,
      title: "IT Consulting & Talent Deployment",
      desc: "Execution velocity—deployment-ready expertise that accelerates delivery, adoption, and continuity.",
    },
  ];

  const stakeholderMessages = [
    {
      to: "To our customers",
      message:
        "You should expect clarity, speed, and accountability. We will reduce complexity—not add to it. Our promise is simple: measurable outcomes, secure implementations, and delivery models that scale with your needs. We aim to be the partner you trust when the work is mission-critical.",
    },
    {
      to: "To our employees and future talent",
      message:
        "This is a builder's journey. We are creating a culture where high standards are supported by strong systems—clear ownership, repeatable playbooks, continuous learning, and global exposure. If you want to build where AI is a practical operating principle (not a buzzword), and where platforms and solutions are engineered to scale, InvenTech will be a compelling place to grow your career.",
    },
    {
      to: "To our investors",
      message:
        "We are building an aggressive-growth company with a long horizon—grounded in scalable economics: recurring services, repeatable delivery, and IP-led products that compound value over time. Our focus is durable execution, market expansion, and disciplined scaling across geographies—while protecting quality and trust.",
    },
    {
      to: "To our partners",
      message:
        "The next decade will be shaped by ecosystems. We are committed to transparent collaboration—co-selling, co-delivery, platform partnerships, and shared execution standards. If you build capabilities that align with our SBUs and growth priorities, there is significant opportunity to create repeatable wins together.",
    },
  ];

  return (
    <div className="pt-32 pb-20 relative z-10">
      {/* Hero Section - mobile: phrase first then photo, centered; desktop: side by side */}
      <section ref={heroRef} className="container mx-auto px-6 mb-24 grid md:grid-cols-2 gap-12 items-center">
        <div className={`order-1 md:order-1 text-center md:text-left ${heroVisible ? "ceo-hero-text-visible" : "ceo-hero-text-hidden"}`}>
          <div className="w-16 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 mb-8 mx-auto md:mx-0"></div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            A Message from <br />
            <span className="text-cyan-400">Our CEO</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-xl leading-relaxed italic mx-auto md:mx-0">
            "Vision, strategy, and commitment for InvenTech's next decade of
            growth."
          </p>
        </div>
        <div className={`order-2 md:order-2 relative flex justify-center ${heroVisible ? "ceo-hero-image-visible" : "ceo-hero-image-hidden"}`}>
          <div className="relative w-full max-w-[460px] aspect-[3/4] overflow-hidden border border-white/10 bg-navy-900/50 shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 via-transparent to-transparent opacity-60 z-10 pointer-events-none"></div>
            <img
              src="/ceo-new.png"
              alt="Kempe Gowda, Founder and CEO"
              className="absolute inset-0 z-0 h-full w-full object-cover origin-center transition-transform duration-700 group-hover:scale-110"
              style={{
                filter: "brightness(1.1) contrast(1.1) saturate(1.2)",
                objectPosition: "center 28%",
              }}
            />
            {/* Animated gradient border on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-teal-500/20 group-hover:via-cyan-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-20"></div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-600/20 rounded-full blur-[80px] animate-pulse-slow"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-[80px] animate-pulse-slow-delayed"></div>
        </div>
      </section>

      {/* Intro Text */}
      <section ref={introRef} className="container mx-auto px-6 mb-24 max-w-4xl text-left">
        <div className={`space-y-8 text-gray-300 text-lg leading-relaxed ${introVisible ? "ceo-intro-visible" : "ceo-intro-hidden"}`}>
          <p>
            Inventech is entering a defining stage—one that will set the tone
            for a new decade of growth, resilience, and global impact.
          </p>
          <p>
            Our aspiration is bold: to build toward a 100X growth trajectory
            over the next five years by scaling four strategic business units
            as one integrated execution engine—GovTech, AI IT Services &
            Solutions, Products (Scalable IP & Platforms), and IT Consulting &
            Talent Deployment. This is not ambition for its own sake. The world
            is changing fast, and our customers, teams, and partners need a
            technology company that can modernize systems, operationalize AI,
            and deliver outcomes at speed—repeatedly and responsibly.
          </p>
        </div>
      </section>

      {/* Why this moment matters */}
      <section ref={strategyRef} className="container mx-auto px-6 mb-32">
        <div className={`bg-white/5 border border-white/10 p-12 md:p-20 backdrop-blur-md relative overflow-hidden group ${strategyVisible ? "ceo-strategy-card-visible" : "ceo-strategy-card-hidden"}`}>
          {/* Animated gradient border on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-teal-500/20 group-hover:via-cyan-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0"></div>
          <div className="relative z-10 space-y-8">
            <div className="text-left mb-12">
              <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mb-6"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Why this moment matters
              </h2>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors">
              Across industries and geographies, we are witnessing a structural shift: automation is becoming default, AI is moving from experiments to enterprise operations, and public-sector modernization is accelerating under real pressure for transparency, compliance, and efficiency. In parallel, the talent model is being redesigned—organizations want agile, accountable delivery rather than slow, fragmented execution.<br/>
              InvenTech's strategy is built for this reality.
            </p>
            {/* <p className="text-white text-lg leading-relaxed font-semibold group-hover:text-cyan-300 transition-colors">
              InvenTech's strategy is built for this reality.
            </p> */}

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 text-left">
                Our operating belief
              </h3>
              <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mb-8"></div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">
                We believe scale is earned through delivered outcomes—working systems, measurable efficiency gains, secure operations, and solutions that can replicate across teams and regions. That is why our four SBUs are designed to reinforce one another:
              </p>
              <p className="text-gray-400 leading-relaxed italic group-hover:text-gray-300 transition-colors">
                Together, these SBUs form one growth system: services that deliver outcomes today, and IP that multiplies outcomes tomorrow—supported by rigorous governance, security-by-design, and disciplined program execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Units */}
      <section ref={unitsRef} className="container mx-auto px-6 mb-32">
        <div className={`text-left mb-16 ${unitsVisible ? "ceo-section-title-visible" : "ceo-section-title-hidden"}`}>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-600 to-cyan-600 mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Four Strategic Business Units
          </h2>
          <p className="text-gray-400">
            To deliver on our vision, we have structured our operations around four strategic business units (SBUs), each designed to address specific market needs while contributing to a unified ecosystem of innovation:
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {businessUnits.map((unit, idx) => (
            <div
              key={idx}
              className={`ceo-unit-card bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all group backdrop-blur-sm relative overflow-hidden ${unitsVisible ? "ceo-unit-card-visible" : "ceo-unit-card-hidden"}`}
              style={unitsVisible ? { animationDelay: `${idx * 0.15}s` } : {}}
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-teal-500/20 group-hover:via-cyan-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0"></div>
              <div className="relative z-10">
              <div className={`ceo-unit-card-icon w-14 h-14 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-all ${
                idx % 2 === 0 ? 'bg-teal-600/20 group-hover:bg-teal-600 group-hover:shadow-[0_0_20px_rgba(20,184,166,0.4)]' : 'bg-cyan-600/20 group-hover:bg-cyan-600 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]'
              }`}>
                <div className={`transition-colors ${
                  idx % 2 === 0 ? 'text-teal-400 group-hover:text-white' : 'text-cyan-400 group-hover:text-white'
                }`}>
                  {unit.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors">
                {unit.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                {unit.desc}
              </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stakeholders Message */}
      <section ref={stakeholdersRef} className="container mx-auto px-6 mb-32">
        <div className={`mb-16 ${stakeholdersVisible ? "ceo-section-title-visible" : "ceo-section-title-hidden"}`}>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            A message to our stakeholders
          </h2>
        </div>
        <div className="space-y-8 max-w-4xl">
          {stakeholderMessages.map((item, idx) => (
            <div
              key={idx}
              className={`border-l-4 ${idx % 2 === 0 ? 'border-teal-400' : 'border-cyan-400'} pl-6 py-2 ${stakeholdersVisible ? "ceo-stakeholder-card-visible" : "ceo-stakeholder-card-hidden"}`}
              style={stakeholdersVisible ? { animationDelay: `${idx * 0.15}s` } : {}}
            >
              <h3 className={`font-bold mb-3 text-lg transition-colors ${
                idx % 2 === 0 ? 'text-teal-400' : 'text-cyan-400'
              }`}>
                {item.to}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Innovation Roadmap */}
      <section ref={roadmapRef} className="container mx-auto px-6 mb-32">
        <div className={`text-left mb-16 ${roadmapVisible ? "ceo-section-title-visible" : "ceo-section-title-hidden"}`}>
          <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Innovation roadmap - AI now, Quantum next
          </h2>
        </div>

        <div className={`max-w-4xl space-y-8 text-gray-300 text-lg leading-relaxed text-left ${roadmapVisible ? "ceo-roadmap-visible" : "ceo-roadmap-hidden"}`}>
          <p>
            Over the next five years, our focus is to industrialize AI-enabled delivery—securely, responsibly, and at scale—across government and enterprise use cases. We will deepen capabilities in automation, applied AI, agentic workflows, data engineering, and operational governance.
          </p>
          <p className="text-white font-semibold">
            At the same time, we are preparing for the next goalpost.
          </p>
          <p>
            Our Quantum Vision represents our forward strategic direction for the second half of this decade. As quantum technologies mature, they will influence security, optimization, simulation, and computation. We intend to build readiness early—through research-led partnerships, capability development, and practical pathways—so InvenTech is positioned ahead of the curve, not reacting to it.
          </p>
        </div>
      </section>

      {/* Final Commitment Section */}
      <section ref={commitmentRef} className="container mx-auto px-6 mb-4 pb-8">
        <div className={`max-w-4xl ${commitmentVisible ? "ceo-commitment-visible" : "ceo-commitment-hidden"}`}>
          <div className="mb-8">
            <div className="w-12 h-1 bg-gradient-to-r from-teal-400 to-cyan-400 mb-6"></div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              The commitment
            </h2>
          </div>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            A growth chapter of this magnitude demands discipline and trust. We will hold ourselves to non-negotiables: execution excellence, measurable outcomes, security and compliance, responsible AI, and a culture that attracts serious builders.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed mb-16">
            If you are a customer looking for a modernization partner, a professional looking to build at the frontier, an investor seeking scalable growth, or a partner ready to shape markets together—I invite you to join us in building InvenTech's next chapter.
          </p>

          <div className="flex items-center justify-between border-t border-white/10 pt-8">
            <div>
              <div className="text-white font-bold text-xl mb-1">
                Kempe Gowda
              </div>
              <div className="text-gray-400 text-sm">
                CEO, InvenTech
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-full flex items-center justify-center">
              <Cpu className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
