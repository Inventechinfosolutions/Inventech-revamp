import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    title: "KIOXIA CX Marketplace Environment",
    desc: "Built a multi-cloud solution to unify workflow, increasing efficiency by 40%.",
    image: "#", // Placeholder color will be used
    color: "bg-emerald-500",
  },
  {
    title: "KIOXIA Audit & Contract Dashboard",
    desc: "Automated 300+ manual audit processes with a custom dashboard.",
    image: "#",
    color: "bg-orange-500",
  },
];

export default function ImpactProjects() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Impactful Projects
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Transforming businesses through custom software solutions.
        </p>
      </div>

      <div className="relative group">
        <div className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide">
          {projects.map((project, i) => (
            <div
              key={i}
              className="min-w-[100%] md:min-w-[calc(50%-12px)] bg-white rounded-2xl overflow-hidden shadow-lg snap-center group/card cursor-pointer"
            >
              {/* Image Placeholder */}
              <div className={`h-64 ${project.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10 group-hover/card:bg-black/0 transition-colors" />
                {/* Abstract shapes */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30 mix-blend-overlay">
                  <svg
                    viewBox="0 0 100 100"
                    fill="currentColor"
                    className="w-full h-full text-white"
                  >
                    <circle cx="50" cy="50" r="40" />
                  </svg>
                </div>
              </div>

              <div className="p-8 text-navy-900">
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6">{project.desc}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-blue-600 font-semibold group-hover/card:gap-3 transition-all"
                >
                  Learn more <ArrowRight size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons (Visual only for now as native scroll covers functionality) */}
        <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white text-navy-900 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50">
          <ChevronLeft size={20} />
        </button>
        <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white text-navy-900 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  );
}
