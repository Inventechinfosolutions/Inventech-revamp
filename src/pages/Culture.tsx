import {
  Users,
  Heart,
  ArrowRight,
  Rocket,
  Search,
  Globe,
  Award,
  Brain,
  Code,
  Sprout,
  Trophy,
  BookOpen,
  Handshake,
  GraduationCap,
  Coins,
  Check,
  Upload,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { createPortal } from "react-dom";

const WEB3FORMS_ACCESS_KEY = "b4071e2f-08a4-4391-84b2-272ea2bb3ac2";

export default function Culture() {
  const [heroVisible, setHeroVisible] = useState(true);
  const [valuesVisible, setValuesVisible] = useState(true);
  const [galleryVisible, setGalleryVisible] = useState(true);
  const [benefitsVisible, setBenefitsVisible] = useState(true);
  const [testimonialsVisible, setTestimonialsVisible] = useState(true);
  const [ctaVisible, setCtaVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [careersFormData, setCareersFormData] = useState({
    fullName: "",
    designation: "",
    resumeFileName: "",
  });
  const [careersErrors, setCareersErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const resumeInputRef = useRef<HTMLInputElement>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHeroVisible(true);
    setValuesVisible(true);
    setGalleryVisible(true);
    setBenefitsVisible(true);
    setTestimonialsVisible(true);
    setCtaVisible(true);

    const observers = [
      { ref: valuesRef, setter: setValuesVisible },
      { ref: galleryRef, setter: setGalleryVisible },
      { ref: benefitsRef, setter: setBenefitsVisible },
      { ref: testimonialsRef, setter: setTestimonialsVisible },
      { ref: ctaRef, setter: setCtaVisible },
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

  const handleCareersChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "resume") {
      const file = (e.target as HTMLInputElement).files?.[0];
      setCareersFormData((prev) => ({
        ...prev,
        resumeFileName: file ? file.name : "",
      }));
    } else {
      setCareersFormData((prev) => ({ ...prev, [name]: value }));
    }
    if (careersErrors[name]) {
      setCareersErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCareersSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!careersFormData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    if (!careersFormData.designation.trim()) {
      newErrors.designation = "Designation / Area of interest is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setCareersErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const resumeFile = resumeInputRef.current?.files?.[0];
    if (resumeFile && resumeFile.size > 5 * 1024 * 1024) {
      alert("Resume file must be 5 MB or smaller.");
      setIsSubmitting(false);
      return;
    }

    const messageText = careersFormData.resumeFileName
      ? `Resume file: ${careersFormData.resumeFileName}`
      : "No resume attached";

    const submitAsJson = async () => {
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: careersFormData.fullName.trim(),
        "Designation / Area of Interest": careersFormData.designation.trim(),
        message: messageText,
        subject: `Career Application from ${careersFormData.fullName}`,
        from_name: "Inventech Portal - Culture",
        _template: "basic",
        _ip_address: "false",
      };
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      return res.json();
    };

    const submitWithFile = async () => {
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("name", careersFormData.fullName.trim());
      formData.append("Designation / Area of Interest", careersFormData.designation.trim());
      formData.append("message", messageText);
      formData.append("subject", `Career Application from ${careersFormData.fullName}`);
      formData.append("from_name", "Inventech Portal - Culture");
      formData.append("_template", "basic");
      formData.append("_ip_address", "false");
      if (resumeFile) formData.append("attachment", resumeFile);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      return res.json();
    };

    try {
      let result = resumeFile ? await submitWithFile() : await submitAsJson();

      if (result.success) {
        setIsModalOpen(false);
        setCareersFormData({ fullName: "", designation: "", resumeFileName: "" });
        if (resumeInputRef.current) resumeInputRef.current.value = "";
        setShowSuccessModal(true);
        return;
      }

      const msg = (result.message || "").toLowerCase();
      const isProFeatureError =
        msg.includes("pro feature") || msg.includes("file upload");

      if (resumeFile && isProFeatureError) {
        result = await submitAsJson();
        if (result.success) {
          setIsModalOpen(false);
          setCareersFormData({ fullName: "", designation: "", resumeFileName: "" });
          if (resumeInputRef.current) resumeInputRef.current.value = "";
          setShowSuccessModal(true);
          return;
        }
      }

      const errorMsg =
        result.message || "Something went wrong. Please try again later.";
      alert(`Submission Error: ${errorMsg}`);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error sending application. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const values = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      title: "Collaboration",
      desc: "We win together — not alone",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Rocket className="w-6 h-6 text-emerald-600" />,
      title: "Innovation",
      desc: "Always experimenting, always evolving",
      bgColor: "bg-emerald-50",
    },
    {
      icon: <Search className="w-6 h-6 text-purple-600" />,
      title: "Integrity",
      desc: "We do what's right, not what's easy",
      bgColor: "bg-purple-50",
    },
    {
      icon: <Globe className="w-6 h-6 text-amber-600" />,
      title: "Impact",
      desc: "Tech that improves lives & future",
      bgColor: "bg-amber-50",
    },
    {
      icon: <Award className="w-6 h-6 text-rose-600" />,
      title: "Excellence",
      desc: "High performance with zero compromise",
      bgColor: "bg-rose-50",
    },
    {
      icon: <Brain className="w-6 h-6 text-teal-600" />,
      title: "Continuous Learning",
      desc: "Curiosity is part of our DNA",
      bgColor: "bg-teal-50",
    },
  ];

  const galleryImages = [
    {
      url: "/culture-card-4.png",
      title: "Celebrating Wins, Big and Small",
      icon: <Trophy className="w-5 h-5 text-amber-600" />,
    },
    {
      url: "/culture-card-6.png",
      title: "Respect, Transparency, Open-Door Leadership",
      icon: <Handshake className="w-5 h-5 text-teal-600" />,
    },
    {
      url: "/culture-card-1.png",
      title: "Collective Growth Through Teamwork",
      icon: <Code className="w-5 h-5 text-blue-600" />,
    },
    {
      url: "/culture-card-2.png?v=2",
      title: "Well-being First — Flexible Work & Wellness",
      icon: <Sprout className="w-5 h-5 text-emerald-600" />,
    },
    {
      url: "/culture-card-3.png",
      title: "Diverse, Inclusive & Future-Ready Teams",
      icon: <Globe className="w-5 h-5 text-sky-600" />,
    },
    {
      url: "/culture-card-5.png",
      title: "Upskilling Culture — Learning Stipend",
      icon: <BookOpen className="w-5 h-5 text-purple-600" />,
    },
  ];

  const benefits = [
    {
      title: "Well-Being Benefits",
      icon: <Heart className="w-6 h-6 text-rose-500" />,
      items: ["Medical & mental health support", "Work-from-anywhere flexibility", "Wellness allowance"],
      bgColor: "bg-blue-50",
    },
    {
      title: "Career & Learning",
      icon: <GraduationCap className="w-6 h-6 text-emerald-500" />,
      items: ["Paid certifications in AI, Cloud, UX", "Mentorship programs & leadership tracks", "Sponsored conferences & global events"],
      bgColor: "bg-emerald-50",
    },
    {
      title: "Rewards & Financial",
      icon: <Coins className="w-6 h-6 text-amber-500" />,
      items: ["Competitive salaries & bonus program", "ESOP / profit-sharing", "Performance recognition awards"],
      bgColor: "bg-amber-50",
    },
    {
      title: "Inclusive Work Culture",
      icon: <Users className="w-6 h-6 text-purple-500" />,
      items: ["IDE programs (Inclusion, Diversity & Equity)", "Women in Tech initiatives", "Zero-tolerance harassment policy"],
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <div className="w-full max-w-full overflow-x-hidden pt-24 md:pt-32 pb-12 md:pb-20 relative z-10">
      {/* Hero Section */}
      <section ref={heroRef} className="w-full container mx-auto px-6 mb-12 md:mb-32">
        <div className={`relative overflow-hidden group min-w-0 ${heroVisible ? "culture-hero-visible" : "culture-hero-hidden"}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/40 to-transparent z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1600"
            className="w-full min-h-[440px] h-[440px] md:min-h-[520px] md:h-[520px] lg:h-[600px] object-cover object-center group-hover:scale-105 transition-transform duration-1000 opacity-60"
            alt="Culture"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center md:items-start px-6 md:px-12 lg:px-24 z-20 text-center md:text-left py-8 md:py-10 lg:py-0">

            <h1 className="text-4xl md:text-5xl lg:text-8xl font-bold text-white mb-4 md:mb-5 lg:mb-8 max-w-3xl leading-tight">
              Where Innovation <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                Meets People
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl leading-relaxed mx-auto md:mx-0 mb-4 md:mb-2 lg:mb-0">
              We build intelligent technology — and an inspiring workplace to match.
            </p>
            <div className="mt-6 md:mt-8 lg:mt-12 flex justify-center md:justify-start w-full md:w-auto">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-10 py-4 font-bold transition-all shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30 flex items-center gap-3 group active:scale-95 hover:scale-105"
              >
                Grow With Us{" "}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="mt-4 md:mt-6 lg:mt-8 flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 text-white/80 text-sm">
              <span>Innovation</span>
              <span>Integrity</span>
              <span>Learning</span>
              <span>Impact</span>
              <span>Belonging</span>
            </div>
          </div>
        </div>
      </section>

      {/* What Drives Us */}
      <section ref={valuesRef} className="w-full container mx-auto px-6 mb-12 md:mb-32">
        <div className={`text-left md:text-center mb-8 md:mb-16 ${valuesVisible ? "culture-section-title-visible" : "culture-section-title-hidden"}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            What Drives Us
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl md:mx-auto">
            We empower businesses and people through AI-driven innovation — built on ethics, collaboration, and purpose.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((val, idx) => (
            <div
              key={idx}
              className={`culture-value-card bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all hover:-translate-y-2 cursor-default group relative overflow-hidden ${valuesVisible ? "culture-value-card-visible" : "culture-value-card-hidden"}`}
              style={valuesVisible ? { animationDelay: `${idx * 0.1}s` } : {}}
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-teal-500/20 group-hover:via-cyan-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0"></div>
              <div className="relative z-10">
                <div className={`culture-card-icon w-14 h-14 bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:scale-110 transition-all ${idx % 2 === 0 ? 'group-hover:bg-teal-600/20 group-hover:border-teal-500/50 group-hover:shadow-lg group-hover:shadow-teal-500/50' : 'group-hover:bg-cyan-600/20 group-hover:border-cyan-500/50 group-hover:shadow-lg group-hover:shadow-cyan-500/50'
                  }`}>
                  {val.icon}
                </div>
                <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-400 transition-colors">{val.title}</h3>
                <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                  {val.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Life at InvenTech Photo Grid */}
      <section ref={galleryRef} className="py-12 md:py-24 mb-12 md:mb-32">
        <div className="container mx-auto px-6">
          <div className={`text-center mb-8 md:mb-16 ${galleryVisible ? "culture-section-title-visible" : "culture-section-title-hidden"}`}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              Life at Inventech
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-8">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className={`culture-gallery-card bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all hover:-translate-y-2 group ${galleryVisible ? "culture-gallery-card-visible" : "culture-gallery-card-hidden"}`}
                style={galleryVisible ? { animationDelay: `${idx * 0.15}s` } : {}}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 flex items-start gap-3">
                  <div className="culture-card-icon w-10 h-10 bg-white/10 flex items-center justify-center shrink-0">
                    {img.icon}
                  </div>
                  <h3 className="text-white font-bold text-sm leading-tight pt-2">{img.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Our Team Says */}
      <section ref={testimonialsRef} className="container mx-auto px-6 mb-12 md:mb-32">
        <div className={`text-center mb-8 md:mb-16 ${testimonialsVisible ? "culture-section-title-visible" : "culture-section-title-hidden"}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
            What Our Team Says
          </h2>
        </div>
        <div className="relative overflow-hidden" style={{ width: '100%' }}>
          <div className="animate-scroll-carousel">
            {[...Array(2)].map((_, setIdx) => (
              <div key={setIdx} className="flex gap-8 shrink-0 pr-8">
                {[
                  {
                    quote: "Inventech brings me new challenges through each project, giving me the opportunity to learn and adapt to both existing and upcoming technologies.",
                    name: "Prajwal U P",
                    role: "SR. Business Analyst",
                    image: "/Prajwal 2.png",
                  },
                  {
                    quote: "Every project here is a learning opportunity. It is an environment that helps me become better every day.",
                    name: "Bankey Bihari",
                    role: "Sr. UX UI Designer",
                    image: "/Bankey Profile 2.png",
                  },
                  {
                    quote: "Working here has helped me grow both technically and professionally. The leadership encourages innovation, ownership, and continuous learning.",
                    name: "Shiva Reddy",
                    role: "Sr. Software Engineer",
                    image: "/Shiva Reddy 2.png",
                  },
                  {
                    quote: "The collaborative work culture and project exposure helped me improve my technical and problem-solving skills.",
                    name: "Srinivas S Wasan",
                    role: "Sr. Analyst Software Engineering",
                    image: "/Srinivas 2.png",
                  },
                  {
                    quote: "Working with Inventech Info Solutions has been positive and professional. The team is responsive, cooperative, and well-organized.",
                    name: "Sheela V",
                    role: "Sr. HR Generalist",
                    image: "/Sheela V 2.png",
                  },
                  {
                    quote: "A great place to grow, with strong learning opportunities, supportive leadership, and a trust-based culture that empowers employees to perform at their best.",
                    name: "Pradyumna D S",
                    role: "Lead Database Administrator",
                    image: "/Pradumna 2.png",
                  },
                  {
                    quote: "Working at Inventech Info Solutions has strengthened my technical and problem-solving skills through collaboration and continuous learning across diverse tech stacks.",
                    name: "Anil Kishore D R",
                    role: "Software Developer",
                    image: "/Anil Kishore.png",
                  },
                  {
                    quote: "At Inventech, Opportunities are always knocking at our door. I have had the chance to work with inspiring people. The Career development and Learning opportunities here are boundless.",
                    name: "Manish Kumar Singh",
                    role: "Sr. Strategic Account Manager",
                    image: "/Manish.png",
                  },
                  {
                    quote: "Strong technical mentorship and well-structured processes make it an excellent workplace for developers to grow.",
                    name: "Ashok Teja Reddy",
                    role: "Sr. Software Engineer",
                    image: "/Ashok Teja.png",
                  },
                  {
                    quote: "A valuable and professionally enriching experience working with Inventech Info Solutions as an HR Manager, handling end-to-end HR operations and people management.",
                    name: "Ananth N",
                    role: "HR Manager",
                    image: "/Ananth N.png",
                  },
                  {
                    quote: "Working with Inventech Info Solutions as an Account Manager has been a great experience. I got the opportunity to work closely with clients, build strong relationships and connect with new people.",
                    name: "Pavan Gupta S",
                    role: "Strategic Account Manager",
                    image: "/Pavan Gupta.png",
                  },
                ].map((testimonial, idx) => (
                  <div
                    key={`${setIdx}-${idx}`}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 text-center hover:bg-white/10 hover:border-cyan-400/30 transition-all hover:-translate-y-2 w-[350px] shrink-0 group"
                  >
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-24 h-24 rounded-full mx-auto mb-6 object-cover border-2 border-cyan-400/30 shadow-lg shadow-cyan-400/10"
                    />
                    <h3 className="text-white font-bold text-xl mb-1 group-hover:text-cyan-400 transition-colors">{testimonial.name}</h3>
                    <p className="text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-4">{testimonial.role}</p>
                    <p className="text-gray-300 text-sm leading-relaxed group-hover:text-gray-200 transition-colors">
                      {testimonial.quote}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section ref={benefitsRef} className="container mx-auto px-6 mb-12 md:mb-32">
        <div className={`text-center mb-8 md:mb-16 ${benefitsVisible ? "culture-section-title-visible" : "culture-section-title-hidden"}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            What We Offer
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Empowering our people to do their best work — in life & at work.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className={`culture-benefit-card bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-all hover:-translate-y-2 group ${benefitsVisible ? "culture-benefit-card-visible" : "culture-benefit-card-hidden"}`}
              style={benefitsVisible ? { animationDelay: `${idx * 0.15}s` } : {}}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="culture-card-icon w-12 h-12 flex items-center justify-center shrink-0">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {benefit.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {benefit.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-gray-400 text-sm group-hover:text-gray-300 transition-colors"
                  >
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Events That Build Teams & Ideas */}
      {/* <section className="container mx-auto px-6 mb-32">
        <div className={`text-center mb-16 ${benefitsVisible ? "culture-section-title-visible" : "culture-section-title-hidden"}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Events That Build Teams & Ideas
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "🧠", title: "Annual Tech Innovation Summit", month: "March" },
            { icon: "🚀", title: "AI Hackathon Week", month: "July" },
            { icon: "🎉", title: "Foundation Day Celebration", month: "October" },
            { icon: "🌱", title: "Global Wellness Week", month: "May" },
            { icon: "👩‍💻", title: "Women in Tech Leadership Meetup", month: "Jan, Jun" },
            { icon: "🤝", title: "CSR Volunteering Day", month: "December" },
          ].map((event, idx) => (
            <div
              key={idx}
              className={`culture-event-card bg-white/5 border border-white/10 p-6 hover:bg-white/10 transition-all hover:-translate-y-2 group ${benefitsVisible ? "culture-event-card-visible" : "culture-event-card-hidden"}`}
              style={benefitsVisible ? { animationDelay: `${idx * 0.1}s` } : {}}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="culture-card-icon text-2xl inline-block">{event.icon}</span>
                <span className="text-gray-500 text-sm">{event.month}</span>
              </div>
              <h3 className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">
                {event.title}
              </h3>
            </div>
          ))}
        </div>
      </section> */}

      {/* Moments That Matter */}
      <section className="container mx-auto px-6 mb-32">
        <div className={`text-center mb-16 ${benefitsVisible ? "culture-section-title-visible" : "culture-section-title-hidden"}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Moments That Matter
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "/moments/moment-1.png",
            "/moments/moment-2.png",
            "/moments/moment-3.png",
            "/moments/moment-4.png",
            "/moments/moment-5.png",
            "/moments/moment-6.png",
            "/moments/moment-7.png",
            "/moments/moment-8.png",
          ].map((url, idx) => (
            <div
              key={idx}
              className={`aspect-square overflow-hidden group ${benefitsVisible ? "culture-gallery-card-visible" : "culture-gallery-card-hidden"}`}
              style={benefitsVisible ? { animationDelay: `${idx * 0.1}s` } : {}}
            >
              <img
                src={url}
                alt={`Moment ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="container mx-auto px-6 mb-12 md:mb-20 text-center">
        <div className={`bg-gradient-to-r from-teal-900/40 to-cyan-900/40 border border-white/10 p-8 md:p-20 backdrop-blur-xl group relative overflow-hidden ${ctaVisible ? "culture-cta-visible" : "culture-cta-hidden"}`}>
          {/* Animated gradient border on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 via-cyan-500/0 to-teal-500/0 group-hover:from-teal-500/20 group-hover:via-cyan-500/20 group-hover:to-teal-500/20 transition-all duration-500 pointer-events-none z-0"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 md:mb-8 group-hover:text-cyan-400 transition-colors">
              Build the Future With Us.
            </h2>
            <p className="text-base md:text-xl text-gray-300 mb-8 md:mb-12 max-w-2xl mx-auto group-hover:text-gray-200 transition-colors px-0">
              We're hiring thinkers, builders, innovators, and dreamers.
            </p>
            <div className="flex justify-center gap-6 flex-wrap">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white px-8 py-4 font-bold transition-all shadow-xl shadow-teal-600/20 hover:shadow-teal-600/30 active:scale-95 hover:scale-105 whitespace-nowrap"
              >
                Join Our Team
                <ArrowRight className="w-5 h-5 shrink-0 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-6 max-w-2xl mx-auto px-0">
              See open roles across AI, Cloud, DevOps, Product, UX, Data.
            </p>
          </div>
        </div>
      </section>

      {/* Grow With Us Modal – rendered in document.body so it stays centered in viewport */}
      {isModalOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="join-modal-title"
          >
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsModalOpen(false)}
            />
            <div
              className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900/95 to-slate-800/95 border border-white/10 rounded-2xl shadow-2xl shadow-teal-500/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-gradient-to-br from-slate-900/95 to-slate-800/95 z-10">
                <h3 id="join-modal-title" className="text-2xl font-bold text-white">
                  Join Our Team
                </h3>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCareersSubmit} className="p-6 space-y-5" noValidate>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={careersFormData.fullName}
                    onChange={handleCareersChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500/50 transition-all ${
                      careersErrors.fullName
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-teal-500/50"
                    }`}
                  />
                  {careersErrors.fullName && (
                    <span className="text-red-400 text-sm mt-1 block">
                      {careersErrors.fullName}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Designation / Area of Interest
                  </label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="e.g. Frontend Developer, UI Designer"
                    value={careersFormData.designation}
                    onChange={handleCareersChange}
                    className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500/50 transition-all ${
                      careersErrors.designation
                        ? "border-red-500 focus:border-red-500"
                        : "border-white/10 focus:border-teal-500/50"
                    }`}
                  />
                  {careersErrors.designation && (
                    <span className="text-red-400 text-sm mt-1 block">
                      {careersErrors.designation}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Resume (optional)
                  </label>
                  <div className="relative">
                    <input
                      ref={resumeInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      name="resume"
                      className="hidden"
                      id="resume-upload"
                      onChange={handleCareersChange}
                    />
                    <label
                      htmlFor="resume-upload"
                      className="flex items-center gap-3 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg cursor-pointer hover:bg-white/10 hover:border-teal-500/30 transition-all group"
                    >
                      <Upload className="w-5 h-5 text-teal-400 group-hover:text-teal-300 shrink-0" />
                      <span className="text-gray-400 group-hover:text-gray-300 truncate">
                        {careersFormData.resumeFileName || "Choose File - No file chosen"}
                      </span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-all shadow-lg shadow-teal-600/20 hover:shadow-teal-600/30 active:scale-[0.98]"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}

      {/* Success popup – same pattern as Contact page */}
      {showSuccessModal &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setShowSuccessModal(false)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="success-title"
          >
            <div
              className="bg-navy-900 border border-cyan-400/30 rounded-2xl p-8 max-w-sm w-full shadow-2xl shadow-cyan-500/10 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-5 ring-4 ring-green-500/30">
                <Check className="w-10 h-10 text-green-400" strokeWidth={2.5} />
              </div>
              <h3 id="success-title" className="text-2xl font-bold text-white mb-2">
                Submitted successfully!
              </h3>
              <p className="text-gray-300 mb-6">
                Your application has been sent. We'll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white font-bold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                OK
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
