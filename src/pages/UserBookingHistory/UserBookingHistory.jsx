
import React, { useState } from 'react'

import * as roomService from '~/apiServices/roomService'
import classNames from 'classnames/bind'
import styles from './UserBookingHistory.module.scss'

const cx = classNames.bind(styles);

function UserBookingHistory({ userData }) {
    const user = userData
    const bookedRooms = user.bookedRooms

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

    // Xử lý khi modal được gọi lên
    const [showModal, setShowModal] = useState(false)

    const [room, setRoom] = useState({})
    const [infoBooked, setInfoBooked] = useState({})

    const handleShowModal = async (booked) => {
        const roomData = await roomService.roomDetailById(booked.roomId) 
        
        setRoom(roomData)
        setInfoBooked(booked)
        setShowModal(true)
    }

    const handleModal = (e) => {
        setShowModal(false)
    }
    const handleModalContent = (e) => {
        e.stopPropagation()
    }

    return (
        <div className={cx('wrapper')}>
            <h2 className={cx('title')}>Lịch sử giao dịch của khách hàng</h2>
            <div className={cx('wrap__table')}>
                <table className={cx('table')}>
                    <thead>
                        <tr>
                            <th>Thời gian thanh toán</th>
                            <th>Ngày nhận phòng</th>
                            <th>Ngày trả phòng</th>
                            <th>Số tiền</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookedRooms.map((bookedRoom, index) => (
                            <tr onClick = {() => handleShowModal(bookedRoom)} key={index}>
                                <td> 
                                    <div>{bookedRooms ? formattedDay(new Date(bookedRoom.bookingDate)) : ''}</div> 
                                    <div>{bookedRooms ? formattedTime(new Date(bookedRoom.bookingDate)) : ''}</div>
                                </td>
                                <td>
                                    <div>{bookedRooms ? formattedDay(new Date(bookedRoom.checkInDate)) : ''}</div>
                                    <div>{bookedRooms ? formattedTime(new Date(bookedRoom.checkInDate)) : ''}</div>
                                </td>
                                <td>
                                    <div>{bookedRooms ? formattedDay(new Date(bookedRoom.checkOutDate)) : ''}</div>
                                    <div>{bookedRooms ? formattedTime(new Date(bookedRoom.checkOutDate)) : ''}</div>
                                </td>
                                <td>{bookedRoom?.amountSpent?.toLocaleString('vi-VN')}</td>
                                <td className={cx('status', 'thanhcong')}>Thành công</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div  className={cx('modal', {showModal}) }  onClick={handleModal}>
                    <div className={cx('modal__container')} >
                        <div className={cx('modal__content')} onClick={(e) => handleModalContent(e)}>
                            <div className={cx('wrap__expense')}>
                                <img src={room?.images ? `${process.env.REACT_APP_IMAGES_URL}${room?.images?.image1}` : ''} alt=''/>
                                <div className={cx('expense')}>
                                    <p className={cx('modal__info-title')}>Chi tiết phí phòng và dịch vụ</p>

                                    <div className={cx('modal__info-item')}>
                                        Phí phòng ( 1 ngày )
                                        <span>{infoBooked?.roomPrice?.toLocaleString('vi-VN')} ₫</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Tổng phí phòng ( {infoBooked?.days} ngày )
                                        <span>{infoBooked?.roomCharge?.toLocaleString('vi-VN')} ₫</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Phí dịch vụ ( 1 ngày )
                                        <span>{infoBooked?.amenitiesPrice?.toLocaleString('vi-VN')} ₫</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Dịch vụ gồm có
                                        <span>
                                            {Object.entries(infoBooked?.amenities || {})
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
                                            {Object.entries(infoBooked?.amenities || {})
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
                                        Tổng phí dịch vụ ( {infoBooked?.days} ngày )
                                        <span>{infoBooked?.amenitiesCharge?.toLocaleString('vi-VN')} ₫</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Tổng chi phí 
                                        <span>{infoBooked?.amountSpent?.toLocaleString('vi-VN')} ₫</span> 
                                    </div>
                                </div>
                            </div>
                            <div className={cx('modal__info')}>
                                <div className={cx('modal__info-list')}>
                                    <p className={cx('modal__info-title')}>Thông tin phòng</p>

                                    <div className={cx('modal__info-item')}>Tên phòng <span>{room?.name}</span> </div>
                                    <div className={cx('modal__info-item')}>Mô tả phòng <span>{room?.desc}</span> </div>
                                    <div className={cx('modal__info-item')}>Giá phòng <span>{room?.price?.toLocaleString('vi-VN')}</span> </div>
                                    <div className={cx('modal__info-item')}>Dịch vụ <span>{room?.overView}</span> </div>

                                </div>
                                <div className={cx('modal__info-list')}>
                                    <p className={cx('modal__info-title')}>Thông tin đặt phòng</p>

                                    <div className={cx('modal__info-item')}>
                                        Ngày đặt phòng 
                                        <span>{formattedDay(new Date(infoBooked?.bookingDate))} - {formattedTime(new Date(infoBooked?.bookingDate))}</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Ngày nhận phòng 
                                        <span>{formattedDay(new Date(infoBooked?.checkInDate))} - {formattedTime(new Date(infoBooked?.checkInDate))}</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Ngày trả phòng 
                                        <span>{formattedDay(new Date(infoBooked?.checkOutDate))} - {formattedTime(new Date(infoBooked?.checkOutDate))}</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Số ngày ở 
                                        <span>{infoBooked?.days} ngày</span> 
                                    </div>
                                </div>
                                <div className={cx('qr__code')}>
                                    <img src={infoBooked?.qrCode} alt='Qr Code'/>
                                </div>
                            </div>
                        </div>                  
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserBookingHistory;