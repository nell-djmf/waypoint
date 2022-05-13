import { useNavigate } from 'react-router-dom'

const QuestLog = ({user, authenticated, quests}) => {
	let navigate = useNavigate()

	return (user && authenticated && quests) ? (
		<div className='big-container'>
			<div className='medium-wrapper'>
				<h2>Quests</h2>
				<div className='cell-wrapper-col'>
					{quests && quests.map((quest) => (
						<div className='cell-grid' key={quest.id} onClick={() => {}}>
								<img className='cell-image icon-image' src={quest.icon} alt={quest.name} />
								<h3 className='cell-title'>{quest.name}</h3>
								<p className='cell-desc'>{quest.desc}</p>
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

export default QuestLog