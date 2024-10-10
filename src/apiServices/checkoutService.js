import * as request from '~/utils/request';


export const conekoCheckout = async ({
        startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, amenitiesCharge, amenities, 
        originalPrice, discountRate, discountAmount, totalPrice, roomId, userId
    }) => {
        try {
            const res = await request.post(`room/checkout/coneko`, 
                { startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, amenitiesCharge, amenities, 
                originalPrice, discountRate, discountAmount, totalPrice, roomId, userId })

            return res.data

        } catch (error) {
            console.log(error)
        }
}

// Paypal checkout -------------------------------------------------------------
export const payPalCheckout = async ({
        startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, amenitiesCharge, amenities, 
        originalPrice, discountRate, discountAmount, totalPrice, roomId, userId
    }) => {
    try {
        const res = await request.post(`room/checkout/paypal`, 
            { startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, amenitiesCharge, amenities, 
            originalPrice, discountRate, discountAmount, totalPrice, roomId, userId })
        
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const confirmPayPalCheckout = async ({paymentId, payerId }) => {
    try {
        
        const res = await request.post(`room/checkout/paypal/confirm`, {  paymentId, payerId })
            
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const savePayPalCheckout = async ( payPalDetails ) => {
    try {
        const res = await request.post(`room/checkout/paypal/save`, { payPalDetails })
        
        return res.data
    } catch (error) {
        console.log(error)
    }
    }

// vnPay checkout -------------------------------------------------------------
export const vnPayCheckout = async ({
        startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, amenitiesCharge, amenities, 
        originalPrice, discountRate, discountAmount, totalPrice, roomId, userId
    }) => {
    try {
        const res = await request.post(`room/checkout/vnpay`, 
            { startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, amenitiesCharge, amenities, 
            originalPrice, discountRate, discountAmount, totalPrice, roomId, userId })
        
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const confirmVnPayCheckout = async ({ vnp_Params }) => {
    try {
        const res = await request.post(`room/checkout/vnpay/confirm`, { vnp_Params })
            
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const saveVnPayCheckout = async ({ vnPayCheckoutId }) => {
    try {
        const res = await request.post(`room/checkout/vnpay/save`, { vnPayCheckoutId })
            
        return res.data
    } catch (error) {
        console.log(error)
    }
}

// zaloPay checkout -------------------------------------------------------------
export const zaloPayCheckout = async ({
        startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, amenitiesCharge, amenities, 
        originalPrice, discountRate, discountAmount, totalPrice, roomId, userId
}) => {
try {
    const res = await request.post(`room/checkout/zalopay`, 
        { startDate, endDate, days, roomPrice, roomCharge, amenitiesPrice, amenitiesCharge, amenities, 
        originalPrice, discountRate, discountAmount, totalPrice, roomId, userId })
    
    return res.data
} catch (error) {
    console.log(error)
}
}
export const statusZaloPayCheckout = async ({ apptransid }) => {
try {
    const res = await request.post(`room/checkout/zalopay/status/${apptransid}`)
    
    return res.data
} catch (error) {
    console.log(error)
}
}
export const saveZaloPayCheckout = async ( zaloPayDetails ) => {
    try {
        const res = await request.post(`room/checkout/zalopay/save`, { zaloPayDetails })
        
        return res.data
    } catch (error) {
        console.log(error)
    }
    }