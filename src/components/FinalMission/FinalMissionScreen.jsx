import { useEffect, useRef, useMemo, useState } from "react";

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

const KNOWN_TAGS = ["h1","h2","h3","h4","h5","h6","p","img","ul","ol","li","button","div","span","strong","em","br","small","blockquote"];
const TAG_SYNONYMS = { paragraph: "p", paragraphs: "p", link: "a", links: "a", image: "img", images: "img", picture: "img", article: "article", articles: "article" };
const FINAL_MISSION_KEYWORDS = ["DOCTYPE","html","head","title","charset","viewport","body","header","h1","nav","main","section","paragraph","strong","em","image","alt","unordered list","button","blockquote","table","form","label","input","submit","video","controls","aria-label","comment","entity","ampersand","style"];

function renderWithTagHighlights(text, relevantTags = KNOWN_TAGS, entityHighlight = false) {
  if (!text) return text;
  const effectiveTags =
    arguments.length < 2
      ? KNOWN_TAGS
      : Array.isArray(relevantTags)
      ? relevantTags
      : [];
  const safeTags = effectiveTags
    .map(tag => String(tag).trim())
    .filter(Boolean);
  const bareWordTags = safeTags.filter(tag => tag !== "a");
  const tagSet = new Set(bareWordTags);
  const synonymSet = new Set();
  Object.keys(TAG_SYNONYMS).forEach(key => {
    if (tagSet.has(TAG_SYNONYMS[key])) synonymSet.add(key);
  });
  const tagPattern = bareWordTags.length ? new RegExp(`\\b(${bareWordTags.join("|")})\\b`, "g") : null;
  const synonymKeys = Array.from(synonymSet);
  const synonymPattern = synonymKeys.length ? new RegExp(`\\b(${synonymKeys.join("|")})\\b`, "gi") : null;
  const entityPattern = /(&[a-zA-Z0-9#]+;|property: value;|\bselector\b|\bh1\b)/g;

  const backtickParts = text.split(/(`[^`]+`)/g);
  return backtickParts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const inner = part.slice(1, -1);
      return (
        <span key={`bt-${i}`} style={{
          fontFamily: FONTS.mono,
          background: C.tagBg,
          color: C.gold,
          padding: "1px 5px",
          borderRadius: 4,
          fontSize: 13,
          border: `1px solid ${C.gold}44`,
        }}>{inner}</span>
      );
    }

    const entityParts = entityHighlight ? part.split(entityPattern) : [part];
    return entityParts.flatMap((entityPart, entityIdx) => {
      if (entityHighlight && (/^&[a-zA-Z0-9#]+;$/.test(entityPart) || entityPart === "property: value;" || entityPart === "selector" || entityPart === "h1")) {
        return (
          <span key={`ent-${i}-${entityIdx}`} style={{ color: "#4da6ff", fontSize: "1.08em", fontWeight: 600 }}>{entityPart}</span>
        );
      }

      if (!tagPattern && !synonymPattern) return entityPart;
      const subParts = tagPattern ? entityPart.split(tagPattern) : [entityPart];
      return subParts.flatMap((sub, j) => {
        if (tagSet.has(sub)) {
          return (
            <span key={`tag-${i}-${entityIdx}-${j}`} style={{
              fontFamily: FONTS.mono,
              color: C.alien,
              fontWeight: 700,
            }}>{`<${sub}>`}</span>
          );
        }
        if (!synonymPattern) return sub;
        const synonymParts = sub.split(synonymPattern);
        return synonymParts.map((piece, k) => {
          const normalized = typeof piece === "string" ? piece.toLowerCase() : "";
          if (synonymSet.has(normalized)) {
            return (
              <span key={`syn-${i}-${entityIdx}-${j}-${k}`} style={{
                fontFamily: FONTS.mono,
                color: C.alien,
                fontWeight: 700,
              }}>{`<${TAG_SYNONYMS[normalized]}>`}</span>
            );
          }
          return piece;
        });
      });
    });
  });
}

function renderFinalRequirementHighlights(text) {
  if (!text) return text;
  const escapedKeywords = FINAL_MISSION_KEYWORDS
    .map(keyword => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .sort((a, b) => b.length - a.length);
  const keywordPattern = new RegExp(`\\b(${escapedKeywords.join("|")})\\b`, "gi");
  const backtickParts = text.split(/(`[^`]+`)/g);

  return backtickParts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const inner = part.slice(1, -1);
      return (
        <span key={`fr-bt-${i}`} style={{
          fontFamily: FONTS.mono,
          background: C.tagBg,
          color: C.gold,
          padding: "1px 5px",
          borderRadius: 4,
          fontSize: 13,
          border: `1px solid ${C.gold}44`,
        }}>{inner}</span>
      );
    }

    const keywordParts = part.split(keywordPattern);
    return keywordParts.map((piece, j) => {
      if (FINAL_MISSION_KEYWORDS.some(keyword => keyword.toLowerCase() === String(piece).toLowerCase())) {
        return (
          <span key={`fr-kw-${i}-${j}`} style={{ color: "#4da6ff", fontSize: "1.08em", fontWeight: 600 }}>{piece}</span>
        );
      }
      return piece;
    });
  });
}

