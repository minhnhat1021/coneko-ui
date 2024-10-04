import React, { useEffect, useState } from 'react'
import * as loadService from '~/apiServices/loadService'
import { Link, useNavigate } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './BookingManagement.module.scss'

const cx = classNames.bind(styles)

function BookingManagement({userData}) {
    const [bookings, setBookings] = useState([])

    useEffect( () => {
        const fetchApi = async () => {
            try {
                const res = await loadService.bookingManagement('http://localhost:5000/api/admin/booking-management')
                setBookings(res.bookings)
            } catch (error) {
                console.error('gọi api lỗi', error)
            }
        }
        fetchApi()
    }, [])


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
    const navigate = useNavigate()

    const handleBookingsDetails = (booking, id) => {
        navigate(`details/${id}`, {
            state: { booking }
        })
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
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
                            {bookings?.map((booking, index) => (
                                <tr key={index} onClick={() => handleBookingsDetails(booking, booking._id)}>
                                    <td> 
                                        <div>{bookings ? formattedDay(new Date(booking.bookingDate)) : ''}</div> 
                                        <div>{bookings ? formattedTime(new Date(booking.bookingDate)) : ''}</div>
                                    </td>
                                    <td>
                                        <div>{bookings ? formattedDay(new Date(booking.checkInDate)) : ''}</div>
                                        <div>{bookings ? formattedTime(new Date(booking.checkInDate)) : ''}</div>
                                    </td>
                                    <td>
                                        <div>{bookings ? formattedDay(new Date(booking.checkOutDate)) : ''}</div>
                                        <div>{bookings ? formattedTime(new Date(booking.checkOutDate)) : ''}</div>
                                    </td>
                                    <td>{booking.amountSpent}</td>
                                    <td className={cx('status', 'thanhcong')}>Thành công</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default BookingManagement

