import { Link } from 'react-router-dom'

const Nav = ({ authenticated, user, handleLogOut }) => {
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav className='nav-bar'>
        <div className='nav-links-container'>
          <Link to="/">
            <div className="logo-wrapper" alt="logo">
              <div className='logo'>
                <img className='logo-icon' src='https://i.imgur.com/wgKkB0A.png' alt='logo'/>  
              </div>
            </div>
          </Link>
          <Link to="/user_profile">User</Link>
          <Link to="/quest_log">Quests</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/achievements">Milestones</Link>
          <Link to="/shop">Shop</Link>
        </div>
        <div className='player-info-container'>
          <h3>Welcome {user.username}!</h3>
          <Link onClick={handleLogOut} to="/">Sign Out</Link>
        </div>
      </nav>
    )
  }

  const publicOptions = (
    <nav className='nav-bar'>
      <div className='nav-links-container'>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/signin">Sign In</Link>
      </div>
    </nav>
  )


  return (
    <header>
      {authenticated && user ? authenticatedOptions : publicOptions}
    </header>
  )
}

export default Nav
