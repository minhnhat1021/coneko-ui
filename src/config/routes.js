const routes = {
    home: '/',
    about: '/about',
    hotelRooms: '/hotel-rooms',
    hotelRules: '/hotel-rules',
    contact: '/contact',

    roomBooking: ':name/room-booking',
    checkout: ':name/checkout',
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

    bookingManagement: '/admin/booking-management',
    bookingDetails: '/admin/booking-management/details/:id',

}

export default routes
