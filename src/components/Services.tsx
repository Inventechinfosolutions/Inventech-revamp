import { Brain, Code, Palette, BarChart, Shield, Users } from "lucide-react";

const services = [
  {
    icon: <Brain className="w-8 h-8 text-cyan-400" />,
    title: "AI & Emerging Tech",
    description:
      "Unlock new possibilities with AI, machine learning, and IoT solutions adapted to your needs.",
  },
  {
    icon: <Code className="w-8 h-8 text-cyan-400" />,
    title: "Software Development",
    description:
      "Scalable, high-performance software built with the latest technologies to drive your business.",
  },
  {
    icon: <Palette className="w-8 h-8 text-cyan-400" />,
    title: "UI/UX Design",
    description:
      "Create engaging, intuitive user experiences that delight your customers and boost conversion.",
  },
  {
    icon: <BarChart className="w-8 h-8 text-cyan-400" />,
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights to make smarter, data-driven decisions.",
  },
  {
    icon: <Shield className="w-8 h-8 text-cyan-400" />,
    title: "Cyber Security",
    description:
      "Protect your digital assets with advanced security measures and compliance strategies.",
  },
  {
    icon: <Users className="w-8 h-8 text-cyan-400" />,
    title: "IT Outsourcing & Staffing",
    description:
      "Access top-tier talent and dedicated teams to accelerate your project delivery.",
  },
];

export default function Services() {
  return (
    <section className="py-20 px-6 container mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Services We Provide
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          We transform businesses through innovative technology solutions.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className="p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all group hover:-translate-y-1"
          >
            <div className="bg-cyan-400/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-400/20 transition-all border border-cyan-400/20">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              {service.title}
            </h3>
            <p className="text-gray-400 leading-relaxed">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
