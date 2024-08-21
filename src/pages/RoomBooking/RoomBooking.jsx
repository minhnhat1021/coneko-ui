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
                    <div className={cx('user__info')}>
                        <p className={cx('user__info-title')}>Thông tin khách hàng</p>
                        <p >Tên khách hàng: <span>{user.fullName}</span></p>
                        <p >Email: <span>{user.email}</span></p>
                        <p >Số điện thoại: <span>[Số điện thoại khách hàng]</span></p>
                    </div>
                    <div className={cx('booking__info')}>
                        <p className={cx('booking__info-title')}>Chi tiết đặt phòng</p>
                        <p >Thời gian nhận phòng: <span>{`12:00 - ${formattedDate(startDate)}`}</span></p>
                        <p >Thời gian trả phòng: <span>{`10:00 - ${formattedDate(endDate)}`}</span></p>
                        <p >Số ngày đặt: <span>{days}</span></p>
                        <p >Tổng số tiền: <span>{totalPrice} ₫</span> </p>
                    </div>
                </div>

                <div className={cx('room__detail')}>
                    <p className={cx('room__detail-title')}>Thông tin phòng</p>
                    <a href='/hotel-rooms/' className={cx('room__image')}>
                        <img
                            src={`http://localhost:5000/images/roomImg/${room.image}`}
                            alt='{{room.name}}'
                        />
                    </a>
                    <div className={cx('room__detail-content')}>
                        <p >Tên phòng: {room.name}</p>
                        <p >Mô tả: {room.desc}</p>
                        <p >Tổng quan: {room.overView}</p>
                        <div className={cx('room__star-rating')}>
                            {[...Array(Number(room.rating || 5))].map((_, index) => (
                                <i key={index} className={cx('fa-solid fa-star')}></i>
                            ))}
                        </div>
                        <p >Giá: {`${room.price} ₫/ đêm`}</p>
                    </div>

                    <button className={cx('payment__btn')} onClick={handlePayment}>Thanh toán</button>
                    
                </div>

            </div>
        </div>
        
    );
}

export default HotelRooms;
