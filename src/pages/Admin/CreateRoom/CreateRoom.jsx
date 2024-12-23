import { useState } from 'react'

import * as managementService from '~/apiServices/managementServive'

import classNames from 'classnames/bind'
import styles from './CreateRoom.module.scss'

const cx = classNames.bind(styles)

function CreateRoom() {
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [bedType, setBedType] = useState('Giường đôi')
    const [bedCount, setBedCount] = useState('2')
    const [discountPercentage, setDiscountPercentage] = useState('60')
    const [rating, setRating] = useState('5')
    const [size, setSize] = useState('50')
    const [capacity, setCapacity] = useState('4')

    const [images, setImages] = useState({
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
    })
    // Handle khi chọn ảnh
    const handleUpload = async(e) => {
        const { name } = e.target
        const image = e.target.files[0]

        console.log(image)
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

    // Handle submit form data
    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const { image1, image2, image3, image4, image5 } = images
        const imageCount = [image1, image2, image3, image4, image5].filter(image => image !== null).length

        if (imageCount < 5){
            console.log('Vui lòng up đủ 5 ảnh')
        }else {
            const originPrice = price / (1 - (discountPercentage / 100))
            const res = await managementService.createRoom(
                name,
                desc,
                price,
                originPrice,
                discountPercentage,
                size, 
                capacity,
                images,
                bedType,
                bedCount,
                rating,
            )
            if(res?.msg) {
                window.location.href = '/admin/room-list'
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
                    <label for='size' > Kích thước phòng </label>
                    <input type='text'  id='size' name='size' value={size} onChange={e => {setSize(e.target.value)}}/>
                </div>
                <div className={cx('create__form-item')}>
                    <label for='price' > Giá phòng </label>
                    <input type='text'  id='price' name='price' value={price} onChange={e => {setPrice(e.target.value === '' ? 0 : parseFloat(e.target.value))}}/>
                </div>
                <div className={cx('create__form-item')}>
                    <label for='discountPercentage' > Phần trăm giảm giá </label>
                    <input type='text'  id='discountPercentage' name='discountPercentage' value={discountPercentage} onChange={e => {setDiscountPercentage(e.target.value === '' ? 0 : parseFloat(e.target.value))}}/>
                </div>
                <div className={cx('create__form-item')}>
                    <label for='capacity' > Sức chứa </label>
                    <input type='text'  id='capacity' name='capacity' value={capacity} onChange={e => {setCapacity(e.target.value)}}/>
                </div>
                <div className={cx('create__form-item')}>
                    <label for='image' > Ảnh 1 </label>
                    <input type='file'  id='image1' name='image1' onChange={e => {handleUpload(e)}} />
                </div>
                <div className={cx('create__form-item')}>
                    <label for='image' > Ảnh 2 </label>
                    <input type='file'  id='image2' name='image2' onChange={e => {handleUpload(e)}} />
                </div>
                <div className={cx('create__form-item')}>
                    <label for='image' > Ảnh 3 </label>
                    <input type='file'  id='image3' name='image3' onChange={e => {handleUpload(e)}} />
                </div>
                <div className={cx('create__form-item')}>
                    <label for='image' > Ảnh 4 </label>
                    <input type='file'  id='image4' name='image4' onChange={e => {handleUpload(e)}} />
                </div>
                <div className={cx('create__form-item')}>
                    <label for='image' > Ảnh 5 </label>
                    <input type='file'  id='image5' name='image5' onChange={e => {handleUpload(e)}} />
                </div>
                <div className={cx('create__form-item')}>
                    <label for='bedType' > Loại giường </label>
                    <select id="bedType" name="bedType" value={bedType} onChange={e => setBedType(e.target.value)}>
                        <option value="Giường đơn">Giường đơn</option>
                        <option value="Giường đôi">Giường đôi</option>
                    </select>
                    
                </div>
                <div className={cx('create__form-item')}>
                    <label for='bedCount' > Số lượng giường </label>
                    <select id="bedCount" name="bedCount" value={bedCount} onChange={e => setBedCount(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
                <div className={cx('create__form-item' )}>
                        <label for='rating' > Số sao </label>
                        <select id="rating" name="rating" value={rating} onChange={e => setRating(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                </div>

                <button type='submit' className={cx('create__form-btn')}>Tạo phòng </button>
            </form>
        </div>
    )
}

export default CreateRoom