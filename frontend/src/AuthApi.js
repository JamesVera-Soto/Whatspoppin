import axios from 'axios'
import React, {useContext, useEffect, useState} from 'react'

const AuthApiContext = React.createContext()
const AuthApiUpdateContext = React.createContext()



export function useAuthApi() {
    return useContext(AuthApiContext)
}

export function useAuthApiUpdate() {
    return useContext(AuthApiUpdateContext)
}

export function useRouteAddress() {
    const routes = ["", "http://localhost:3001"]
    const routeAddress = routes[1]
    return routeAddress
}

export function AuthApiProvider({children}) {

    const [auth, setAuth] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [toggleUpdate, setToggleUpdate] = useState(false)

    const routeAddress = useRouteAddress()

    const values = {auth, currentUser}

    axios.defaults.withCredentials = true

    useEffect(() => {
        axios.get(routeAddress + "/api/login").then(response => {
            setAuth(response.data.loggedIn)
            if(response.data.loggedIn) setCurrentUser(response.data.user)
        })
    }, [toggleUpdate, routeAddress])

    function updateUser() {
        setToggleUpdate(!toggleUpdate)    
    }

    return (
        <AuthApiContext.Provider value={values}>
            <AuthApiUpdateContext.Provider value={updateUser} >
                {children}
            </AuthApiUpdateContext.Provider>
        </AuthApiContext.Provider>
    )
}