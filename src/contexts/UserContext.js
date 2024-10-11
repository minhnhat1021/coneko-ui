import React, { createContext, useState } from 'react'
import * as userService from '~/apiServices/userService'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [userData, setUserData] = useState()

    const fetchUserData = async() => {
        const token = localStorage.getItem('token')

        if (token ) {
            const res = await userService.userDetail( token )
            setUserData(res)
        }
       
    }
    return (
        <UserContext.Provider value={{ userData , fetchUserData }}>
            {children}
        </UserContext.Provider>
    )
}