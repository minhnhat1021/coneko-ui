import React, { Component } from 'react';
import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

import images from '~/assets/images'
import Menu from '~/components/Popper/Menu'
import Button from '~/components/Button'

import User from '~/layouts/Components/UserMenu'
import {Login, Register} from '~/layouts/Components/LoginRegister'

import classNames from 'classnames/bind';
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
        icon: <i className={cx('fa-solid fa-clipboard-list')}></i>,
        title: 'Danh sách giao dịch'
    },
    {
        
        icon: <i className={cx('fa-regular fa-rectangle-list')}></i>,
        title: 'Lịch sử đặt phòng'
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
    // logic hiện loginModal hay registerModal
        
    const [statusLogin, setStatusLogin] = useState(true)

    const handleLoginRegister = () => {
        setStatusLogin(!statusLogin);
    }
    
    // khi ấn vào loginBtn và registerBtn, login ẩn hiện modal, ấn vào nút nào thì hiện modal của nút đấy
    const loginBtnRef = useRef()
    const registerBtnRef = useRef()
    const loginModalRef = useRef()
    const registerModalRef = useRef()

    const [showModal, setShowModal] = useState(false);
    
    const handleModalToggle = (e) => {
        setShowModal(!showModal);
        if(e.currentTarget === registerBtnRef.current) {
            setStatusLogin(false)
        }
        else if(e.currentTarget === loginBtnRef.current) {
            setStatusLogin(true)
        }
    };

    // Khi ấn vào modal, sẽ dóng modal lại
    const handleClickModal = (e) => {
        setShowModal(!showModal);
    }

    // Khi thay đổi menuItem
    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'language': 
                console.log('đúng language rồi')
                break;
            default:
                console.log("default");
                break;
        }
    }
    // Lấy token ra để set trạng thái đăng nhập cho user, load ra UI khi đã login hoặc logout
    const [token, setToken] = useState(localStorage.getItem('token'))

    // HandleDataRegister 

    const handleDataRegister = (statusToken) => {
        setToken(statusToken)
    }
    // HandleDataLogin
    const handleDataLogin = (statusToken) => {
        setToken(statusToken)
    }
    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token')
        axios.post('http://localhost:5000/api/login/out', {
            id: localStorage.getItem('userId')
        }) 
        .then((res) => {
            setToken(localStorage.getItem('token'))
            setShowModal(false)
            localStorage.removeItem('userId')
            window.location.href = '/'
        })
        .catch((err) => console.error(err) )  
    }

    // handele Account 
    const handleAccount = () => {
        window.location.href = '/user/account'
    }
    const handleBookingHistory = () => {
        window.location.href = '/user/mybooking' 
    }    
    const handleTransactionList = () => {
        window.location.href = '/user/purchase/list'
    }
    const handlePayCard = () => {
        window.location.href = '/user/paycard'
    }
    
    return ( 
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <a href="/">
                        <img 
                            src={images.logo} 
                            alt="Coneko Hotel"
                        />
                    </a>
                </div>
                <nav className={cx('header__nav')}>
                    <a href="/" className={cx('header__nav-item')} >Trang chủ</a>
                    <a href="/about" className={cx('header__nav-item')} >Giới thiệu</a>
                    <a href="/products" className={cx('header__nav-item')} >Xem phòng</a>
                    <a href="/hotel-rules" className={cx('header__nav-item')} >Quy định</a>
                    <a href="/contact" className={cx('header__nav-item')} >Liên lạc</a>
                </nav>
                <div className={cx('header__actions')}>

                {   !!token ? (
                        <>
                            <User 
                                account={handleAccount} 
                                transactionList={handleTransactionList}
                                bookingHistory={handleBookingHistory} 
                                payCard={handlePayCard}
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
                        <Button ref={registerBtnRef}  register showModal ={(e) => handleModalToggle(e)}>
                            Đăng ký
                        </Button>
                        <Button ref={loginBtnRef} login  showModal = {(e) => handleModalToggle(e)} leftIcon={<i className={cx('fa-regular fa-user')}></i>}>
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
    );
}

export default Header;