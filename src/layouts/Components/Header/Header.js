import images from '~/assets/images'

import Menu from '~/components/Popper/Menu'

import Button from '~/components/Button'
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
                    title: 'Tiếng Việt'
                },
                {
                    type: 'language',
                    code: 'en',
                    title: 'English'
                },
            ]
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
function Header() {
    
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
    const currentUser = true
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
                    <div className={cx('header__user')}>
                        <div className={cx('header__user-icon')}>
                            <i className={cx('fa-solid fa-user')}></i>
                        </div>
                        <div className={cx('header__user-info')}>
                            <h3 className={cx('user__info-name')}>Nhật Minh</h3>
                            <i className={cx('fa-solid fa-coins', 'user__info__point-icon')}></i>
                            <p className={cx('user__info-point')} >10000</p>
                        </div>
                        <i className={cx('fa-solid fa-caret-down', 'header__user__more-icon')}></i>
                    </div>
                ) : (
                    <>
                        <Button login href="/" leftIcon={<i className={cx('fa-regular fa-user')}></i>}>
                            Đăng nhập
                        </Button>
                    </>
                )}
                    <Menu Menu_item = {Menu_item} onChange={handleMenuChange}>
                        <button className={cx('actions__menu-btn')}>
                            <i className={cx('fa-solid fa-bars')}></i>
                        </button>
                    </Menu>
                </div>

            </div>
        </header>
    );
}

export default Header;