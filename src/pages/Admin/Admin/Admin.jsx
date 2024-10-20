import classNames from 'classnames/bind'
import styles from './Admin.module.scss'

const cx = classNames.bind(styles)

function Admin() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('slider')}>
                <div className={cx('slider__content')}>
                    <h2 >Trang quản trị đặt phòng khách sạn Coneko</h2>
                </div>
            </div>
        </div>
    )
}

export default Admin