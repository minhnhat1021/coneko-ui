import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import * as managementService from '~/apiServices/managementServive'
import Button from '~/components/Button'

import classNames from 'classnames/bind'
import styles from './BookingTrash.module.scss'

const cx = classNames.bind(styles)

function BookingManagement({ adminData }) {
    const [bookings, setBookings] = useState([])

    useEffect( () => {
        const fetchApi = async () => {
            try {
                const res = await managementService.bookingTrash()
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

    // Checkbox-all actions
    const [action, setAction] = useState()
    const [statusAction, setStatusAction] = useState(false)
    const [disabledActions, setDisabledActions] = useState(true)

    useEffect(() => {
        var checkboxAll = document.getElementById('checkbox__all')
        var bookingCheckbox = document.querySelectorAll("input[name='bookingIds[]']")

        checkboxAll.onchange = (e) => {
            const isCheckAll = e.target.checked
            
            bookingCheckbox.forEach((checkbox) => {
                
                checkbox.checked = isCheckAll
                const countCheckboxChecked = document.querySelectorAll("input[name='bookingIds[]']:checked").length

                if(countCheckboxChecked > 0 ){
                    setDisabledActions(false)
                } else{
                    setDisabledActions(true)
                }
            })
            
        }
        
        bookingCheckbox.forEach((checkbox) => {
            checkbox.onchange = () => {
                const countCheckboxChecked = document.querySelectorAll("input[name='bookingIds[]']:checked").length
                const isCheckAll = bookingCheckbox.length === countCheckboxChecked
                checkboxAll.checked = isCheckAll

                if(countCheckboxChecked > 0 ){
                    setDisabledActions(false)
                } else{
                    setDisabledActions(true)
                }
            }
        }) 
        
    },[bookings])

    const handleActions = async() => {
        var checkboxChecked = Array.from(document.querySelectorAll("input[name='bookingIds[]']:checked"))
        const bookingIds = checkboxChecked.map(checkbox => checkbox.id)

        if(!action) {
            setStatusAction(true)
        } else {
            setStatusAction(false)
            const res = await managementService.bookingActions(action, bookingIds)

            if(res?.msg){
                window.location.href='/admin/booking-management'
            }
        }
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <h2 className={cx('title')}>Giao dịch đã bị xóa</h2>
                    <Link to='/admin/booking-management'>Danh sách giao dịch</Link>
                </div>

                <div id="actions" className={cx('actions')}>
                    <div className={cx('checkbox')}>
                        <input id='checkbox__all' name='available' options='' type="checkbox" className={cx('actions__checkbox')}/>
                        <label htmlFor='checkbox__all' className={cx('actions__label')}> Chọn tất cả</label>
                    </div>
                    <select  name="roomType" value={action} onChange={(e) => setAction(e.target.value)} >
                        <option value='' >-- Chọn hành động --</option>
                        <option value="restore">Khôi phục</option>
                        <option value="forceDelete">Xóa vĩnh viễn</option>
                    </select>
                    <Button onClick={handleActions} login disabled={disabledActions}>Thực hiện</Button>
                    {statusAction && <span className={cx('checkbox__msg')}>Vui lòng chọn hành động</span>}
                </div>
                <div className={cx('bookings')}>
                    <div className={cx('bookings__header')}>
                        <div>Thời gian thanh toán</div>
                        <div>Ngày nhận phòng</div>
                        <div>Ngày trả phòng</div>
                        <div>Số tiền</div>
                        <div>Hành động</div>
                    </div>
                    {bookings?.map((booking, index) => (
                        <div className={cx('wrap__bookings-body')}>
                            <div className={cx('bookings__body')} key={index} onClick={() => handleBookingsDetails(booking, booking._id)}>
                                <div className={cx('bookings__body-item')}> 
                                    <div>{bookings ? formattedDay(new Date(booking.bookingDate)) : ''}</div> 
                                    <div>{bookings ? formattedTime(new Date(booking.bookingDate)) : ''}</div>
                                </div>
                                <div className={cx('bookings__body-item')}>
                                    <div>{bookings ? formattedDay(new Date(booking.checkInDate)) : ''}</div>
                                    <div>{bookings ? formattedTime(new Date(booking.checkInDate)) : ''}</div>
                                </div>
                                <div className={cx('bookings__body-item')}>
                                    <div>{bookings ? formattedDay(new Date(booking.checkOutDate)) : ''}</div>
                                    <div>{bookings ? formattedTime(new Date(booking.checkOutDate)) : ''}</div>
                                </div>
                                <div className={cx('bookings__body-item')}>{booking?.amountSpent?.toLocaleString('vi-VN')}</div>
    
                                
                            </div>
                            <div className={cx('checkbox', 'checkbox__body')}>
                                <input id={booking._id} vaule={booking._id} name='bookingIds[]' type="checkbox" className={cx('actions__checkbox')}/>
                                <label htmlFor={booking._id} className={cx('actions__label')}> </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BookingManagement

