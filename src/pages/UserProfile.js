import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'



const UserProfile = ({ user, authenticated, skillbook, inventory }) => {

	const [select, isSelected] = useState(false)

	let navigate = useNavigate()


	return (user && authenticated && inventory && skillbook) ? (
		<div className='user-container'>
			<div className='skillbook-wrapper'>
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
			<div className='inventory-wrapper'>
				<h2>inventory <button>x</button></h2>
					<div className='inventory-cell-wrapper'>
						{inventory && inventory.map((item) => (
							<div className='inv-cell' key={item.id}>
								<img className='inv-item' src={item.icon} alt={item.name} />
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