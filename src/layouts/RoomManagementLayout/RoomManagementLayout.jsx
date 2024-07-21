import React from 'react';

import Sidebar from './RoomSidebar';

import classNames from 'classnames/bind';
import styles from './RoomManagementLayout.module.scss'

const cx = classNames.bind(styles)

function UserLayout({ children, userData }) {
    return ( 
        <div className={cx('wrapper')}>
            <Sidebar />
            
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {children}    
                </div>
            </div>
        </div>
    );
}

export default UserLayout;