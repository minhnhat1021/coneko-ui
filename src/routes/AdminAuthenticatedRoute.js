import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

import { AdminContext } from '~/contexts/AdminContext'

const AdminAuthenticatedRoute = ({ children, path }) => {
    const adminToken = localStorage.getItem('tokenAdmin')
    const { loading, adminData, fetchAdminData } = useContext(AdminContext)

    useEffect(() => {
        if (adminToken && path) {
            if (!adminData) {
                fetchAdminData()
            } 
        }
    }, [adminToken, path, fetchAdminData, adminData])

    if (adminToken && loading) {
        return <div>Loading...</div> 
    }
    if (!adminToken) {
        return <Navigate to="/admin/login" replace />
    }

    return children && React.cloneElement(children, { adminData })
    
}

export default AdminAuthenticatedRoute 
