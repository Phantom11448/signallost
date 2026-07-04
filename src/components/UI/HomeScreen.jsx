import { useState, useRef, useEffect } from "react";
import SignalPage from "./SignalPage";
import { resetProgress } from "../../gameService";
import { BUGS_DATA } from "../../data/bugs";
import UfoBurst from "./Celebration";
import CodexScreen from "./CodexScreen";
import FreestyleScreen from "./FreestyleScreen";

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

const C = {
  bg: "#020b18",
  surface: "rgba(8, 28, 58, 0.88)",
  card: "rgba(10, 36, 68, 0.88)",
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

export default function HomeScreen({ onStartMission, onStartBug, completedMissions = [], completedBugs = [], completedFinal = false, onStartFinal, justCompleted = null, onOpenCodex, onResetModule }) {
  const [activeTab, setActiveTab] = useState("missions");
  const [confirmingReset, setConfirmingReset] = useState(false);
  const [confirmingModuleKey, setConfirmingModuleKey] = useState(null);
  const [showAtmosphereModal, setShowAtmosphereModal] = useState(false);
  const cardRefs = useRef({});
  const hasAutoScrolled = useRef(false);
  const bgVideoRef = useRef(null);
  const totalMissions = MISSIONS.length;
  const completedCount = completedMissions.length;
  const percentage = Math.round((completedCount / totalMissions) * 100);

  const isMissionUnlocked = (missionId) => {
    const bugBeforeMission = BUGS_DATA.find(b => b.unlocksAfter === missionId - 1);
    if (bugBeforeMission && !completedBugs.includes(bugBeforeMission.id)) return false;
    if (missionId === 1) return true;
    return completedMissions.includes(missionId - 1);
  };

  const isBugUnlocked = (bug) => {
    return completedMissions.length >= bug.unlocksAfter;
  };

  const getBugAfterMission = (missionId) => {
    return BUGS_DATA.find(b => b.unlocksAfter === missionId);
  };

  const getCelebrationTarget = () => {
    if (!justCompleted) return null;
    if (justCompleted.type === "mission") {
      const dueBug = BUGS_DATA.find(b => b.unlocksAfter === justCompleted.id && !completedBugs.includes(b.id));
      if (dueBug) return { type: "bug", id: dueBug.id };
      const nextMission = MISSIONS.find(m => m.id === justCompleted.id + 1);
      if (nextMission) return { type: "mission", id: nextMission.id };
    }
    if (justCompleted.type === "bug") {
      const bug = BUGS_DATA.find(b => b.id === justCompleted.id);
      if (bug) {
        const nextMission = MISSIONS.find(m => m.id === bug.unlocksAfter + 1);
        if (nextMission) return { type: "mission", id: nextMission.id };
      }
    }
    return null;
  };

  const celebrationTarget = getCelebrationTarget();

  useEffect(() => {
    if (activeTab !== "missions" || hasAutoScrolled.current) return;

    const currentMission = MISSIONS.find(
      (mission) => isMissionUnlocked(mission.id) && !completedMissions.includes(mission.id)
    );

    if (!currentMission) {
      hasAutoScrolled.current = true;
      return;
    }

    const lastCompletedMission = completedMissions.length ? Math.max(...completedMissions) : 0;
    let targetKey = `mission-${currentMission.id}`;

    const nextBug = BUGS_DATA.find(
      (bug) =>
        bug.unlocksAfter > lastCompletedMission &&
        bug.unlocksAfter < currentMission.id &&
        isBugUnlocked(bug) &&
        !completedBugs.includes(bug.id)
    );

    if (nextBug) {
      targetKey = `bug-${nextBug.id}`;
    }

    const timeoutId = setTimeout(() => {
      cardRefs.current[targetKey]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);

    hasAutoScrolled.current = true;

    return () => clearTimeout(timeoutId);
  }, [activeTab]);

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      fontFamily: FONTS.body,
      maxWidth: 430,
      margin: "0 auto",
      paddingBottom: 80,
      position: "relative",
      overflow: "hidden",
    }}>
      <video
        ref={bgVideoRef}
        src="/repair.mp4"
        autoPlay
        muted
        playsInline
        onTimeUpdate={() => {
          const v = bgVideoRef.current;
          if (!v || !v.duration) return;
          const loopStart = Math.max(0, v.duration - 2);
          if (v.currentTime >= v.duration - 0.15) {
            v.currentTime = loopStart;
          }
        }}
        style={{
          position: "fixed",
          top: 0, left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 430,
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <div style={{
        position: "fixed",
        top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        height: "100%",
        background: "rgba(2,11,24,0.15)",
        zIndex: 1,
      }} />
      <div style={{ position: "relative", zIndex: 2 }}>
      {celebrationTarget && <UfoBurst />}

      {/* HEADER */}
      <div style={{
        background: C.surface,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: `1px solid ${C.border}`,
        padding: "20px 16px 16px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
          <img src="/newzhan.png" style={{
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

      {activeTab === "missions" && (
        <div>
          {/* ATMOSPHERE WARNING */}
          <div onClick={() => setShowAtmosphereModal(true)} style={{
            margin: "16px 16px 0",
            background: `${C.red}18`,
            border: `1px solid ${C.red}44`,
            borderRadius: 10,
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
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
              const bugCompleted = bug ? completedBugs.includes(bug.id) : false;

              return (
                <div key={mission.id}>
                  {/* MISSION CARD */}
                  <div
                    ref={(el) => { if (el) cardRefs.current[`mission-${mission.id}`] = el; }}
                    onClick={() => unlocked && onStartMission(mission.id)}
                    style={{
                      background: completed ? `${C.alien}10` : C.card,
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
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
                    {completed && (
                      <button
                        onClick={(e) => { e.stopPropagation(); setConfirmingModuleKey(prev => prev === `mission-${mission.id}` ? null : `mission-${mission.id}`); }}
                        style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 26, height: 26, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}
                      >↺</button>
                    )}
                  </div>

                  {confirmingModuleKey === `mission-${mission.id}` && (
                    <div style={{ background: `${C.red}14`, border: `1px solid ${C.red}55`, borderRadius: 10, padding: 12, marginBottom: 10 }}>
                      <p style={{ margin: "0 0 10px", color: C.red, fontSize: 12, lineHeight: 1.5 }}>
                        This will reset "{mission.title}" back to incomplete. Your overall story progress won't be affected otherwise. This cannot be undone.
                      </p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setConfirmingModuleKey(null)} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "8px 12px", fontSize: 11, cursor: "pointer" }}>Cancel</button>
                        <button onClick={() => { onResetModule && onResetModule('mission', mission.id); setConfirmingModuleKey(null); }} style={{ background: C.red, border: "none", color: "#fff", borderRadius: 8, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Confirm Reset</button>
                      </div>
                    </div>
                  )}

                  {/* BUG CHALLENGE after this mission */}
                  {bug && (
                    <div
                      ref={(el) => { if (el) cardRefs.current[`bug-${bug.id}`] = el; }}
                      onClick={() => bugUnlocked && !bugCompleted && onStartBug(bug.id)}
                      style={{
                      background: bugCompleted ? `${C.alien}10` : bugUnlocked ? `${C.red}10` : C.surface,
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      border: `1.5px solid ${bugCompleted ? C.alien + "88" : bugUnlocked ? C.red + "88" : C.border}`,
                      borderRadius: 12,
                      padding: "12px 16px",
                      marginBottom: 10,
                      opacity: bugUnlocked || bugCompleted ? 1 : 0.4,
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      cursor: bugUnlocked && !bugCompleted ? "pointer" : "default",
                    }}>
                      <div style={{ fontSize: 22 }}>{bugCompleted ? "✅" : bugUnlocked ? "🐛" : "🔒"}</div>
                      <div>
                        <div style={{ color: bugCompleted ? C.alien : bugUnlocked ? C.red : C.textMuted, fontSize: 9, letterSpacing: 2, fontFamily: FONTS.mono, textTransform: "uppercase", marginBottom: 2 }}>
                          {bugCompleted ? "✅ System Repaired" : bugUnlocked ? "⚡ System Corruption" : "Locked"}
                        </div>
                        <div style={{ color: bugCompleted ? C.alien : C.textPrimary, fontSize: 14, fontWeight: 700, fontFamily: FONTS.heading }}>{bug.title}</div>
                        <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>{bug.subtitle}</div>
                      </div>
                      {bugCompleted && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setConfirmingModuleKey(prev => prev === `bug-${bug.id}` ? null : `bug-${bug.id}`); }}
                          style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 24, height: 24, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0, marginLeft: "auto" }}
                        >↺</button>
                      )}
                    </div>
                  )}

                  {bug && confirmingModuleKey === `bug-${bug.id}` && (
                    <div style={{ background: `${C.red}14`, border: `1px solid ${C.red}55`, borderRadius: 10, padding: 12, marginBottom: 10 }}>
                      <p style={{ margin: "0 0 10px", color: C.red, fontSize: 12, lineHeight: 1.5 }}>
                        This will reset "{bug.title}" back to incomplete. Your overall story progress won't be affected otherwise. This cannot be undone.
                      </p>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button onClick={() => setConfirmingModuleKey(null)} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "8px 12px", fontSize: 11, cursor: "pointer" }}>Cancel</button>
                        <button onClick={() => { onResetModule && onResetModule('bug', bug.id); setConfirmingModuleKey(null); }} style={{ background: C.red, border: "none", color: "#fff", borderRadius: 8, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Confirm Reset</button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {completedMissions.includes(14) && (
              <div
                onClick={() => onStartFinal && onStartFinal()}
                style={{
                  background: completedFinal ? `${C.alien}10` : `linear-gradient(135deg, ${C.gold}16, ${C.alien}16)`,
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  border: `2px solid ${completedFinal ? C.alien : C.gold}`,
                  boxShadow: completedFinal ? `0 0 14px ${C.alien}44` : `0 0 18px ${C.gold}44`,
                  borderRadius: 14,
                  padding: 16,
                  marginBottom: 10,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div style={{ fontSize: 30, flexShrink: 0 }}>{completedFinal ? "✅" : "🛰️"}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: completedFinal ? C.alien : C.gold, fontSize: 9, letterSpacing: 2, fontFamily: FONTS.mono, textTransform: "uppercase", marginBottom: 2 }}>
                    FINAL TRANSMISSION
                  </div>
                  <div style={{ color: C.textPrimary, fontSize: 17, fontWeight: 700, fontFamily: FONTS.heading, letterSpacing: 0.5, marginBottom: 2 }}>
                    Rebuild the Distress Signal
                  </div>
                  <div style={{ color: C.textMuted, fontSize: 12 }}>{completedFinal ? "Transmitted — tap to revisit" : "Final Transmission"}</div>
                </div>
                {completedFinal ? (
                  <button
                    onClick={(e) => { e.stopPropagation(); setConfirmingModuleKey(prev => prev === "final" ? null : "final"); }}
                    style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: "50%", width: 26, height: 26, fontSize: 13, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, flexShrink: 0 }}
                  >↺</button>
                ) : (
                  <div style={{ color: C.gold, fontSize: 18, flexShrink: 0 }}>›</div>
                )}
              </div>
            )}

            {confirmingModuleKey === "final" && (
              <div style={{ background: `${C.red}14`, border: `1px solid ${C.red}55`, borderRadius: 10, padding: 12, marginBottom: 10 }}>
                <p style={{ margin: "0 0 10px", color: C.red, fontSize: 12, lineHeight: 1.5 }}>
                  This will reset the Final Transmission back to incomplete. Your overall story progress won't be affected otherwise. This cannot be undone.
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => setConfirmingModuleKey(null)} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.textMuted, borderRadius: 8, padding: "8px 12px", fontSize: 11, cursor: "pointer" }}>Cancel</button>
                  <button onClick={() => { onResetModule && onResetModule('final'); setConfirmingModuleKey(null); }} style={{ background: C.red, border: "none", color: "#fff", borderRadius: 8, padding: "8px 12px", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Confirm Reset</button>
                </div>
              </div>
            )}

            <div style={{ marginTop: 16, marginBottom: 8 }}>
              {!confirmingReset ? (
                <button
                  onClick={() => setConfirmingReset(true)}
                  style={{
                    background: C.surface,
                    border: `1px solid ${C.border}`,
                    color: C.textMuted,
                    borderRadius: 8,
                    padding: "8px 12px",
                    fontSize: 11,
                    fontFamily: FONTS.mono,
                    letterSpacing: 1,
                    cursor: "pointer",
                  }}
                >
                  Reset ALL Progress
                </button>
              ) : (
                <div style={{ background: `${C.red}14`, border: `1px solid ${C.red}55`, borderRadius: 10, padding: 12 }}>
                  <p style={{ margin: "0 0 10px", color: C.red, fontSize: 12, lineHeight: 1.5 }}>
                    This will permanently erase all mission and bug progress. This cannot be undone.
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => setConfirmingReset(false)}
                      style={{
                        background: C.surface,
                        border: `1px solid ${C.border}`,
                        color: C.textMuted,
                        borderRadius: 8,
                        padding: "8px 12px",
                        fontSize: 11,
                        cursor: "pointer",
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={async () => {
                        await resetProgress();
                        window.location.reload();
                      }}
                      style={{
                        background: C.red,
                        border: "none",
                        color: "#fff",
                        borderRadius: 8,
                        padding: "8px 12px",
                        fontSize: 11,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Confirm Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "signal" && <SignalPage completedMissions={completedMissions} />}
      {activeTab === "codex" && <div style={{padding: "16px"}}><CodexScreen /></div>}
      {activeTab === "freestyle" && <div style={{padding: "16px"}}><FreestyleScreen onOpenCodex={onOpenCodex} /></div>}

      {showAtmosphereModal && (
        <div
          onClick={() => setShowAtmosphereModal(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(2,11,24,0.78)",
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 380,
              background: C.card,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: `1.5px solid ${C.red}66`,
              borderRadius: 14,
              padding: "18px 16px 16px",
              color: C.textPrimary,
              position: "relative",
              boxShadow: `0 0 24px ${C.red}22`,
            }}
          >
            <button
              onClick={() => setShowAtmosphereModal(false)}
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                width: 28,
                height: 28,
                borderRadius: 8,
                border: `1px solid ${C.border}`,
                background: C.surface,
                color: C.textMuted,
                fontSize: 18,
                lineHeight: 1,
                cursor: "pointer",
              }}
            >
              ×
            </button>

            <h3 style={{ color: C.red, textAlign: "center", margin: "0 0 16px", fontFamily: FONTS.heading, letterSpacing: 2, fontSize: 17 }}>
              ATMOSPHERE CRITICAL
            </h3>

            <p style={{ textAlign: "center", color: C.textPrimary, lineHeight: 1.7, margin: "0 0 16px" }}>
              Phantarians breathe helium. Earth's atmosphere — mostly nitrogen and oxygen — is toxic to the crew. The hatch stays sealed. No one goes outside.
            </p>
            <p style={{ textAlign: "center", color: C.textPrimary, lineHeight: 1.7, margin: "0 0 16px" }}>
              The StarBurner's helium reserves are running out. Once they're gone, there's nothing left to breathe on this ship at all.
            </p>
            <p style={{ textAlign: "center", color: C.textPrimary, lineHeight: 1.7, margin: "0 0 16px" }}>
              Zhan's ancestors came from HTMLia, where his grandparents still knew how to write the old code by hand. Zhan never cared to learn it — it was a forgotten relic of ancient days.
            </p>
            <p style={{ textAlign: "center", color: C.textPrimary, lineHeight: 1.7, margin: 0 }}>
              This primitive protocol is the only failsafe still functioning on this ship. Zhan will have to learn it to save his crew in time.
            </p>
          </div>
        </div>
      )}

      {/* BOTTOM TAB BAR */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        maxWidth: 430,
        margin: "0 auto",
        background: C.surface,
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderTop: `1px solid ${C.accent}33`,
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 0 14px",
        zIndex: 100,
      }}>
        {[
          { icon: "🛸", label: "MISSIONS", id: "missions" },
          { icon: "📡", label: "SIGNAL", id: "signal" },
          { icon: "📋", label: "CODEX", id: "codex" },
          { icon: "🛠️", label: "FREESTYLE", id: "freestyle" },
        ].map((tab) => (
          <button key={tab.label} onClick={() => setActiveTab(tab.id)} style={{
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
            <div style={{ fontSize: 9, fontFamily: FONTS.mono, letterSpacing: 1, color: activeTab === tab.id ? C.accent : C.textMuted }}>{tab.label}</div>
          </button>
        ))}
      </div>

      </div>
    </div>
  );
}