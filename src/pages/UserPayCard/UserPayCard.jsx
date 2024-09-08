import { useState } from 'react'
import images from '~/assets/images'

import classNames from 'classnames/bind'
import styles from './UserPayCard.module.scss'

const cx = classNames.bind(styles)

function UserPayCard({ userData }) {
    const user = userData.data
    const [showModal, setShowModal] = useState(false)
    const handleShowModal = (e) => {
        setShowModal(true)
    }
    const handleHideModal = () => {
        setShowModal(!showModal)
    }
    const handleDebouncing = (e) => {
        e.stopPropagation()
    }
    return ( 
        <div className={cx('wrapper')}>
            <header className={cx('header')}>
                <h1 className={cx('header__title')}>Thẻ của bạn</h1>
                <p className={cx('header__des')}>
                    Quản lý những thẻ của bạn
                </p>
            </header>
            <main className={cx('main')}>
                <nav className={cx('card__list')}>
                    <div className={cx('card__item')} onClick={(e) => handleShowModal(e)}>
                        <i className={cx('fa-solid fa-circle-plus')}></i>
                        <h3>Thêm thẻ</h3>
                    </div>
                    <div className={cx('card__item')} onClick={(e) => handleShowModal(e)}>
                        <i className={cx('fa-solid fa-circle-plus')}></i>
                        <h3>Thêm thẻ</h3>
                    </div>
                    <div className={cx('card__item')} onClick={(e) => handleShowModal(e)}>
                        <i className={cx('fa-solid fa-circle-plus')}></i>
                        <h3>Thêm thẻ</h3>
                    </div>
                </nav>
            </main>
            <footer className={cx('footer')}>
                <img className={cx('footer__img')} src={images.payCard} alt='Pay Card' />
                <p className={cx('footer__des')}>Bắt đầu thêm thẻ tín dụng của bạn và tận hưởng thanh toán đặt phòng chỉ bằng một cú chạm!</p>
            </footer>
            <div className={cx('payCard__modal', {showModal} )} onClick={handleHideModal}>
                <div className={cx('payCard__modal-container')} onClick={(e) => handleDebouncing(e)}>
                    <div className={cx('payCard__modal-content')}>
                        <header className={cx('payCard__content-header')}>
                            <h1>Thêm thẻ</h1>
                        </header>
                        <main className={cx('payCard__content-main')}>
                            <form  className={cx('payCard__content-list')}>
                                <div className={cx('payCard__content-item')}>
                                    <label htmlFor="cardNumber">Số thẻ</label>
                                    <div className={cx('payCard__wrap-input')}>
                                        <input id='cardNumber' type="text" placeholder="Nhập số thẻ của bạn" required />
                                    </div>
                                </div>
                                <div className={cx('content__item-wrap')}>
                                    <div className={cx('payCard__content-item')}>
                                        <label htmlFor="expirationDate">Ngày hết hạn</label>
                                        <div className={cx('payCard__wrap-input')}>
                                            <input id="expirationDate" type="text" placeholder="Nhập ngày hết hạn trên thẻ" required />
                                        </div>
                                    </div>
                                    <div className={cx('payCard__content-item')}>
                                        <label htmlFor="CVV">cvv</label>
                                        <div className={cx('payCard__wrap-input')}>
                                            <input id="CVV" type="password" placeholder="Nhập mã CVV" required />
                                        </div>
                                    </div>
                                </div>
                                <div className={cx('payCard__content-item')}>
                                    <label htmlFor="CardholderName">Tên chủ thẻ</label>
                                    <div className={cx('payCard__wrap-input')}>
                                        <input id="CardholderName"  type="text" placeholder="Nhập tên chủ thẻ" required />
                                    </div>
                                </div>

                                <div className={cx('payCard__content-footer')}>
                                    <button type="submit"> Thêm Thẻ </button>
                                    <p>Bằng cách nhấn vào nút bên trên, bạn đã đồng ý với Điều khoản & Điều kiện cũng như Chính sách quyền riêng tư của Coneko.</p>
                                </div>
                            </form>
                        </main>
                    </div>
                </div>
            </div>
        </div>

        
    )
}

export default UserPayCard