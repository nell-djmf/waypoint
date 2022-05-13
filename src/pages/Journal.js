import { useNavigate } from 'react-router-dom'
import JournalEntry from '../components/JournalEntry.jsx'

const Journal = ({user, authenticated, journal}) => {
	let navigate = useNavigate()

	return (user && authenticated && journal) ? (
		<div className='big-container'>
			<div className='medium-wrapper'>
				<h2>Journal</h2>
				<div className='button-wrapper'>
					<button>New Entry</button>
					<button>Delete Entry</button>
				</div>
				<div className='cell-wrapper-col'>
					{journal && journal.map((entry) => (
						<div className='cell-grid' key={entry.id} onClick={() => {}}>
								<h3>{entry.date}</h3>
								<h3 className='cell-title'>{entry.title}</h3>
								<p className='cell-desc'>{entry.content}</p>
						</div>
					))}
				</div>
			<JournalEntry />
			</div>
		</div>
	) : (
		<div className='protected'>
			<button onClick={()=> navigate('/signin')}>Go to Sign in</button>
		</div>
	)
}

export default Journal