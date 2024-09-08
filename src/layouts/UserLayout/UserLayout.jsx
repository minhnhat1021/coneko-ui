import React from 'react'

import Sidebar from '~/layouts/Components/Sidebar'

import classNames from 'classnames/bind'
import styles from './UserLayout.module.scss'

const cx = classNames.bind(styles)

function UserLayout({ children, userData }) {

    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <Sidebar />
                
                <div className={cx('content')}>
                    {!userData ? children :  React.cloneElement(children, { userData })}
                </div>
            </div>
        </div>
    )
}

export default UserLayout