import Menu from './Menu'
import { MenuItem } from './Menu'

import config from '~/config'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'


const cx = classNames.bind(styles)

const Menu_Room = {
    allRoom: {
        icon: <i className={cx('fa-regular fa-user')}></i>,
        title: 'Danh sách phòng',
    },
    availableRooms: {
        icon: <i className={cx('fa-solid fa-clipboard-list')}></i>,
        title: 'Phòng còn trống',
    },
    bookedRooms: {  
        icon: <i className={cx('fa-regular fa-rectangle-list')}></i>,
        title: 'Phòng đã được đặt',
    },
    cancelledRooms: {
        icon: <i className={cx('fa-regular fa-credit-card')}></i>,
        title: 'Phòng bị hủy đặt',
    },
}


function Sidebar() {


    return ( 
        <aside className={cx('wrapper')}>
            <header className={cx('user__menu-header')}>
                <h2 className={cx('user__menu-name')}>Quản lý phòng</h2>
                <div className={cx('user__menu-about')}>
                    <span><i className={cx('fa-solid fa-people-group')} ></i></span>
                    <p >
                        Bạn là thành viên của <b>Coneko</b>
                    </p>
                </div>
            </header>
            <Menu>
                <MenuItem title={Menu_Room.allRoom.title} to={config.routes.roomList} icon={Menu_Room.allRoom.icon} activeIcon={Menu_Room.allRoom.icon}/>
                <MenuItem title={Menu_Room.availableRooms.title} to={config.routes.availableRooms} icon={Menu_Room.availableRooms.icon} activeIcon={Menu_Room.availableRooms.icon}/>
                {/* <MenuItem title={Menu_Room.bookedRooms.title} to='' icon={Menu_Room.bookedRooms.icon} activeIcon={Menu_Room.bookedRooms.icon}/>
                <MenuItem title={Menu_Room.cancelledRooms.title} to='' icon={Menu_Room.cancelledRooms.icon} activeIcon={Menu_Room.cancelledRooms.icon}/> */}
            </Menu>
        </aside>
    );
}

export default Sidebar;