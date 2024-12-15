
import React, { useEffect, useState } from 'react'
import * as roomService from '~/apiServices/roomService'
import moment from 'moment'
import * as managementService from '~/apiServices/managementServive'

import classNames from 'classnames/bind'
import styles from './UserCurrentRooms.module.scss'
import {Button} from 'antd'

const cx = classNames.bind(styles)

function UserBookingHistory({ userData }) {
    const user = userData
    const [currentRooms, setCurrentRooms] = useState([])
    useEffect(() => {
        const dateNow = moment()?._d
        const currentRooms = userData?.bookedRooms?.filter(booked => moment(booked?.checkOutDate)?._d > dateNow)
        setCurrentRooms(currentRooms)
    }, [userData])
    
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
    const [infoCurrent, setInfoCurrent] = useState({})

    const handleShowModal = async (current) => {
        
        const roomData = await roomService.roomDetailById(current.roomId)
        
        setRoom(roomData)
        setInfoCurrent(current)
        setShowModal(true)
    }
    const handleModal = (e) => {
        setShowModal(false)
    }
    const handleModalContent = (e) => {
        e.stopPropagation()
    }

    const handleCancelBooking = async(currentRoom) => {
        const res = await managementService.cancelBooked(currentRoom?.bookingId)
        console.log(currentRoom)
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
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentRooms?.map((currentRoom, index) => (
                            <tr >
                                <td onClick = {() => handleShowModal(currentRoom)} key={index}> 
                                    <div>{currentRooms ? formattedDay(new Date(currentRoom.bookingDate)) : ''}</div> 
                                    <div>{currentRooms ? formattedTime(new Date(currentRoom.bookingDate)) : ''}</div>
                                </td>
                                <td onClick = {() => handleShowModal(currentRoom)} key={index}>
                                    <div>{currentRooms ? formattedDay(new Date(currentRoom.checkInDate)) : ''}</div>
                                    <div>{currentRooms ? formattedTime(new Date(currentRoom.checkInDate)) : ''}</div>
                                </td>
                                <td onClick = {() => handleShowModal(currentRoom)} key={index}>
                                    <div>{currentRooms ? formattedDay(new Date(currentRoom.checkOutDate)) : ''}</div>
                                    <div>{currentRooms ? formattedTime(new Date(currentRoom.checkOutDate)) : ''}</div>
                                </td>
                                <td onClick = {() => handleShowModal(currentRoom)} key={index}>
                                    {currentRoom?.totalPrice?.toLocaleString('vi-VN')}
                                </td>
                                <td className={cx('status', 'btn')}>
                                    {moment().isBefore(moment(currentRoom?.checkInDate).subtract(1, 'days')) &&
                                        <Button onClick={() => handleCancelBooking(currentRoom)}>Hủy đặt phòng</Button>
                                    }
                                </td>
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
                                        <span>{infoCurrent?.roomPrice?.toLocaleString('vi-VN')} ₫</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Tổng phí phòng ( {infoCurrent?.days} ngày )
                                        <span>{infoCurrent?.roomCharge?.toLocaleString('vi-VN')} ₫</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Phí dịch vụ ( 1 ngày )
                                        <span>{infoCurrent?.amenitiesPrice?.toLocaleString('vi-VN')} ₫</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Dịch vụ gồm có
                                        <span>
                                            {Object.entries(infoCurrent?.amenities || {})
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
                                            {Object.entries(infoCurrent?.amenities || {})
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
                                        Tổng phí dịch vụ ( {infoCurrent?.days} ngày )
                                        <span>{infoCurrent?.amenitiesCharge?.toLocaleString('vi-VN')} ₫</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Tổng chi phí 
                                        <span>{infoCurrent?.amountSpent?.toLocaleString('vi-VN')} ₫</span> 
                                    </div>
                                </div>
                            </div>
                            <div className={cx('modal__info')}>
                                <div className={cx('modal__info-list')}>
                                    <p className={cx('modal__info-title')}>Thông tin phòng</p>

                                    <div className={cx('modal__info-item')}>Tên phòng <span>{room?.name}</span> </div>
                                    <div className={cx('modal__info-item')}>Mô tả phòng <span>{room?.desc}</span> </div>
                                    <div className={cx('modal__info-item')}>Giá phòng <span>{room?.price?.toLocaleString('vi-VN')}</span> </div>

                                </div>
                                <div className={cx('modal__info-list')}>
                                    <p className={cx('modal__info-title')}>Thông tin đặt phòng</p>

                                    <div className={cx('modal__info-item')}>
                                        Ngày đặt phòng 
                                        <span>{formattedDay(new Date(infoCurrent?.bookingDate))} - {formattedTime(new Date(infoCurrent?.bookingDate))}</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Ngày nhận phòng 
                                        <span>{formattedDay(new Date(infoCurrent?.checkInDate))} - {formattedTime(new Date(infoCurrent?.checkInDate))}</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Ngày trả phòng 
                                        <span>{formattedDay(new Date(infoCurrent?.checkOutDate))} - {formattedTime(new Date(infoCurrent?.checkOutDate))}</span> 
                                    </div>
                                    <div className={cx('modal__info-item')}>
                                        Số ngày ở 
                                        <span>{infoCurrent?.days} ngày</span> 
                                    </div>
                                </div>
                                <div className={cx('qr__code')}>
                                    <img src={infoCurrent?.qrCode} alt='Qr Code'/>
                                </div>
                            </div>
                        </div>                  
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBookingHistory