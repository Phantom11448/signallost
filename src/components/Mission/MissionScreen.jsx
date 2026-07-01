import { useState, useRef, useEffect } from "react";

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

const MIN_REPS = 3;

// ── LIVE PREVIEW ──────────────────────────────────────────────
function LivePreview({ html }) {
  const iframeRef = useRef(null);
  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    try {
      doc.open();
      doc.write(`<html><head><style>
        body{font-family:system-ui,sans-serif;padding:12px;color:#1a1828;background:#f0fff8;margin:0;}
        h1,h2,h3,h4,h5,h6{margin:0 0 6px;color:#020b18;}
        p{margin:0 0 6px;}a{color:#7c5cfc;}
        img{max-width:100%;height:auto;}
      </style></head><body>${html}</body></html>`);
      doc.close();
    } catch (e) {}
  }, [html]);
  return (
    <div style={{ marginTop: 8 }}>
      <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", fontFamily: FONTS.mono }}>📡 Transmission Preview</p>
      <iframe
        ref={iframeRef}
        title="preview"
        style={{ width: "100%", height: 100, border: `1px solid ${C.accent}44`, borderRadius: 8, background: "#f0fff8" }}
        sandbox="allow-same-origin"
      />
    </div>
  );
}

// ── TAG ANATOMY ───────────────────────────────────────────────
function TagAnatomy({ parts }) {
  const [active, setActive] = useState(null);
  return (
    <div style={{ margin: "16px 0" }}>
      <div style={{
        background: C.tagBg, border: `1px solid ${C.accent}44`,
        borderRadius: 10, padding: "14px 12px",
        fontFamily: FONTS.mono, fontSize: 14,
        marginBottom: 12, lineHeight: 2,
        overflowX: "auto",
      }}>
        {parts.map((p, i) => (
          <span
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            style={{
              color: active === i ? "#020b18" : p.color,
              background: active === i ? p.highlight : "transparent",
              borderRadius: 4, padding: "2px 3px",
              cursor: "pointer", transition: "all 0.15s",
              opacity: active !== null && active !== i ? 0.3 : 1,
            }}
          >{p.text}</span>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
        {parts.map((p, i) => (
          <div
            key={i}
            onClick={() => setActive(active === i ? null : i)}
            style={{
              background: active === i ? `${p.highlight}22` : C.card,
              border: `1.5px solid ${active === i ? p.highlight : C.border}`,
              borderRadius: 8, padding: "7px 11px",
              cursor: "pointer", transition: "all 0.2s",
              flexShrink: 0, maxWidth: "calc(50% - 4px)",
              boxSizing: "border-box",
            }}
          >
            <div style={{ fontFamily: FONTS.mono, fontSize: 11, color: p.color, marginBottom: 3 }}>{p.label}</div>
            <div style={{ fontSize: 12, color: active === i ? C.textPrimary : C.textMuted, lineHeight: 1.4 }}>{p.explain}</div>
          </div>
        ))}
      </div>
      <p style={{ color: C.textMuted, fontSize: 11, margin: 0 }}>👾 tap any part to scan it</p>
    </div>
  );
}

// ── CHALLENGE CARD ────────────────────────────────────────────
function ChallengeCard({ challenge, onPass, alreadyDone }) {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState(alreadyDone ? "pass" : "idle");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);

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
    <div style={{
      background: C.card,
      border: `1.5px solid ${status === "pass" ? C.alien : status === "fail" ? C.red : C.accent + "66"}`,
      borderRadius: 12, padding: 18, marginTop: 16,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <div style={{ color: C.red, fontSize: 12, fontWeight: 800, letterSpacing: 2, fontFamily: FONTS.heading }}>REQUIRED REPAIR</div>
        <button onClick={() => { setVal(""); setStatus("idle"); setFeedback(""); setAttempts(0); setShowHint(false); }}
          style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 26, height: 26, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>↺</button>
      </div>
      <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>⚡ Complete this to advance</div>

      <p style={{ color: C.textPrimary, fontSize: 14, fontWeight: 600, lineHeight: 1.6, margin: "0 0 12px" }}>
        {challenge.instruction}
      </p>

      <textarea
        value={val}
        onChange={e => { setVal(e.target.value); setStatus("idle"); setFeedback(""); }}
        onKeyDown={e => {
          if (e.key === "Tab") {
            e.preventDefault();
            const start = e.target.selectionStart;
            const newVal = val.substring(0, start) + "  " + val.substring(e.target.selectionEnd);
            setVal(newVal);
            setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
          }
        }}
        placeholder="// enter transmission code here..."
        disabled={status === "pass"}
        style={{
          width: "100%", boxSizing: "border-box", height: 80,
          background: C.tagBg, color: C.tagText,
          border: `1px solid ${C.accent}44`, borderRadius: 8,
          padding: "10px 12px", fontFamily: FONTS.mono,
          fontSize: 13, resize: "vertical", outline: "none",
          marginBottom: 10, lineHeight: 1.6,
        }}
      />

      <LivePreview html={val} />

      {status === "fail" && feedback && (
        <div style={{ background: C.redDim, border: `1px solid ${C.red}44`, borderRadius: 8, padding: "8px 12px", margin: "10px 0" }}>
          <p style={{ color: C.red, margin: 0, fontSize: 13 }}>❌ {feedback}</p>
        </div>
      )}

      {attempts >= 1 && status !== "pass" && (
        <button onClick={() => setShowHint(!showHint)} style={{
          background: "transparent", border: `1px solid ${C.border}`,
          color: C.textMuted, borderRadius: 8, padding: "6px 14px",
          fontSize: 12, cursor: "pointer", marginBottom: 8, display: "block",
        }}>
          {showHint ? "Hide hint" : "📡 Show hint"}
        </button>
      )}

      {showHint && (
        <div style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
          <p style={{ color: C.gold, margin: 0, fontSize: 13, fontFamily: FONTS.mono, whiteSpace: "pre-wrap" }}>{challenge.hint}</p>
        </div>
      )}

      {status === "pass" ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <p style={{ color: C.alien, margin: 0, fontWeight: 700, fontSize: 14 }}>✓ Signal confirmed! Transmission accepted by Phantar validator.</p>
          <button onClick={() => { setVal(""); setStatus("idle"); setFeedback(""); setAttempts(0); setShowHint(false); }}
            style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 26, height: 26, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0, marginLeft: 8 }}>↺</button>
        </div>
      ) : (
        <button onClick={check} style={{
          background: C.accent, color: C.bg, border: "none",
          borderRadius: 8, padding: "10px 24px", fontWeight: 800,
          fontSize: 12, cursor: "pointer", letterSpacing: 2,
          fontFamily: FONTS.heading, marginTop: 10,
        }}>TRANSMIT ▶</button>
      )}
    </div>
  );
}

