import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import CheckInDate from './CustomDate/CheckInDate'
import CheckOutDate from './CustomDate/CheckOutDate'

import * as userService from '~/apiServices/userService'
import * as roomService from '~/apiServices/roomService'


import { Tooltip } from 'react-tooltip'

import classNames from 'classnames/bind'
import styles from './RoomBooking.module.scss'

const cx = classNames.bind(styles)


function RoomBooking({ userData }) {

    const user = userData
    const { name } = useParams()
    // lấy ra thông tin phòng và khách đặt phòng

    const [room, setRoom] = useState({})
    const [bookedDates, setBookedDates] = useState([])

    useEffect(() => {
        const fetchApi = async () => {

            const roomData = await roomService.roomDetail(name)
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
    const [roomCharge, setRoomCharge] = useState(0)

    // Tính toán thời gian đặt phòng trong bao nhiêu ngày
    const calculateDaysBetween = (startDate, endDate) => {
        const diffTime = Math.abs(startDate - endDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        return diffDays
    }
    useEffect(() => {
        setDays(calculateDaysBetween(startDate, endDate))
        setRoomCharge(room.price * days)
        
    }, [startDate, endDate, days])

    // Tiện nghi
    const [amenities, setAmenities] = useState({
        coffee: 0,
        breakfast: 0,
        minibar: 0
    })
    const amenitiesPrice = {
        coffee: 100000,
        breakfast: 300000,
        minibar: 500000
    }
    useEffect(() => {
        var amenityInputs = document.querySelectorAll('[name][amenities]')
        console.log(amenityInputs)
        for(var amenityInput of amenityInputs) {
            amenityInput.onchange = function () {
                var name = this.getAttribute('name')
                var isChecked = this.checked
                setAmenities(prev => ({
                    ...prev,
                    [name]: isChecked ? amenitiesPrice[name] : 0
                }))
            }
        }
        
    }, [])

    // Chuyển đổi định dạng ngày
    const dataCheckIn = (data) => {
        setStartDate(data)
    }
    const dataCheckOut = (data) => {
        setEndDate(data)
    }
    const formattedDate = (date) => {
        return date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()
    } 
    
    // Handle chuyển sang trang checkout

    const discountRates = {
        normal: 0,
        silver: 5,
        gold: 10,
        platinum: 15,
        diamond: 18,
        vip: 20
    }

    const navigate = useNavigate()
    const handleBooking = (e) => {
        e.preventDefault()   

        const amenitiesPrice = Object.values(amenities).reduce(function (a, b) {
            return a + b
        }, 0)

        const discountRate = discountRates[user?.level]
        const originalPrice = roomCharge + amenitiesPrice * days
        const discountAmount = (originalPrice * discountRate) /100

        const totalPrice = originalPrice - discountAmount


        navigate(`/${name}/checkout`, {
            state: { startDate, endDate, days , roomCharge, amenitiesPrice, amenities, originalPrice, discountRate, discountAmount, totalPrice, user }
        })
    }

    // Phòng ưa thích
    const [favorite, setFavorite] = useState(false)

    const handleFavoriteRooms = (e) => {
        setFavorite(!favorite)
    }
    useEffect(() => {
        const favInput = document.getElementById('favoriteRooms')

        let isUserAction = false
        favInput.onchange = async function () {

            if (isUserAction) return

            var isChecked = this.checked
            
            if (isChecked) {
                userService.addFavoriteRooms( {userId: user._id, roomId: room._id})
            } else {
                const result = await userService.removeFavoriteRooms( {userId:user._id, roomId: room._id})
            }
        }

        const userFavoriteRooms = user?.favoriteRooms?.filter(function(a) {
            return a._id.toString() === room._id
        }) || []

        isUserAction = true
        if (userFavoriteRooms.length === 1) {
            favInput.checked = true
            setFavorite(true)
        } else {
            favInput.checked = false
            setFavorite(false)
        }
        isUserAction = false

    }, [user, room])

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                
                <div className={cx('wrap__info')}>
                    
                    <div className={cx('room__detail')}>
                        <div className={cx('wrap__image')}>
                            <img 
                                className={cx('room__image')}
                                src={room?.images ? `http://localhost:5000/images/roomImg/${room?.images?.image1}` : ''}
                                alt='{{room.name}}'
                            />
                            <img 
                                className={cx('room__image')}
                                src={room?.images ? `http://localhost:5000/images/roomImg/${room?.images.image2}` : ''}
                                alt='{{room.name}}'
                            />
                            <img 
                                className={cx('room__image')}
                                src={room?.images ? `http://localhost:5000/images/roomImg/${room?.images.image3}` : ''}
                                alt='{{room.name}}'
                            />
                        </div>
                        <div className={cx('room__detail-info')}>
                            <p >Tên phòng:<span>{room?.name}</span></p>  
                            <p >Mô tả: <span>{room?.desc}</span></p>
                            <p >Tổng quan: <span>{room?.overView}</span></p>
                            <div className={cx('room__star-rating')}>
                                {[...Array(Number(room?.rating || 5))].map((_, index) => (
                                    <i key={index} className={cx('fa-solid fa-star')}></i>
                                ))}
                            </div>
                            <p >Giá: <span>{`${Number(room?.price).toLocaleString('vi-VN')} ₫/ đêm`}</span></p>

                            <div className={cx('favorite-rooms')}>
                                <input id='favoriteRooms' type='checkbox' />
                                <label for='favoriteRooms'  onClick={handleFavoriteRooms}>
                                    <div
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={!favorite ? 'Thêm phòng vào yêu thích' : 'Hủy lưu phòng'}
                                    >
                                        {!favorite ? 
                                            <i className={cx('fa-regular fa-bookmark')}></i> : 
                                            <i className={cx('fa-solid fa-bookmark')}></i>}
                                    </div>
                                    { <Tooltip id="my-tooltip"/>}
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className={cx('user__info')}>
                        <p className={cx('user__info-title')}>Thông tin khách hàng</p>
                        <p >Tên khách hàng: <span>{user?.fullName}</span></p>
                        <p >Email: <span>{user?.email}</span></p>
                        <p >Số điện thoại: <span>[Số điện thoại khách hàng]</span></p>
                        <p >Cấp bậc <span>{user?.level}</span></p>
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
                        <div className={cx('booking__amenities-item')}>
                            <p className={cx('booking__amenities')} >Coffee  <span >100.000 ₫</span></p>
                            <input id='amenities__coffee' name='coffee' amenities='' type="checkbox" className={cx('amenities__checkbox')}/>
                            <label for="amenities__coffee" className={cx('amenities__label')}></label>
                        </div>
                        <div className={cx('booking__amenities-item')}>
                            <p className={cx('booking__amenities')} >Bữa sáng <span >300.000 ₫</span></p>
                            <input id='amenities__breakfast' name='breakfast' amenities='' type="checkbox" className={cx('amenities__checkbox')}/>
                            <label for="amenities__breakfast" className={cx('amenities__label')}></label>
                        </div>
                        <div className={cx('booking__amenities-item')}>
                            <p className={cx('booking__amenities')} >Mini bar <span >500.000 ₫</span></p>
                            <input id='amenities__minibar' name='minibar' amenities='' type="checkbox" className={cx('amenities__checkbox')}/>
                            <label for="amenities__minibar" className={cx('amenities__label')}></label>
                        </div>
                    </div>
                    <button onClick={handleBooking} className={cx('booking__form-btn', {available : startDate && endDate})} >Đặt phòng</button>
                    
                    <div className={cx('booking__price-list')}>
                        <p className={cx('booking__price-title')}>Chi tiết giá cả</p>
                        <p className={cx('booking__price')} > 
                            <span>{Number(room.price).toLocaleString('vi-VN')} x {startDate && endDate ? days : '0'}</span>
                            <span>{Number(startDate && endDate ? roomCharge : 0).toLocaleString('vi-VN')} ₫</span>
                        </p>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default RoomBooking
