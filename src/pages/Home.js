import { useNavigate } from 'react-router-dom'


const Home = () => {
  let navigate = useNavigate()

  return (
    <div className="home-container">

      <section className="welcome-signin">
        <button className="button button-1"  onClick={() => navigate('/signin')}>
          Get Started
        </button>
      </section>
    </div>
  )
}

export default Home