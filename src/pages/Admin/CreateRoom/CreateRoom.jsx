import { useState } from 'react'

import * as managementService from '~/apiServices/managementServive'

import classNames from 'classnames/bind'
import styles from './CreateRoom.module.scss'

const cx = classNames.bind(styles)

function CreateRoom() {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [overView, setOverView] = useState('')
    const [price, setPrice] = useState()
    const [images, setImages] = useState([])
    const [bedType, setBedType] = useState('single')
    const [bedCount, setBedCount] = useState('2')
    const [floor, setFloor] = useState('5')
    const [capacity, setCapacity] = useState('3')
    const [rating, setRating] = useState('5')
    const [amenities, setAmenities] = useState('netflix')
    
    console.log(images)

    // Handle khi chọn ảnh
    const handleUpload = async(e) => {
        const images = Array.from(e.target.files)

        const formData = new FormData()

        images.forEach((image, index) => {
            formData.append(`file`, image)
            formData.append(`fileOrder[]`, index)
        })

        try {
            const res = await managementService.uploadRoom(formData)
            
            const nameImages = res.map(file => file.filename)
            setImages(nameImages)

            console.log('Tải ảnh thành công', nameImages)
        } catch (error) {
            console.error('Lỗi khi tải ảnh:', error)
        }

    }

    // Handle submit form data
    const handleSubmit = async(e) => {
        e.preventDefault()
        
        if (!images){
            console.log('vui lòng đợi load ảnh')
        }else if(images){
            const res = await managementService.createRoom(
                name,
                desc,
                price,
                images,
                overView,
                bedType,
                bedCount,
                floor,
                capacity,
                rating,
                amenities
            )
            if(res?.msg) {
                window.location.href = 'http://localhost:3000/admin/room-list'
            }
        } 
        
    }
    
    return ( 
        <div className={cx('wrapper')}>

            <h3 className={cx('create__title')}> Tạo phòng mới </h3>
            <form className={cx('create__form')} onSubmit={handleSubmit}>
                <div className={cx('create__form-item')}>
                    <label for='name' > Tên phòng </label>
                    <input type='text'  id='name' name='name' value={name} onChange={e => {setName(e.target.value)}}/>
                </div>
                <div className={cx('create__form-item')}>
                    <label for='desc' > Mô tả phòng </label>
                    <input type='text'  id='desc' name='desc' value={desc} onChange={e => {setDesc(e.target.value)}}/>
                </div>
                <div className={cx('create__form-item')}>
                    <label for='overview' > Tổng quan tiện ích </label>
                    <input type='text'  id='overview' name='overview' value={overView} onChange={e => {setOverView(e.target.value)}}/>
                </div>
                <div className={cx('create__form-item')}>
                    <label for='price' > Giá phòng </label>
                    <input type='text'  id='price' name='price' value={price} onChange={e => {setPrice(parseFloat(e.target.value))}}/>
                </div>
                <div className={cx('create__form-item')}>
                    <label for='image' > Ảnh </label>
                    <input type='file'  id='image' name='image' onChange={e => {handleUpload(e)}} multiple/>
                </div>
                <div className={cx('create__form-item')}>
                    <div className={cx('create__form-select')}>
                        <label for='bedType' > Loại giường </label>
                        <select id="bedType" name="bedType" value={bedType} onChange={e => setBedType(e.target.value)}>
                            <option value="single">Giường đơn</option>
                            <option value="double">Giường đôi</option>
                        </select>
                    </div>

                    <div className={cx('create__form-select')}>
                        <label for='bedCount' > Số lượng giường </label>
                        <select id="bedCount" name="bedCount" value={bedCount} onChange={e => setBedCount(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>
                </div>
                <div className={cx('create__form-item')}>
                    <div className={cx('create__form-select')}>
                        <label for='floor' > Số tầng </label>
                        <select id="floor" name="floor" value={floor} onChange={e => setFloor(e.target.value)}>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>
                    </div>

                    <div className={cx('create__form-select')} >
                        <label for='capacity' > Sức chứa </label>
                        <select id="capacity" name="capacity" value={capacity} onChange={e => setCapacity(e.target.value)}>
                            <option value="1">1 người</option>
                            <option value="2">2 người</option>
                            <option value="3">3 người</option>
                        </select>
                    </div>
                </div>
                <div className={cx('create__form-item')}>
                    <div className={cx('create__form-select')}>
                        <label for='rating' > Số sao </label>
                        <select id="rating" name="rating" value={rating} onChange={e => setRating(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className={cx('create__form-select')}>
                        <label for='amenities' > Tiện ích </label>
                        <select id="amenities" name="amenities" value={amenities} onChange={e => setAmenities(e.target.value)}>
                            <option value="netflix">netflix</option>
                            <option value="bep">bếp</option>
    
                        </select>
                    </div>
                </div>

                <button type='submit' className={cx('create__form-btn')}>Tạo phòng </button>
            </form>
        </div>
    )
}

export default CreateRoom