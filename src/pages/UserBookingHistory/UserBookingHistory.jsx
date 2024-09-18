
import React from 'react';

import classNames from 'classnames/bind';
import styles from './UserBookingHistory.module.scss';

const cx = classNames.bind(styles);

function UserBookingHistory({ userData }) {
    const user = userData.data
    const bookedRooms = user.bookedRooms

    console.log(new Date(bookedRooms[0].checkInDate))
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
                        
                        {bookedRooms.map((bookedRoom) => (
                            <tr>
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
                                <td>{bookedRoom.amountSpent}</td>
                                <td className={cx('status', 'thanhcong')}>Thành công</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserBookingHistory;