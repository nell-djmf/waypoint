import { useState, createContext } from 'react'

const MilestoneChangeContext = createContext()

const MilestoneChangeProvider = (props) => {
	const [milestoneChange, setMilestoneChange] = useState(false)

    return (
        <MilestoneChangeContext.Provider value={{milestoneChange, setMilestoneChange}}>
            {props.children}
        </MilestoneChangeContext.Provider>
    )
}

export { MilestoneChangeContext, MilestoneChangeProvider}
