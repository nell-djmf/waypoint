import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { CheckSession } from './services/auth'
import { CreateSkillbook } from './services/SkillbookServices'
import Nav from './components/Nav'
import Register from './pages/Register'
import Signin from './pages/Signin'
import UserProfile from './pages/UserProfile'
import QuestLog from './pages/QuestLog'
import Shop from './pages/Shop'
import Journal from './pages/Journal'
import Achievements from './pages/Achievements'
import Home from './pages/Home'
import './styles/App.css'
import { GetInventory, GetShop } from './services/ItemServices'
import { GetAchievements } from './services/MilestoneServices'



const App = () => {

  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [skillbook, setSkillbook] = useState()
  const [inventory, setInventory] = useState()
  const [invChange, setInvChange] = useState(false)
  const [shop, setShop] = useState()
  const [achieves, setAchieves] = useState()



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

  const userSkills = async () => {
		const res = await CreateSkillbook(localStorage.getItem('hero-id'))
		setSkillbook(res[0])
  }

  const userInventory = async () => {
		const res = await GetInventory(localStorage.getItem('hero-id'))
    setInventory(res.inv_owner)
    setInvChange(false)
  }

  const shopInventory = async () => {
		const res = await GetShop()
    setShop(res)
  }

  const userMilestones = async () => {
    const res = await GetAchievements(localStorage.getItem('hero-id'))
    setAchieves(res.milestone_collection)
  }


  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  useEffect(() => {
    userSkills()
    userInventory()
    shopInventory()
    userMilestones()
  }, [])

  useEffect(() => {
    userInventory()
  }, [invChange])


  

  return (
    <div className="App">
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
              skillbook={skillbook}
              inventory={inventory}
              setInvChange={setInvChange}
            />} />
          <Route path="/quest_log" element={
            <QuestLog 
              user={user}
              authenticated={authenticated}
              skillbook={skillbook}
            />} />
          <Route path="/shop" element={
            <Shop 
              user={user}
              authenticated={authenticated}
              shop={shop}
              inventory={inventory}
              setInvChange={setInvChange}
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
              achieves={achieves}
            />} />
            
        </Routes>
      </main>
    </div>
  )
}

export default App
