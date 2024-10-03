import * as request from '~/utils/request';


export const googleLogin = async ( credential ) => {
    try {
        const res = await request.post(`login/google`, { credential })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

