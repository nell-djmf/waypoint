import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { AddItemToInv, RemoveFromInventory } from '../services/ItemServices'

const Shop = ({user, authenticated, shop, inventory, setInvChange}) => {

	const [target, setTarget] = useState()
	const [cart, setCart] = useState([])
	const [invData, setInvData] = useState([])
	// const [trash, setTrash] = useState([])
	// const [trashData, setTrashData] = useState([])

	let navigate = useNavigate()

	// const prepareTrash = () => {
	// 	let exarr = []
	// 	trash.map((trashItem)=> {
	// 		exarr.push({userId: user.id, itemId: trashItem})
	// 	})
	// 	setTrashData(exarr)
	// 	removeItem()
	// }

	// const removeItem = async () => {
	// 	await RemoveFromInventory(trashData)
	// 	console.log(trashData)
	// 	setInvChange(true)
  // }

	const removeItem = async () => {
		let item = target
		let user = localStorage.getItem('hero-id')
		await RemoveFromInventory(user, item)
		setInvChange(true)
  }

	const prepareCart = () => {
		let exarr = []
		cart.map((newItem)=> {
			exarr.push({userId: user.id, itemId: newItem})
		})
		setInvData(exarr)
	}

	const buyItems = () => {
		console.log(invData)
		AddItemToInv(invData)
		setInvChange(true)
	}

	useEffect(() => {
    prepareCart()
  }, [cart])

	return (user && authenticated && shop) ? (
		<div className='shop-container'>
			<div className='inventory-wrapper'>
				<h2>inventory <button onClick={() => removeItem()}>x</button></h2>
				<div className='inventory-cell-wrapper'>
					{inventory && inventory.map((item) => (
						<div className='inv-cell' key={item.id} onClick={(e) => {
							setTarget(item.id)
							e.target.parentNode.classList.toggle("highlighter")
							console.log(target)
							// setTrash([...trash, item.id])
							}}>
							<img className='inv-item' src={item.icon} alt={item.name} />
						</div>
					))}
				</div>
			</div>
			<div className='inventory-wrapper'>
				<h2>shop <button onClick={() => {
					buyItems()
					setCart([])
					}}>+</button></h2>
				<div className='shop-cell-wrapper'>
					{shop && shop.map((item) => (
						<div className='inv-cell' key={item.id} onClick={(e) => {
							setTarget(item.id)
							e.target.parentNode.classList.toggle("highlighter")
							console.log(target)
							setCart([...cart, item.id])
							}}>
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

export default Shop