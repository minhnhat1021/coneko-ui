import { Link } from 'react-router-dom'

import { FbSocial } from '~/components/Icons'
import classNames from 'classnames/bind'
import styles from './Footer.module.scss'

const cx = classNames.bind(styles)

function Footer() {
    return ( 
        <footer className={cx('wrapper')}>
            <div className={cx('list__item')}>
                <div className={cx('item')}>
                    <h2 className={cx('hotel__name')}>coneko</h2>
                    <p className={cx('hotel__phone')}>+1 800-123-4567</p>
                    <p className={cx('hotel__email')}>minhnhat.dev.21@gmail.com</p>
                    <p>1234 Name Street, City, State</p>
                </div>
                <div className={cx('item')}>
                    <h2>Quick Links</h2>
                    <Link className={cx('item__link')} to='/'>Trang chủ</Link>
                    <Link className={cx('item__link')} to='/about'>Giới thiệu</Link>
                    <Link className={cx('item__link')} to='/hotel-rules'>Quy định</Link>
                </div>
                <div className={cx('item')}>
                    <h2>Dịch vụ</h2>
                    <p>Netflix</p>
                    <p>Bồn tắm chill</p>
                    <p>Gương áp trần </p>
                </div>
                <div className={cx('item')}>
                    <h2>Đăng ký nhận bản tin của chúng tôi!</h2>
                    <Link className={cx('hotel__email-address')} to='/'>minhnhat.dev.21@gmail.com</Link>
                    <p className={cx('hotel__social')}>Theo dõi chúng tôi</p>
                    <div className={cx('social__list')}>
                        <Link to='#'><FbSocial/></Link>
                    </div>
                </div>
            </div>
        </footer> 
    )
}

export default Footer