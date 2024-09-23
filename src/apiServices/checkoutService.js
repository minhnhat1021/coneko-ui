import * as request from '~/utils/request';


export const conekoCheckout = async ({
        startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, 
        amenitiesCharge, amenities, totalPrice, roomId, userId
    }) => {
        try {
            const res = await request.post(`room/checkout/coneko`, 
                { startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, 
                amenitiesCharge, amenities, totalPrice, roomId, userId })

            return res.data

        } catch (error) {
            console.log(error)
        }
}

export const payPalCheckout = async ({totalPrice, roomId, userId, roomName}) => {
    try {
        const res = await request.post(`room/checkout/paypal`, 
            { totalPrice, roomId, userId, roomName })
        
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const confirmPayPalPayment = async ({totalPrice,  paymentId, payerId }) => {
    try {
        const res = await request.post(`room/checkout/paypal/confirm`, 
            {totalPrice, paymentId, payerId })
        
        return res.data
    } catch (error) {
        console.log(error)
    }
}

