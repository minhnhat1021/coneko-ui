const routes = {
    home: '/',
    about: '/about',
    hotelRooms: '/hotel-rooms',
    hotelRules: '/hotel-rules',
    contact: '/contact',

    register: '/register',
    login: '/login',

    roomBooking: ':name/room-booking',
    checkout: '/checkout',
    paymentSuccessful: '/payment-successful',
    paymentVerification: '/payment-verification',

    userAccount: '/user/account',
    userCurrentRooms: '/user/current-rooms',
    userBookingHistory: '/user/booking-history',
    userFavoriteRooms: '/user/favorite-rooms',
    userPayCard: '/user/paycard',

    admin: '/admin',
    adminLogin: '/admin/login',
    adminRegister: '/admin/register',

    userList: '/admin/user-list',
    bannedUsers: '/admin/banned-users',
    
    statisticsRoom: '/admin/statistics-room',
    roomList: '/admin/room-list',
    createRoom: '/admin/create-room',
    roomTrash: '/admin/room-trash',
    editRoom: '/admin/:roomId/room-edit',

    bookedDeposit: '/admin/booked-deposit',
    bookedFulPayment: '/admin/booked-ful-payment',
    bookingList: '/admin/booking-list',
    bookingTrash: '/admin/booking-trash',
    bookingDetails: '/admin/booking-management/details/:id',

}

export default routes
