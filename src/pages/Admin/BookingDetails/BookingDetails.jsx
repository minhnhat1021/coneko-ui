import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'


import classNames from 'classnames/bind'
import styles from './BookingDetails.module.scss'

const cx = classNames.bind(styles)

function BookingDetails() {
    const location = useLocation()
    const booking = location.state.booking
    console.log(booking)

     // Chuyển đổi định dạng ngày
     const formattedDay = (date) => {
        return  date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()  
    }
    const formattedTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')
        
        return `${hours}:${minutes}:${seconds}`
    }

    return ( 
        <div className={cx('wrapper')}>
            <div  className={cx('modal')}  >
                <div className={cx('modal__container')} >
                    <div className={cx('modal__content')} >
                        <div className={cx('wrap__expense')}>
                            <img src={`http://localhost:5000/images/roomImg/${booking?.room?.image}`} alt=''/>
                            <div className={cx('expense')}>
                                <p className={cx('modal__info-title')}>Chi tiết phí phòng và dịch vụ</p>

                                <div className={cx('modal__info-item')}>
                                    Phí phòng ( 1 ngày )
                                    <span>{booking?.roomPrice?.toLocaleString('vi-VN')} ₫</span> 
                                </div>
                                <div className={cx('modal__info-item')}>
                                    Tổng phí phòng ( {booking?.days} ngày )
                                    <span>{booking?.roomCharge?.toLocaleString('vi-VN')} ₫</span> 
                                </div>
                                <div className={cx('modal__info-item')}>
                                    Phí dịch vụ ( 1 ngày )
                                    <span>{booking?.amenitiesPrice?.toLocaleString('vi-VN')} ₫</span> 
                                </div>
                                <div className={cx('modal__info-item')}>
                                    Dịch vụ gồm có
                                    <span>
                                        {Object.entries(booking?.amenities || {})
                                            .filter(([key, value]) => value > 0)
                                            .map(([key, value], index, array) => (
                                                <span key={index}>
                                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                                    {index < array.length - 1 && ', '}
                                                </span>
                                            ))
                                        }
                                    </span> 
                                </div>
                                <div className={cx('modal__info-item')}>
                                    Chi tiết dịch vụ
                                    <span>
                                        {Object.entries(booking?.amenities || {})
                                            .filter(([key, value]) => value > 0)
                                            .map(([key, value], index, array) => (
                                                <span key={index}>
                                                    {key.charAt(0).toUpperCase() + key.slice(1) } : {value.toLocaleString()} ₫
                                                    {index < array.length - 1 && ', '}
                                                </span>
                                            ))
                                        }
                                    </span> 
                                </div>
                                
                                <div className={cx('modal__info-item')}>
                                    Tổng phí dịch vụ ( {booking?.days} ngày )
                                    <span>{booking?.amenitiesCharge?.toLocaleString('vi-VN')} ₫</span> 
                                </div>
                                <div className={cx('modal__info-item')}>
                                    Tổng chi phí 
                                    <span>{booking?.amountSpent?.toLocaleString('vi-VN')} ₫</span> 
                                </div>
                            </div>
                        </div>
                        <div className={cx('modal__info')}>
                            <div className={cx('modal__info-list')}>
                                <p className={cx('modal__info-title')}>Thông tin phòng</p>

                                <div className={cx('modal__info-item')}>Tên phòng <span>{booking?.room?.name}</span> </div>
                                <div className={cx('modal__info-item')}>Mô tả phòng <span>{booking?.room?.desc}</span> </div>
                                <div className={cx('modal__info-item')}>Giá phòng <span>{booking?.room?.price}</span> </div>
                                <div className={cx('modal__info-item')}>Dịch vụ <span>{booking?.room?.overView}</span> </div>

                            </div>
                            <div className={cx('modal__info-list')}>
                                <p className={cx('modal__info-title')}>Thông tin đặt phòng</p>

                                <div className={cx('modal__info-item')}>
                                    Ngày đặt phòng 
                                    <span>{formattedDay(new Date(booking?.bookingDate))} - {formattedTime(new Date(booking?.bookingDate))}</span> 
                                </div>
                                <div className={cx('modal__info-item')}>
                                    Ngày nhận phòng 
                                    <span>{formattedDay(new Date(booking?.checkInDate))} - {formattedTime(new Date(booking?.checkInDate))}</span> 
                                </div>
                                <div className={cx('modal__info-item')}>
                                    Ngày trả phòng 
                                    <span>{formattedDay(new Date(booking?.checkOutDate))} - {formattedTime(new Date(booking?.checkOutDate))}</span> 
                                </div>
                                <div className={cx('modal__info-item')}>
                                    Số ngày ở 
                                    <span>{booking?.days} ngày</span> 
                                </div>
                            </div>
                            <img src={booking?.qrCode} alt='Qr Code'/>
                        </div>
                    </div>                  
                </div>
            </div>
        </div>
    )
}

export default BookingDetails