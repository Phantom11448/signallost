import { useRef, useEffect } from "react";
import { MISSIONS_DATA } from "../../data/missions";

const C = {
  bg: "#020b18",
  surface: "#041528",
  card: "#061d35",
  border: "#0a3555",
  accent: "#00f5c4",
  alien: "#39ff14",
  gold: "#ffe94d",
  red: "#ff4d6d",
  textPrimary: "#c8f0ff",
  textMuted: "#4a7fa0",
};

const FONTS = {
  heading: "'Orbitron', sans-serif",
  body: "'Exo 2', sans-serif",
  mono: "'Share Tech Mono', monospace",
};

export default function SignalPage({ completedMissions = [] }) {
  const iframeRef = useRef(null);

  // Build the cumulative HTML from completed missions
  const buildSignalHTML = () => {
    const completedData = MISSIONS_DATA.filter(m =>
      completedMissions.includes(m.id)
    ).sort((a, b) => a.id - b.id);

    if (completedData.length === 0) return "";

    return completedData.map(m => m.signalContribution).join("\n\n");
  };

  const signalHTML = buildSignalHTML();
  const completionPct = Math.round((completedMissions.length / MISSIONS_DATA.length) * 100);

  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    try {
      doc.open();
      doc.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>DISTRESS SIGNAL — StarBurner — Zhan — Texas Earth</title>
<style>
  body {
    font-family: system-ui, sans-serif;
    padding: 20px;
    color: #1a1828;
    background: #f0fff8;
    margin: 0;
    line-height: 1.6;
  }
  h1 { color: #020b18; font-size: 24px; margin: 0 0 12px; }
  h2 { color: #041528; font-size: 18px; margin: 16px 0 8px; }
  h3 { color: #061d35; font-size: 15px; margin: 12px 0 6px; }
  p { margin: 0 0 10px; }
  a { color: #7c5cfc; }
  img { max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; }
  ul, ol { margin: 0 0 10px; padding-left: 20px; }
  li { margin-bottom: 4px; }
  table { border-collapse: collapse; width: 100%; margin: 8px 0; }
  td, th { border: 1px solid #ccc; padding: 6px 10px; text-align: left; }
  th { background: #e0e0e0; font-weight: 700; }
  button { background: #00b894; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; }
  form { background: #f0f0f0; padding: 12px; border-radius: 6px; margin: 8px 0; }
  input, select, textarea { border: 1px solid #ccc; padding: 6px 10px; border-radius: 4px; font-size: 14px; margin: 4px 0; display: block; width: 100%; box-sizing: border-box; }
  label { font-size: 14px; font-weight: 600; margin-top: 8px; display: block; }
  header { background: #e8f4fd; padding: 12px; border-radius: 4px; margin-bottom: 12px; }
  nav { background: #fef9e7; padding: 8px; border-radius: 4px; margin-bottom: 12px; }
  main { background: #f9f9f9; padding: 12px; border-radius: 4px; margin-bottom: 12px; }
  footer { background: #f0f0f0; padding: 8px; border-radius: 4px; font-size: 12px; }
  aside { background: #fff3e0; padding: 8px; border-radius: 4px; border-left: 3px solid #ff9f43; margin: 8px 0; }
  article { background: #f5f5f5; padding: 8px; border-radius: 4px; margin: 8px 0; }
  figure { margin: 0 0 8px; }
  figcaption { font-size: 12px; color: #666; margin-top: 4px; }
  video, audio, iframe { max-width: 100%; display: block; margin: 8px 0; }
  strong { font-weight: 700; }
  em { font-style: italic; }
  hr { border: none; border-top: 2px solid #ccc; margin: 12px 0; }
</style>
</head>
<body>
${signalHTML || '<p style="color: #999; font-style: italic;">Complete missions to build your distress signal page...</p>'}
</body>
</html>`);
      doc.close();
    } catch (e) {}
  }, [signalHTML]);

  return (
    <div style={{ paddingBottom: 80 }}>
      {/* header */}
      <div style={{ padding: "24px 16px 0" }}>
        <div style={{ fontSize: 10, color: C.accent, textTransform: "uppercase", letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>Live Transmission</div>
        <h2 style={{ fontFamily: FONTS.heading, color: C.accent, fontSize: 22, margin: "0 0 8px", letterSpacing: 2 }}>YOUR DISTRESS SIGNAL</h2>
        <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
          This is your actual distress signal page. Every mission you complete adds a new section. Phantar is receiving this right now.
        </p>

        {/* completion bar */}
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 10, padding: "12px 14px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ color: C.textMuted, fontSize: 12, fontFamily: FONTS.mono }}>SIGNAL STRENGTH</span>
            <span style={{ color: completionPct === 100 ? C.alien : C.gold, fontWeight: 800, fontSize: 14, fontFamily: FONTS.heading }}>{completionPct}%</span>
          </div>
          <div style={{ background: C.surface, borderRadius: 99, height: 8, overflow: "hidden" }}>
            <div style={{
              width: `${completionPct}%`,
              height: "100%",
              background: `linear-gradient(90deg, ${C.accent}, ${C.alien})`,
              borderRadius: 99,
              transition: "width 0.8s ease",
              boxShadow: `0 0 12px ${C.accent}88`,
            }} />
          </div>
          {completedMissions.length === 0 && (
            <p style={{ color: C.textMuted, fontSize: 12, margin: "8px 0 0", fontStyle: "italic" }}>
              Complete Mission 1 to start building your signal...
            </p>
          )}
        </div>

        {/* Zhan comment */}
        {completedMissions.length > 0 && (
          <div style={{ background: C.accentDim || "#00f5c422", border: `1px solid ${C.accent}33`, borderRadius: 10, padding: "10px 14px", marginBottom: 16, display: "flex", gap: 10, alignItems: "flex-start" }}>
            <img src="/newzhan.png" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0, border: `1px solid ${C.accent}` }} />
            <p style={{ color: C.accent, fontSize: 13, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
              {completionPct === 100
                ? '"Signal at full strength. Phantar has everything they need. Now we wait." — Zhan'
                : completionPct >= 50
                ? '"Signal getting stronger. Phantar can see us. Keep going." — Zhan'
                : '"This is embarrassing. My grandfather could build a better distress signal. Keep working." — Zhan'
              }
            </p>
          </div>
        )}
      </div>

      {/* the actual signal page preview */}
      <div style={{ padding: "0 16px" }}>
        <div style={{ border: `2px solid ${C.accent}44`, borderRadius: 12, overflow: "hidden" }}>
          <div style={{ background: C.surface, padding: "8px 14px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.red }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.gold }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: C.alien }} />
            <span style={{ color: C.textMuted, fontSize: 11, fontFamily: FONTS.mono, marginLeft: 8 }}>distress-signal.html</span>
          </div>
          <iframe
            ref={iframeRef}
            title="signal-page"
            style={{
              width: "100%",
              height: completedMissions.length === 0 ? 120 : 500,
              border: "none",
              background: "#f0fff8",
              display: "block",
            }}
            sandbox="allow-same-origin"
          />
        </div>

        {completedMissions.length === 0 && (
          <p style={{ color: C.textMuted, fontSize: 12, textAlign: "center", marginTop: 12 }}>
            Complete missions to see your distress signal page grow here 🛸
          </p>
        )}
      </div>
    </div>
  );
}