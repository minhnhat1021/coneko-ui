
import images from '~/assets/images'

import classNames from 'classnames/bind'
import styles from './About.module.scss'

const cx = classNames.bind(styles)

function About({ userData = {data: {message: ''}}}) {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <header className={cx('header')}>
                    <h3>Đội ngũ</h3>
                    <h1>Về chúng tôi</h1>
                    <p>Gặp gỡ những con người đứng sau Coneko. Đội ngũ của chúng tôi cam kết mang đến cho bạn dịch vụ xuất sắc và đảm bảo trải nghiệm đặt phòng khách sạn của bạn diễn ra suôn sẻ.</p>
                </header>
                <main className={cx('body')}>
                    <div className={cx('member__list')}>
                        <div className={cx('member__item')}>
                            <img src={images.avatar1} alt='coneko'/>
                            <h1>Nhật Minh</h1>
                            <h3>Founder and CEO</h3>
                            <p>Với hơn 15 năm kinh nghiệm trong ngành khách sạn và dịch vụ lưu trú, niềm đam mê của Nhật Minh đã thúc đẩy sự thành công của công ty.</p>
                        </div>
                        <div className={cx('member__item')}>
                            <img src={images.avatar2} alt='coneko'/>
                            <h1>Nhật Minh</h1>
                            <h3>Founder and CEO</h3>
                            <p>Với hơn 15 năm kinh nghiệm trong ngành khách sạn và dịch vụ lưu trú, niềm đam mê của Nhật Minh đã thúc đẩy sự thành công của công ty.</p>
                        </div>
                        <div className={cx('member__item')}>
                            <img src={images.avatar1} alt='coneko'/>
                            <h1>Nhật Minh</h1>
                            <h3>Founder and CEO</h3>
                            <p>Với hơn 15 năm kinh nghiệm trong ngành khách sạn và dịch vụ lưu trú, niềm đam mê của Nhật Minh đã thúc đẩy sự thành công của công ty.</p>
                        </div>
                        <div className={cx('member__item')}>
                            <img src={images.avatar1} alt='coneko'/>
                            <h1>Nhật Minh</h1>
                            <h3>Founder and CEO</h3>
                            <p>Với hơn 15 năm kinh nghiệm trong ngành khách sạn và dịch vụ lưu trú, niềm đam mê của Nhật Minh đã thúc đẩy sự thành công của công ty.</p>
                        </div>
                        <div className={cx('member__item')}>
                            <img src={images.avatar1} alt='coneko'/>
                            <h1>Nhật Minh</h1>
                            <h3>Founder and CEO</h3>
                            <p>Với hơn 15 năm kinh nghiệm trong ngành khách sạn và dịch vụ lưu trú, niềm đam mê của Nhật Minh đã thúc đẩy sự thành công của công ty.</p>
                        </div>
                        <div className={cx('member__item')}>
                            <img src={images.avatar1} alt='coneko'/>
                            <h1>Nhật Minh</h1>
                            <h3>Founder and CEO</h3>
                            <p>Với hơn 15 năm kinh nghiệm trong ngành khách sạn và dịch vụ lưu trú, niềm đam mê của Nhật Minh đã thúc đẩy sự thành công của công ty.</p>
                        </div>
                    </div>
                </main>
                <footer className={cx('footer')}>
                    <div className={cx('question__about')}>
                        <div className={cx('question__text')}>
                            <h1>Bạn có câu hỏi về việc đặt phòng khách sạn không?</h1>
                            <p>Không tìm thấy câu trả lời cho câu hỏi của bạn? Hãy liên hệ với chúng tôi!</p>
                            <button>Trò chuyện với chuyên gia</button>
                        </div>
                        <div className={cx('question__content')}>
                            <header className={cx('question__content-header')}>
                                <h1>Đặt phòng khách sạn là gì?</h1>
                                <p>Đặt phòng khách sạn là quy trình bạn chọn và xác nhận chỗ ở tại một khách sạn để thư giãn và nghỉ ngơi, giúp bạn có những trải nghiệm thoải mái và dễ chịu trong suốt kỳ nghỉ hoặc chuyến công tác.</p>
                            </header>
                            <main className={cx('question__content-body')}>
                                <h1>Cách đặt phòng khách sạn hoạt động như thế nào? </h1>
                                <h1>Những gì bao gồm trong phòng khách sạn của tôi? </h1>
                                <h1>Điều khoản sử dụng phòng khách sạn là gì? </h1>
                                <h1>Thời gian tối thiểu để đặt phòng khách sạn là bao lâu? </h1>
                                <h1>Thời gian tối đa để đặt phòng khách sạn là bao lâu? </h1>
                            </main>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default About