import * as request from '~/utils/request';

export const roomDetail = async (name) => {

    try {
        const res = await request.get(`room/${name}/room-detail`)
        return res.data

    } catch (error) {
        console.log(error)
    }
}
export const userDetail = async (token) => {
    try {
        const res = await request.post(`user`, { token })
        return res.data

    } catch (error) {
        console.log(error)
    }
}
