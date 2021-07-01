import {instance, APIResponseType} from "./api";

type MeResponseDataType = {
        id: number
        email: string
        login: string
}

type LoginMeResponseDataType = {
           userId: number
}

export const authAPI = {
    authMe() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    loginMe(email: string, password: string, rememberMe = false, captcha: null | string = 'null') {
        return instance.post<APIResponseType<LoginMeResponseDataType>>(`auth/login`, {email, password, rememberMe, captcha})
            .then(res => res.data)
    },
    logoutMe() {
        return instance.delete(`auth/login`)
    }
}
