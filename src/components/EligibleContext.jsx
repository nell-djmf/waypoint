import { useState, createContext } from 'react'

const EligibleContext = createContext()

const EligibleProvider = (props) => {
	const [eligible, isEligible] = useState(false)

    return (
        <EligibleContext.Provider value={{eligible, isEligible}}>
            {props.children}
        </EligibleContext.Provider>
    )
}

export { EligibleContext, EligibleProvider}
