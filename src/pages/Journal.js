import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JournalEntry from '../components/JournalEntry.jsx'
import { DeleteEntry, GetEntries } from '../services/JournalServices.js'

const Journal = ({ user, authenticated }) => {
	let navigate = useNavigate()

	const [journal, setJournal] = useState()

	const userJournal = async () => {
    const res = await GetEntries(localStorage.getItem('hero-id'))
    setJournal(res.Entries)
    console.log(res.Entries)
  }

	const entryDelete = async (id) => {
		await DeleteEntry(id)
	}



	useEffect(() => {
    userJournal()
  }, [journal])


	return (user && authenticated && journal) ? (
		<div className='big-container'>
			<div className='medium-wrapper'>
				<h2>Journal</h2>
				<div className='button-wrapper'>
					<button>New Entry</button>
				</div>
				<div className='cell-wrapper-col'>
					{journal && journal.map((entry) => (
						<div className='cell-grid-multi' key={entry.id} onClick={() => {}}>
								<h3>{entry.date}</h3>
								<h3 className='cell-title'>{entry.title}</h3>
								<p className='cell-desc'>{entry.content}</p>
								<button className='cell-1 j-del' onClick={()=> entryDelete(entry.id)}>x</button>
								<button className='cell-2 j-edit'>Edit</button>
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