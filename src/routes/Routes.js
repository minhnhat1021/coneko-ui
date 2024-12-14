
import Home from '~/pages/Home'
import About from '~/pages/About'
import HotelRooms from '~/pages/HotelRooms'
import HotelRules from '~/pages/HotelRules'
import Contact from '~/pages/Contact/Contact'

import Register from '~/pages/LoginRegister/Register'
import Login from '~/pages/LoginRegister/Login'

import RoomBooking from '~/pages/RoomBooking'
import Checkout from '~/pages/Checkout'
import PaymentSuccessful from '~/pages/PaymentSuccessful'
import PaymentVerification from '~/pages/PaymentVerification'


import UserAccount from '~/pages/UserAccount'
import UserBookingHistory from '~/pages/UserBookingHistory'
import UserFavoriteRooms from '~/pages/UserFavoriteRooms'
import UserCurrentRooms from '~/pages/UserCurrentRooms'
import UserPayCard from '~/pages/UserPayCard/UserPayCard'

import { 
    Admin, 
    AdminLogin, 
    AdminRegister, 

    UserList, 
    BannedUsers,

    StatisticsRoom, 
    RoomList, 
    BookingDetails, 
    RoomTrash, 
    CreateRoom, 

    EditRoom,

    BookingManagement, 
    BookedFulPayment,
    BookedDeposit,
    BookingTrash, 
} from '~/pages/Admin'

import {MainLayout, FragmentLayout, AdminLayout, HeaderOnly, UserLayout, UserManagementLayout, RoomManagementLayout, BookingManagementLayout} from '~/layouts'
import config from '~/config'



const publicRoutes = [
    { path: config.routes.about, component: About},
    { path: config.routes.home, component: Home},
    { path: config.routes.hotelRooms, component: HotelRooms},
    { path: config.routes.hotelRules, component: HotelRules},
    { path: config.routes.contact, component: Contact},
    { path: config.routes.register, component: Register},
    { path: config.routes.login, component: Login},

    { path: config.routes.adminLogin, component: AdminLogin, layout: AdminLayout },
    { path: config.routes.adminRegister, component: AdminRegister, layout: AdminLayout},

]
const privateRoutes = [

    { path: config.routes.roomBooking, component: RoomBooking, subLayout: FragmentLayout},
    { path: config.routes.checkout, component: Checkout, subLayout: FragmentLayout},
    { path: config.routes.paymentVerification, component: PaymentVerification, subLayout: FragmentLayout},
    { path: config.routes.paymentSuccessful, component: PaymentSuccessful, subLayout: FragmentLayout},

    { path: config.routes.userAccount, component: UserAccount, subLayout: UserLayout},
    { path: config.routes.userCurrentRooms, component: UserCurrentRooms, subLayout: UserLayout},
    { path: config.routes.userBookingHistory, component: UserBookingHistory, subLayout: UserLayout},
    { path: config.routes.userFavoriteRooms, component: UserFavoriteRooms, subLayout: UserLayout},
    { path: config.routes.userPayCard, component: UserPayCard, subLayout: UserLayout},
]

const adminRoutes = [
    { path: config.routes.admin, component: Admin},

    { path: config.routes.userList, component: UserList, subLayout: UserManagementLayout},
    { path: config.routes.bannedUsers, component: BannedUsers, subLayout: UserManagementLayout},

    { path: config.routes.statisticsRoom, component: StatisticsRoom, subLayout: RoomManagementLayout},
    { path: config.routes.roomList, component: RoomList, subLayout: RoomManagementLayout},
    { path: config.routes.roomTrash, component: RoomTrash, subLayout: RoomManagementLayout},
    { path: config.routes.createRoom, component: CreateRoom},
    { path: config.routes.editRoom, component: EditRoom},

    { path: config.routes.bookedDeposit, component: BookedDeposit, subLayout: BookingManagementLayout},
    { path: config.routes.bookedFulPayment, component: BookedFulPayment, subLayout: BookingManagementLayout},
    { path: config.routes.bookingList, component: BookingManagement, subLayout: BookingManagementLayout},

    { path: config.routes.bookingTrash, component: BookingTrash},
    { path: config.routes.bookingDetails, component: BookingDetails},

]


export { publicRoutes, privateRoutes, adminRoutes}