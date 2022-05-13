import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RemoveFromInventory } from '../services/ItemServices'



const UserProfile = ({ user, authenticated, skillbook, inventory, setInvChange }) => {

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

	//INVENTORY MANAGEMENT
	let navigate = useNavigate()
	const [target, setTarget] = useState()


	const removeItem = async () => {
		let item = target
		let user = localStorage.getItem('hero-id')
		await RemoveFromInventory(user, item)
		setInvChange(true)
  }
	//---------------------------------------*

	return (user && authenticated && inventory && skillbook) ? (
		<div className='big-container'>
			<div className='small-wrapper'>
				<h2>character sheet</h2>
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
				<h2>inventory <button onClick={() => {
					removeItem()
					removeInvHighlight()
					}}>x</button></h2>
					<div className='cell-wrapper-row'>
						{inventory && inventory.map((item, index) => (
							<div className='cell inv-item' key={item.id} onClick={() => {
								setTarget(item.id)
								applyInvHighlight(index)
								}}>
								<img className='cell-image' src={item.icon} alt={item.name} />
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