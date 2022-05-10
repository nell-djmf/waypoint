import { useNavigate } from 'react-router-dom'

const Achievements = ({user, authenticated}) => {
	let navigate = useNavigate()

	return (user && authenticated) ? (
		<div>
			<h1>This is the milestones page</h1>
		</div>
	) : (
		<div className='protected'>
			<button onClick={()=> navigate('/signin')}>Go to Sign in</button>
		</div>
	)
}

export default Achievements