import {followAPI, usersAPI} from "../Api/users-api";
import {updateObjectArray} from "../utils/Helper/Object_helpers";
import {UsersType} from '../types/types'
import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {APIResponseType} from "../Api/api";


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, //Array of users ID
    filter: {
        term: '',
        friend: null as null | boolean
    }
};


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case "FOLLOW":
            return {
                ...state,
                users: updateObjectArray(state.users, action.userID,
                    'id', {followed: true})
            }
        case "UNFOLLOW":
            return {
                ...state,
                users: updateObjectArray(state.users, action.userID,
                    'id', {followed: false})
            }

        case "SET_USERS":
            return {...state, users: action.users}
        default:
            return state;

        case "SET_CURRENT_PAGE":
            return {...state, currentPage: action.currentPage}

        case "SET_TOTAL_USERS_COUNT":
            return {...state, totalUsersCount: action.totalUsersCount}

        case "SET_TOGGLE_IS_FETCHING":
            return {...state, isFetching: action.isFetching}

        case 'SET_FILTER':
            return {...state, filter: action.filter}

        case "TOGGLE_IS_FOLLOWING_PROGRESS":
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
    }
}

export const actions = {
    followSuccess: (userID: number) => ({type: 'FOLLOW', userID} as const),
    unfollowSuccess: (userID: number) => ({type: 'UNFOLLOW', userID} as const),
    setUsers: (users: Array<UsersType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'SET_FILTER', filter} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'SET_TOGGLE_IS_FETCHING', isFetching} as const),
    toggleFollowingInProgress: (isFetching: boolean, userID: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userID
    } as const)
}


//THUNK


export const requestUsers = (requestPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(actions.toggleIsFetching(true));
        dispatch(actions.setCurrentPage(requestPage));
        dispatch(actions.setFilter(filter));

        let data = await usersAPI.getUsers(requestPage, pageSize, filter.term, filter.friend);
        dispatch(actions.toggleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    }
}


const _followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>,
                                   userID: number,
                                   apiMethod: (userID: number) => Promise<APIResponseType>,
                                   actionCreator: (userID: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userID));
    let data = await apiMethod(userID);
    if (data.resultCode == 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(actions.toggleFollowingInProgress(false, userID));
}


export const follow = (userID: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = followAPI.followUser.bind(followAPI);
        let actionCreator = actions.followSuccess;
        await _followUnfollowFlow(dispatch, userID, apiMethod, actionCreator)
    }
}

export const unfollow = (userID: number): ThunkType => {
    return async (dispatch) => {
        let apiMethod = followAPI.unfollowUser.bind(followAPI);
        let actionCreator = actions.unfollowSuccess;
        await _followUnfollowFlow(dispatch, userID, apiMethod, actionCreator)
    }
}


export default usersReducer;

type ActionsTypes = InferActionsTypes<typeof actions>
export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;
type ThunkType = BaseThunkType<ActionsTypes>


// const FOLLOW = 'FOLLOW';
// const UNFOLLOW = 'UNFOLLOW';
// const SET_USERS = 'SET_USERS';
// const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
// const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
// const SET_TOGGLE_IS_FETCHING = 'SET_TOGGLE_IS_FETCHING'
// const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'
// type ActionsTypes = FollowSuccessActionType |
//     UnfollowSuccessActionType |
//     SetUsersActionType |
//     SetCurrentPageActionType |
//     SetTotalUsersCountActionType |
//     ToggleIsFetchingActionType |
//     ToggleFollowingInProgressActionType
//
// type FollowSuccessActionType = {
//     type: typeof FOLLOW,
//     userID: number
// }
// export const followSuccess = (userID: number): FollowSuccessActionType => ({type: FOLLOW, userID});
