import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { DeleteQuest, GetQuests } from '../services/QuestServices'
import Quest from '../components/Quest'
import { UpdateSkillbook } from '../services/SkillbookServices'

const QuestLog = ({user, authenticated, skillbook}) => {
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
  }

	const questDelete = async (id) => {
		await DeleteQuest(id)
	}

	const setParentChange = (trigger) => {
		setChange(trigger)
	}

	const questHighlight = document.getElementsByClassName("quest-item")

	const applyQuestHighlight = (index) => {
		questHighlight[index].classList.toggle("highlighter")
	}
	
	const removeQuestHighlight = () => {
		Array.from(questHighlight).forEach((item) => {
			if (item.classList.contains("highlighter")) {
				item.classList.remove("highlighter")
			}
		})
	}

	const [skillUp, setSkillUp] = useState({})

	// const parseSkills = (targetQuest) => {
	// 	Object.entries(skillbook).map((targetSkill) => {
	// 		if (targetQuest.skillAffinity === targetSkill[0]) {
	// 			setSkillUp(targetSkill)
	// 		}
	// 	})
	// 	console.log(skillUp)
	// 	updateSkill()
	// }

	const parseSkills = () => {
		// [targetQuest.skillAffinity, skillbook[targetQuest.skillAffinity]]
		// let skillName = targetQuest.skillAffinity
		// let num = skillbook[targetQuest.skillAffinity] + 1
		// setSkillUp({[skillName]: num})
		// console.log({[skillName]: num})
		console.log(skillbook.xp + 1)
	}
	

	const updateSkill = (targetQuest) => {
		// skillUp = [skillUp[0], skillUp[1] + 1]
		// Object.values(skillUp).map((val, idx) => {
		// 	console.log(val)
		// })
	}

	const completeQuest = async (targetQuest) => {
		let id = localStorage.getItem("hero-id")
		let skillName = targetQuest.skillAffinity
		let num = skillbook[targetQuest.skillAffinity] + 1
		switch(targetQuest.type) {
			case 'primary':
				await UpdateSkillbook(id, {
					[skillName]: num,
					xp: skillbook.xp + 50
				})
				break
			case 'secondary':
				await UpdateSkillbook(id, {
					[skillName]: num,
					xp: skillbook.xp + 25
				})
				break
			case 'task':
				await UpdateSkillbook(id, {
					[skillName]: num,
					xp: skillbook.xp + 10
				})
		}
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
					<button onClick={()=>{
						completeQuest(targetQuest)
						// parseSkills(targetQuest)
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