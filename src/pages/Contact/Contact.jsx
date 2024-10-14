
import images from '~/assets/images'

import { FeedbackIconMsg, FeedbackIconLocation, FeedbackIconPhone } from '~/components/Icons'
import classNames from 'classnames/bind'
import styles from './Contact.module.scss'

const cx = classNames.bind(styles)

function Contact() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container__img')}>
                <div className={cx('container__form-wrap')}>
                    <h1>Liên hệ</h1>
                    <form className={cx('container__form')}>
                        <div className={cx('form__input')}>
                            <input type="text" name="name" placeholder="Họ tên của bạn" required />
                            <input type="email" name="email" placeholder="Email" required />
                            <input type="text" name="phone" placeholder="Số điện thoại" required />
                            <input type="text" name="old" placeholder="Tuổi" required />
                        </div>
                        <div className={cx('form__msg')}>
                            <textarea name="message" placeholder="Lời nhắn" required></textarea>
                        </div>
                        <button className={cx('form__btn')}>Gửi đi</button>
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
                            <h3>0987-123-4567</h3>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact