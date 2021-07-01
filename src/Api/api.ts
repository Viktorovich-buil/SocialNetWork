import axios from "axios";
import {UsersType} from "../types/types";


export const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    headers: {'API-KEY': process.env.REACT_APP_PRIVATE_KEY},
    withCredentials: true
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,

}

export enum ResultCodesForCaptchaEnum {
       CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}


//дженерик
export type APIResponseType<D = {}, RC = ResultCodesEnum | ResultCodesForCaptchaEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}
