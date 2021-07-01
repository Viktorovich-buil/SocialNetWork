import {connect} from "react-redux";
import {follow, unfollow, requestUsers, FilterType} from "../../redux/users-reducer";
import {withAuthRedirect} from "../../Hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount, getUsers, getUsersFilter,
} from "../../redux/users-selectors";
import React from "react";
import Preloader from "../Common/Preloader/Preloader";
import {UsersType} from "../../types/types";
import Users from "./Users";
import {AppStateType} from "../../redux/redux-store";

type MapStatePropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    followingInProgress: Array<number>,
    users: Array<UsersType>
    filter: FilterType
}

type MapDispatchPropsType = {
    requestUsers: (currentPage: number, pageSize: number, filter: FilterType) => void,
    unfollow: (userID: number) => void,
    follow: (userID: number) => void,


}

type OwnPropsType = {
    pageTitle: string,
    children: string,
}


type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize, filter} = this.props;
        this.props.requestUsers(currentPage, pageSize, filter);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize, filter} = this.props;
        this.props.requestUsers(pageNumber, pageSize, filter);
    }
    onFilterChanged = (filter: FilterType) => {
        const {pageSize} = this.props;
        this.props.requestUsers(1, pageSize, filter);
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                   onFilterChanged={this.onFilterChanged}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   unfollow={this.props.unfollow}
                   follow={this.props.follow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>

    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        filter:getUsersFilter(state)
            }
};


export default compose <React.ComponentType>(
    withAuthRedirect,
    (connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
            requestUsers,
            follow,
            unfollow
        })
    ))(UsersContainer)




// totalUsersCount={this.props.totalUsersCount}
// pageSize={this.props.pageSize}
// currentPage={this.props.currentPage}
