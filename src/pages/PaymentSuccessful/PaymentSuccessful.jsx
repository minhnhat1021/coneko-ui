import { useLocation } from 'react-router-dom'

import { PaymentCongrats } from '~/components/Icons'
import images from '~/assets/images'

import classNames from 'classnames/bind'
import styles from './PaymentSuccessful.module.scss'

const cx = classNames.bind(styles)


function PaymentSuccessful() {
    const location = useLocation()

    // Lấy dữ liệu từ location.state (từ trang payment verification)
    const { 
        days, 
        roomCharge, 
        deposit,
        outstandingBalance,
        roomId, 
        userId,
        qrCode,
    } = location.state
    
    const getstartDate = (paymentDetails) => {
        if(paymentDetails?.startDate) {
            return new Date(paymentDetails.startDate)
        }
    }
    const getendDate = (paymentDetails) => {
        if(paymentDetails?.endDate) {
            return new Date(paymentDetails.endDate)
        }
    }
    
    const startDate = getstartDate(location.state)
    const endDate = getendDate(location.state)

    // format date
    const formattedDate = (date) => {
        return date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()
    }
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <PaymentCongrats />
                    <p className={cx('header__title')}>Phòng của bạn đã được giữ chỗ</p>
                    <p className={cx('header__desc')}>Bạn cũng sẽ nhận được tóm tắt qua email của mình.</p>
                </header>
                <main className={cx('body')}>
                    <div className={cx('body__header')}>
                        <p className={cx('hotel__name')}>Coneko</p>
                        <p>Địa chỉ <span>Đại học Thăng Long</span></p>
                        <p>Số điện thoại <span>+84 393-189-262</span></p>
                    </div>
                    <div className={cx('body__main')}>
                        <img
                            src={images.paymentSuccessful}
                            alt='coneko'
                        />
                        <img
                            src={`${qrCode}`}
                            alt='coneko'
                        />
                    </div>
                    <div className={cx('body__footer')}>
                        <div className={cx('body__footer-item')}>
                            <p>Ngày nhận phòng</p>
                            <span>{startDate ? formattedDate(startDate) : ''}</span> 
                        </div>
                        <div className={cx('body__footer-item')}>
                            <p>Ngày trả phòng </p>
                            <span>{endDate ?  formattedDate(endDate) : ''}</span>
                        </div>
                        <div className={cx('body__footer-item')}>
                            <p>Thời gian</p>
                            <span>12:00 PM - 10:00 AM </span>
                        </div>
                        <div className={cx('body__footer-item')}>
                            <p>Đã đặt cọc</p>
                            <span>{deposit ? Number(deposit).toLocaleString('vi-VN') : 0}</span>
                        </div>
                        <div className={cx('body__footer-item')}>
                            <p>Số tiền còn lại cần thanh toán</p>
                            <span>{outstandingBalance ? Number(outstandingBalance).toLocaleString('vi-VN') : 0}</span>
                        </div>
                        <div className={cx('body__footer-item')}>
                            <p>Phí hủy phòng</p>
                            <span>Miễn phí hủy phòng trước ngày nhận phòng 1 ngày</span>
                        </div>
                    </div>
                </main>
                <footer className={cx('footer')}>
                    <p>Phòng của bạn đã được giữ chỗ, chờ đón bạn tới trải nghiệm!</p>
                </footer>
            </div>
        </div>

    )
}

export default PaymentSuccessful