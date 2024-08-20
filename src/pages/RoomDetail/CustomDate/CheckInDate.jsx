import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CustomDate.css'

import React, { useState, useEffect, forwardRef } from "react";

import classNames from 'classnames/bind'
import styles from './CustomDate.module.scss'

const cx = classNames.bind(styles)



function CheckInDate({ dataCheckIn, endDate, bookedDates }) {
    const [startDate, setStartDate] = useState()
    
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
    const handleOnchange = (date) => {
        setStartDate(date)
        dataCheckIn(date)
    }
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
                excludeDateIntervals={bookedDates}
                customInput={<CustomInput />}
            />
        </div>
    );
}

export default CheckInDate;