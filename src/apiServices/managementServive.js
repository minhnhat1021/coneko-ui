import * as request from '~/utils/request';

// Room ----------------------------------------------------------------
export const room = async () => {

    try {
        const res = await request.get('admin/room')
        return res.data

    } catch (error) {
        console.log(error)
    }
}
export const statisticsRoom = async () => {

    try {
        const res = await request.get('admin/statistics-room')
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const deleteRoomById = async ( id ) => {

    try {
        const res = await request.deleteReq('admin/room-delete', { data: { id } })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const roomEdit = async (id) => {

    try {
        const res = await request.get(`admin/${id}/room-edit`)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const updateRoom = async (roomId, name, desc, overView, price, image, bedType, bedCount, floor, capacity, rating, amenities ) => {
    try {
        const res = await request.put(`admin/room-update`, {
            roomId,
            name,
            desc,
            overView,
            price,
            image,
            bedType,
            bedCount,
            floor,
            capacity,
            rating,
            amenities
        })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const trashRooms = async () => {

    try {
        const res = await request.get('admin/trash-rooms')
        return res.data

    } catch (error) {
        console.log(error)
    }
}
export const restoreRoom = async (roomId) => {

    try {
        const res = await request.patch(`admin/room-restore`, { roomId } )
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const forceDeleteRoomById = async ( roomId ) => {

    try {
        const res = await request.deleteReq('admin/room-force', { data: { roomId } })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const createRoom = async ( name, desc, price, image, overView, bedType, bedCount, floor, capacity, rating, amenities ) => {

    try {
        const res = await request.post(`/admin/create-room`, { 
            name,
            desc,
            price,
            image,
            overView,
            bedType,
            bedCount,
            floor,
            capacity,
            rating,
            amenities 
        })

        return res.data

    } catch (error) {
        console.log(error)
    }
}
export const uploadRoom = async (formData) => {

    try {
        const res = await request.post(`/admin/upload`, formData )

        return res.data

    } catch (error) {
        console.log(error)
    }
}
// User ----------------------------------------------------------------
export const user = async () => {

    try {
        const res = await request.get('admin/user')
        return res.data

    } catch (error) {
        console.log(error)
    }
}
export const deleteUserById = async ( userId ) => {

    try {
        const res = await request.deleteReq('admin/user-ban', { data: { userId } })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const bannedUsers = async () => {

    try {
        const res = await request.get('admin/banned-users')
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const restoreUser = async (userId) => {
    try {
        const res = await request.patch(`admin/user-restore`, { userId } )
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const forceDeleteUserById = async ( userId ) => {
    try {
        const res = await request.deleteReq('admin/user-force', { data: { userId } })
        return res.data

    } catch (error) {
        console.log(error)
    }
}