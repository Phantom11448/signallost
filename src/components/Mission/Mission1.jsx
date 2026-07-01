import { useState, useEffect, useRef } from "react";

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
        p{margin:0 0 6px;}
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
      {/* code display */}
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
      {/* tap chips */}
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
      <div style={{ color: C.red, fontSize: 12, fontWeight: 800, letterSpacing: 2, fontFamily: FONTS.heading, marginBottom: 4 }}>REQUIRED REPAIR</div>
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
          <p style={{ color: C.gold, margin: 0, fontSize: 13, fontFamily: FONTS.mono }}>{challenge.hint}</p>
        </div>
      )}

      {status === "pass" ? (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
          <p style={{ color: C.alien, margin: 0, fontWeight: 700, fontSize: 14 }}>✓ Signal confirmed! Transmission accepted by Phantar validator.</p>
          <button onClick={() => { setVal(""); setStatus("idle"); setFeedback(""); setAttempts(0); setShowHint(false); }} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 26, height: 26, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}>↺</button>
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

// ── MISSION 1 SLIDES ──────────────────────────────────────────
const SLIDES = [
  {
    id: "intro",
    type: "story",
  },
  {
    id: "what-is-html",
    type: "theory",
    heading: "What Even Is HTML?",
    body: "HTML stands for HyperText Markup Language. Let's break that down because it actually means something. HyperText means text that links to other text — that's what makes the web a web instead of just a bunch of separate documents. Markup means you're adding labels to your content to describe what it is. Language means it has rules and syntax you have to follow. So HTML is literally: a set of rules for labeling your content so browsers know what to display and how. Every single webpage you have ever visited — every news article, every social media post, every online store — is built on HTML. It is the foundation of everything on the internet. Is HTML a programming language? Technically no — and this matters. HTML describes content, it doesn't perform logic. You can't do math in HTML or make decisions. That comes later when you learn JavaScript. HTML just says: this is a heading, this is a paragraph, this is an image. The browser does the rest.",
    challenge: {
      id: "m1-what-is-html",
      instruction: "No challenge here — just making sure you read that. HTML stands for what three words?",
      check: (v) => {
        const n = v.toLowerCase();
        if (n.includes("hypertext") && n.includes("markup") && n.includes("language")) return "pass";
        return "Keep it simple — just type the three words HTML stands for";
      },
      hint: "HyperText Markup Language",
    },
  },
  {
    id: "tags",
    type: "theory",
    heading: "Tags — The Label Gun of the Web",
    body: "Think of HTML tags like a label gun at a warehouse. You wrap a label around something so everyone knows what it is. Every tag has two parts — an opening tag that says where it starts, and a closing tag that says where it ends. The closing tag is identical to the opening tag but with a forward slash before the name. Everything between the opening and closing tag is the content. The tag name tells the browser what kind of content this is. h1 means Heading Level 1 — the most important heading on the page. p means paragraph — a block of regular readable text. button means a clickable button. They all follow the exact same pattern: open it, put your content in, close it. Is this the only pattern? Almost — you'll learn later that some tags are self-closing and don't need a closing tag at all. We'll cover those when we get to images in Mission 2.",
    anatomy: [
      { text: "<h1>", color: "#ffe94d", highlight: "#ffe94d", label: "<h1> opening tag", explain: "Opens the tag. h1 = Heading Level 1. The most important heading on the page." },
      { text: "DISTRESS SIGNAL", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Whatever you want to display. This is what users actually see on the page." },
      { text: "</h1>", color: "#ffe94d", highlight: "#ffe94d", label: "</h1> closing tag", explain: "Closes the tag. The / means 'this tag ends here'. Must match the opening tag." },
    ],
    challenge: {
      id: "m1-tags",
      instruction: "Write any HTML tag wrapping any word. It can be h1, p, h2 — anything you like. Just show me you understand the open-content-close pattern.",
      check: (v) => {
        const n = v.toLowerCase().trim();
        if (!n) return "Type something — any tag wrapping any word";
        if (/<([a-z][a-z0-9]*)>[^<]+<\/\1>/.test(n)) return "pass";
        if (/<[a-z]+>/.test(n) && !/<\/[a-z]+>/.test(n)) return "You opened a tag but forgot to close it — add </ and the tag name and >";
        return "Try wrapping a word in a tag — like <h1>Hello</h1>";
      },
      hint: "<h1>Hello</h1> or <p>anything you want</p>",
    },
  },
  {
    id: "h1",
    type: "theory",
    heading: "Headings — h1 Through h6",
    body: "There are six heading tags in HTML — h1, h2, h3, h4, h5, and h6. h1 is the biggest and most important. h6 is the smallest. Think of it like a newspaper — the giant headline at the top is h1, the section titles are h2, the article subheadings are h3, and so on. The browser automatically sizes them — h1 is huge, h6 is barely bigger than regular text. You control exactly how they look later with CSS. One important rule: use only ONE h1 per page. That is your main title — the most important thing on the page. Search engines like Google read your h1 to understand what your page is about. Multiple h1 tags confuse both Google and screen readers. Will you use all six? Probably not often. h1, h2, and h3 cover 90% of real projects. But they all exist and they all work the same way.",
    anatomy: [
      { text: "<h1>", color: "#ffe94d", highlight: "#ffe94d", label: "<h1>", explain: "Heading Level 1 — biggest, most important. One per page only." },
      { text: "Main Title", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Your page's main title. Google reads this to understand your page." },
      { text: "</h1>", color: "#ffe94d", highlight: "#ffe94d", label: "</h1>", explain: "Closes the h1. Always close what you open." },
    ],
    challenge: {
      id: "m1-h1",
      instruction: "Write the main heading for Zhan's distress signal. Write an h1 that says: DISTRESS SIGNAL — StarBurner",
      check: (v) => {
        const n = v.toLowerCase().trim();
        if (!n) return "Type something";
        if (/<h1>\s*distress signal\s*[—-]\s*starburner\s*<\/h1>/i.test(v)) return "pass";
        if (!/<h1/.test(n)) return "Use the h1 tag — that's the main heading tag";
        if (/<h1/.test(n) && !/<\/h1>/.test(n)) return "You opened h1 but didn't close it — add </h1> at the end";
        if (/<h1>[^<]*<\/h1>/.test(n)) return "The tag is right but check the text — it needs to say: DISTRESS SIGNAL — StarBurner";
        return "Almost — check your spelling and make sure the text matches exactly";
      },
      hint: "<h1>DISTRESS SIGNAL — StarBurner</h1>",
    },
  },
  {
    id: "p",
    type: "theory",
    heading: "Paragraphs — Regular Readable Text",
    body: "The p tag is for paragraphs — blocks of regular readable text. p stands for paragraph, which is about as straightforward as HTML gets. Every time you start a new topic or new block of sentences, wrap it in its own p tag. The browser automatically adds a little space between paragraphs so they don't run together. When do you use p vs a heading? Simple rule: if it's a title or label, use a heading. If it's a sentence someone would read, use a paragraph. Most of the text on any webpage — the articles, the descriptions, the captions — is in p tags. Is p the only way to display text? No — you'll learn about span later which handles inline text, and there are other text elements like blockquote for quotes. But p is the workhorse. You'll use it constantly.",
    anatomy: [
      { text: "<p>", color: "#00f5c4", highlight: "#00f5c4", label: "<p>", explain: "Opens a paragraph. p = paragraph — a block of readable text." },
      { text: "Crash landed near Magnolia, Texas. Hull breach on port side. Atmosphere failing.", color: "#c8f0ff", highlight: "#39ff14", label: "content", explain: "Regular readable text. This is what users read on the page." },
      { text: "</p>", color: "#00f5c4", highlight: "#00f5c4", label: "</p>", explain: "Closes the paragraph. The browser adds spacing between paragraphs automatically." },
    ],
    challenge: {
      id: "m1-p",
      instruction: "Add Zhan's crash report to the distress signal. Write a paragraph that says: Crash landed near Magnolia Texas. Hull breach on port side. Atmosphere at critical levels.",
      check: (v) => {
        const n = v.toLowerCase().trim();
        if (!n) return "Type something";
        if (!/<p/.test(n)) return "Use the p tag — that's for paragraphs of text";
        if (/<p/.test(n) && !/<\/p>/.test(n)) return "You opened p but didn't close it — add </p> at the end";
        if (/crash landed/.test(n) && /magnolia/.test(n) && /atmosphere/.test(n) && /<p>[\s\S]*<\/p>/.test(n)) return "pass";
        if (/<p>[^<]*<\/p>/.test(n)) return "The tag is right but check the text — it needs to include: Crash landed near Magnolia Texas, Hull breach, and Atmosphere";
        return "Wrap your text in a p tag";
      },
      hint: "<p>Crash landed near Magnolia Texas. Hull breach on port side. Atmosphere at critical levels.</p>",
    },
  },
  {
    id: "boss",
    type: "boss",
  },
];

// ── DRILL DATA ────────────────────────────────────────────────
const DRILLS = {
  "m1-h1": [
    {
      instruction: "Write an h1 for a rescue mission called: Operation Bring Zhan Home",
      check: (v) => /<h1>\s*operation bring zhan home\s*<\/h1>/i.test(v),
      answer: "<h1>Operation Bring Zhan Home</h1>",
    },
    {
      instruction: "Write an h2 subheading that says: Crew Status Report",
      check: (v) => /<h2>\s*crew status report\s*<\/h2>/i.test(v),
      answer: "<h2>Crew Status Report</h2>",
    },
    {
      instruction: "Write an h3 for a section called: Last Known Coordinates",
      check: (v) => /<h3>\s*last known coordinates\s*<\/h3>/i.test(v),
      answer: "<h3>Last Known Coordinates</h3>",
    },
    {
      instruction: "Write an h1 that says: SOS — Phantar Vessel Down",
      check: (v) => /<h1>\s*sos\s*[—-]\s*phantar vessel down\s*<\/h1>/i.test(v),
      answer: "<h1>SOS — Phantar Vessel Down</h1>",
    },
  ],
  "m1-p": [
    {
      instruction: "Write a paragraph that says: Three crew members survived the crash. Two did not.",
      check: (v) => /<p>[\s\S]*three crew[\s\S]*<\/p>/i.test(v),
      answer: "<p>Three crew members survived the crash. Two did not.</p>",
    },
    {
      instruction: "Write a paragraph describing Zhan's situation — make it dramatic, at least one sentence",
      check: (v) => /<p>[^<]{20,}<\/p>/i.test(v),
      answer: "<p>The StarBurner is down. Atmosphere failing. We need rescue immediately.</p>",
    },
    {
      instruction: "Write a paragraph that says: Navigator Zorbin is missing. Last seen before impact.",
      check: (v) => /<p>[\s\S]*zorbin[\s\S]*missing[\s\S]*<\/p>/i.test(v),
      answer: "<p>Navigator Zorbin is missing. Last seen before impact.</p>",
    },
  ],
};

const MIN_REPS = 3;

// ── DRILL ZONE ────────────────────────────────────────────────
function DrillZone({ challengeId, onReady }) {
  const drills = DRILLS[challengeId] || [];
  const [current, setCurrent] = useState(0);
  const [val, setVal] = useState("");
  const [status, setStatus] = useState("idle");
  const [reps, setReps] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    if (!drills.length) {
      onReady(false);
    }
  }, []);

  if (!drills.length) return null;

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
    <div style={{
      background: C.surface,
      border: `1px solid ${C.accent}33`,
      borderRadius: 12, padding: 16, marginTop: 12,
    }}>
      {/* header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <div style={{ color: C.alien, fontSize: 13, fontWeight: 800, letterSpacing: 2, fontFamily: FONTS.heading }}>SIGNAL BOOST</div>
          <div style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, marginTop: 2 }}>
            📡 Transmit variations to boost signal strength
          </div>
        </div>
        {/* rep dots */}
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

      {/* signal strength bar */}
      <div style={{ background: C.card, borderRadius: 99, height: 6, overflow: "hidden", marginBottom: 12 }}>
        <div style={{
          width: `${Math.min((reps / MIN_REPS) * 100, 100)}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${C.accent}, ${C.alien})`,
          borderRadius: 99,
          transition: "width 0.5s ease",
          boxShadow: boosted ? `0 0 8px ${C.alien}` : "none",
        }} />
      </div>

      {/* Zhan commentary */}
      <div style={{ background: C.card, border: `1px solid ${C.accent}22`, borderRadius: 8, padding: "8px 12px", marginBottom: 12 }}>
        <p style={{ color: C.textMuted, fontSize: 12, margin: 0, fontStyle: "italic", lineHeight: 1.5 }}>
          {boosted
            ? '"Signal strength sufficient. Phantar can locate us. Though I would feel better with a stronger signal."'
            : reps === 0
            ? '"Phantar says my signal is too weak to pinpoint our location. I need to transmit more variations."'
            : `"${reps} transmission${reps > 1 ? "s" : ""} sent. Signal getting stronger. Keep going."`
          }
          <span style={{ color: C.accent, fontSize: 11, display: "block", marginTop: 4 }}>— Zhan</span>
        </p>
      </div>

      {/* drill instruction */}
      <p style={{ color: C.textPrimary, fontSize: 14, fontWeight: 600, margin: "0 0 10px", lineHeight: 1.5 }}>
        {drill.instruction}
      </p>

      {/* textarea */}
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
          }}>
            {current + 1 < drills.length ? "Next drill →" : "Again →"}
          </button>
        </div>
      ) : (
        <button onClick={check} style={{
          background: C.accent, color: C.bg, border: "none",
          borderRadius: 8, padding: "7px 18px", fontWeight: 800,
          fontSize: 12, cursor: "pointer", letterSpacing: 1,
          fontFamily: FONTS.heading, marginTop: 8,
        }}>TRANSMIT ▶</button>
      )}

      {/* continue button */}
      <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.border}` }}>
        <button
          onClick={() => onReady(boosted)}
          style={{
            width: "100%", padding: "10px",
            background: boosted ? C.alien : C.surface,
            color: boosted ? C.bg : C.textMuted,
            border: boosted ? "none" : `1px solid ${C.border}`,
            borderRadius: 8, fontWeight: 800, fontSize: 12,
            letterSpacing: 2, cursor: "pointer",
            fontFamily: FONTS.heading, transition: "all 0.4s",
            boxShadow: boosted ? `0 0 16px ${C.alien}66` : "none",
          }}
        >
          {boosted ? "SIGNAL BOOSTED — NEXT CONCEPT 🛸" : "SKIP — ADVANCE AT WEAK SIGNAL →"}
        </button>
      </div>
    </div>
  );
}

// ── MAIN MISSION 1 COMPONENT ──────────────────────────────────
export default function Mission1({ onBack, onComplete, completedChallenges = [], onChallengePass }) {
  const [slideIndex, setSlideIndex] = useState(0);
  const containerRef = useRef(null);
  const slide = SLIDES[slideIndex];

  const allTheoryChallenges = SLIDES.filter(s => s.challenge).map(s => s.challenge.id);
  const allDone = allTheoryChallenges.every(id => completedChallenges.includes(id));

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const goNext = () => {
    setSlideIndex(i => i + 1);
    setTimeout(() => {
      if (containerRef.current) containerRef.current.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);
  };

  const goPrev = () => {
    setSlideIndex(i => i - 1);
    scrollToTop();
  };

  // STORY INTRO SLIDE
  if (slide.type === "story") {
    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONTS.body, maxWidth: 430, margin: "0 auto", padding: "20px 16px 60px", boxSizing: "border-box", color: C.textPrimary }}>
        <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, marginBottom: 20 }}>← Ship</button>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <img src="/Zhanpic.png" style={{ width: 56, height: 56, borderRadius: "50%", border: `2px solid ${C.accent}`, objectFit: "cover", objectPosition: "top" }} />
          <div>
            <div style={{ color: C.accent, fontSize: 10, letterSpacing: 3, fontFamily: FONTS.mono }}>MODULE 1 — ANTENNA MODULE</div>
            <div style={{ color: C.textPrimary, fontSize: 18, fontWeight: 700, fontFamily: FONTS.heading, letterSpacing: 1 }}>Boot the Terminal</div>
          </div>
        </div>

        {/* atmosphere warning */}
        <div style={{ background: C.redDim, border: `1px solid ${C.red}44`, borderRadius: 10, padding: "10px 14px", marginBottom: 20, display: "flex", gap: 10, alignItems: "center" }}>
          <span>⚠️</span>
          <div>
            <div style={{ color: C.red, fontSize: 11, fontWeight: 700, letterSpacing: 2, fontFamily: FONTS.mono }}>ATMOSPHERE CRITICAL</div>
            <div style={{ color: C.textMuted, fontSize: 12 }}>72 hours of breathable air remaining</div>
          </div>
        </div>

        {/* Zhan monologue */}
        <div style={{ background: C.card, border: `1px solid ${C.accent}33`, borderRadius: 14, padding: 20, marginBottom: 20 }}>
          <div style={{ color: C.accent, fontSize: 10, letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 12 }}>// ZHAN'S LOG — STARDATE 4,888</div>

          {[
            "Okay. Okay. The StarBurner is down. Wooch and Luvek are alive. Zandek and Toch didn't make it.",
            "Zorbin is... I don't know where Zorbin is.",
            "The atmosphere generator is failing. I have maybe 72 hours of breathable air left. Earth's atmosphere is toxic to Phantarians — we need a completely different oxygen mixture. I cannot open the hatch.",
            "I've been scanning every communication system on this ship. Everything is destroyed. Everything except one ancient protocol that somehow survived the crash.",
            "HTML.",
            "My grandfather used to build websites with this. I laughed at him. I called it primitive. I called it embarrassing. He tried to teach me once and I told him I had better things to do.",
            "I need to learn HTML or we are going to die in Texas.",
            "The Phantar validator system will only accept a properly built HTML page as a distress signal. Every tag has to be correct. Every element has to be in the right place. One mistake and the transmission gets rejected.",
            "No pressure.",
            "Let's start with the basics.",
          ].map((line, i) => (
            <p key={i} style={{
              color: line === "HTML." ? C.accent : line === "No pressure." ? C.gold : C.textPrimary,
              fontSize: line === "HTML." ? 20 : 14,
              fontWeight: line === "HTML." ? 800 : 400,
              fontFamily: line === "HTML." ? FONTS.heading : FONTS.body,
              lineHeight: 1.7,
              margin: "0 0 12px",
              letterSpacing: line === "HTML." ? 4 : 0,
            }}>{line}</p>
          ))}
        </div>

        <button onClick={goNext} style={{
          width: "100%", background: C.accent, color: C.bg,
          border: "none", borderRadius: 10, padding: "14px",
          fontWeight: 800, fontSize: 13, cursor: "pointer",
          letterSpacing: 3, fontFamily: FONTS.heading,
          boxShadow: `0 0 20px ${C.accent}66`,
        }}>BEGIN LESSON →</button>
      </div>
    );
  }

  // BOSS SLIDE
  if (slide.type === "boss") {
    const bossDone = completedChallenges.includes("m1-boss");
    return (
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: FONTS.body, maxWidth: 430, margin: "0 auto", padding: "20px 16px 60px", boxSizing: "border-box", color: C.textPrimary }}>
        <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, marginBottom: 20 }}>← Ship</button>

        <div style={{ background: `linear-gradient(135deg, ${C.accent}18, ${C.alien}18)`, border: `2px solid ${C.alien}`, borderRadius: 14, padding: 20, marginBottom: 20, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>⚡</div>
          <div style={{ color: C.alien, fontSize: 12, letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 4 }}>FINAL TRANSMISSION TEST</div>
          <div style={{ color: C.textPrimary, fontSize: 18, fontWeight: 800, fontFamily: FONTS.heading, letterSpacing: 1 }}>Module 1 Boss Challenge</div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.accent}33`, borderRadius: 14, padding: 20, marginBottom: 16 }}>
          <p style={{ color: C.accent, fontSize: 13, lineHeight: 1.7, margin: "0 0 12px" }}>
            "Phantar's validator requires a complete transmission header before it will process any rescue request. I need both my heading AND my crash report in the same transmission block."
          </p>
          <p style={{ color: C.textMuted, fontSize: 12, margin: 0 }}>— Zhan</p>
        </div>

        <ChallengeCard
          challenge={{
            id: "m1-boss",
            instruction: "Write both: an h1 that says DISTRESS SIGNAL — StarBurner AND a paragraph below it that says: Pilot Zhan transmitting from Magnolia Texas. Atmosphere critical. Send rescue immediately.",
            check: (v) => {
              const n = v.toLowerCase();
              if (!n.trim()) return "Type something";
              const hasH1 = /<h1>\s*distress signal\s*[—-]\s*starburner\s*<\/h1>/i.test(v);
              const hasP = /<p>[\s\S]*magnolia[\s\S]*<\/p>/i.test(n) && /<p>[\s\S]*rescue[\s\S]*<\/p>/i.test(n);
              if (hasH1 && hasP) return "pass";
              if (!hasH1 && !hasP) return "You need both an h1 heading AND a p paragraph";
              if (!hasH1) return "The paragraph looks good — now add the h1 heading above it";
              if (!hasP) return "The heading looks good — now add the paragraph below it";
              return "Almost — check both elements are there and the text matches";
            },
            hint: "<h1>DISTRESS SIGNAL — StarBurner</h1>\n<p>Pilot Zhan transmitting from Magnolia Texas. Atmosphere critical. Send rescue immediately.</p>",
          }}
          alreadyDone={bossDone}
          onPass={() => {
            onChallengePass("m1-boss");
          }}
        />

        {bossDone && (
          <div style={{ marginTop: 20 }}>
            <div style={{ background: C.alienDim, border: `1px solid ${C.alien}44`, borderRadius: 12, padding: 16, marginBottom: 16, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📡</div>
              <p style={{ color: C.alien, fontWeight: 700, fontSize: 14, margin: "0 0 6px", fontFamily: FONTS.heading, letterSpacing: 1 }}>ANTENNA MODULE RESTORED</p>
              <p style={{ color: C.textMuted, fontSize: 13, margin: 0 }}>Your distress signal heading is now transmitting. Phantar can see you exist. That's a start.</p>
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

  // THEORY SLIDES
  const challengeDone = slide.challenge ? completedChallenges.includes(slide.challenge.id) : true;
  const isLast = slideIndex === SLIDES.length - 1;
  const isFirst = slideIndex === 0;

  return (
    <div ref={containerRef} style={{ minHeight: "100vh", background: C.bg, fontFamily: FONTS.body, maxWidth: 430, margin: "0 auto", padding: "20px 16px 60px", boxSizing: "border-box", color: C.textPrimary }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <button onClick={onBack} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13 }}>← Ship</button>
        <div style={{ flex: 1 }}>
          <div style={{ color: C.accent, fontSize: 10, letterSpacing: 2, fontFamily: FONTS.mono }}>Module 1 — Briefing {slideIndex} of {SLIDES.length - 2}</div>
          <div style={{ color: C.textPrimary, fontSize: 15, fontWeight: 700, fontFamily: FONTS.heading }}>{slide.heading}</div>
        </div>
      </div>

      {/* theory card */}
      <div style={{ background: C.card, border: `1px solid ${C.accent}33`, borderRadius: 14, padding: 20, marginBottom: 16, boxSizing: "border-box" }}>
        <p style={{ color: C.accent, fontSize: 10, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 12px", fontFamily: FONTS.mono }}>
          Briefing {slideIndex} of {SLIDES.length - 2}
        </p>
        <h3 style={{ color: C.accent, margin: "0 0 12px", fontSize: 17, fontFamily: FONTS.heading, letterSpacing: 0.5 }}>{slide.heading}</h3>
        <p style={{ color: C.textPrimary, lineHeight: 1.75, fontSize: 15, margin: "0 0 16px" }}>{slide.body}</p>
        {slide.anatomy && <TagAnatomy parts={slide.anatomy} />}
      </div>

      {/* challenge */}
      {slide.challenge && (
        <ChallengeCard
          key={slide.challenge.id}
          challenge={slide.challenge}
          alreadyDone={completedChallenges.includes(slide.challenge.id)}
          onPass={() => onChallengePass(slide.challenge.id)}
        />
      )}

      {/* drill zone — appears after challenge is passed */}
      {slide.challenge && completedChallenges.includes(slide.challenge.id) && DRILLS[slide.challenge.id] && (
        <DrillZone
          key={`drill-${slide.challenge.id}`}
          challengeId={slide.challenge.id}
          onReady={(boosted) => {
            goNext();
          }}
        />
      )}

      {/* nav */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button
          onClick={goPrev}
          disabled={isFirst}
          style={{
            background: isFirst ? C.border : C.surface,
            color: isFirst ? C.textMuted : C.textPrimary,
            border: `1px solid ${C.border}`, borderRadius: 8,
            padding: "10px 20px", cursor: isFirst ? "default" : "pointer", fontSize: 13,
          }}
        >← Prev</button>

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