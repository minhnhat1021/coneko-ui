import { useState, useEffect } from 'react'
import * as managementService from '~/apiServices/managementServive'

import Button from '~/components/Button'

import classNames from 'classnames/bind'
import styles from './BannedUsers.module.scss'

const cx = classNames.bind(styles)

function BannedUsers() {

    const [userData, setUserData] = useState([])
    useEffect(() => {
        const fetchApi = async() => {
            const res = await managementService.bannedUsers()
            setUserData(res)
        }

        fetchApi()
    }, [])
    
    const handleRestore = async(id) => {
        const res = await managementService.restoreUser(id)
        if(res.msg) {
             window.location.href='http://localhost:3000/admin/banned-users'
        }
       
    }
    const handleDelete = async(id) => {
        const res = await managementService.forceDeleteUserById(id)
        if(res.msg) {
             window.location.href='http://localhost:3000/admin/banned-users'
        }

    }
    return ( 
        <div className={cx('wrapper')}>
            Danh sách khách hàng bị ban

            <div className={cx('room__list')}>  
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
                                <footer className={cx('room__footer')}>                         
                            <Button adminUpdate onClick={() => handleRestore(user._id)}>Khôi Phục</Button>
                            <Button adminDelete onClick={() => handleDelete(user._id)} >Xóa</Button>
                        </footer> 
                        </div>
                    )) : <div className={cx('notification')} >
                            Chưa có khách hàng nào bị ban
                        </div>
                } 
            </div>
        </div>

    )
}

export default BannedUsers