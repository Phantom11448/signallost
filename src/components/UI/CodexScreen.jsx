import { useState } from "react";
import { codexStructure } from "../../data/codex/structure";
import { codexText } from "../../data/codex/text";
import { codexMedia } from "../../data/codex/media";
import { codexInteractive } from "../../data/codex/interactive";
import { codexAccessibility } from "../../data/codex/accessibility";
import { codexStyling } from "../../data/codex/styling";

const C = {
  bg: "#020b18",
  surface: "#041528",
  card: "#061d35",
  border: "#0a3555",
  accent: "#00f5c4",
  alien: "#39ff14",
  gold: "#ffe94d",
  textPrimary: "#c8f0ff",
  textMuted: "#4a7fa0",
  tagBg: "#031a2e",
};

const FONTS = {
  heading: "'Orbitron', sans-serif",
  body: "'Exo 2', sans-serif",
  mono: "'Share Tech Mono', monospace",
};

const CODEX_CATEGORIES = [
  { id: "structure", icon: "🏗️", title: "Structure & Semantics", desc: "Page skeleton, sections, and layout tags.", entries: codexStructure.entries },
  { id: "text", icon: "💬", title: "Text & Special Characters", desc: "Headings, inline text tags, and entities.", entries: codexText.entries },
  { id: "media", icon: "🖼️", title: "Links, Images & Media", desc: "Links, images, video, and audio.", entries: codexMedia.entries },
  { id: "interactive", icon: "🎛️", title: "Lists, Buttons, Forms & Tables", desc: "Interactive elements and data display.", entries: codexInteractive.entries },
  { id: "accessibility", icon: "♿", title: "Accessibility", desc: "Making pages work for everyone.", entries: codexAccessibility.entries },
  { id: "styling", icon: "🎨", title: "Colors & Styling", desc: "Inline style, colors, and CSS basics.", entries: codexStyling.entries },
];

function CategoryDetail({ category, onBack }) {
  const [expandedEntryId, setExpandedEntryId] = useState(null);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = (key, code) => {
    if (!code) return;
    navigator.clipboard?.writeText(code).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(prev => (prev === key ? null : prev)), 1200);
  };
  return (
    <div>
      <button onClick={onBack} style={{
        background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted,
        borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, marginBottom: 16,
      }}>← All Categories</button>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ fontSize: 28 }}>{category.icon}</div>
        <div style={{ color: C.textPrimary, fontSize: 18, fontWeight: 800, fontFamily: FONTS.heading }}>{category.title}</div>
      </div>

      {(!category.entries || category.entries.length === 0) ? (
        <div style={{ color: C.textMuted, textAlign: "center", padding: "40px 20px", fontSize: 13 }}>
          This section is still being assembled. Check back soon.
        </div>
      ) : (
        category.entries.map(entry => {
          const isExpanded = expandedEntryId === entry.id;
          return (
            <div key={entry.id} style={{
              background: C.card, border: `1px solid ${C.accent}33`, borderRadius: 12,
              padding: 16, marginBottom: 12,
            }}>
              <div
                onClick={() => setExpandedEntryId(isExpanded ? null : entry.id)}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
              >
                <div style={{ color: C.accent, fontSize: 14, fontWeight: 700, fontFamily: FONTS.heading }}>{entry.title}</div>
                <div style={{ color: C.accent, fontSize: 16, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</div>
              </div>
              {isExpanded && (
                <>
                  {entry.intro && <p style={{ color: C.textMuted, fontSize: 12, lineHeight: 1.5, margin: "10px 0" }}>{entry.intro}</p>}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {(entry.items || []).map((item, i) => {
                      const key = `${entry.id}-${i}`;
                      const isCopied = copiedKey === key;
                      return (
                        <div
                          key={i}
                          onClick={() => handleCopy(key, item.code)}
                          style={{
                            background: isCopied ? `${C.alien}22` : C.tagBg,
                            border: `1px solid ${isCopied ? C.alien : C.border}`,
                            borderRadius: 8,
                            padding: "6px 10px", fontSize: 12, fontFamily: FONTS.mono, color: C.textPrimary,
                            display: "flex", alignItems: "center", gap: 6,
                            cursor: item.code ? "pointer" : "default",
                            transition: "all 0.2s",
                          }}
                        >
                          {item.swatch && <div style={{ width: 12, height: 12, borderRadius: 3, background: item.swatch, flexShrink: 0 }} />}
                          <span style={{ color: isCopied ? C.alien : C.gold }}>{isCopied ? "✓ Copied!" : item.code}</span>
                          {!isCopied && item.label && <span style={{ color: C.textMuted }}>— {item.label}</span>}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default function CodexScreen() {
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const activeCategory = CODEX_CATEGORIES.find(c => c.id === activeCategoryId);

  if (activeCategory) {
    return <CategoryDetail category={activeCategory} onBack={() => setActiveCategoryId(null)} />;
  }

  return (
    <div>
      <div style={{ color: C.textPrimary, fontSize: 18, fontWeight: 800, fontFamily: FONTS.heading, marginBottom: 4 }}>📖 CODEX</div>
      <div style={{ color: C.textMuted, fontSize: 12, marginBottom: 16, lineHeight: 1.5 }}>
        A reference library of HTML and light CSS — more than any single mission covers.
      </div>

      {CODEX_CATEGORIES.map(cat => (
        <div
          key={cat.id}
          onClick={() => setActiveCategoryId(cat.id)}
          style={{
            background: C.card, border: `1px solid ${C.border}`, borderRadius: 12,
            padding: 16, marginBottom: 10, cursor: "pointer",
            display: "flex", alignItems: "center", gap: 12,
          }}
        >
          <div style={{ fontSize: 26 }}>{cat.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ color: C.textPrimary, fontSize: 14, fontWeight: 700 }}>{cat.title}</div>
            <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>{cat.desc}</div>
          </div>
          <div style={{ color: C.accent, fontSize: 18 }}>›</div>
        </div>
      ))}
    </div>
  );
}