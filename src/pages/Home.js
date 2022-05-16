import { useNavigate } from 'react-router-dom'


const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home-container">

      <section className="welcome-signin">
        <div className='logo'>
          <h1 className='logo-title fade'>
            <img className='logo-icon' src='https://i.imgur.com/wgKkB0A.png' alt='logo' onClick={() => navigate('/signin')}/>
          WAYPOINT</h1>

          <div className='logo-desc'>
            <p>"Whether small or great, and no matter what the stage or grade of life, the call rings up the curtain, always, on a mystery of transfiguration. The familiar life horizon has been outgrown. The old concepts, ideals, and emotional patterns no longer fit. The time for a passing of a threshold is at hand." 
            <br />
            <br />
            <span>-Joseph Campbell, <em>The Hero With a Thousand Faces</em></span></p>
            <p>Waypoint is an app that chronicles your own Hero's Journey. Set goals for yourself, push your limits, and get that dopamine rush that can only come from mastering your skills and vanquishing a deadly foe (even if they're only your inner demons).</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home