import Header from '../Header'

import classNames from 'classnames/bind'
import styles from './RoomList.module.scss'

const cx = classNames.bind(styles)

function RoomList() {

    return ( 
        <>
            <Header />
            <div className={cx('wrap__room')}>
                <h2 className={cx('room__title')}>Danh sách phòng</h2>
                <div className={cx('room__list')}>             
                    <div className={cx('room__item')}>
                        <a href='/hotel-rooms/' className={cx('room__image')}>
                            <img
                                src=''
                                alt='{{this.name}}'
                            />
                        </a>
                        <main className={cx('room__body')}>
                            <a href='/hotel-rooms/' className={cx('room__title')}>
                                <h5>Vinpearl Landmark 81 Autograph Collection Sài Gòn</h5>
                            </a>
                            <div className={cx('room__star-rating')}>
                                <i className={cx('fa-solid fa-star')}></i>
                                <i className={cx('fa-solid fa-star')}></i>
                                <i className={cx('fa-solid fa-star')}></i>
                                <i className={cx('fa-solid fa-star')}></i>
                                <i className={cx('fa-solid fa-star')}></i>
                            </div>  
                            <p className={cx('room__des')}>
                                Miễn phí ăn sáng trẻ em | Đài quan sát Skyview | Tích hợp khu shopping tiện lợi 
                            </p>
                        </main>
                        <footer className={cx('room__footer')}>
                            <div className={cx('room__overview')}>
                                2 ngủ | netflix and chill | photo booth
                            </div>
                            <div className={cx('room__price')}>
                                500000
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RoomList;