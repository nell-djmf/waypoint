import { useState, createContext } from 'react'

const InventoryContext = createContext()

const InventoryProvider = (props) => {
	const [inventory, setInventory] = useState()

    return (
        <InventoryContext.Provider value={{inventory, setInventory}}>
            {props.children}
        </InventoryContext.Provider>
    )
}

export { InventoryContext, InventoryProvider}
