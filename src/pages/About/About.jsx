
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
                            <img src={images.avatar} alt='coneko'/>
                            <h1>Nhật Minh</h1>
                            <h3>Founder and CEO</h3>
                            <p>Với hơn 15 năm kinh nghiệm trong ngành khách sạn và dịch vụ lưu trú, niềm đam mê của John đã thúc đẩy sự thành công của công ty.</p>
                        </div>
                        <div className={cx('member__item')}>
                            <img src={images.avatar} alt='coneko'/>
                            <h1>Nhật Minh</h1>
                            <h3>Founder and CEO</h3>
                            <p>Với hơn 15 năm kinh nghiệm trong ngành khách sạn và dịch vụ lưu trú, niềm đam mê của John đã thúc đẩy sự thành công của công ty.</p>
                        </div>
                        <div className={cx('member__item')}>
                            <img src={images.avatar} alt='coneko'/>
                            <h1>Nhật Minh</h1>
                            <h3>Founder and CEO</h3>
                            <p>Với hơn 15 năm kinh nghiệm trong ngành khách sạn và dịch vụ lưu trú, niềm đam mê của John đã thúc đẩy sự thành công của công ty.</p>
                        </div>
                        <div className={cx('member__item')}>
                            <img src={images.avatar} alt='coneko'/>
                            <h1>Nhật Minh</h1>
                            <h3>Founder and CEO</h3>
                            <p>Với hơn 15 năm kinh nghiệm trong ngành khách sạn và dịch vụ lưu trú, niềm đam mê của John đã thúc đẩy sự thành công của công ty.</p>
                        </div>
                        <div className={cx('member__item')}>
                            <img src={images.avatar} alt='coneko'/>
                            <h1>Nhật Minh</h1>
                            <h3>Founder and CEO</h3>
                            <p>Với hơn 15 năm kinh nghiệm trong ngành khách sạn và dịch vụ lưu trú, niềm đam mê của John đã thúc đẩy sự thành công của công ty.</p>
                        </div>
                        <div className={cx('member__item')}>
                            <img src={images.avatar} alt='coneko'/>
                            <h1>Nhật Minh</h1>
                            <h3>Founder and CEO</h3>
                            <p>Với hơn 15 năm kinh nghiệm trong ngành khách sạn và dịch vụ lưu trú, niềm đam mê của John đã thúc đẩy sự thành công của công ty.</p>
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
                                <h1>What is a Meeting Space?</h1>
                                <p>A virtual office space gives your company the use of an address in a professional building in the exact area that will represent your company best.</p>
                            </header>
                            <main className={cx('question__content-body')}>
                                <h1>How does a Meeting Space work? </h1>
                                <h1>What is included in the my Meeting Space? </h1>
                                <h1>What are term of usage for Meeting Spaces? </h1>
                                <h1>What is the minimum time for Meeting Space renting? </h1>
                                <h1>What is the maximum time for Meeting Space renting? </h1>
                            </main>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default About;