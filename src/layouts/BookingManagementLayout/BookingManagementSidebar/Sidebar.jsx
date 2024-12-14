import Menu from './Menu'
import { MenuItem } from './Menu'
import {SolutionOutlined} from '@ant-design/icons'
import config from '~/config'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'


const cx = classNames.bind(styles)

const Menu_Room = {
    bookedDeposit: {
        icon: <SolutionOutlined />,
        title: 'Đã đặt cọc',
    },
    bookedFulPayment: {
        icon: <SolutionOutlined />,
        title: 'Đã thanh toán',
    },
    bookingList: {
        icon: <SolutionOutlined />,
        title: 'Danh sách đặt phòng',
    },
}


function Sidebar({ userData }) {
    return ( 
        <aside className={cx('wrapper')}>
            <header className={cx('user__menu-header')}>
                <h2 className={cx('user__menu-name')}>Quản lý phòng</h2>
                <div className={cx('user__menu-about')}>
                    <p >
                        Theo dõi, cập nhật trạng thái phòng và quản lý thông tin chi tiết của từng phòng trong khách sạn <b>Coneko</b>
                    </p>
                </div>
            </header>
            <Menu>
                <MenuItem userData={userData.userList}  title={Menu_Room.bookedDeposit.title} to={config.routes.bookedDeposit} icon={Menu_Room.bookedDeposit.icon} activeIcon={Menu_Room.bookedDeposit.icon}/>
                <MenuItem userData={userData.bannedUsers}  title={Menu_Room.bookedFulPayment.title} to={config.routes.bookedFulPayment} icon={Menu_Room.bookedFulPayment.icon} activeIcon={Menu_Room.bookedFulPayment.icon}/>
                <MenuItem userData={userData.bannedUsers}  title={Menu_Room.bookingList.title} to={config.routes.bookingList} icon={Menu_Room.bookingList.icon} activeIcon={Menu_Room.bookingList.icon}/>
            </Menu>
        </aside>
    )
}

export default Sidebar

