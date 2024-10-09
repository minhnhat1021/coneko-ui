import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from '~/contexts/UserContext'

const AuthenticatedRoute = ({ children, path }) => {
    const token = localStorage.getItem('token')
    const { loading, userData, fetchUserData } = useContext(UserContext)

    useEffect(() => {
        if (token && path) {
            if (!userData) {
                fetchUserData()
            } 
        }
    }, [token, path, fetchUserData, userData])

    if (token && loading) {
        return <div>Loading...</div> 
    }
    if (!token) {
        return <Navigate to="/login" replace />
    }

    
    return children && React.cloneElement(children, { userData })
    
}

export default AuthenticatedRoute 
