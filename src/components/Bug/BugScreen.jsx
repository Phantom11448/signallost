import { useEffect, useMemo, useRef, useState } from "react";
import { getBugTranscript } from "../../data/missions";

const C = {
  bg: "#020b18",
  surface: "#041528",
  card: "#061d35",
  border: "#0a3555",
  accent: "#00f5c4",
  accentDim: "#00f5c422",
  alien: "#39ff14",
  alienDim: "#39ff1422",
  gold: "#ffe94d",
  goldDim: "#ffe94d22",
  red: "#ff4d6d",
  redDim: "#ff4d6d22",
  textPrimary: "#c8f0ff",
  textMuted: "#4a7fa0",
  tagBg: "#031a2e",
  tagText: "#00f5c4",
};

const FONTS = {
  heading: "'Orbitron', sans-serif",
  body: "'Exo 2', sans-serif",
  mono: "'Share Tech Mono', monospace",
};

function renderWithTagHighlights(text) {
  // Backtick-wrapped literal strings only — matches the same convention used in
  // MissionScreen.jsx. No bare-word tag matching, since matching common English
  // words like "a" against relevantTags caused false highlights mid-sentence.
  if (!text) return text;
  const backtickParts = text.split(/(`[^`]+`)/g);

  return backtickParts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const inner = part.slice(1, -1);
      return (
        <span
          key={`bt-${i}`}
          style={{
            fontFamily: FONTS.mono,
            color: C.alien,
            fontWeight: 700,
            fontSize: "1.1em",
          }}
        >
          {inner}
        </span>
      );
    }
    return part;
  });
}

function LivePreview({ html, glow = false }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    try {
      const previewHtml = String(html ?? "")
        .replace(/src="crashsite\.jpg"/gi, 'src="/StarBurnerpic.png"')
        .replace(/src="crash-site\.jpg"/gi, 'src="/StarBurnerpic.png"')
        .replace(/src="crashsite\.mp4"/gi, 'src="/Crashsitecomp.mp4"')
        .replace(/src="crashsite\.webm"/gi, 'src="/Crashsitecomp.mp4"')
        .replace(/src="alien\.jpg"/gi, 'src="/newzhan.png"')
        .replace(/src="crew\.jpg"/gi, 'src="/PhantarSealpic.png"')
        .replace(/src="photo\.jpg"/gi, 'src="/StarBurnerpic.png"')
        .replace(/src="rescue\.jpg"/gi, 'src="/StarBurnerpic.png"');
      doc.open();
      doc.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
  body { font-family: system-ui, sans-serif; padding: 12px; color: #1a1828; background: #f0fff8; margin: 0; line-height: 1.6; }
  h1, h2, h3, h4, h5, h6 { margin: 0 0 6px; color: #020b18; }
  p { margin: 0 0 6px; }
  ul, ol { margin: 0 0 10px; padding-left: 20px; }
  li { margin-bottom: 4px; }
  a { color: #7c5cfc; }
  img { max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; }
  button { background: #00b894; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; }
  table { border-collapse: collapse; margin: 8px 0; }
  th, td { border: 1px solid #ccc; padding: 6px 10px; text-align: left; }
  th { background: #e8f5f0; }
</style>
</head>
<body>
${previewHtml}
</body>
</html>`);
      doc.close();
    } catch (error) {}
  }, [html]);

  return (
    <div style={{ marginTop: 8 }}>
      <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", fontFamily: FONTS.mono }}>📡 Transmission Preview</p>
      <iframe
        ref={iframeRef}
        title="bug-preview"
        style={{
          width: "100%", height: 120,
          border: glow ? "2px solid #4da6ff" : `1px solid ${C.accent}44`,
          borderRadius: 8, background: "#f0fff8",
          boxShadow: glow ? "0 0 16px #4da6ff88" : "none",
          transition: "all 0.3s ease",
        }}
        sandbox="allow-same-origin"
      />
    </div>
  );
}

const REQUIREMENT_EMOJIS = ["👽", "🛸", "👾"];

