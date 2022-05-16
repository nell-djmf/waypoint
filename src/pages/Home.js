import { useNavigate } from 'react-router-dom'


const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home-container">

      <section className="welcome-signin">
        <div className='logo'>
          <img className='logo-icon' src='https://i.imgur.com/wgKkB0A.png' alt='logo' onClick={() => navigate('/signin')}/>
          <h2>Welcome to Waypoint</h2> 
        </div>
      </section>
    </div>
  )
}

export default Home