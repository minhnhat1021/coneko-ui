import React, { useEffect, useState } from 'react'
import * as managementService from '~/apiServices/managementServive'

import Sidebar from './RoomSidebar'
import classNames from 'classnames/bind'
import styles from './RoomManagementLayout.module.scss'

const cx = classNames.bind(styles)

function RoomManagementLayout({ children, RoomManagementData }) {
    const [roomData, setRoomData] = useState({})
    useEffect(() => {
        const fetchApi = async() => {
            const res = await managementService.room()
            setRoomData(res)
        }   
        fetchApi()
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