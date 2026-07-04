import { useState, useRef, useEffect } from "react";
import UfoBurst from "../UI/Celebration";

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

// ── LIVE PREVIEW ──────────────────────────────────────────────
function LivePreview({ html, glow = false }) {
  const iframeRef = useRef(null);
  const isMediaHeavy = /<video|<audio|<img/i.test(String(html ?? ""));
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
        .replace(/src="repair\.webm"/gi, 'src="/repair.mp4"')
        .replace(/src="alien\.jpg"/gi, 'src="/newzhan.png"')
        .replace(/src="crew\.jpg"/gi, 'src="/begin.png"')
        .replace(/src="photo\.jpg"/gi, 'src="/StarBurnerpic.png"')
        .replace(/src="rescue\.jpg"/gi, 'src="/StarBurnerpic.png"');
      doc.open();
      doc.write(`<html><head><style>
        html,body{height:100%;margin:0;}
        body{font-family:system-ui,sans-serif;padding:12px;color:#1a1828;background:#f0fff8;box-sizing:border-box;}
        h1,h2,h3,h4,h5,h6{margin:0 0 6px;color:#020b18;}
        p{margin:0 0 6px;}a{color:#7c5cfc;}
        img{max-width:100%;max-height:100%;object-fit:contain;display:block;margin:0 auto;}
        video{max-width:100%;}
        table{border-collapse:collapse;margin:8px 0;}
        th,td{border:1px solid #ccc;padding:6px 10px;text-align:left;}
        th{background:#e8f5f0;}
      </style></head><body>${previewHtml}</body></html>`);
      doc.close();
    } catch (e) {}
  }, [html]);
  return (
    <div style={{ marginTop: 8 }}>
      <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", fontFamily: FONTS.mono }}>📡 Transmission Preview</p>
      <iframe
        ref={iframeRef}
        title="preview"
        style={{
          width: "100%", height: isMediaHeavy ? 220 : 100,
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
const KNOWN_TAGS = ["h1","h2","h3","h4","h5","h6","p","img","ul","ol","li","button","div","span","strong","em","br","small","blockquote"];
const TAG_SYNONYMS = { paragraph: "p", paragraphs: "p", link: "a", links: "a", image: "img", images: "img", picture: "img", article: "article", articles: "article" };

const INVISIBLE_TAG_NAMES = new Set(["head", "title", "meta", "link", "style", "script", "base", "doctype", "form", "table", "tr", "td"]);
const VOID_INVISIBLE_TAGS = new Set(["meta", "link", "base", "doctype"]);

function extractOpeningTagNames(str) {
  // Only matches opening tags (and <!DOCTYPE>) — never closing tags — and preserves
  // duplicates, so a hint requiring two separate <meta> tags is treated as two distinct
  // requirements instead of collapsing into one.
  const names = [];
  const re = /<(?!\/)!?\s*([a-zA-Z][a-zA-Z0-9]*)/g;
  let m;
  while ((m = re.exec(str)) !== null) {
    names.push(m[1].toLowerCase());
  }
  return names;
}

function getRequiredInvisibleTags(hint) {
  if (!hint) return [];
  return extractOpeningTagNames(hint).filter(name => INVISIBLE_TAG_NAMES.has(name));
}

function countTagInstancesTyped(val, tagName, requiredCount) {
  if (tagName === "doctype") return /<!DOCTYPE\s+html>/i.test(val) ? 1 : 0;
  if (VOID_INVISIBLE_TAGS.has(tagName)) {
    // Void tags (meta, link, base) have no closing tag — count how many fully-closed
    // instances exist (the ">" must actually be typed), capped at how many are required.
    const openRe = new RegExp(`<${tagName}(\\s[^>]*)?>`, "gi");
    return Math.min((val.match(openRe) || []).length, requiredCount);
  }
  // Non-void tags (head, title, style, script) require both the opening AND closing tag
  // to be fully typed before counting as complete.
  const openRe = new RegExp(`<${tagName}(\\s[^>]*)?>`, "i");
  const closeRe = new RegExp(`</${tagName}>`, "i");
  return openRe.test(val) && closeRe.test(val) ? 1 : 0;
}

function buildPeriodVariants(str) {
  // Finds every spot immediately before a closing tag (or the very end of the whole
  // string, ignoring trailing whitespace) and generates every combination of
  // "period present / period absent" at just those spots. Never touches periods
  // anywhere else in the text (mid-sentence, inside quotes, etc.), so this can never
  // break a check that requires specific wording elsewhere.
  const positions = [];
  const tagRegex = /<\/[a-zA-Z][a-zA-Z0-9]*>/g;
  let m;
  while ((m = tagRegex.exec(str)) !== null) {
    positions.push(m.index);
  }
  const trimmedEnd = str.replace(/\s+$/, "").length;
  if (!positions.includes(trimmedEnd)) positions.push(trimmedEnd);

  const uniquePositions = [...new Set(positions)].sort((a, b) => b - a);
  const variants = new Set([str]);
  const total = uniquePositions.length;
  const maxCombos = Math.min(64, 2 ** total);

  for (let combo = 0; combo < maxCombos; combo++) {
    let candidate = str;
    for (let i = 0; i < total; i++) {
      const pos = uniquePositions[i];
      const wantPeriod = (combo >> i) & 1;
      const hasPeriod = candidate[pos - 1] === ".";
      if (wantPeriod && !hasPeriod) {
        candidate = candidate.slice(0, pos) + "." + candidate.slice(pos);
      } else if (!wantPeriod && hasPeriod) {
        candidate = candidate.slice(0, pos - 1) + candidate.slice(pos);
      }
    }
    variants.add(candidate);
  }
  return [...variants];
}

function renderWithTagHighlights(text, relevantTags = [], entityHighlight = false) {
  if (!text) return text;
  const entityPattern = /(&[a-zA-Z0-9#]+;|property: value;|\bselector\b|\bh1\b)/g;

  // Split on backtick segments (literal required strings, rendered as blue chips)
  const backtickParts = text.split(/(`[^`]+`)/g);
  return backtickParts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const inner = part.slice(1, -1);
      return (
        <span key={`bt-${i}`} style={{
          fontFamily: FONTS.mono,
          color: C.alien,
          fontWeight: 700,
          fontSize: "1.1em",
        }}>{inner}</span>
      );
    }

    // For non-backtick segments, preserve existing entity-highlight behavior.
    const entityParts = entityHighlight ? part.split(entityPattern) : [part];
    return entityParts.flatMap((entityPart, entityIdx) => {
      // When entityHighlight is enabled, treat entities and selected syntax tokens
      // as blue-highlighted references (and keep them out of green tag highlighting).
      if (entityHighlight && (/^&[a-zA-Z0-9#]+;$/.test(entityPart) || entityPart === "property: value;" || entityPart === "selector" || entityPart === "h1")) {
        return (
          <span key={`ent-${i}-${entityIdx}`} style={{ color: "#4da6ff", fontSize: "1.08em", fontWeight: 600 }}>{entityPart}</span>
        );
      }

      return entityPart;
    });
  });
}

function ChallengeCard({ challenge, onPass, alreadyDone, onFirstPass }) {
  const [val, setVal] = useState("");
  const [status, setStatus] = useState(alreadyDone ? "pass" : "idle");
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showHint, setShowHint] = useState(false);
  const requiredInvisibleTags = getRequiredInvisibleTags(challenge.hint);
  const invisibleProgress = requiredInvisibleTags.length && status !== "pass"
    ? (() => {
        const requiredCounts = {};
        requiredInvisibleTags.forEach(name => { requiredCounts[name] = (requiredCounts[name] || 0) + 1; });
        let satisfied = 0;
        Object.keys(requiredCounts).forEach(name => {
          satisfied += countTagInstancesTyped(val, name, requiredCounts[name]);
        });
        return satisfied / requiredInvisibleTags.length;
      })()
    : 0;
  const previewPassing = status === "pass" || challenge.check(val) === "pass" || buildPeriodVariants(val).some(v => v !== val && challenge.check(v) === "pass");

  const check = () => {
    let result = challenge.check(val);
    if (result !== "pass") {
      for (const variant of buildPeriodVariants(val)) {
        if (variant !== val && challenge.check(variant) === "pass") {
          result = "pass";
          break;
        }
      }
    }
    if (result === "pass") {
      setStatus("pass");
      setFeedback("");
      if (!alreadyDone) {
        onPass();
        if (onFirstPass) onFirstPass();
      }
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
        <button onClick={() => { setStatus("idle"); setFeedback(""); setAttempts(0); setShowHint(false); }}
          style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 26, height: 26, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0 }}>↺</button>
      </div>
      <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginBottom: 12 }}>⚡ Complete this to advance</div>

      <p style={{ color: C.textPrimary, fontSize: 14, fontWeight: 600, lineHeight: 1.6, margin: "0 0 12px" }}>
        {renderWithTagHighlights(challenge.instruction, challenge.relevantTags, challenge.entityHighlight)}
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
          background: invisibleProgress > 0 ? `rgba(77,166,255,${(0.14 * invisibleProgress).toFixed(2)})` : C.tagBg, color: C.tagText,
          border: invisibleProgress > 0 ? `2px solid rgba(77,166,255,${(0.35 + 0.65 * invisibleProgress).toFixed(2)})` : `1px solid ${C.accent}44`,
          boxShadow: invisibleProgress > 0 ? `0 0 ${Math.round(6 + 12 * invisibleProgress)}px rgba(77,166,255,${(0.25 + 0.55 * invisibleProgress).toFixed(2)})` : "none",
          borderRadius: 8,
          padding: "10px 12px", fontFamily: FONTS.mono,
          fontSize: 13, resize: "vertical", outline: "none",
          marginBottom: 10, lineHeight: 1.6,
          transition: "all 0.3s ease",
        }}
      />

      {!challenge.invisibleOutput && <LivePreview html={val} glow={previewPassing} />}

      {challenge.invisibleOutput && status === "pass" && (
        <div style={{
          marginTop: 8,
          background: C.alienDim,
          border: `1px solid ${C.alien}44`,
          borderRadius: 8,
          padding: "10px 12px",
        }}>
          <p style={{ color: C.alien, margin: 0, fontSize: 13, fontStyle: "italic", lineHeight: 1.5 }}>
            📡 "Header data accepted. Not visible on the page. Phantar can read it. You cannot. This is apparently normal."
          </p>
        </div>
      )}

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
          <p style={{ color: C.gold, margin: 0, fontSize: 13, fontFamily: FONTS.mono, whiteSpace: "pre-wrap" }}>{renderWithTagHighlights(challenge.hint, challenge.relevantTags, challenge.entityHighlight)}</p>
        </div>
      )}

      {status === "pass" ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <p style={{ color: C.alien, margin: 0, fontWeight: 700, fontSize: 14 }}>✓ Signal confirmed! Transmission accepted by Phantar validator.</p>
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
  const [answers, setAnswers] = useState(() => Array((drills || []).length).fill(""));
  const [statuses, setStatuses] = useState(() => Array((drills || []).length).fill("idle"));
  const [reps, setReps] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (!drills || !drills.length) return null;

  const requiredReps = drills.length;
  const drill = drills[current];
  const boosted = reps >= requiredReps;
  const val = answers[current] || "";
  const status = statuses[current] || "idle";
  const requiredInvisibleTags = getRequiredInvisibleTags(drill.answer);
  const invisibleProgress = requiredInvisibleTags.length && status !== "pass"
    ? (() => {
        const requiredCounts = {};
        requiredInvisibleTags.forEach(name => { requiredCounts[name] = (requiredCounts[name] || 0) + 1; });
        let satisfied = 0;
        Object.keys(requiredCounts).forEach(name => {
          satisfied += countTagInstancesTyped(val, name, requiredCounts[name]);
        });
        return satisfied / requiredInvisibleTags.length;
      })()
    : 0;

  const setVal = (newVal) => {
    setAnswers(prev => {
      const copy = [...prev];
      copy[current] = newVal;
      return copy;
    });
  };

  const setStatus = (newStatus) => {
    setStatuses(prev => {
      const copy = [...prev];
      copy[current] = newStatus;
      return copy;
    });
  };

  const check = () => {
    const lower = val.toLowerCase();
    let passed = drill.check(lower);
    if (!passed) {
      for (const variant of buildPeriodVariants(lower)) {
        if (variant !== lower && drill.check(variant)) {
          passed = true;
          break;
        }
      }
    }
    if (passed) {
      const wasAlreadyPass = status === "pass";
      setStatus("pass");
      if (!wasAlreadyPass && !boosted) setReps(r => r + 1);
    } else {
      setStatus("fail");
    }
  };

  const next = () => {
    setCurrent(c => (c + 1) % drills.length);
    setShowAnswer(false);
  };

  const goDrillPrev = () => {
    setCurrent(c => (c - 1 + drills.length) % drills.length);
    setShowAnswer(false);
  };

  const goDrillNext = () => {
    setCurrent(c => (c + 1) % drills.length);
    setShowAnswer(false);
  };

  const resetDrill = () => {
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
          {Array.from({ length: requiredReps }).map((_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: "50%",
              background: i < reps ? C.alien : C.border,
              boxShadow: i < reps ? `0 0 8px ${C.alien}` : "none",
              transition: "all 0.3s",
            }} />
          ))}
          <span style={{ color: C.textMuted, fontSize: 11, marginLeft: 4 }}>{reps}/{requiredReps}</span>
        </div>
      </div>

      <div style={{ background: C.card, borderRadius: 99, height: 6, overflow: "hidden", marginBottom: 12 }}>
        <div style={{
          width: `${Math.min((reps / requiredReps) * 100, 100)}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${C.accent}, ${C.alien})`,
          borderRadius: 99, transition: "width 0.5s ease",
          boxShadow: boosted ? `0 0 8px ${C.alien}` : "none",
        }} />
      </div>

      {boosted && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, background: C.card, border: `1px solid ${C.accent}22`, borderRadius: 8, padding: "6px 10px" }}>
          <button onClick={goDrillPrev} style={{
            background: "transparent", border: `1px solid ${C.border}`, color: C.textPrimary,
            borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer",
          }}>← Prev drill</button>
          <span style={{ color: C.textMuted, fontSize: 11 }}>Drill {current + 1} of {drills.length}</span>
          <button onClick={goDrillNext} style={{
            background: "transparent", border: `1px solid ${C.border}`, color: C.textPrimary,
            borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer",
          }}>Next drill →</button>
        </div>
      )}

      <div style={{ background: C.card, border: `1px solid ${C.accent}22`, borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
        <p style={{ color: C.textMuted, fontSize: 12, margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
          {boosted
            ? '"Signal strength sufficient. Phantar can locate us. Though I would feel better with a stronger signal. I always feel better with a stronger signal."'
            : reps === 0
            ? '"Phantar says my signal is too weak to pinpoint our location. I need to transmit more variations. Of course I do."'
            : `"${reps} transmission${reps > 1 ? "s" : ""} sent. Signal getting stronger."`
          }
          <span style={{ color: C.accent, fontSize: 11, display: "block", marginTop: 4 }}>— Zhan</span>
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <p style={{ color: C.textPrimary, fontSize: 14, fontWeight: 600, margin: 0, lineHeight: 1.5, flex: 1 }}>
          {renderWithTagHighlights(drill.instruction, drill.relevantTags, drill.entityHighlight)}
        </p>
        {boosted && (
          <button onClick={resetDrill} title="Reset this drill" style={{
            background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted,
            borderRadius: "50%", width: 26, height: 26, fontSize: 13, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 0,
            marginLeft: 8, flexShrink: 0,
          }}>↺</button>
        )}
      </div>

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
        disabled={status === "pass" && !boosted}
        style={{
          width: "100%", boxSizing: "border-box", height: 68,
          background: invisibleProgress > 0 ? `rgba(77,166,255,${(0.14 * invisibleProgress).toFixed(2)})` : C.tagBg, color: C.tagText,
          border: invisibleProgress > 0 ? `2px solid rgba(77,166,255,${(0.35 + 0.65 * invisibleProgress).toFixed(2)})` : `1px solid ${C.accent}33`,
          boxShadow: invisibleProgress > 0 ? `0 0 ${Math.round(6 + 12 * invisibleProgress)}px rgba(77,166,255,${(0.25 + 0.55 * invisibleProgress).toFixed(2)})` : "none",
          borderRadius: 8,
          padding: "8px 12px", fontFamily: FONTS.mono,
          fontSize: 13, resize: "vertical", outline: "none",
          lineHeight: 1.6, marginBottom: 8,
          transition: "all 0.3s ease",
        }}
      />

      <LivePreview html={val} glow={(() => {
        const lower = val.toLowerCase();
        return status === "pass" || Boolean(drill.check(lower)) || buildPeriodVariants(lower).some(v => v !== lower && drill.check(v));
      })()} />

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
          {!boosted && (
            <button onClick={next} style={{
              background: C.accent, color: C.bg, border: "none",
              borderRadius: 7, padding: "6px 16px", fontSize: 12,
              fontWeight: 700, cursor: "pointer",
            }}>{current + 1 < drills.length ? "Next drill →" : "Finish set →"}</button>
          )}
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
function ZhanComment({ text, mood = "confused" }) {
  const moodImages = {
    confused: "/newzhan.png",
    annoyed: "/newzhan.png",
    glad: "/newzhan.png",
    night: "/newzhan.png",
  };

  return (
    <div style={{
      background: C.accentDim,
      border: "1px solid #00f5c433",
      borderRadius: 10, padding: "10px 14px",
      marginTop: 12, display: "flex", gap: 10, alignItems: "flex-start",
    }}>
      <img src={moodImages[mood] || "/newzhan.png"} style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0, border: "1px solid #00f5c4" }} />
      <p style={{ color: "#00f5c4", fontSize: 13, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>"{text}"</p>
    </div>
  );
}

const CHARACTER_IMAGES = {
  zhan: "/newzhan.png",
  wooch: "/wooch.png",
  luvek: "/luvek.png",
};

function DialogueExchange({ lines }) {
  // lines: array of { speaker: "zhan" | "wooch" | "luvek", name: string, text: string }
  return (
    <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
      {lines.map((line, i) => (
        <div key={i} style={{
          background: C.accentDim,
          border: "1px solid #00f5c433",
          borderRadius: 10, padding: "10px 14px",
          display: "flex", gap: 10, alignItems: "flex-start",
        }}>
          <img
            src={CHARACTER_IMAGES[line.speaker] || "/newzhan.png"}
            style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0, border: "1px solid #00f5c4" }}
          />
          <div>
            <p style={{ color: "#00f5c4", fontSize: 11, margin: "0 0 2px", fontWeight: 700, fontFamily: FONTS.mono, letterSpacing: 1 }}>{line.name}</p>
            <p style={{ color: "#00f5c4", fontSize: 13, margin: 0, lineHeight: 1.6, fontStyle: "italic" }}>
              "{line.text}"
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TwoSidedDialogue({ lines }) {
  // lines: array of { speaker: "zhan" | "wooch" | "luvek", name: string, text: string }
  // Determine the two distinct speakers present, in order of first appearance
  const speakers = [];
  lines.forEach(l => { if (!speakers.includes(l.speaker)) speakers.push(l.speaker); });
  const leftSpeaker = speakers[0];
  const rightSpeaker = speakers[1] || speakers[0];

  return (
    <div style={{
      marginTop: 12,
      background: C.accentDim,
      border: "1px solid #00f5c433",
      borderRadius: 10,
      padding: "12px 14px",
      display: "flex",
      alignItems: "stretch",
      gap: 10,
    }}>
      <img
        src={CHARACTER_IMAGES[leftSpeaker] || "/zhanconfused.png"}
        style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0, border: "1px solid #00f5c4", alignSelf: "flex-start" }}
      />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        {lines.map((line, i) => {
          const isRight = line.speaker === rightSpeaker && rightSpeaker !== leftSpeaker;
          return (
            <div key={i} style={{ textAlign: isRight ? "right" : "left" }}>
              <p style={{ color: "#00f5c4", fontSize: 10, margin: "0 0 2px", fontWeight: 700, fontFamily: FONTS.mono, letterSpacing: 1 }}>{line.name}</p>
              <p style={{ color: "#00f5c4", fontSize: 13, margin: 0, lineHeight: 1.5, fontStyle: "italic" }}>"{line.text}"</p>
            </div>
          );
        })}
      </div>
      <img
        src={CHARACTER_IMAGES[rightSpeaker] || "/wooch.png"}
        style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover", objectPosition: "top", flexShrink: 0, border: "1px solid #00f5c4", alignSelf: "flex-start" }}
      />
    </div>
  );
}

// ── MISSION SCREEN ────────────────────────────────────────────
export default function MissionScreen({ mission, onBack, onComplete, onNext, completedChallenges = [], onChallengePass, onOpenCodex }) {
  const [phase, setPhase] = useState("story"); // story | slides | boss
  const [slideIndex, setSlideIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const alreadyCompletedAny = mission.slides.some(s => s.challenge && completedChallenges.includes(s.challenge.id));
    if (!alreadyCompletedAny) {
      setPhase("story");
      setSlideIndex(0);
      return;
    }
    const firstIncompleteIndex = mission.slides.findIndex(s => !s.challenge || !completedChallenges.includes(s.challenge.id));
    if (firstIncompleteIndex === -1) {
      setPhase("boss");
    } else {
      setPhase("slides");
      setSlideIndex(firstIncompleteIndex);
    }
  }, [mission.id]);

  const [showCelebration, setShowCelebration] = useState(false);

  const triggerCelebration = () => {
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1800);
  };

  const scrollToTop = () => {
    setTimeout(() => {
      if (containerRef.current) containerRef.current.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const goNext = () => {
    console.log("goNext called", slideIndex, mission.slides.length);
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
        {showCelebration && <UfoBurst />}
        <button onClick={onOpenCodex} style={{ position: "fixed", top: 16, right: 16, zIndex: 150, background: C.alien, color: C.bg, border: "none", borderRadius: 20, padding: "8px 14px", fontWeight: 800, fontSize: 11, letterSpacing: 1, cursor: "pointer", fontFamily: FONTS.heading, boxShadow: `0 0 14px ${C.alien}66` }}>📖 CODEX</button>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Ship</button>
          <button onClick={() => { setPhase("slides"); setSlideIndex(mission.slides.length - 1); }} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, opacity: 0.8, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Review Lessons</button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <img src="/newzhan.png" style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${C.accent}`, objectFit: "cover", objectPosition: "top" }} />
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
        <button onClick={onOpenCodex} style={{ position: "fixed", top: 16, right: 16, zIndex: 150, background: C.alien, color: C.bg, border: "none", borderRadius: 20, padding: "8px 14px", fontWeight: 800, fontSize: 11, letterSpacing: 1, cursor: "pointer", fontFamily: FONTS.heading, boxShadow: `0 0 14px ${C.alien}66` }}>📖 CODEX</button>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Ship</button>
          <button onClick={() => { setPhase("slides"); setSlideIndex(mission.slides.length - 1); }} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, opacity: 0.8, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Review Lessons</button>
        </div>

        <div style={{ background: `linear-gradient(135deg, ${C.accent}18, ${C.alien}18)`, border: `2px solid ${C.alien}`, borderRadius: 14, padding: 20, marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
          <div style={{ color: C.alien, fontSize: 12, letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>FINAL TRANSMISSION TEST</div>
          <div style={{ color: C.textPrimary, fontSize: 18, fontWeight: 800, fontFamily: FONTS.heading, letterSpacing: 1 }}>Module {mission.id} Boss Challenge</div>
        </div>

        <ZhanComment text={boss.zanComment} mood="annoyed" />

        <ChallengeCard
          key={boss.id}
          challenge={boss}
          alreadyDone={bossDone}
          onPass={() => onChallengePass(boss.id)}
          onFirstPass={triggerCelebration}
        />

        {bossDone && (
          <div style={{ marginTop: 20 }}>
            <div style={{ background: C.alienDim, border: `1px solid ${C.alien}44`, borderRadius: 12, padding: 16, marginBottom: 16, textAlign: "center" }}>
              <img src="/newzhan.png" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: `2px solid ${C.alien}`, marginBottom: 8 }} />
              <div style={{ fontSize: 32, marginBottom: 8 }}>📡</div>
              <p style={{ color: C.alien, fontWeight: 700, fontSize: 14, margin: "0 0 6px", fontFamily: FONTS.heading, letterSpacing: 1 }}>{mission.storyTag} RESTORED</p>
              <p style={{ color: C.textMuted, fontSize: 13, margin: 0 }}>{mission.completionMessage}</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => { setPhase("slides"); setSlideIndex(mission.slides.length - 1); }} style={{
                flex: 1, background: C.surface, color: C.textPrimary,
                border: "1px solid " + C.border, borderRadius: 10, padding: "14px",
                fontWeight: 800, fontSize: 11, cursor: "pointer",
                letterSpacing: 2, fontFamily: "'Orbitron', sans-serif",
              }}>← REVIEW LESSONS</button>
              <button onClick={onNext} style={{
                flex: 2, background: C.alien, color: C.bg,
                border: "none", borderRadius: 10, padding: "14px",
                fontWeight: 800, fontSize: 13, cursor: "pointer",
                letterSpacing: 2, fontFamily: "'Orbitron', sans-serif",
                boxShadow: "0 0 20px #39ff1466",
              }}>NEXT MISSION →</button>
            </div>
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
      <button onClick={onOpenCodex} style={{ position: "fixed", top: 16, right: 16, zIndex: 150, background: C.alien, color: C.bg, border: "none", borderRadius: 20, padding: "8px 14px", fontWeight: 800, fontSize: 11, letterSpacing: 1, cursor: "pointer", fontFamily: FONTS.heading, boxShadow: `0 0 14px ${C.alien}66` }}>📖 CODEX</button>
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
        <p style={{ color: C.textPrimary, lineHeight: 1.75, fontSize: 15, margin: 0 }}>{renderWithTagHighlights(slide.body, slide.relevantTags, slide.entityHighlight)}</p>
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
      {slide.dialogueExchange && <TwoSidedDialogue lines={slide.dialogueExchange} />}
      {!slide.dialogueExchange && slide.zanComment && <ZhanComment text={slide.zanComment} mood="confused" />}

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
    </div>
  );
}