import Menu from './Menu'
import { MenuItem } from './Menu'

import config from '~/config'

import classNames from 'classnames/bind'
import styles from './Sidebar.module.scss'


const cx = classNames.bind(styles)

const Menu_Room = {
    statisticsRoom: {
        icon: <i className={cx('fa-solid fa-hotel')}></i>,
        title: 'Thống kê phòng',
    },
    allRoom: {
        icon: <i className={cx('fa-solid fa-house-user')}></i>,
        title: 'Danh sách phòng',
    },
    availableRooms: {
        icon: <i className={cx('fa-solid fa-house-user')}></i>,
        title: 'Phòng còn trống',
    },
    bookedRooms: {  
        icon: <i className={cx('fa-solid fa-house-user')}></i>,
        title: 'Phòng đã được đặt',
    },
    cancelledRooms: {
        icon: <i className={cx('fa-regular fa-credit-card')}></i>,
        title: 'Phòng bị hủy đặt',
    },
    roomTrash: {
        icon: <i className={cx('fa-solid fa-trash')}></i>,
        title: 'Phòng đã xóa',
    },
}


function Sidebar({ roomData }) {

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
                <MenuItem  title={Menu_Room.statisticsRoom.title} to={config.routes.statisticsRoom} icon={Menu_Room.statisticsRoom.icon} activeIcon={Menu_Room.statisticsRoom.icon}/>
                <MenuItem  title={Menu_Room.allRoom.title} to={config.routes.roomList} icon={Menu_Room.allRoom.icon} activeIcon={Menu_Room.allRoom.icon}/>
                <MenuItem  title={Menu_Room.availableRooms.title} to={config.routes.availableRooms} icon={Menu_Room.availableRooms.icon} activeIcon={Menu_Room.availableRooms.icon}/>
                <MenuItem  title={Menu_Room.bookedRooms.title} to={config.routes.bookedRooms} icon={Menu_Room.bookedRooms.icon} activeIcon={Menu_Room.bookedRooms.icon}/>
                <MenuItem  title={Menu_Room.cancelledRooms.title} to={config.routes.cancelledRooms} icon={Menu_Room.cancelledRooms.icon} activeIcon={Menu_Room.cancelledRooms.icon}/>
                <MenuItem roomData={roomData.roomTrash} title={Menu_Room.roomTrash.title} to={config.routes.roomTrash} icon={Menu_Room.roomTrash.icon} activeIcon={Menu_Room.roomTrash.icon}/>
            </Menu>
        </aside>
        
    );
}

export default Sidebar;

