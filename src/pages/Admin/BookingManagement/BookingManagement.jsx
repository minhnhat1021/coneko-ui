import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom'

import * as managementService from '~/apiServices/managementServive'
import Button from '~/components/Button'

import classNames from 'classnames/bind'
import styles from './BookingManagement.module.scss'

const cx = classNames.bind(styles)

function BookingManagement({ adminData }) {
    const [bookings, setBookings] = useState([])

    useEffect( () => {
        const fetchApi = async () => {
            try {
                const res = await managementService.bookingManagement('http://localhost:5000/api/admin/booking-management')
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

    // options -------------------------------------------
    const [options, setOptions] = useState({
        silver: false,
        gold: false,
        platinum: false,
        diamond: false,
        vip: false,
    })

    useEffect(() => {
        var optionInputs = document.querySelectorAll('[name][options]')
        for(var optionInput of optionInputs) {
            optionInput.onchange = function () {
                var name = this.getAttribute('name')
                var isChecked = this.checked

                setOptions(prev => ({
                    ...prev,
                    [name]: isChecked 
                }))
            }
        }
    }, [])

    useEffect(() => {
        console.log(options)
        const handleFilter = async() => {
            const filters = Object.keys(options).filter(
              (key) => options[key] === true
            )
    
            const res = await managementService.filterBookingByOptions(filters)
            setBookings(res?.bookings)
    
        }
        handleFilter()
    },[options])


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
                <h2 className={cx('title')}>Lịch sử giao dịch của khách hàng</h2>
                <div className={cx('options')}>
                    <div className={cx('option__item')}>
                        <input id='silver' name='silver' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='silver' className={cx('options__label')}></label>
                        <p>Dưới 20tr</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='gold' name='gold' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='gold' className={cx('options__label')}></label>
                        <p>20tr - 50tr</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='platinum' name='platinum' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='platinum' className={cx('options__label')}></label>
                        <p>50tr - 70tr</p>
                    </div>
                    
                    <div className={cx('option__item')}>
                        <input id='diamond' name='diamond' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='diamond' className={cx('options__label')}></label>
                        <p>70tr - 100 tr</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='vip' name='vip' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='vip' className={cx('options__label')}></label>
                        <p>Trên 100tr</p>
                    </div>
                    
                </div>
                <div id="actions" className={cx('actions')}>
                    <div className={cx('checkbox')}>
                        <input id='checkbox__all' name='available' options='' type="checkbox" className={cx('actions__checkbox')}/>
                        <label htmlFor='checkbox__all' className={cx('actions__label')}> Chọn tất cả</label>
                    </div>
                    <select  name="roomType" value={action} onChange={(e) => setAction(e.target.value)} >
                        <option value='' >-- Chọn hành động --</option>
                        <option value="delete">Xóa</option>
                    </select>
                    <Button onClick={handleActions} login disabled={disabledActions}>Thực hiện</Button>
                    {statusAction && <span className={cx('checkbox__msg')}>Vui lòng chọn hành động</span>}
                </div>
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
                                <tr className={cx('table_tr')} key={index} onClick={() => handleBookingsDetails(booking, booking._id)}>
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
                                    <td>{booking?.amountSpent?.toLocaleString('vi-VN')}</td>
                                    <td className={cx('status', 'thanhcong')}>Thành công</td>

                                    <div className={cx('checkbox')}>
                                        <input id={booking._id} vaule={booking._id} name='bookingIds[]' type="checkbox" className={cx('actions__checkbox')}/>
                                        <label htmlFor={booking._id} className={cx('actions__label')}> </label>
                                    </div>
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

