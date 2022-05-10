import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import { CheckSession } from './services/auth'
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



const App = () => {

  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)



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

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])


  

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
            
        </Routes>
      </main>
    </div>
  )
}

export default App
