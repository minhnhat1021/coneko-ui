import * as request from '~/utils/request';

export const statisticsRoom = async () => {

    try {
        const res = await request.get('admin/statistics-room')
        return res.data

    } catch (error) {
        console.log(error)
    }
}
