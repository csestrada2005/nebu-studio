export default function HexBackground() {
  return (
    <div
      className="fixed inset-0 w-screen h-screen pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {/* Hex SVG pattern */}
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
        <defs>
          <pattern id="hexpat" x="0" y="0" width="56" height="48.5" patternUnits="userSpaceOnUse">
            <polygon
              points="28,1 53,14.5 53,34 28,47.5 3,34 3,14.5"
              fill="none"
              stroke="rgba(255,255,255,0.045)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="#0D0D0D" />
        <rect width="100%" height="100%" fill="url(#hexpat)" />
      </svg>

      {/* Orb 1 — Hero right */}
      <div
        className="absolute"
        style={{
          width: 420,
          height: 420,
          right: "8%",
          top: "15%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230,57,70,0.16) 0%, rgba(230,57,70,0.04) 45%, transparent 70%)",
          animation: "floatOrb1 7s ease-in-out infinite",
        }}
      />

      {/* Orb 2 — Services left */}
      <div
        className="absolute"
        style={{
          width: 350,
          height: 350,
          left: "-5%",
          top: "55%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(230,57,70,0.10) 0%, transparent 70%)",
          animation: "floatOrb2 9s ease-in-out infinite",
        }}
      />

      {/* Orb 3 — Footer center */}
      <div
        className="absolute"
        style={{
          width: 600,
          height: 280,
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(230,57,70,0.08) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}
