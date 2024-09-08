import HeadlessTippy from '@tippyjs/react/headless'


import classNames from 'classnames/bind'
import styles from './User.module.scss'
import UserMenuItem from './UserMenuItem'

const cx = classNames.bind(styles)


function User({ user, Menu_User, account, transactionList, bookingHistory, payCard, logout}) {
    const renderUser = () => {
        return Menu_User.map((item, index) => {
            const isAccountBtn = item.title === 'Tài khoản'
            const isTransactionList = item.title === 'Danh sách giao dịch'
            const isBookingHistory = item.title === 'Lịch sử đặt phòng'
            const isPayCard = item.title === 'Thẻ thanh toán'
            const isLogoutBtn = item.title === 'Đăng xuất'
            return <UserMenuItem 
                account={isAccountBtn ? account :undefined} 
                transactionList={isTransactionList ? transactionList : undefined} 
                bookingHistory={isBookingHistory ? bookingHistory : undefined} 
                payCard={isPayCard ? payCard : undefined}
                logout={isLogoutBtn ? logout : undefined} 
                
                key={index} 
                data={item}  
            />
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
                            <h2 className={cx('user__menu-name')}>{user.displayName}</h2>
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
                    <h3 className={cx('user__info-name')}>{user.displayName}</h3>
                    <i className={cx('fa-solid fa-coins', 'user__info__point-icon')}></i>
                    <p className={cx('user__info-point')} >10000</p>
                </div>
                <i className={cx('fa-solid fa-caret-down', 'header__user__more-icon')}></i>
            </div>
        </HeadlessTippy>
        
    )
}

export default User