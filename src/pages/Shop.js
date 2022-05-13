import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { AddItemToInv, RemoveFromInventory } from '../services/ItemServices'

const Shop = ({user, authenticated, shop, inventory, setInvChange}) => {

	const invHighlight = useRef([])
	const shopHighlight = useRef([])


	const selectInvHighlight = (index) => {
		invHighlight.current[index].classList.toggle("highlighter")
		console.log(invHighlight)
		console.log(index)
	}

	const selectShopHighlight = (index) => {
		shopHighlight.current[index].classList.toggle("highlighter")
		console.log(shopHighlight)
		console.log(index)
	}

	const removeInvHighlight = () => {
		invHighlight.current.map((item) => {
			item.classList.remove("highlighter")
		})
	}

	const removeShopHighlight = () => {
		shopHighlight.current.map((item) => {
			item.classList.remove("highlighter")
		})
	}

	const [target, setTarget] = useState()
	const [cart, setCart] = useState([])
	const [invData, setInvData] = useState([])

	let navigate = useNavigate()

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


	//BULK DELETE TESTING
	// const [trash, setTrash] = useState([])
	// const [trashData, setTrashData] = useState([])

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


	return (user && authenticated && shop) ? (
		<div className='shop-container'>
			<div className='inventory-wrapper'>
				<h2>inventory <button onClick={() => {
					removeItem()
					removeInvHighlight()
					}}>x</button></h2>
				<div className='inventory-cell-wrapper'>
					{inventory && inventory.map((item, index) => (
						<div className='inv-cell' key={item.id} ref={(element) => invHighlight.current.push(element)} onClick={() => {
							// setTrash([...trash, item.id])
							setTarget(item.id)
							selectInvHighlight(index)
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
					removeShopHighlight()
					}}>+</button></h2>
				<div className='shop-cell-wrapper'>
					{shop && shop.map((item, index) => (
						<div className='inv-cell' key={item.id} ref={(element) => shopHighlight.current.push(element)} onClick={(e) => {
							setTarget(item.id)
							console.log(target)
							setCart([...cart, item.id])
							selectShopHighlight(index)
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