
import * as roomService from '~/apiServices/roomService'

function Payment() {
    // Thực hiện thanh toán phòng
    // const handlePayment = (e) => {
    //     e.preventDefault()
    //     const days = calculateDaysBetween()
    //     const fetchApi = async () => {
    //         const result = await roomService.payment({
    //             startDate,
    //             endDate,
    //             days,
    //             // totalPrice,
    //             roomId: room._id,
    //             userId: user._id
    //         })
    //         navigate('/payment-successful', {
    //             state: { startDate, endDate, days }
    //         })
    //     }
                
    //     fetchApi()
    // }
    return ( 
        <div>
            thanh toán
            {/* <button className={cx('payment__btn')} onClick={handlePayment}>Thanh toán</button> */}
        </div>
    );
}

export default Payment;