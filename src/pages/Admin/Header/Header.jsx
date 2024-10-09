import { useState } from 'react'
import { Link } from 'react-router-dom'

import * as authService from '~/apiServices/authService'

import Button from '~/components/Button'
import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
    const [token, setToken] = useState(localStorage.getItem('tokenAdmin'))

    // Handle logout
    const handleLogout = async() => {
        const id = localStorage.getItem('adminId')
        const res = await authService.adminLogout(id)

        localStorage.removeItem('tokenAdmin')

        setToken(localStorage.getItem('tokenAdmin'))
        localStorage.removeItem('adminId')
        window.location.href = '/admin'
 
    }
    return ( 
        <header className={cx('header')}>
            <a href='/admin'><h1>Quản trị hệ thống</h1></a>
            <nav className={cx('nav__main')}>
                <Link to='/admin/user-list'>Danh sách khách hàng</Link>
                <Link to='/admin/statistics-room'>Quản lý phòng</Link>
                <Link to='/admin/booking-management'>Quản lý đặt phòng</Link>
            </nav>
            <nav className={cx('nav__task')}>
                <Link to='/admin/create-room' >Tạo phòng</Link>
                {token && <Button login onClick={handleLogout}>Đăng xuất</Button> }
            </nav>

        </header>
    )
}

export default Header