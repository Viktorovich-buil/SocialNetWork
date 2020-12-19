import {followAPI, usersAPI} from "../Api/api";
import {updateObjectArray} from "../utils/Helper/Object_helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT'
const SET_TOGGLE_IS_FETCHING = 'SET_TOGGLE_IS_FETCHING'
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS'


let initialState = {
    users: [],
    pageSize: 5,
    totalItemsCount: 0,
    isFetching: true,
    followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {

    switch (action.type) {
        // case 'FAKE': return {...state, fake:state.fake+1}

        case FOLLOW:
            return {
                ...state,
                users: updateObjectArray(state.users, action.userID,
                    'id', {followed: true})
            }

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectArray(state.users, action.userID,
                    'id', {followed: false})
            }

        case SET_USERS:
            return {...state, users: action.users}
        default:
            return state;

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage}

        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.totalUsersCount}

        case SET_TOGGLE_IS_FETCHING:
            return {...state, isFetching: action.isFetching}

        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userID]
                    : state.followingInProgress.filter(id => id !== action.userID)
            }
    }
}

export const followSuccess = (userID) => ({type: FOLLOW, userID});

export const unfollowSuccess = (userID) => ({type: UNFOLLOW, userID});

export const setUsers = (users) => ({type: SET_USERS, users});

export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});

export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});

export const toggleIsFetching = (isFetching) => ({type: SET_TOGGLE_IS_FETCHING, isFetching});

export const toggleFollowingInProgress = (isFetching, userID) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userID
});


export const requestUsers = (requestPage, pageSize) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(requestPage));
    let response = await usersAPI.getUsers(requestPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(response.data.items));
    dispatch(setTotalUsersCount(response.data.totalCount));
}

const followUnfollowFlow = async (dispatch, userID, apiMethod, actionCreator) => {
    dispatch(toggleFollowingInProgress(true, userID));
    let response = await apiMethod(userID);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userID))
    }
    dispatch(toggleFollowingInProgress(false, userID));
}


export const follow = (userID) => async (dispatch) => {
    let apiMethod = followAPI.followUser.bind(followAPI);
    let actionCreator = followSuccess;
    followUnfollowFlow(dispatch, userID, apiMethod, actionCreator)
}

export const unfollow = (userID) => async (dispatch) => {
    let apiMethod = followAPI.unfollowUser.bind(followAPI);
    let actionCreator = unfollowSuccess;
    followUnfollowFlow(dispatch, userID, apiMethod, actionCreator)
}


export default usersReducer;

