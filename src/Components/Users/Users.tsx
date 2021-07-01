import React from 'react';
import Paginator from "../Common/Paginate/Paginator";
import User from "./User";
import classes from './Users.module.css'
import {UsersType} from "../../types/types";
import {UserSearchForm} from "./UsersSearchForm";
import {FilterType} from "../../redux/users-reducer";
import Preloader from "../Common/Preloader/Preloader";
import Preloader2 from "../Common/Preloader/Preloader2";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPage, getPageSize, getTotalUsersCount} from "../../redux/users-selectors";

type PropsType = {
    //currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    onFilterChanged: (filter: FilterType) => void
    //pageSize: number,
    //totalUsersCount: number,
    users: Array<UsersType>
    followingInProgress: Array<number>,
    unfollow: (userID: number) => void,
    follow: (userID: number) => void
}

let Users: React.FC<PropsType> = ({onPageChanged, users, ...props}) => {
  //HOOK
    const totalUsersCount = useSelector(getTotalUsersCount)
    const currentPage = useSelector(getCurrentPage)
    const pageSize = useSelector(getPageSize)

    const dispatch = useDispatch();

    return <div className={classes.content}>
               {totalUsersCount === 0 ?
            <div className={classes.paginator2}>No result for Pagination</div>
        : null}
        <div className={classes.paginator}>
            <Paginator currentPage={currentPage}
                       onPageChanged={onPageChanged}
                       pageSize={pageSize}
                       totalItemsCount={totalUsersCount}/>
        </div>
        <UserSearchForm onFilterChanged={props.onFilterChanged}/>
        <div className={classes.users}>
            {users.map(u => <User user={u}
                                  key={u.id}
                                  followingInProgress={props.followingInProgress}
                                  unfollow={props.unfollow}
                                  follow={props.follow}/>)
            }
        </div>
        {totalUsersCount === 0 ? <Preloader2/> : null}

    </div>

    // if ( totalUsersCount === 0) return <div>User not found</div>
}

export default Users;
