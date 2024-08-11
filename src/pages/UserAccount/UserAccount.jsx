import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

import { UserIcon, SecurityIcon } from '~/components/Icons'

import {Personal, Security} from './PersonalSecurity'

import classNames from 'classnames/bind'
import styles from './UserAccount.module.scss'

const cx = classNames.bind(styles)

function UserAccount({ userData }) {

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const menu =  query.get('menu') || 'personal'

    const getNavLinkClass = (nav, linkName) => {
        return cx('header__link', { active: query.get('menu') === linkName || (!query.get('menu') && linkName === 'personal') });
    }

    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>

                <NavLink className={(nav) => getNavLinkClass(nav, 'personal')} to="/user/account?menu=personal">
                    <span className={cx('header__link-icon')}>
                        <UserIcon/> 
                    </span>
                    <span className={cx('header__link-title')}>Thông tin cá nhân</span>
                </NavLink>

                <NavLink className={(nav) => getNavLinkClass(nav, 'security')} to="/user/account?menu=security">
                    <span className={cx('header__link-icon')}>
                        <SecurityIcon/>
                    </span>
                        <span className={cx('header__link-title')}>Mật khẩu và bảo mật</span>
                </NavLink>
            </header>
            
            {menu === 'personal' && <Personal userData={userData}/>}
            {menu === 'security' && <Security userData={userData}/>}
            
        </div>
        
    );
}

export default UserAccount;