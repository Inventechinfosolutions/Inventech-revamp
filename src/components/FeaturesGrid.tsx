import { ArrowRight } from "lucide-react";

export default function FeaturesGrid() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-left">
          Simple, Clear,
          <br />
          Useful For
          <span className="block text-sm font-normal text-gray-400 text-right max-w-xs ml-auto -mt-10">
            Over 300,000 users enjoy the simplicity of these web tools for
            everyday work
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Developers Card */}
          <div className="group relative bg-[#0a0510] border border-white/10 rounded-3xl p-10 overflow-hidden hover:border-purple-500/50 transition-all duration-500">
            {/* Background Glow */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600/20 blur-3xl rounded-full translate-y-1/2 translate-x-1/2 group-hover:bg-purple-600/30 transition-all" />

            <h3 className="text-3xl font-bold mb-6 text-white text-left">
              Developers
            </h3>
            <p className="text-gray-400 mb-10 leading-relaxed text-left">
              Publish, deploy, notify, report - Gitness integrates with your
              favorite tools. Create custom integration with ease and share with
              the community.
            </p>

            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm hover:bg-white hover:text-black transition-all">
              Learn More <ArrowRight size={16} />
            </button>

            {/* Abstract Visual at bottom right */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-50 group-hover:opacity-100 transition-opacity">
              {/* Placeholder for the purple wave graphic in the card */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-purple-500 animate-[spin_10s_linear_infinite]"
              >
                <path
                  fill="currentColor"
                  d="M45,-76C58,-69,68,-58,76,-46C84,-34,90,-21,89,-9C87,4,79,15,70,26C61,37,51,48,40,56C29,64,16,69,3,69C-11,69,-23,63,-34,56C-45,49,-55,39,-63,28C-71,17,-77,4,-77,-9C-76,-22,-70,-35,-60,-45C-50,-56,-37,-63,-24,-69C-11,-75,2,-82,14,-81C26,-81,39,-73,45,-76Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
          </div>

          {/* Startup Card */}
          <div className="group relative bg-[#0a0510] border border-white/10 rounded-3xl p-10 overflow-hidden hover:border-pink-500/50 transition-all duration-500">
            {/* Background Glow */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600/20 blur-3xl rounded-full translate-y-1/2 translate-x-1/2 group-hover:bg-pink-600/30 transition-all" />

            <h3 className="text-3xl font-bold mb-6 text-white text-left">
              Startup
            </h3>
            <p className="text-gray-400 mb-10 leading-relaxed text-left">
              Publish, deploy, notify, report - Gitness integrates with your
              favorite tools. Create custom integration with ease and share with
              the community.
            </p>

            <button className="flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 text-sm hover:bg-white hover:text-black transition-all">
              Learn More <ArrowRight size={16} />
            </button>

            {/* Abstract Visual */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 opacity-50 group-hover:opacity-100 transition-opacity">
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-pink-500 animate-[spin_12s_linear_infinite_reverse]"
              >
                <path
                  fill="currentColor"
                  d="M39,-64C51,-59,62,-50,69,-39C77,-27,81,-13,79,0C77,14,71,28,62,39C54,51,44,61,31,68C19,74,5,78,-8,77C-21,76,-33,70,-44,62C-55,53,-64,43,-69,31C-74,19,-76,5,-73,-8C-71,-20,-64,-31,-55,-41C-45,-51,-34,-60,-22,-64C-10,-68,4,-67,17,-64C30,-61,45,-55,39,-64Z"
                  transform="translate(100 100)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
