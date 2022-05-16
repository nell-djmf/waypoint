import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { DeleteQuest, GetQuests } from '../services/QuestServices'
import Quest from '../components/Quest'
import { UpdateSkillbook } from '../services/SkillbookServices'
import { SkillContext } from '../components/SkillContext'
import { UserChangeContext } from '../components/UserChangeContext'
import { EligibleContext } from '../components/EligibleContext'
import { Button } from '@mui/material'
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';

const QuestLog = ({user, authenticated}) => {
	let navigate = useNavigate()

	//CONTEXTS
	const {skillbook} = useContext(SkillContext)
	const {setUserChange} = useContext(UserChangeContext)
	const {isEligible} = useContext(EligibleContext)
	//---------------------------------------*

	//STATES
	const [quests, setQuests] = useState()
	const [edit, setEdit] = useState(false)
	const [change, setChange] = useState(false)
	const [openQuestLog, isQuestLogOpen] = useState(false)
	const [targetQuest, setTargetQuest] = useState()
	const [questEntry, setQuestEntry] = useState({
    date: '',
    name: '',
    content: '',
		userId: localStorage.getItem('hero-id')
  })
	//---------------------------------------*

	//SERVICES
	const userQuestLog = async () => {
    const res = await GetQuests(localStorage.getItem('hero-id'))
    setQuests(res.Quests)
  }

	const questDelete = async (id) => {
		await DeleteQuest(id)
	}

	//Quest Complete & Skill Update
	const completeQuest = async (targetQuest) => {
		let hero = localStorage.getItem("hero-id")
		let skillName = targetQuest.skillAffinity
		let num = skillbook[skillName] + 1
		switch(targetQuest.type) {
			case 'primary':
				await UpdateSkillbook(hero, {
					[skillName]: num,
					xp: skillbook.xp + 50
				})
				break
			case 'secondary':
				await UpdateSkillbook(hero, {
					[skillName]: num,
					xp: skillbook.xp + 25
				})
				break
			case 'task':
				await UpdateSkillbook(hero, {
					[skillName]: num,
					xp: skillbook.xp + 10
				})
				break
			default: 
				console.log("something's not right...")
		}
		
		//Delete Quest on Complete
		await DeleteQuest(targetQuest.id)
		setChange(true)
		setUserChange(true)
		isEligible(true)
	}
	//---------------------------------------*

	
	//STATE CHANGE TRIGGER FROM CHILD
	const setParentChange = (trigger) => {
		setChange(trigger)
	}
	//---------------------------------------*

	//HIGHLIGHTER
	const questHighlight = document.getElementsByClassName("quest-item")

	const applyQuestHighlight = (index) => {
		questHighlight[index].classList.toggle("highlighter")
	}
	
	//---------------------------------------*

	//USE EFFECTS
	useEffect(() => {
    userQuestLog()
		setChange(false)
  }, [change])
	//---------------------------------------*

	return (user && authenticated && quests) ? (
		<div className='big-container'>
			<div className='medium-wrapper'>
				<h2>Quests</h2>
				<div className='button-wrapper'>
					<Button variant="contained" component="span" size='small' 
						onClick={()=> {
							setTargetQuest(null)
							setEdit(false)
							isQuestLogOpen(true)
						}}
						style={{
							borderRadius: "5px",
							backgroundColor: "#5fa7cd",
						}}
					>New Quest</Button>
					<Button variant="contained" component="span" size='small' 
						onClick={()=>
							completeQuest(targetQuest)}
						style={{
							borderRadius: "5px",
							backgroundColor: "#dbb4e29e",
							marginLeft: "10px",
						}}
					>Complete</Button>
				</div>
				{
					openQuestLog ? (
						<div className='new-entry-container'>
							<IconButton className='x-quest'
									onClick={()=>isQuestLogOpen(false)}>
								<ClearIcon className="mui-icon"></ClearIcon>
							</IconButton>
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
				<div className='cell-wrapper-col'>
					{quests && quests.map((quest, index) => (
						<div className='cell-grid-multi quest-item' key={quest.id} onClick={() => {
							setTargetQuest(quest)
							applyQuestHighlight(index)
						}}>
								<img className='cell-image icon-image' src={quest.icon} alt={quest.name} />
								<h3 className='cell-title'>{quest.name}</h3>
								<p className='cell-desc'>{quest.desc}</p>
								<div className='cell-1'>
									<h5>type: {quest.type}</h5>
									<h5>skill: {quest.skillAffinity}</h5>
								</div>
								<div className='cell-2'>
									<IconButton
										onClick={()=> {
											setEdit(true)
											setTargetQuest(quest)
											isQuestLogOpen(true)
											}}>
										<EditIcon className="mui-icon"></EditIcon>
									</IconButton>
									<IconButton
										onClick={()=> {
											questDelete(quest.id)
											setChange(true)}}>
										<ClearIcon className="mui-icon"></ClearIcon>
									</IconButton>
								</div>
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