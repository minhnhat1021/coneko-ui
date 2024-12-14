import React from 'react'
import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import * as userService from '~/apiServices/userService'
import * as authService from '~/apiServices/authService'

import config from '~/config'
import images from '~/assets/images'
import Menu from '~/components/Popper/Menu'
import User from '~/layouts/Components/UserMenu'
import Button from '~/components/Button'

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
            const userData = await userService.userDetail(token)
            setUser(userData)
        }
                
        fetchApi()
    }, [token])

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

    
    // Handle logout
    const handleLogout = async() => {
        const res = await authService.logout(token)

        localStorage.removeItem('token')

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
                <Link to="/" className={cx('logo')}>
                    <img src={images.coneko} alt="Coneko Hotel"/>
                </Link>
                <nav className={cx('header__nav')}>
                    <NavLink to={config.routes.home} className={(nav) => cx('header__nav-item' , {active: nav.isActive})} >Trang chủ</NavLink>
                    <NavLink to={config.routes.about} className={(nav) => cx('header__nav-item' , {active: nav.isActive})} >Giới thiệu</NavLink>
                    <NavLink to={config.routes.hotelRooms} className={(nav) => cx('header__nav-item' , {active: nav.isActive})} >Xem phòng</NavLink>
                    <NavLink to={config.routes.hotelRules} className={(nav) => cx('header__nav-item' , {active: nav.isActive})} >Quy định</NavLink>
                    <NavLink to={config.routes.contact} className={(nav) => cx('header__nav-item' , {active: nav.isActive})} >Liên lạc</NavLink>
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
                        <Button to='/register' register >
                            Đăng ký
                        </Button>
                        <Button to='/login' login  leftIcon={<i className={cx('fa-regular fa-user')}></i>}>
                            Đăng nhập
                        </Button>

                    </>
                )}
                    
                </div>

            </div>
        </header>
    )
}

export default Header