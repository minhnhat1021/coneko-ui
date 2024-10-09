import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as userService from '~/apiServices/userService'
import * as authService from '~/apiServices/authService'

import config from '~/config'

import Menu from '~/components/Popper/Menu'
import Button from '~/components/Button'

import User from '~/layouts/Components/UserMenu'
import {Login, Register} from '~/layouts/Components/LoginRegister'

import classNames from 'classnames/bind'
import styles from './Header.module.scss'

const cx = classNames.bind(styles)


const Menu_item = [
    {
        icon: <i className={cx('fa-solid fa-earth-asia')}></i>,
        title: 'Ngôn ngữ',
        subMenu: {
            title: 'Ngôn Ngữ',
            data: [
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
                
            ],
            
        }
    },
    {
        icon: <i className={cx('fa-regular fa-moon')}></i>,
        title: 'Chế độ tối'
    },
    {
        icon: <i className={cx('fa-solid fa-earth-asia')}></i>,
        title: 'Chế độ sáng'
    },
]
const Menu_User = [
    {
        icon: <i className={cx('fa-regular fa-user')}></i>,
        title: 'Tài khoản',
    },
    {
        icon: <i className={cx('fa-solid fa-bookmark')}></i>,
        title: 'Phòng của tôi'
    },
    {
        icon: <i className={cx('fa-regular fa-rectangle-list')}></i>,
        title: 'Lịch sử đặt phòng'
    },
    {
        icon: <i className={cx('fa-solid fa-bookmark')}></i>,
        title: 'Phòng ưa thích'
    },
    {
        icon: <i className={cx('fa-regular fa-credit-card')}></i>,
        title: 'Thẻ thanh toán'
    },
    {
        icon: <i className={cx('fa-solid fa-arrow-right-from-bracket')}></i>,
        title: 'Đăng xuất'
    },

]
function Header() {

    // Lấy thông tin người dùng truyền về header
    const [user, setUser] = useState()
    const [token, setToken] = useState(localStorage.getItem('token'))
    
    useEffect(() => {
        const userId = localStorage.getItem('userId')

        const fetchApi = async () => {
            const userData = await userService.userDetail(token, userId)
            setUser(userData)
        }
                
        fetchApi()
    }, [token])
    
    // logic hiện loginModal hay registerModal
        
    const [statusLogin, setStatusLogin] = useState(true)

    const handleLoginRegister = () => {
        setStatusLogin(!statusLogin)
    }
    
    // khi ấn vào loginBtn và registerBtn, login ẩn hiện modal, ấn vào nút nào thì hiện modal của nút đấy
    const loginBtnRef = useRef()
    const registerBtnRef = useRef()
    const loginModalRef = useRef()
    const registerModalRef = useRef()

    const [showModal, setShowModal] = useState(false)
    
    const handleModalToggle = (e) => {
        setShowModal(!showModal)
        if(e.currentTarget === registerBtnRef.current) {
            setStatusLogin(false)
        }
        else if(e.currentTarget === loginBtnRef.current) {
            setStatusLogin(true)
        }
    }

    // Khi ấn vào modal, sẽ dóng modal lại
    const handleClickModal = (e) => {
        setShowModal(!showModal)
    }

    // Khi thay đổi menuItem
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language': 
                console.log('đúng language rồi')
                break
            default:
                console.log("default")
                break
        }
    }

    // HandleDataRegister 

    const handleDataRegister = (statusToken) => {
        setToken(statusToken)
    }
    // HandleDataLogin
    const handleDataLogin = (statusToken) => {
        setToken(statusToken)
    }
    // Handle logout
    const handleLogout = async() => {
        const id = localStorage.getItem('userId')
        const res = await authService.logout(id)

        localStorage.removeItem('token')

        setToken(localStorage.getItem('token'))
        setShowModal(false)
        localStorage.removeItem('userId')
        window.location.href = '/'
 
    }

    const handleNavigation = (route) => {
        window.location.href = route
    }

    const routes = {
        account: config.routes.userAccount,
        currentRooms: config.routes.userCurrentRooms,
        bookingHistory: config.routes.userBookingHistory,
        favoriteRooms: config.routes.userFavoriteRooms,
        payCard: config.routes.userPayCard,
    }
    
    return ( 
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    {/* <a href="/">
                        <img 
                            src={images.logo} 
                            alt="Coneko Hotel"
                        />
                    </a> */}
                </div>
                <nav className={cx('header__nav')}>
                    <Link to={config.routes.home} className={cx('header__nav-item')} >Trang chủ</Link>
                    <Link to={config.routes.about} className={cx('header__nav-item')} >Giới thiệu</Link>
                    <Link to={config.routes.hotelRooms} className={cx('header__nav-item')} >Xem phòng</Link>
                    <Link to={config.routes.hotelRules} className={cx('header__nav-item')} >Quy định</Link>
                    <Link to={config.routes.contact} className={cx('header__nav-item')} >Liên lạc</Link>
                </nav>
                <div className={cx('header__actions')}>

                {user ? (
                    <>
                        <User 
                            user={user}
                            account={() => handleNavigation(routes.account)} 
                            currentRooms={() => handleNavigation(routes.currentRooms)}
                            bookingHistory={() => handleNavigation(routes.bookingHistory)} 
                            favoriteRooms={() => handleNavigation(routes.favoriteRooms)}
                            payCard={() => handleNavigation(routes.payCard)}
                            logout={handleLogout} 
                            Menu_User={Menu_User}
                        />

                        <Menu Menu_item = {Menu_item} onChange={handleMenuChange}>
                            <button className={cx('actions__menu-btn')}>
                                <i className={cx('fa-solid fa-bars')}></i>
                            </button>
                        </Menu>
                    </>
                ) : (
                    <>
                        <Button ref={registerBtnRef}  register showModal={(e) => handleModalToggle(e)}>
                            Đăng ký
                        </Button>
                        <Button ref={loginBtnRef} login  showModal={(e) => handleModalToggle(e)} leftIcon={<i className={cx('fa-regular fa-user')}></i>}>
                            Đăng nhập
                        </Button>

                        {statusLogin 
                            ? <Login onDataLogin={handleDataLogin} ref={loginModalRef} showModal={showModal} clickContentModal={e => e.stopPropagation()} clickModal={(e) => handleClickModal(e)}  onClick={handleLoginRegister} /> 
                            : <Register onDataLogin={handleDataRegister} ref={registerModalRef} showModal={showModal} clickContentModal={e => e.stopPropagation()} clickModal={(e) => handleClickModal(e)} onClick={handleLoginRegister} />
                        }

                    </>
                )}
                    
                </div>

            </div>
        </header>
    )
}

export default Header