function ChallengeCard({ challenge, onPass, alreadyDone, initialValue = "" }) {
  const textareaRef = useRef(null);
  const [val, setVal] = useState(initialValue || "");
  const [status, setStatus] = useState(alreadyDone ? "pass" : "idle");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [showRequirements, setShowRequirements] = useState(false);
  const requirementEmojis = useMemo(
    () => (challenge.requirements || []).map(() => REQUIREMENT_EMOJIS[Math.floor(Math.random() * REQUIREMENT_EMOJIS.length)]),
    [challenge.id]
  );

  const check = () => {
    const result = challenge.check(val);
    if (result === "pass") {
      setStatus("pass");
      setFeedback("");
      if (!alreadyDone) onPass();
    } else {
      setStatus("fail");
      setAttempts(a => a + 1);
      setFeedback(result);
    }
  };

  return (
    <div style={{ background: C.card, border: `1.5px solid ${status === "pass" ? C.alien : status === "fail" ? C.red : `${C.accent}66`}`, borderRadius: 12, padding: 18, marginTop: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ color: C.red, fontSize: 12, fontWeight: 800, letterSpacing: 2, fontFamily: FONTS.heading }}>REQUIRED REPAIR</div>
        <button
          onClick={() => { setStatus("idle"); setFeedback(""); setAttempts(0); setShowHint(false); }}
          style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 26, height: 26, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}
        >
          ↺
        </button>
      </div>
      <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>⚡ Complete this to repair the bug</div>

      <button
        onClick={() => {
          setShowRequirements(v => {
            const next = !v;
            if (!next) setTimeout(() => textareaRef.current?.focus(), 0);
            return next;
          });
        }}
        style={{
          display: "block", width: "100%", textAlign: "center",
          background: C.alien, color: C.bg, border: "none",
          borderRadius: 10, padding: "14px", fontWeight: 800,
          fontSize: 14, cursor: "pointer", letterSpacing: 1,
          fontFamily: FONTS.heading, marginBottom: 14,
          boxShadow: `0 0 20px ${C.alien}66`,
        }}
      >
        {showRequirements ? "HIDE REQUIREMENTS ▲" : "SHOW REQUIREMENTS ▼"}
      </button>

      {showRequirements && (
        <div>
          <div style={{
            background: C.accentDim,
            border: "1px solid #00f5c433",
            borderRadius: 10,
            padding: "12px 14px",
            marginBottom: 14,
            display: "flex",
            alignItems: "stretch",
            gap: 10,
          }}>
            <img
              src="/wooch.png"
              style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0, border: "1px solid #00f5c4", alignSelf: "flex-start" }}
            />
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ textAlign: "left" }}>
                <p style={{ color: "#00f5c4", fontSize: 10, margin: "0 0 2px", fontWeight: 700, fontFamily: FONTS.mono, letterSpacing: 1 }}>WOOCH</p>
                <p style={{ color: "#00f5c4", fontSize: 13, margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>
                  "{challenge.requirementsDialogue?.wooch || "What got corrupted?"}"
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ color: "#00f5c4", fontSize: 10, margin: "0 0 2px", fontWeight: 700, fontFamily: FONTS.mono, letterSpacing: 1 }}>ZHAN</p>
                <p style={{ color: "#00f5c4", fontSize: 13, margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>
                  "{challenge.requirementsDialogue?.zhan || "All this..."}"
                </p>
              </div>
            </div>
            <img
              src="/newzhan.png"
              style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0, border: "1px solid #00f5c4", alignSelf: "flex-start" }}
            />
          </div>

          <div style={{ background: C.card, border: `1px solid ${C.alien}44`, borderRadius: 12, padding: 16, marginBottom: 14 }}>
            <ul style={{ margin: 0, paddingLeft: 4, listStyle: "none" }}>
              {(challenge.requirements || []).map((req, i) => (
                <li key={i} style={{ color: C.textPrimary, marginBottom: 10, lineHeight: 1.6, display: "flex", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ flexShrink: 0 }}>{requirementEmojis[i]}</span>
                  <span>{renderWithTagHighlights(req)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <textarea
        ref={textareaRef}
        value={val}
        onChange={e => { setVal(e.target.value); setStatus("idle"); setFeedback(""); }}
        onKeyDown={e => {
          if (e.key === "Tab") {
            e.preventDefault();
            const start = e.target.selectionStart;
            const nextValue = `${val.slice(0, start)}  ${val.slice(e.target.selectionEnd)}`;
            setVal(nextValue);
            setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
          }
        }}
        placeholder="// enter repair code here..."
        disabled={status === "pass"}
        style={{
          width: "100%",
          boxSizing: "border-box",
          height: 80,
          background: C.tagBg,
          color: C.tagText,
          border: `1px solid ${C.accent}44`,
          borderRadius: 8,
          padding: "10px 12px",
          fontFamily: FONTS.mono,
          fontSize: 13,
          resize: "vertical",
          outline: "none",
          marginBottom: 10,
          lineHeight: 1.6,
        }}
      />

      <LivePreview html={val} glow={status === "pass" || challenge.check(val) === "pass"} />

      {status === "fail" && feedback && (
        <div style={{ background: C.redDim, border: `1px solid ${C.red}44`, borderRadius: 8, padding: "8px 12px", margin: "10px 0" }}>
          <p style={{ color: C.red, margin: 0, fontSize: 13 }}>❌ {feedback}</p>
        </div>
      )}

      {attempts >= 1 && status !== "pass" && (
        <button
          onClick={() => setShowHint(!showHint)}
          style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", marginBottom: 8, display: "block" }}
        >
          {showHint ? "Hide hint" : "📡 Show hint"}
        </button>
      )}

      {showHint && (
        <div style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
          <p style={{ color: C.gold, margin: 0, fontSize: 13, fontFamily: FONTS.mono, whiteSpace: "pre-wrap" }}>{renderWithTagHighlights(challenge.hint, challenge.relevantTags)}</p>
        </div>
      )}

      {status === "pass" ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <p style={{ color: C.alien, margin: 0, fontWeight: 700, fontSize: 14 }}>✓ Repair confirmed. The corrupted transmission is stable again.</p>
          <button
            onClick={() => { setStatus("idle"); setFeedback(""); setAttempts(0); setShowHint(false); }}
            style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 26, height: 26, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0, marginLeft: 8 }}
          >
            ↺
          </button>
        </div>
      ) : (
        <button
          onClick={check}
          style={{ background: C.accent, color: C.bg, border: "none", borderRadius: 8, padding: "10px 24px", fontWeight: 800, fontSize: 12, cursor: "pointer", letterSpacing: 2, fontFamily: FONTS.heading, marginTop: 10 }}
        >
          TRANSMIT ▶
        </button>
      )}
    </div>
  );
}

