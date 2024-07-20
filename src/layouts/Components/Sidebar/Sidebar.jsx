import Menu from './Menu'
import { MenuItem } from './Menu'

import config from '~/config'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'


const cx = classNames.bind(styles)

const Menu_User = {
    account: {
        icon: <i className={cx('fa-regular fa-user')}></i>,
        title: 'Tài khoản',
    },
    purchase: {
        icon: <i className={cx('fa-solid fa-clipboard-list')}></i>,
        title: 'Danh sách giao dịch'
    },
    mybooking: {  
        icon: <i className={cx('fa-regular fa-rectangle-list')}></i>,
        title: 'Lịch sử đặt phòng'
    },
    pay: {
        icon: <i className={cx('fa-regular fa-credit-card')}></i>,
        title: 'Thẻ thanh toán'
    },
}


function Sidebar() {


    return ( 
        <aside className={cx('wrapper')}>
            <header className={cx('user__menu-header')}>
                <h2 className={cx('user__menu-name')}>Minh Nhật</h2>
                <div className={cx('user__menu-about')}>
                    <span><i className={cx('fa-solid fa-people-group')} ></i></span>
                    <p >
                        Bạn là thành viên của <b>Coneko</b>
                    </p>
                </div>
            </header>
            <Menu>
                <MenuItem title={Menu_User.account.title} to={config.routes.userAccount} icon={Menu_User.account.icon} activeIcon={Menu_User.account.icon}/>
                <MenuItem title={Menu_User.purchase.title} to={config.routes.userPurchase} icon={Menu_User.purchase.icon} activeIcon={Menu_User.purchase.icon}/>
                <MenuItem title={Menu_User.mybooking.title} to={config.routes.userMybooking} icon={Menu_User.mybooking.icon} activeIcon={Menu_User.mybooking.icon}/>
                <MenuItem title={Menu_User.pay.title} to={config.routes.userPayCard} icon={Menu_User.pay.icon} activeIcon={Menu_User.pay.icon}/>
            </Menu>
        </aside>
    );
}

export default Sidebar;