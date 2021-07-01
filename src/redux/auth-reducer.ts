import {ResultCodesEnum, ResultCodesForCaptchaEnum} from "../Api/api";
import {stopSubmit} from "redux-form";
import {authAPI} from "../Api/auth-api";
import {securityAPI} from "../Api/sucurity-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";


let initialState = {
    id: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null
};

export type InitialStateType = typeof initialState;

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType <typeof stopSubmit>>

const authReducer = (state = initialState, action: ActionsTypes) : InitialStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


export const actions = {
    setAuthUserData: (id : number | null, email : string | null, login : string | null, isAuth: boolean) => ({
        type: 'SET_USER_DATA', payload: {id, email, login, isAuth}
    } as const),
    setCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'GET_CAPTCHA_URL_SUCCESS', payload: {captchaUrl}
    } as const)
}

// type SetAuthUserDataActionPayloadType = {
//     id: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean
// }
// type SetAuthUserDataActionType = {
//     type: typeof SET_USER_DATA,
//     payload: SetAuthUserDataActionPayloadType
// }
// export const setAuthUserData = (id : number | null, email : string | null, login : string | null, isAuth: boolean) => ({
//     type: SET_USER_DATA, payload:
//         {id, email, login, isAuth}
// });
// type SetCaptchaUrlSuccessActionPayloadType = {
//       captchaUrl: string,
//    }
// type SetCaptchaUrlSuccessActionType = {
//     type: typeof GET_CAPTCHA_URL_SUCCESS,
//     payload: SetCaptchaUrlSuccessActionPayloadType
//     //определение типа, еще один способ
//     // payload: { captchaUrl : string }
//
// }


//THUNK
export const getAuthUserData = (): ThunkType => async (dispatch) => {
    let authMeData = await authAPI.authMe();
    if (authMeData.resultCode === ResultCodesEnum.Success) {
        let {id, email, login} = authMeData.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
}

export const login = (email: string, password : string, rememberMe : boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginMeData = await authAPI.loginMe(email, password, rememberMe, captcha);
    if (loginMeData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else {
        if (loginMeData.resultCode === ResultCodesForCaptchaEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
        let message = loginMeData.messages.length > 0 ? loginMeData.messages[0] : 'Some error';
        dispatch(stopSubmit('login', {_error: message}));
         }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch ) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.setCaptchaUrlSuccess(captchaUrl))
};

export const logout = (): ThunkType => async (dispatch ) => {
    let response = await authAPI.logoutMe();
    if (response.data.resultCode === 0) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
}

export default authReducer;

