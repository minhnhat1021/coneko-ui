import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Sidebar from './RoomSidebar'

import classNames from 'classnames/bind'
import styles from './RoomManagementLayout.module.scss'

const cx = classNames.bind(styles)

function RoomManagementLayout({ children, RoomManagementData }) {
    const [roomData, setRoomData] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:5000/api/admin/room`)
            .then(res => setRoomData(res.data.data))
            .catch(error => {
                console.error(error)
            })
    }, [])
    return ( 
        <div className={cx('wrapper')}>
            <Sidebar roomData={roomData}/>
            
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {children}    
                </div>
            </div>
        </div>
    )
}

export default RoomManagementLayout