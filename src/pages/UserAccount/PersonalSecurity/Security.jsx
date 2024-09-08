import classNames from 'classnames/bind'
import styles from './PersonalSecurity.module.scss'

const cx = classNames.bind(styles)

function Security() {
    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <p className={cx('header__des')}>
                    Quản lý mật khẩu và cài đặt bảo mật.
                </p>
            </header>
            <section className={cx('container')}>
                <div className={cx('container__header')}>
                    <h2 className={cx('container__header-title')}>Đăng nhập & khôi phục</h2>
                    <p className={cx('container__header-desc')}>Quản lý mật khẩu và xác minh 2 bước.</p>
                </div>
                <div className={cx('content')}>
                    <nav className={cx('nav')}>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Đổi mật khẩu</h4>
                            <p className={cx('nav__item-info')}>Chưa đổi mật khẩu</p>
                        </div>
                        <div className={cx('nav__item')}>
                            <h4 className={cx('nav__item-title')}>Xác minh 2 bước</h4>
                            <p className={cx('nav__item-info')}>Đang tắt</p>
                        </div>
                        
                    </nav>
                </div>
            </section>
        </div>
    )
}

export default Security