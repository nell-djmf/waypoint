import { useState, createContext } from 'react'

const InventoryChangeContext = createContext()

const InventoryChangeProvider = (props) => {
	const [invChange, setInvChange] = useState(false)

    return (
        <InventoryChangeContext.Provider value={{invChange, setInvChange}}>
            {props.children}
        </InventoryChangeContext.Provider>
    )
}

export { InventoryChangeContext, InventoryChangeProvider}