function LivePreview({ html }) {
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
        .replace(/src="crew\.jpg"/gi, 'src="/newzhan.png"')
        .replace(/src="photo\.jpg"/gi, 'src="/StarBurnerpic.png"')
        .replace(/src="rescue\.jpg"/gi, 'src="/StarBurnerpic.png"');

      doc.open();
      doc.write(`<!DOCTYPE html>
<html><head><style>
body { font-family: system-ui, sans-serif; padding: 12px; color: #1a1828; background: #f0fff8; margin: 0; line-height: 1.6; }
h1,h2,h3,h4,h5,h6 { margin: 0 0 6px; color: #020b18; }
p { margin: 0 0 6px; }
ul,ol { margin: 0 0 10px; padding-left: 20px; }
li { margin-bottom: 4px; }
a { color: #7c5cfc; }
img { max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; }
button { background: #00b894; color: #fff; border: none; padding: 8px 16px; border-radius: 6px; }
table { border-collapse: collapse; margin: 8px 0; }
th,td { border: 1px solid #ccc; padding: 6px 10px; text-align: left; }
th { background: #e8f5f0; }
</style></head><body>${previewHtml}</body></html>`);
      doc.close();
    } catch (e) {}
  }, [html]);

  return (
    <div style={{ marginTop: 8 }}>
      <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", fontFamily: FONTS.mono }}>📡 Transmission Preview</p>
      <iframe
        ref={iframeRef}
        title="final-preview"
        style={{ width: "100%", height: 180, border: `1px solid ${C.accent}44`, borderRadius: 8, background: "#f0fff8" }}
        sandbox="allow-same-origin"
      />
    </div>
  );
}

