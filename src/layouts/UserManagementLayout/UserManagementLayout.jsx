import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from './UserSidebar'

import classNames from 'classnames/bind'
import styles from './UserManagementLayout.module.scss'

const cx = classNames.bind(styles)

function RoomManagementLayout({ children, RoomManagementData }) {
    const [userData, setUserData] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:5000/api/admin/user`)
            .then(res => setUserData(res.data.data))
            .catch(error => {
                console.error(error)
            })
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

export default RoomManagementLayout