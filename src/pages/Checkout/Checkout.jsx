import React from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import * as loadService from '~/apiServices/loadService'

import images from '~/assets/images'
import { BackIcon, DayIcon, TimeIcon } from '~/components/Icons'
import classNames from 'classnames/bind'
import styles from './Checkout.module.scss'

const cx = classNames.bind(styles)

function Checkout() {

    const { name } = useParams()
    const location = useLocation()
    const { startDate, endDate, days , totalPrice, user } = location.state
    console.log(startDate,endDate, days, totalPrice, user)


    const [room, setRoom] = useState({})
    console.log(room)
    useEffect(() => {
        const fetchApi = async () => {
            const roomData = await loadService.roomDetail(name)
            
            setRoom(roomData)
        }
        fetchApi()
    }, [])

    // Chuyển đổi định dạng ngày
    const formattedDate = (date) => {
        return date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('checkout')}>
                    <div className={cx('checkout__header')}>
                        <BackIcon />
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
                            Thông tin thanh toán
                        </p>
                        <div className={cx('payment__info-card')}>
                            <div className={cx('payment__card-img')}>
                                <img src={images.visa} alt="VISA"/>
                            </div>
                            <div className={cx('payment__card-img')}>
                                <img src={images.masterCard} alt="MasterCard"/>
                            </div>
                            <div className={cx('payment__card-img')}>
                                <img src={images.payPal} alt="PayPal"/>
                            </div>
                        </div>
                        <div className={cx('payment__info-input')}>
                            <input type="text" placeholder='Tên chủ thẻ'/>
                            <input type="text" placeholder='Số thẻ'/>
                            <input type="text" placeholder='Ngày hết hạn'/>
                            <input type="text" placeholder='CVC'/>
                        </div>
                    </div>
                    <div className={cx('terms')}>
                        <input type="checkbox" className={cx('terms__checkbox')}/>
                        <p>Tôi đồng ý với các <Link to='#' className={cx('terms__link')}>điều khoản và điều kiện</Link></p>
                    </div>
                    <button className={cx('pay__btn')} >Thanh toán</button>
                </div>
                <div className={cx('booking')}>
                    <div className={cx('booking__info')}>
                        <img    
                            src={`http://localhost:5000/images/roomImg/${room.image}`} 
                            alt={room.name}
                            />
                        <div className={cx('booking__detail')}>
                            <div className={cx('booking__detail-title')}>
                                Phòng 201
                            </div>
                            <div className={cx('booking__detail-overview')}>
                                {room.overView}
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
                                <p>{Number(room.price).toLocaleString('vi-VN')} x {days} ngày <span>{Number(totalPrice).toLocaleString('vi-VN')}</span></p>
                                <p>$27 x 4 ngay <span>$108.00</span></p>
                                <p>$27 x 4 hours <span>$108.00</span></p>
                            </div>
                        </div>
                        <div className={cx('booking__total')}>
                            <p>Tổng cộng</p>
                            <span>$183.80</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Checkout