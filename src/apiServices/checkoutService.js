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

export const payPalCheckout = async ({
        startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, 
        amenitiesCharge, amenities, totalPrice, roomId, userId
    }) => {
    try {
        const res = await request.post(`room/checkout/paypal`, 
            { startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, 
                amenitiesCharge, amenities, totalPrice, roomId, userId })
        
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const confirmPayPalCheckout = async ({
        startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, 
        amenitiesCharge, amenities, totalPrice, roomId, userId,  paymentId, payerId 
    }) => {
    try {
        
        const res = await request.post(`room/checkout/paypal/confirm`, 
            { startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, 
            amenitiesCharge, amenities, totalPrice, roomId, userId, paymentId, payerId })
            
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const vnPayCheckout = async ({
        startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, 
        amenitiesCharge, amenities, totalPrice, roomId, userId
    }) => {
    try {
        const res = await request.post(`room/checkout/vnpay`, 
            { startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, 
                amenitiesCharge, amenities, totalPrice, roomId, userId })
        
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const confirmVnPayCheckout = async ({ vnPayCheckoutId, vnp_Params }) => {
    try {
        const res = await request.post(`room/checkout/vnpay/confirm`, { vnPayCheckoutId, vnp_Params })
            
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const vnPayCheckoutDetails = async ({ vnPayCheckoutId }) => {
    try {
        const res = await request.post(`room/checkout/vnpay/details`, { vnPayCheckoutId })
            
        return res.data
    } catch (error) {
        console.log(error)
    }
}