
import classNames from 'classnames/bind'
import styles from './UserList.module.scss'

const cx = classNames.bind(styles)

function UserList() {
    return ( 
        <div className={cx('wrap__user')}>User list</div>
    );
}

export default UserList;