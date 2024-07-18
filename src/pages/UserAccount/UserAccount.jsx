
import classNames from 'classnames/bind';
import styles from './UserAccount.module.scss'

const cx = classNames.bind(styles)

function UserAccount({ userData = {data: {message: ''}} }) {
    return ( 
        <div className={cx('wrapper')}>
            <header>

            </header>
            <section className={cx('container')}>
                <div className={cx('header')}>
                    <h2 className={cx('header__title')}>Thông tin cơ bản</h2>
                    <p className={cx('header__desc')}>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</p>
                </div>
                <div className={cx('content')}>
                    <nav className={cx('nav')}>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Họ và tên</h4>
                            <p className={cx('nav__item-info')}>Nguyễn Minh</p>
                        </div>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Tên người dùng</h4>
                            <p className={cx('nav__item-info')}>abcxyz</p>
                        </div>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>email</h4>
                            <p className={cx('nav__item-info')}>abcxyz@gmail.com</p>
                        </div>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Số điện thoại</h4>
                            <p className={cx('nav__item-info')}>123xxx0321</p>
                        </div>
                    </nav>
                </div>
            </section>
            <section className={cx('container')}>
                <div className={cx('header')}>
                    <h2 className={cx('header__title')}>Tài khoản đã Liên kết</h2>
                    <p className={cx('header__desc')}>Quản lý liên kết tới các trang mạng xã hội của bạn.</p>
                </div>
                <div className={cx('content')}>
                    <nav className={cx('nav')}>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Facebook</h4>
                            <p className={cx('nav__item-info')}>Nguyễn Minh</p>
                        </div>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Google</h4>
                            <p className={cx('nav__item-info')}>abcxyz</p>
                        </div>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Spotify</h4>
                            <p className={cx('nav__item-info')}>abcxyz</p>
                        </div>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Tiktok</h4>
                            <p className={cx('nav__item-info')}>radiant</p>
                        </div>
                    </nav>
                </div>
            </section>
            
        </div>
    );
}

export default UserAccount;