import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CustomDate.css'

import React, { useState, useEffect, forwardRef } from "react";

import classNames from 'classnames/bind'
import styles from './CustomDate.module.scss'

const cx = classNames.bind(styles)



function CheckInDate({ dataCheckIn, endDate, bookedDates }) {
    const [startDate, setStartDate] = useState()
    const [excludeDate, setExcludeDate] = useState()
    const convertDateStart = (date) => {
        const newDate = new Date(date)
        newDate.setHours(0, 0, 0, 0)
        return newDate;
    }
    const convertDateEnd = (date) => {

        const newDate = new Date(date)
        newDate.setDate(newDate.getDate() - 1)
        newDate.setHours(0, 0, 0, 0)
        return newDate
    }
    
    useEffect(() => {
        const updatedExcludeDate = bookedDates.map(user => ({
            start: convertDateStart(user.start),
            end: convertDateEnd(user.end) })
        )
        setExcludeDate(updatedExcludeDate)
    }, [bookedDates])
    
    const handleBackspaceInput = (e) => {
        if(e.keyCode === 8) {
            setStartDate(null)
            dataCheckIn(null)
        }   
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

    // Handle khi chọn lịch
    const handleOnchange = (date) => {
        const vietnamTimezoneOffset = 7 * 60
        const vietnamDate = new Date(date.getTime() + vietnamTimezoneOffset * 60 * 1000)
        vietnamDate.setHours(12, 0, 0, 0)
        setStartDate(vietnamDate)
        dataCheckIn(vietnamDate)
    }

    // Min date, max date
    const today = new Date()

    let prevDay = null
    if(endDate){
        prevDay = new Date(endDate)
        prevDay.setDate(endDate.getDate() - 1)
    }
    return (

        <div className={cx('wrapper')}>
            <DatePicker
                selected={startDate}
                onChange={(date) => handleOnchange(date)}
                dateFormat="dd/MM/yyyy"
                minDate={today}
                maxDate={prevDay}
                excludeDateIntervals={excludeDate}
                customInput={<CustomInput />}
            />
        </div>
    );
}

export default CheckInDate;