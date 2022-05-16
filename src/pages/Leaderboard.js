import { useNavigate } from 'react-router-dom'
import { GetUsers } from '../services/SkillbookServices'
import { useState, useEffect } from 'react'

const Leaderboard = ({user, authenticated}) => {

	let navigate = useNavigate()

	//STATES
	const [rankings, setRankings] = useState()
	const [newRankings, setNewRankings] = useState()
	const [sorted, isSorted] = useState(false)
	const [sortBy, setSortBy] = useState('desc')
	//---------------------------------------*

	//SERVICES
	const getLeaderboard = async () => {
    const res = await GetUsers()
    setRankings(res)
  }

	//Sort by XP
	const handleSort = (e) => {
		setSortBy(e.target.value)
		isSorted(true)
		switch (sortBy) {
			case 'asc':
				setNewRankings(rankings.sort((a, b) => {
				return a.xp - b.xp
				}))
				break;
			case 'desc':
				setNewRankings(rankings.sort((a, b) => {
				return b.xp - a.xp
				}))
				break;
		}
	}
	//---------------------------------------*

	//USE EFFECTS
	useEffect(() => {
    getLeaderboard()
		return () => {
			isSorted(false)
		}
  }, [])
	//---------------------------------------*


	return (user && authenticated) ? (
		<div className='big-container'>
			<div className='medium-wrapper'>
				<h2>Leaderboard
					<div className="sort">
						<select onChange={handleSort} defaultValue='desc'>
							<option value="asc">ASC</option>
							<option value="desc">DESC</option>
						</select>
					</div>
				</h2>
				{
					sorted ? (
						<div className='cell-wrapper-col'>
						{newRankings && newRankings.map((rank) => (
							<div className='cell-grid-leader' key={rank.id} onClick={() => console.log(rank.User.username)}>
									<img className='cell-image icon-image' src={rank.User.avatar} alt={rank.User.username} />
									<h3 className='cell-title'>{rank.User.username}</h3>
									<div className='cell-desc stat-block'>
										<div className='block-1'>
											<h5>con: {rank.con}</h5>
											<h5>str: {rank.str}</h5>
											<h5>dex: {rank.dex}</h5>
										</div>
										<div className='block-2'>
											<h5>int: {rank.int}</h5>
											<h5>wis: {rank.wis}</h5>
											<h5>cha: {rank.cha}</h5>
										</div>
									</div>
									<h5 className='cell-1'>level: {rank.level}</h5>
									<h5 className='cell-2'>xp: {rank.xp}</h5>
							</div>
						))}
					</div>
					) : (
						<div className='cell-wrapper-col'>
						{rankings && rankings.map((rank) => (
							<div className='cell-grid-leader' key={rank.id} onClick={() => console.log(rank.User.username)}>
									<img className='cell-image icon-image' src={rank.User.avatar} alt={rank.User.username} />
									<h3 className='cell-title'>{rank.User.username}</h3>
									<div className='cell-desc stat-block'>
										<div className='block-1'>
											<h5>con: {rank.con}</h5>
											<h5>str: {rank.str}</h5>
											<h5>dex: {rank.dex}</h5>
										</div>
										<div className='block-2'>
											<h5>int: {rank.int}</h5>
											<h5>wis: {rank.wis}</h5>
											<h5>cha: {rank.cha}</h5>
										</div>
									</div>
									<h5 className='cell-1'>level: {rank.level}</h5>
									<h5 className='cell-2'>xp: {rank.xp}</h5>
							</div>
						))}
					</div>
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

export default Leaderboard