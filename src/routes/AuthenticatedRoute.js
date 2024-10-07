import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { UserContext } from '~/contexts/UserContext'

const AuthenticatedRoute = ({ children, path }) => {
    const token = localStorage.getItem('token')
    const { loading, userData, fetchUserData } = useContext(UserContext)

    
    useEffect(() => {
        if (token && path) {
            if (!userData) {
                fetchUserData(path)
            }
        }
    }, [token, path, fetchUserData, userData])

    if (token && loading) {
        return <div>Loading...</div> // Hiển thị loading trong khi chờ thông tin người dùng
    }
    
    if (!token) {
        return <Navigate to="/login" replace />
    }

    return children && React.cloneElement(children, { userData })
    
}

export default AuthenticatedRoute 

// Dùng để xác thực người dùng đã đăng nhập chưa , nếu rồi thì được vào những trang private, nếu không thì load ra UI login