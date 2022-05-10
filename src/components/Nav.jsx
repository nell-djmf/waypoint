import { Link } from 'react-router-dom'

const Nav = ({ authenticated, user, handleLogOut }) => {
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav className='nav-bar'>
        <h3>Welcome {user.username}!</h3>
        <Link onClick={handleLogOut} to="/">Sign Out</Link>
        <Link to="/user_profile">User</Link>
        <Link to="/quest_log">Quests</Link>
        <Link to="/shop">Shop</Link>
				<Link to="/journal">Journal</Link>
				<Link to="/achievements">Achievements</Link>
        </nav>
    )
  }

  const publicOptions = (
    <nav className='nav-bar'>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </nav>
  )


  return (
    <header>
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
          <h3>TEST LOGO</h3>
        </div>
      </Link>
      {authenticated && user ? authenticatedOptions : publicOptions}
    </header>
  )
}

export default Nav
