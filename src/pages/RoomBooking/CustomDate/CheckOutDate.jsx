import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import './CustomDate.css'

import React, { useState, forwardRef } from "react"

import classNames from 'classnames/bind'
import styles from './CustomDate.module.scss'

const cx = classNames.bind(styles)



function CheckOutDate({ dataCheckOut, startDate , bookedDates }) {
    const [endDate, setEndDate] = useState()

    const handleBackspaceInput = (e) => {
        if(e.keyCode === 8) {
            setEndDate(null)
            dataCheckOut(null)

        }
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
    const handleOnchange = (date) => {
        const vietnamTimezoneOffset = 7 * 60
        const vietnamDate = new Date(date.getTime() + vietnamTimezoneOffset * 60 * 1000)
        vietnamDate.setHours(10, 0, 0, 0)
        setEndDate(vietnamDate)
        dataCheckOut(vietnamDate)
    }
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)
    
    let nextDay = tomorrow

    if (startDate) {
        nextDay = new Date(startDate)
        nextDay.setDate(startDate.getDate() + 1)
    }

    return (

        <div className={cx('wrapper')}>
            <DatePicker
                selected={endDate}
                onChange={(date) => handleOnchange(date)}
                dateFormat="dd/MM/yyyy"
                minDate={nextDay}
                excludeDateIntervals={bookedDates}
                customInput={<CustomInput />}
            
            />
        </div>
    )
}

export default CheckOutDate