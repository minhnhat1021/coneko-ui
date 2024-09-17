const routes = {
    home: '/',
    about: '/about',
    hotelRooms: '/hotel-rooms',
    roomBooking: ':name/room-booking',
    paymentSuccessful: '/payment-successful',
    hotelRules: '/hotel-rules',
    contact: '/contact',

    userAccount: '/user/account',
    userPurchase: '/user/purchase/list',
    userBookingHistory: '/user/booking-history',
    userPayCard: '/user/paycard',

    admin: '/admin',
    userList: '/admin/user-list',
    bannedUsers: '/admin/banned-users',
    
    statisticsRoom: '/admin/statistics-room',
    roomList: '/admin/room-list',
    availableRooms: '/admin/available-rooms',
    bookedRooms: '/admin/booked-rooms',
    cancelledRooms: '/admin/cancelled-rooms',
    roomTrash: '/admin/room-trash',

    editRoom: '/admin/:roomId/room-edit',


    createRoom: '/admin/create-room',


    checkout: ':name/checkout',
}

export default routes;
