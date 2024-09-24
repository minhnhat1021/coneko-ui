import { useEffect, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import * as loadService from '~/apiServices/loadService'
import * as  checkoutService from '~/apiServices/checkoutService'

import { PaymentCongrats } from '~/components/Icons'

import classNames from 'classnames/bind'
import styles from './PaymentSuccessful.module.scss'

const cx = classNames.bind(styles)


function PaymentSuccessful() {


    const [searchParams] = useSearchParams()
    const paymentId = searchParams.get('paymentId')
    const payerId = searchParams.get('PayerID')

    // Lấy thông tin từ location.state và params
    const location = useLocation()

    const paymentDetailsEncoded = searchParams.get('paymentDetails')

    let paymentDetails = {}
    if (paymentDetailsEncoded) {
        const paymentDetailsDecoded = decodeURIComponent(paymentDetailsEncoded)
        paymentDetails = JSON.parse(paymentDetailsDecoded)
    }

    // Lấy thông tin cần thiết để hiển thị và call api nếu cần
    const { 
        days, 
        roomPrice, 
        roomCharge, 
        amenitiesPrice, 
        amenitiesCharge, 
        amenities, 
        totalPrice, 
        roomId, 
        userId  
    } = location.state || paymentDetails

    const startDate = location.state?.startDate || new Date(paymentDetails.startDate)
    const endDate = location.state?.endDate || new Date(paymentDetails.endDate)

    const [paymentConfirmed, setPaymentConfirmed] = useState(false)
    console.log(paymentConfirmed)
    useEffect(() => {
        const confirmPayment = async () => {
            try {
                // const res = await checkoutService.confirmPayPalPayment({
                //     startDate,
                //     endDate,
                //     days,
                //     roomPrice,
                //     roomCharge,
                //     amenitiesPrice,
                //     amenitiesCharge,
                //     amenities,
                //     totalPrice,
                //     roomId,
                //     userId,
                //     paymentId, 
                //     payerId })
                // console.log(res)
                setPaymentConfirmed(true)
            } catch (error) {
                console.error('Payment confirmation failed', error)
            }
        }

        if (paymentId && payerId ) {
            console.log(123)
            confirmPayment()
        }
    }, [paymentId, payerId, paymentConfirmed, paymentDetails])

    
    const formattedDate = (date) => {
        return date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()
    }
    // const [room, setRoom] = useState({})

    // const [token, setToken] = useState(localStorage.getItem('token'))
    // useEffect(() => {
    //     const fetchApi = async () => {

    //         const roomData = await loadService.roomDetail(name)
    //         setRoom(roomData)
    //     }
                
    //     fetchApi()
    // }, [])

    
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
                        <p>Địa chỉ <span>8383 Wilshire Boulevard Beverly Hills, CA</span></p>
                        <p>Số điện thoại <span>+389023958577</span></p>
                    </div>
                    <div className={cx('body__main')}>
                        <img
                            src={`http://localhost:5000/images/roomImg/1722524231808.png`}
                            alt='{{room.name}}'
                        />
                        <img
                            src={`http://localhost:5000/images/roomImg/1722524231808.png`}
                            alt='{{room.name}}'
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
                            <p>Tổng giá</p>
                            <span>{totalPrice ? Number(totalPrice).toLocaleString('vi-VN') : 0}</span>
                        </div>
                        <div className={cx('body__footer-item')}>
                            <p>Phí hủy phòng</p>
                            <span>Đặt phòng không được hoàn lại</span>
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