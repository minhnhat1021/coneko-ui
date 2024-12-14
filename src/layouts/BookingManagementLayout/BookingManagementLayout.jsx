import React, { useEffect, useState } from 'react'
import * as managementService from '~/apiServices/managementServive'

import Sidebar from './BookingManagementSidebar'

import classNames from 'classnames/bind'
import styles from './BookingManagementLayout.module.scss'

const cx = classNames.bind(styles)

function BookingManagementLayout({ children }) {
    const [userData, setUserData] = useState({})
    useEffect(() => {

        const fetchApi = async() => {
            const res = await managementService.user()
            setUserData(res)
        }   
        fetchApi()
    }, [])
    return ( 
        <div className={cx('wrapper')}>
            <Sidebar userData={userData}/>
            
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {children}    
                </div>
            </div>
        </div>
    )
}

export default BookingManagementLayout