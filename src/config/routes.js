const routes = {
    home: '/',
    about: '/about',
    hotelRooms: '/hotel-rooms',
    roomBooking: ':name/room-booking',
    paymentSuccessful: '/payment-successful',
    paymentVerification: 'payment-verification',
    hotelRules: '/hotel-rules',
    contact: '/contact',

    userAccount: '/user/account',
    userCurrentRooms: '/user/current-rooms',
    userBookingHistory: '/user/booking-history',
    userFavoriteRooms: '/user/favorite-rooms',
    userPayCard: '/user/paycard',

    userPurchase: '/user/purchase/list',


    admin: '/admin',
    adminLogin: '/admin/login',
    userList: '/admin/user-list',
    bannedUsers: '/admin/banned-users',
    
    statisticsRoom: '/admin/statistics-room',
    roomList: '/admin/room-list',
    availableRooms: '/admin/available-rooms',
    bookedRooms: '/admin/booked-rooms',
    cancelledRooms: '/admin/cancelled-rooms',
    roomTrash: '/admin/room-trash',
    bookingManagement: '/admin/booking-management',
    bookingDetails: '/admin/booking-management/details/:id',

    editRoom: '/admin/:roomId/room-edit',


    createRoom: '/admin/create-room',


    checkout: ':name/checkout',
}

export default routes;
