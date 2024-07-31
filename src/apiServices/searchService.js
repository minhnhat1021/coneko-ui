import * as request from '~/utils/request';

export const roomSearch = async (q) => {

    try {
        const res = await request.get('rooms/search?', {
            params: {
                q
            }
        })
        return res.data

    } catch (error) {
        console.log(error)
    }
}