import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import images from '~/assets/images';

import classNames from 'classnames/bind'
import styles from './HotelRooms.module.scss'

const cx = classNames.bind(styles)

function HotelRooms() {
    const [roomData, setRoomData] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/api/rooms') 
            .then(res => {setRoomData(res.data)} )
            .catch(err => console.error(err) )
    }, [])
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('room__list')}> 
                    {roomData.map((room, index) => 
                        <Link to={`/${room.name}/room-detail`} key={index} className={cx('room__item')}>
                            <a href='/hotel-rooms/' className={cx('room__image')}>
                                <img
                                    src={`http://localhost:5000/images/roomImg/${room.image}`}
                                    alt='{{this.name}}'
                                />
                            </a>
                            <main className={cx('room__body')}>
                                <a href='/hotel-rooms/' className={cx('room__title')}>
                                    <h5>{room.name}</h5>
                                </a>
                                <div className={cx('room__star-rating')}>
                                    {[...Array(Number(room.rating))].map((a, index) => (
                                        <i key={index} className={cx('fa-solid fa-star')}></i>
                                    ))}
                                    
                                </div>  
                                <p className={cx('room__des')}>
                                    {room.desc}
                                </p>
                            </main>
                            <footer className={cx('room__footer')}>
                                <div className={cx('room__overview')}>
                                    {room.overView}
                                </div>
                                <div className={cx('room__price')}>
                                    {room.price}
                                </div>
                            </footer>
                        </Link>
                    )}
                    
                </div>
            </div>
        </div>
    );
}

export default HotelRooms;