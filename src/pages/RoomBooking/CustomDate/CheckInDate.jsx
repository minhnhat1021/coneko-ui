import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import './CustomDate.css'
import { Tooltip } from 'react-tooltip'

import React, { useState, useEffect, forwardRef } from "react"

import classNames from 'classnames/bind'
import styles from './CustomDate.module.scss'

const cx = classNames.bind(styles)



function CheckInDate({ dataCheckIn, endDate, bookedDates }) {

    
    const [startDate, setStartDate] = useState()
    const [excludeDate, setExcludeDate] = useState([])
    const [minDate, setMinDate] = useState(new Date())

    
    // Max Date

    let maxDate = null
    if(endDate){
        maxDate = new Date(endDate)
        maxDate.setDate(endDate.getDate() - 1)
    }

    // Chuyển đổi date về đúng định dạng để xử lý logic
    const convertDateStart = (date) => {
        const newDate = new Date(date)
        newDate.setHours(0, 0, 0, 0)
        return newDate
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
            end: convertDateEnd(user.end)})
        )
        setExcludeDate(updatedExcludeDate)

        // Handle xử lý max date
        const validRanges = bookedDates.filter(
            (range) => new Date(range.end) < new Date(endDate)
        )
        const validRangesTime = validRanges.map(range =>
            new Date(range.end).getTime()
        )
        
        if (validRanges.length > 0) {
            const maxPrevRange = Math.max(...validRangesTime)
            setMinDate(new Date(maxPrevRange))
        } 
        if (!endDate) {
            setMinDate(new Date())
        }
    }, [bookedDates, endDate])

    // Handle khi có thay đổi date
    const handleBackspaceInput = (e) => {
        if(e.keyCode === 8) {
            setStartDate(null)
            dataCheckIn(null)
        }   
    }   

    const handleOnchange = (date) => {
        const vietnamTimezoneOffset = 7 * 60
        const vietnamDate = new Date(date.getTime() + vietnamTimezoneOffset * 60 * 1000)
        vietnamDate.setHours(12, 0, 0, 0)
        setStartDate(vietnamDate)
        dataCheckIn(vietnamDate)
    }

    // Logic hiển thị tooltip khi hover vào những phòng đã đặt
    const formattedDate = (date) => {
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear()
    }

    const renderDayContents = (day, date) => {

        const isBooked = excludeDate.some((range) => {

            const dateCurrent = new Date(formattedDate(date)).getTime()
            const dateBookedStart = new Date(formattedDate(range.start)).getTime()
            const dateBookedEnd = new Date(formattedDate(range.end)).getTime()

            return dateCurrent >= dateBookedStart && dateCurrent <= dateBookedEnd
        })
        return (
            <>
                <div
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={isBooked ? "Phòng đã được đặt" : ""}
                >
                    {day}
                </div>
                {isBooked && <Tooltip id="my-tooltip"/>}
            </>
        )
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
                minDate={minDate}
                maxDate={maxDate}
                excludeDateIntervals={excludeDate}
                renderDayContents={renderDayContents}
                customInput={<CustomInput />}
            />
        </div>
    )
}

export default CheckInDate