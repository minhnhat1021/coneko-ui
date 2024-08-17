import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './CustomDate.css'

import React, { useState, forwardRef } from "react";

import classNames from 'classnames/bind'
import styles from './CustomDate.module.scss'

const cx = classNames.bind(styles)

const CustomInput = forwardRef(({ value, onClick, onFocus }, ref) => (
  <input
      ref={ref}         
      value={value}     
      onClick={onClick} 
      onFocus={onFocus} 
      placeholder="Ngày trả phòng"  
      className={cx('check-in-date' )}     
    />
));

function CheckInDate() {

const [startDate, setStartDate] = useState();
console.log(startDate)
    return (

      <div className={cx('wrapper')}>
          <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className={cx('check-in-date' )}
              placeholderText="Ngày trả phòng"
              customInput={
                  <CustomInput />
              }
            
          />
      </div>
    );
}

export default CheckInDate;