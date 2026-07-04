export default function UfoBurst() {
  const items = [
    { left: "10%", size: 22, duration: 1.3, delay: 0 },
    { left: "24%", size: 30, duration: 1.5, delay: 0.08 },
    { left: "40%", size: 20, duration: 1.2, delay: 0.16 },
    { left: "55%", size: 34, duration: 1.6, delay: 0.05 },
    { left: "70%", size: 24, duration: 1.3, delay: 0.2 },
    { left: "84%", size: 28, duration: 1.45, delay: 0.12 },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 300 }}>
      <style>{`
        @keyframes ufoBurstFloat {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          12% { opacity: 1; }
          100% { transform: translateY(-60vh) rotate(10deg); opacity: 0; }
        }
      `}</style>
      {items.map((item, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: item.left,
            bottom: "10%",
            fontSize: item.size,
            animation: `ufoBurstFloat ${item.duration}s ease-out ${item.delay}s forwards`,
          }}
        >
          🛸
        </span>
      ))}
    </div>
  );
}
