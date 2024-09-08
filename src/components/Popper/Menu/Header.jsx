
import classNames from 'classnames/bind'
import styles from './Menu.module.scss'

const cx = classNames.bind(styles)

function Header({ title, onBack }) {

    return ( 
        <header className={cx('header')}>
            <button className={cx('back-btn')} onClick={onBack}>
                <i className={cx('fa-solid fa-angle-left')}></i>
            </button>
            <h4 className={cx('Menu__header-title')}>{title}</h4>
        </header>
    )
}

export default Header