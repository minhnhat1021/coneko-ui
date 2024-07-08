import classNames from 'classnames/bind';
import styles from './Popper.module.scss'

const cx = classNames.bind(styles)

function Wrapper({children, className}) {
    return ( 
        <nav className={cx('wrapper', className)}>
            {children}
        </nav>
    );
}

export default Wrapper;