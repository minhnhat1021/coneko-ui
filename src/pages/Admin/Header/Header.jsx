import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)

function Header() {
    return ( 
        <header className={cx('header')}>
                <a href='/admin'><h1>Quản trị hệ thống</h1></a>
                <nav className={cx('nav__main')}>
                    <a href='/admin/user-list'>Danh sách khách hàng</a>
                    <a href='/admin/statistics-room'>Quản lý phòng</a>
                </nav>
                <nav className={cx('nav__task')}>
                    <a href='/admin/create-room'>Tạo phòng</a>
                    <a href='#'>Sửa thông tin phòng</a>
                </nav>
            </header>
    );
}

export default Header;