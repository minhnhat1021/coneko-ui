import Header from './Header'

import classNames from 'classnames/bind'
import styles from './Admin.module.scss'

const cx = classNames.bind(styles)

function UserList() {
    return ( 
        <>
            <Header />
            <div className={cx('wrap__user')}>User list</div>
        </>
    );
}

export default UserList;