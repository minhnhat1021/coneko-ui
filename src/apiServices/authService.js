import * as request from '~/utils/request'

export const register = async ( fullName, email, password ) => {
    try {
        const res = await request.post(`register`, { fullName, email, password })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const login = async ( userName, password ) => {
    try {
        const res = await request.post(`login`, { userName, password })
        return res.data

    } catch (error) {
        console.log(error)
    }
}

export const logout = async ( userId ) => {
    try {
        const res = await request.post(`login/out`, { userId })
        return res.data

    } catch (error) {
        console.log(error)
    }
}


export const googleLogin = async ( credential ) => {
    try {
        const res = await request.post(`login/google`, { credential })
        return res.data

    } catch (error) {
        console.log(error)
    }
}
export const facebookLogin = async ( accessToken ) => {
    try {
        const res = await request.post(`login/facebook`, { accessToken })
        return res.data

    } catch (error) {
        console.log(error)
    }
}


export const globalCheck = async ( {path, token, userId}) => {
    try {
        const res = await request.post(`${path}`,{token, userId})
        return res.data

    } catch (error) {
        console.log(error)
    }
}


export const adminLogin = async ( userName, password ) => {
    try {
        const res = await request.post(`admin/login`, { userName, password })
        return res.data

    } catch (error) {
        console.log(error)
    }
}