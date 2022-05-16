import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { RemoveFromInventory } from '../services/ItemServices'
import { AddMilestone } from '../services/MilestoneServices'
import { UpdateSkillbook, CreateSkillbook } from '../services/SkillbookServices'
import { GetInventory } from '../services/ItemServices'
import { GetAchievements } from '../services/MilestoneServices'
import { EligibleContext } from '../components/EligibleContext'
import { InventoryChangeContext } from '../components/InventoryChangeContext'
import { MilestoneChangeContext } from '../components/MilestoneChangeContext'
import { InventoryContext } from '../components/InventoryContext'
import { MilestoneContext } from '../components/MilestoneContext'
import { SkillContext } from '../components/SkillContext'
import { UserChangeContext } from '../components/UserChangeContext'
import { Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material'



const UserProfile = ({ user, authenticated }) => {
	let navigate = useNavigate()

	//CONTEXTS
	const {skillbook} = useContext(SkillContext)
  const {setSkillbook} = useContext(SkillContext)

	const {inventory} = useContext(InventoryContext)
  const {setInventory} = useContext(InventoryContext)

  const {setAchieves} = useContext(MilestoneContext)

	const {invChange} = useContext(InventoryChangeContext)
  const {setInvChange} = useContext(InventoryChangeContext)

	const {milestoneChange} = useContext(MilestoneChangeContext)
  const {setMilestoneChange} = useContext(MilestoneChangeContext)

	const {userChange} = useContext(UserChangeContext)
  const {setUserChange} = useContext(UserChangeContext)

	const {eligible} = useContext(EligibleContext)
  const {isEligible} = useContext(EligibleContext)
	//---------------------------------------*

	//STATE
	const [target, setTarget] = useState()
	//---------------------------------------*

	//SERVICES
	const userSkills = async () => {
		const res = await CreateSkillbook(localStorage.getItem('hero-id'))
		setSkillbook(res[0])
  }

  const userInventory = async () => {
		const res = await GetInventory(localStorage.getItem('hero-id'))
    setInventory(res.inv_owner)
    setInvChange(false)
  }

	const userMilestones = async () => {
    const res = await GetAchievements(localStorage.getItem('hero-id'))
    setAchieves(res.milestone_collection)
  }

	//Inventory Management
	const removeItem = async () => {
		let item = target
		let user = localStorage.getItem('hero-id')
		await RemoveFromInventory(user, item)
		setInvChange(true)
  }

	//Level Up Eligibility
	const checkForLevelUp = async () => {
		let user = localStorage.getItem('hero-id')

		//Milestone Check
		if (eligible) {
			if (skillbook.level === 2) {
				await AddMilestone({
					userId: user,
					milestoneId: 1
				})
				setMilestoneChange(true)
				alert(`You've reached a new milestone!`)
			}
	
			if (skillbook.level > 10) {
				await AddMilestone({
					userId: user,
					milestoneId: 2
				})
				setMilestoneChange(true)
				alert(`You've reached a new milestone!`)
			}
	
			if (skillbook.level > 25) {
				await AddMilestone({
					userId: user,
					milestoneId: 3
				})
				setMilestoneChange(true)
				alert(`You've reached a new milestone!`)
			}
	
			if (skillbook.level > 50) {
				await AddMilestone({
					userId: user,
					milestoneId: 4
				})
				setMilestoneChange(true)
				alert(`You've reached a new milestone!`)
			}
			
			//XP Check
			if (skillbook.xp % 10 === 0) {
				await UpdateSkillbook(user, {
					level: skillbook.level + 1
				})
				alert(`You've reached a new level!`)
			} 
		} else {
			alert('you are not eligible for a level yet!')
		}
		isEligible(false)
		setUserChange(true)
	}
	//---------------------------------------*

	//USE EFFECTS
	useEffect(() => {
      userSkills()
      userInventory()
      userMilestones()
  }, [])

	useEffect(() => {
    userInventory()
  }, [invChange])

  useEffect(() => {
    userSkills()
    setUserChange(false)
  }, [userChange])

  useEffect(() => {
    userMilestones()
    setMilestoneChange(false)
  }, [milestoneChange])
	//---------------------------------------*

	//HIGHLIGHT EFFECT
	const invHighlight = document.getElementsByClassName("inv-item")

	const applyInvHighlight = (index) => {
		invHighlight[index].classList.toggle("highlighter")
	}
	
	const removeInvHighlight = () => {
		Array.from(invHighlight).forEach((item) => {
			if (item.classList.contains("highlighter")) {
				item.classList.remove("highlighter")
			}
		})
	}
	//---------------------------------------*

	return (user && authenticated && skillbook) ? (
		<div className='big-container'>
			<div className='small-wrapper'>
				<h2>character sheet
					<Button variant="contained" component="span" size='small' 
					onClick={()=> checkForLevelUp()}
					style={{
						borderRadius: "5px",
						backgroundColor: "#5fa7cd",
						marginLeft: "10px",
					}}
					>
						Level Up
					</Button>
				</h2>
				<div className='avatar-wrapper'>
					<img className='avatar' src={user.avatar} alt='avatar'/>
					<h4 className='username'>char name: {user.username}</h4>
					<h5 className='xp'>xp: {skillbook.xp}</h5>
					<h5 className='level'>level: {skillbook.level}</h5>
				</div>
				<div className='skillbook'>
					<h3>skills</h3>
					<h5>con: {skillbook.con}</h5>
					<h5>str: {skillbook.str}</h5>
					<h5>dex: {skillbook.dex}</h5>
					<h5>int: {skillbook.int}</h5>
					<h5>wis: {skillbook.wis}</h5>
					<h5>cha: {skillbook.cha}</h5>
				</div>
			</div>
			<div className='small-wrapper'>
				<h2>inventory 
					<IconButton onClick={() => {
						removeItem()
						removeInvHighlight()
						}}>
						<DeleteIcon className='mui-icon'></DeleteIcon>
					</IconButton>
				</h2>
					<div className='cell-wrapper-row'>
						{inventory && inventory.map((item, index) => (
							<div className='cell inv-item' key={item.id} onClick={() => {
								setTarget(item.id)
								applyInvHighlight(index)
								}}>
								<Tooltip title={
								<>
								<Typography color="inherit">{item.name}</Typography>
								{item.desc}
								</>
							}>
								<img className='cell-image' src={item.icon} alt={item.name} />
							</Tooltip>
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

export default UserProfile