export default function BugScreen({ bug, onBack, onComplete, completedChallenges = [], onChallengePass, onOpenCodex }) {
  // Expected bug shape includes bug.upToMissionId (number) to assemble transcript dynamically.
  const fullTranscript = typeof bug?.upToMissionId === "number" ? getBugTranscript(bug.upToMissionId) : "";
  const [phase, setPhase] = useState("intro");
  const [repaired, setRepaired] = useState(completedChallenges.includes(bug?.challenge?.id));
  const [transcriptText, setTranscriptText] = useState(fullTranscript);
  const [shaking, setShaking] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    setPhase("intro");
    setRepaired(completedChallenges.includes(bug?.challenge?.id));
    setShaking(true);
    setTranscriptText(typeof bug?.upToMissionId === "number" ? getBugTranscript(bug.upToMissionId) : "");
  }, [bug?.id]);

  useEffect(() => {
    if (phase !== "intro" || typeof bug?.upToMissionId !== "number") return;

    const fullTranscript = getBugTranscript(bug.upToMissionId);
    setTranscriptText(fullTranscript);
    setShaking(true);

    let eraseInterval;
    const shakeTimeout = setTimeout(() => {
      setShaking(false);
      eraseInterval = setInterval(() => {
        setTranscriptText(prev => {
          if (!prev.length) {
            clearInterval(eraseInterval);
            return prev;
          }
          const next = prev.slice(0, -2);
          if (!next.length) clearInterval(eraseInterval);
          return next;
        });
      }, 20);
    }, 500);

    return () => {
      clearTimeout(shakeTimeout);
      if (eraseInterval) clearInterval(eraseInterval);
    };
  }, [phase, bug?.id, bug?.upToMissionId]);

  const scrollToTop = () => {
    setTimeout(() => {
      if (containerRef.current) containerRef.current.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const containerStyle = {
    minHeight: "100vh",
    background: C.bg,
    fontFamily: FONTS.body,
    maxWidth: 430,
    margin: "0 auto",
    padding: "20px 16px 60px",
    boxSizing: "border-box",
    color: C.textPrimary,
  };

  const onRepairPass = () => {
    setRepaired(true);
    onChallengePass(bug.challenge.id);
  };

  if (!bug) return null;

  if (phase === "intro") {
    return (
      <div ref={containerRef} style={containerStyle} className={shaking ? "bug-intro-shake" : ""}>
        <style>{`@keyframes bugIntroShake { 0% { transform: translate(0, 0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(2px, -2px); } 60% { transform: translate(-2px, -1px); } 80% { transform: translate(2px, 1px); } 100% { transform: translate(0, 0); } } .bug-intro-shake { animation: bugIntroShake 0.5s linear; }`}</style>
        <button onClick={onOpenCodex} style={{ position: "fixed", top: 16, right: 16, zIndex: 150, background: C.alien, color: C.bg, border: "none", borderRadius: 20, padding: "8px 14px", fontWeight: 800, fontSize: 11, letterSpacing: 1, cursor: "pointer", fontFamily: FONTS.heading, boxShadow: `0 0 14px ${C.alien}66` }}>📖 CODEX</button>
        <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, marginBottom: 20 }}>← Ship</button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <img src="/newzhan.png" style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${C.red}`, objectFit: "cover", objectPosition: "top" }} />
          <div>
            <div style={{ color: C.red, fontSize: 10, letterSpacing: 3, fontFamily: FONTS.mono }}>SYSTEM ALERT — {bug.badge}</div>
            <div style={{ color: C.textPrimary, fontSize: 18, fontWeight: 700, fontFamily: FONTS.heading, letterSpacing: 1 }}>{bug.title}</div>
          </div>
        </div>

        <div style={{ background: C.redDim, border: `1px solid ${C.red}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 20, display: "flex", gap: 10, alignItems: "center" }}>
          <span>🐛</span>
          <div>
            <div style={{ color: C.red, fontSize: 11, fontWeight: 700, letterSpacing: 2, fontFamily: FONTS.mono }}>CORRUPTION DETECTED</div>
            <div style={{ color: C.textMuted, fontSize: 12 }}>{bug.subtitle}</div>
          </div>
        </div>

        {transcriptText.length > 0 && (
          <pre style={{
            background: C.tagBg,
            border: `1px solid ${C.accent}44`,
            borderRadius: 10,
            padding: "14px 12px",
            fontFamily: FONTS.mono,
            fontSize: 13,
            color: C.tagText,
            whiteSpace: "pre-wrap",
            wordBreak: "break-all",
            margin: "0 0 20px",
            lineHeight: 1.8,
          }}>{transcriptText}</pre>
        )}

        {transcriptText.length === 0 && (
          <>
            <div style={{ background: C.card, border: `1px solid ${C.accent}33`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
              <div style={{ color: C.accent, fontSize: 10, letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 12 }}>// ZHAN'S LOG — CORRUPTED TRANSMISSION</div>
              {bug.intro.map((line, i) => (
                <p key={i} style={{ color: C.textPrimary, fontSize: 14, fontWeight: 400, fontFamily: FONTS.body, lineHeight: 1.7, margin: "0 0 12px" }}>{line}</p>
              ))}
            </div>

            <button onClick={() => { setPhase("challenge"); scrollToTop(); }} style={{ width: "100%", background: C.accent, color: C.bg, border: "none", borderRadius: 10, padding: "14px", fontWeight: 800, fontSize: 13, cursor: "pointer", letterSpacing: 3, fontFamily: FONTS.heading, boxShadow: `0 0 20px ${C.accent}66` }}>BEGIN REPAIR →</button>
          </>
        )}
      </div>
    );
  }

  const challengeDone = repaired || completedChallenges.includes(bug.challenge.id);

  return (
    <div ref={containerRef} style={containerStyle}>
      <button onClick={onOpenCodex} style={{ position: "fixed", top: 16, right: 16, zIndex: 150, background: C.alien, color: C.bg, border: "none", borderRadius: 20, padding: "8px 14px", fontWeight: 800, fontSize: 11, letterSpacing: 1, cursor: "pointer", fontFamily: FONTS.heading, boxShadow: `0 0 14px ${C.alien}66` }}>📖 CODEX</button>
      <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, marginBottom: 20 }}>← Ship</button>

      <div style={{ background: `linear-gradient(135deg, ${C.red}18, ${C.accent}18)`, border: `2px solid ${C.red}`, borderRadius: 14, padding: 20, marginBottom: 20, textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🐛</div>
        <div style={{ color: C.red, fontSize: 12, letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>SYSTEM REPAIR MODE</div>
        <div style={{ color: C.textPrimary, fontSize: 18, fontWeight: 800, fontFamily: FONTS.heading, letterSpacing: 1 }}>{bug.title}</div>
      </div>

      <ChallengeCard
        key={bug.challenge.id}
        challenge={bug.challenge}
        alreadyDone={challengeDone}
        onPass={onRepairPass}
      />

      {challengeDone && (
        <div style={{ marginTop: 20 }}>
          <div style={{ background: C.alienDim, border: `1px solid ${C.alien}44`, borderRadius: 12, padding: 16, marginBottom: 16, textAlign: "center" }}>
            <img src="/newzhan.png" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: `2px solid ${C.alien}`, marginBottom: 8 }} />
            <div style={{ fontSize: 32, marginBottom: 8 }}>📡</div>
            <p style={{ color: C.alien, fontWeight: 700, fontSize: 14, margin: "0 0 6px", fontFamily: FONTS.heading, letterSpacing: 1 }}>{bug.title} REPAIRED</p>
            <p style={{ color: C.textMuted, fontSize: 13, margin: 0 }}>{bug.completionMessage}</p>
          </div>
          <button onClick={onComplete} style={{ width: "100%", background: C.surface, color: C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px", fontWeight: 800, fontSize: 11, cursor: "pointer", letterSpacing: 2, fontFamily: FONTS.heading }}>← RETURN TO SHIP</button>
        </div>
      )}
    </div>
  );
}
