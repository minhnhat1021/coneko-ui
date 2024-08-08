
import Home from '~/pages/Home';
import About from '~/pages/About';
import HotelRooms from '~/pages/HotelRooms/HotelRooms';
import HotelRules from '~/pages/HotelRules';
import Contact from '~/pages/Contact/Contact';


import UserAccount from '~/pages/UserAccount';
import UserPurchase from '~/pages/UserPurchase';
import UserMybooking from '~/pages/UserMybooking';
import UserPayCard from '~/pages/UserPayCard/UserPayCard';

import { Admin, UserList, StatisticsRoom, RoomList, AvailableRooms, BookedRooms, CancelledRooms, RoomTrash, CreateRoom, EditRoom } from '~/pages/Admin'


import Checkout from '~/pages/Checkout';
import PaymentSuccessful from '~/pages/PaymentSuccessful';

import { HeaderOnly, UserLayout, RoomManagementLayout} from '~/layouts'


import config from '~/config';



const publicRoutes = [
    { path: config.routes.home, component: Home},
    { path: config.routes.hotelRooms, component: HotelRooms},
    { path: config.routes.hotelRules, component: HotelRules},
    { path: config.routes.contact, component: Contact},


    { path: config.routes.checkout, component: Checkout, layout: HeaderOnly},
    { path: config.routes.paymentSuccessful, component: PaymentSuccessful},
]
const privateRoutes = [
    { path: config.routes.about, component: About},
    { path: config.routes.userAccount, component: UserAccount, subLayout: UserLayout},
    { path: config.routes.userPurchase, component: UserPurchase, subLayout: UserLayout},
    { path: config.routes.userMybooking, component: UserMybooking, subLayout: UserLayout},
    { path: config.routes.userPayCard, component: UserPayCard, subLayout: UserLayout},
]

const adminRoutes = [
    { path: config.routes.admin, component: Admin},

    { path: config.routes.userList, component: UserList},

    { path: config.routes.statisticsRoom, component: StatisticsRoom, subLayout: RoomManagementLayout},
    { path: config.routes.roomList, component: RoomList, subLayout: RoomManagementLayout},
    { path: config.routes.availableRooms, component: AvailableRooms, subLayout: RoomManagementLayout},
    { path: config.routes.bookedRooms, component: BookedRooms , subLayout: RoomManagementLayout},
    { path: config.routes.cancelledRooms, component: CancelledRooms, subLayout: RoomManagementLayout},
    { path: config.routes.roomTrash, component: RoomTrash, subLayout: RoomManagementLayout},


    { path: config.routes.createRoom, component: CreateRoom},
    { path: config.routes.editRoom, component: EditRoom},



]


export { publicRoutes, privateRoutes, adminRoutes}