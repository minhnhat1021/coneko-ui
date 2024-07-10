import HeadlessTippy from '@tippyjs/react/headless';


import classNames from 'classnames/bind';
import styles from './User.module.scss'
import UserMenuItem from './UserMenuItem';

const cx = classNames.bind(styles)


function User({Menu_User}) {
    const renderUser = () => {
        return Menu_User.map((item, index) => {
            return <UserMenuItem key={index} data={item} onClick={() => {}} />
        })
    }
    return ( 
        <HeadlessTippy 
            delay={[0, 500]}
            trigger={'click'} 
            interactive
            placement='bottom-end'
            render={attrs => (
                    <div className={cx('user__menu')} tabIndex='-1' {...attrs}>
                        <header className={cx('user__menu-header')}>
                            <h2 className={cx('user__menu-name')}>Minh Nhật</h2>
                            <div className={cx('user__menu-about')}>
                                <span><i className={cx('fa-solid fa-people-group')} ></i></span>
                                <p >
                                    Bạn là thành viên của <b>Coneko</b>
                                </p>
                            </div>
                        </header>
                        {renderUser()}

                    </div>
            )}
            
        >
            <div className={cx('header__user')}>
                <div className={cx('header__user-icon')}>
                    <i className={cx('fa-solid fa-user')}></i>
                </div>
                <div className={cx('header__user-info')}>
                    <h3 className={cx('user__info-name')}>Nhật Minh</h3>
                    <i className={cx('fa-solid fa-coins', 'user__info__point-icon')}></i>
                    <p className={cx('user__info-point')} >10000</p>
                </div>
                <i className={cx('fa-solid fa-caret-down', 'header__user__more-icon')}></i>
            </div>
        </HeadlessTippy>
        
    );
}

export default User;