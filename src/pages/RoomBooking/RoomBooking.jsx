import { useState, useEffect, useRef } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios'


import classNames from 'classnames/bind'
import styles from './RoomBooking.module.scss'

const cx = classNames.bind(styles)


function HotelRooms() {
    const { name } = useParams();
    // lấy ra thông tin phòng
    const [room, setRoom] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:5000/api/room/${name}/room-detail`)
            .then(res => {
                setRoom(res.data.data)
            })
            .catch(err => console.error(err) )
    }, [])

    // Lấy ra thông tin user đặt phòng
    const [userData, setUserData] = useState({})

    const [token, setToken] = useState(localStorage.getItem('token'))
    useEffect(() => {
        axios.post('http://localhost:5000/api/user', {
            token
        }) 
        .then(res => {setUserData(res.data)} )
        .catch(err => console.error(err) )
    }, [token])

    // Lấy thông tin mà khách đã chọn khi đặt phòng
    const location = useLocation();
    const { startDate, endDate, days, totalPrice } = location.state
    
    // Thực hiện thanh toán phòng
    const handlePayment = (e) => {
        e.preventDefault()

        axios.post('http://localhost:5000/api/room/payment', {
            startDate,
            endDate,
            days,
            totalPrice,
            roomId: room._id,
            userId: userData._id
        })

            .then((res) => {console.log(res.data)})

            .catch((err) => console.error(err.response.data.data?.message) )  
    }
    
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                
                <button onClick={handlePayment}>Thanh toán</button>
            </div>
        </div>
        
    );
}

export default HotelRooms;
