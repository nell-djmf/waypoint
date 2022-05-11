import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetUser } from '../services/SkillbookServices'


const UserProfile = ({ user, authenticated }) => {

	let navigate = useNavigate()

	const userList = async () => {
    const data = await GetUser(localStorage.getItem('hero-id'))
    console.log(data)
  }

  //renders list on load
  useEffect(() => {
    userList()
  }, [])

	return (user && authenticated) ? (
		<div className='user-container'>
			<div className='skillbook-wrapper'>
				<h2>character sheet</h2>
				<div className='avatar-wrapper'>
					<img className='avatar' alt='avatar'/>
					<h4 className='username'>char name</h4>
					<h5 className='xp'>xp</h5>
					<h5 className='level'>level</h5>
				</div>
				<div className='skillbook'>
					<h3>skills</h3>
				</div>
			</div>
			<div className='inventory-wrapper'>
				<h2>inventory</h2>
			</div>
		</div>
	) : (
		<div className='protected'>
			<button onClick={()=> navigate('/signin')}>Go to Sign in</button>
		</div>
	)
}

export default UserProfile