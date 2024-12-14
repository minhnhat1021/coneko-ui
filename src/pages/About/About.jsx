import { useState } from 'react'
import Modal from 'react-modal'

import images from '~/assets/images'

import classNames from 'classnames/bind'
import styles from './About.module.scss'

const cx = classNames.bind(styles)

Modal.setAppElement('#root')
function About({ userData = {data: {message: ''}}}) {

    const [modalIsOpen, setIsOpen] = useState(false)
    const [modalContent, setModalContent] = useState({})
    const closeModal = () => {
        setIsOpen(false)
    }
    const questions = [
        "Đặt phòng khách sạn là gì?",
        "Cách đặt phòng khách sạn hoạt động như thế nào?",
        "Những gì bao gồm trong phòng khách sạn của tôi?",
        "Điều khoản sử dụng phòng khách sạn là gì?",
        "Thời gian tối thiểu để đặt phòng khách sạn là bao lâu?",
        "Thời gian tối đa để đặt phòng khách sạn là bao lâu?",
    ]
    const answers = [
        "Đặt phòng khách sạn là quá trình bạn đặt trước phòng để lưu trú tại một khách sạn vào một thời gian xác định. Bạn có thể thực hiện việc này qua các nền tảng trực tuyến như website, ứng dụng hoặc qua quầy lễ tân của khách sạn. Việc đặt phòng giúp bạn đảm bảo có phòng trống khi đến nơi và tránh tình trạng hết phòng vào thời điểm bạn cần.",
        
        "Cách thức hoạt động của việc đặt phòng khách sạn chủ yếu thông qua các nền tảng trực tuyến, cho phép bạn tìm kiếm và đặt phòng từ xa. Ngoài ra, bạn có thể thực hiện đặt phòng trực tiếp tại quầy lễ tân của khách sạn nếu muốn. Hệ thống sẽ cung cấp thông tin về các phòng trống, giá cả và các dịch vụ kèm theo như bữa sáng, wifi miễn phí,...",
        
        "Phòng khách sạn thường bao gồm các tiện nghi cơ bản như giường ngủ, tủ quần áo, TV, máy lạnh và phòng tắm riêng. Một số phòng còn được trang bị thêm các dịch vụ bổ sung như minibar, máy pha cà phê, và các vật dụng cá nhân như áo choàng tắm và dép đi trong phòng. Hầu hết các khách sạn cũng cung cấp dịch vụ dọn phòng hàng ngày.",
        
        "Điều khoản sử dụng phòng khách sạn là các quy định mà bạn cần tuân thủ trong suốt quá trình lưu trú. Điều này bao gồm các quy định về việc thanh toán, hủy đặt phòng, yêu cầu về giấy tờ tùy thân, chính sách hoàn tiền, cũng như những quy định liên quan đến hành vi trong phòng khách sạn như cấm hút thuốc, không gây ồn ào hoặc mang thú cưng vào phòng.",
        
        "Thời gian tối thiểu để đặt phòng khách sạn thường là 1 ngày trước khi nhận phòng, đặc biệt trong các mùa cao điểm hoặc khi khách sạn có lượng khách đặt trước lớn. Tuy nhiên, một số khách sạn cho phép bạn đặt phòng gần thời gian nhận phòng nếu còn phòng trống. Điều này giúp bạn linh hoạt hơn trong việc lên kế hoạch cho chuyến đi.",
        
        "Thời gian tối đa để đặt phòng khách sạn thường không bị giới hạn, tuy nhiên, các khách sạn có thể yêu cầu bạn đặt phòng trong một khoảng thời gian nhất định (ví dụ: 6 tháng đến 1 năm trước). Một số khách sạn cũng cung cấp dịch vụ đặt phòng dài hạn cho các khách hàng có nhu cầu ở lâu dài, điển hình là các khách sạn cao cấp hoặc khách sạn căn hộ."
    ];
    
    const handleModal = (key) => {
        setIsOpen(true)
        setModalContent({
            title :questions[key], 
            content: answers[key]
        })
    }
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
                        <div className={cx('question__text')} >
                            <h1>Bạn có câu hỏi về việc đặt phòng khách sạn không?</h1>
                            <p>Không tìm thấy câu trả lời cho câu hỏi của bạn? Hãy liên hệ với chúng tôi!</p>
                            <button onClick={() => window.location.href = 'contact'}>Trò chuyện với chuyên gia</button>
                        </div>
                        <div className={cx('question__content')}>
                            <header className={cx('question__content-header')} onClick={() => handleModal(0)}>
                                <h1>Đặt phòng khách sạn là gì?</h1>
                                <p>Đặt phòng khách sạn là quy trình bạn chọn và xác nhận chỗ ở tại một khách sạn để thư giãn và nghỉ ngơi, giúp bạn có những trải nghiệm thoải mái và dễ chịu trong suốt kỳ nghỉ hoặc chuyến công tác.</p>
                            </header>
                            <main className={cx('question__content-body')}>
                                <h1 onClick={() => handleModal(1)}>Cách đặt phòng khách sạn hoạt động như thế nào? </h1>
                                <h1 onClick={() => handleModal(2)}>Những gì bao gồm trong phòng khách sạn của tôi? </h1>
                                <h1 onClick={() => handleModal(3)}>Điều khoản sử dụng phòng khách sạn là gì? </h1>
                                <h1 onClick={() => handleModal(4)}>Thời gian tối thiểu để đặt phòng khách sạn là bao lâu? </h1>
                                <h1 onClick={() => handleModal(5)}>Thời gian tối đa để đặt phòng khách sạn là bao lâu? </h1>
                            </main>
                        </div>
                    </div>
                </footer>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className={cx('custom-modal')}
                    overlayClassName={cx('custom-overlay')}
                >
                    <h2>{modalContent?.title}</h2>
                    <p>{modalContent?.content}</p>
                    <div className={cx('wrap__close-button')}>
                        <button className={cx('close-button')} onClick={closeModal}>Đóng</button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}

export default About