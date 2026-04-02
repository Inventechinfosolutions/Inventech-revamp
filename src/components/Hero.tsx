import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative pt-20 pb-10 md:pt-20 md:pb-12 px-6 container mx-auto z-10">
      {/* Background Blur/Glow Effects - Moved outside the card for broader ambient light if needed, 
          but keeping the specific ones requested INSIDE the card below as per reference */}

      {/* Hero Content - Removing the main dark box/border as requested */}
      <div className="relative overflow-hidden">
        {/* Decorative blur for the section */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 blur-[120px] rounded-full -z-10"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content: centered on mobile, left on desktop. On mobile: order-1 (text only, button moved below image) */}
          <div className="text-center md:text-left z-20 order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
              <span className="animated-text-word phrase-hover text-white" style={{ animationDelay: '0s' }}>
                AI-Powered
              </span>
              <br />
              <span className="animated-text-word phrase-hover text-white" style={{ animationDelay: '0.2s' }}>
                Software
              </span>{" "}
              <span className="animated-text-word phrase-hover text-white" style={{ animationDelay: '0.4s' }}>
                That
              </span>
              <br />
              <span className="animated-text-word phrase-hover text-white" style={{ animationDelay: '0.6s' }}>
                Builds the Future of
              </span>
              <br />
              <span className="animated-text-word phrase-hover text-white" style={{ animationDelay: '0.8s' }}>
                Your Business.
              </span>
            </h1>

            <p className="text-gray-400 mb-10 leading-relaxed text-lg">
              We engineer intelligent, scalable platforms — combining product
              thinking, automation, and next-gen technologies that accelerate
              your growth.
            </p>

            {/* Buttons: desktop only — shown next to text on md and up */}
            <div className="hidden md:flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/portfolio" className="flex items-center gap-2 ml-2 md:ml-4 bg-white/5 hover:bg-white/10 border border-cyan-400/50 hover:border-cyan-400 text-white px-8 py-3.5 font-bold transition-all backdrop-blur-md shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 active:scale-95 z-30 hover:scale-105 home-hero-btn">
                Explore Our Work
              </Link>
            </div>
          </div>

          {/* Right Column - Enhanced Laptop Image with Glow Effects. On mobile: order-2 */}
          <div className="relative animate-fade-in-right delay-500 flex justify-center items-center py-12 order-2">
            <div className="relative group max-w-full lg:max-w-xl" style={{ backgroundColor: 'transparent' }}>
              {/* Animated Glow Rings */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-cyan-500/20 blur-3xl animate-pulse-glow"></div>
                <div className="absolute inset-0 bg-teal-500/15 blur-2xl animate-pulse-glow-delayed"></div>
              </div>
              
              {/* Particle Effects */}
              <div className="absolute inset-0 overflow-visible pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-particle-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 overflow-visible hero-image-wrapper">
                {/* Enhanced Image with Multiple Effects */}
                <div className="relative" style={{ backgroundColor: 'transparent' }}>
                  <img
                    src="/ai-software-v2.png"
                    alt="AI-Powered Software Platform"
                    className="w-full h-auto object-contain animate-enhanced-floating relative z-10 hero-image-transparent"
                    style={{
                      filter: "contrast(1.15) brightness(1.25) saturate(1.2)",
                      display: "block",
                      backgroundColor: "transparent",
                    }}
                  />
                  {/* Glow overlay on image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-transparent to-teal-500/20 animate-glow-sweep pointer-events-none z-20"></div>
                </div>
              </div>

              {/* Outer Glow Ring */}
              <div className="absolute -inset-4 rounded-3xl border border-cyan-500/30 animate-rotate-glow pointer-events-none"></div>
            </div>
          </div>

          {/* Mobile only: Explore Our Work button — appears after image (order-3) */}
          <div className="flex justify-center md:hidden order-3">
            <Link to="/portfolio" className="flex items-center gap-2 ml-2 md:ml-4 bg-white/5 hover:bg-white/10 border border-cyan-400/50 hover:border-cyan-400 text-white px-8 py-3.5 font-bold transition-all backdrop-blur-md shadow-lg shadow-cyan-400/20 hover:shadow-cyan-400/40 active:scale-95 z-30 hover:scale-105 home-hero-btn">
              Explore Our Work
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
