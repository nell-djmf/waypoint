import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { AddItemToInv, RemoveFromInventory } from '../services/ItemServices'
import { InventoryChangeContext } from '../components/InventoryChangeContext'
import { InventoryContext } from '../components/InventoryContext'
import { GetInventory } from '../services/ItemServices'

const Shop = ({user, authenticated, shop}) => {

	//CONTEXTS
	const {invChange} = useContext(InventoryChangeContext)
	const {setInvChange} = useContext(InventoryChangeContext)
	const {inventory} = useContext(InventoryContext)
	const {setInventory} = useContext(InventoryContext)
	//---------------------------------------*

	//SERVICES
	const userInventory = async () => {
		const res = await GetInventory(localStorage.getItem('hero-id'))
    setInventory(res.inv_owner)
    setInvChange(false)
  }
	//---------------------------------------*

	//USE EFFECTS
	useEffect(() => {
		userInventory()
	}, [])

	useEffect(() => {
    userInventory()
  }, [invChange])
	//---------------------------------------*

	//HIGHLIGHT EFFECT
	const shopHighlight = document.getElementsByClassName("shop-item")
	const invHighlight = document.getElementsByClassName("inv-item")

	const applyShopHighlight = (index) => {
		shopHighlight[index].classList.toggle("highlighter")
	}

	const applyInvHighlight = (index) => {
		invHighlight[index].classList.toggle("highlighter")
	}

	const removeShopHighlight = () => {
		Array.from(shopHighlight).forEach((item) => {
			if (item.classList.contains("highlighter")) {
				item.classList.remove("highlighter")
			}
		})
	}
	
	const removeInvHighlight = () => {
		Array.from(invHighlight).forEach((item) => {
			if (item.classList.contains("highlighter")) {
				item.classList.remove("highlighter")
			}
		})
	}

	//---------------------------------------*

	//SHOP TRANSACTIONS
	let navigate = useNavigate()
	const [target, setTarget] = useState()
	const [cart, setCart] = useState([])
	const [invData, setInvData] = useState([])


	const removeItem = async () => {
		let item = target
		let user = localStorage.getItem('hero-id')
		await RemoveFromInventory(user, item)
		setInvChange(true)
  }

	const prepareCart = () => {
		let exarr = []
		cart.forEach((newItem)=> {
			exarr.push({userId: user.id, itemId: newItem})
		})
		setInvData(exarr)
	}

	const buyItems = () => {
		AddItemToInv(invData)
		setInvChange(true)
	}

	useEffect(() => {
    prepareCart()
  }, [cart])

	//---------------------------------------*

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
		<div className='big-container'>
			<div className='small-wrapper'>
				<h2>inventory <button onClick={() => {
					removeItem()
					removeInvHighlight()
					}}>x</button></h2>
				<div className='cell-wrapper-row'>
					{inventory && inventory.map((item, index) => (
						<div className='cell inv-item' key={item.id} onClick={() => {
							// setTrash([...trash, item.id])
							setTarget(item.id)
							applyInvHighlight(index)
							}}>
							<img className='cell-image' src={item.icon} alt={item.name} />
						</div>
					))}
				</div>
			</div>
			<div className='small-wrapper'>
				<h2>shop <button onClick={() => {
					buyItems()
					setCart([])
					removeShopHighlight()
					}}>+</button></h2>
				<div className='cell-wrapper-row'>
					{shop && shop.map((item, index) => (
						<div className='cell shop-item' key={item.id} onClick={() => {
							setTarget(item.id)
							setCart([...cart, item.id])
							applyShopHighlight(index)
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

export default Shop