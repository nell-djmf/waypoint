import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { DeleteQuest, GetQuests } from '../services/QuestServices'
import Quest from '../components/Quest'

const QuestLog = ({user, authenticated}) => {
	let navigate = useNavigate()

	const [quests, setQuests] = useState()
	const [edit, setEdit] = useState(false)
	const [change, setChange] = useState(false)
	const [openQuestLog, isQuestLogOpen] = useState(false)
	const [targetQuest, setTargetQuest] = useState()
	const [questEntry, setQuestEntry] = useState({
    date: '',
    title: '',
    content: '',
		userId: localStorage.getItem('hero-id')
  })

	const userQuestLog = async () => {
    const res = await GetQuests(localStorage.getItem('hero-id'))
    setQuests(res.Quests)
    console.log(res.Quests)
  }

	const questDelete = async (id) => {
		await DeleteQuest(id)
	}

	const setParentChange = (trigger) => {
		setChange(trigger)
	}

	useEffect(() => {
    userQuestLog()
		setChange(false)
  }, [change])

	return (user && authenticated && quests) ? (
		<div className='big-container'>
			<div className='medium-wrapper'>
				<h2>Quests</h2>
				<div className='button-wrapper'>
					<button onClick={()=> {
						setTargetQuest(null)
						setEdit(false)
						isQuestLogOpen(true)
					}}>New Quest</button>
				</div>
				<div className='cell-wrapper-col'>
					{quests && quests.map((quest) => (
						<div className='cell-grid-multi' key={quest.id} onClick={() => {}}>
								<img className='cell-image icon-image' src={quest.icon} alt={quest.name} />
								<h3 className='cell-title'>{quest.name}</h3>
								<p className='cell-desc'>{quest.desc}</p>
								<h5 className='cell-1'>type: {quest.type}</h5>
								<h5 className='cell-2'>skill: {quest.skillAffinity}</h5>
								<button className='cell-1 j-del' onClick={()=> {
									questDelete(quest.id)
									setChange(true)
									}}>x</button>
								<button className='cell-2 j-edit' onClick={()=> {
									setEdit(true)
									setTargetQuest(quest)
									isQuestLogOpen(true)
									}}>Edit</button>
						</div>
					))}
				</div>
				{
					openQuestLog ? (
						<div className='new-entry-container'>
						<button onClick={()=>isQuestLogOpen(false)}>x</button>
						<Quest 
							edit={edit}
							setEdit={setEdit}
							questEntry={questEntry}
							setQuestEntry={setQuestEntry}
							targetQuest={targetQuest}
							setParentChange={setParentChange}
						/>
						</div>
					) : (
						<div></div>
					)
				}
			</div>
		</div>
	) : (
		<div className='protected'>
			<button onClick={()=> navigate('/signin')}>Go to Sign in</button>
		</div>
	)
}

export default QuestLog