// ── DRILL ZONE ────────────────────────────────────────────────
function DrillZone({ drills, challengeId, onReady }) {
  const [current, setCurrent] = useState(0);
  const [val, setVal] = useState("");
  const [status, setStatus] = useState("idle");
  const [reps, setReps] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!drills || !drills.length) return null;

  const drill = drills[current % drills.length];
  const boosted = reps >= MIN_REPS;

  const check = () => {
    if (drill.check(val.toLowerCase())) {
      setStatus("pass");
      setReps(r => r + 1);
    } else {
      setStatus("fail");
    }
  };

  const next = () => {
    setCurrent(c => c + 1);
    setVal("");
    setStatus("idle");
    setShowAnswer(false);
  };

  return (
    <div style={{ background: C.surface, border: `1px solid ${C.accent}33`, borderRadius: 12, padding: 16, marginTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ color: C.alien, fontSize: 13, fontWeight: 800, letterSpacing: 2, fontFamily: FONTS.heading }}>SIGNAL BOOST</div>
          <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>📡 Transmit variations to boost signal strength</div>
        </div>
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {Array.from({ length: MIN_REPS }).map((_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: "50%",
              background: i < reps ? C.alien : C.border,
              boxShadow: i < reps ? `0 0 8px ${C.alien}` : "none",
              transition: "all 0.3s",
            }} />
          ))}
          <span style={{ color: C.textMuted, fontSize: 11, marginLeft: 4 }}>{reps}/{MIN_REPS}</span>
        </div>
      </div>

      <div style={{ background: C.card, borderRadius: 99, height: 6, overflow: "hidden", marginBottom: 12 }}>
        <div style={{
          width: `${Math.min((reps / MIN_REPS) * 100, 100)}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${C.accent}, ${C.alien})`,
          borderRadius: 99, transition: "width 0.5s ease",
          boxShadow: boosted ? `0 0 8px ${C.alien}` : "none",
        }} />
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.accent}22`, borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
        <p style={{ color: C.textMuted, fontSize: 12, margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
          {boosted
            ? '"Signal strength sufficient. Phantar can locate us. Though I would feel better with a stronger signal. I always feel better with a stronger signal."'
            : reps === 0
            ? '"Phantar says my signal is too weak to pinpoint our location. I need to transmit more variations. Of course I do."'
            : `"${reps} transmission${reps > 1 ? "s" : ""} sent. Signal getting stronger. The cow came back. I am ignoring the cow."`
          }
          <span style={{ color: C.accent, fontSize: 11, display: "block", marginTop: 4 }}>— Zhan</span>
        </p>
      </div>

      <p style={{ color: C.textPrimary, fontSize: 14, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.5 }}>
        {drill.instruction}
      </p>

      <textarea
        value={val}
        onChange={e => { setVal(e.target.value); setStatus("idle"); setShowAnswer(false); }}
        onKeyDown={e => {
          if (e.key === "Tab") {
            e.preventDefault();
            const start = e.target.selectionStart;
            const newVal = val.substring(0, start) + "  " + val.substring(e.target.selectionEnd);
            setVal(newVal);
            setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
          }
        }}
        placeholder="// practice here..."
        disabled={status === "pass"}
        style={{
          width: "100%", boxSizing: "border-box", height: 68,
          background: C.tagBg, color: C.tagText,
          border: `1px solid ${C.accent}33`, borderRadius: 8,
          padding: "8px 12px", fontFamily: FONTS.mono,
          fontSize: 13, resize: "vertical", outline: "none",
          lineHeight: 1.6, marginBottom: 8,
        }}
      />

      <LivePreview html={val} />

      {status === "fail" && (
        <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "8px 0" }}>
          <p style={{ color: C.red, margin: 0, fontSize: 13, flex: 1 }}>❌ Not quite — check your tag and content</p>
          <button onClick={() => setShowAnswer(true)} style={{
            background: "transparent", border: `1px solid ${C.border}`,
            color: C.textMuted, borderRadius: 6, padding: "3px 10px",
            fontSize: 11, cursor: "pointer", whiteSpace: "nowrap",
          }}>Show answer</button>
        </div>
      )}

      {showAnswer && (
        <div style={{ background: C.tagBg, border: `1px solid ${C.accent}33`, borderRadius: 8, padding: "8px 12px", marginBottom: 8 }}>
          <p style={{ color: C.accent, margin: 0, fontSize: 12, fontFamily: FONTS.mono }}>{drill.answer}</p>
        </div>
      )}

      {status === "pass" ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <p style={{ color: C.alien, margin: 0, fontWeight: 700, fontSize: 13 }}>✓ Transmission sent! +1 signal boost</p>
          <button onClick={next} style={{
            background: C.accent, color: C.bg, border: "none",
            borderRadius: 7, padding: "6px 16px", fontSize: 12,
            fontWeight: 700, cursor: "pointer",
          }}>{current + 1 < drills.length ? "Next drill →" : "Again →"}</button>
        </div>
      ) : (
        <button onClick={check} style={{
          background: C.accent, color: C.bg, border: "none",
          borderRadius: 8, padding: "7px 18px", fontWeight: 800,
          fontSize: 12, cursor: "pointer", letterSpacing: 1,
          fontFamily: FONTS.heading, marginTop: 8,
        }}>TRANSMIT ▶</button>
      )}

      <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
        <button onClick={() => onReady(boosted)} style={{
          width: "100%", padding: "10px",
          background: boosted ? C.alien : C.surface,
          color: boosted ? C.bg : C.textMuted,
          border: boosted ? "none" : `1px solid ${C.border}`,
          borderRadius: 8, fontWeight: 800, fontSize: 12,
          letterSpacing: 2, cursor: "pointer",
          fontFamily: FONTS.heading, transition: "all 0.4s",
          boxShadow: boosted ? `0 0 16px ${C.alien}66` : "none",
        }}>
          {boosted ? "SIGNAL BOOSTED — NEXT CONCEPT 🛸" : "SKIP — ADVANCE AT WEAK SIGNAL →"}
        </button>
      </div>
    </div>
  );
}

// ── ZHAN COMMENT ─────────────────────────────────────────────
function ZhanComment({ text }) {
  return (
    <div style={{
      background: C.accentDim,
      border: `1px solid ${C.accent}33`,
      borderRadius: 10, padding: "10px 14px",
      marginTop: 12, display: "flex", gap: 10, alignItems: "flex-start",
    }}>
      <img src="/Zhanpic.png" style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0, border: `1px solid ${C.accent}` }} />
      <p style={{ color: C.accent, fontSize: 13, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>"{text}"</p>
    </div>
  );
}

// ── MISSION SCREEN ────────────────────────────────────────────
export default function MissionScreen({ mission, onBack, onComplete, completedChallenges = [], onChallengePass }) {
  const [phase, setPhase] = useState("story"); // story | slides | boss
  const [slideIndex, setSlideIndex] = useState(0);
  const containerRef = useRef(null);

  const scrollToTop = () => {
    setTimeout(() => {
      if (containerRef.current) containerRef.current.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const goNext = () => {
    if (slideIndex < mission.slides.length - 1) {
      setSlideIndex(i => i + 1);
    } else {
      setPhase("boss");
    }
    scrollToTop();
  };

  const goPrev = () => {
    if (slideIndex > 0) {
      setSlideIndex(i => i - 1);
    } else {
      setPhase("story");
    }
    scrollToTop();
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

  // ── STORY PHASE ───────────────────────────────────────────
  if (phase === "story") {
    return (
      <div ref={containerRef} style={containerStyle}>
        <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, marginBottom: 20 }}>← Ship</button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <img src="/Zhanpic.png" style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${C.accent}`, objectFit: "cover", objectPosition: "top" }} />
          <div>
            <div style={{ color: C.accent, fontSize: 10, letterSpacing: 3, fontFamily: FONTS.mono }}>MODULE {mission.id} — {mission.storyTag}</div>
            <div style={{ color: C.textPrimary, fontSize: 18, fontWeight: 700, fontFamily: FONTS.heading, letterSpacing: 1 }}>{mission.title}</div>
          </div>
        </div>

        <div style={{ background: C.redDim, border: `1px solid ${C.red}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 20, display: "flex", gap: 10, alignItems: "center" }}>
          <span>⚠️</span>
          <div>
            <div style={{ color: C.red, fontSize: 11, fontWeight: 700, letterSpacing: 2, fontFamily: FONTS.mono }}>ATMOSPHERE CRITICAL</div>
            <div style={{ color: C.textMuted, fontSize: 12 }}>{mission.atmosphere}</div>
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.accent}33`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
          <div style={{ color: C.accent, fontSize: 10, letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 12 }}>// ZHAN'S LOG — STARDATE 4,888</div>
          {mission.storyIntro.map((line, i) => (
            <p key={i} style={{
              color: line === "HTML." ? C.accent : C.textPrimary,
              fontSize: line === "HTML." ? 20 : 14,
              fontWeight: line === "HTML." ? 800 : 400,
              fontFamily: line === "HTML." ? FONTS.heading : FONTS.body,
              lineHeight: 1.7, margin: "0 0 12px",
              letterSpacing: line === "HTML." ? 4 : 0,
            }}>{line}</p>
          ))}
        </div>

        <button onClick={() => { setPhase("slides"); setSlideIndex(0); scrollToTop(); }} style={{
          width: "100%", background: C.accent, color: C.bg,
          border: "none", borderRadius: 10, padding: "14px",
          fontWeight: 800, fontSize: 13, cursor: "pointer",
          letterSpacing: 3, fontFamily: FONTS.heading,
          boxShadow: `0 0 20px ${C.accent}66`,
        }}>BEGIN LESSON →</button>
      </div>
    );
  }

  // ── BOSS PHASE ────────────────────────────────────────────
  if (phase === "boss") {
    const boss = mission.bossChallenge;
    const bossDone = completedChallenges.includes(boss.id);

    return (
      <div ref={containerRef} style={containerStyle}>
        <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, marginBottom: 20 }}>← Ship</button>

        <div style={{ background: `linear-gradient(135deg, ${C.accent}18, ${C.alien}18)`, border: `2px solid ${C.alien}`, borderRadius: 14, padding: 20, marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
          <div style={{ color: C.alien, fontSize: 12, letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>FINAL TRANSMISSION TEST</div>
          <div style={{ color: C.textPrimary, fontSize: 18, fontWeight: 800, fontFamily: FONTS.heading, letterSpacing: 1 }}>Module {mission.id} Boss Challenge</div>
        </div>

        <ZhanComment text={boss.zanComment} />

        <ChallengeCard
          key={boss.id}
          challenge={boss}
          alreadyDone={bossDone}
          onPass={() => onChallengePass(boss.id)}
        />

        {bossDone && (
          <div style={{ marginTop: 20 }}>
            <div style={{ background: C.alienDim, border: `1px solid ${C.alien}44`, borderRadius: 12, padding: 16, marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📡</div>
              <p style={{ color: C.alien, fontWeight: 700, fontSize: 14, margin: "0 0 6px", fontFamily: FONTS.heading, letterSpacing: 1 }}>{mission.storyTag} RESTORED</p>
              <p style={{ color: C.textMuted, fontSize: 13, margin: 0 }}>{mission.completionMessage}</p>
            </div>
            <button onClick={onComplete} style={{
              width: "100%", background: C.alien, color: C.bg,
              border: "none", borderRadius: 10, padding: "14px",
              fontWeight: 800, fontSize: 13, cursor: "pointer",
              letterSpacing: 3, fontFamily: FONTS.heading,
              boxShadow: `0 0 20px ${C.alien}66`,
            }}>RETURN TO SHIP 🛸</button>
          </div>
        )}
      </div>
    );
  }

  // ── SLIDES PHASE ──────────────────────────────────────────
  const slide = mission.slides[slideIndex];
  const challengeDone = slide.challenge ? completedChallenges.includes(slide.challenge.id) : true;

  return (
    <div ref={containerRef} style={containerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Ship</button>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.accent, fontSize: 10, letterSpacing: 2, fontFamily: FONTS.mono }}>Module {mission.id} — Briefing {slideIndex + 1} of {mission.slides.length}</div>
          <div style={{ color: C.textPrimary, fontSize: 15, fontWeight: 700, fontFamily: FONTS.heading, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{slide.heading}</div>
        </div>
      </div>

      {/* theory card */}
      <div style={{ background: C.card, border: `1px solid ${C.accent}33`, borderRadius: 14, padding: 20, marginBottom: 16, boxSizing: "border-box" }}>
        <p style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 12px", fontFamily: FONTS.mono }}>
          Briefing {slideIndex + 1} of {mission.slides.length}
        </p>
        <h3 style={{ color: C.accent, margin: "0 0 12px", fontSize: 17, fontFamily: FONTS.heading, letterSpacing: 0.5 }}>{slide.heading}</h3>
        <p style={{ color: C.textPrimary, lineHeight: 1.75, fontSize: 15, margin: 0 }}>{slide.body}</p>
        {slide.anatomy && <TagAnatomy parts={slide.anatomy} />}
        {slide.codeBlock && (
          <pre style={{
            background: C.tagBg, border: `1px solid ${C.accent}44`,
            borderRadius: 10, padding: "14px 12px",
            fontFamily: FONTS.mono, fontSize: 13, color: C.tagText,
            whiteSpace: "pre-wrap", wordBreak: "break-all",
            margin: "16px 0 0", lineHeight: 1.8,
          }}>{slide.codeBlock}</pre>
        )}
      </div>

      {/* zhan comment */}
      {slide.zanComment && <ZhanComment text={slide.zanComment} />}

      {/* challenge */}
      {slide.challenge && (
        <ChallengeCard
          key={slide.challenge.id}
          challenge={slide.challenge}
          alreadyDone={completedChallenges.includes(slide.challenge.id)}
          onPass={() => onChallengePass(slide.challenge.id)}
        />
      )}

      {/* drill zone */}
      {slide.challenge && completedChallenges.includes(slide.challenge.id) && slide.drills && (
        <DrillZone
          key={`drill-${slide.challenge.id}`}
          drills={slide.drills}
          challengeId={slide.challenge.id}
          onReady={(boosted) => goNext()}
        />
      )}

      {/* nav — only show if no drills or challenge not done */}
      {(!slide.drills || !completedChallenges.includes(slide.challenge?.id)) && (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
          <button onClick={goPrev} style={{
            background: C.surface, color: C.textPrimary,
            border: `1px solid ${C.border}`, borderRadius: 8,
            padding: "10px 20px", cursor: "pointer", fontSize: 13,
          }}>← Prev</button>

          <button
            onClick={goNext}
            disabled={!challengeDone}
            style={{
              background: challengeDone ? C.accent : C.border,
              color: challengeDone ? C.bg : C.textMuted,
              border: "none", borderRadius: 8,
              padding: "10px 20px", cursor: challengeDone ? "pointer" : "default",
              fontSize: 13, fontWeight: 700,
            }}
          >Next →</button>
        </div>
      )}
    </div>
  );
}