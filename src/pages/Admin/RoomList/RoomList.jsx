import { useState, useEffect } from 'react'
import axios from 'axios'

import images from '~/assets/images'

import classNames from 'classnames/bind'
import styles from './RoomList.module.scss'

const cx = classNames.bind(styles)

function RoomList() {
    const [roomData, setRoomData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/room-list') 
            .then((res) => {
                setRoomData(res.data)
            })
            .catch((err) => console.error(err) )  
    }, [])
    return ( 
        <div className={cx('wrapper')}>
            {/* <h2 className={cx('room__title')}>Danh sách phòng</h2> */}
            <div className={cx('room__list')}>  
                {roomData.map((room, index) => 
                    <div key={index} className={cx('room__item')}>
                        <a href='/hotel-rooms/' className={cx('room__image')}>
                            <img
                                src={`http://localhost:5000/images/roomImg/${room.image}`}
                                alt='coneko'
                            />
                        </a>
                        <main className={cx('room__body')}>
                            <div className={cx('room__body-child')}>
                                <h3 className={cx('room__name')}>
                                    {room.name}
                                </h3>
                                <p className={cx('room__desc')}>
                                    {room.desc} 
                                </p>
                            </div>
                            <div className={cx('room__body-child')}>
                                <p className={cx('room__bed-type')}>
                                    Kiểu giường: {room.bedType} 
                                </p>
                                <p className={cx('room__bed-count')}>
                                    Số lượng giường: {room.bedCount}
                                </p>
                            </div>
                            <div className={cx('room__body-child')}>
                                <p className={cx('room__floor')}>
                                    Tầng số: {room.floor}
                                </p>
                                <p className={cx('room__capacity')}>
                                    Sức chứa tối đa: {room.capacity}
                                </p>
                            </div>
                            <div className={cx('room__body-child')}>
                                <div className={cx('room__star-rating')}>

                                {[...Array(Number(room.rating))].map((icon, index) => (
                                    <i key={index} className={cx('fa-solid fa-star')}></i>)
                                )}
                                </div> 
                                <h3 className={cx('room__overview')}>
                                    {room.overView}
                                </h3>
                            </div>
                            <div className={cx('room__body-child')}>
                                <p className={cx('room__status')}>
                                    Trạng thái: {room.status}
                                </p> 
                            </div>
                            <div className={cx('room__body-child')}>
                                <div className={cx('room__price')}>
                                    Giá: {room.price}
                                </div> 
                            </div>
                        </main>
                        <footer className={cx('room__footer')}>                         
                            
                        </footer>
                    </div>
                )}           

            </div>
        </div>
    );
}

export default RoomList;