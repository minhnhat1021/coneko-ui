import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CustomDate.css'

import React, { useState, forwardRef } from "react";

import classNames from 'classnames/bind'
import styles from './CustomDate.module.scss'

const cx = classNames.bind(styles)



function CheckOutDate({ dataCheckOut }) {

    const [endDate, setEndDate] = useState()
    
    const handleBackspaceInput = (e) => {
        if(e.keyCode === 8) {
            setEndDate(null)
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
        setEndDate(date)
        dataCheckOut(date)
    }
    return (

        <div className={cx('wrapper')}>
            <DatePicker
                selected={endDate}
                onChange={(date) => handleOnchange(date)}
                dateFormat="dd/MM/yyyy"
                customInput={<CustomInput />}
            
            />
        </div>
    );
}

export default CheckOutDate;