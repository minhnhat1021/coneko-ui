import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import * as roomService from '~/apiServices/roomService'


import classNames from 'classnames/bind'
import styles from './HotelRooms.module.scss'

const cx = classNames.bind(styles)

function HotelRooms() {
    const [roomData, setRoomData] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const result = await roomService.roomList()
            setRoomData(result.rooms)
        }

        fetchApi()
    }, [])


    // options 
    const [options, setOptions] = useState({
        standard: false,
        elegance: false,
        skyviewSuite: false,
        singleBed: false,
        doubleBed: false,
        oneBed: false,
        twoBed: false,
        threeBed: false,
        smoke: false,
        noSmoking: false,
    })

    useEffect(() => {
        var optionInputs = document.querySelectorAll('[name][options]')
        for(var optionInput of optionInputs) {
            optionInput.onchange = function () {
                var name = this.getAttribute('name')
                var isChecked = this.checked

                setOptions(prev => ({
                    ...prev,
                    [name]: isChecked 
                }))
            }
        }
    }, [])

    useEffect(() => {
        const handleFilter = async() => {
            const filters = Object.keys(options).filter(
              (key) => options[key] === true
            )
    
            const res = await roomService.filterRoomsByOptions(filters)
            setRoomData(res?.rooms)
    
        }
        handleFilter()
    },[options])

    useEffect(() => {
        const options = document.querySelector('#options')

        const handleScroll = () => {
            if (window.scrollY > 189) {
                options.style.position = 'fixed'
                options.style.top = '100px'
            } else {
                options.style.position = 'static'
            }
        };
    
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('page-title')}>
                    <h1 >Sự Kỳ Diệu Của Nghỉ Dưỡng: Chọn Phòng Của Bạn Ngay Hôm Nay! </h1>
                    <p>Tận hưởng sự thoải mái trong phòng nghỉ sang trọng. Đặt ngay để trải nghiệm dịch vụ và tiện ích đẳng cấp!</p>
                </div>
                <div className={cx('options')} id='options'>
                    <div className={cx('option__item')}>
                        <input id='standard' name='standard' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='standard' className={cx('options__label')}></label>
                        <p>Standard</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='elegance' name='elegance' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='elegance' className={cx('options__label')}></label>
                        <p>Elegance</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='skyviewSuite' name='skyviewSuite' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='skyviewSuite' className={cx('options__label')}></label>
                        <p>Skyview Suite</p>
                    </div>
                    <br></br>
                    <div className={cx('option__item')}>
                        <input id='singleBed' name='singleBed' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='singleBed' className={cx('options__label')}></label>
                        <p>Giường đơn</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='doubleBed' name='doubleBed' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='doubleBed' className={cx('options__label')}></label>
                        <p>Giường đôi</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='oneBed' name='oneBed' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='oneBed' className={cx('options__label')}></label>
                        <p>1 giường</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='twoBed' name='twoBed' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='twoBed' className={cx('options__label')}></label>
                        <p>2 giường</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='threeBed' name='threeBed' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='threeBed' className={cx('options__label')}></label>
                        <p>3 giường</p>
                    </div>
                    
                    <br></br>
                    <div className={cx('option__item')}>
                        <input id='smoke' name='smoke' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='smoke' className={cx('options__label')}></label>
                        <p>Hút thuốc</p>
                    </div>
                    <div className={cx('option__item')}>
                        <input id='noSmoking' name='noSmoking' options='' type="checkbox" className={cx('options__checkbox')}/>
                        <label htmlFor='noSmoking' className={cx('options__label')}></label>
                        <p>Không hút thuốc</p>
                    </div>
                </div>
                <div className={cx('room__list')}> 
                    {roomData && roomData.length > 0 && roomData.map((room, index) => 
                        <Link to={`/${room.name}/room-booking`} key={index} className={cx('room__item')}>
                            
                            <img
                                src={room?.images ? `http://localhost:5000/images/roomImg/${room?.images?.image1}` : ''}
                                alt='{{this.name}}'
                            />
                            <main className={cx('room__body')}>
                                <h5 className={cx('room__title')}>{room.name}</h5>
                                <div className={cx('room__star-rating')}>
                                    {[...Array(Number(room.rating))].map((a, index) => (
                                        <i key={index} className={cx('fa-solid fa-star')}></i>
                                    ))}
                                    
                                </div>  
                                <p className={cx('room__des')}>
                                    {room.desc}
                                </p>
                            </main>
                            <footer className={cx('room__footer')}>
                                <div className={cx('room__overview')}>
                                    {room.overView}
                                </div>
                                <div className={cx('room__price')}>
                                    {Number(room.price).toLocaleString('vi-VN')}
                                </div>
                            </footer>
                        </Link>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default HotelRooms