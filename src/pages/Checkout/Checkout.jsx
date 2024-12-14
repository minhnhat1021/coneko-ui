import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import * as roomService from '~/apiServices/roomService'

import * as checkoutService from '~/apiServices/checkoutService'

import images from '~/assets/images'
import { BackIcon, DayIcon, TimeIcon } from '~/components/Icons'
import classNames from 'classnames/bind'
import styles from './Checkout.module.scss'

const cx = classNames.bind(styles)

function Checkout() {

    // Láy dữ liệu room detail
    const [room, setRoom] = useState({})
    const [balance, setBalance] = useState()

    const location = useLocation()

    const { startDate, endDate,  days , roomCharge, totalPrice, deposit, outstandingBalance, discountRate, discountAmount,  userData , selectedRooms } = location.state
    
    // Chuyển đổi định dạng ngày
    const formattedDate = (date) => {
        return date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()
    }
    // Thực hiện thanh toán phòng
    
    const navigate = useNavigate()

    const handleConekoPayment = (e) => {
        e.preventDefault()
        const fetchApi = async () => {
            const res = await checkoutService.conekoCheckout({
                startDate,
                endDate,
                days,
                roomCharge,
                discountRate,
                discountAmount,
                totalPrice,
                deposit,
                outstandingBalance,
                roomId: selectedRooms?.map(room => room?._id),
                userId: userData._id
            })
            if(res?.insufficientBalance){
                setBalance('Số dư tài khoản không đủ')
            } if(res?.status) {
                navigate('/payment-successful', {
                    state: { startDate, endDate, days, deposit, outstandingBalance, qrCode: res?.qrCode}
                })
            }
        }
                
        fetchApi()
    }

    const handlePayPalPayment = async () => {
        const res = await checkoutService.payPalCheckout({
            startDate,
            endDate,
            days,
            roomCharge,
            discountRate,
            discountAmount,
            totalPrice,
            deposit,
            outstandingBalance,
            roomId: selectedRooms?.map(room => room?._id),
            userId: userData?._id
            
        })
        if (res && res.paymentUrl) {
            localStorage.setItem('payPalConfirmed', JSON.stringify(false))
            window.location.href = res.paymentUrl
        }
    }
    const handleVnPayPayment = async () => {
        
        const res = await checkoutService.vnPayCheckout({
            startDate,
            endDate,
            days,
            roomCharge,
            discountRate,
            discountAmount,
            totalPrice,
            deposit,
            outstandingBalance,
            roomId: selectedRooms?.map(room => room?._id),
            userId: userData._id
            
        })
        console.log(res)
        if (res && res.vnpUrl) {
            localStorage.setItem('vnPayConfirmed', JSON.stringify(false))
            window.location.href = res.vnpUrl
        }

    }
    const handleZaloPayPayment = async () => {

        const res = await checkoutService.zaloPayCheckout({
            startDate,
            endDate,
            days,
            roomCharge,
            discountRate,
            discountAmount,
            totalPrice,
            deposit,
            outstandingBalance,
            roomId: selectedRooms?.map(room => room?._id),
            userId: userData._id
            
        })
        console.log(res)
        if (res && res.zlpUrl) {
            localStorage.setItem('zaloPayConfirmed', JSON.stringify(false))
            window.location.href = res.zlpUrl
        }
    }
    const handleVisaPayment = () => {
        
    }
    const [paymentMethod, setPaymentMethod] = useState({})

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method)
    }

    const paymentMethods = [
        { name: 'coneko', title: 'Thanh toán', handler: handleConekoPayment},
        { name: 'payPal', title: 'Thanh toán PayPal', handler: handlePayPalPayment },
        { name: 'vnPay', title: 'Thanh toán VNPay', handler: handleVnPayPayment },
        { name: 'zaloPay', title: 'Thanh toán ZaloPay', handler: handleZaloPayPayment },
        { name: 'visa', title: 'Thanh toán visa', handler: handleVisaPayment }
    ]

    useEffect(() => {
        setPaymentMethod({ name: 'coneko', title: 'Thanh toán', handler: handleConekoPayment })
    }, [room, userData])

    // handleTerms
    const [isCheckout, setIsCheckout] = useState(false)
    const handleTerms = (e) => {
        const isChecked = e.target.checked
        setIsCheckout(isChecked)
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('checkout')}>
                    <div className={cx('checkout__header')}>
                        <button><BackIcon className={cx('checkout__icon-back')}/></button>
                        <p className={cx('checkout__title')}>Thanh toán</p>
                    </div>
                    <div className={cx('contact__info')}>
                        <p className={cx('contact__info-title')}>Thông tin khách hàng</p>
                        <p >Tên khách hàng: <span>{userData?.fullName}</span></p>
                        <p >Email: <span>{userData?.email}</span></p>
                        <p >Số điện thoại: <span>{userData?.phone || 'Chưa thêm số điện thoại'} </span></p>
                    </div>
                    <div className={cx('payment__info')}>
                        <p className={cx('payment__info-title')}>
                            Lựa chọn phương thức thanh toán
                        </p>
                        <div className={cx('payment__info-card')} >
                            {paymentMethods.map(method => (
                                <div 
                                    key={method.name} 
                                    className={cx('payment__card-img', { selected: paymentMethod.name === method.name }, {coneko: method.name === 'coneko'} )} 
                                    onClick={() => handlePaymentMethodChange(method)}
                                >
                                    <div className={cx('payment__wrap-img')}>
                                        <img src={images[method.name]} alt={method.name}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={cx('payment__info-desc')}>
                            <p>Thanh toán qua <span>{paymentMethod.name}</span></p>
                            {paymentMethod.name ==='coneko' && 
                                <div>
                                    Thanh toán nhanh chóng và an toàn với <span>CONEKO</span>, giúp bạn đặt phòng dễ dàng và tận hưởng kỳ nghỉ thư giãn ngay lập tức!
                                </div>
                            }
                        </div>

                        {paymentMethod.name === 'visa' && 
                            <div className={cx('payment__info-input')}>
                                <input type="text" placeholder='Tên chủ thẻ'/>
                                <input type="text" placeholder='Số thẻ'/>
                                <input type="text" placeholder='Ngày hết hạn'/>
                                <input type="text" placeholder='CVC'/>
                            </div>
                        }
                        
                    </div>

                    <div className={cx('terms')}>
                        <input id='terms' type="checkbox" className={cx('terms__checkbox')} onChange={(e) => handleTerms(e)}/>
                        <label for="terms" className={cx('terms__label')}></label>
                        <p>Tôi đồng ý với các <Link to='/hotel-rules' className={cx('terms__link')}>điều khoản và điều kiện</Link></p>
                    </div>
                    
                    {balance && <span className={cx('account-balance')}>{balance}</span>}

                    <div className={cx('wrap__pay-btn')}>
                        {paymentMethods.map(method => (
                            paymentMethod.name === method.name && 
                            
                            <button onClick={paymentMethod.handler} className={cx('pay__btn', {available: isCheckout}  )} >
                                {paymentMethod.title}
                            </button>
                        ))}
                    </div>
                </div> 
                <div className={cx('booking')}>
                    <div className={cx('booking__info')}>
                    
                        <div className={cx('booking__rooms')}>
                            {selectedRooms?.map(room => {
                                return (
                                    <div className={cx('booking__room')}>
                                        <img    
                                            src={room?.images ? `${process.env.REACT_APP_IMAGES_URL}${room?.images?.image1}` : ''} 
                                        />
                                        <div className={cx('booking__detail')}>
                                            <div className={cx('booking__detail-text-1')}>
                                                <span>Phòng {room?.name}</span>
                                                <span>{room?.bedType}</span>
                                                <span>{room?.bedCount} giường</span>
                                            </div>
                                            <div className={cx('booking__detail-text-2')}>
                                                <span>{room?.capacity} khách</span>
                                                <span>{room?.size} m&sup2;</span>
                                                <span>{room?.price}</span>
                                            </div>
                                            
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        
                        <div className={cx('booking__detail-menu')}>
                            <div className={cx('booking__detail-item')}>
                                <DayIcon />
                                <span>Ngày nhận phòng : {startDate ? formattedDate(startDate) : ''}</span> 
                            </div>
                            <div className={cx('booking__detail-item')}>
                                <DayIcon />
                                <span>Ngày trả phòng : {endDate ? formattedDate(endDate) : ''}</span>
                            </div>
                            <div className={cx('booking__detail-item')}>
                                <TimeIcon />
                                <span>12:00pm - 10:00am</span>
                                
                            </div>
                            <div className={cx('booking__detail-item')}>
                                <TimeIcon />
                                <span>{days} ngày</span>
                            </div>
                            
                        </div>
                    </div>
                    <div className={cx('booking__pricing')}>
                        <div className={cx('booking__pricing-detail')}>
                            <div className={cx('booking__pricing-title')}>
                                Chi tiết đơn đặt phòng
                            </div>
                            <div className={cx('booking__pricing-optional')}>
                                
                                <br></br>
                                <p>Chi phí ban đầu <span className={cx('booking__charge')}>{roomCharge?.toLocaleString('vi-VN')}</span></p>
                                <p>Ưu đãi đặc biệt {discountRate} % <span>{discountAmount?.toLocaleString('vi-VN')}</span></p>
                                <br></br>
                                <p>Tổng chi phí <span className={cx('booking__charge')}>{totalPrice?.toLocaleString('vi-VN')}</span></p>
                                <p>Số tiền đặt cọc <span>{deposit?.toLocaleString('vi-VN')}</span></p>
                                <p>Số tiền còn lại chưa thanh toán <span>{outstandingBalance?.toLocaleString('vi-VN')}</span></p>
                            </div>
                        </div>
                        <div className={cx('booking__total')}>
                            <p>Tổng thanh toán</p>
                            <span className={cx('booking__charge')}>{deposit?.toLocaleString('vi-VN')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout