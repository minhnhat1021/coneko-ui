import images from '~/assets/images'

import Menu from '~/components/Popper/Menu'

import User from '~/layouts/Components/User'
import {Login, Register} from '~/layouts/Components/LoginRegister'

import Button from '~/components/Button'
import classNames from 'classnames/bind';
import styles from './Header.module.scss'
import { useState } from 'react'

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
        icon: <i className={cx('fa-regular fa-credit-card')}></i>,
        title: 'Thẻ thanh toán'
    },
    {
        icon: <i className={cx('fa-solid fa-arrow-right-from-bracket')}></i>,
        title: 'Đăng xuất'
    },

]
function Header() {
    
    const [statusLogin, setStatusLogin] = useState(true)
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
    const handleLoginRegister = () => {
        setStatusLogin(!statusLogin);
    }
    console.log(statusLogin);
    const currentUser = false

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

                {   currentUser ? (
                        <>
                            <User Menu_User={Menu_User}/>
                            <Menu Menu_item = {Menu_item} onChange={handleMenuChange}>
                            <button className={cx('actions__menu-btn')}>
                                <i className={cx('fa-solid fa-bars')}></i>
                            </button>
                            </Menu>
                        </>
                ) : (
                    <>
                        <Button  register href="/" >
                            Đăng ký
                        </Button>
                        <Button  login href="/" leftIcon={<i className={cx('fa-regular fa-user')}></i>}>
                            Đăng nhập
                        </Button>

                        {statusLogin ? <Login onClick={handleLoginRegister} /> : <Register onClick={handleLoginRegister} />}

                    </>
                )}
                    
                </div>

            </div>
        </header>
    );
}

export default Header;