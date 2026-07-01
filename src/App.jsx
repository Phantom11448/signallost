import { useState, useEffect } from 'react'
import Cutscene from './components/Cutscene/Cutscene'
import HomeScreen from './components/UI/HomeScreen'
import MissionScreen from './components/Mission/MissionScreen'
import { MISSIONS_DATA } from './data/missions'
import { loadProgress, saveProgress } from './gameService'

export default function App() {
  const [screen, setScreen] = useState('cutscene')
  const [activeMissionId, setActiveMissionId] = useState(null)
  const [completedMissions, setCompletedMissions] = useState([])
  const [completedChallenges, setCompletedChallenges] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const load = async () => {
      const progress = await loadProgress()
      if (progress?.completedMissions) setCompletedMissions(progress.completedMissions)
      if (progress?.completedChallenges) setCompletedChallenges(progress.completedChallenges)
      setLoaded(true)
    }
    load()
  }, [])

  useEffect(() => {
    if (!loaded) return
    saveProgress({ completedMissions, completedChallenges })
  }, [completedMissions, completedChallenges, loaded])

  const handleChallengePass = (challengeId) => {
    if (!completedChallenges.includes(challengeId)) {
      setCompletedChallenges(prev => [...prev, challengeId])
    }
  }

  const handleMissionComplete = (missionId) => {
    if (!completedMissions.includes(missionId)) {
      setCompletedMissions(prev => [...prev, missionId])
    }
    setScreen('home')
    setActiveMissionId(null)
  }

  if (!loaded) {
    return (
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
  }

  if (screen === 'cutscene') {
    return <Cutscene onComplete={() => setScreen('home')} />
  }

  if (screen === 'mission' && activeMissionId) {
    const mission = MISSIONS_DATA.find(m => m.id === activeMissionId)
    if (!mission) {
      setScreen('home')
      setActiveMissionId(null)
      return null
    }
    return (
      <MissionScreen
        mission={mission}
        onBack={() => { setScreen('home'); setActiveMissionId(null); }}
        onComplete={() => handleMissionComplete(activeMissionId)}
        completedChallenges={completedChallenges}
        onChallengePass={handleChallengePass}
      />
    )
  }

  return (
    <HomeScreen
      completedMissions={completedMissions}
      onStartMission={(id) => {
        setActiveMissionId(id)
        setScreen('mission')
      }}
      onMissionComplete={handleMissionComplete}
    />
  )
}