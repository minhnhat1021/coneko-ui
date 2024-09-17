
import React from 'react';

import classNames from 'classnames/bind';
import styles from './UserBookingHistory.module.scss';

const cx = classNames.bind(styles);

function UserBookingHistory({ userData }) {
    const user = userData.data.data
    const bookedRooms = user.bookedRooms
    console.log(bookedRooms)
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
                            <th>Tiện nghi</th>
                            <th>Số tiền</th>
                            <th>Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {bookedRooms.map((bookedRoom) => (
                            <tr>
                                <td>{bookedRoom.bookingDate} </td>
                                <td>28/09/2024</td>
                                <td>30/09/2024</td>
                                <td>Cà phê, Bữa sáng, Netflix</td>
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