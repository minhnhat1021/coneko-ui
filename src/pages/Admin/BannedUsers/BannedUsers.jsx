import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as managementService from '~/apiServices/managementServive'

import Button from '~/components/Button'
import ConfirmDeleteModal from '../ConfirmDeleteModal'

import classNames from 'classnames/bind'
import styles from './BannedUsers.module.scss'

const cx = classNames.bind(styles)

function BannedUsers() {

    const [userData, setUserData] = useState([])
    const [showModal, setShowModal] = useState(false)

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

    // Checkbox-all actions
    const [action, setAction] = useState()
    const [statusAction, setStatusAction] = useState(false)
    const [disabledActions, setDisabledActions] = useState(true)

    useEffect(() => {
        var checkboxAll = document.getElementById('checkbox__all')
        var roomCheckbox = document.querySelectorAll("input[name='userIds[]']")

        checkboxAll.onchange = (e) => {
            const isCheckAll = e.target.checked
            
            roomCheckbox.forEach((checkbox) => {
                
                checkbox.checked = isCheckAll
                const countCheckboxChecked = document.querySelectorAll("input[name='userIds[]']:checked").length

                if(countCheckboxChecked > 0 ){
                    setDisabledActions(false)
                } else{
                    setDisabledActions(true)
                }
            })
            
        }
        
        roomCheckbox.forEach((checkbox) => {
            checkbox.onchange = () => {
                const countCheckboxChecked = document.querySelectorAll("input[name='userIds[]']:checked").length
                const isCheckAll = roomCheckbox.length === countCheckboxChecked
                checkboxAll.checked = isCheckAll

                if(countCheckboxChecked > 0 ){
                    setDisabledActions(false)
                } else{
                    setDisabledActions(true)
                }
            }
        }) 
        
    },[userData])

    const handleActions = async() => {
        var checkboxChecked = Array.from(document.querySelectorAll("input[name='userIds[]']:checked"))
        const userIds = checkboxChecked.map(checkbox => checkbox.id)
        if(!action) {
            setStatusAction(true)
        }else {
            setStatusAction(false)
            if(action === 'forceDelete') {
                setShowModal(true)

            } else {
                const res = await managementService.userActions(action, userIds)

                if(res?.msg){
                    window.location.href='http://localhost:3000/admin/banned-users'
                }
            }
        }
    }

    const handleConfirmDelete = async () => {
        var checkboxChecked = Array.from(document.querySelectorAll("input[name='userIds[]']:checked"))
        const userIds = checkboxChecked.map(checkbox => checkbox.id)

        const res = await managementService.userActions(action, userIds)

        if(res?.msg){
            window.location.href='http://localhost:3000/admin/banned-users'
        }
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                Danh sách khách hàng bị ban
            </div>
            <div className={cx('actions')}>
                <div className={cx('checkbox')}>
                    <input id='checkbox__all' name='available' options='' type="checkbox" className={cx('actions__checkbox')}/>
                    <label htmlFor='checkbox__all' className={cx('actions__label')}> Chọn tất cả</label>
                </div>
                <select id="actions" name="roomType" value={action} onChange={(e) => setAction(e.target.value)} >
                    <option value='' >-- Chọn hành động --</option>
                    <option value="restore">Khôi phục tài khoản</option>
                    <option value="forceDelete">Xóa vĩnh viễn tài khoản</option>
                </select>
                <Button onClick={handleActions} login disabled={disabledActions}>Thực hiện</Button>
                {statusAction && <span className={cx('checkbox__msg')}>Vui lòng chọn hành động</span>}
            </div>
            <div className={cx('room__list')}>  
                { userData.length > 0 ?  
                    (userData.map((user, index) => 
                        <div key={index} className={cx('user__item')}>
                            <div className={cx('checkbox')}>
                                <input id={user._id} vaule={user._id} name='userIds[]' type="checkbox" className={cx('actions__checkbox')}/>
                                <label htmlFor={user._id} className={cx('actions__label')}> </label>
                            </div>
                            <Link to='' className={cx('user__image')}>
                                <img
                                    src={`http://localhost:5000/images/roomImg/1722524231808.png`}
                                    alt='coneko'
                                />
                            </Link>
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
            <ConfirmDeleteModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                title='những user'
            />
        </div>

    )
}

export default BannedUsers