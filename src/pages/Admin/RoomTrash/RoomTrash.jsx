import { useState, useEffect } from 'react'
import axios from 'axios'

import images from '~/assets/images'

import Button from '~/components/Button'

import classNames from 'classnames/bind'
import styles from './RoomTrash.module.scss'

const cx = classNames.bind(styles)

function RoomTrash() {

    const [roomData, setRoomData] = useState([])
    useEffect(() => {
        // fetch data from API
        axios.get('http://localhost:5000/api/admin/room-trash')
            .then(response => {
                setRoomData(response.data)
            })
            .catch(error => {
                console.error(error)
            })
    }, [])
    
    const handleRestore = (id) => {
        axios.patch(`http://localhost:5000/api/admin/${id}/room-restore`)
            .then(() => window.location.href='http://localhost:3000/admin/room-trash')
            .catch(error => {
                console.error(error)
            })
    }
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/admin/${id}/room-force`)
            .then(() => window.location.href='http://localhost:3000/admin/room-trash')
            .catch(error => {
                console.error(error)
            })
    }
    return ( 
        <div className={cx('wrapper')}>
            Phòng đã xóa

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
                                <p className={cx('room__name')}>
                                    {room.name}
                                </p>
                                <p className={cx('room__floor')}>
                                    Tầng {room.floor}
                                </p>
                            </div>
                            <div className={cx('room__body-child')}>
                                <p className={cx('room__bed-type')}>
                                    {room.bedType} 
                                </p>
                                <p className={cx('room__bed-count')}>
                                    {room.bedCount} giường
                                </p>
                            </div>
                            <div className={cx('room__body-child')}>
                                <p className={cx('room__star-rating')}>
                                    {room.rating} sao
                                </p> 
                                <p className={cx('room__capacity')}>
                                    {room.capacity} người
                                </p>

                            </div>
                            <div className={cx('room__body-child')}>
                                <p className={cx('room__status')}>
                                    {room.status}
                                </p> 
                                <p className={cx('room__price')}>
                                    {room.price}
                                </p> 
                            </div>
                        </main>
                        <footer className={cx('room__footer')}>                         
                            <Button adminUpdate onClick={() => handleRestore(room._id)}>Khôi Phục</Button>
                            <Button adminDelete onClick={() => handleDelete(room._id)} >Xóa</Button>
                        </footer>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RoomTrash