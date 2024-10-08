import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as roomService from '~/apiServices/roomService'
import * as managementService from '~/apiServices/managementServive'

import Button from '~/components/Button'

import classNames from 'classnames/bind'
import styles from './RoomList.module.scss'

const cx = classNames.bind(styles)

function RoomList() {
    const [roomData, setRoomData] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const res = await roomService.roomList()
            setRoomData(res?.rooms)
        }
        fetchApi()
    }, [])
    
    const handleDelete = async (id) => {
        const res = await managementService.deleteRoomById(id)

        if(res.msg){
            window.location.href='http://localhost:3000/admin/room-list'
        }
    }

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
        console.log(options)
        const handleFilter = async() => {
            const filters = Object.keys(options).filter(
              (key) => options[key] === true
            )
    
            const res = await roomService.filterRoomsByOptions(filters)
            setRoomData(res?.rooms)
    
        }
        handleFilter()
    },[options])
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('options')}>
                <div className={cx('option__item')}>
                    <input id='available' name='available' options='' type="checkbox" className={cx('options__checkbox')}/>
                    <label htmlFor='available' className={cx('options__label')}></label>
                    <p>Phòng còn trống</p>
                </div>
                <div className={cx('option__item')}>
                    <input id='booked' name='booked' options='' type="checkbox" className={cx('options__checkbox')}/>
                    <label htmlFor='booked' className={cx('options__label')}></label>
                    <p>Phòng đã đặt</p>
                </div>
                <div className={cx('option__item')}>
                    <input id='current' name='current' options='' type="checkbox" className={cx('options__checkbox')}/>
                    <label htmlFor='current' className={cx('options__label')}></label>
                    <p>Phòng đang sử dụng</p>
                </div>
                
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
                { roomData?.length > 0 ?  
                    (roomData.map((room, index) => 
                        <div key={index} className={cx('room__item')}>
                            <a href='/hotel-rooms/' className={cx('room__image')}>
                                <img
                                    src={`http://localhost:5000/images/roomImg/${room.image}`}
                                    alt='coneko'
                                />
                            </a>
                            <main className={cx('room__body')}>
                                <div className={cx('room__body-child')}>
                                    <p className={cx('room__name')}>
                                        {room.name}
                                    </p>
                                    <p className={cx('room__floor')}>
                                        Tầng {room.floor}
                                    </p>
                                </div>
                                <div className={cx('room__body-child')}>
                                    <p className={cx('room__bed-type')}>
                                        {room.bedType} 
                                    </p>
                                    <p className={cx('room__bed-count')}>
                                        {room.bedCount} giường
                                    </p>
                                </div>
                                <div className={cx('room__body-child')}>
                                    <p className={cx('room__star-rating')}>
                                        {room.rating} sao
                                    </p> 
                                    <p className={cx('room__capacity')}>
                                        để trống
                                    </p>

                                </div>
                                <div className={cx('room__body-child')}>
                                    <p className={cx('room__status')}>
                                        {room.status}
                                    </p> 
                                    <p className={cx('room__price')}>
                                        {room.price}
                                    </p> 
                                </div>
                                </main>
                            <footer className={cx('room__footer')}>                         
                                <Button adminUpdate to={`/admin/${room._id}/room-edit`}>Sửa</Button>
                                <Button adminDelete onClick={() => handleDelete(room._id)} >Xóa</Button>
                            </footer>
                        </div>
                    )) : <div className={cx('notification')} >
                            Chưa có phòng nào được tạo.
                            <Link to='/admin/create-room' className={cx('notification__link')} >Tạo phòng mới</Link>
                        </div>
                }     

                <div className={cx('modal__delete')}>
                    <div className={cx('modal__header')}>
                        
                    </div>
                    <div className={cx('modal__body')}>
                        <button type='button'>Xóa</button>
                        <button type='button'>Đóng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomList