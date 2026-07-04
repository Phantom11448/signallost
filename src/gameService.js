import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

// Generate or get a unique player ID stored in localStorage
export const getPlayerId = () => {
  let id = localStorage.getItem("signal-lost-player-id");
  if (!id) {
    id = "player-" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("signal-lost-player-id", id);
  }
  return id;
};

// Load player progress from Firestore
export const loadProgress = async () => {
  try {
    const id = getPlayerId();
    const ref = doc(db, "players", id);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      return {
        ...data,
        completedMissions: data.completedMissions || [],
        completedChallenges: data.completedChallenges || [],
        completedBugs: data.completedBugs || [],
        completedFinal: data.completedFinal || false,
      };
    }
    return { completedMissions: [], completedChallenges: [], completedBugs: [], completedFinal: false };
  } catch (e) {
    console.error("Error loading progress:", e);
    return null;
  }
};

// Save player progress to Firestore
export const saveProgress = async (data) => {
  try {
    const id = getPlayerId();
    const ref = doc(db, "players", id);
    await setDoc(ref, {
      ...data,
      completedMissions: data.completedMissions || [],
      completedChallenges: data.completedChallenges || [],
      completedBugs: data.completedBugs || [],
      completedFinal: data.completedFinal || false,
    }, { merge: true });
  } catch (e) {
    console.error("Error saving progress:", e);
  }
};

// Mark a mission as complete
export const completeMission = async (missionId) => {
  try {
    const id = getPlayerId();
    const ref = doc(db, "players", id);
    const snap = await getDoc(ref);
    const current = snap.exists() ? snap.data() : {};
    const completed = current.completedMissions || [];
    if (!completed.includes(missionId)) {
      completed.push(missionId);
      await setDoc(ref, { ...current, completedMissions: completed }, { merge: true });
    }
    return completed;
  } catch (e) {
    console.error("Error completing mission:", e);
    return [];
  }
};

export const resetProgress = async () => {
  try {
    const id = getPlayerId();
    const ref = doc(db, "players", id);
    await setDoc(ref, {
      completedMissions: [],
      completedChallenges: [],
      completedBugs: [],
    }, { merge: true });
  } catch (e) {
    console.error("Error resetting progress:", e);
  }
};