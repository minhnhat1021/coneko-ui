import * as request from '~/utils/request';

export const roomDetail = async (name) => {

    try {
        const res = await request.get(`room/${name}/room-detail`)
        return res.data

    } catch (error) {
        console.log(error)
    }
}
export const roomList = async () => {

    try {
        const res = await request.get(`rooms`)
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const roomDetailById = async ( roomId ) => {

    try {
        const res = await request.post(`room/detail/id`, { roomId })

        return res.data

    } catch (error) {
        console.log(error)
    }
}


