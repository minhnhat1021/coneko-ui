
import classNames from 'classnames/bind'
import styles from './HotelRules.module.scss'

const cx = classNames.bind(styles)

function HotelRules() {
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('term__title')}>Điều khoản và Điều kiện</div>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    1. Điều kiện sử dụng
                </div>
                <p className={cx('desc')}>
                    Khi truy cập và sử dụng trang web để đặt phòng, khách hàng đồng ý tuân thủ các điều khoản và điều kiện sử dụng được quy định. Vui lòng đảm bảo rằng mọi thông tin cung cấp là chính xác và đầy đủ khi đặt phòng.
                    Mọi hành vi lợi dụng hệ thống để đặt phòng ảo hoặc gây ảnh hưởng đến hoạt động của trang web đều bị nghiêm cấm.
                </p>
                <div className={cx('title')}>
                    2. Chính sách hủy và thay đổi đặt phòng
                </div>
                <p className={cx('desc')}>
                    Khách hàng có thể thay đổi hoặc hủy đặt phòng theo các quy định của khách sạn và tùy thuộc vào thời gian cụ thể của từng loại phòng. Vui lòng tham khảo các điều kiện hủy đặt phòng được hiển thị rõ ràng trước khi hoàn tất giao dịch.
                    Mọi yêu cầu thay đổi hoặc hủy đặt phòng cần thực hiện qua hệ thống hỗ trợ trực tuyến hoặc thông qua số hotline của khách sạn.
                </p>
                <div className={cx('title')}>
                    3. Bảo mật thông tin cá nhân
                </div>
                <p className={cx('desc')}>
                    Chúng tôi cam kết bảo vệ quyền riêng tư của khách hàng. Mọi thông tin cá nhân và thông tin đặt phòng sẽ được bảo mật theo chính sách bảo mật của trang web.
                    Khách hàng cần chịu trách nhiệm bảo quản thông tin tài khoản và không chia sẻ với bên thứ ba. Trong trường hợp phát hiện có hành vi sử dụng trái phép tài khoản, vui lòng liên hệ ngay với chúng tôi.

                </p>
                <div className={cx('title')}>
                    4. Quyền và nghĩa vụ của khách hàng
                </div>
                <p className={cx('desc')}>
                    Khách hàng có quyền truy cập vào thông tin chi tiết về các dịch vụ, tiện ích và giá cả của phòng trước khi thực hiện đặt phòng. Khách hàng có nghĩa vụ đọc kỹ các điều khoản và điều kiện trước khi xác nhận đặt phòng.
                    Khách hàng phải thông báo cho khách sạn về bất kỳ yêu cầu đặc biệt nào (như nhu cầu về thực phẩm, phòng không hút thuốc, hay yêu cầu khác) trước khi đặt phòng để đảm bảo đáp ứng tốt nhất nhu cầu.
                </p>
                <div className={cx('title')}>
                    5. Quy trình phản hồi và khiếu nại
                </div>
                <p className={cx('desc')}>
                    Khách hàng có quyền gửi phản hồi, ý kiến hoặc khiếu nại liên quan đến dịch vụ đặt phòng qua hệ thống hỗ trợ trực tuyến hoặc qua số hotline của khách sạn. Chúng tôi cam kết tiếp nhận và xử lý mọi phản hồi trong thời gian sớm nhất có thể.
                    Nếu có bất kỳ vấn đề gì xảy ra trong quá trình lưu trú, khách hàng nên thông báo ngay cho bộ phận lễ tân của khách sạn để được hỗ trợ và giải quyết kịp thời.
                </p>
            </div>
        </div>
    )
}

export default HotelRules