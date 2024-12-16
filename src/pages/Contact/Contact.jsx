
import images from '~/assets/images'
import * as userService from '~/apiServices/userService'
import { message } from 'antd'
import { useState } from 'react'

import { FeedbackIconMsg, FeedbackIconLocation, FeedbackIconPhone } from '~/components/Icons'
import classNames from 'classnames/bind'
import styles from './Contact.module.scss'

const cx = classNames.bind(styles)

function Contact() {

    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [numberOfPeople, setNumberOfPeople] = useState('')
    const [preferences, setPreferences] = useState('')

    const guestInquiry = async(e) => {
        e.preventDefault()
        if (!fullName || !phone || !email || !address || !preferences) {
            message.error('Vui lòng điền đầy đủ thông tin')
            return
        }
        const res = await userService.guestInquiry({fullName, phone, email,address, numberOfPeople, preferences})
        if(res?.status === 200) {
            message.success(res?.msg)
            setFullName('')
            setPhone('')
            setEmail('')
            setAddress('')
            setNumberOfPeople('')
            setPreferences('')
        }
    }
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container__img')}>
                <div className={cx('container__form-wrap')}>
                    <h1>Liên hệ</h1>
                    <form className={cx('container__form')}>
                        <div className={cx('form__input')}>
                            <input type='text' placeholder='Họ tên' value={fullName} onChange={(e) => setFullName(e.target.value)} />
                            <input type='text' placeholder='Số điện thoại' value={phone} onChange={(e) => setPhone(e.target.value)} />
                            <input type='text' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type='text' placeholder='Địa chỉ' value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className={cx('form__msg')}>
                            <textarea type='text' placeholder='Sở thích' value={preferences} onChange={(e) => setPreferences(e.target.value)} />
                        </div>
                        <button className={cx('form__btn')} onClick={(e) => guestInquiry(e)}>Gửi đi</button>
                    </form>
                </div>
            </div>  
            <div className={cx('container')}>
                <div className={cx('feedback')}>
                    <h1 className={cx('feedback__title')}>
                        Chúng tôi có thể giúp gì cho bạn 
                    </h1>
                    <div className={cx('feedback__list')}>
                        <div className={cx('feedback__item')}>
                            <FeedbackIconMsg />

                            <h2>Chat với chúng tôi</h2>
                            <p>Nói chuyện với đội ngũ của chúng tôi.</p>
                            <h3>minhnhat.dev.21@gmail.com</h3>
                        </div>
                        <div className={cx('feedback__item')}>
                            <FeedbackIconLocation />

                            <h2>Ghé thăm chúng tôi</h2>
                            <p>Thăm trụ sở chính của chúng tôi.</p>
                            <h3>Đại học thăng long</h3>
                        </div>
                        <div className={cx('feedback__item')}>
                            <FeedbackIconPhone />

                            <h2>Gọi cho chúng tôi</h2>
                            <p>Từ Thứ Hai đến Thứ Sáu, từ 8 giờ sáng đến 5 giờ chiều.</p>
                            <h3>0393-189-262</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact