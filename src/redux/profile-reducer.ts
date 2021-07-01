import {FormAction, stopSubmit} from "redux-form";
import {IsPhotoSavingType, PhotosType, PostsType, ProfileType} from '../types/types'
import {profileAPI} from "../Api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
    posts: [
        {id: 0, post: 'Hi, how are you?', likesCount: 5},
        {id: 1, post: 'It`s my first post.', likesCount: 10},
    ] as Array<PostsType>,
    profile: null as ProfileType | null,
    status: '',
    photo: '',
    isPhotoSaving: false as IsPhotoSavingType | false,
    newPostText: ' '
};




const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD_POST':
            let newPost = {
                id: 5,
                post: action.newPostBody,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ' '
            };

        case 'UPDATE_NEW_POST_TEXT': {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case  'SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case  'SET_STATUS': {
            return {...state, status: action.status}
        }
        case  'DELETE_POST': {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }

        case  'SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}

        // case SET_IS_PHOTO_SAVING:
        //     return {
        //         ...state,
        //         isPhotoSaving: action.isSaving,
        //     }
        default:
            return state;
    }
}


export const actions = {
    addPostActionCreator: (newPostBody: string) => ({type: 'ADD_POST', newPostBody} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USER_PROFILE', profile}as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status}as const),
    deletePost: (postId: number) => ({type: 'DELETE_POST', postId}as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos}as const),
    // setIsPhotoSaving: (isSaving: boolean | false) => ({
    //     type: 'SET_IS_PHOTO_SAVING',
    //     isSaving}as const),
    updateNewPostTextActionCreator: (newText: string) => {
        return {type: 'UPDATE_NEW_POST_TEXT', newText} as const
    }
}




//THUNK
export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.followedUser(userId);
    dispatch(actions.setUserProfile(data))
}

export const getUserStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(data));
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    let data = await profileAPI.updateStatus(status);
    if (data.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId));
        }
        else {
            throw new Error ('userId can`t be null')
        };
    } else {
        dispatch(stopSubmit('edit-profile', {_error: data.messages[0]}));
        return Promise.reject(data.messages[0])
    }

}

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | FormAction>
