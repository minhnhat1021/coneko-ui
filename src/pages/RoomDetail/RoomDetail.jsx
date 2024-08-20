import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import * as loadService from '~/apiServices/loadService'

import CheckInDate from './CustomDate/CheckInDate';
import CheckOutDate from './CustomDate/CheckOutDate';

import classNames from 'classnames/bind'
import styles from './RoomDetail.module.scss'

const cx = classNames.bind(styles)


function HotelRooms() {
    const { name } = useParams();
    const navigate = useNavigate();
    
    const [room, setRoom] = useState({})
    const [bookedDates, setBookedDates] = useState([])
    useEffect(() => {
        
        const fetchApi = async () => {
            const roomData = await loadService.roomDetail(name)
            const currentUsers = roomData.currentUsers
            const dateData = currentUsers.map(user => ({
                start: new Date(user.checkInDate),
                end: new Date(user.checkOutDate),
            }))

            setRoom(roomData)
            setBookedDates(dateData)
        }
                
        fetchApi();
    }, [])
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    // Tính toán thời gian đặt phòng trong bao nhiêu ngày
    const calculateDaysBetween = (startDate, endDate) => {
        const diffTime = Math.abs(startDate - endDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
        return diffDays;
    }
    const dataCheckIn = (data) => {
        setStartDate(data)
    }
    const dataCheckOut = (data) => {
        setEndDate(data)
    }
    
    const handleBooking = () => {
        const days = calculateDaysBetween(startDate, endDate);
        const totalPrice = days * room.price;
      
        navigate(`/${room.name}/room-booking`, {
          state: { startDate, endDate, days, totalPrice }
        });
      };
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <a href='/hotel-rooms/' className={cx('room__image')}>
                    <img
                        src={`http://localhost:5000/images/roomImg/${room.image}`}
                        alt='{{this.name}}'
                    />
                </a>
                <div className={cx('room__text')}>
                    <p className={cx('room__info')}>Thông tin phòng</p>
                    <p className={cx('room__welcome')}>KÍNH GỬI VỊ KHÁCH THÔNG TIN PHÒNG KHÁCH SẠN</p>

                    <div className={cx('room__name')}>
                        <p className={cx('room__text-title')}>Tiện nghi khách có quyền sử dụng</p>
                        <p className={cx('room__text-content')}>
                            {room.name}
                        </p>
                    </div>
                    <div className={cx('room__des')}>
                        <p className={cx('room__text-title')}>tóm tắt</p>
                        <p className={cx('room__text-content')}>
                            Căn hộ Homestay 2 ngủ nhà Zhomestay được thiết kế phù hợp dành cho khách hàng có kế hoạch đi du lịch hoặc có chuyến công tác tại Hà Nội, nơi tuyệt vời cho các cặp đôi, bạn bè, gia đình có con nhỏ thư giãn vui chơi cuối tuần.
                            Vinhomes Smart City là sự kết hợp giữa không gian sống sang trọng. Khu vực đẳng cấp với đầy đủ tiện ích, nơi bạn có thể tận hưởng tối đa.
                            Căn hộ dịch vụ Zhomestay Homestay Hà Nội rất vinh dự chào đón bạn đến với căn hộ nhỏ ấm cúng của chúng tôi. Với diện tích trung bình khoảng 55m2. Tọa lạc tại Vinhomes Smart City.
                            {room.desc}
                        </p>
                        
                    </div>
                    <div className={cx('room__overview')}>
                        <p className={cx('room__text-title')}>Tiện nghi khách có quyền sử dụng</p>
                        <p className={cx('room__text-content')}>
                            Bạn sẽ có toàn bộ căn hộ cho riêng mình trong thời gian lưu trú.
                            Căn hộ riêng tư với đầy đủ tiện nghi. Bao gồm giường cỡ queen, phòng tắm riêng, điều hòa không khí, TV đươc kết nối internet, Wifi miễn phí, tủ lạnh, đồ vệ sinh cá nhân, máy sấy tóc, lược, bàn chải đánh răng, xà phòng rửa tay…
                            Bạn có thể tận hưởng bể bơi ngoài trời hiện đại, bể bơi trong nhà, tập thể dục trong phòng tập thể dục được trang bị đầy đủ tiện nghi. Phí cho người không phải là cư dân là 200.000 VND/người/lần.
                            {room.overView}
                        </p>
                    </div>
                </div>
                <div className={cx('room__booking')}>
                    <div className={cx('room__star-rating')}>
                        {[...Array(Number(room.rating || 5))].map((a, index) => (
                            <i key={index} className={cx('fa-solid fa-star')}></i>
                       ))}
                    </div>
                    <div className={cx('room__price')}>
                        {`${room.price} ₫/ đêm`}
                    </div>
                    <form className={cx('room__booking-form')} >
                        <div className={cx('booking__form-item')}>
                            <label htmlFor='check-in-date'>Ngày nhận phòng</label>
                            <CheckInDate dataCheckIn={dataCheckIn} endDate={endDate} bookedDates={bookedDates}/>
                        </div>
                        <div className={cx('booking__form-item')}>
                            <label htmlFor='check-in-date'>Ngày trả phòng</label>
                            <CheckOutDate dataCheckOut={dataCheckOut} startDate={startDate} bookedDates={bookedDates}/>
                        </div>
                        <button onClick={handleBooking} className={cx('booking__form-btn', {available : startDate && endDate})} >Đặt phòng</button>
                    </form>
                </div>
            </div>
        </div>
        
    );
}

export default HotelRooms;
