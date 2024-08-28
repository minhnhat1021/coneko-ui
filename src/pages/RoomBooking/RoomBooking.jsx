import { useState, useEffect, useRef } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'
import * as loadService from '~/apiServices/loadService'
import * as roomService from '~/apiServices/roomService'


import classNames from 'classnames/bind'
import styles from './RoomBooking.module.scss'

const cx = classNames.bind(styles)


function HotelRooms() {
    const { name } = useParams();
    const navigate = useNavigate()

    // lấy ra thông tin phòng
    const [room, setRoom] = useState({})
    const [user, setUser] = useState({})

    const [token, setToken] = useState(localStorage.getItem('token'))
    useEffect(() => {
        const fetchApi = async () => {
            const userData = await loadService.userDetail(token)
            setUser(userData)

            const roomData = await loadService.roomDetail(name)
            setRoom(roomData)
        }
                
        fetchApi()
    }, [])


    // Lấy thông tin mà khách đã chọn khi đặt phòng
    const location = useLocation()
    const { startDate, endDate, days, totalPrice } = location.state
    const formattedDate = (date) => {
        return date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()
    }  
    // Thực hiện thanh toán phòng
    const handlePayment = (e) => {
        e.preventDefault()

        const fetchApi = async () => {
            const result = await roomService.payment({
                startDate,
                endDate,
                days,
                totalPrice,
                roomId: room._id,
                userId: user._id
            })
            navigate('/payment-successful', {
                state: { startDate, endDate, days, totalPrice }
            })
        }
                
        fetchApi()
    }
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('wrap__info')}>
                    
                    <div className={cx('room__detail')}>
                        <img 
                            className={cx('room__image')}
                            src={`http://localhost:5000/images/roomImg/${room.image}`}
                            alt='{{room.name}}'
                        />
                        <p >Tên phòng:<span>{room.name}</span></p>
                        <p >Mô tả: <span>{room.desc}</span></p>
                        <p >Tổng quan: <span>{room.overView}</span></p>
                        <div className={cx('room__star-rating')}>
                            {[...Array(Number(room.rating || 5))].map((_, index) => (
                                <i key={index} className={cx('fa-solid fa-star')}></i>
                            ))}
                        </div>
                        <p >Giá: <span>{`${Number(room.price).toLocaleString('vi-VN')} ₫/ đêm`}</span></p>
                    </div>
                    <div className={cx('user__info')}>
                        <p className={cx('user__info-title')}>Thông tin khách hàng</p>
                        <p >Tên khách hàng: <span>{user.fullName}</span></p>
                        <p >Email: <span>{user.email}</span></p>
                        <p >Số điện thoại: <span>[Số điện thoại khách hàng]</span></p>
                    </div>
                    
                </div>
                
                <div className={cx('booking__info')}>
                    <div className={cx('booking__time-list')}>
                        <p className={cx('booking__time-title')}>Chi tiết đặt phòng</p>
                        <p className={cx('booking__time')} >
                            Ngày nhận phòng: 
                            <span className={cx('booking__time-info')}>{formattedDate(startDate)}</span>
                        </p>
                        <p className={cx('booking__time')} >
                            Ngày trả phòng: 
                            <span className={cx('booking__time-info')}>{formattedDate(endDate)}</span>
                        </p>
                        <p className={cx('booking__time')} >
                            Thời gian 
                            <span className={cx('booking__time-info')}>12:00pm - 10:00am</span>
                        </p>
                        <p className={cx('booking__time')} >
                            Số ngày đặt: 
                            <span className={cx('booking__time-info')}>{days}</span>
                        </p>
                    </div>
                    <div className={cx('booking__amenities-list')}>
                        <p className={cx('booking__amenities-title')}>Tiện nghi đi kèm</p>
                        <p className={cx('booking__amenities')} >Coffee service <span >$12.00</span></p>
                        <p className={cx('booking__amenities')} >bữa sáng <span >$12.00</span></p>
                        <p className={cx('booking__amenities')} >netflix <span >$12.00</span></p>
                    </div>

                    <button className={cx('payment__btn')} onClick={handlePayment}>Thanh toán</button>

                    <div className={cx('booking__price-list')}>
                        <p className={cx('booking__price-title')}>Chi tiết giá cả</p>
                        <p className={cx('booking__price')} > 
                            <span>{Number(room.price).toLocaleString('vi-VN')} x {days}</span>
                            <span>{Number(totalPrice).toLocaleString('vi-VN')} ₫</span>
                        </p>
                        {/* <p className={cx('booking__price')} >bữa sáng <span >$12.00</span></p>
                        <p className={cx('booking__price')} >netflix <span >$12.00</span></p> */}
                    </div>

                </div>

            </div>
        </div>
        
    );
}

export default HotelRooms;
