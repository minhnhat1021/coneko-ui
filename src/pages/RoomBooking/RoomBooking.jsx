import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import CheckInDate from './CustomDate/CheckInDate'
import CheckOutDate from './CustomDate/CheckOutDate'

import * as loadService from '~/apiServices/loadService'


import classNames from 'classnames/bind'
import styles from './RoomBooking.module.scss'

const cx = classNames.bind(styles)


function HotelRooms() {
    const { name } = useParams();

    // lấy ra thông tin phòng và khách đặt phòng
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [user, setUser] = useState({})

    const [room, setRoom] = useState({})
    const [bookedDates, setBookedDates] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const userData = await loadService.userDetail(token)
            setUser(userData)

            const roomData = await loadService.roomDetail(name)
            const currentUsers = roomData.currentUsers
            const dateData = currentUsers.map(user => ({
                start: user.checkInDate,
                end: user.checkOutDate,
            }))

            setBookedDates(dateData)
            setRoom(roomData)
        }
        fetchApi()
    }, [])

    // Lấy ngày nhận và trả phòng
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [days, setDays] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)

    // Tính toán thời gian đặt phòng trong bao nhiêu ngày
    const calculateDaysBetween = (startDate, endDate) => {
        const diffTime = Math.abs(startDate - endDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return diffDays;
    }
    useEffect(() => {
        setDays(calculateDaysBetween(startDate, endDate))
        setTotalPrice(room.price * days)
    }, [startDate, endDate, days])

    const dataCheckIn = (data) => {
        setStartDate(data)
    }
    const dataCheckOut = (data) => {
        setEndDate(data)
    }
    // Chuyển đổi định dạng ngày
    const formattedDate = (date) => {
        return date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()
    } 
    
    // Handle chuyển sang trang checkout
    const navigate = useNavigate()
    const handleBooking = (e) => {
        e.preventDefault()   

        navigate('/checkout', {
            state: { startDate, endDate, days }
        })
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
                        <div className={cx('date__select-item')}>
                            <label htmlFor='check-in-date'>Ngày nhận phòng</label>
                            <CheckInDate dataCheckIn={dataCheckIn} endDate={endDate} bookedDates={bookedDates}/>
                        </div>
                        <div className={cx('date__select-item')}>
                            <label htmlFor='check-in-date'>Ngày trả phòng</label>
                            <CheckOutDate dataCheckOut={dataCheckOut} startDate={startDate} bookedDates={bookedDates}/>
                        </div>
                        <p className={cx('booking__time')} >
                            Ngày nhận phòng: 
                            <span className={cx('booking__time-info')}>{startDate ? formattedDate(startDate) : ''}</span>
                        </p>
                        <p className={cx('booking__time')} >
                            Ngày trả phòng: 
                            <span className={cx('booking__time-info')}>{endDate ? formattedDate(endDate) : ''}</span>
                        </p>
                        <p className={cx('booking__time')} >
                            Thời gian 
                            <span className={cx('booking__time-info')}>12:00pm - 10:00am</span>
                        </p>
                        <p className={cx('booking__time')} >
                            Số ngày đặt: 
                            <span className={cx('booking__time-info')}>{startDate && endDate ? days : ''}</span>
                        </p>
                    </div>
                    <div className={cx('booking__amenities-list')}>
                        <p className={cx('booking__amenities-title')}>Tiện nghi đi kèm</p>
                        <p className={cx('booking__amenities')} >Coffee service <span >$12.00</span></p>
                        <p className={cx('booking__amenities')} >bữa sáng <span >$12.00</span></p>
                        <p className={cx('booking__amenities')} >netflix <span >$12.00</span></p>
                    </div>
                    <button onClick={handleBooking} className={cx('booking__form-btn', {available : startDate && endDate})} >Đặt phòng</button>
                    

                    <div className={cx('booking__price-list')}>
                        <p className={cx('booking__price-title')}>Chi tiết giá cả</p>
                        <p className={cx('booking__price')} > 
                            <span>{Number(room.price).toLocaleString('vi-VN')} x {startDate && endDate ? days : '0'}</span>
                            <span>{Number(startDate && endDate ? totalPrice : 0).toLocaleString('vi-VN')} ₫</span>
                        </p>
                        
                    </div>

                </div>

            </div>
        </div>
        
    );
}

export default HotelRooms;
