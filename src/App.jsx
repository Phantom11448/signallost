import { useState, useEffect } from 'react'
import Cutscene from './components/Cutscene/Cutscene'
import HomeScreen from './components/UI/HomeScreen'
import MissionScreen from './components/Mission/MissionScreen'
import BugScreen from './components/Bug/BugScreen'
import CodexScreen from './components/UI/CodexScreen'
import { MISSIONS_DATA } from './data/missions'
import { BUGS_DATA } from './data/bugs'
import { finalMission } from './data/finalMission'
import FinalMissionScreen from './components/FinalMission/FinalMissionScreen'
import { loadProgress, saveProgress } from './gameService'

export default function App() {
  const [screen, setScreen] = useState('cutscene')
  const [activeMissionId, setActiveMissionId] = useState(null)
  const [activeBugId, setActiveBugId] = useState(null)
  const [completedMissions, setCompletedMissions] = useState([])
  const [completedChallenges, setCompletedChallenges] = useState([])
  const [completedBugs, setCompletedBugs] = useState([])
  const [completedFinal, setCompletedFinal] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [justCompleted, setJustCompleted] = useState(null)
  const [showCodex, setShowCodex] = useState(false)

  useEffect(() => {
    const load = async () => {
      const progress = await loadProgress()
      if (progress?.completedMissions) setCompletedMissions(progress.completedMissions)
      if (progress?.completedChallenges) setCompletedChallenges(progress.completedChallenges)
      if (progress?.completedBugs) setCompletedBugs(progress.completedBugs)
      if (typeof progress?.completedFinal === 'boolean') setCompletedFinal(progress.completedFinal)
      setLoaded(true)
    }
    load()
  }, [])

  useEffect(() => {
    if (!loaded) return
    saveProgress({ completedMissions, completedChallenges, completedBugs, completedFinal })
  }, [completedMissions, completedChallenges, completedBugs, completedFinal, loaded])

  const handleChallengePass = (challengeId) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges(prev => [...prev, challengeId])
    }
  }

  const handleMissionComplete = (missionId) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions(prev => [...prev, missionId])
    }
    setJustCompleted({ type: 'mission', id: missionId })
    setScreen('home')
    setActiveMissionId(null)
  }

  const handleBugComplete = (bugId) => {
    if (!completedBugs.includes(bugId)) {
      setCompletedBugs(prev => [...prev, bugId])
    }
    setJustCompleted({ type: 'bug', id: bugId })
    setScreen('home')
    setActiveBugId(null)
  }

  const handleResetModule = (type, id) => {
    if (type === 'mission') {
      const mission = MISSIONS_DATA.find(m => m.id === id)
      if (!mission) return
      const challengeIds = []
      mission.slides.forEach(slide => {
        if (slide.challenge) challengeIds.push(slide.challenge.id)
      })
      if (mission.bossChallenge) challengeIds.push(mission.bossChallenge.id)
      setCompletedMissions(prev => prev.filter(mId => mId !== id))
      setCompletedChallenges(prev => prev.filter(cId => !challengeIds.includes(cId)))
    } else if (type === 'bug') {
      const bug = BUGS_DATA.find(b => b.id === id)
      if (!bug) return
      setCompletedBugs(prev => prev.filter(bId => bId !== id))
      if (bug.challenge) {
        setCompletedChallenges(prev => prev.filter(cId => cId !== bug.challenge.id))
      }
    } else if (type === 'final') {
      setCompletedFinal(false)
      if (finalMission.challenge) {
        setCompletedChallenges(prev => prev.filter(cId => cId !== finalMission.challenge.id))
      }
    }
  }

  let content = null

  if (!loaded) {
    content = (
      <div style={{
        minHeight: "100vh",
        background: "#020b18",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#00f5c4",
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 13,
        letterSpacing: 4,
      }}>
        LOADING SHIP SYSTEMS...
      </div>
    )
  } else if (screen === 'cutscene') {
    content = <Cutscene onComplete={() => setScreen('home')} />
  } else if (screen === 'mission' && activeMissionId) {
    const mission = MISSIONS_DATA.find(m => m.id === activeMissionId)
    if (!mission) {
      setScreen('home')
      setActiveMissionId(null)
    } else {
      content = (
        <MissionScreen
          mission={mission}
          onBack={() => { setScreen('home'); setActiveMissionId(null); }}
          onComplete={() => handleMissionComplete(activeMissionId)}
          onNext={() => {
            handleMissionComplete(activeMissionId)
            const dueBug = BUGS_DATA.find(
              (bug) => bug.unlocksAfter === activeMissionId && !completedBugs.includes(bug.id)
            )
            if (dueBug) {
              setActiveBugId(dueBug.id)
              setActiveMissionId(null)
              setScreen('bug')
              return
            }
            const nextId = activeMissionId + 1
            const nextMission = MISSIONS_DATA.find(m => m.id === nextId)
            if (nextMission) {
              setActiveMissionId(nextId)
              setScreen('mission')
            }
          }}
          completedChallenges={completedChallenges}
          onChallengePass={handleChallengePass}
          onOpenCodex={() => setShowCodex(true)}
        />
      )
    }
  } else if (screen === 'bug' && activeBugId) {
    const bug = BUGS_DATA.find(b => b.id === activeBugId)
    if (!bug) {
      setScreen('home')
      setActiveBugId(null)
    } else {
      content = (
        <BugScreen
          bug={bug}
          onBack={() => { setScreen('home'); setActiveBugId(null); }}
          onComplete={() => handleBugComplete(activeBugId)}
          completedChallenges={completedChallenges}
          onChallengePass={handleChallengePass}
          onOpenCodex={() => setShowCodex(true)}
        />
      )
    }
  } else if (screen === 'final') {
    content = (
      <FinalMissionScreen
        mission={finalMission}
        onBack={() => setScreen('home')}
        onComplete={() => {
          setCompletedFinal(true)
          setScreen('home')
        }}
        completedChallenges={completedChallenges}
        onChallengePass={handleChallengePass}
        onOpenCodex={() => setShowCodex(true)}
      />
    )
  } else {
    content = (
      <HomeScreen
        completedMissions={completedMissions}
        completedBugs={completedBugs}
        completedFinal={completedFinal}
        justCompleted={justCompleted}
        onOpenCodex={() => setShowCodex(true)}
        onStartMission={(id) => {
          setJustCompleted(null)
          setActiveMissionId(id)
          setScreen('mission')
        }}
        onStartBug={(id) => {
          setJustCompleted(null)
          setActiveBugId(id)
          setScreen('bug')
        }}
        onStartFinal={() => { setJustCompleted(null); setScreen('final') }}
        onMissionComplete={handleMissionComplete}
        onResetModule={handleResetModule}
      />
    )
  }

  return (
    <>
      {content}
      {showCodex && (
        <div style={{
          position: "fixed",
          inset: 0,
          zIndex: 500,
          background: "#020b18",
          overflowY: "auto",
          maxWidth: 430,
          margin: "0 auto",
        }}>
          <div style={{ padding: "20px 16px 60px" }}>
            <button onClick={() => setShowCodex(false)} style={{
              background: "#041528", border: "1px solid #0a3555", color: "#4a7fa0",
              borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13, marginBottom: 16,
            }}>← Back to Lesson</button>
            <CodexScreen />
          </div>
        </div>
      )}
    </>
  )
}