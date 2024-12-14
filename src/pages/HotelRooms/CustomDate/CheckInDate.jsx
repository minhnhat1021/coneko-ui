import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import './CustomDate.css'

import React, { useState, useEffect, forwardRef } from "react"

import classNames from 'classnames/bind'
import styles from './CustomDate.module.scss'

const cx = classNames.bind(styles)



function CheckInDate({ dataCheckIn, endDate }) {

    
    const [startDate, setStartDate] = useState()
    const [minDate, setMinDate] = useState(new Date())
    
    
    // Max Date

    let maxDate = null
    if(endDate){
        maxDate = new Date(endDate)
        maxDate.setDate(endDate.getDate() - 1)
    }
    
    useEffect(() => {
        if (!endDate) {
            setMinDate(new Date())
        }
    }, [endDate])

    // Handle khi có thay đổi date
    const handleBackspaceInput = (e) => {
        if(e.keyCode === 8) {
            setStartDate(null)
            dataCheckIn(null)
        }   
    }   

    const handleOnchange = (date) => {
        console.log('date', date)
        // const vietnamTimezoneOffset = 7 * 60
        // const vietnamDate = new Date(date.getTime() + vietnamTimezoneOffset * 60 * 1000)
        // vietnamDate.setHours(12, 0, 0, 0)
        // setStartDate(vietnamDate)
        // dataCheckIn(vietnamDate)
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
            placeholder="Ngày nhận phòng"  
            className={cx('check-in-date' )}     
        />
    ))
    return (

        <div className={cx('wrapper')}>
            <DatePicker
                selected={startDate}
                onChange={(date) => handleOnchange(date)}
                dateFormat="dd/MM/yyyy"
                // minDate={minDate}
                maxDate={maxDate}
                customInput={<CustomInput />}
            />
        </div>
    )
}

export default CheckInDate