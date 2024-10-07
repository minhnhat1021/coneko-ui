import React, { createContext, useState } from 'react'
import * as authService from '~/apiServices/authService'
export const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState()

    const fetchUserData = async(path) => {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        
        if (token && userId) {
            const res = await authService.globalCheck({path, token, userId})
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