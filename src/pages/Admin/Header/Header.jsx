import { useState } from 'react'
import { Link } from 'react-router-dom'

import * as authService from '~/apiServices/authService'

import Button from '~/components/Button'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header({adminData}) {
    
    const [token, setToken] = useState(localStorage.getItem('tokenAdmin'))

    // Handle logout
    const handleLogout = async() => {

        const res = await authService.adminLogout(token)

        localStorage.removeItem('tokenAdmin')
        
        window.location.href = '/admin'
 
    }
    return ( 
        <header className={cx('header')}>
            <a href='/admin'><h1>Quản trị hệ thống</h1></a>
            <nav className={cx('nav__main')}>
                <Link to='/admin/user-list'>Danh sách khách hàng</Link>
                <Link to='/admin/statistics-room'>Quản lý phòng</Link>
                <Link to='/admin/booked-deposit'>Quản lý đặt phòng</Link>
            </nav>
            <nav className={cx('nav__task')}>
                <Link to='/admin/create-room' >Tạo phòng</Link>
                {adminData && <Button login onClick={handleLogout}>Đăng xuất</Button> }
            </nav>

        </header>
    )
}

export default Header