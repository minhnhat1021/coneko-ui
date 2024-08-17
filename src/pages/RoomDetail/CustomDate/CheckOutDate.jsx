import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CustomDate.css'

import React, { useState, forwardRef } from "react";

import classNames from 'classnames/bind'
import styles from './CustomDate.module.scss'

const cx = classNames.bind(styles)

const CustomInput = forwardRef(({ value, onClick, onFocus, onKeyDown }, ref) => (
    <input
        ref={ref}         
        value={value}     
        onClick={onClick} 
        onFocus={onFocus} 
        onKeyDown={onKeyDown}
        placeholder="Ngày trả phòng"  
        className={cx('check-in-date' )}     
      />
));

function CheckOutDate() {
  
    const [startDate, setStartDate] = useState();
    console.log(startDate)
    const handleKeyDown = (event) => {
      // Kiểm tra nếu phím Backspace được nhấn
      if (event.keyCode === 8) {
        setStartDate(null);  // Đặt lại giá trị startDate về null
      }
    };
    return (

      <div className={cx('wrapper')}>
          <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className={cx('check-in-date' )}
              placeholderText="Ngày trả phòng"
              customInput={
                  <CustomInput 
                    onKeyDown={handleKeyDown}
                  />
              }
            
          />
      </div>
    );
}

export default CheckOutDate;