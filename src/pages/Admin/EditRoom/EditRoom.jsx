import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import * as managementService from '~/apiServices/managementServive'
import classNames from 'classnames/bind'
import styles from './EditRoom.module.scss'

const cx = classNames.bind(styles)

function EditRoom() {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [overView, setOverView] = useState('')
    const [price, setPrice] = useState('')
    const [bedType, setBedType] = useState('')
    const [bedCount, setBedCount] = useState('')
    const [floor, setFloor] = useState('')
    const [capacity, setCapacity] = useState('')
    const [rating, setRating] = useState('')
    const [amenities, setAmenities] = useState('')

    const [images, setImages] = useState({
        image1: null,
        image2: null,
        image3: null
    })


    const { roomId } = useParams()
    
    useEffect(() => {
        const fetchApi = async() => {
            const res = await managementService.roomEdit(roomId)

            setName(res.name)
            setDesc(res.desc)
            setOverView(res.overView)
            setPrice(res.price)
            setImages(res.images)
            setBedType(res.bedType)
            setBedCount(res.bedCount)
            setFloor(res.floor)
            setCapacity(res.capacity)
            setRating(res.rating)
            setAmenities(res.amenities)
        }

        fetchApi()
    }, [])

    // UpLoad ảnh
    const handleUpload = async(e) => {
        const { name } = e.target
        const image = e.target.files[0]

        const formData = new FormData()

        formData.append('file', image)

        try {
            const res = await managementService.uploadRoom(formData)

            const nameImage = res.filename

            setImages(prevState => ({
            ...prevState,
            [name]: nameImage 
        }))

            console.log('Tải ảnh thành công', nameImage)
        } catch (error) {
            console.error('Lỗi khi tải ảnh:', error)
        }
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await managementService.updateRoom(roomId,
            name,
            desc,
            overView,
            price,
            images,
            bedType,
            bedCount,
            floor,
            capacity,
            rating,
            amenities
        )
        if(res.msg) {
            window.location.href='http://localhost:3000/admin/room-list'
        }
    }
    return ( 
        <div className={cx('wrapper')}>

            <h3 className={cx('create__title')}> Sửa thông tin phòng </h3>
            <form action='' className={cx('create__form')}  onSubmit={(e) => handleSubmit(e)}>
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
                    <input type='text'  id='price' name='price' value={price} onChange={e => {setPrice(e.target.value)}}/>
                </div>
                <div className={cx('create__form-item')}>
                    <label for='image' > Ảnh 1 {images.image1 && <p> {images.image1}</p>} </label>
                    <input type='file'  id='image1' name='image1' onChange={e => {handleUpload(e)}} />
                    
                </div>
                <div className={cx('create__form-item')}>
                    <label for='image' > Ảnh 2 {images.image2 && <p> {images.image2}</p>}</label>
                    <input type='file'  id='image2' name='image2' onChange={e => {handleUpload(e)}} />
                </div>
                <div className={cx('create__form-item')}>
                    <label for='image' > Ảnh 3 {images.image3 && <p> {images.image3}</p>}</label>
                    <input type='file'  id='image3' name='image3' onChange={e => {handleUpload(e)}} />
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

                <button type='submit' className={cx('create__form-btn')}>Cập nhật thông tin phòng</button>
            </form>
        </div>
    )
}

export default EditRoom