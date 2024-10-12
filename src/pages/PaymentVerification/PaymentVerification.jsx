import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'

import * as  checkoutService from '~/apiServices/checkoutService'

import {  Loading } from '~/components/Icons'

import classNames from 'classnames/bind'
import styles from './PaymentVerification.module.scss'

const cx = classNames.bind(styles)


function PaymentSuccessful() {
    const location = useLocation()

    const [searchParams] = useSearchParams()

    // PayPal Details
    const paymentId = searchParams.get('paymentId')
    const payerId = searchParams.get('PayerID')
    const payPalConfirmed = JSON.parse(localStorage.getItem('payPalConfirmed'))
    
    // VnPay Details
    const vnPayCheckoutId = searchParams.get('vnPayCheckoutId')
    const vnPayConfirmed = JSON.parse(localStorage.getItem('vnPayConfirmed'))

    // Zalo Pay check out
    const apptransid = searchParams.get('apptransid') || undefined
    const zaloPayConfirmed = JSON.parse(localStorage.getItem('zaloPayConfirmed'))

    const navigate = useNavigate()

    // PayPal
    useEffect(() => {
        const confirmPayPalCheckout = async () => {
            try {
                const res = await checkoutService.confirmPayPalCheckout({
                    paymentId, 
                    payerId 
                })
                if(res.payment.state === 'approved'){
                    const payPalDetailsEncode = searchParams.get('payPalDetails')
                    const payPalDetailsDecode =JSON.parse(payPalDetailsEncode)

                    const res = await checkoutService.savePayPalCheckout(payPalDetailsDecode)
                    if(res.return_code === 1) {
                        const { startDate, endDate, days, totalPrice } = payPalDetailsDecode

                        console.log(res.qrCode)
                        navigate('/payment-successful', {
                            state: { startDate, endDate, days, totalPrice, qrCode: res.qrCode}
                        })
                        localStorage.setItem('payPalConfirmed', JSON.stringify(true))   
                    }
                }
            } catch (error) {
                console.error('Xác nhận thanh toán Paypal lỗi', error)
            }
        }

        if (paymentId && payerId && !payPalConfirmed) {
            confirmPayPalCheckout()
        }
    }, [paymentId, payerId, payPalConfirmed])

    // VnPay
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        let vnp_Params = {}
            
        queryParams.forEach((value, key) => {
            vnp_Params[key] = value
        })

        const confirmVnPayCheckout = async () => {

            try {
                const res = await checkoutService.confirmVnPayCheckout({
                    vnp_Params
                })
                if(res?.code === '00'){
                    const res = await checkoutService.saveVnPayCheckout({ vnPayCheckoutId })
 
                    const { startDate, endDate, days, totalPrice } = res.vnPayDetails

                    navigate('/payment-successful', {
                        state: { startDate, endDate, days, totalPrice, qrCode: res.qrCode }
                    })

                    localStorage.setItem('vnPayConfirmed', JSON.stringify(true))
                }
            } catch (error) {
                console.error('Xác nhận thanh toán vnPay lỗi', error)
            }
        }
        if(vnPayCheckoutId && !vnPayConfirmed){
            confirmVnPayCheckout()
        } 

    }, [vnPayCheckoutId, vnPayConfirmed])
    
    // ZaloPay
    useEffect(() => {
        const statusZaloPayCheckout = async () => {
            try {
                const res = await checkoutService.statusZaloPayCheckout({
                    apptransid
                })
                if(res.return_code === 1) {
                    const zaloPayDetailsEncode = searchParams.get('zalopayDetails') || undefined
                    const zaloPayDetailsDecode = JSON.parse(zaloPayDetailsEncode)

                    const res = await checkoutService.saveZaloPayCheckout(zaloPayDetailsDecode)
                    console.log(res)
                    if(res.return_code === 1) {

                        const { startDate, endDate, days, totalPrice } = zaloPayDetailsDecode

                        navigate('/payment-successful', {
                            state: { startDate, endDate, days, totalPrice, qrCode: res.qrCode }
                        })

                        localStorage.setItem('zaloPayConfirmed', JSON.stringify(true))
                    }
                }
            } catch (error) {
                console.error('Xác nhận thanh toán vnPay lỗi', error)
            }
        }
        if(apptransid && !zaloPayConfirmed) {
            statusZaloPayCheckout()
        }
 
    }, [apptransid, zaloPayConfirmed])
    
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('title')}>Quá trình xác nhận thanh toán đang diễn ra</div>
                <span ><Loading /></span>
            </div>
        </div>

    )
}

export default PaymentSuccessful