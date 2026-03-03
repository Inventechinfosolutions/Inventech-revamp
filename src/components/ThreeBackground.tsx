export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden">
      {/* Animated background image with slow drift */}
      <div
        className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] bg-cover bg-center animate-slow-drift"
        style={{
          backgroundImage: "url(/teal-geometric-bg.jpg)",
          backgroundSize: "110% 110%",
        }}
      />

      {/* Subtle vignette overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />
    </div>
  );
}
