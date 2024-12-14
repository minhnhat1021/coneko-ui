import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import './CustomDate.css'
import { Tooltip } from 'react-tooltip'

import React, { useState, useEffect, forwardRef } from "react"

import classNames from 'classnames/bind'
import styles from './CustomDate.module.scss'

const cx = classNames.bind(styles)



function CheckOutDate({ dataCheckOut, startDate , bookedDates }) {

    const [endDate, setEndDate] = useState()
    // Handle min max Date
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    
    let nextDay = tomorrow

    if (startDate) {
        nextDay = new Date(startDate)
        nextDay.setDate(startDate.getDate() + 1)
    }

    // Chuyển đổi date về đúng định dạng để xử lý logic
    const convertDateStart = (date) => {
        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() + 1)
        newDate.setHours(0, 0, 0, 0)
        return newDate
    }
    const convertDateEnd = (date) => {

        const newDate = new Date(date)
        newDate.setHours(0, 0, 0, 0)
        return newDate
    }

    // Handle khi có thay đổi date
    const handleBackspaceInput = (e) => {
        if(e.keyCode === 8) {
            setEndDate(null)
            dataCheckOut(null)
        }
    }
    
    const handleOnchange = (date) => {
        const vietnamTimezoneOffset = 7 * 60
        const vietnamDate = new Date(date.getTime() + vietnamTimezoneOffset * 60 * 1000)
        vietnamDate.setHours(10, 0, 0, 0)
        setEndDate(vietnamDate)
        dataCheckOut(vietnamDate)
    }

    
    // Logic hiển thị tooltip khi hover vào những phòng đã đặt
    const formattedDate = (date) => {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    }
    
    

    const CustomInput = forwardRef(({ value, onClick }, ref) => (
        <input
            ref={ref}         
            value={value}    
            onClick={onClick} 
            onKeyDown={(e) => handleBackspaceInput(e)}
            placeholder="Ngày trả phòng"  
            className={cx('check-in-date' )}     
        />
    ))
    return (

        <div className={cx('wrapper')}>
            <DatePicker
                selected={endDate}
                onChange={(date) => handleOnchange(date)}
                dateFormat="dd/MM/yyyy"
                minDate={nextDay}
                customInput={<CustomInput />}
            
            />
        </div>
    )
}

export default CheckOutDate