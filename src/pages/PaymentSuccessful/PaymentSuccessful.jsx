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
    const location = useLocation()

    const [searchParams] = useSearchParams()

    // PayPal Details
    const paymentId = searchParams.get('paymentId')
    const payerId = searchParams.get('PayerID')
    const payPalConfirmed = JSON.parse(localStorage.getItem('payPalConfirmed'))

    const [payPalDetails, setPayPalDetails] = useState({})
    // VnPay Details
    const vnPayCheckoutId = searchParams.get('vnPayCheckoutId')
    const vnPayConfirmed = JSON.parse(localStorage.getItem('vnPayConfirmed'))

    const [vnPayDetails, setVnPayDetails] = useState({})

    // Zalo Pay check out
    const apptransid = searchParams.get('apptransid') || undefined
    const zaloPayConfirmed = JSON.parse(localStorage.getItem('zaloPayConfirmed'))

    const [zaloPayDetails, setZaloPayDetails] = useState({})
    
    // Lấy thông tin cần thiết để hiển thị và call api nếu cần
    const getNonEmptyObject = (...objects) => {
        for (let obj of objects) {
            if (obj && Object.keys(obj).length > 0) {
                return obj
            }
        }
        return {}
    }
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
    } = getNonEmptyObject(location.state, payPalDetails, vnPayDetails, zaloPayDetails)

    const getstartDate = (...paymentDetails) => {
        for(const paymentDetail of paymentDetails) {
            if(paymentDetail?.startDate) {
                return new Date(paymentDetail.startDate)
            }
        }
    }
    const getendDate = (...paymentDetails) => {
        for(const paymentDetail of paymentDetails) {
            if(paymentDetail?.endDate) {
                return new Date(paymentDetail.endDate)
            }
        }
    }
    const startDate = getstartDate(location.state, payPalDetails, vnPayDetails, zaloPayDetails)
    const endDate = getendDate(location.state, payPalDetails, vnPayDetails, zaloPayDetails)

    
    // PayPal
    useEffect(() => {
        const confirmPayPalCheckout = async () => {
            try {
                const res = await checkoutService.confirmPayPalCheckout({
                    paymentId, 
                    payerId 
                })
                if(res.payment.state === 'approved'){
                    const payPalDetailsEncode = searchParams.get('payPalDetails')
                    const payPalDetailsDecode =JSON.parse(payPalDetailsEncode)

                    const res = await checkoutService.savePayPalCheckout(payPalDetailsDecode)
                    if(res.return_code === 1) {
                        setPayPalDetails(payPalDetailsDecode)
                        localStorage.setItem('payPalConfirmed', JSON.stringify(true))   
                    }
                }
                
            } catch (error) {
                console.error('Xác nhận thanh toán Paypal lỗi', error)
            }
        }

        if (paymentId && payerId && !payPalConfirmed) {
            confirmPayPalCheckout()
        }
    }, [paymentId, payerId, payPalConfirmed])

    // VnPay
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        let vnp_Params = {}
            
        queryParams.forEach((value, key) => {
            vnp_Params[key] = value
        })

        const confirmVnPayCheckout = async () => {

            try {
                const res = await checkoutService.confirmVnPayCheckout({
                    vnp_Params
                })
                if(res?.code === '00'){
                    const res = await checkoutService.saveVnPayCheckout({
                        vnPayCheckoutId
                    })
                    setVnPayDetails(res.vnPayDetails)
                    localStorage.setItem('vnPayConfirmed', JSON.stringify(true))
                }
            } catch (error) {
                console.error('Xác nhận thanh toán vnPay lỗi', error)
            }
        }
        if(vnPayCheckoutId && !vnPayConfirmed){
            confirmVnPayCheckout()
        } 

    }, [vnPayCheckoutId, vnPayConfirmed])
    
    // ZaloPay
    useEffect(() => {
        const statusZaloPayCheckout = async () => {
            try {
                const res = await checkoutService.statusZaloPayCheckout({
                    apptransid
                })
                if(res.return_code === 1) {
                    const zaloPayDetailsEncode = searchParams.get('zalopayDetails') || undefined
                    const zaloPayDetailsDecode = JSON.parse(zaloPayDetailsEncode)

                    const res = await checkoutService.saveZaloPayCheckout(zaloPayDetailsDecode)
                    if(res.return_code === 1) {
                        setZaloPayDetails(zaloPayDetailsDecode)
                        localStorage.setItem('zaloPayConfirmed', JSON.stringify(true))
                    }
                }
            } catch (error) {
                console.error('Xác nhận thanh toán vnPay lỗi', error)
            }
        }
        if(apptransid && !zaloPayConfirmed) {
            statusZaloPayCheckout()
        }
 
    }, [apptransid, zaloPayConfirmed])

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