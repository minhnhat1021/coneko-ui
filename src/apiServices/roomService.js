import * as request from '~/utils/request';


export const payment = async ({startDate, endDate, days, totalPrice, roomId, userId}) => {
    try {
        const res = await request.post(`room/payment`, { startDate, endDate, days, totalPrice, roomId, userId })
        return res.data

    } catch (error) {
        console.log(error)
    }
}
