import * as request from '~/utils/request';


export const addFavoriteRooms = async ({ userId, roomId }) => {

    try {
        const res = await request.patch(`user/favorite-rooms/add`, 
            { userId, roomId })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const removeFavoriteRooms = async ({ userId, roomId }) => {

    try {
        const res = await request.patch(`user/favorite-rooms/remove`, 
            { userId, roomId })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const userList = async () => {
    try {
        const res = await request.get(`users`)
        return res.data

    } catch (error) {
        console.log(error)
    }
}
