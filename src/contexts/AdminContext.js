import React, { createContext, useState } from 'react'
import * as managementService from '~/apiServices/managementServive'

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [adminData, setAdminData] = useState()

    const fetchAdminData = async() => {
        const adminToken = localStorage.getItem('tokenAdmin')

        if (adminToken) {
            const res = await managementService.adminDetail( adminToken )
            setAdminData(res)
            setLoading(false)
        }
       
    }
    return (
        <AdminContext.Provider value={{loading, adminData , fetchAdminData }}>
            {children}
        </AdminContext.Provider>
    )
}