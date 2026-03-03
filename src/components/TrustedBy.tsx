export default function TrustedBy() {
  const brands = [
    "Lowe's",
    "Target",
    "PB",
    "IBM",
    "ACG Inspection",
    "redBus",
    "BIJAK",
    "Capgemini",
    "falabella.",
    "NTT DATA",
    "LTIMindtree",
  ];

  return (
    <section className="py-8 md:py-10 border-b border-white/5 bg-navy-900/40 backdrop-blur-sm relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Heading with Animations */}
        <div className="text-center mb-8">
          <h2 className="enhanced-heading text-2xl md:text-3xl lg:text-4xl font-bold text-cyan-400 mb-4 uppercase tracking-widest animate-heading-glow">
            Trusted by Leading Organizations
          </h2>
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-line-expand"></div>
            <div className="h-1 w-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="h-1 w-16 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-line-expand-reverse"></div>
          </div>
        </div>

        <div className="flex overflow-hidden group">
          <div className="animate-scroll flex gap-8 md:gap-16 items-center">
            {/* Double the array for seamless scrolling */}
            {[...brands, ...brands].map((brand, idx) => (
              <div
                key={`${brand}-${idx}`}
                className="brand-card bg-white/2 border border-cyan-400/25 px-8 py-4 flex items-center justify-center min-w-[150px] md:min-w-[200px] group/item transition-all cursor-default backdrop-blur-md relative overflow-hidden home-brand-card hover:border-cyan-400/45"
              >
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-sky-500/0 to-teal-500/0 group-hover/item:from-cyan-500/20 group-hover/item:via-sky-500/20 group-hover/item:to-teal-500/20 transition-all duration-500"></div>
                
                {/* Animated border glow */}
                <div className="absolute inset-0 border border-transparent group-hover/item:border-cyan-400/30 group-hover/item:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all duration-500"></div>
                
                <span className="text-lg md:text-xl font-black text-white group-hover/item:text-cyan-300 transition-all duration-300 uppercase tracking-tight relative z-10 group-hover/item:scale-105 whitespace-nowrap">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Ambient glows with animation */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-blue-600/10 blur-[100px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-cyan-600/10 blur-[100px] pointer-events-none animate-pulse-slow-delayed"></div>
      
      {/* Additional animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400/30 rounded-full animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
