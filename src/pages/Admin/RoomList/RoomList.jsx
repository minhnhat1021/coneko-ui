import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import images from '~/assets/images'
import Button from '~/components/Button'

import classNames from 'classnames/bind'
import styles from './RoomList.module.scss'

const cx = classNames.bind(styles)

function RoomList() {
    const [roomData, setRoomData] = useState([])
    console.log(roomData)
    useEffect(() => {
        axios.get('http://localhost:5000/api/admin/room-list') 
            .then((res) => {
                setRoomData(res.data)
            })
            .catch((err) => console.error(err) )  
    }, [])
    
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/admin/${id}/room-delete`, {
            data: {id}
        })
           .then(() => window.location.href='http://localhost:3000/admin/room-list')
           .catch(err => console.error(err))
        
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('options')}>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'
                        onChange={() => {}}
                    />
                    <label htmlFor='filter-available'>Phòng còn trống</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'

                        onChange={() => {}}
                    />
                    <label htmlFor='filter-price-low'>Phòng đã đặt</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'
                        onChange={() => {}}
                    />
                    <label htmlFor='filter-available'>Phòng đang sử dụng</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'

                        onChange={() => {}}
                    />
                    <label htmlFor='filter-price-low'>Giường đơn</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'
                        onChange={() => {}}
                    />
                    <label htmlFor='filter-available'>Giường đôi</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'

                        onChange={() => {}}
                    />
                    <label htmlFor='filter-price-low'>1 giường</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'
                        onChange={() => {}}
                    />
                    <label htmlFor='filter-available'>2 giường</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'

                        onChange={() => {}}
                    />
                    <label htmlFor='filter-price-low'>3 giường</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'

                        onChange={() => {}}
                    />
                    <label htmlFor='filter-price-low'>1 người</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'
                        onChange={() => {}}
                    />
                    <label htmlFor='filter-available'>2 người</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'
                        onChange={() => {}}
                    />
                    <label htmlFor='filter-available'>3 người</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'
                        onChange={() => {}}
                    />
                    <label htmlFor='filter-available'>4 sao</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'
                        onChange={() => {}}
                    />
                    <label htmlFor='filter-available'>5 sao</label>
                </div>
                <div className={cx('option__item')}>
                    <input
                        type='checkbox'

                        onChange={() => {}}
                    />
                    <label htmlFor='filter-price-low'>hút thuốc</label>
                </div>

            </div>
            <div className={cx('room__list')}>  
                { roomData.length > 0 ?  
                    (roomData.map((room, index) => 
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
                                <Button adminUpdate to={`/admin/${room._id}/room-edit`}>Sửa</Button>
                                <Button adminDelete onClick={() => handleDelete(room._id)} >Xóa</Button>
                            </footer>
                        </div>
                    )) : <div className={cx('notification')} >
                            Chưa có phòng nào được tạo.
                            <Link to='/admin/create-room' className={cx('notification__link')} >Tạo phòng mới</Link>
                        </div>
                }     

                <div className={cx('modal__delete')}>
                    <div className={cx('modal__header')}>
                        
                    </div>
                    <div className={cx('modal__body')}>
                        <button type='button'>Xóa</button>
                        <button type='button'>Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomList