import { useState, useRef } from "react";

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
  const [phase, setPhase] = useState("video");
  const [started, setStarted] = useState(false);
  const videoRef = useRef(null);
  const [lineCount, setLineCount] = useState(0);
  const [tealCount, setTealCount] = useState(0);
  const hasSeenCutscene = localStorage.getItem("signal-lost-seen-cutscene");

  const handleComplete = () => {
    localStorage.setItem("signal-lost-seen-cutscene", "true");
    onComplete();
  };

  const startSystems = () => {
    setPhase("systems");
    for (let i = 0; i < 5; i++) {
      setTimeout(() => setLineCount(i + 1), i * 1500);
    }
    setTimeout(() => {
      for (let j = 0; j < 3; j++) {
        setTimeout(() => setTealCount(j + 1), j * 1200);
      }
    }, 5 * 1500);
    setTimeout(() => setPhase("dialogue"), 5 * 1500 + 3 * 1200 + 1500);
  };

  // VIDEO PHASE
  if (phase === "video") {
    return (
      <div style={{
        position: "fixed", inset: 0,
        background: "#000",
        overflow: "hidden",
      }}>
        {started && hasSeenCutscene && (
          <button onClick={handleComplete} style={{
            position: "absolute", top: 16, right: 16, zIndex: 100,
            background: "transparent", border: "1px solid #00f5c4",
            color: "#00f5c4", borderRadius: 8, padding: "6px 14px",
            cursor: "pointer", fontSize: 12,
            fontFamily: "'Orbitron', sans-serif", letterSpacing: 2,
          }}>SKIP</button>
        )}
        <video
          ref={videoRef}
          src="/crashsite.mp4"
          playsInline
          preload="auto"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
          }}
          onEnded={startSystems}
        />
        {!started && (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#020b18",
            zIndex: 20,
          }}>
            <button
              onClick={() => {
                setStarted(true);
                if (videoRef.current) {
                  videoRef.current.muted = true;
                  videoRef.current.play().then(() => {
                    setTimeout(() => {
                      if (videoRef.current) videoRef.current.muted = false;
                    }, 150);
                  }).catch(() => {});
                }
              }}
              style={{
                background: "#00f5c4",
                color: "#020b18",
                border: "none",
                borderRadius: 30,
                padding: "14px 36px",
                fontSize: 13,
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 800,
                letterSpacing: 3,
                cursor: "pointer",
                boxShadow: "0 0 24px #00f5c488",
                whiteSpace: "nowrap",
              }}
            >
              TAP TO BEGIN
            </button>
          </div>
        )}
      </div>
    );
  }

  // SYSTEMS PHASE
  if (phase === "systems") {
    return (
      <div style={{
        position: "fixed", inset: 0,
        background: "#020b18",
        display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "0 32px",
      }}>
        {hasSeenCutscene && (
          <button onClick={handleComplete} style={{
            position: "absolute", top: 16, right: 16, zIndex: 100,
            background: "transparent", border: "1px solid #00f5c4",
            color: "#00f5c4", borderRadius: 8, padding: "6px 14px",
            cursor: "pointer", fontSize: 12,
            fontFamily: "'Orbitron', sans-serif", letterSpacing: 2,
          }}>SKIP</button>
        )}
        {SYSTEM_LINES.slice(0, lineCount).map((line, i) => (
          <p key={i} style={{
            color: "#ff4d6d",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 15, margin: "8px 0", letterSpacing: 1,
          }}>— {line}</p>
        ))}
        {tealCount > 0 && <br />}
        {TEAL_LINES.slice(0, tealCount).map((line, i) => (
          <p key={i} style={{
            color: "#00f5c4",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 15, margin: "8px 0", letterSpacing: 2,
          }}>— {line}</p>
        ))}
      </div>
    );
  }

  // DIALOGUE PHASE
  return (
    <div style={{
      position: "fixed", inset: 0,
      overflow: "hidden",
    }}>
      <img src="/begin.png" style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        objectFit: "cover", zIndex: 0,
      }} />

      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(2,11,24,0.55)",
        zIndex: 1,
      }} />

      <div style={{
        position: "absolute",
        top: "10%", left: 24, right: 24,
        zIndex: 3,
      }}>
        <p style={{ color: "#00f5c4", fontFamily: "'Orbitron', sans-serif", fontSize: 11, letterSpacing: 3, margin: "0 0 8px" }}>STARBURNER — CRASH LOG 001</p>
        <h1 style={{ color: "#00f5c4", fontFamily: "'Orbitron', sans-serif", fontSize: 28, letterSpacing: 4, margin: "0 0 16px" }}>SIGNAL LOST</h1>
        <div style={{
          background: "rgba(2,11,24,0.88)",
          border: "1px solid #00f5c444",
          borderRadius: 12, padding: "14px 18px",
        }}>
          <p style={{ color: "#c8f0ff", fontFamily: "'Exo 2', sans-serif", fontSize: 14, lineHeight: 1.6, margin: "0 0 6px" }}>
            "It seems the HTML transmission system is the only thing not destroyed in the crash. I can't believe I'm going to have to learn this ancient technology. Should've listened when grandpa tried to teach me..."
          </p>
          <p style={{ color: "#4a7fa0", fontSize: 12, margin: 0 }}>— Zhan, Pilot, StarBurner</p>
        </div>
      </div>

      <button onClick={handleComplete} style={{
        position: "absolute",
        bottom: 40, left: "50%",
        transform: "translateX(-50%)",
        background: "#00f5c4", color: "#020b18",
        border: "none", borderRadius: 30,
        padding: "14px 36px", fontSize: 13,
        fontFamily: "'Orbitron', sans-serif",
        fontWeight: 800, letterSpacing: 3,
        cursor: "pointer", zIndex: 10,
        boxShadow: "0 0 24px #00f5c488",
        whiteSpace: "nowrap",
      }}>BEGIN TRANSMISSION</button>
    </div>
  );
}