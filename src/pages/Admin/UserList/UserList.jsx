import { useState, useEffect, useRef } from 'react'
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

    // options -------------------------------------------
    const [options, setOptions] = useState({
        silver: false,
        gold: false,
        platinum: false,
        diamond: false,
        vip: false,
    })

    useEffect(() => {
        var optionInputs = document.querySelectorAll('[name][options]')
        for(var optionInput of optionInputs) {
            optionInput.onchange = function () {
                var name = this.getAttribute('name')
                var isChecked = this.checked

                setOptions(prev => ({
                    ...prev,
                    [name]: isChecked 
                }))
            }
        }
    }, [])

    useEffect(() => {
        const handleFilter = async() => {
            const filters = Object.keys(options).filter(
              (key) => options[key] === true
            )
    
            const res = await userService.filterUsersByOptions(filters)
            setUserData(res?.users)
    
        }
        handleFilter()
    },[options])
    // search --------------------------------
    const [userId, setUserId] = useState()
    const [userName, setUserName] = useState()

    const idInputRef = useRef()
    const userNameInputRef = useRef()

    const handleFindById = async() => {
        const res = await userService.findUserById(userId)
        if(res?.user){
            setUserData(res?.user)
        } else {
            setUserData([])
        }
    }
    const handleFindByUserName = async() => {
        const res = await userService.findUserByUserName(userName)
        if(res?.user){
            setUserData(res?.user)
        } else {
            setUserData([])
        }
    }

    const handleClearUserName = () => {
        setUserName('')
        userNameInputRef.current.focus()
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('action')}>
                <div className={cx('options')}>
                    <div className={cx('option__item')}>
                        <input id='silver' name='silver' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='silver' className={cx('options__label')}></label>
                        <p>Sliver</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='gold' name='gold' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='gold' className={cx('options__label')}></label>
                        <p>Gold</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='platinum' name='platinum' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='platinum' className={cx('options__label')}></label>
                        <p>Platinum</p>
                    </div>
                    
                    <div className={cx('option__item')}>
                        <input id='diamond' name='diamond' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='diamond' className={cx('options__label')}></label>
                        <p>Diamond</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='vip' name='vip' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='vip' className={cx('options__label')}></label>
                        <p>VIP</p>
                    </div>
                    
                </div>
                
                <div className={cx('search')}>
                    <div className={cx('search__item')}>
                        <input 
                            ref={idInputRef}
                            value={userId} 
                            onChange={(e) => setUserId(e.target.value)} 
                            className={cx('search__input')} 
                            type="text" 
                            placeholder="Tìm kiếm"  
                        />
                        
                        <Button adminUpdate onClick={handleFindById}>Tìm kiếm bằng user id</Button>
                    </div>
                    <div className={cx('search__item')}>
                        <input 
                            ref={userNameInputRef}
                            value={userName} 
                            onChange={(e) => setUserName(e.target.value)} 
                            className={cx('search__input')} 
                            type="text" 
                            placeholder="Tìm kiếm"  
                        />
                        <i 
                            className={cx('fa-solid fa-circle-xmark', 'Clear')}
                            onClick={handleClearUserName}
                        ></i>
                        <Button adminUpdate onClick={handleFindByUserName}>Tìm kiếm bằng user name</Button>
                    </div>
                </div>
            </div>
            <div className={cx('user__list')}>  
                { userData?.length > 0 ?  
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
                                        {user?.fullName}
                                    </p>
                                    <p className={cx('user__age')}>
                                        {user?.age}
                                    </p>
                                </div>
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__email')}>
                                        {user?.email} 
                                    </p>
                                    <p className={cx('user__user-name')}>
                                        {user?.userName}
                                    </p>
                                </div>
                                <div className={cx('user__body-child')}>
                                    <p className={cx('user__star-rating')}>
                                        
                                    </p> 
                                    <p className={cx('user__capacity')}>
                                        {user?.capacity} 
                                    </p>

                                </div>
                                
                                </main>
                            <footer className={cx('user__footer')}>                         
                                <Button adminUpdate to={`/admin/${user?._id}/user-edit`}>Sửa</Button>
                                <Button adminDelete onClick={() => handleBan(user._id)} >Ban</Button>
                            </footer>
                        </div>
                    )) : <div className={cx('notification')} >
                            Chưa có khách hàng nào 
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