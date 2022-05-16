import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import JournalEntry from '../components/JournalEntry.jsx'
import { DeleteEntry, GetEntries } from '../services/JournalServices.js'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';


const Journal = ({ user, authenticated }) => {
	let navigate = useNavigate()

	//STATES
	const [journal, setJournal] = useState()
	const [edit, setEdit] = useState(false)
	const [change, setChange] = useState(false)
	const [openJournal, isJournalOpen] = useState(false)
	const [targetEntry, setTargetEntry] = useState()
	const [journalEntry, setjournalEntry] = useState({
    date: '',
    title: '',
    content: '',
		userId: localStorage.getItem('hero-id')
  })
	//---------------------------------------*

	//SERVICES
	const userJournal = async () => {
    const res = await GetEntries(localStorage.getItem('hero-id'))
    setJournal(res.Entries)
    console.log(res.Entries)
  }

	const entryDelete = async (id) => {
		await DeleteEntry(id)
	}
	//---------------------------------------*

	//STATE CHANGE TRIGGER FROM CHILD
	const setParentChange = (trigger) => {
		setChange(trigger)
	}

	//USE EFFECTS
	useEffect(() => {
    userJournal()
		setChange(false)
  }, [change])
	//---------------------------------------*

	return (user && authenticated && journal) ? (
		<div className='big-container'>
			<div className='medium-wrapper'>
				<h2>Journal</h2>
				<div className='button-wrapper'>
					<Button variant="contained" component="span" size='small' 
						onClick={()=> {
							setTargetEntry(null)
							setEdit(false)
							isJournalOpen(true)
						}}
						style={{
							borderRadius: "5px",
							backgroundColor: "#5fa7cd",
						}}
						endIcon={<EditIcon />}
					>New Entry</Button>
				</div>
				{
					openJournal ? (
						<div className='new-entry-container'>
						<IconButton className='x-quest'
									onClick={()=>isJournalOpen(false)}>
								<ClearIcon className="mui-icon"></ClearIcon>
							</IconButton>
						<JournalEntry 
							edit={edit}
							setEdit={setEdit}
							journalEntry={journalEntry}
							setjournalEntry={setjournalEntry}
							targetEntry={targetEntry}
							setParentChange={setParentChange}
						/>
						</div>
					) : (
						<div></div>
					)
				}
				<div className='cell-wrapper-col'>
					{journal && journal.map((entry) => (
						<div className='cell-grid-multi' key={entry.id} onClick={() => {}}>
								<h3>{entry.date}</h3>
								<h3 className='cell-title'>{entry.title}</h3>
								<p className='cell-desc'>{entry.content}</p>
								<IconButton
									className='cell-2 j-edit'
									onClick={()=> {
										setEdit(true)
										setTargetEntry(entry)
										isJournalOpen(true)
										}}>
									<EditIcon className="mui-icon"></EditIcon>
								</IconButton>
								<IconButton
									className='cell-1 j-del'
									onClick={()=> {
										entryDelete(entry.id)
										setChange(true)
										}}>
									<ClearIcon className="mui-icon"></ClearIcon>
								</IconButton>
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

export default Journal