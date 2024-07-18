import React from 'react';

import Sidebar from '~/layouts/Components/Sidebar';

import classNames from 'classnames/bind';
import styles from './UserLayout.module.scss'

const cx = classNames.bind(styles)

function UserLayout({ children, userData }) {
    return ( 
        <div className={cx('wrapper')}>
            <Sidebar />
            
            <div className={cx('container')}>
                <div className={cx('content')}>
                    {/* {!userData ? children :  React.cloneElement(children, { userData })} */}
                    {children}
                </div>
            </div>
        </div>
    );
}

export default UserLayout;