function CelebrationOverlay({ onFinish }) {
  const particles = useMemo(() => {
    const emojis = ["🎉", "🎊", "✨", "🛸", "👽", "📡", "🌌", "💫", "⭐", "🎆"];
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      duration: 2.5 + Math.random() * 2.5,
      delay: Math.random() * 1.5,
      size: 16 + Math.random() * 20,
    }));
  }, []);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 450,
      background: "radial-gradient(circle at 50% 30%, #0a3555 0%, #020b18 70%)",
      overflow: "hidden",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: 24, textAlign: "center",
    }}>
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0.85; }
        }
        @keyframes celebrationPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
      `}</style>

      {particles.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          top: 0,
          left: `${p.left}%`,
          fontSize: p.size,
          animation: `confettiFall ${p.duration}s linear ${p.delay}s infinite`,
          pointerEvents: "none",
        }}>{p.emoji}</div>
      ))}

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ fontSize: 64, marginBottom: 12, animation: "celebrationPulse 1.4s ease-in-out infinite" }}>🛸🎉👽</div>
        <div style={{
          color: "#39ff14", fontFamily: "'Orbitron', sans-serif",
          fontSize: 26, fontWeight: 800, letterSpacing: 2,
          marginBottom: 10, textShadow: "0 0 20px #39ff14aa",
        }}>CONGRATULATIONS</div>
        <div style={{
          color: "#00f5c4", fontFamily: "'Share Tech Mono', monospace",
          fontSize: 15, letterSpacing: 2, marginBottom: 30,
        }}>📡 RESCUE IS ON ITS WAY 📡</div>
        <button onClick={onFinish} style={{
          background: "#39ff14", color: "#020b18", border: "none",
          borderRadius: 30, padding: "14px 36px", fontSize: 13,
          fontFamily: "'Orbitron', sans-serif", fontWeight: 800,
          letterSpacing: 3, cursor: "pointer",
          boxShadow: "0 0 24px #39ff1488",
        }}>CONTINUE →</button>
      </div>
    </div>
  );
}

export default function FinalMissionScreen({ mission, onBack, onComplete, completedChallenges = [], onChallengePass, onOpenCodex }) {
  const [phase, setPhase] = useState("intro");
  const [showRequirements, setShowRequirements] = useState(false);
  const [val, setVal] = useState("");
  const [status, setStatus] = useState(completedChallenges.includes(mission.challenge.id) ? "pass" : "idle");
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const containerRef = useRef(null);
  const requirementRefs = useRef([]);
  const [celebrationPhase, setCelebrationPhase] = useState(null);
  const alreadyCompletedRef = useRef(completedChallenges.includes(mission.challenge.id));

  const isRequirementMet = (requirement) => requirement.tests.every(t => t.test(val));

  const toggleRequirements = () => {
    setShowRequirements(v => {
      const next = !v;
      if (next) {
        setTimeout(() => {
          const firstIncompleteIndex = mission.requirements.findIndex(req => !isRequirementMet(req));
          const targetIndex = firstIncompleteIndex === -1 ? mission.requirements.length - 1 : firstIncompleteIndex;
          requirementRefs.current[targetIndex]?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 50);
      }
      return next;
    });
  };

  const scrollToTop = () => {
    setTimeout(() => {
      if (containerRef.current) containerRef.current.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

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

  const check = () => {
    const result = mission.challenge.check(val);
    if (result === "pass") {
      setStatus("pass");
      setFeedback("");
      if (!completedChallenges.includes(mission.challenge.id)) onChallengePass(mission.challenge.id);
      if (!alreadyCompletedRef.current) {
        setCelebrationPhase("video");
      }
    } else {
      setStatus("fail");
      setFeedback(result);
    }
  };

  const completionParagraphs = mission.completionMessage.split("\n\n");

  if (phase === "intro") {
    return (
      <div ref={containerRef} style={containerStyle}>
        <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, marginBottom: 20 }}>← Ship</button>
        <button onClick={onOpenCodex} style={{ position: "fixed", top: 16, right: 16, zIndex: 150, background: C.alien, color: C.bg, border: "none", borderRadius: 20, padding: "8px 14px", fontWeight: 800, fontSize: 11, letterSpacing: 1, cursor: "pointer", fontFamily: FONTS.heading, boxShadow: `0 0 14px ${C.alien}66` }}>📖 CODEX</button>

        <div style={{ background: `linear-gradient(135deg, ${C.red}22, ${C.gold}22, ${C.alien}22)`, border: `2px solid ${C.gold}`, boxShadow: `0 0 24px ${C.gold}33`, borderRadius: 16, padding: 22, marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontSize: 52, marginBottom: 10 }}>{mission.badge}</div>
          <div style={{ color: C.gold, fontSize: 11, letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 6 }}>{mission.storyTag}</div>
          <div style={{ color: C.textPrimary, fontSize: 24, fontWeight: 800, fontFamily: FONTS.heading, letterSpacing: 1 }}>{mission.title}</div>
          <div style={{ color: C.textMuted, fontSize: 13, marginTop: 6 }}>{mission.subtitle}</div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.accent}33`, borderRadius: 14, padding: 20, marginBottom: 16 }}>
          <div style={{ color: C.accent, fontSize: 10, letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 12 }}>// FINAL BRIEFING</div>
          {mission.intro.map((line, i) => (
            <p key={i} style={{ color: C.textPrimary, fontSize: 14, lineHeight: 1.7, margin: "0 0 12px" }}>{line}</p>
          ))}
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.gold}44`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
          <div style={{ color: C.gold, fontSize: 10, letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 12 }}>REQUIREMENTS</div>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {mission.requirements.map((req, i) => (
              <li key={i} style={{ color: C.textPrimary, marginBottom: 10, lineHeight: 1.6 }}>
                {renderFinalRequirementHighlights(req.text)}
              </li>
            ))}
          </ul>
        </div>

        <button onClick={() => { setPhase("challenge"); scrollToTop(); }} style={{ width: "100%", background: C.alien, color: C.bg, border: "none", borderRadius: 10, padding: "14px", fontWeight: 800, fontSize: 13, cursor: "pointer", letterSpacing: 2, fontFamily: FONTS.heading, boxShadow: `0 0 20px ${C.alien}66` }}>BEGIN RECONSTRUCTION →</button>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={containerStyle}>
      <style>{`@keyframes finalFadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>

      {celebrationPhase === "video" && (
        <div style={{ position: "fixed", inset: 0, background: "#000", zIndex: 400 }}>
          <video
            src="/rescue.mp4"
            autoPlay
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onEnded={() => setCelebrationPhase("confetti")}
          />
        </div>
      )}

      {celebrationPhase === "confetti" && (
        <CelebrationOverlay onFinish={() => setCelebrationPhase(null)} />
      )}

      <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, marginBottom: 16 }}>← Ship</button>
      <button onClick={onOpenCodex} style={{ position: "fixed", top: 16, right: 16, zIndex: 150, background: C.alien, color: C.bg, border: "none", borderRadius: 20, padding: "8px 14px", fontWeight: 800, fontSize: 11, letterSpacing: 1, cursor: "pointer", fontFamily: FONTS.heading, boxShadow: `0 0 14px ${C.alien}66` }}>📖 CODEX</button>

      <button
        onClick={toggleRequirements}
        onMouseDown={(e) => e.preventDefault()}
        style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 12, marginBottom: 12 }}
      >
        {showRequirements ? "Hide Requirements" : "Show Requirements"}
      </button>

      {showRequirements && (
        <div style={{ background: C.card, border: `1px solid ${C.gold}44`, borderRadius: 12, padding: 16, marginBottom: 14 }}>
          <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
            {mission.requirements.map((req, i) => {
              const met = isRequirementMet(req);
              return (
                <li
                  key={i}
                  ref={el => { requirementRefs.current[i] = el; }}
                  style={{ color: met ? C.alien : C.textPrimary, marginBottom: 9, lineHeight: 1.6, display: "flex", gap: 8, alignItems: "flex-start", opacity: met ? 0.7 : 1 }}
                >
                  <span style={{ flexShrink: 0 }}>{met ? "✓" : "•"}</span>
                  <span>{renderFinalRequirementHighlights(req.text)}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div style={{ background: C.card, border: `1.5px solid ${status === "pass" ? C.alien : status === "fail" ? C.red : `${C.accent}66`}`, borderRadius: 12, padding: 18 }}>
        <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>⚡ Full Reconstruction Challenge</div>

        <textarea
          value={val}
          onChange={e => { setVal(e.target.value); setStatus(completedChallenges.includes(mission.challenge.id) ? "pass" : "idle"); setFeedback(""); }}
          onKeyDown={e => {
            if (e.key === "Tab") {
              e.preventDefault();
              const start = e.target.selectionStart;
              const nextValue = `${val.slice(0, start)}  ${val.slice(e.target.selectionEnd)}`;
              setVal(nextValue);
              setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
            }
          }}
          placeholder="// rebuild the full transmission page here..."
          disabled={status === "pass"}
          style={{
            width: "100%",
            boxSizing: "border-box",
            height: 300,
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

        <LivePreview html={val} />

        {status === "fail" && feedback && (
          <div style={{ background: C.redDim, border: `1px solid ${C.red}44`, borderRadius: 8, padding: "8px 12px", margin: "10px 0" }}>
            <p style={{ color: C.red, margin: 0, fontSize: 13 }}>❌ {feedback}</p>
          </div>
        )}

        {showHint && mission.challenge.hint && (
          <div style={{ background: C.goldDim, border: `1px solid ${C.gold}44`, borderRadius: 8, padding: "8px 12px", marginBottom: 10 }}>
            <p style={{ color: C.gold, margin: 0, fontSize: 13, fontFamily: FONTS.mono, whiteSpace: "pre-wrap" }}>{renderWithTagHighlights(mission.challenge.hint, mission.challenge.relevantTags, mission.challenge.entityHighlight)}</p>
          </div>
        )}

        {status !== "pass" && mission.challenge.hint && (
          <button
            onClick={() => setShowHint(v => !v)}
            style={{ background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 14px", fontSize: 12, cursor: "pointer", marginBottom: 8, display: "block" }}
          >
            {showHint ? "Hide hint" : "📡 Show hint"}
          </button>
        )}

        {status === "pass" ? (
          <div style={{ marginTop: 12, background: C.alienDim, border: `1px solid ${C.alien}66`, borderRadius: 12, padding: 16, boxShadow: `0 0 20px ${C.alien}22`, position: "relative" }}>
            <button onClick={() => { setStatus("idle"); setCelebrationPhase(null); }} style={{ position: "absolute", top: 12, right: 12, background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 26, height: 26, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>↺</button>
            <div style={{ color: C.alien, fontFamily: FONTS.heading, letterSpacing: 2, fontSize: 15, marginBottom: 10, textAlign: "center" }}>✓ TRANSMISSION COMPLETE</div>
            {completionParagraphs.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  color: C.textPrimary,
                  margin: "0 0 12px",
                  lineHeight: 1.7,
                  animation: "finalFadeIn 500ms ease forwards",
                  animationDelay: `${i * 220}ms`,
                  opacity: 0,
                }}
              >
                {paragraph}
              </p>
            ))}
            <button onClick={onComplete} style={{ width: "100%", background: C.surface, color: C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px", fontWeight: 800, fontSize: 11, cursor: "pointer", letterSpacing: 2, fontFamily: FONTS.heading }}>RETURN TO SHIP</button>
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
    </div>
  );
}
