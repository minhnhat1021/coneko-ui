import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import * as managementService from '~/apiServices/managementServive'

import Button from '~/components/Button'
import ConfirmDeleteModal from '../ConfirmDeleteModal'

import classNames from 'classnames/bind'
import styles from './RoomTrash.module.scss'

const cx = classNames.bind(styles)

function RoomTrash() {

    const [roomData, setRoomData] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchApi = async() => {
            const res = await managementService.trashRooms()
            setRoomData(res)
        }
        fetchApi()

    }, [])
    
    const handleRestore = async (id) => {
        const res = await managementService.restoreRoom(id)
        if(res.msg) {
             window.location.href='http://localhost:3000/admin/room-trash'
        }
    }
    const handleDelete = async (id) => {
        const res = await managementService.forceDeleteRoomById(id)
        if(res.msg) {
             window.location.href='http://localhost:3000/admin/room-trash'
        }
    }

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
        }else {
            setStatusAction(false)
            if(action === 'forceDelete') {
                setShowModal(true)

            } else {
                const res = await managementService.roomActions(action, roomIds)

                if(res?.msg){
                    window.location.href='http://localhost:3000/admin/room-trash'
                }
            }
            
        }
    }

    const handleConfirmDelete = async () => {
        var checkboxChecked = Array.from(document.querySelectorAll("input[name='roomIds[]']:checked"))
        const roomIds = checkboxChecked.map(checkbox => checkbox.id)

        const res = await managementService.roomActions(action, roomIds)

        if(res?.msg){
            window.location.href='http://localhost:3000/admin/room-trash'
        }
    }

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                Danh sách phòng đã xóa
            </div>

            <div className={cx('actions')}>
                <div className={cx('checkbox')}>
                    <input id='checkbox__all' name='available' options='' type="checkbox" className={cx('actions__checkbox')}/>
                    <label htmlFor='checkbox__all' className={cx('actions__label')}> Chọn tất cả</label>
                </div>
                <select id="actions" name="roomType" value={action} onChange={(e) => setAction(e.target.value)} >
                    <option value='' >-- Chọn hành động --</option>
                    <option value="restore">Khôi phục</option>
                    <option value="forceDelete">Xóa vĩnh viễn</option>
                </select>
                <Button onClick={handleActions} login disabled={disabledActions}>Thực hiện</Button>
                {statusAction && <span className={cx('checkbox__msg')}>Vui lòng chọn hành động</span>}
            </div>
            <div className={cx('room__list')}>  

                {roomData?.length > 0 ? 
                    (roomData.map((room, index) => 
                        <div key={index} className={cx('room__item')}>
                            <div className={cx('checkbox')}>
                                <input id={room._id} vaule={room._id} name='roomIds[]' type="checkbox" className={cx('actions__checkbox')}/>
                                <label htmlFor={room._id} className={cx('actions__label')}> </label>
                            </div>
                            <Link to='/hotel-rooms/' className={cx('room__image')}>
                                <img
                                    src={room?.images ? `http://localhost:5000/images/roomImg/${room?.images?.image1}` : ''} 
                                    alt='coneko'
                                />
                            </Link>
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
                                    <p className={cx('room__price')}>
                                        {room.price}
                                    </p> 

                                </div>
                               
                            </main>
                            <footer className={cx('room__footer')}>                         
                                <Button adminUpdate onClick={() => handleRestore(room._id)}>Khôi Phục</Button>
                                <Button adminDelete onClick={() => handleDelete(room._id)} >Xóa</Button>
                            </footer>
                        </div>
                    )) : <div className={cx('notification')} >
                            Chưa có phòng nào bị xóa
                    </div>
                }
            </div>

            <ConfirmDeleteModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                title='các phòng'
            />
        </div>
    )
}

export default RoomTrash