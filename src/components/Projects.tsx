import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const projects = [
  {
    title: "KEONICS Marketplace Procurement",
    category:
      "Built an AI-powered platform to centralize procurement, boosting transparency, speed, and innovation in government operations.",
    image: "/keonics-project.png",
    tag: "GovTech",
    caseStudyPath: "/case-study/keonics",
  },
  {
    title: "KSAAD Audit & Accounts Dashboard",
    category:
      "Advanced financial management system with real-time auditing, compliance tracking, and comprehensive reporting.",
    image: "/ksaad-project.png" ,
    tag: "FinTech",
    caseStudyPath: null,
  },
  {
    title: "IEBA Workforce Management Hub",
    category: "An all-in-one workforce management platform for time tracking, employee management, payroll, and intelligent reporting.",
    image: "/IEBA Workforce Management Hub.png",
    tag: "Retail",
    caseStudyPath: null,
  },
   {
    title: "KITS Startup–Government Bridge",
    category: "An AI-powered platform enabling governments to discover solutions, collaborate with industry, and address sector-specific challenges faster and more effectively.",
    image: "/KITS Startup–Government Bridge.png",
    tag: "GovTech",
    caseStudyPath: null,
  },
  {
    title: "BDA - Grievance Management Portal",
    category: "Web-based portal for SOP-based grievance handling with role-based workflows, SLA tracking, and audit trails.",
    image: "/bda-grievance-portal.png",
    tag: "GovTech",
    caseStudyPath: "/case-study/bda",
  },
];

const CARDS_PER_VIEW = 2;
const totalPages = Math.ceil(projects.length / CARDS_PER_VIEW);

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const next = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    setAnimateKey((prev) => prev + 1);
  };

  const prev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    setAnimateKey((prev) => prev + 1);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimateKey((prev) => prev + 1);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
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
    <section ref={sectionRef} className="py-10 md:py-14 px-6 container mx-auto" id="projects">
      <div className="text-center mb-10 animate-fade-in-up">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Our Impactful Projects
        </h2>
        <p className="text-gray-400 text-lg">
          Transforming businesses through innovative digital solutions
        </p>
      </div>

      <div className="relative group">
        <div className="grid md:grid-cols-2 gap-10 items-stretch">
          {projects
            .slice(currentPage * CARDS_PER_VIEW, currentPage * CARDS_PER_VIEW + CARDS_PER_VIEW)
            .map((project, idx) => (
            <div
              key={`${project.title}-${currentPage}-${idx}-${animateKey}`}
              className={`enhanced-project-card bg-white/2 border border-cyan-400/25 backdrop-blur-xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-cyan-400/50 flex flex-col group/card home-project-card ${
                idx === 0 
                  ? "project-card-left-visible" 
                  : "project-card-right-visible"
              }`}
            >
              {/* Animated gradient border on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-sky-500/0 to-teal-500/0 group-hover/card:from-cyan-500/20 group-hover/card:via-sky-500/20 group-hover/card:to-teal-500/20 transition-all duration-500 pointer-events-none z-0"></div>
              
              <div className="h-72 overflow-hidden bg-white/2 relative group/img z-10">
                {/* Glow effect on image */}
                <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 to-transparent group-hover/img:from-cyan-500/10 transition-all duration-500 z-10 pointer-events-none"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110 relative z-0"
                />
              </div>
              <div className="p-10 flex flex-col flex-1 relative z-10">
                <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover/card:text-cyan-300 transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-lg mb-6 line-clamp-3 leading-relaxed group-hover/card:text-gray-300 transition-colors">
                  {project.category}
                </p>
                <hr className="border-white/10 mb-6 w-full" />
                {project.caseStudyPath ? (
                  <Link
                    to={project.caseStudyPath}
                    className="mt-auto flex items-center gap-2 text-cyan-400 font-bold hover:text-cyan-300 hover:gap-3 transition-all text-lg group/btn relative w-fit"
                  >
                    <span className="relative z-10">View Case Study</span>
                    <ArrowRight size={20} className="relative z-10 group-hover/btn:translate-x-1 group-hover/btn:rotate-12 transition-all" />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover/btn:w-full transition-all duration-300"></span>
                  </Link>
                ) : (
                  <span className="mt-auto flex items-center gap-2 text-gray-500 font-bold text-lg group/btn relative w-fit cursor-default">
                    <span className="relative z-10">View Case Study</span>
                    <ArrowRight size={20} className="relative z-10" />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows on sides */}
        <button
          onClick={prev}
          className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md border border-cyan-400/50 hover:border-cyan-400 text-white hover:bg-cyan-400/20 transition-all z-20 hidden lg:block group/btn hover:shadow-cyan-400/30"
        >
          <ChevronLeft size={32} className="group-hover/btn:scale-110 group-hover/btn:-translate-x-1 transition-all" />
        </button>
        <button
          onClick={next}
          className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 p-4 bg-white/10 backdrop-blur-md border border-cyan-400/50 hover:border-cyan-400 text-white hover:bg-cyan-400/20 transition-all z-20 hidden lg:block group/btn hover:shadow-cyan-400/30"
        >
          <ChevronRight size={32} className="group-hover/btn:scale-110 group-hover/btn:translate-x-1 transition-all" />
        </button>
      </div>

      {/* Mobile controls */}
      <div className="flex justify-center gap-6 mt-12 lg:hidden">
        <button
          onClick={prev}
          className="p-4 border border-cyan-400/50 hover:border-cyan-400 text-white hover:bg-cyan-400/20 transition-all group/btn hover:shadow-cyan-400/30"
        >
          <ChevronLeft className="group-hover/btn:scale-110 group-hover/btn:-translate-x-1 transition-all" />
        </button>
        <button
          onClick={next}
          className="p-4 border border-cyan-400/50 hover:border-cyan-400 text-white hover:bg-cyan-400/20 transition-all group/btn hover:shadow-cyan-400/30"
        >
          <ChevronRight className="group-hover/btn:scale-110 group-hover/btn:translate-x-1 transition-all" />
        </button>
      </div>
    </section>
  );
}
