import { useState, createContext } from 'react'

const SkillContext = createContext()

const SkillProvider = (props) => {
	const [skillbook, setSkillbook] = useState()

    return (
        <SkillContext.Provider value={{skillbook, setSkillbook}}>
            {props.children}
        </SkillContext.Provider>
    )
}

export { SkillContext, SkillProvider}
