import { useState, useEffect, useRef } from "react";

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
  tagBg: "#031a2e",
  tagText: "#00f5c4",
};

const FONTS = {
  heading: "'Orbitron', sans-serif",
  body: "'Exo 2', sans-serif",
  mono: "'Share Tech Mono', monospace",
};

const STORAGE_KEY = "signal-lost-freestyle-snippets";
const MAX_SNIPPETS = 10;

function loadSnippets() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveSnippets(snippets) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snippets));
  } catch (e) {}
}

function FreestylePreview({ html }) {
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current) return;
    const doc = iframeRef.current.contentDocument;
    if (!doc) return;
    try {
      doc.open();
      doc.write(`<html><head><style>
        body{font-family:system-ui,sans-serif;padding:12px;color:#1a1828;background:#f0fff8;margin:0;line-height:1.6;}
        h1,h2,h3,h4,h5,h6{margin:0 0 6px;color:#020b18;}
        p{margin:0 0 6px;}a{color:#7c5cfc;}
        img{max-width:100%;max-height:100%;object-fit:contain;display:block;margin:0 auto;}
        video{max-width:100%;}
        table{border-collapse:collapse;margin:8px 0;}
        th,td{border:1px solid #ccc;padding:6px 10px;text-align:left;}
        th{background:#e8f5f0;}
      </style></head><body>${String(html ?? "")}</body></html>`);
      doc.close();
    } catch (e) {}
  }, [html]);

  return (
    <div style={{ marginTop: 8 }}>
      <p style={{ color: C.accent, fontSize: 11, textTransform: "uppercase", letterSpacing: 2, margin: "0 0 6px", fontFamily: FONTS.mono }}>📡 Live Preview</p>
      <iframe
        ref={iframeRef}
        title="freestyle-preview"
        style={{
          width: "100%", height: 220,
          border: `1px solid ${C.accent}44`,
          borderRadius: 8, background: "#f0fff8",
        }}
        sandbox="allow-same-origin"
      />
    </div>
  );
}

export default function FreestyleScreen({ onOpenCodex }) {
  const [code, setCode] = useState("");
  const [snippets, setSnippets] = useState([]);
  const [showSaveInput, setShowSaveInput] = useState(false);
  const [snippetName, setSnippetName] = useState("");

  useEffect(() => {
    setSnippets(loadSnippets());
  }, []);

  const handleSave = () => {
    if (!snippetName.trim()) return;
    const newSnippet = { id: Date.now(), name: snippetName.trim(), code };
    const updated = [newSnippet, ...snippets].slice(0, MAX_SNIPPETS);
    setSnippets(updated);
    saveSnippets(updated);
    setSnippetName("");
    setShowSaveInput(false);
  };

  const handleLoad = (snippet) => {
    setCode(snippet.code);
  };

  const handleDelete = (id) => {
    const updated = snippets.filter(s => s.id !== id);
    setSnippets(updated);
    saveSnippets(updated);
  };

  return (
    <div>
      <button onClick={onOpenCodex} style={{ position: "fixed", top: 16, right: 16, zIndex: 150, background: C.alien, color: C.bg, border: "none", borderRadius: 20, padding: "8px 14px", fontWeight: 800, fontSize: 11, letterSpacing: 1, cursor: "pointer", fontFamily: FONTS.heading, boxShadow: `0 0 14px ${C.alien}66` }}>📖 CODEX</button>

      <div style={{ color: C.textPrimary, fontSize: 18, fontWeight: 800, fontFamily: FONTS.heading, marginBottom: 4 }}>🛠️ FREESTYLE</div>
      <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 16, lineHeight: 1.5 }}>
        Build anything, no requirements. Save a snippet to come back to it later.
      </div>

      <textarea
        value={code}
        onChange={e => setCode(e.target.value)}
        onKeyDown={e => {
          if (e.key === "Tab") {
            e.preventDefault();
            const start = e.target.selectionStart;
            const newVal = code.substring(0, start) + "  " + code.substring(e.target.selectionEnd);
            setCode(newVal);
            setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 2; }, 0);
          }
        }}
        placeholder="// build anything here..."
        style={{
          width: "100%", boxSizing: "border-box", height: 160,
          background: C.tagBg, color: C.tagText,
          border: `1px solid ${C.accent}44`, borderRadius: 8,
          padding: "10px 12px", fontFamily: FONTS.mono,
          fontSize: 13, resize: "vertical", outline: "none",
          marginBottom: 10, lineHeight: 1.6,
        }}
      />

      <FreestylePreview html={code} />

      <div style={{ marginTop: 14 }}>
        {!showSaveInput ? (
          <button onClick={() => setShowSaveInput(true)} style={{
            background: C.accent, color: C.bg, border: "none",
            borderRadius: 8, padding: "10px 18px", fontWeight: 800,
            fontSize: 12, cursor: "pointer", letterSpacing: 1,
            fontFamily: FONTS.heading,
          }}>💾 Save Snippet</button>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={snippetName}
              onChange={e => setSnippetName(e.target.value)}
              placeholder="Name this snippet..."
              style={{
                flex: 1, background: C.tagBg, color: C.textPrimary,
                border: `1px solid ${C.accent}44`, borderRadius: 8,
                padding: "8px 12px", fontSize: 13, outline: "none",
              }}
            />
            <button onClick={handleSave} style={{
              background: C.accent, color: C.bg, border: "none",
              borderRadius: 8, padding: "8px 14px", fontWeight: 700,
              fontSize: 12, cursor: "pointer",
            }}>Save</button>
            <button onClick={() => { setShowSaveInput(false); setSnippetName(""); }} style={{
              background: "transparent", border: `1px solid ${C.border}`, color: C.textMuted,
              borderRadius: 8, padding: "8px 12px", fontSize: 12, cursor: "pointer",
            }}>Cancel</button>
          </div>
        )}
      </div>

      {snippets.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ color: C.accent, fontSize: 11, letterSpacing: 2, fontFamily: FONTS.mono, marginBottom: 10, textTransform: "uppercase" }}>
            Saved Snippets ({snippets.length}/{MAX_SNIPPETS})
          </div>
          {snippets.map(snippet => (
            <div key={snippet.id} style={{
              background: C.card, border: `1px solid ${C.border}`, borderRadius: 10,
              padding: "10px 12px", marginBottom: 8,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{ flex: 1, color: C.textPrimary, fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{snippet.name}</div>
              <button onClick={() => handleLoad(snippet)} style={{
                background: "transparent", border: `1px solid ${C.accent}66`, color: C.accent,
                borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer",
              }}>Load</button>
              <button onClick={() => handleDelete(snippet.id)} style={{
                background: "transparent", border: `1px solid ${C.red}66`, color: C.red,
                borderRadius: 6, padding: "5px 10px", fontSize: 11, cursor: "pointer",
              }}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}