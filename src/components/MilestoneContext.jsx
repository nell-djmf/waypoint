import { useState, createContext } from 'react'

const MilestoneContext = createContext()

const MilestoneProvider = (props) => {
	const [achieves, setAchieves] = useState()

    return (
        <MilestoneContext.Provider value={{achieves, setAchieves}}>
            {props.children}
        </MilestoneContext.Provider>
    )
}

export { MilestoneContext, MilestoneProvider}
