
import Home from '~/pages/Home';
import About from '~/pages/About';
import Product from '~/pages/Product';
import HotelRules from '~/pages/HotelRules';
import Contact from '~/pages/Contact';
import User from '~/pages/User';
import Admin from '~/pages/Admin';
import Checkout from '~/pages/Checkout';
import PaymentSuccessful from '~/pages/PaymentSuccessful';

import { HeaderOnly } from '~/layouts'

const publicRoutes = [
    { path: '/', component: Home},
    { path: '/about', component: About},
    { path: '/product', component: Product},
    { path: '/hotel-rules', component: HotelRules},
    { path: '/contact', component: Contact},
    { path: '/user/:id', component: User},
    { path: '/admin', component: Admin, layout: null},
    { path: '/checkout', component: Checkout, layout: HeaderOnly},
    { path: '/payment-successful', component: PaymentSuccessful},
]
const privateRoutes = [

]

export { publicRoutes, privateRoutes }