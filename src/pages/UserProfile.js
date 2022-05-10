import { useNavigate } from 'react-router-dom'

const UserProfile = ({ user, authenticated }) => {

	let navigate = useNavigate()

	return (user && authenticated) ? (
		<div>
			<h1>This is user profile</h1>
		</div>
	) : (
		<div className='protected'>
			<button onClick={()=> navigate('/signin')}>Go to Sign in</button>
		</div>
	)
}

export default UserProfile