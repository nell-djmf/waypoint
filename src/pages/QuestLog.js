import { useNavigate } from 'react-router-dom'

const QuestLog = ({user, authenticated}) => {
	let navigate = useNavigate()

	return (user && authenticated) ? (
		<div>
			<h1>This is quest log</h1>
		</div>
	) : (
		<div className='protected'>
			<button onClick={()=> navigate('/signin')}>Go to Sign in</button>
		</div>
	)
}

export default QuestLog