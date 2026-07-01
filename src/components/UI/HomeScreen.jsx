import { useState } from "react";

const MISSIONS = [
  { id: 1, title: "Boot the Terminal", subtitle: "Tags & Headings", badge: "📡", locked: false, storyTag: "ANTENNA MODULE" },
  { id: 2, title: "Restore the Nav System", subtitle: "Links & Images", badge: "🛸", locked: true, storyTag: "NAV MODULE" },
  { id: 3, title: "Stabilize Life Support", subtitle: "Lists & Buttons", badge: "⚡", locked: true, storyTag: "LIFE SUPPORT" },
  { id: 4, title: "Restore the Ship Log", subtitle: "Text Formatting", badge: "📟", locked: true, storyTag: "LOG MODULE" },
  { id: 5, title: "Seal the Hull", subtitle: "Page Structure", badge: "🏗️", locked: true, storyTag: "HULL MODULE" },
  { id: 6, title: "Activate Comms Array", subtitle: "Forms Part 1", badge: "📻", locked: true, storyTag: "COMMS MODULE" },
  { id: 7, title: "Upgrade Life Pod Controls", subtitle: "Forms Part 2", badge: "🎛️", locked: true, storyTag: "CONTROLS MODULE" },
  { id: 8, title: "Reconstruct the Data Matrix", subtitle: "Tables", badge: "📊", locked: true, storyTag: "DATA MODULE" },
  { id: 9, title: "Decode the Alien Broadcast", subtitle: "Semantic HTML", badge: "📰", locked: true, storyTag: "BROADCAST MODULE" },
  { id: 10, title: "Restore the Holographic Projector", subtitle: "Media", badge: "📺", locked: true, storyTag: "PROJECTOR MODULE" },
  { id: 11, title: "Boot the Navigation Computer", subtitle: "Meta & Head", badge: "🧠", locked: true, storyTag: "NAV BRAIN" },
  { id: 12, title: "Repair the Universal Translator", subtitle: "Accessibility", badge: "♿", locked: true, storyTag: "TRANSLATOR MODULE" },
  { id: 13, title: "Decode Zorbin's Transmission", subtitle: "Comments & Special Characters", badge: "💬", locked: true, storyTag: "DECODER MODULE" },
  { id: 14, title: "Patch the Visual Interface", subtitle: "HTML & CSS Intro", badge: "🎨", locked: true, storyTag: "VISUAL MODULE" },
];

const BUG_CHALLENGES = [
  { id: "bug1", title: "Bug in the System #1", subtitle: "System Corruption Detected", unlocksAfter: 3, badge: "🐛" },
  { id: "bug2", title: "Bug in the System #2", subtitle: "Multiple Systems Corrupted", unlocksAfter: 6, badge: "🐛" },
  { id: "bug3", title: "Bug in the System #3", subtitle: "Critical System Failure", unlocksAfter: 9, badge: "🐛" },
];

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

