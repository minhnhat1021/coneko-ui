import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { Tooltip } from 'react-tooltip'

import * as userService from '~/apiServices/userService'

import classNames from 'classnames/bind'
import styles from './UserFavoriteRooms.module.scss'

const cx = classNames.bind(styles)

function UserFavoriteRooms({ userData }) {
    const user = userData
    const favoriteRooms = user.favoriteRooms

    // Phòng ưa thích
    const [favorite, setFavorite] = useState({})

    useEffect(() => {
        const initialFavorites = {}
        favoriteRooms.forEach(room => {
            initialFavorites[room._id] = true 
        })

        setFavorite(initialFavorites)

    }, [favoriteRooms]) 

    const handleFavoriteRooms = (e, roomId) => {

        setFavorite((prev) => ({
            ...prev,
            [roomId]: !prev[roomId] 
        }))

        var isChecked = e.target.checked
        
        if (isChecked) {
            console.log('lưu', roomId)
            userService.addFavoriteRooms( {userId: user._id, roomId})
        } else {
            console.log('bỏ lưu', roomId)
            userService.removeFavoriteRooms( {userId:user._id, roomId})
        }

    }
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('room__list')}>  
                    { favoriteRooms.length > 0 ?  
                        (favoriteRooms.map((room, index) => 
                            <div key={index} className={cx('room__item')}>
                                <Link to={`/${room.name}/room-booking`} className={cx('wrap__info')}>
                                    <img
                                        src={room?.images ? `http://localhost:5000/images/roomImg/${room?.images?.image1}` : ''}
                                        alt='coneko'
                                    />
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
                                </Link>
                                <footer className={cx('room__footer')}>                         
                                    <input 
                                        id={`favoriteRooms${room._id}`} 
                                        checked={favorite[room._id] || false}
                                        onChange={(e) => handleFavoriteRooms(e, room._id)} 
                                        type='checkbox' />
                                    <label for={`favoriteRooms${room._id}`} >
                                        <div
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content={!favorite[room._id] ? 'Thêm phòng vào yêu thích' : 'Hủy lưu phòng'}
                                        >
                                            {!favorite[room._id] ? 
                                                <i className={cx('fa-regular fa-bookmark')}></i> : 
                                                <i className={cx('fa-solid fa-bookmark')}></i>}
                                        </div>
                                        { <Tooltip id="my-tooltip"/>}
                                    </label>
                                </footer>
                            </div>
                        )) : <div className={cx('notification')} >
                                Bạn chưa lưu phòng nào vào mục yêu thích. 
                                <Link to='/hotel-rooms' className={cx('notification__link')} >Xem phòng</Link>
                            </div>
                    }     

                </div>
            </div>
        </div>
    )
}

export default UserFavoriteRooms