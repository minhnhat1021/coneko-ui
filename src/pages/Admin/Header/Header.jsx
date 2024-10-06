import { Link } from 'react-router-dom'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
    return ( 
        <header className={cx('header')}>
            <a href='/admin'><h1>Quản trị hệ thống</h1></a>
            <nav className={cx('nav__main')}>
                <Link to='/admin/user-list'>Danh sách khách hàng</Link>
                <Link to='/admin/statistics-room'>Quản lý phòng</Link>
                <Link to='/admin/booking-management'>Quản lý đặt phòng</Link>
            </nav>
            <nav className={cx('nav__task')}>
                <Link to='/admin/create-room'>Tạo phòng</Link>
            </nav>
        </header>
    )
}

export default Header