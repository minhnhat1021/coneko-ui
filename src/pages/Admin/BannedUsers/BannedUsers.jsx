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

    // Chuyển đổi định dạng ngày
    const formattedDay = (date) => {
        return  date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()  
    }
    const formattedTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')
        
        return `${hours}:${minutes}:${seconds}`
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                Danh sách khách hàng bị ban
            </div>

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
                                        Tên: <span>{user?.fullName}</span>
                                    </p>
                                    <p className={cx('user__email')}>
                                        Email: <span>{user?.email}</span> 
                                    </p>
                                </div>
                                
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__account-balance')}>
                                       Số dư: <span>{(user?.accountBalance)?.toLocaleString('vi-VN') || 0}</span>
                                    </p> 
                                    <p className={cx('user__total-spent')}>
                                       Tổng chi: <span>{(user?.totalSpent)?.toLocaleString('vi-VN') || 0} </span>
                                    </p>

                                </div>
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__created')}>
                                        Ngày tạo:  
                                        <span>{user ? formattedDay(new Date(user?.createdAt)) : ''}</span> - 
                                        <span>{user ? formattedTime(new Date(user?.createdAt)) : ''}</span>
                                    </p>
                                    <p className={cx('user__level')}>
                                        Cấp bậc: <span>{user?.level}</span>
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