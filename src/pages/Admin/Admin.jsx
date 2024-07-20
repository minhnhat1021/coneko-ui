import Header from './Header'

import classNames from 'classnames/bind'
import styles from './Admin.module.scss'

const cx = classNames.bind(styles)

function Admin() {
    return ( 
        <div className={cx('wrapper')}>
            <Header />
            <main>

            </main>
        </div>
    );
}

export default Admin;