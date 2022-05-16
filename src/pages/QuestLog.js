import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { DeleteQuest, GetQuests } from '../services/QuestServices'
import Quest from '../components/Quest'
import { UpdateSkillbook } from '../services/SkillbookServices'
import { SkillContext } from '../components/SkillContext'
import { UserChangeContext } from '../components/UserChangeContext'
import { EligibleContext } from '../components/EligibleContext'

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
					<button onClick={()=> {
						setTargetQuest(null)
						setEdit(false)
						isQuestLogOpen(true)
					}}>New Quest</button>
					<button onClick={()=>{
						completeQuest(targetQuest)
					}}>Complete</button>
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
									<button className='j-edit' onClick={()=> {
										setEdit(true)
										setTargetQuest(quest)
										isQuestLogOpen(true)
										}}>Edit</button>
									<button className='j-del' onClick={()=> {
										questDelete(quest.id)
										setChange(true)
										}}>x</button>
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