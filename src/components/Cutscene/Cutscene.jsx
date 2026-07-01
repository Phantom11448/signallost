import { useState, useEffect } from "react";

const SYSTEM_LINES = [
  "NAVIGATION SYSTEM... OFFLINE",
  "PROPULSION... OFFLINE",
  "ATMOSPHERE GENERATOR... CRITICAL",
  "CREW STATUS... 2 DECEASED... 1 MISSING",
  "COMMUNICATION ARRAY... OFFLINE",
];

const TEAL_LINES = [
  "PRIMITIVE PROTOCOL DETECTED...",
  "HTML v1.0...",
  "...SIGNAL POSSIBLE",
];

export default function Cutscene({ onComplete }) {
  const [step, setStep] = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [tealCount, setTealCount] = useState(0);
  const [shaking, setShaking] = useState(false);
  const hasSeenCutscene = localStorage.getItem("signal-lost-seen-cutscene");

  useEffect(() => {
    const t = [];
    t.push(setTimeout(() => setStep(1), 2000));
    t.push(setTimeout(() => setStep(2), 4000));
    t.push(setTimeout(() => {
      setShaking(true);
      setStep(3);
    }, 6000));
    for (let i = 0; i < SYSTEM_LINES.length; i++) {
      t.push(setTimeout(() => setLineCount(i + 1), 7000 + i * 1500));
    }
    t.push(setTimeout(() => setStep(4), 15500));
    for (let i = 0; i < TEAL_LINES.length; i++) {
      t.push(setTimeout(() => setTealCount(i + 1), 16000 + i * 1200));
    }
    t.push(setTimeout(() => setStep(5), 25000));
    t.push(setTimeout(() => setStep(6), 27000));
    t.push(setTimeout(() => setStep(7), 24000));
    t.push(setTimeout(() => setStep(8), 28000));
    return () => t.forEach(clearTimeout);
  }, []);

  const handleComplete = () => {
    localStorage.setItem("signal-lost-seen-cutscene", "true");
    onComplete();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "#020b18",
      overflow: "hidden",
    }}>
      {shaking && (
        <div style={{
          position: "fixed",
          inset: 0,
          animation: "shake 0.8s ease forwards",
          pointerEvents: "none",
          zIndex: 999,
          background: "transparent",
        }} />
      )}

      {/* SKIP */}
      {hasSeenCutscene && (
        <button onClick={handleComplete} style={{
          position: "absolute", top: 16, right: 16, zIndex: 999,
          background: "transparent", border: "1px solid #00f5c4",
          color: "#00f5c4", borderRadius: 8, padding: "6px 14px",
          cursor: "pointer", fontSize: 12,
          fontFamily: "'Orbitron', sans-serif", letterSpacing: 2,
        }}>SKIP</button>
      )}

      {/* STEP 1-2: Space background */}
      {(step === 1 || step === 2) && (
        <img src="/SpaceBGpic.png" style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", zIndex: 1,
          animation: "fadeIn 2s ease forwards",
        }} />
      )}

      {/* STEP 2: Streak */}
      {step === 2 && (
        <div style={{
          position: "absolute",
          top: 0, left: "48%",
          width: 6, height: "100%",
          background: "linear-gradient(to bottom, transparent, #00f5c4, white, transparent)",
          animation: "streak 1.8s ease-in forwards",
          filter: "blur(3px)",
          zIndex: 10,
        }} />
      )}

      {/* STEP 3: System lines */}
      {step === 4 && (
        <div style={{
          position: "absolute", inset: 0,
          background: "#020b18",
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: "0 32px", zIndex: 20,
        }}>
          {SYSTEM_LINES.slice(0, lineCount).map((line, i) => (
            <p key={i} style={{
              color: "#ff4d6d",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 15, margin: "8px 0", letterSpacing: 1,
            }}>— {line}</p>
          ))}
        </div>
      )}

      {/* STEP 4: Teal lines */}
      {step === 4 && (
        <div style={{
          position: "absolute", inset: 0,
          background: "#020b18",
          display: "flex", flexDirection: "column",
          justifyContent: "center",
          padding: "0 32px", zIndex: 20,
        }}>
          {SYSTEM_LINES.map((line, i) => (
            <p key={i} style={{
              color: "#ff4d6d",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 15, margin: "8px 0", letterSpacing: 1,
            }}>— {line}</p>
          ))}
          <br />
          {TEAL_LINES.slice(0, tealCount).map((line, i) => (
            <p key={i} style={{
              color: "#00f5c4",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 15, margin: "8px 0", letterSpacing: 2,
            }}>— {line}</p>
          ))}
        </div>
      )}

      {/* STEP 3+: Crash site */}
      {step >= 3 && (
        <img src="/StarBurnerpic.png" style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", zIndex: 5,
          animation: "fadeIn 1.5s ease forwards",
        }} />
      )}

      {/* STEP 5 overlay */}
      {step >= 3 && (
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(2,11,24,0.45)",
          zIndex: 6,
        }} />
      )}

      {/* STEP 6+: Zhan */}
      {step >= 6 && (
        <img src="/Zhanpic.png" style={{
          position: "absolute",
          bottom: 0, right: 0,
          height: "58%", zIndex: 7,
          animation: "fadeIn 1.5s ease forwards",
        }} />
      )}

      {/* STEP 7+: Dialogue */}
      {step >= 7 && (
        <div style={{
          position: "absolute",
          top: "10%", left: 24, right: 24,
          zIndex: 8,
          animation: "fadeIn 1s ease forwards",
        }}>
          <p style={{ color: "#00f5c4", fontFamily: "'Orbitron', sans-serif", fontSize: 11, letterSpacing: 3, margin: "0 0 8px" }}>STARBURNER — CRASH LOG 001</p>
          <h1 style={{ color: "#00f5c4", fontFamily: "'Orbitron', sans-serif", fontSize: 28, letterSpacing: 4, margin: "0 0 16px" }}>SIGNAL LOST</h1>
          <div style={{
            background: "rgba(2,11,24,0.85)",
            border: "1px solid #00f5c444",
            borderRadius: 12, padding: "14px 18px",
          }}>
            <p style={{ color: "#c8f0ff", fontFamily: "'Exo 2', sans-serif", fontSize: 14, lineHeight: 1.6, margin: "0 0 6px" }}>
              "It seems the HTML transmission system is the only thing not destroyed in the crash. I can't believe I'm going to have to learn this ancient technology. Should've listened when grandpa tried to teach me..."
            </p>
            <p style={{ color: "#4a7fa0", fontSize: 12, margin: 0 }}>— Zhan, Pilot, StarBurner</p>
          </div>
        </div>
      )}

      {/* STEP 8: Button */}
      {step >= 8 && (
        <button onClick={handleComplete} style={{
          position: "absolute",
          bottom: 40, left: "50%",
          transform: "translateX(-50%)",
          background: "#00f5c4", color: "#020b18",
          border: "none", borderRadius: 30,
          padding: "14px 36px", fontSize: 13,
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: 800, letterSpacing: 3,
          cursor: "pointer", zIndex: 20,
          boxShadow: "0 0 24px #00f5c488",
          whiteSpace: "nowrap",
          animation: "fadeIn 1s ease forwards",
        }}>BEGIN TRANSMISSION</button>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes streak {
          0% { transform: translateY(-200px); opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        @keyframes shake {
          0% { transform: translateX(0px); }
          15% { transform: translateX(-10px); }
          30% { transform: translateX(10px); }
          45% { transform: translateX(-10px); }
          60% { transform: translateX(8px); }
          75% { transform: translateX(-6px); }
          90% { transform: translateX(4px); }
          100% { transform: translateX(0px); }
        }
      `}</style>

    </div>
  );
}