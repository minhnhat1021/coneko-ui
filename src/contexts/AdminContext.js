import React, { createContext, useState } from 'react'
import * as managementService from '~/apiServices/managementServive'

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {

    const [adminData, setAdminData] = useState()

    const fetchAdminData = async() => {
        const adminToken = localStorage.getItem('tokenAdmin')

        if (adminToken) {
            const res = await managementService.adminDetail( adminToken )
            setAdminData(res)
        }
    }
    return (
        <AdminContext.Provider value={{ adminData , fetchAdminData }}>
            {children}
        </AdminContext.Provider>
    )
}