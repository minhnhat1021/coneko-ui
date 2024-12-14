import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as roomService from '~/apiServices/roomService'
import * as managementService from '~/apiServices/managementServive'

import Button from '~/components/Button'

import classNames from 'classnames/bind'
import styles from './RoomList.module.scss'

const cx = classNames.bind(styles)

Modal.setAppElement('#root')
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
            window.location.href='/admin/room-list'
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
        const handleFilter = async() => {
            const filters = Object.keys(options).filter(
              (key) => options[key] === true
            )
    
            const res = await roomService.filterRoomsByOptions(filters)
            setRoomData(res?.rooms)
    
        }
        handleFilter()
    },[options])

    // Checkbox-all actions
    const [action, setAction] = useState()
    const [statusAction, setStatusAction] = useState(false)
    const [disabledActions, setDisabledActions] = useState(true)

    useEffect(() => {
        var checkboxAll = document.getElementById('checkbox__all')
        var roomCheckbox = document.querySelectorAll("input[name='roomIds[]']")

        checkboxAll.onchange = (e) => {
            const isCheckAll = e.target.checked
            
            roomCheckbox.forEach((checkbox) => {
                
                checkbox.checked = isCheckAll
                const countCheckboxChecked = document.querySelectorAll("input[name='roomIds[]']:checked").length

                if(countCheckboxChecked > 0 ){
                    setDisabledActions(false)
                } else{
                    setDisabledActions(true)
                }
            })
            
        }
        
        roomCheckbox.forEach((checkbox) => {
            checkbox.onchange = () => {
                const countCheckboxChecked = document.querySelectorAll("input[name='roomIds[]']:checked").length
                const isCheckAll = roomCheckbox.length === countCheckboxChecked
                checkboxAll.checked = isCheckAll

                if(countCheckboxChecked > 0 ){
                    setDisabledActions(false)
                } else{
                    setDisabledActions(true)
                }
            }
        }) 
        
    },[roomData])

    const handleActions = async() => {
        var checkboxChecked = Array.from(document.querySelectorAll("input[name='roomIds[]']:checked"))
        const roomIds = checkboxChecked.map(checkbox => checkbox.id)
        if(!action) {
            setStatusAction(true)
        } else {
            setStatusAction(false)
            const res = await managementService.roomActions(action, roomIds)

            if(res?.msg){
                window.location.href='/admin/room-list'
            }
        }
    }
    // Handle modal
    const [isOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState({})

    const closeModal = () => {
        setIsOpen(false)
    }
    const handleModal = (room) => {
        setIsOpen(true)
        setModalContent(room)
    }
    const formattedDay = (date) => {
        return  date.getDate() + ' / ' + (date.getMonth() + 1) + ' / ' + date.getFullYear()  
    }
    const formattedTime = (date) => {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        const seconds = date.getSeconds().toString().padStart(2, '0')
        
        return `${hours}:${minutes}:${seconds}`
    }
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
            <div id="actions" className={cx('actions')}>
                <div className={cx('checkbox')}>
                    <input id='checkbox__all' name='available' options='' type="checkbox" className={cx('actions__checkbox')}/>
                    <label htmlFor='checkbox__all' className={cx('actions__label')}> Chọn tất cả</label>
                </div>
                <select  name="roomType" value={action} onChange={(e) => setAction(e.target.value)} >
                    <option value='' >-- Chọn hành động --</option>
                    <option value="delete">Xóa</option>
                </select>
                <Button onClick={handleActions} login disabled={disabledActions}>Thực hiện</Button>
                {statusAction && <span className={cx('checkbox__msg')}>Vui lòng chọn hành động</span>}
            </div>
            
            <div className={cx('room__list')}>  
                { roomData?.length > 0 ?  
                    (roomData.map((room, index) => 
                        <div key={index} className={cx('room__item')}>
                            <div className={cx('checkbox')}>
                                <input id={room._id} vaule={room._id} name='roomIds[]' type="checkbox" className={cx('actions__checkbox')}/>
                                <label htmlFor={room._id} className={cx('actions__label')}> </label>
                            </div>
                            
                            <Link to='/hotel-rooms/' className={cx('room__image')}>
                                <img
                                    src={room?.images ? `${process.env.REACT_APP_IMAGES_URL}${room?.images?.image1}` : ''} 
                                    alt='coneko'
                                />
                            </Link>
                            <main className={cx('room__body')} onClick={() => handleModal(room)}>
                                <div className={cx('room__body-child')}>
                                    <p className={cx('room__name')}>
                                        {room.name}
                                    </p>
                                    <p className={cx('room__capacity')}>
                                    {room?.price?.toLocaleString('vi-VN')}
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
            <Modal
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                    className={cx('custom-modal')}
                    overlayClassName={cx('custom-overlay')}
                >
                    <div className={cx('modal__info')}>
                        <div className={cx('modal__info-list')}>
                            <p className={cx('modal__info-title')}>Thông tin phòng</p>

                            <div className={cx('modal__info-item')}>Tên phòng <span>{modalContent?.name}</span> </div>
                            <div className={cx('modal__info-item')}>Mô tả phòng <span>{modalContent?.desc}</span> 
                            </div><div className={cx('modal__info-item')}>Sức chứa <span>{modalContent?.capacity}</span> </div>
                            <div className={cx('modal__info-item')}>Diện tích<span>{modalContent?.size} m&sup2;</span> </div>
                            
                            
                        </div>
                        <div className={cx('modal__info-list')}>
                            <div className={cx('modal__info-item')}>Loại giường <span>{modalContent?.bedType}</span> </div>
                            <div className={cx('modal__info-item')}>Số lượng giường <span>{modalContent?.bedCount}</span> </div>
                            <div className={cx('modal__info-item')}>Số tầng<span>{modalContent?.floor}</span> </div>
                            <div className={cx('modal__info-item')}>Dịch vụ
                                <span>
                                    {modalContent?.amenities?.map((amenities, index) => 
                                        index === modalContent?.amenities?.length - 1 ? amenities : amenities + ', '
                                    )}
                                </span> 
                            </div>
                            <div className={cx('modal__info-item')}>Hút thuốc/ không hút thuốc <span>{modalContent?.smoking ? 'Hút thuốc' : ' Không hút thuốc'}</span> </div>
                        </div>
                        <div className={cx('modal__info-list')}>
                             <div className={cx('modal__info-item')}>
                                Ngày tạo phòng 
                                <span>{formattedDay(new Date(modalContent?.createdAt))} - {formattedTime(new Date(modalContent?.createdAt))}</span> 
                            </div>
                            <div className={cx('modal__info-item')}>Giá phòng <span>{modalContent?.price?.toLocaleString('vi-VN')}</span> </div>
                            
                        </div>
                    </div>
                    <div className={cx('wrap__close-button')}>
                        <button className={cx('close-button')} onClick={closeModal}>Đóng</button>
                    </div>
                </Modal>
        </div>
    )
}

export default RoomList