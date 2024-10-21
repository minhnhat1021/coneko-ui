import React from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
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
    const { name } = useParams()
    const [room, setRoom] = useState({})
    const [balance, setBalance] = useState()

    useEffect(() => {
        const fetchApi = async () => {
            const roomData = await roomService.roomDetail(name)
            
            setRoom(roomData)
        }
        fetchApi()
    }, [])


    const location = useLocation()
    const { startDate, endDate, days, roomCharge, amenitiesPrice,amenitiesCharge, amenities, originalPrice, discountRate, discountAmount, totalPrice, user } = location.state

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
                roomPrice: room.price,
                roomCharge,
                amenitiesPrice,
                amenitiesCharge,
                amenities,
                originalPrice, 
                discountRate,
                discountAmount,
                totalPrice,
                roomId: room._id,
                userId: user._id
            })
            if(res?.insufficientBalance){
                setBalance('Số dư tài khoản không đủ')
            } else {
                navigate('/payment-successful', {
                    state: { startDate, endDate, days, totalPrice, qrCode: res?.qrCode}
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
            roomPrice: room.price,
            roomCharge,
            amenitiesPrice,
            amenitiesCharge,
            amenities,
            originalPrice, 
            discountRate,
            discountAmount,
            totalPrice,
            roomId: room._id,
            userId: user._id
            
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
            roomPrice: room.price,
            roomCharge,
            amenitiesPrice,
            amenitiesCharge,
            amenities,
            originalPrice, 
            discountRate,
            discountAmount,
            totalPrice,
            roomId: room._id,
            userId: user._id
            
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
            roomPrice: room.price,
            roomCharge,
            amenitiesPrice,
            amenitiesCharge,
            amenities,
            originalPrice, 
            discountRate,
            discountAmount,
            totalPrice,
            roomId: room._id,
            userId: user._id
            
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
    }, [room, user])

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
                        <p >Tên khách hàng: <span>{user.fullName}</span></p>
                        <p >Email: <span>{user.email}</span></p>
                        <p >Số điện thoại: <span>[Số điện thoại khách hàng]</span></p>
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

                    {balance && <span>{balance}</span>}

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
                        <img    
                            src={room?.images ? `${process.env.REACT_APP_IMAGES_URL}${room?.images?.image1}` : ''} 
                            alt={room.name}
                            />
                        <div className={cx('booking__detail')}>
                            <div className={cx('booking__detail-title')}>
                                {room?.name}
                            </div>
                            <div className={cx('booking__detail-overview')}>
                                {room?.overView}
                            </div>
                            <div className={cx('booking__detail-menu')}>
                                <div className={cx('booking__detail-item')}>
                                    <DayIcon />
                                    <span>Nhận phòng : {startDate ? formattedDate(startDate) : ''}</span> 
                                    {/* <span>{endDate ? formattedDate(endDate) : ''}</span> */}
                                </div>
                                <div className={cx('booking__detail-item')}>
                                    <DayIcon />
                                    <span>Trả phòng : {endDate ? formattedDate(endDate) : ''}</span>
                                </div>
                                <div className={cx('booking__detail-item')}>
                                    <TimeIcon />
                                    <span>12:00pm - 10:00am</span>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('booking__pricing')}>
                        <div className={cx('booking__pricing-detail')}>
                            <div className={cx('booking__pricing-title')}>
                                Chi tiết giá cả
                            </div>
                            <div className={cx('booking__pricing-optional')}>
                                <p>{room?.price?.toLocaleString('vi-VN')} x {days} ngày <span>{roomCharge?.toLocaleString('vi-VN')}</span></p>
                                <p>Coffee x {days} ngày <span>{(amenities.coffee * days)?.toLocaleString('vi-VN')}</span></p>
                                <p>Bữa sáng x {days} ngày <span>{(amenities.breakfast * days)?.toLocaleString('vi-VN')}</span></p>
                                <p>Mini Bar x {days} ngày <span>{(amenities.minibar * days)?.toLocaleString('vi-VN')}</span></p>
                                <br></br>
                                <p>Tổng phí gốc <span>{originalPrice?.toLocaleString('vi-VN')}</span></p>
                                <p>Chiết khấu {discountRate} % <span>{discountAmount?.toLocaleString('vi-VN')}</span></p>
                            </div>
                        </div>
                        <div className={cx('booking__total')}>
                            <p>Tổng cộng</p>
                            <span className={cx('booking__charge')}>{totalPrice?.toLocaleString('vi-VN')}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout