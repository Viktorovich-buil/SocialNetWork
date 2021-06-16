import {profileAPI} from "../Api/api";
import {stopSubmit} from "redux-form";
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const SET_IS_PHOTO_SAVING = 'SET_IS_PHOTO_SAVING'


let initialState = {
    posts: [
        {id: 0, post: 'Hi, how are you?', likesCount: 5},
        {id: 1, post: 'It`s my first post.', likesCount: 10},
    ],
    profile: null,
    status: '',
    photo: '',
    isPhotoSaving: false,
};


const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
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

        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case  SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }
        case  SET_STATUS: {
            return {...state, status: action.status}
        }
        case  DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }

        case  SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}}

        case SET_IS_PHOTO_SAVING:
            return {
                ...state,
                isPhotoSaving: action.isSaving,
            }
        default:
            return state;
    }
}


export const addPostActionCreator = (newPostBody) => ({type: ADD_POST, newPostBody})

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile})

export const setStatus = (status) => ({type: SET_STATUS, status})

export const deletePost = (postId) => ({type: DELETE_POST, postId})

export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})

export const setIsPhotoSaving = (isSaving) => ({type: SET_IS_PHOTO_SAVING, isSaving})


export const getUserProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.followedUser(userId);
    dispatch(setUserProfile(response.data))
}

export const getUserStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateUserStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0])
    }

}

export const updateNewPostTextActionCreator = (text) => {
    return {type: UPDATE_NEW_POST_TEXT, newText: text}
}

export default profileReducer;
