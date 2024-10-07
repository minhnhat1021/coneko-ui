import { useState, useEffect } from 'react'
import * as userService from '~/apiServices/userService'
import * as managementService from '~/apiServices/managementServive'

import Button from '~/components/Button'

import classNames from 'classnames/bind'
import styles from './UserList.module.scss'

const cx = classNames.bind(styles)

function UserList() {

    const [userData, setUserData] = useState([])
    useEffect(() => {
        const fetchApi = async() => {
            const res = await userService.userList()
            setUserData(res.users)
        }
        fetchApi()
    }, [])
    
    const handleBan = async(id) => {
        const res = await managementService.deleteUserById(id)

        if(res.msg){
            window.location.href='http://localhost:3000/admin/user-list'
        }
        
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
            <div className={cx('user__list')}>  
                { userData.length > 0 ?  
                    (userData.map((user, index) => 
                        <div key={index} className={cx('user__item')}>
                            <a href='/hotel-rooms/' className={cx('user__image')}>
                                <img
                                    src={`http://localhost:5000/images/roomImg/1722524231808.png`}
                                    alt='coneko'
                                />
                            </a>
                            <main className={cx('user__body')}>
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__name')}>
                                        {user.fullName}
                                    </p>
                                    <p className={cx('user__age')}>
                                        {user.age}
                                    </p>
                                </div>
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__email')}>
                                        {user.email} 
                                    </p>
                                    <p className={cx('user__user-name')}>
                                        {user.userName}
                                    </p>
                                </div>
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__star-rating')}>
                                        
                                    </p> 
                                    <p className={cx('user__capacity')}>
                                        {user.capacity} 
                                    </p>

                                </div>
                                
                                </main>
                            <footer className={cx('user__footer')}>                         
                                <Button adminUpdate to={`/admin/${user._id}/user-edit`}>Sửa</Button>
                                <Button adminDelete onClick={() => handleBan(user._id)} >Ban</Button>
                            </footer>
                        </div>
                    )) : <div className={cx('notification')} >
                            Chưa có khách hàng nào đăng ký
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

export default UserList