export default function HomeScreen({ onStartMission, completedMissions = [] }) {
  const totalMissions = MISSIONS.length;
  const completedCount = completedMissions.length;
  const percentage = Math.round((completedCount / totalMissions) * 100);

  const isMissionUnlocked = (missionId) => {
    if (missionId === 1) return true;
    return completedMissions.includes(missionId - 1);
  };

  const isBugUnlocked = (bug) => {
    return completedMissions.length >= bug.unlocksAfter;
  };

  const getBugAfterMission = (missionId) => {
    return BUG_CHALLENGES.find(b => b.unlocksAfter === missionId);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      fontFamily: FONTS.body,
      maxWidth: 430,
      margin: "0 auto",
      paddingBottom: 80,
      position: "relative",
    }}>

      {/* HEADER */}
      <div style={{
        background: C.surface,
        borderBottom: `1px solid ${C.border}`,
        padding: "20px 16px 16px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <img src="/Zhanpic.png" style={{
            width: 48, height: 48,
            borderRadius: "50%",
            border: `2px solid ${C.accent}`,
            objectFit: "cover",
            objectPosition: "top",
          }} />
          <div>
            <div style={{ color: C.accent, fontSize: 10, letterSpacing: 3, fontFamily: FONTS.mono, textTransform: "uppercase" }}>Pilot Zhan — StarBurner</div>
            <div style={{ color: C.textPrimary, fontSize: 16, fontWeight: 700, fontFamily: FONTS.heading, letterSpacing: 1 }}>SIGNAL LOST</div>
          </div>
          <div style={{ marginLeft: "auto", textAlign: "right" }}>
            <div style={{ color: C.gold, fontWeight: 800, fontSize: 20, fontFamily: FONTS.heading }}>{percentage}%</div>
            <div style={{ color: C.textMuted, fontSize: 10, letterSpacing: 1 }}>TRANSMITTED</div>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div style={{
          background: C.card,
          borderRadius: 99, height: 8,
          overflow: "hidden",
          border: `1px solid ${C.border}`,
        }}>
          <div style={{
            width: `${percentage}%`,
            height: "100%",
            background: `linear-gradient(90deg, ${C.accent}, ${C.alien})`,
            borderRadius: 99,
            transition: "width 0.8s ease",
            boxShadow: `0 0 12px ${C.accent}88`,
          }} />
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ color: C.textMuted, fontSize: 11, fontFamily: FONTS.mono }}>DISTRESS SIGNAL COMPLETION</span>
          <span style={{ color: C.textMuted, fontSize: 11, fontFamily: FONTS.mono }}>{completedCount}/{totalMissions} modules</span>
        </div>
      </div>

      {/* ATMOSPHERE WARNING */}
      <div style={{
        margin: "16px 16px 0",
        background: `${C.red}18`,
        border: `1px solid ${C.red}44`,
        borderRadius: 10,
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <span style={{ fontSize: 18 }}>⚠️</span>
        <div>
          <div style={{ color: C.red, fontSize: 11, fontWeight: 700, letterSpacing: 2, fontFamily: FONTS.mono }}>ATMOSPHERE CRITICAL</div>
          <div style={{ color: C.textMuted, fontSize: 12, marginTop: 2 }}>Complete missions to boost your distress signal before time runs out</div>
        </div>
      </div>

      {/* MISSION LIST */}
      <div style={{ padding: "16px 16px 0" }}>
        <div style={{ color: C.accent, fontSize: 10, letterSpacing: 3, fontFamily: FONTS.mono, marginBottom: 12, textTransform: "uppercase" }}>— Transmission Modules —</div>

        {MISSIONS.map((mission) => {
          const unlocked = isMissionUnlocked(mission.id);
          const completed = completedMissions.includes(mission.id);
          const bug = getBugAfterMission(mission.id);
          const bugUnlocked = bug ? isBugUnlocked(bug) : false;

          return (
            <div key={mission.id}>
              {/* MISSION CARD */}
              <div
                onClick={() => unlocked && onStartMission(mission.id)}
                style={{
                  background: completed ? `${C.alien}10` : C.card,
                  border: `1.5px solid ${completed ? C.alien : unlocked ? C.accent + "66" : C.border}`,
                  borderRadius: 14,
                  padding: 16,
                  marginBottom: 10,
                  cursor: unlocked ? "pointer" : "default",
                  opacity: unlocked ? 1 : 0.45,
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div style={{ fontSize: 28, flexShrink: 0 }}>
                  {completed ? "✅" : unlocked ? mission.badge : "🔒"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: C.accent, fontSize: 9, letterSpacing: 2, fontFamily: FONTS.mono, textTransform: "uppercase", marginBottom: 2 }}>
                    Module {mission.id} — {mission.storyTag}
                  </div>
                  <div style={{ color: completed ? C.alien : C.textPrimary, fontSize: 15, fontWeight: 700, fontFamily: FONTS.heading, letterSpacing: 0.5, marginBottom: 2 }}>
                    {mission.title}
                  </div>
                  <div style={{ color: C.textMuted, fontSize: 12 }}>{mission.subtitle}</div>
                </div>
                {unlocked && !completed && (
                  <div style={{ color: C.accent, fontSize: 18, flexShrink: 0 }}>›</div>
                )}
              </div>

              {/* BUG CHALLENGE after this mission */}
              {bug && (
                <div style={{
                  background: bugUnlocked ? `${C.red}10` : C.surface,
                  border: `1.5px solid ${bugUnlocked ? C.red + "88" : C.border}`,
                  borderRadius: 12,
                  padding: "12px 16px",
                  marginBottom: 10,
                  opacity: bugUnlocked ? 1 : 0.4,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}>
                  <div style={{ fontSize: 22 }}>{bugUnlocked ? "🐛" : "🔒"}</div>
                  <div>
                    <div style={{ color: bugUnlocked ? C.red : C.textMuted, fontSize: 9, letterSpacing: 2, fontFamily: FONTS.mono, textTransform: "uppercase", marginBottom: 2 }}>
                      {bugUnlocked ? "⚡ System Corruption" : "Locked"}
                    </div>
                    <div style={{ color: C.textPrimary, fontSize: 14, fontWeight: 700, fontFamily: FONTS.heading }}>{bug.title}</div>
                    <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>{bug.subtitle}</div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* BOTTOM TAB BAR */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        maxWidth: 430,
        margin: "0 auto",
        background: C.surface,
        borderTop: `1px solid ${C.accent}33`,
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0 14px",
        zIndex: 100,
      }}>
        {[
          { icon: "🛸", label: "MISSIONS" },
          { icon: "📋", label: "CODEX" },
          { icon: "🛠️", label: "FREESTYLE" },
        ].map((tab) => (
          <button key={tab.label} style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            flex: 1,
          }}>
            <div style={{ fontSize: 22 }}>{tab.icon}</div>
            <div style={{ fontSize: 9, fontFamily: FONTS.mono, letterSpacing: 1, color: C.textMuted }}>{tab.label}</div>
          </button>
        ))}
      </div>

    </div>
  );
}