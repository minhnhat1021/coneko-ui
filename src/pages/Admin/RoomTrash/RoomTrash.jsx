import { useState, useEffect } from 'react'
import * as managementService from '~/apiServices/managementServive'
import Button from '~/components/Button'

import classNames from 'classnames/bind'
import styles from './RoomTrash.module.scss'

const cx = classNames.bind(styles)

function RoomTrash() {

    const [roomData, setRoomData] = useState([])

    useEffect(() => {
        const fetchApi = async() => {
            const res = await managementService.trashRooms()
            setRoomData(res)
        }
        fetchApi()

    }, [])
    
    const handleRestore = async (id) => {
        const res = await managementService.restoreRoom(id)
        if(res.msg) {
             window.location.href='http://localhost:3000/admin/room-trash'
        }
    }
    const handleDelete = async (id) => {
        const res = await managementService.forceDeleteRoomById(id)
        if(res.msg) {
             window.location.href='http://localhost:3000/admin/room-trash'
        }
    }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                Danh sách phòng đã xóa
            </div>

            <div className={cx('room__list')}>  

            {roomData?.length > 0 ? 
                (roomData.map((room, index) => 
                    <div key={index} className={cx('room__item')}>
                        <a href='/hotel-rooms/' className={cx('room__image')}>
                            <img
                                src={room?.images ? `http://localhost:5000/images/roomImg/${room?.images?.image1}` : ''} 
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
                )) : <div className={cx('notification')} >
                        Chưa có phòng nào bị xóa
                </div>
            }
            </div>
        </div>
    )
}

export default RoomTrash