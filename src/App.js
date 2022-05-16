//REACT & STYLE IMPORTS
import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import './styles/App.css'
//---------------------------------------*

//COMPONENT IMPORTS
import Register from './pages/Register'
import Signin from './pages/Signin'
import UserProfile from './pages/UserProfile'
import QuestLog from './pages/QuestLog'
import Shop from './pages/Shop'
import Journal from './pages/Journal'
import Achievements from './pages/Achievements'
import Home from './pages/Home'
//---------------------------------------*

//SERVICE IMPORTS
import { CheckSession } from './services/auth'
//---------------------------------------*

//CONTEXT PROVIDERS
import { EligibleProvider } from './components/EligibleContext'
import { InventoryChangeProvider } from './components/InventoryChangeContext'
import { MilestoneChangeProvider } from './components/MilestoneChangeContext'
import { InventoryProvider } from './components/InventoryContext'
import { MilestoneProvider } from './components/MilestoneContext'
import { SkillProvider } from './components/SkillContext'
import { UserChangeProvider } from './components/UserChangeContext'
import Leaderboard from './pages/Leaderboard'
//---------------------------------------*

const App = () => {


  //STATES
  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  //---------------------------------------*

  //LOGIN & SHOP SERVICES
  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }
  //---------------------------------------*

  //USE EFFECTS
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])
  //---------------------------------------*

  return (
    <div className="App">
      <InventoryProvider>
      <MilestoneProvider>
      <SkillProvider>
      <InventoryChangeProvider>
      <MilestoneChangeProvider>
      <UserChangeProvider>
      <EligibleProvider>
      <Nav
        authenticated={authenticated}
        user={user}
        handleLogOut={handleLogOut}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={
            <Signin
              setUser={setUser}
              user={user}
              authenticated={authenticated}
              toggleAuthenticated={toggleAuthenticated} 
            />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user_profile" element={
            <UserProfile 
              user={user}
              authenticated={authenticated} 
            />} />
          <Route path="/quest_log" element={
            <QuestLog 
              user={user}
              authenticated={authenticated}
            />} />
          <Route path="/shop" element={
            <Shop 
              user={user}
              authenticated={authenticated}
            />} />
          <Route path="/journal" element={
            <Journal 
              user={user}
              authenticated={authenticated}
            />} />
          <Route path="/achievements" element={
            <Achievements 
              user={user}
              authenticated={authenticated}
            />} />
          <Route path="/leaderboard" element={
            <Leaderboard 
              user={user}
              authenticated={authenticated}
            />} />
        </Routes>
      </main>
      </EligibleProvider>
      </UserChangeProvider>
      </MilestoneChangeProvider>
      </InventoryChangeProvider>
      </SkillProvider>
      </MilestoneProvider>
      </InventoryProvider>
    </div>
  )
}

export default App
