import Menu from './Menu'
import { MenuItem } from './Menu'

import config from '~/config'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'


const cx = classNames.bind(styles)

const Menu_Room = {
    userList: {
        icon: <i className={cx('fa-solid fa-user')}></i>,
        title: 'Danh sách khách hàng',
    },
    bannedUsers: {
        icon: <i className={cx('fa-solid fa-user-slash')}></i>,
        title: 'Khách hàng bị ban',
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
                <MenuItem userData={userData.userList}  title={Menu_Room.userList.title} to={config.routes.userList} icon={Menu_Room.userList.icon} activeIcon={Menu_Room.userList.icon}/>
                <MenuItem userData={userData.bannedUsers}  title={Menu_Room.bannedUsers.title} to={config.routes.bannedUsers} icon={Menu_Room.bannedUsers.icon} activeIcon={Menu_Room.bannedUsers.icon}/>
            </Menu>
        </aside>
        
    )
}

export default Sidebar

