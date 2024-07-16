
import Home from '~/pages/Home';
import About from '~/pages/About';
import Product from '~/pages/Product';
import HotelRules from '~/pages/HotelRules';
import Contact from '~/pages/Contact';

import User from '~/pages/User';
import UserAccount from '~/pages/UserAccount';
import UserPurchase from '~/pages/UserPurchase';
import UserMybooking from '~/pages/UserMybooking';

import Admin from '~/pages/Admin';
import Checkout from '~/pages/Checkout';
import PaymentSuccessful from '~/pages/PaymentSuccessful';

import { HeaderOnly } from '~/layouts'

import config from '~/config';


const publicRoutes = [
    { path: config.routes.home, component: Home},
    { path: config.routes.about, component: About},
    { path: config.routes.products, component: Product},
    { path: config.routes.hotelRules, component: HotelRules},
    { path: config.routes.contact, component: Contact},

    { path: config.routes.user, component: User},
    { path: config.routes.userAccount, component: UserAccount},
    { path: config.routes.userPurchase, component: UserPurchase},
    { path: config.routes.userMybooking, component: UserMybooking},

    { path: config.routes.admin, component: Admin, layout: null},
    { path: config.routes.checkout, component: Checkout, layout: HeaderOnly},
    { path: config.routes.paymentSuccessful, component: PaymentSuccessful},
]
const privateRoutes = [

]


export { publicRoutes, privateRoutes }