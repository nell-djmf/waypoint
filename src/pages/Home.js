import { useNavigate } from 'react-router-dom'


const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home-container">

      <section className="welcome-signin">
        <div className='logo'>
          <img className='logo-icon' src='https://i.imgur.com/wgKkB0A.png' alt='logo' onClick={() => navigate('/signin')}/>
          <h2>Welcome to Waypoint</h2>

          <div className='logo-desc'>
            <p>In narratology and comparative mythology, the hero's journey, or the monomyth, is the common template of stories that involve a hero who goes on an adventure, is victorious in a decisive crisis, and comes home changed or transformed. Waypoint is an app that chronicles your own Hero's Journey.
            <br />  
            Set goals for yourself, push your limits, and get that dopamine rush that can only come from mastering your skills and vanquishing a deadly foe (even if they're only your inner demons).</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home