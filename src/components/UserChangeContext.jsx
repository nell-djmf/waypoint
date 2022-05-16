import { useState, createContext } from 'react'

const UserChangeContext = createContext()

const UserChangeProvider = (props) => {
	const [userChange, setUserChange] = useState(false)

    return (
        <UserChangeContext.Provider value={{userChange, setUserChange}}>
            {props.children}
        </UserChangeContext.Provider>
    )
}

export { UserChangeContext, UserChangeProvider}
