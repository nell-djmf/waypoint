import { useNavigate } from 'react-router-dom'

const Achievements = ({user, authenticated, achieves}) => {
	let navigate = useNavigate()

	return (user && authenticated && achieves) ? (
		<div className='big-container'>
			<div className='medium-wrapper'>
				<h2>Milestones</h2>
				<div className='cell-wrapper-col'>
					{achieves && achieves.map((milestone, index) => (
						<div className='cell-grid' key={milestone.id} onClick={() => {}}>
								<img className='cell-image icon-image' src={milestone.icon} alt={milestone.name} />
								<h3 className='cell-title'>{milestone.title}</h3>
								<p className='cell-desc'>{milestone.desc}</p>
						</div>
					))}
				</div>
			</div>
		</div>
	) : (
		<div className='protected'>
			<button onClick={()=> navigate('/signin')}>Go to Sign in</button>
		</div>
	)
}

export default Achievements