import React, { createContext, useState } from 'react'
import * as userService from '~/apiServices/userService'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState()

    const fetchUserData = async() => {
        const token = localStorage.getItem('token')

        if (token ) {
            const res = await userService.userDetail( token )
            setUserData(res)
            setLoading(false)
        }
       
    }
    return (
        <UserContext.Provider value={{loading, userData , fetchUserData }}>
            {children}
        </UserContext.Provider>
    )
}